/**
 * 永铭官网 — 系列列表表格数据
 * product-series.html 引用
 * 扁平化所有系列，含详细规格参数
 */
var YMIN = window.YMIN || {};
YMIN.seriesTable = (function(){
  'use strict';

  var DB = [
    // ==================== 液态铝电解电容器 ====================
    {series:'VMM',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~100V', cap:'0.1~1000µF', temp:'-55~105℃', life:'3000~8000H', esr:'低阻抗', feature:'5mm高超小型品', aec:false, rohs:true, pdf:'系列PDF/VMM.pdf'},
    {series:'V3M',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~100V', cap:'0.1~1000µF', temp:'-55~105℃', life:'2000~5000H', esr:'低阻抗', feature:'低阻抗薄型高容量化品', aec:false, rohs:true, pdf:'系列PDF/V3M.pdf'},
    {series:'V3MC', productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~100V', cap:'1~2200µF', temp:'-55~105℃', life:'2000H', esr:'低阻抗', feature:'超高容量 低阻抗小型化', aec:false, rohs:true, pdf:'系列PDF/V3MC.pdf'},
    {series:'V4M',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~50V', cap:'—', temp:'-55~105℃', life:'1000H', esr:'标准', feature:'3.95mm LMAX 超小型品', aec:false, rohs:true, pdf:null},
    {series:'VK7',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~50V', cap:'10~470µF', temp:'-55~105℃', life:'2000~5000H', esr:'标准', feature:'7mm高超小型品', aec:false, rohs:true, pdf:'系列PDF/VK7.pdf'},
    {series:'VKO',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~50V', cap:'100~3300µF', temp:'-55~105℃', life:'7000~10000H', esr:'低', feature:'高纹波电流 AEC-Q200 大容量3300μF', aec:true, rohs:true, pdf:'系列PDF/VKO.pdf'},
    {series:'VKL',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'10~100V', cap:'10~470µF', temp:'-55~125℃', life:'2000~5000H', esr:'低', feature:'高纹波电流 耐高温长寿命品', aec:false, rohs:true, pdf:'系列PDF/VKL.pdf'},
    {series:'VKM',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~100V', cap:'10~680µF', temp:'-55~105℃', life:'6000~9000H', esr:'低', feature:'高纹波电流标准品 AEC-Q200 9000h', aec:true, rohs:true, pdf:'系列PDF/VKM.pdf'},
    {series:'VKG',  productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'6.3~100V', cap:'—', temp:'-55~105℃', life:'8000~12000H', esr:'低', feature:'高纹波电流 长寿命品', aec:false, rohs:true, pdf:null},
    {series:'VKL(R)',productLine:'液态铝电解电容器', pkg:'贴片型', voltage:'16~63V', cap:'—', temp:'-55~135℃', life:'2000H', esr:'低', feature:'耐高温 低阻抗品', aec:false, rohs:true, pdf:null},
    {series:'LK',   productLine:'液态铝电解电容器', pkg:'引线型', voltage:'16~400V', cap:'4.7~470µF', temp:'-40~105℃', life:'5000~10000H', esr:'低', feature:'AEC-Q200 极低漏电流 6000h长寿命', aec:true, rohs:true, pdf:'系列PDF/LK.pdf'},
    {series:'LKF',  productLine:'液态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'10~2200µF', temp:'-55~105℃', life:'6000~8000H', esr:'低阻抗', feature:'高纹波电流 低阻抗小型化', aec:false, rohs:true, pdf:'系列PDF/LKF.pdf'},
    {series:'LKM',  productLine:'液态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'10~2200µF', temp:'-55~105℃', life:'7000~10000H', esr:'低阻抗', feature:'高纹波电流 低阻抗标准品', aec:false, rohs:true, pdf:null},
    {series:'LKJ',  productLine:'液态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'10~1000µF', temp:'-55~105℃', life:'6000~8000H', esr:'低阻抗', feature:'高纹波电流 低阻抗小型化', aec:false, rohs:true, pdf:null},
    {series:'LKZ',  productLine:'液态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'47~2200µF', temp:'-55~105℃', life:'12000~15000H', esr:'低阻抗', feature:'路灯专用 高纹波电流 低阻抗长寿命', aec:false, rohs:true, pdf:null},
    {series:'LKG',  productLine:'液态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'47~2200µF', temp:'-55~105℃', life:'8000~12000H', esr:'低阻抗', feature:'高纹波电流 长寿命低温启动', aec:false, rohs:true, pdf:'系列PDF/LKG.pdf'},
    {series:'LKL',  productLine:'液态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'10~1000µF', temp:'-55~105℃', life:'7000~10000H', esr:'低阻抗', feature:'高纹波电流 低阻抗', aec:false, rohs:true, pdf:'系列PDF/LKL.pdf'},
    {series:'LKL(R)',productLine:'液态铝电解电容器', pkg:'引线型', voltage:'16~63V', cap:'470~4700µF', temp:'-55~135℃', life:'2000~4000H', esr:'低', feature:'135℃超高温 DC-Link专用 AEC-Q200', aec:true, rohs:true, pdf:'系列PDF/LKL(R).pdf'},
    {series:'LKC',  productLine:'液态铝电解电容器', pkg:'引线型', voltage:'160~450V', cap:'1~100µF', temp:'-40~105℃', life:'6000~10000H', esr:'低阻抗', feature:'超小体积耐高温 高压长寿命', aec:false, rohs:true, pdf:null},
    {series:'CW3',  productLine:'液态铝电解电容器', pkg:'牛角型', voltage:'350~600V', cap:'100~1000µF', temp:'-40~105℃', life:'3000H', esr:'低', feature:'逆变器/变流器 DC-Link', aec:false, rohs:true, pdf:'系列PDF/CW3.pdf'},
    {series:'CW6',  productLine:'液态铝电解电容器', pkg:'牛角型', voltage:'350~600V', cap:'100~1000µF', temp:'-40~105℃', life:'6000H', esr:'低', feature:'逆变器/变流器 长寿命 DC-Link', aec:false, rohs:true, pdf:'系列PDF/CW6.pdf'},

    // ==================== 双电层超级电容 ====================
    {series:'SDN',  productLine:'双电层超级电容', pkg:'单体', voltage:'2.7~3.0V', cap:'1~100F', temp:'-40~+70℃', life:'1000H', esr:'低', feature:'超大容量品', aec:false, rohs:true, pdf:null},
    {series:'SDB',  productLine:'双电层超级电容', pkg:'单体', voltage:'2.7V', cap:'1~100F', temp:'-40~+70℃', life:'1000H', esr:'低ESR', feature:'低ESR高容量品', aec:false, rohs:true, pdf:'系列PDF/SDB.pdf'},
    {series:'SDL',  productLine:'双电层超级电容', pkg:'单体', voltage:'3.0V', cap:'1~100F', temp:'-40~+85℃', life:'1000H', esr:'低', feature:'耐高温车规品', aec:false, rohs:true, pdf:null},
    {series:'SDH',  productLine:'双电层超级电容', pkg:'单体', voltage:'2.7V', cap:'1~100F', temp:'-40~+70℃', life:'1000H', esr:'标准', feature:'高电压高容量品', aec:false, rohs:true, pdf:null},
    {series:'SM',   productLine:'双电层超级电容', pkg:'模组', voltage:'5.5~7.5V', cap:'定制', temp:'-40~+70℃', life:'1000H', esr:'低', feature:'大功率高能量品 灌胶', aec:false, rohs:true, pdf:null},
    {series:'SDM',  productLine:'双电层超级电容', pkg:'模组', voltage:'5.5~6.0V', cap:'定制', temp:'-40~+70℃', life:'1000H', esr:'低', feature:'大功率高容量品 套管', aec:false, rohs:true, pdf:'系列PDF/SDM.pdf'},
    {series:'SLM',  productLine:'双电层超级电容', pkg:'模组', voltage:'定制', cap:'定制', temp:'-30~+70℃', life:'50万次', esr:'极低', feature:'大电流快充 毫秒级响应', aec:false, rohs:true, pdf:null},

    // ==================== 高分子固态铝电解电容器 ====================
    {series:'VPX',  productLine:'高分子固态铝电解电容器', pkg:'贴片型', voltage:'6.3~100V', cap:'10~470µF', temp:'-55~105℃', life:'2000H', esr:'超低', feature:'耐高频大纹波 低ESR小型化品', aec:false, rohs:true, pdf:null},
    {series:'NPX',  productLine:'高分子固态铝电解电容器', pkg:'贴片型', voltage:'2.5~16V', cap:'47~1000µF', temp:'-55~105℃', life:'2000H', esr:'≤10mΩ', feature:'超低ESR 小型化 域控制器专用', aec:false, rohs:true, pdf:null},
    {series:'VPC',  productLine:'高分子固态铝电解电容器', pkg:'贴片型', voltage:'2.5~16V', cap:'100~470µF', temp:'-55~105℃', life:'2000H', esr:'超低', feature:'超长寿命高可靠', aec:false, rohs:true, pdf:null},
    {series:'VPW',  productLine:'高分子固态铝电解电容器', pkg:'贴片型', voltage:'2.5~50V', cap:'10~470µF', temp:'-55~105℃', life:'15000H', esr:'超低', feature:'超低ESR耐大纹波电流 超长寿命', aec:false, rohs:true, pdf:null},
    {series:'NPC',  productLine:'高分子固态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'47~1000µF', temp:'-55~105℃', life:'2000H', esr:'超低', feature:'耐高频大纹波 超低ESR', aec:false, rohs:true, pdf:null},
    {series:'NPM',  productLine:'高分子固态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'10~470µF', temp:'-55~105℃', life:'5000H', esr:'低ESR', feature:'低ESR 3.55/4mm直径 长寿命', aec:false, rohs:true, pdf:null},
    {series:'NPL',  productLine:'高分子固态铝电解电容器', pkg:'引线型', voltage:'6.3~100V', cap:'10~470µF', temp:'-55~105℃', life:'2000H', esr:'低ESR', feature:'低ESR长寿命品', aec:false, rohs:true, pdf:null},

    // ==================== 混合型超级电容(锂离子电容) ====================
    {series:'SLA',  productLine:'混合型超级电容(锂离子电容)', pkg:'单体', voltage:'3.8V', cap:'10~200F', temp:'-20~+85℃', life:'1000H', esr:'低', feature:'LIC标准品 3.8V', aec:false, rohs:true, pdf:null},
    {series:'SLR',  productLine:'混合型超级电容(锂离子电容)', pkg:'单体', voltage:'3.8V', cap:'10~200F', temp:'-40~+70℃', life:'1000H', esr:'低', feature:'LIC低温品', aec:false, rohs:true, pdf:null},
    {series:'SLM-LIC', productLine:'混合型超级电容(锂离子电容)', pkg:'模组', voltage:'定制', cap:'定制', temp:'根据应用', life:'定制', esr:'极低', feature:'LIC模组 定制专用', aec:false, rohs:true, pdf:null},

    // ==================== 高分子混合动力铝电解电容器 ====================
    {series:'VHT',  productLine:'高分子混合动力铝电解电容器', pkg:'贴片型', voltage:'16~100V', cap:'10~470µF', temp:'-55~125℃', life:'4000H', esr:'≤8mΩ', feature:'高可靠低ESR 耐高温 AEC-Q200', aec:true, rohs:true, pdf:'系列PDF/VHT.pdf'},
    {series:'VHU',  productLine:'高分子混合动力铝电解电容器', pkg:'贴片型', voltage:'16~63V', cap:'22~330µF', temp:'-55~125℃', life:'4000H', esr:'低', feature:'低漏电流 125℃ AEC-Q200', aec:true, rohs:true, pdf:'系列PDF/VHU.pdf'},
    {series:'VHM',  productLine:'高分子混合动力铝电解电容器', pkg:'贴片型', voltage:'16~100V', cap:'10~330µF', temp:'-55~125℃', life:'4000H', esr:'低', feature:'高可靠低ESR 高纹波 耐高温', aec:false, rohs:true, pdf:'系列PDF/VHM.pdf'},
    {series:'VHX',  productLine:'高分子混合动力铝电解电容器', pkg:'贴片型', voltage:'16~160V', cap:'22~470µF', temp:'-55~105℃', life:'2000~5000H', esr:'低', feature:'高耐压 长寿命 16~160V', aec:false, rohs:true, pdf:'系列PDF/VHX.pdf'},
    {series:'VHR',  productLine:'高分子混合动力铝电解电容器', pkg:'贴片型', voltage:'16~63V', cap:'33~270µF', temp:'-55~150℃', life:'2000H', esr:'低', feature:'150℃超高温 高可靠', aec:false, rohs:true, pdf:'系列PDF/VHR.pdf'},
    {series:'VHE',  productLine:'高分子混合动力铝电解电容器', pkg:'引线型', voltage:'16~63V', cap:'22~470µF', temp:'-55~135℃', life:'4000H', esr:'低', feature:'135℃超高温 热管理专用 AEC-Q200', aec:true, rohs:true, pdf:null},
    {series:'NHX',  productLine:'高分子混合动力铝电解电容器', pkg:'引线型', voltage:'16~160V', cap:'22~470µF', temp:'-55~125℃', life:'4000H', esr:'低', feature:'高可靠低ESR 长寿命', aec:false, rohs:true, pdf:null},
    {series:'NGY',  productLine:'高分子混合动力铝电解电容器', pkg:'引线型', voltage:'16~80V', cap:'22~470µF', temp:'-55~105℃', life:'2000~5000H', esr:'低', feature:'高耐压 长寿命 高纹波', aec:false, rohs:true, pdf:null},
    {series:'NHT',  productLine:'高分子混合动力铝电解电容器', pkg:'引线型', voltage:'16~80V', cap:'22~470µF', temp:'-55~105℃', life:'10000H', esr:'低', feature:'高可靠低ESR 高纹波 10000h', aec:false, rohs:true, pdf:'系列PDF/NHT.pdf'},

    // ==================== 叠层高分子固态铝电解电容器 ====================
    {series:'MPS',  productLine:'叠层高分子固态铝电解电容器', pkg:'贴片型', voltage:'2~2.5V', cap:'470~560µF', temp:'-55~105℃', life:'2000H', esr:'超低', feature:'叠层型 7.3×4.3×1.9mm', aec:false, rohs:true, pdf:null},
    {series:'MPD19',productLine:'叠层高分子固态铝电解电容器', pkg:'贴片型', voltage:'2~50V', cap:'10~560µF', temp:'-55~105℃', life:'2000H', esr:'超低', feature:'叠层型 7.3×4.3×1.9mm 高压', aec:false, rohs:true, pdf:null},

    // ==================== 薄膜电容器 ====================
    {series:'MDP',  productLine:'薄膜电容器', pkg:'插针式', voltage:'500~1600V', cap:'0.47~250µF', temp:'-40~105℃', life:'—', esr:'极低', feature:'标准品插针电容', aec:false, rohs:true, pdf:null},
    {series:'MDR',  productLine:'薄膜电容器', pkg:'插针式', voltage:'1400~1600V', cap:'500~2000µF', temp:'-40~105℃', life:'100000H', esr:'极低', feature:'定制品 高容量 超长寿命', aec:false, rohs:true, pdf:null},

    // ==================== 导电高分子钽电解电容器 ====================
    {series:'TPB19',productLine:'导电高分子钽电解电容器', pkg:'贴片型', voltage:'16~100V', cap:'1.5~47µF', temp:'-55~105℃', life:'2000H', esr:'低', feature:'7.3×4.3×1.9mm 16~100V', aec:false, rohs:true, pdf:null},
    {series:'TQB19',productLine:'导电高分子钽电解电容器', pkg:'贴片型', voltage:'35~63V', cap:'10~47µF', temp:'-55~105℃', life:'2000H', esr:'低', feature:'3.5×2.8×1.9mm 小型化', aec:false, rohs:true, pdf:null},
    {series:'TQD15',productLine:'导电高分子钽电解电容器', pkg:'贴片型', voltage:'16~35V', cap:'68~220µF', temp:'-55~105℃', life:'2000H', esr:'低', feature:'7.3×4.3×1.5mm 薄型', aec:false, rohs:true, pdf:null},
    {series:'TQD19',productLine:'导电高分子钽电解电容器', pkg:'贴片型', voltage:'16~100V', cap:'1.2~33µF', temp:'-55~105℃', life:'2000H', esr:'低', feature:'3.5×2.8×1.9mm 16~100V', aec:false, rohs:true, pdf:null}
  ];

  function addMissingSeriesRows() {
    var seen = {};
    DB.forEach(function(row) {
      seen[row.productLine + '|' + row.series] = true;
    });

    function add(line, pkg, series, voltage, temp, life, feature) {
      var key = line + '|' + series;
      if (seen[key]) return;
      seen[key] = true;
      DB.push({
        series: series,
        productLine: line,
        pkg: pkg,
        voltage: voltage || '—',
        cap: '—',
        temp: temp || '—',
        life: life || '—',
        esr: '—',
        feature: feature || '按产品体系图补充',
        aec: false,
        rohs: true,
        pdf: null,
        supplemental: true
      });
    }

    var liquid = '液态铝电解电容器';
    [
      ['贴片型', 'VKD', '—', '—', '—', '量身定制产品'],
      ['基板自立型', 'CW6H', '350~600V', '-40~105℃', '6000H', '新能源汽车电子'],
      ['基板自立型', 'CN6', '350~500V', '-40~85℃', '6000H', '电源、变频器'],
      ['基板自立型', 'CW3S', '350~500V', '-40~105℃', '3000H', '电源小型化'],
      ['基板自立型', 'CW3H', '350~600V', '-40~105℃', '3000H', '新能源汽车电子'],
      ['基板自立型', 'CN3', '350~500V', '-40~85℃', '3000H', '电源、变频器'],
      ['基板自立型', 'SH15', '160~400V', '-40~105℃', '3000H', '电源薄型化'],
      ['基板自立型', 'SW3', '16~500V', '-40~105℃', '3000H', '电源、变频器'],
      ['基板自立型', 'SN3', '16~550V', '-40~85℃', '3000H', '电源、变频器'],
      ['基板自立型', 'SW6', '10~500V', '-25~105℃', '6000H', '电源、变频器'],
      ['基板自立型', 'SN6', '16~500V', '-40~85℃', '6000H', '电源、变频器'],
      ['基板自立型', 'IDC3', '450~500V', '-40~105℃', '3000H', 'AI服务器主供电源'],
      ['基板自立型', 'CKD', '—', '—', '—', '量身定制产品'],
      ['螺栓型', 'ES3M', '200~500V', '-25~85℃', '3000H', '电源、变频、中频炉'],
      ['螺栓型', 'EW3', '200~500V', '-25~105℃', '3000H', 'UPS电源、工控'],
      ['螺栓型', 'ES3', '200~500V', '-25~85℃', '3000H', 'UPS电源、工业控制器'],
      ['螺栓型', 'EH3', '550~630V', '-25~85℃', '3000H', '光伏、工控'],
      ['螺栓型', 'EW6', '350~500V', '-25~105℃', '6000H', 'UPS电源、工控、工业伺服'],
      ['螺栓型', 'ES6', '200~500V', '-25~85℃', '6000H', 'UPS、工业变频'],
      ['螺栓型', 'EH6', '550~630V', '-25~85℃', '6000H', '光伏、工控'],
      ['螺栓型', 'EKD', '—', '—', '—', '量身定制产品']
    ].forEach(function(r) { add(liquid, r[0], r[1], r[2], r[3], r[4], r[5]); });

    var solid = '高分子固态铝电解电容器';
    ['VPH','VPT','VP1','VPL','VPG','VP4','NPH','NPT','NP1','NPG','PKD'].forEach(function(series) {
      add(solid, series.charAt(0) === 'V' ? '贴片型' : (series === 'PKD' ? '量身定制产品' : '引线型'), series, '—', '—', '—', '按产品体系图补充');
    });

    var hybrid = '高分子混合动力铝电解电容器';
    ['VGY','HKD'].forEach(function(series) {
      add(hybrid, series === 'HKD' ? '量身定制产品' : '贴片型', series, '—', '—', '—', '按产品体系图补充');
    });

    var edlc = '双电层超级电容';
    ['SDV','SDA','SDS'].forEach(function(series) {
      add(edlc, '单体', series, '—', '—', '1000H', '按产品体系图补充');
    });

    var lic = '混合型超级电容(锂离子电容)';
    ['SLX','SLD','SLA(H)'].forEach(function(series) {
      add(lic, '单体', series, '3.8V/4.2V', '—', '1000H', '按产品体系图补充');
    });

    var stacked = '叠层高分子固态铝电解电容器';
    ['MPD10','MPD15','MPX','MPD28','MPU41'].forEach(function(series) {
      add(stacked, '贴片型', series, '—', '-55~105℃', '2000H', '按产品体系图补充');
    });

    var film = '薄膜电容器';
    ['MDP(X)','MDP(H)','MAP','MDR(X)','MDR(H)','MDA'].forEach(function(series) {
      add(film, series.indexOf('MDR') === 0 ? '矩形干式直流滤波电容' : (series === 'MDA' ? '铝壳圆形干式直流滤波电容' : '4引线方壳电容'), series, '—', '-40~105℃', '—', '按产品体系图补充');
    });

    var tantalum = '导电高分子钽电解电容器';
    ['TQD28','TQD42','TQW19','TQW42'].forEach(function(series) {
      add(tantalum, '贴片型', series, '16~100V', '-55~105℃', '—', '按产品体系图补充');
    });
  }

  addMissingSeriesRows();

  /**
   * 获取所有系列表格数据
   * @returns {Array}
   */
  function getAll() {
    return DB;
  }

  /**
   * 按产品线筛选
   * @param {string} line - 产品线名称
   * @returns {Array}
   */
  function filterByLine(line) {
    if (!line || line === '全部') return DB;
    return DB.filter(function(row) {
      return row.productLine === line;
    });
  }

  /**
   * 获取所有产品线名称（去重）
   * @returns {string[]}
   */
  function getProductLines() {
    var lines = [];
    var seen = {};
    DB.forEach(function(row) {
      if (!seen[row.productLine]) {
        seen[row.productLine] = true;
        lines.push(row.productLine);
      }
    });
    return lines;
  }

  return {
    getAll: getAll,
    filterByLine: filterByLine,
    getProductLines: getProductLines
  };
})();
