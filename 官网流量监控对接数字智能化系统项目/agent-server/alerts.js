// 预警规则引擎
const { query } = require('./db');
const { inferAlertReason } = require('./deepseekApi');

// 飙升检测：环比 >200% 且 UV > 10
async function checkSurgeAlerts() {
  console.log('[预警] 检测飙升...');
  const rows = await query(`
    SELECT 
      a.date as today_date,
      a.page_url,
      COALESCE(b.pv, 0) as yesterday_pv,
      a.pv as today_pv,
      (a.pv - COALESCE(b.pv, 0)) / NULLIF(COALESCE(b.pv, 0), 0) * 100 as change_rate,
      a.uv as today_uv
    FROM traffic_daily a
    LEFT JOIN traffic_daily b ON a.page_url = b.page_url AND b.date = DATE_SUB(a.date, INTERVAL 1 DAY)
    WHERE a.date = (SELECT MAX(date) FROM traffic_daily)
      AND a.pv > 0
      AND (a.pv - COALESCE(b.pv, 0)) / NULLIF(COALESCE(b.pv, 0), 0) > 2
      AND a.uv > 10
    ORDER BY change_rate DESC
    LIMIT 20
  `);

  for (const r of rows) {
    const changeRate = r.change_rate ? r.change_rate.toFixed(0) + '%' : 'N/A';
    const reason = await inferAlertReason(r.page_url, changeRate, 'surge').catch(() => '检测到流量异常飙升，建议关注');
    await query(
      `INSERT INTO traffic_alerts (alert_time, alert_type, target_name, target_url, change_rate, reason_hint)
       VALUES (NOW(), 'surge', ?, ?, ?, ?)`,
      [r.page_url, r.page_url, '+' + changeRate, reason]
    );
  }
  console.log(`[预警] 飙升: ${rows.length} 条`);
  return rows.length;
}

// 衰减检测：连续7天下降 >30%
async function checkDecayAlerts() {
  console.log('[预警] 检测衰减...');
  const rows = await query(`
    SELECT 
      a.page_url,
      AVG(CASE WHEN a.date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL 7 DAY) THEN a.pv ELSE NULL END) as recent_avg,
      AVG(CASE WHEN a.date < DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL 7 DAY) 
                AND a.date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL 14 DAY) THEN a.pv ELSE NULL END) as prior_avg
    FROM traffic_daily a
    WHERE a.date >= DATE_SUB((SELECT MAX(date) FROM traffic_daily), INTERVAL 14 DAY)
    GROUP BY a.page_url
    HAVING recent_avg > 0 AND prior_avg > 0
       AND (prior_avg - recent_avg) / prior_avg > 0.3
    ORDER BY (prior_avg - recent_avg) / prior_avg DESC
    LIMIT 20
  `);

  for (const r of rows) {
    const changeRate = r.prior_avg && r.recent_avg 
      ? ((r.prior_avg - r.recent_avg) / r.prior_avg * 100).toFixed(0) + '%'
      : 'N/A';
    const reason = await inferAlertReason(r.page_url, '-' + changeRate, 'decay').catch(() => '流量持续下降，建议检查页面状态');
    await query(
      `INSERT INTO traffic_alerts (alert_time, alert_type, target_name, target_url, change_rate, reason_hint)
       VALUES (NOW(), 'decay', ?, ?, ?, ?)`,
      [r.page_url, r.page_url, '-' + changeRate, reason]
    );
  }
  console.log(`[预警] 衰减: ${rows.length} 条`);
  return rows.length;
}

// 僵尸页面检测：30天UV=0
async function checkZeroTraffic() {
  console.log('[预警] 检测僵尸页面...');
  const rows = await query(`
    SELECT page_url, MAX(date) as last_seen
    FROM traffic_daily
    GROUP BY page_url
    HAVING MAX(date) <= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    LIMIT 50
  `);

  for (const r of rows) {
    await query(
      `INSERT INTO traffic_alerts (alert_time, alert_type, target_name, target_url, change_rate, reason_hint)
       VALUES (NOW(), 'zero_traffic', ?, ?, '30天无访问', '该页面近30天UV=0，建议检查是否为僵尸页面')`,
      [r.page_url, r.page_url]
    );
  }
  console.log(`[预警] 僵尸页面: ${rows.length} 条`);
  return rows.length;
}

// 运行全部检测
async function runAllChecks() {
  const results = {
    surge: await checkSurgeAlerts(),
    decay: await checkDecayAlerts(),
    zero_traffic: await checkZeroTraffic()
  };
  console.log('[预警] 全部检测完成:', results);
  return results;
}

module.exports = { checkSurgeAlerts, checkDecayAlerts, checkZeroTraffic, runAllChecks };
