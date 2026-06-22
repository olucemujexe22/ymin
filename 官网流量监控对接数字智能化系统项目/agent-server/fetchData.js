// 定时拉取百度统计数据（每日执行）
require('dotenv').config();
const { fetchAndStore, tagPageTypes, tagProductLines } = require('./baiduApi');

(async () => {
  console.log('===== 百度统计数据拉取开始 =====');
  console.log('时间:', new Date().toISOString());
  try {
    const result = await fetchAndStore();
    console.log('页面数据:', result.pages, '条');
    console.log('搜索词:', result.terms, '条');
    await tagPageTypes();
    await tagProductLines();
    console.log('页面类型打标完成');
    console.log('===== 拉取完成 =====');
  } catch (e) {
    console.error('拉取失败:', e.message);
    process.exit(1);
  }
})();
