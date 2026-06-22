/**
 * 永铭官网 — 产品体系图数据（系统图）
 * product-series.html 引用
 * 结构：产品线 → 封装分组 → 系列（含PDF路径）
 */
var YMIN = window.YMIN || {};
YMIN.seriesDiagram = (function(){
  'use strict';

  var DB = [
    {
      name: '液态铝电解电容器',
      nameEn: 'Liquid Aluminum Electrolytic Capacitor',
      icon: 'bolt',
      color: '#1B365D',
      diagramImages: [
        '产品资料库/体系图和系列列表/web_体系图/液态铝电解_贴片型引线型.png',
        '产品资料库/体系图和系列列表/web_体系图/液态铝电解_牛角型基板自立型.png',
        '产品资料库/体系图和系列列表/web_体系图/液态铝电解_螺栓型.png'
      ],
      packages: [
        {
          name: '贴片型 (SMD)',
          series: [
            { name: 'VMM',  desc: '5mm高薄型品', temp: '105℃', life: '3000~8000H', voltage: '6.3~100V', pdf: '系列PDF/VMM.pdf' },
            { name: 'V3M',  desc: '低阻抗薄型高容量化品', temp: '105℃', life: '2000~5000H', voltage: '6.3~100V', pdf: '系列PDF/V3M.pdf' },
            { name: 'V3MC', desc: '超高容量 低阻抗小型化', temp: '105℃', life: '2000H', voltage: '6.3~100V', pdf: '系列PDF/V3MC.pdf' },
            { name: 'VK7',  desc: '7mm高超小型品', temp: '105℃', life: '2000~5000H', voltage: '6.3~50V', pdf: '系列PDF/VK7.pdf' },
            { name: 'VKO',  desc: '高纹波电流 长寿命小型化品', temp: '105℃', life: '7000~10000H', voltage: '6.3~50V', pdf: '系列PDF/VKO.pdf' },
            { name: 'VKL',  desc: '高纹波电流 耐高温长寿命品', temp: '125℃', life: '2000~5000H', voltage: '10~100V', pdf: '系列PDF/VKL.pdf' },
            { name: 'VKM',  desc: '高纹波电流标准品 9000h', temp: '105℃', life: '6000~8000H', voltage: '6.3~100V', pdf: '系列PDF/VKM.pdf' }
          ]
        },
        {
          name: '引线型 (Radial)',
          series: [
            { name: 'LK',   desc: '低阻抗长寿命品 AEC-Q200', temp: '105℃', life: '5000~10000H', voltage: '16~400V', pdf: '系列PDF/LK.pdf' },
            { name: 'LKF',  desc: '高纹波电流 低阻抗小型化', temp: '105℃', life: '6000~8000H', voltage: '6.3~100V', pdf: '系列PDF/LKF.pdf' },
            { name: 'LKM',  desc: '高纹波电流 低阻抗标准品', temp: '105℃', life: '7000~10000H', voltage: '6.3~100V', pdf: null },
            { name: 'LKJ',  desc: '高纹波电流 低阻抗小型化', temp: '105℃', life: '6000~8000H', voltage: '6.3~100V', pdf: null },
            { name: 'LKZ',  desc: '路灯专用高纹波 低阻抗长寿命', temp: '105℃', life: '12000~15000H', voltage: '6.3~100V', pdf: null },
            { name: 'LKG',  desc: '高纹波电流 长寿命低温启动', temp: '105℃', life: '8000~12000H', voltage: '6.3~100V', pdf: '系列PDF/LKG.pdf' },
            { name: 'LKC',  desc: '超小体积耐高温 高压长寿命', temp: '105℃', life: '6000~10000H', voltage: '160~450V', pdf: null },
            { name: 'LKL',  desc: '高纹波电流 低阻抗', temp: '105℃', life: '7000~10000H', voltage: '6.3~100V', pdf: '系列PDF/LKL.pdf' },
            { name: 'LKL(R)', desc: '135℃超高温 DC-Link专用', temp: '135℃', life: '2000~4000H', voltage: '16~63V', pdf: '系列PDF/LKL(R).pdf' }
          ]
        },
        {
          name: '牛角型 (Snap-in)',
          series: [
            { name: 'CW3',  desc: '逆变器/变流器 350~600V', temp: '105℃', life: '3000H', voltage: '350~600V', pdf: '系列PDF/CW3.pdf' },
            { name: 'CW6',  desc: '逆变器/变流器 长寿命', temp: '105℃', life: '6000H', voltage: '350~600V', pdf: '系列PDF/CW6.pdf' }
          ]
        }
      ]
    },
    {
      name: '双电层超级电容',
      nameEn: 'EDLC Supercapacitor',
      icon: 'battery_charging_full',
      color: '#2a4a7f',
      diagramImages: ['产品资料库/体系图和系列列表/web_体系图/超级电容_双电层与LIC.png'],
      packages: [
        {
          name: '双电层单体',
          series: [
            { name: 'SDN', desc: '超大容量品 2.7/3.0V', temp: '-40~+70℃', life: '1000H', voltage: '2.7~3.0V', pdf: null },
            { name: 'SDB', desc: '低ESR高容量品 2.7V', temp: '-40~+70℃', life: '1000H', voltage: '2.7V', pdf: '系列PDF/SDB.pdf' },
            { name: 'SDL', desc: '耐高温车规品 3.0V', temp: '-40~+85℃', life: '1000H', voltage: '3.0V', pdf: null },
            { name: 'SDH', desc: '高电压高容量品 2.7V', temp: '-40~+70℃', life: '1000H', voltage: '2.7V', pdf: null }
          ]
        },
        {
          name: '双电层模组',
          series: [
            { name: 'SM',  desc: '大功率高能量品 灌胶 5.5/7.5V', temp: '-40~+70℃', life: '1000H', voltage: '5.5~7.5V', pdf: null },
            { name: 'SDM', desc: '大功率高容量品 套管 5.5/6.0V', temp: '-40~+70℃', life: '1000H', voltage: '5.5~6.0V', pdf: '系列PDF/SDM.pdf' },
            { name: 'SLM', desc: '双电层模组 大电流快充', temp: '-30~+70℃', life: '50万次', voltage: '定制', pdf: null }
          ]
        }
      ]
    },
    {
      name: '高分子固态铝电解电容器',
      nameEn: 'Polymer Solid Aluminum Electrolytic Capacitor',
      icon: 'layers',
      color: '#1a5632',
      diagramImages: ['产品资料库/体系图和系列列表/web_体系图/高分子固态铝电解.png'],
      packages: [
        {
          name: '贴片型 (SMD)',
          series: [
            { name: 'VPX', desc: '耐高频大纹波 低ESR小型化品', temp: '105℃', life: '2000H', voltage: '6.3~100V', pdf: null },
            { name: 'NPX', desc: '超低ESR(≤10mΩ) 小型化', temp: '105℃', life: '2000H', voltage: '2.5~16V', pdf: null },
            { name: 'VPC', desc: '超长寿命高可靠 2.5~16V', temp: '105℃', life: '2000H', voltage: '2.5~16V', pdf: null },
            { name: 'VPW', desc: '超低ESR耐大纹波电流', temp: '105℃', life: '15000H', voltage: '2.5~50V', pdf: null }
          ]
        },
        {
          name: '引线型 (Radial)',
          series: [
            { name: 'NPC', desc: '耐高频大纹波 超低ESR', temp: '105℃', life: '2000H', voltage: '6.3~100V', pdf: null },
            { name: 'NPM', desc: '低ESR 3.55mm/4mm直径', temp: '105℃', life: '5000H', voltage: '6.3~100V', pdf: null },
            { name: 'NPL', desc: '低ESR长寿命品', temp: '105℃', life: '2000H', voltage: '6.3~100V', pdf: null }
          ]
        }
      ]
    },
    {
      name: '混合型超级电容（锂离子电容）',
      nameEn: 'Hybrid Supercapacitor (LIC)',
      icon: 'electric_bolt',
      color: '#5c3d1a',
      diagramImages: ['产品资料库/体系图和系列列表/web_体系图/超级电容_双电层与LIC.png'],
      packages: [
        {
          name: '混合型LIC单体/模组',
          series: [
            { name: 'SLA', desc: 'LIC标准品 3.8V', temp: '-20~+85℃', life: '1000H', voltage: '3.8V', pdf: null },
            { name: 'SLR', desc: 'LIC低温品 3.8V', temp: '-40~+70℃', life: '1000H', voltage: '3.8V', pdf: null },
            { name: 'SLM', desc: 'LIC模组 定制专用模组', temp: '根据应用', life: '定制', voltage: '定制', pdf: null }
          ]
        }
      ]
    },
    {
      name: '高分子混合动力铝电解电容器',
      nameEn: 'Polymer Hybrid Aluminum Electrolytic Capacitor',
      icon: 'water_drop',
      color: '#4a1a5c',
      diagramImages: ['产品资料库/体系图和系列列表/web_体系图/高分子混合动力铝电解.png'],
      packages: [
        {
          name: '贴片型 (SMD)',
          series: [
            { name: 'VHT', desc: '高可靠低ESR 耐高温 125℃', temp: '125℃', life: '4000H', voltage: '16~100V', pdf: '系列PDF/VHT.pdf' },
            { name: 'VHU', desc: '低漏电流 125℃ AEC-Q200', temp: '125℃', life: '4000H', voltage: '16~63V', pdf: '系列PDF/VHU.pdf' },
            { name: 'VHM', desc: '高可靠低ESR 高纹波 125℃', temp: '125℃', life: '4000H', voltage: '16~100V', pdf: '系列PDF/VHM.pdf' },
            { name: 'VHX', desc: '高耐压 长寿命 16~160V', temp: '105℃', life: '2000~5000H', voltage: '16~160V', pdf: '系列PDF/VHX.pdf' },
            { name: 'VHR', desc: '高可靠低ESR 150℃超高温', temp: '150℃', life: '2000H', voltage: '16~63V', pdf: '系列PDF/VHR.pdf' },
            { name: 'VHE', desc: '135℃超高温 热管理专用', temp: '135℃', life: '4000H', voltage: '16~63V', pdf: null }
          ]
        },
        {
          name: '引线型 (Radial)',
          series: [
            { name: 'NHX', desc: '高可靠低ESR 长寿命', temp: '125℃', life: '4000H', voltage: '16~160V', pdf: null },
            { name: 'NGY', desc: '高耐压 长寿命 高纹波', temp: '105℃', life: '2000~5000H', voltage: '16~80V', pdf: null },
            { name: 'NHT', desc: '高可靠低ESR 高纹波 105℃', temp: '105℃', life: '10000H', voltage: '16~80V', pdf: '系列PDF/NHT.pdf' }
          ]
        }
      ]
    },
    {
      name: '叠层高分子固态铝电解电容器',
      nameEn: 'Stacked Polymer Solid Aluminum Electrolytic Capacitor',
      icon: 'stacked_bar_chart',
      color: '#1a3a5c',
      diagramImages: ['产品资料库/体系图和系列列表/web_体系图/叠层高分子固态铝电解.png'],
      packages: [
        {
          name: '贴片型 (SMD)',
          series: [
            { name: 'MPS',  desc: '叠层型 7.3×4.3×1.9mm', temp: '105℃', life: '2000H', voltage: '2~2.5V', pdf: null },
            { name: 'MPD19', desc: '叠层型 7.3×4.3×1.9mm 高压', temp: '105℃', life: '2000H', voltage: '2~50V', pdf: null }
          ]
        }
      ]
    },
    {
      name: '薄膜电容器',
      nameEn: 'Metallized Film Capacitor',
      icon: 'filter_alt',
      color: '#3a4a1a',
      diagramImages: ['产品资料库/体系图和系列列表/web_体系图/薄膜电容器.png'],
      packages: [
        {
          name: '插针式 (Box-type)',
          series: [
            { name: 'MDP', desc: '标准品插针电容 500~1600Vdc', temp: '-40~105℃', life: '—', voltage: '500~1600V', pdf: null },
            { name: 'MDR', desc: '定制品 高容量 1400~1600V', temp: '105℃', life: '100000H', voltage: '1400~1600V', pdf: null }
          ]
        }
      ]
    },
    {
      name: '导电高分子钽电解电容器',
      nameEn: 'Conductive Polymer Tantalum Electrolytic Capacitor',
      icon: 'memory',
      color: '#5c1a1a',
      diagramImages: ['产品资料库/体系图和系列列表/web_体系图/导电高分子钽电解电容器.png'],
      packages: [
        {
          name: '贴片型 (SMD)',
          series: [
            { name: 'TPB19', desc: '7.3×4.3×1.9mm 16~100V', temp: '105℃', life: '2000H', voltage: '16~100V', pdf: null },
            { name: 'TQB19', desc: '3.5×2.8×1.9mm 35~63V', temp: '105℃', life: '2000H', voltage: '35~63V', pdf: null },
            { name: 'TQD15', desc: '7.3×4.3×1.5mm 薄型 16~35V', temp: '105℃', life: '2000H', voltage: '16~35V', pdf: null },
            { name: 'TQD19', desc: '3.5×2.8×1.9mm 16~100V', temp: '105℃', life: '2000H', voltage: '16~100V', pdf: null }
          ]
        }
      ]
    }
  ];

  /**
   * 获取所有产品线数据
   * @returns {Array}
   */
  function getAll() {
    return DB;
  }

  /**
   * 根据系列名查找PDF路径
   * @param {string} seriesName
   * @returns {string|null}
   */
  function getPdf(seriesName) {
    for (var i = 0; i < DB.length; i++) {
      var pkgs = DB[i].packages;
      for (var j = 0; j < pkgs.length; j++) {
        var seriesList = pkgs[j].series;
        for (var k = 0; k < seriesList.length; k++) {
          if (seriesList[k].name === seriesName) {
            return seriesList[k].pdf || null;
          }
        }
      }
    }
    return null;
  }

  /**
   * 获取所有系列的平面列表（用于表格）
   * @returns {Array}
   */
  function getAllSeriesFlat() {
    var result = [];
    for (var i = 0; i < DB.length; i++) {
      var line = DB[i];
      var pkgs = line.packages;
      for (var j = 0; j < pkgs.length; j++) {
        var pkg = pkgs[j];
        var seriesList = pkg.series;
        for (var k = 0; k < seriesList.length; k++) {
          var s = seriesList[k];
          result.push({
            productLine: line.name,
            productLineIcon: line.icon,
            productLineColor: line.color,
            package: pkg.name,
            series: s.name,
            desc: s.desc,
            temp: s.temp,
            life: s.life,
            voltage: s.voltage,
            pdf: s.pdf
          });
        }
      }
    }
    return result;
  }

  return {
    getAll: getAll,
    getPdf: getPdf,
    getAllSeriesFlat: getAllSeriesFlat
  };
})();
