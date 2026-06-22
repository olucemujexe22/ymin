// DeepSeek 大模型 API 调用模块
const axios = require('axios');

const API_KEY = process.env.DEEPSEEK_API_KEY;
const BASE_URL = process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com';

async function chat(messages, options = {}) {
  const res = await axios.post(
    `${BASE_URL}/v1/chat/completions`,
    {
      model: 'deepseek-chat',
      messages,
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 2000,
      stream: false
    },
    {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    }
  );
  return res.data.choices[0].message.content;
}

// 搜索词意图分类
async function classifySearchIntent(keyword) {
  const systemMsg = {
    role: 'system',
    content: `你是永铭电子电容产品的搜索意图分析专家。请将搜索词归类为以下类别之一，只返回类别名称：
- 找型号：用户在找具体的电容型号或料号
- 找替代：用户在找替代料或竞品对比
- 找方案：用户在做方案选型，需要推荐电容
- 查参数：用户在查电容的技术参数或规格
- 找厂家：用户在找电容生产厂家
- 其他`
  };
  const userMsg = { role: 'user', content: `搜索词：「${keyword}」` };
  const result = await chat([systemMsg, userMsg], { temperature: 0.3, max_tokens: 20 });
  return result.trim();
}

// NL 对话：分析用户查询意图，返回结构化查询参数
async function understandQuery(userMessage) {
  const systemMsg = {
    role: 'system',
    content: `你是永铭电子官网流量分析智能体「官网小铭同学」的意图理解模块。
用户会输入自然语言查询，你需要理解意图并返回JSON格式的查询参数。

支持的查询类型及参数：
{
  "type": "ranking",        // 排行榜查询
  "product_line": "液态铝电解电容器",  // 产品线（可选）
  "app_domain": "汽车电子",           // 应用领域（可选）
  "period": "7d",            // 时间范围: 1d/7d/30d
  "limit": 10               // 返回条数
}
{
  "type": "trend",          // 趋势查询
  "product_line": "...",
  "period": "7d"
}
{
  "type": "search_terms",   // 搜索词查询
  "app_domain": "...",
  "period": "30d"
}
{
  "type": "alert",          // 预警查询
  "alert_type": "surge"     // surge/decay/zero_traffic/all
}
{
  "type": "content",        // 内容评估
}
{
  "type": "report",         // 生成报告
  "report_type": "daily"    // daily/weekly/monthly
}
{
  "type": "dashboard"       // 仪表盘概览
}

只返回JSON，不要其他文字。`
  };
  const userMsg = { role: 'user', content: userMessage };
  const result = await chat([systemMsg, userMsg], { temperature: 0.3, max_tokens: 300 });
  try {
    return JSON.parse(result.trim().replace(/```json|```/g, ''));
  } catch {
    return { type: 'unknown', original: userMessage };
  }
}

// 预警原因推测
async function inferAlertReason(targetName, changeRate, alertType) {
  const systemMsg = {
    role: 'system',
    content: '你是永铭电子官网流量分析专家。根据产品/文章名称和流量变化率，推测可能的业务原因（50字以内简洁回答）。'
  };
  const userMsg = {
    role: 'user',
    content: `「${targetName}」流量${alertType === 'surge' ? '飙升' : '衰减'}了${changeRate}，推测可能原因？`
  };
  return await chat([systemMsg, userMsg], { temperature: 0.7, max_tokens: 100 });
}

// 周报摘要
async function generateSummary(metrics) {
  const systemMsg = {
    role: 'system',
    content: '你是永铭电子官网流量分析智能体。根据提供的指标数据，生成一段100字以内的摘要，突出关键变化和值得关注的信号。'
  };
  const userMsg = {
    role: 'user',
    content: `本周数据：总PV ${metrics.total_pv}，环比 ${metrics.pv_change}；总UV ${metrics.total_uv}，环比 ${metrics.uv_change}；搜索流量占比 ${metrics.search_ratio}%。${metrics.top_surge ? '飙升产品：' + metrics.top_surge : ''}`
  };
  return await chat([systemMsg, userMsg], { temperature: 0.7, max_tokens: 200 });
}

module.exports = { chat, classifySearchIntent, understandQuery, inferAlertReason, generateSummary };
