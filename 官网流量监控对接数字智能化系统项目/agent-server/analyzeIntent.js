// 搜索词意图分析（DeepSeek 分类：找型号/找替代/找方案/查参数/找厂家/其他）
require('dotenv').config();
const { query } = require('./db');
const { chat } = require('./deepseekApi');

(async () => {
  console.log('===== 搜索词意图分析开始 =====');

  // 添加 intent 字段（如果还没有）
  try {
    await query("ALTER TABLE traffic_search_terms ADD COLUMN intent VARCHAR(20) DEFAULT NULL COMMENT '搜索意图'");
    console.log('intent 字段已添加');
  } catch (e) {
    // 字段已存在，忽略
  }

  // 读取未分析的搜索词
  const terms = await query(`
    SELECT DISTINCT keyword FROM traffic_search_terms
    WHERE source = 'baidu_kw' AND intent IS NULL AND keyword != ''
    ORDER BY pv DESC LIMIT 30
  `);

  if (terms.length === 0) {
    console.log('没有待分析的搜索词');
    return;
  }

  // 系统提示词
  const systemMsg = {
    role: 'system',
    content: `你是永铭电子电容产品的搜索意图分析专家。将搜索词归类：
找型号：用户在找具体的电容型号或料号（如VHT系列、CW3H）
找替代：用户在做替代料选型或竞品对比
找方案：用户在做方案选型需要推荐电容（如"车载OBC电容选型"）
查参数：用户查询电容的技术参数（如"400V 470μF"）
找厂家：用户在找电容生产厂家
其他：不明确或非产品相关

返回格式：仅返回类别名称，不要其他任何文字。`
  };

  let analyzed = 0;
  for (const t of terms) {
    try {
      const intent = await chat([
        systemMsg,
        { role: 'user', content: `搜索词：「${t.keyword}」` }
      ], { temperature: 0.3, max_tokens: 10 });

      const clean = intent.trim().replace(/[^找型号找替代找方案查参数找厂家其他]/g, '');
      await query(
        'UPDATE traffic_search_terms SET intent = ? WHERE keyword = ? AND source = "baidu_kw"',
        [clean || '其他', t.keyword]
      );
      analyzed++;
      console.log(`  ${t.keyword} → ${clean || '其他'}`);
      // 限速
      await new Promise(r => setTimeout(r, 500));
    } catch (e) {
      console.log(`  ${t.keyword} 分析失败: ${e.message}`);
    }
  }

  console.log(`意图分析完成: ${analyzed}/${terms.length} 条`);
})();
