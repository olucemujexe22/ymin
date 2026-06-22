// 百度统计 API 对接模块
const axios = require('axios');
const { query } = require('./db');

const API_KEY = process.env.BAIDU_API_KEY;
const SECRET_KEY = process.env.BAIDU_SECRET_KEY;
const SITE_ID = process.env.BAIDU_SITE_ID;

// 获取 access_token
async function getAccessToken() {
  const url = 'https://api.baidu.com/oauth/2.0/token';
  const params = {
    grant_type: 'client_credentials',
    client_id: API_KEY,
    client_secret: SECRET_KEY
  };
  const res = await axios.get(url, { params });
  if (res.data.access_token) {
    return res.data.access_token;
  }
  throw new Error('百度统计鉴权失败: ' + JSON.stringify(res.data));
}

// 通用请求
async function callApi(method, params) {
  const token = await getAccessToken();
  const url = `https://api.baidu.com/json/tongji/v1/ReportService/${method}`;
  const body = {
    header: {
      username: API_KEY,
      password: token,
      token: token,
      account_type: 1
    },
    body: params
  };
  const res = await axios.post(url, body, { timeout: 30000 });
  const data = res.data;
  if (data.header && data.header.failures && data.header.failures.length > 0) {
    throw new Error('百度统计API失败: ' + JSON.stringify(data.header.failures));
  }
  return data.body;
}

// 拉取指定日期各页面 PV/UV/停留时长
async function fetchPageData(dateStr) {
  try {
    const result = await callApi('getData', {
      site_id: SITE_ID,
      method: 'overview/getTimeTrendRpt',
      start_date: dateStr,
      end_date: dateStr,
      metrics: 'pv_count,visitor_count,avg_visit_time,bounce_ratio',
      source: 'all',
      area: 'all'
    });

    // 提取总计
    if (result && result.data && result.data[0]) {
      const item = result.data[0];
      return {
        date: dateStr,
        total_pv: parseInt(item.result.pagesum[0]) || 0,
        total_uv: parseInt(item.result.pagevisitor[0]) || 0,
        avg_stay: parseInt(item.result.pagetimeavg[0]) || 0,
        bounce_rate: parseFloat(item.result.bounceratio[0]) || 0
      };
    }
    return null;
  } catch (e) {
    console.error(`拉取页面数据失败 (${dateStr}):`, e.message);
    return null;
  }
}

// 拉取各页面明细 PV/UV
async function fetchPageDetail(dateStr) {
  try {
    const result = await callApi('getData', {
      site_id: SITE_ID,
      method: 'overview/getCommonTrackRpt',
      start_date: dateStr,
      end_date: dateStr,
      metrics: 'pv_count,visitor_count,avg_visit_time,bounce_ratio',
      order: 'pv_count,desc',
      start_index: 0,
      max_results: 5000
    });

    const rows = [];
    if (result && result.data && result.data[0]) {
      const items = result.data[0].result.items || [];
      for (const item of items) {
        rows.push({
          date: dateStr,
          page_url: item[0] || '',
          pv: parseInt(item[1]) || 0,
          uv: parseInt(item[2]) || 0,
          avg_stay: parseInt(item[3]) || 0,
          bounce_rate: parseFloat(item[4]) || 0
        });
      }
    }
    return rows;
  } catch (e) {
    console.error(`拉取页面明细失败 (${dateStr}):`, e.message);
    return [];
  }
}

// 拉取搜索词数据
async function fetchSearchTerms(dateStr) {
  try {
    const result = await callApi('getData', {
      site_id: SITE_ID,
      method: 'source/searchword/track',
      start_date: dateStr,
      end_date: dateStr,
      metrics: 'pv_count',
      order: 'pv_count,desc',
      start_index: 0,
      max_results: 500
    });

    const rows = [];
    if (result && result.data && result.data[0]) {
      const items = result.data[0].result.items || [];
      for (const item of items) {
        rows.push({
          date: dateStr,
          keyword: item[0] || '',
          pv: parseInt(item[1]) || 0,
          landing_url: item[2] || null,
          source: 'baidu'
        });
      }
    }
    return rows;
  } catch (e) {
    console.error(`拉取搜索词失败 (${dateStr}):`, e.message);
    return [];
  }
}

// 拉取昨日数据并入库
async function fetchAndStore() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split('T')[0];

  console.log(`[百度统计] 开始拉取 ${dateStr} 数据...`);

  // 页面明细
  const pages = await fetchPageDetail(dateStr);
  if (pages.length > 0) {
    for (const p of pages) {
      await query(
        `INSERT INTO traffic_daily (date, page_url, pv, uv, avg_stay, bounce_rate)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE pv=VALUES(pv), uv=VALUES(uv), avg_stay=VALUES(avg_stay), bounce_rate=VALUES(bounce_rate)`,
        [p.date, p.page_url, p.pv, p.uv, p.avg_stay, p.bounce_rate]
      );
    }
    console.log(`[百度统计] 页面明细入库: ${pages.length} 条`);
  }

  // 搜索词
  const terms = await fetchSearchTerms(dateStr);
  if (terms.length > 0) {
    for (const t of terms) {
      await query(
        `INSERT INTO traffic_search_terms (date, keyword, pv, landing_url, source)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE pv=VALUES(pv)`,
        [t.date, t.keyword, t.pv, t.landing_url, t.source]
      );
    }
    console.log(`[百度统计] 搜索词入库: ${terms.length} 条`);
  }

  return { pages: pages.length, terms: terms.length, date: dateStr };
}

// 自动给页面打类型标签（基于URL规则）
async function tagPageTypes() {
  const updates = [
    { type: '产品页', pattern: '/index/capacity_detail' },
    { type: '应用领域页', pattern: '/index/subApply' },
    { type: '应用中心', pattern: '/index/apply' },
    { type: 'FAQ', pattern: '/index/faq' },
    { type: '设计工具', pattern: '/index/shouming' },
    { type: '设计工具', pattern: '/index/spice' },
    { type: '设计工具', pattern: '/index/cad3d' },
    { type: '文章', pattern: '/index/article' },
  ];
  for (const u of updates) {
    await query(
      `UPDATE traffic_daily SET page_type = ? WHERE page_url LIKE ? AND page_type IS NULL`,
      [u.type, `%${u.pattern}%`]
    );
  }
}

// 关联产品线（URL参数 part_number → tp_good.liaohao → column_id → tp_column）
async function tagProductLines() {
  await query(`
    UPDATE traffic_daily d
    JOIN v_product_line p ON d.page_url LIKE CONCAT('%part_number=', p.part_number, '%')
    SET d.page_type = CONCAT('产品页|', IFNULL(p.product_line, ''))
    WHERE d.page_type = '产品页'
  `);
}

module.exports = { fetchAndStore, fetchPageData, tagPageTypes, tagProductLines };
