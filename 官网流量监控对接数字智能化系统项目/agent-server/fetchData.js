// 定时拉取百度统计数据 + 归类 + 意图分析（每日执行）
require('dotenv').config();
const { execSync } = require('child_process');
const { fetchAndStore, tagPageTypes, tagProductLines } = require('./baiduApi');

(async () => {
  console.log('===== 数据拉取开始 =====');
  try {
    const result = await fetchAndStore();
    await tagPageTypes();
    await tagProductLines();
    console.log(`拉取: ${result.pages}页 / ${result.terms}搜索词 / PV ${result.pv} / UV ${result.uv}`);

    // 应用领域归类
    console.log('执行应用领域归类...');
    try { execSync('node ' + __dirname + '/classifyTerms.js', { stdio: 'inherit' }); } catch(e) { console.log('归类跳过:', e.message); }

    // 搜索词意图分析
    console.log('执行搜索词意图分析...');
    try { execSync('node ' + __dirname + '/analyzeIntent.js', { stdio: 'inherit', timeout: 120000 }); } catch(e) { console.log('意图分析跳过:', e.message); }

    console.log('===== 全部完成 =====');
  } catch (e) {
    console.error('失败:', e.message);
    process.exit(1);
  }
})();
