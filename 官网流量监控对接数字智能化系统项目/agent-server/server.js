// 官网流量分析智能体 — 主服务 v2
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

app.get('/api/health', async (req, res) => {
  try { const rows = await query('SELECT NOW() as now'); res.json({ status: 'ok', time: rows[0].now }); }
  catch (e) { res.status(500).json({ status: 'error', message: e.message }); }
});

app.get('/api/dashboard', async (req, res) => {
  try {
    const today = await query(`SELECT SUM(pv) as total_pv, SUM(uv) as total_uv, AVG(avg_stay) as avg_stay, AVG(bounce_rate) as bounce_rate FROM traffic_daily WHERE date = (SELECT MAX(date) FROM traffic_daily)`);
    const yesterday = await query(`SELECT SUM(pv) as total_pv, SUM(uv) as total_uv FROM traffic_daily WHERE date = DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL 1 DAY)`);
    const alerts = await query(`SELECT COUNT(*) as count FROM traffic_alerts WHERE status = 'new'`);
    const lastDate = await query(`SELECT MAX(date) as d FROM traffic_daily`);
    const t = today[0] || {}; const y = yesterday[0] || {};
    const pvChange = y.total_pv > 0 ? ((t.total_pv - y.total_pv) / y.total_pv * 100).toFixed(1) : 0;
    const uvChange = y.total_uv > 0 ? ((t.total_uv - y.total_uv) / y.total_uv * 100).toFixed(1) : 0;
    res.json({ today: { pv: t.total_pv || 0, uv: t.total_uv || 0, avg_stay: t.avg_stay || 0, bounce_rate: t.bounce_rate || 0, pv_change: parseFloat(pvChange), uv_change: parseFloat(uvChange) }, alert_count: alerts[0]?.count || 0, date: lastDate[0]?.d });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/trend', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const rows = await query(`SELECT date, SUM(pv) as pv, SUM(uv) as uv FROM traffic_daily WHERE date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL ? DAY) GROUP BY date ORDER BY date`, [days]);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/rankings', async (req, res) => {
  try {
    const period = parseInt(req.query.period) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const rows = await query(`SELECT d.page_url, SUM(d.pv) as total_pv, SUM(d.uv) as total_uv, g.pinxing FROM traffic_daily d LEFT JOIN tp_good g ON d.page_url LIKE CONCAT('%part_number=', g.liaohao, '%') WHERE d.date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL ? DAY) AND d.page_type LIKE '产品页%' GROUP BY d.page_url, g.pinxing ORDER BY total_pv DESC LIMIT ?`, [period, limit]);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/sources', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 1;
    const rows = await query(`SELECT keyword as source, SUM(pv) as pv FROM traffic_search_terms WHERE date >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND source = 'source' GROUP BY keyword ORDER BY pv DESC LIMIT 10`, [days]);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

app.get('/api/search-terms', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rows = await query(`SELECT keyword, SUM(pv) as pv FROM traffic_search_terms WHERE date >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND source = 'baidu_kw' GROUP BY keyword ORDER BY pv DESC LIMIT ?`, [days, limit]);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// 应用领域洞察
app.get('/api/applications', async (req, res) => {
  try {
    const rows = await query(`
      SELECT k.app_domain, COUNT(DISTINCT s.keyword) as keyword_count, SUM(s.pv) as total_pv
      FROM traffic_search_terms s
      JOIN traffic_app_keywords k ON s.keyword LIKE CONCAT('%', k.keyword, '%')
      WHERE s.date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY k.app_domain ORDER BY total_pv DESC
    `);
    res.json(rows);
  } catch (e) { res.status(500).json({error:e.message}); }
});

// 搜索词意图统计
app.get('/api/intents', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const rows = await query(`
      SELECT intent, COUNT(*) as count, SUM(pv) as total_pv
      FROM traffic_search_terms
      WHERE date >= DATE_SUB(CURDATE(), INTERVAL ? DAY) AND intent IS NOT NULL AND intent != ''
      GROUP BY intent ORDER BY total_pv DESC
    `, [days]);
    res.json(rows);
  } catch (e) { res.status(500).json({error:e.message}); }
});

app.get('/api/alerts', async (req, res) => {
  const rows = await query('SELECT * FROM traffic_alerts WHERE status = ? ORDER BY alert_time DESC LIMIT 20', [req.query.status || 'new']);
  res.json(rows);
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: '请输入消息' });
    const intent = await understandQuery(message);
    let dataResult = {};
    if (intent.type === 'dashboard') {
      const t = await query(`SELECT SUM(pv) as total_pv, SUM(uv) as total_uv FROM traffic_daily WHERE date = (SELECT MAX(date) FROM traffic_daily)`);
      dataResult = t[0];
    } else if (intent.type === 'ranking') {
      const period = intent.period === '30d' ? 30 : 7;
      dataResult = await query(`SELECT d.page_url, SUM(d.pv) as total_pv, g.pinxing FROM traffic_daily d LEFT JOIN tp_good g ON d.page_url LIKE CONCAT('%part_number=', g.liaohao, '%') WHERE d.date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL ? DAY) AND d.page_type LIKE '产品页%' GROUP BY d.page_url, g.pinxing ORDER BY total_pv DESC LIMIT ?`, [period, intent.limit || 10]);
    } else if (intent.type === 'alert') {
      dataResult = await query('SELECT * FROM traffic_alerts WHERE status = "new" ORDER BY alert_time DESC LIMIT 10');
    }
    const reply = await deepseekChat([
      { role: 'system', content: '你是永铭电子官网流量分析智能体「官网小铭同学」。根据查询结果生成简洁专业的回复，200字以内。' },
      { role: 'user', content: `查询：「${message}」\n结果：${JSON.stringify(dataResult).substring(0, 1500)}` }
    ], { temperature: 0.7, max_tokens: 400 });
    res.json({ reply, intent, data: dataResult });
  } catch (e) { res.json({ reply: '抱歉，查询出错了，请稍后再试 💡', error: e.message }); }
});

app.post('/api/admin/fetch', async (req, res) => {
  const result = await fetchAndStore(); await tagPageTypes(); await tagProductLines();
  res.json({ success: true, result });
});

app.post('/api/admin/check-alerts', async (req, res) => {
  const result = await runAllChecks();
  res.json({ success: true, result });
});

app.listen(PORT, () => console.log(`[流量分析] 服务已启动: http://127.0.0.1:${PORT}`));
