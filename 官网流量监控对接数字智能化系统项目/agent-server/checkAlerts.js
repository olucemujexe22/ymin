// 定时预警检测（每日执行）
require('dotenv').config();
const { runAllChecks } = require('./alerts');

(async () => {
  console.log('===== 预警检测开始 =====');
  console.log('时间:', new Date().toISOString());
  try {
    const results = await runAllChecks();
    console.log('飙升:', results.surge);
    console.log('衰减:', results.decay);
    console.log('僵尸:', results.zero_traffic);
    console.log('===== 检测完成 =====');
  } catch (e) {
    console.error('检测失败:', e.message);
    process.exit(1);
  }
})();
