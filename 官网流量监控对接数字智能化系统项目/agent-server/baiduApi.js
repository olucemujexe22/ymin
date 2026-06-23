// 百度统计 API 对接模块（授权码模式）
const axios = require('axios');
const { query } = require('./db');
const fs = require('fs');

const API_KEY = process.env.BAIDU_API_KEY;
const SECRET_KEY = process.env.BAIDU_SECRET_KEY;
const SITE_ID = process.env.BAIDU_SITE_ID;
let ACCESS_TOKEN = process.env.BAIDU_ACCESS_TOKEN;
let REFRESH_TOKEN = process.env.BAIDU_REFRESH_TOKEN;

// 刷新 access_token
async function refreshAccessToken() {
  const res = await axios.get('http://openapi.baidu.com/oauth/2.0/token', {
    params: {
      grant_type: 'refresh_token',
      refresh_token: REFRESH_TOKEN,
      client_id: API_KEY,
      client_secret: SECRET_KEY
    },
    timeout: 10000
  });
  if (res.data.access_token) {
    ACCESS_TOKEN = res.data.access_token;
    REFRESH_TOKEN = res.data.refresh_token;
    const envPath = __dirname + '/.env';
    let env = fs.readFileSync(envPath, 'utf8');
    env = env.replace(/BAIDU_ACCESS_TOKEN=.*/, 'BAIDU_ACCESS_TOKEN=' + ACCESS_TOKEN);
    env = env.replace(/BAIDU_REFRESH_TOKEN=.*/, 'BAIDU_REFRESH_TOKEN=' + REFRESH_TOKEN);
    fs.writeFileSync(envPath, env);
    return ACCESS_TOKEN;
  }
  throw new Error('刷新token失败');
}

// 调用 API
async function callApi(method, params) {
  const doCall = async (t) => {
    return axios.post('https://openapi.baidu.com/rest/2.0/tongji/report/getData', null, {
      params: { access_token: t, site_id: SITE_ID, method, ...params },
      timeout: 30000
    });
  };
  try {
    const res = await doCall(ACCESS_TOKEN);
    if (res.data.error_code === 110 || res.data.error_code === 111) {
      ACCESS_TOKEN = await refreshAccessToken();
      const retry = await doCall(ACCESS_TOKEN);
      return retry.data;
    }
    return res.data;
  } catch (e) {
    throw e;
  }
}

// 拉取落地页数据
async function fetchPageDetail(dateStr) {
  try {
    const result = await callApi('overview/getCommonTrackRpt', {
      start_date: dateStr, end_date: dateStr,
      metrics: 'pv_count,visitor_count,avg_visit_time,bounce_ratio',
      start_index: 0, max_results: 5000
    });
    const rows = [];
    if (result && result.result) {
      // landingPage items
      const lp = result.result.landingPage;
      if (lp && lp.items) {
        for (const item of lp.items) {
          rows.push({ date: dateStr, page_url: item[0] || '', pv: parseInt(item[1]) || 0 });
        }
      }
      // 补充总 UV（来自 visitType）
      const vt = result.result.visitType;
      if (vt) {
        const totalUv = (vt.newVisitor?.visitor_count || 0) + (vt.oldVisitor?.visitor_count || 0);
        if (totalUv > 0) {
          rows.forEach(r => r.total_uv = totalUv);
        }
      }
    }
    return rows;
  } catch (e) { console.error('页面明细失败:', e.message); return []; }
}

// 拉取搜索词
async function fetchSearchTerms(dateStr) {
  try {
    const result = await callApi('source/searchword/track', {
      start_date: dateStr, end_date: dateStr,
      metrics: 'pv_count', order: 'pv_count,desc',
      start_index: 0, max_results: 500
    });
    const rows = [];
    // 格式: result.word.items 或 result.items
    const data = result && result.result;
    if (data) {
      const items = (data.word && data.word.items) || data.items || [];
      for (const item of items) {
        if (Array.isArray(item) && item.length >= 2) {
          rows.push({ date: dateStr, keyword: String(item[0] || '').trim(), pv: parseInt(item[1]) || 0 });
        }
      }
    }
    return rows;
  } catch (e) { console.error('搜索词失败:', e.message); return []; }
}

// 拉取来源数据
async function fetchSources(dateStr) {
  try {
    const result = await callApi('overview/getCommonTrackRpt', {
      start_date: dateStr, end_date: dateStr,
      metrics: 'pv_count', start_index: 0, max_results: 50
    });
    const rows = [];
    const data = result && result.result;
    if (data && data.sourceSite && data.sourceSite.items) {
      for (const item of data.sourceSite.items) {
        rows.push({ date: dateStr, source: item[0] || '', pv: parseInt(item[1]) || 0 });
      }
    }
    return rows;
  } catch (e) { console.error('来源失败:', e.message); return []; }
}

// 拉取数据并入库
async function fetchAndStore() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const dateStr = yesterday.toISOString().split('T')[0];

  console.log(`[百度统计] 拉取 ${dateStr} ...`);

  // 落地页
  const pages = await fetchPageDetail(dateStr);
  let totalUv = 0;
  for (const p of pages) {
    await query(
      `INSERT INTO traffic_daily (date, page_url, pv, uv)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE pv=VALUES(pv), uv=VALUES(uv)`,
      [p.date, p.page_url, p.pv, 0]
    );
    if (p.total_uv) totalUv = p.total_uv;
  }
  // 补总 UV 到首页
  if (totalUv > 0) {
    await query(
      `UPDATE traffic_daily SET uv = ? WHERE date = ? AND page_url IN ('https://www.ymin.com','https://ymin.com')`,
      [totalUv, dateStr]
    );
  }
  console.log(`[百度统计] 落地页: ${pages.length} 条, UV: ${totalUv}`);

  // 搜索词
  const terms = await fetchSearchTerms(dateStr);
  for (const t of terms) {
    await query(
      `INSERT INTO traffic_search_terms (date, keyword, pv, source)
       VALUES (?, ?, ?, 'baidu')
       ON DUPLICATE KEY UPDATE pv=VALUES(pv)`,
      [t.date, t.keyword, t.pv]
    );
  }
  console.log(`[百度统计] 搜索词: ${terms.length} 条`);

  return { pages: pages.length, terms: terms.length, uv: totalUv, date: dateStr };
}

// 页面类型打标
async function tagPageTypes() {
  const updates = [
    ['产品页', '/index/capacity_detail'],
    ['文章', '/index/article'],
    ['设计工具', '/index/shouming'],
    ['设计工具', '/index/spice'],
    ['设计工具', '/index/cad3d'],
    ['应用领域页', '/index/subApply'],
    ['应用中心', '/index/apply'],
    ['关于', '/index/about'],
    ['关于', '/index/aboutContact'],
    ['下载', '/index/xgwj'],
  ];
  for (const [type, pattern] of updates) {
    await query(
      'UPDATE traffic_daily SET page_type = ? WHERE page_url LIKE ? AND page_type IS NULL',
      [type, `%${pattern}%`]
    );
  }
  await query(
    "UPDATE traffic_daily SET page_type = '首页' WHERE page_url IN ('https://www.ymin.com','https://ymin.com','https://www.ymin.com/index','https://ymin.com/index') AND page_type IS NULL"
  );
}

async function tagProductLines() {
  await query(
    "UPDATE traffic_daily d JOIN v_product_line p ON d.page_url LIKE CONCAT('%part_number=', p.part_number, '%') SET d.page_type = CONCAT('产品页|', IFNULL(p.product_line, '')) WHERE d.page_type = '产品页'"
  );
}

module.exports = { fetchAndStore, tagPageTypes, tagProductLines };
