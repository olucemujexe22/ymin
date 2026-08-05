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
      diagramImages: ['体系图和系列列表/web_体系图/液态铝电解_贴片型引线型.png','体系图和系列列表/web_体系图/液态铝电解_牛角型基板自立型.png','体系图和系列列表/web_体系图/液态铝电解_螺栓型.png'],
      nameEn: 'Liquid Aluminum Electrolytic Capacitor',
      icon: 'bolt',
      color: '#1B365D',
      packages: [
        {
          name: '贴片型 (SMD)',
          layout: {
            type: 'liquid-smd',
            label: '贴片型',
            width: 1120,
            height: 560,
            cardWidth: 190,
            cardHeight: 124,
            labelBox: { x: 10, y: 240, w: 150, h: 32 },
            nodes: {
              VMM: { x: 190, y: 24 },
              V3M: { x: 420, y: 24 },
              V3MC: { x: 650, y: 24 },
              V4M: { x: 880, y: 24 },
              VK7: { x: 190, y: 204 },
              VKO: { x: 420, y: 204 },
              VKM: { x: 650, y: 204 },
              'VKL(R)': { x: 190, y: 384 },
              VKL: { x: 420, y: 384 },
              VKG: { x: 650, y: 384 }
            },
            arrows: [
              { from: 'VMM', to: 'V3M', dir: 'right' },
              { from: 'V3M', to: 'V3MC', dir: 'right' },
              { from: 'V3MC', to: 'V4M', dir: 'right' },
              { from: 'VK7', to: 'VMM', dir: 'up' },
              { from: 'VKO', to: 'VK7', dir: 'left' },
              { from: 'VKO', to: 'VKM', dir: 'right' },
              { from: 'VKM', to: 'VKG', dir: 'down' },
              { from: 'VKG', to: 'VKL', dir: 'left' },
              { from: 'VKL', to: 'VKL(R)', dir: 'left' }
            ]
          },
          series: [
            { name: 'VMM',  no: 28, desc: '5mm高薄型品', temp: '105℃', life: '3000~8000H', voltage: '6.3~100V', pdf: '系列PDF/VMM.pdf' },
            { name: 'V3M',  no: 25, desc: '低阻抗 薄型 高容量化品', temp: '105℃', life: '2000~5000H', voltage: '6.3~100V', pdf: '系列PDF/V3M.pdf' },
            { name: 'V3MC', no: 23, desc: '超高容量 低阻抗 小型化', temp: '105℃', life: '2000H', voltage: '6.3~100V', pdf: '系列PDF/V3MC.pdf' },
            { name: 'V4M',  no: 21, desc: '3.95mm LMAX 超小型品', temp: '105℃', life: '1000H', voltage: '6.3~50V', pdf: null },
            { name: 'VK7',  no: 35, desc: '7mm高 超小型品', temp: '105℃', life: '4000~6000H', voltage: '6.3~50V', pdf: '系列PDF/VK7.pdf' },
            { name: 'VKO',  no: 38, desc: '高纹波电流 标准品', temp: '105℃', life: '6000~8000H', voltage: '6.3~50V', pdf: '系列PDF/VKO.pdf' },
            { name: 'VKM',  no: 45, desc: '高纹波电流 长寿命 小型化品', temp: '105℃', life: '7000~10000H', voltage: '6.3~100V', pdf: '系列PDF/VKM.pdf' },
            { name: 'VKG',  no: 52, desc: '高纹波电流 长寿命品', temp: '105℃', life: '8000~12000H', voltage: '6.3~100V', pdf: null },
            { name: 'VKL',  no: 59, desc: '高纹波电流 耐高温长寿命品', temp: '125℃', life: '2000~5000H', voltage: '10~100V', pdf: '系列PDF/VKL.pdf' },
            { name: 'VKL(R)', no: 63, desc: '耐高温 低阻抗品', temp: '135℃', life: '2000H', voltage: '16~63V', pdf: null }
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
      diagramImages: ['体系图和系列列表/web_体系图/超级电容_双电层与LIC.png'],
      nameEn: 'EDLC Supercapacitor',
      icon: 'battery_charging_full',
      color: '#2a4a7f',
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
      diagramImages: ['体系图和系列列表/web_体系图/高分子固态铝电解.png'],
      nameEn: 'Polymer Solid Aluminum Electrolytic Capacitor',
      icon: 'layers',
      color: '#1a5632',
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
      name: '混合型超级电容(锂离子电容)',
      diagramImages: ['体系图和系列列表/web_体系图/超级电容_双电层与LIC.png'],
      nameEn: 'Hybrid Supercapacitor (LIC)',
      icon: 'electric_bolt',
      color: '#5c3d1a',
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
      diagramImages: ['体系图和系列列表/web_体系图/高分子混合动力铝电解.png'],
      nameEn: 'Polymer Hybrid Aluminum Electrolytic Capacitor',
      icon: 'water_drop',
      color: '#4a1a5c',
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
      diagramImages: ['体系图和系列列表/web_体系图/叠层高分子固态铝电解.png'],
      nameEn: 'Stacked Polymer Solid Aluminum Electrolytic Capacitor',
      icon: 'stacked_bar_chart',
      color: '#1a3a5c',
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
      name: '金属化聚丙烯薄膜电容器',
      diagramImages: ['体系图和系列列表/web_体系图/薄膜电容器.png'],
      nameEn: 'Metallized Polypropylene Film Capacitor',
      icon: 'filter_alt',
      color: '#3a4a1a',
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
      diagramImages: ['体系图和系列列表/web_体系图/导电高分子钽电解电容器.png'],
      nameEn: 'Conductive Polymer Tantalum Electrolytic Capacitor',
      icon: 'memory',
      color: '#5c1a1a',
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

  function makeSeries(name, no, temp, life, voltage, desc, pdf) {
    return {
      name: name,
      no: no,
      temp: temp,
      life: life,
      voltage: voltage,
      desc: desc,
      pdf: pdf || null
    };
  }

  function makeLayout(type, label, width, height, cardWidth, cardHeight, labelBox, nodes, arrows) {
    return {
      type: type,
      label: label,
      width: width,
      height: height,
      cardWidth: cardWidth || 190,
      cardHeight: cardHeight || 124,
      labelBox: labelBox,
      nodes: nodes,
      arrows: arrows || []
    };
  }

  function setPackages(lineName, packages) {
    for (var i = 0; i < DB.length; i++) {
      if (DB[i].name === lineName) {
        DB[i].packages = packages;
        return;
      }
    }
  }

  // 以“体系图和系列列表/web_体系图”中的演示图片为准，重建官网卡片体系图数据。
  setPackages('液态铝电解电容器', [
    {
      name: '贴片型',
      layout: makeLayout('liquid-smd', '贴片型', 1120, 560, 190, 124, { x: 10, y: 240, w: 150, h: 32 }, {
        VMM: { x: 190, y: 24 },
        V3M: { x: 420, y: 24 },
        V3MC: { x: 650, y: 24 },
        V4M: { x: 880, y: 24 },
        VK7: { x: 190, y: 204 },
        VKO: { x: 420, y: 204 },
        VKM: { x: 650, y: 204 },
        'VKL(R)': { x: 190, y: 384 },
        VKL: { x: 420, y: 384 },
        VKG: { x: 650, y: 384 }
      }, [
        { from: 'VMM', to: 'V3M', dir: 'right' },
        { from: 'V3M', to: 'V3MC', dir: 'right' },
        { from: 'V3MC', to: 'V4M', dir: 'right' },
        { from: 'VK7', to: 'VMM', dir: 'up' },
        { from: 'VKO', to: 'VK7', dir: 'left' },
        { from: 'VKO', to: 'VKM', dir: 'right' },
        { from: 'VKM', to: 'VKG', dir: 'down' },
        { from: 'VKG', to: 'VKL', dir: 'left' },
        { from: 'VKL', to: 'VKL(R)', dir: 'left' }
      ]),
      series: [
        makeSeries('VMM', 28, '105℃', '3000~8000H', '', '5mm高 薄型品', '系列PDF/VMM.pdf'),
        makeSeries('V3M', 25, '105℃', '2000~5000H', '', '低阻抗 薄型 高容量化品', '系列PDF/V3M.pdf'),
        makeSeries('V3MC', 23, '105℃', '2000H', '', '超高容量 低阻抗 小型化', '系列PDF/V3MC.pdf'),
        makeSeries('V4M', 21, '105℃', '1000H', '', '3.95mm LMAX 超小型品'),
        makeSeries('VK7', 35, '105℃', '4000~6000H', '', '7mm高 超小型品', '系列PDF/VK7.pdf'),
        makeSeries('VKO', 38, '105℃', '6000~8000H', '', '高纹波电流 标准品', '系列PDF/VKO.pdf'),
        makeSeries('VKM', 45, '105℃', '7000~10000H', '', '高纹波电流 长寿命 小型化品', '系列PDF/VKM.pdf'),
        makeSeries('VKG', 52, '105℃', '8000~12000H', '', '高纹波电流 长寿命品'),
        makeSeries('VKL', 59, '125℃', '2000~5000H', '', '高纹波电流 耐高温长寿命品', '系列PDF/VKL.pdf'),
        makeSeries('VKL(R)', 63, '135℃', '2000H', '', '耐高温 低阻抗品')
      ]
    },
    {
      name: '量身定制产品',
      layout: makeLayout('liquid-smd-custom', '量身定制产品', 520, 180, 190, 124, { x: 10, y: 44, w: 150, h: 32 }, {
        VKD: { x: 190, y: 24 }
      }),
      series: [
        makeSeries('VKD', null, '', '', '', '有困难 找永铭 客户定制品')
      ]
    },
    {
      name: '基板自立型',
      layout: makeLayout('liquid-snap', '基板自立型', 1200, 850, 190, 124, { x: 10, y: 64, w: 150, h: 32 }, {
        CW6: { x: 370, y: 20 },
        CW6H: { x: 640, y: 20 },
        CN6: { x: 930, y: 20 },
        CW3S: { x: 120, y: 220 },
        CW3: { x: 370, y: 220 },
        CW3H: { x: 640, y: 220 },
        CN3: { x: 930, y: 220 },
        SH15: { x: 120, y: 420 },
        SW3: { x: 370, y: 420 },
        SN3: { x: 930, y: 420 },
        SW6: { x: 370, y: 620 },
        SN6: { x: 930, y: 620 }
      }, [
        { from: 'SW3', to: 'CW3', dir: 'up' },
        { from: 'CW3', to: 'CW6', dir: 'up' },
        { from: 'CW6', to: 'CW6H', dir: 'right' },
        { from: 'CW3', to: 'CW3S', dir: 'left' },
        { from: 'CW3', to: 'CW3H', dir: 'right' },
        { from: 'SW3', to: 'SH15', dir: 'left' },
        { from: 'SN3', to: 'SW3', dir: 'left' },
        { from: 'SN3', to: 'CN3', dir: 'up' },
        { from: 'CN3', to: 'CN6', dir: 'up' },
        { from: 'SN3', to: 'SN6', dir: 'down' },
        { from: 'SW3', to: 'SW6', dir: 'down' },
        { from: 'SW6', to: 'SN6', dir: 'right' }
      ]),
      series: [
        makeSeries('CW6', 24, '105℃', '6000H', '350~600V', '新能源储能、逆变器', '系列PDF/CW6.pdf'),
        makeSeries('CW6H', 71, '105℃', '6000H', '350~600V', '新能源汽车电子'),
        makeSeries('CN6', 13, '85℃', '6000H', '350~500V', '电源、变频器'),
        makeSeries('CW3S', 20, '105℃', '3000H', '350~500V', '电源小型化'),
        makeSeries('CW3', 16, '105℃', '3000H', '350~600V', '新能源储能、逆变器', '系列PDF/CW3.pdf'),
        makeSeries('CW3H', 67, '105℃', '3000H', '350~600V', '新能源汽车电子'),
        makeSeries('CN3', 10, '85℃', '3000H', '350~500V', '电源、变频器'),
        makeSeries('SH15', 65, '105℃', '3000H', '160~400V', '电源薄型化'),
        makeSeries('SW3', 46, '105℃', '3000H', '16~500V', '电源、变频器'),
        makeSeries('SN3', 27, '85℃', '3000H', '16~550V', '电源、变频器'),
        makeSeries('SW6', 55, '105℃', '6000H', '10~500V', '电源、变频器'),
        makeSeries('SN6', 37, '85℃', '6000H', '16~500V', '电源、变频器')
      ]
    },
    {
      name: '基板自立型 AI服务器主供电源',
      layout: makeLayout('liquid-snap-idc', 'AI服务器主供电源', 520, 190, 190, 124, { x: 10, y: 48, w: 150, h: 32 }, {
        IDC3: { x: 190, y: 24 }
      }),
      series: [
        makeSeries('IDC3', 8, '105℃', '3000H', '450~500V', 'AI服务器主供电源')
      ]
    },
    {
      name: '大型量身定制产品',
      layout: makeLayout('liquid-snap-custom', '量身定制产品', 520, 190, 190, 124, { x: 10, y: 48, w: 150, h: 32 }, {
        CKD: { x: 190, y: 24 }
      }),
      series: [
        makeSeries('CKD', null, '', '', '', '有困难 找永铭 客户定制品')
      ]
    },
    {
      name: '螺栓型',
      layout: makeLayout('liquid-bolt', '螺栓型', 980, 490, 190, 124, { x: 10, y: 206, w: 150, h: 32 }, {
        ES3M: { x: 440, y: 0 },
        EW3: { x: 180, y: 160 },
        ES3: { x: 440, y: 160 },
        EH3: { x: 700, y: 160 },
        EW6: { x: 180, y: 320 },
        ES6: { x: 440, y: 320 },
        EH6: { x: 700, y: 320 }
      }, [
        { from: 'ES3', to: 'ES3M', dir: 'up' },
        { from: 'ES3', to: 'EW3', dir: 'left' },
        { from: 'ES3', to: 'EH3', dir: 'right' },
        { from: 'EW3', to: 'EW6', dir: 'down' },
        { from: 'ES3', to: 'ES6', dir: 'down' },
        { from: 'EH3', to: 'EH6', dir: 'down' }
      ]),
      series: [
        makeSeries('ES3M', 78, '85℃', '3000H', '200~500V', '电源、变频、中频炉'),
        makeSeries('EW3', 86, '105℃', '3000H', '200~500V', 'UPS电源、工控'),
        makeSeries('ES3', 75, '85℃', '3000H', '200~500V', 'UPS电源、工业控制器'),
        makeSeries('EH3', 91, '85℃', '3000H', '550~630V', '光伏、工控'),
        makeSeries('EW6', 89, '105℃', '6000H', '350~500V', 'UPS电源、工控、工业伺服'),
        makeSeries('ES6', 82, '85℃', '6000H', '200~500V', 'UPS、工业变频'),
        makeSeries('EH6', 93, '85℃', '6000H', '550~630V', '光伏、工控')
      ]
    },
    {
      name: '螺栓型量身定制产品',
      layout: makeLayout('liquid-bolt-custom', '量身定制产品', 520, 190, 190, 124, { x: 10, y: 48, w: 150, h: 32 }, {
        EKD: { x: 190, y: 24 }
      }),
      series: [
        makeSeries('EKD', null, '', '', '', '有困难 找永铭 客户定制品')
      ]
    }
  ]);

  setPackages('高分子固态铝电解电容器', [
    {
      name: '贴片型',
      layout: makeLayout('solid-smd', '贴片型', 1120, 540, 190, 124, { x: 10, y: 220, w: 150, h: 32 }, {
        VPH: { x: 420, y: 0 },
        VPT: { x: 190, y: 180 },
        VP1: { x: 420, y: 180 },
        VPX: { x: 650, y: 180 },
        VPW: { x: 880, y: 180 },
        VPL: { x: 420, y: 360 },
        VPG: { x: 880, y: 0 },
        VP4: { x: 880, y: 360 }
      }, [
        { from: 'VP1', to: 'VPT', dir: 'left' },
        { from: 'VP1', to: 'VPH', dir: 'up' },
        { from: 'VP1', to: 'VPL', dir: 'down' },
        { from: 'VP1', to: 'VPX', dir: 'right' },
        { from: 'VPX', to: 'VPW', dir: 'right' },
        { from: 'VPW', to: 'VPG', dir: 'up' },
        { from: 'VPW', to: 'VP4', dir: 'down' }
      ]),
      series: [
        makeSeries('VPH', 38, '105℃', '2000H', '125~250V', '低ESR 耐高电压'),
        makeSeries('VPT', 41, '125℃', '2000H', '6.3~100V', '低ESR 耐高温品'),
        makeSeries('VP1', 19, '105℃', '2000H', '6.3~25V', '低ESR 标准品'),
        makeSeries('VPX', 26, '105℃', '2000H', '6.3~100V', '低ESR 小型化品'),
        makeSeries('VPW', 64, '105℃', '15000H', '2.5~50V', '超长寿命 高可靠'),
        makeSeries('VPL', 51, '105℃', '5000H', '6.3~100V', '低ESR 长寿命'),
        makeSeries('VPG', 62, '105℃', '2000H', '6.3~100V', '低ESR 大容量小型化'),
        makeSeries('VP4', 24, '105℃', '2000H', '6.3~35V', '3.95mm高度 超薄 高可靠')
      ]
    },
    {
      name: '引线型',
      layout: makeLayout('solid-radial', '引线型', 1120, 540, 190, 124, { x: 10, y: 220, w: 150, h: 32 }, {
        NPH: { x: 420, y: 0 },
        NPT: { x: 190, y: 180 },
        NP1: { x: 420, y: 180 },
        NPX: { x: 650, y: 180 },
        NPM: { x: 880, y: 180 },
        NPL: { x: 420, y: 360 },
        NPG: { x: 880, y: 0 }
      }, [
        { from: 'NP1', to: 'NPT', dir: 'left' },
        { from: 'NP1', to: 'NPH', dir: 'up' },
        { from: 'NP1', to: 'NPL', dir: 'down' },
        { from: 'NP1', to: 'NPX', dir: 'right' },
        { from: 'NPX', to: 'NPM', dir: 'right' },
        { from: 'NPM', to: 'NPG', dir: 'up' }
      ]),
      series: [
        makeSeries('NPH', 86, '105℃', '2000H', '125~250V', '低ESR 高电压品'),
        makeSeries('NPT', 90, '125℃', '2000H', '6.3~100V', '低ESR 耐高温品'),
        makeSeries('NP1', 66, '105℃', '2000H', '6.3~25V', '低ESR 标准品'),
        makeSeries('NPX', 71, '105℃', '2000H', '6.3~100V', '低ESR 小型化品'),
        makeSeries('NPM', 116, '105℃', '2000H', '6.3~100V', '3.55mm/4mm直径'),
        makeSeries('NPL', 102, '105℃', '5000H', '6.3~100V', '低ESR 长寿命品'),
        makeSeries('NPG', 113, '105℃', '2000H', '6.3~100V', '低ESR 大容量小型化')
      ]
    },
    {
      name: '量身定制产品',
      layout: makeLayout('solid-custom', '量身定制产品', 520, 190, 190, 124, { x: 10, y: 48, w: 150, h: 32 }, {
        PKD: { x: 190, y: 24 }
      }),
      series: [
        makeSeries('PKD', null, '-55~150℃', '', '2.0~250V', '客制化需求应对品')
      ]
    }
  ]);

  setPackages('高分子混合动力铝电解电容器', [
    {
      name: '贴片型',
      layout: makeLayout('hybrid-smd', '贴片型', 1120, 360, 190, 124, { x: 10, y: 74, w: 150, h: 32 }, {
        VHX: { x: 190, y: 24 },
        VGY: { x: 420, y: 24 },
        VHT: { x: 650, y: 24 },
        VHU: { x: 880, y: 24 },
        VHM: { x: 650, y: 204 },
        VHR: { x: 880, y: 204 }
      }, [
        { from: 'VHX', to: 'VGY', dir: 'right' },
        { from: 'VGY', to: 'VHT', dir: 'right' },
        { from: 'VHT', to: 'VHU', dir: 'right' },
        { from: 'VHT', to: 'VHM', dir: 'down' },
        { from: 'VHU', to: 'VHR', dir: 'down' }
      ]),
      series: [
        makeSeries('VHX', 119, '105℃', '2000~5000H', '16~100V', '大容量小型化', '系列PDF/VHX.pdf'),
        makeSeries('VGY', 123, '105℃', '10000H', '16~80V', '高可靠 低ESR 长寿命'),
        makeSeries('VHT', 126, '125℃', '4000H', '16~100V', '高可靠 低ESR 耐高温', '系列PDF/VHT.pdf'),
        makeSeries('VHU', 134, '135℃', '4000H', '25~80V', '高耐温 高可靠性', '系列PDF/VHU.pdf'),
        makeSeries('VHM', 131, '125℃', '4000H', '16~100V', '小型化大容量 低ESR', '系列PDF/VHM.pdf'),
        makeSeries('VHR', 137, '150℃', '2000H', '25~80V', '超高耐温 高可靠性', '系列PDF/VHR.pdf')
      ]
    },
    {
      name: '引线型',
      layout: makeLayout('hybrid-radial', '引线型', 880, 180, 190, 124, { x: 10, y: 48, w: 150, h: 32 }, {
        NGY: { x: 190, y: 24 },
        NHT: { x: 420, y: 24 },
        NHX: { x: 650, y: 24 }
      }, [
        { from: 'NGY', to: 'NHT', dir: 'right' },
        { from: 'NHT', to: 'NHX', dir: 'right' }
      ]),
      series: [
        makeSeries('NGY', 139, '105℃', '10000H', '16~80V', '高可靠 低ESR 长寿命'),
        makeSeries('NHT', 142, '125℃', '4000H', '16~80V', '高可靠 低ESR 耐高温', '系列PDF/NHT.pdf'),
        makeSeries('NHX', 145, '105℃', '2000~5000H', '16~160V', '高耐压 长寿命')
      ]
    },
    {
      name: '量身定制产品',
      layout: makeLayout('hybrid-custom', '量身定制产品', 520, 190, 190, 124, { x: 10, y: 48, w: 150, h: 32 }, {
        HKD: { x: 190, y: 24 }
      }),
      series: [
        makeSeries('HKD', null, '-55~135℃', '', '2.0~250V', '客制化需求应对品')
      ]
    }
  ]);

  setPackages('双电层超级电容', [
    {
      name: '圆柱型双电层超级电容',
      layout: makeLayout('edlc-cylinder', '圆柱型双电层超级电容', 1120, 560, 190, 124, { x: 10, y: 214, w: 190, h: 36 }, {
        SDV: { x: 300, y: 24 },
        SDN: { x: 560, y: 24 },
        SDM: { x: 820, y: 24 },
        SDH: { x: 300, y: 204 },
        SDA: { x: 560, y: 204 },
        SDL: { x: 820, y: 204 },
        SDB: { x: 300, y: 384 },
        SDS: { x: 560, y: 384 },
        SM: { x: 820, y: 384 }
      }, [
        { from: 'SDA', to: 'SDH', dir: 'left' },
        { from: 'SDA', to: 'SDL', dir: 'right' },
        { from: 'SDH', to: 'SDV', dir: 'up' },
        { from: 'SDH', to: 'SDB', dir: 'down' },
        { from: 'SDA', to: 'SDN', dir: 'up' },
        { from: 'SDA', to: 'SDS', dir: 'down' },
        { from: 'SDL', to: 'SDM', dir: 'up' },
        { from: 'SDL', to: 'SM', dir: 'down' }
      ]),
      series: [
        makeSeries('SDV', 17, '-25~+70℃', '1000H', '2.7V, 3.0V', 'SMD表面贴装品'),
        makeSeries('SDN', 23, '-40~+70℃', '1000H', '2.7V, 3.0V', '超大容量品'),
        makeSeries('SDM', 24, '-40~+70℃', '1000H', '5.5V, 7.5V', '大功率 高容量品 套管', '系列PDF/SDM.pdf'),
        makeSeries('SDH', 22, '-40~+85℃', '1000H', '2.7V', '耐高温 车规品'),
        makeSeries('SDA', 18, '-40~+70℃', '1000H', '2.7V', '高容量 标准品'),
        makeSeries('SDL', 21, '-40~+70℃', '1000H', '2.7V', '低ESR 高容量品'),
        makeSeries('SDB', 19, '-40~+70℃', '1000H', '3.0V', '高电压 高容量品', '系列PDF/SDB.pdf'),
        makeSeries('SDS', 20, '-40~+70℃', '1000H', '2.7V', '小尺寸化 高容量品'),
        makeSeries('SM', 26, '-40~+70℃', '1000H', '5.5V, 6.0V', '大功率 高能量品 灌胶')
      ]
    }
  ]);

  setPackages('混合型超级电容(锂离子电容)', [
    {
      name: '混合型超级电容 LIC',
      layout: makeLayout('lic-cell', '混合型超级电容LIC', 980, 460, 190, 124, { x: 10, y: 184, w: 190, h: 32 }, {
        SLR: { x: 520, y: 0 },
        SLX: { x: 300, y: 180 },
        SLA: { x: 520, y: 180 },
        SLD: { x: 740, y: 180 },
        'SLA(H)': { x: 520, y: 336 }
      }, [
        { from: 'SLA', to: 'SLR', dir: 'up' },
        { from: 'SLA', to: 'SLX', dir: 'left' },
        { from: 'SLA', to: 'SLD', dir: 'right' },
        { from: 'SLA', to: 'SLA(H)', dir: 'down' }
      ]),
      series: [
        makeSeries('SLR', 13, '-40~+70℃', '1000H', '3.8V', 'LIC低温品'),
        makeSeries('SLX', 12, '-20~+85℃', '1000H', '3.8V', 'LIC超小尺寸品'),
        makeSeries('SLA', 10, '-20~+85℃', '1000H', '3.8V', 'LIC标准品'),
        makeSeries('SLD', 15, '-20~+70℃', '1000H', '4.2V', 'LIC高能量品'),
        makeSeries('SLA(H)', 16, '-40~+90℃', '1000H', '3.8V', 'LIC车规品')
      ]
    }
  ]);

  setPackages('叠层高分子固态铝电解电容器', [
    {
      name: '贴片型',
      layout: makeLayout('stacked-smd', '', 1180, 320, 190, 124, null, {
        MPD10: { x: 80, y: 150 },
        MPD15: { x: 310, y: 150 },
        MPD19: { x: 540, y: 150 },
        MPS: { x: 540, y: 0 },
        MPX: { x: 770, y: 0 },
        MPD28: { x: 770, y: 150 },
        MPU41: { x: 1000, y: 150 }
      }, [
        { from: 'MPD19', to: 'MPD15', dir: 'left' },
        { from: 'MPD15', to: 'MPD10', dir: 'left' },
        { from: 'MPD19', to: 'MPS', dir: 'up' },
        { from: 'MPS', to: 'MPX', dir: 'right' },
        { from: 'MPD19', to: 'MPD28', dir: 'right' },
        { from: 'MPD28', to: 'MPU41', dir: 'right' }
      ]),
      series: [
        makeSeries('MPD10', 5, '105℃', '2000H', '2V/330µF~20V/33µF', '7.3×4.3×1.0mm'),
        makeSeries('MPD15', 7, '105℃', '2000H', '2V/330µF~25V/33µF', '7.3×4.3×1.5mm'),
        makeSeries('MPD19', 9, '105℃', '2000H', '2V/330µF~50V/10µF', '7.3×4.3×1.9mm'),
        makeSeries('MPS', 15, '105℃', '2000H', '2V/330~2.5V/470µF', '7.3×4.3×1.9mm'),
        makeSeries('MPX', 17, '125℃', '3000H', '2V/330µF~6.3V/150µF', '高温长寿命'),
        makeSeries('MPD28', 11, '105℃', '2000H', '6.3V/270µF~80V/4.7µF', '7.3×4.3×2.8mm'),
        makeSeries('MPU41', 13, '105℃', '2000H', '2.5V/820µF~80V/27µF', '7.2×6.1×4.1mm')
      ]
    }
  ]);

  setPackages('金属化聚丙烯薄膜电容器', [
    {
      name: '4引线方壳电容',
      layout: makeLayout('film-box', '4引线方壳电容', 980, 330, 190, 124, { x: 10, y: 84, w: 170, h: 32 }, {
        'MDP(X)': { x: 250, y: 80 },
        MDP: { x: 500, y: 80 },
        'MDP(H)': { x: 750, y: 80 },
        MAP: { x: 500, y: 240 }
      }, [
        { from: 'MDP', to: 'MDP(X)', dir: 'left' },
        { from: 'MDP', to: 'MDP(H)', dir: 'right' },
        { from: 'MDP', to: 'MAP', dir: 'down' }
      ]),
      series: [
        makeSeries('MDP(X)', 14, '-40~105℃', '', '500~1200Vdc', '高容量密度插针电容'),
        makeSeries('MDP', 3, '-40~105℃', '', '500~1600Vdc', '标准品插针电容'),
        makeSeries('MDP(H)', null, '-40~125℃', '', '500~1200Vdc', '高耐热插针电容'),
        makeSeries('MAP', 18, '-40~105℃', '', '300~350Vac', '标准品交流电容')
      ]
    },
    {
      name: '矩形干式直流滤波电容',
      layout: makeLayout('film-module', '矩形干式直流滤波电容', 980, 180, 190, 124, { x: 10, y: 48, w: 170, h: 48 }, {
        'MDR(X)': { x: 250, y: 24 },
        MDR: { x: 500, y: 24 },
        'MDR(H)': { x: 750, y: 24 }
      }, [
        { from: 'MDR', to: 'MDR(X)', dir: 'left' },
        { from: 'MDR', to: 'MDR(H)', dir: 'right' }
      ]),
      series: [
        makeSeries('MDR(X)', null, '-40~105℃', '', '容量/电压/尺寸均可定制', '高容量密度定制模块电容'),
        makeSeries('MDR', 20, '-40~105℃', '', '容量/电压/尺寸均可定制', '标准定制模块电容'),
        makeSeries('MDR(H)', null, '-40~125℃', '', '容量/电压/尺寸均可定制', '高耐热型定制模块电容')
      ]
    },
    {
      name: '铝壳圆形干式直流滤波电容',
      layout: makeLayout('film-round', '铝壳圆形干式直流滤波电容', 520, 190, 190, 124, { x: 10, y: 40, w: 170, h: 48 }, {
        MDA: { x: 250, y: 24 }
      }),
      series: [
        makeSeries('MDA', null, '', '', '', '开发中 敬请期待')
      ]
    }
  ]);

  setPackages('导电高分子钽电解电容器', [
    {
      name: '贴片型',
      layout: makeLayout('tantalum-smd', '导电高分子钽电解电容器', 960, 470, 190, 124, { x: 10, y: 160, w: 210, h: 32 }, {
        TQD15: { x: 260, y: 0 },
        TQD42: { x: 580, y: 0 },
        TQD19: { x: 260, y: 160 },
        TQW19: { x: 580, y: 160 },
        TQD28: { x: 260, y: 320 },
        TQW42: { x: 580, y: 320 }
      }),
      series: [
        makeSeries('TQD15', 4, '-55~105℃', '', '16~63V', '超薄品'),
        makeSeries('TQD42', 10, '-55~105℃', '', '16~100V', '大容量品'),
        makeSeries('TQD19', 6, '-55~105℃', '', '16~35V', '薄型品'),
        makeSeries('TQW19', 12, '-55~105℃', '', '16~100V', '薄型品'),
        makeSeries('TQD28', 8, '-55~105℃', '', '16~100V', '标准品'),
        makeSeries('TQW42', 13, '-55~105℃', '', '16~100V', '大容量品')
      ]
    }
  ]);

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
