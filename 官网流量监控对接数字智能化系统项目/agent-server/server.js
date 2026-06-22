// 官网流量分析智能体 — 主服务
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { query } = require('./db');
const { fetchAndStore, tagPageTypes, tagProductLines } = require('./baiduApi');
const { understandQuery, chat: deepseekChat } = require('./deepseekApi');
const { runAllChecks } = require('./alerts');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ==========================================
// API 路由
// ==========================================

// 健康检查
app.get('/api/health', async (req, res) => {
  try {
    const rows = await query('SELECT NOW() as now');
    res.json({ status: 'ok', time: rows[0].now });
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// 仪表盘 KPI 概览
app.get('/api/dashboard', async (req, res) => {
  try {
    const today = await query(`
      SELECT 
        SUM(pv) as total_pv,
        SUM(uv) as total_uv,
        AVG(avg_stay) as avg_stay,
        AVG(bounce_rate) as bounce_rate
      FROM traffic_daily
      WHERE date = (SELECT MAX(date) FROM traffic_daily)
    `);

    const yesterday = await query(`
      SELECT 
        SUM(pv) as total_pv,
        SUM(uv) as total_uv
      FROM traffic_daily
      WHERE date = DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL 1 DAY)
    `);

    const alerts = await query(`
      SELECT COUNT(*) as count FROM traffic_alerts WHERE status = 'new'
    `);

    const productLines = await query(`
      SELECT 
        SUBSTRING_INDEX(page_type, '|', -1) as product_line,
        SUM(pv) as pv
      FROM traffic_daily
      WHERE date = (SELECT MAX(date) FROM traffic_daily)
        AND page_type LIKE '产品页|%'
      GROUP BY product_line
      ORDER BY pv DESC
    `);

    const t = today[0] || {};
    const y = yesterday[0] || {};
    const pvChange = y.total_pv > 0 ? ((t.total_pv - y.total_pv) / y.total_pv * 100).toFixed(1) : 0;
    const uvChange = y.total_uv > 0 ? ((t.total_uv - y.total_uv) / y.total_uv * 100).toFixed(1) : 0;

    res.json({
      today: {
        pv: t.total_pv || 0,
        uv: t.total_uv || 0,
        avg_stay: t.avg_stay || 0,
        bounce_rate: t.bounce_rate || 0,
        pv_change: parseFloat(pvChange),
        uv_change: parseFloat(uvChange)
      },
      alert_count: alerts[0]?.count || 0,
      product_lines: productLines
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PV/UV 趋势
app.get('/api/trend', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const rows = await query(`
      SELECT date, SUM(pv) as pv, SUM(uv) as uv
      FROM traffic_daily
      WHERE date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL ? DAY)
      GROUP BY date
      ORDER BY date
    `, [days]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 排行榜
app.get('/api/rankings', async (req, res) => {
  try {
    const type = req.query.type || 'products';   // products / articles / tools / surge
    const period = parseInt(req.query.period) || 7;
    const limit = parseInt(req.query.limit) || 20;

    let rows;
    if (type === 'products') {
      rows = await query(`
        SELECT 
          d.page_url,
          SUBSTRING_INDEX(d.page_type, '|', -1) as product_line,
          SUM(d.pv) as total_pv,
          SUM(d.uv) as total_uv,
          g.liaohao,
          g.pinxing
        FROM traffic_daily d
        LEFT JOIN tp_good g ON d.page_url LIKE CONCAT('%part_number=', g.liaohao, '%')
        WHERE d.date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL ? DAY)
          AND d.page_type LIKE '产品页%'
        GROUP BY d.page_url, product_line, g.liaohao, g.pinxing
        ORDER BY total_pv DESC
        LIMIT ?
      `, [period, limit]);
    } else if (type === 'articles') {
      rows = await query(`
        SELECT page_url, SUM(pv) as total_pv, SUM(uv) as total_uv,
               AVG(avg_stay) as avg_stay
        FROM traffic_daily
        WHERE date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL ? DAY)
          AND page_type = '文章'
        GROUP BY page_url
        ORDER BY total_pv DESC
        LIMIT ?
      `, [period, limit]);
    } else if (type === 'surge') {
      rows = await query(`
        SELECT 
          a.page_url,
          a.pv as today_pv,
          (a.pv - COALESCE(b.pv, 0)) / NULLIF(COALESCE(b.pv, 0), 0) * 100 as change_rate
        FROM traffic_daily a
        LEFT JOIN traffic_daily b ON a.page_url = b.page_url AND b.date = DATE_SUB(a.date, INTERVAL 1 DAY)
        WHERE a.date = (SELECT MAX(date) FROM traffic_daily)
          AND a.pv > 0 AND b.pv > 0
        ORDER BY change_rate DESC
        LIMIT ?
      `, [limit]);
    } else {
      rows = [];
    }
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 应用领域洞察
app.get('/api/applications', async (req, res) => {
  try {
    // 按搜索词关联应用领域
    const rows = await query(`
      SELECT 
        k.app_domain,
        COUNT(DISTINCT s.keyword) as keyword_count,
        SUM(s.pv) as total_pv
      FROM traffic_search_terms s
      JOIN traffic_app_keywords k ON s.keyword LIKE CONCAT('%', k.keyword, '%')
      WHERE s.date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY k.app_domain
      ORDER BY total_pv DESC
    `);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 预警列表
app.get('/api/alerts', async (req, res) => {
  try {
    const status = req.query.status || 'new';
    const type = req.query.type || 'all';
    let sql = 'SELECT * FROM traffic_alerts WHERE 1=1';
    const params = [];
    if (status !== 'all') {
      sql += ' AND status = ?';
      params.push(status);
    }
    if (type !== 'all') {
      sql += ' AND alert_type = ?';
      params.push(type);
    }
    sql += ' ORDER BY alert_time DESC LIMIT 50';
    const rows = await query(sql, params);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 内容价值评估
app.get('/api/content', async (req, res) => {
  try {
    const rows = await query(`
      SELECT 
        d.page_url,
        SUM(d.pv) as total_pv,
        SUM(d.uv) as total_uv,
        AVG(d.avg_stay) as avg_stay_sec,
        AVG(d.bounce_rate) as bounce_rate
      FROM traffic_daily d
      WHERE d.date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND d.page_type IN ('文章', 'FAQ', '设计工具')
      GROUP BY d.page_url
      HAVING total_pv > 0
      ORDER BY total_pv DESC
      LIMIT 20
    `);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 僵尸页面
app.get('/api/zombie-pages', async (req, res) => {
  try {
    const rows = await query(`
      SELECT page_url, MAX(date) as last_seen
      FROM traffic_daily
      GROUP BY page_url
      HAVING MAX(date) <= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      LIMIT 50
    `);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ===== 小铭同学对话 =====
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: '请输入消息' });

    // 1. 理解意图
    const intent = await understandQuery(message);
    console.log('[对话] 意图:', JSON.stringify(intent));

    // 2. 根据意图查数据
    let dataResult;
    switch (intent.type) {
      case 'dashboard': {
        const t = await query(`
          SELECT SUM(pv) as total_pv, SUM(uv) as total_uv
          FROM traffic_daily WHERE date = (SELECT MAX(date) FROM traffic_daily)
        `);
        dataResult = t[0];
        break;
      }
      case 'ranking': {
        const period = intent.period === '30d' ? 30 : (intent.period === '1d' ? 1 : 7);
        let sql = `SELECT d.page_url, SUM(d.pv) as total_pv, SUM(d.uv) as total_uv
          FROM traffic_daily d
          WHERE d.date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL ? DAY)`;
        const params = [period];
        if (intent.app_domain) {
          sql += ` AND d.page_url IN (
            SELECT DISTINCT s.landing_url FROM traffic_search_terms s
            JOIN traffic_app_keywords k ON s.keyword LIKE CONCAT('%', k.keyword, '%')
            WHERE k.app_domain = ?
          )`;
          params.push(intent.app_domain);
        }
        sql += ` GROUP BY d.page_url ORDER BY total_pv DESC LIMIT ?`;
        params.push(intent.limit || 10);
        dataResult = await query(sql, params);
        break;
      }
      case 'alert': {
        const alertType = intent.alert_type || 'all';
        dataResult = alertType === 'all'
          ? await query('SELECT * FROM traffic_alerts WHERE status = ? ORDER BY alert_time DESC LIMIT 10', ['new'])
          : await query('SELECT * FROM traffic_alerts WHERE alert_type = ? AND status = ? ORDER BY alert_time DESC LIMIT 10', [alertType, 'new']);
        break;
      }
      case 'report': {
        dataResult = { report_type: intent.report_type || 'daily', generated: true, message: '报告已生成，请查收推送' };
        break;
      }
      default: {
        dataResult = { message: '您的查询已收到，请提供更具体的关键词（如产品线、应用领域、时间范围）' };
      }
    }

    // 3. 用 DeepSeek 生成自然语言回复
    const systemMsg = {
      role: 'system',
      content: `你是永铭电子官网流量分析智能体「官网小铭同学」。根据查询结果生成简洁、专业的回复。
- 如果结果是排行数据，列出Top条目和关键数字
- 如果结果是预警，说明严重程度和建议行动
- 语气友好，可适当使用emoji
- 字数控制在200字以内`
    };
    const userMsg = {
      role: 'user',
      content: `用户查询：「${message}」\n查询结果：${JSON.stringify(dataResult).substring(0, 2000)}`
    };
    const reply = await deepseekChat([systemMsg, userMsg], { temperature: 0.7, max_tokens: 400 });

    res.json({ reply, intent, data: dataResult });
  } catch (e) {
    console.error('[对话] 错误:', e.message);
    res.json({
      reply: '抱歉，我在查询数据时遇到了一些问题。请稍后再试，或尝试换个方式提问。💡',
      error: e.message
    });
  }
});

// 手动触发数据拉取
app.post('/api/admin/fetch', async (req, res) => {
  try {
    const result = await fetchAndStore();
    await tagPageTypes();
    await tagProductLines();
    res.json({ success: true, result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// 手动触发预警检测
app.post('/api/admin/check-alerts', async (req, res) => {
  try {
    const result = await runAllChecks();
    res.json({ success: true, result });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ==========================================
// 启动
// ==========================================
app.listen(PORT, () => {
  console.log(`[流量分析智能体] 服务已启动: http://127.0.0.1:${PORT}`);
  console.log(`[流量分析智能体] 健康检查: http://127.0.0.1:${PORT}/api/health`);
});
