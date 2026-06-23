// 搜索词 → 应用领域自动归类（每日拉完数据后执行）
require('dotenv').config();
const { query } = require('./db');

(async () => {
  console.log('===== 应用领域归类开始 =====');

  // 1. 初始化关键词表（若为空则补填）
  const kwCount = await query('SELECT COUNT(*) as cnt FROM traffic_app_keywords');
  if (kwCount[0].cnt === 0) {
    console.log('关键词表为空，初始化...');
    const keywords = [
      ['车载OBC','汽车电子'],['AEC-Q200','汽车电子'],['车规','汽车电子'],['车载','汽车电子'],['ECU','汽车电子'],
      ['BMS','汽车电子'],['车载充电机','汽车电子'],['EPS','汽车电子'],['安全气囊','汽车电子'],['智能驾驶','汽车电子'],
      ['汽车电子','汽车电子'],['48V轻混','汽车电子'],['车载DC-DC','汽车电子'],['OBC','汽车电子'],['车灯','汽车电子'],
      ['光伏','储能'],['逆变器','储能'],['储能变流器','储能'],['DC-Link','储能'],['储能','储能'],
      ['光伏逆变器','储能'],['PCS','储能'],['户用储能','储能'],['工商业储能','储能'],['风电','储能'],
      ['GPU','AI服务器'],['服务器电源','AI服务器'],['AI服务器','AI服务器'],['数据中心','AI服务器'],['算力','AI服务器'],['HPC','AI服务器'],
      ['电调','无人机'],['无人机','无人机'],['飞控','无人机'],['多旋翼','无人机'],
      ['关节驱动','机器人'],['伺服驱动','机器人'],['机器人','机器人'],['机械臂','机器人'],['AGV','机器人'],
      ['伺服','新型伺服驱动'],['变频器','新型伺服驱动'],['驱动器','新型伺服驱动'],['电机驱动','新型伺服驱动'],['工业电源','新型伺服驱动'],
      ['军工','军工'],['航天','军工'],['雷达','军工'],
      ['智能照明','智能照明'],['LED驱动','智能照明'],['照明','智能照明'],
      ['PD快充','PD快充'],['快充','PD快充'],['充电器','PD快充'],['GaN','PD快充'],['氮化镓','PD快充'],
      ['基站','通讯基站'],['5G','通讯基站'],['通讯','通讯基站'],['射频','通讯基站'],
    ];
    for (const [kw, domain] of keywords) {
      await query('INSERT IGNORE INTO traffic_app_keywords (keyword, app_domain) VALUES (?, ?)', [kw, domain]);
    }
    console.log(`关键词表初始化: ${keywords.length} 条`);
  }

  // 2. 读取未归类的搜索词
  const terms = await query(`
    SELECT DISTINCT keyword FROM traffic_search_terms
    WHERE source = 'baidu_kw' AND (app_domain IS NULL OR app_domain = '')
    ORDER BY pv DESC LIMIT 500
  `);

  if (terms.length === 0) {
    console.log('没有待归类的搜索词');
    return;
  }

  // 3. 逐个匹配
  const allKeywords = await query('SELECT keyword, app_domain FROM traffic_app_keywords');
  let matched = 0;
  for (const t of terms) {
    for (const kw of allKeywords) {
      if (t.keyword.includes(kw.keyword)) {
        await query(
          'UPDATE traffic_search_terms SET app_domain = ? WHERE keyword = ? AND source = "baidu_kw"',
          [kw.app_domain, t.keyword]
        );
        matched++;
        break;
      }
    }
  }

  console.log(`搜索词归类完成: ${matched}/${terms.length} 条匹配成功`);
})();
