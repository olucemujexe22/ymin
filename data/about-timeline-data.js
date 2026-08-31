(function () {
    'use strict';

    // 公司简介发展历程：内容以《公司简介双时间线20260828》最新修改稿为准。
    window.YMIN_TIMELINE_DATA = {
        company: [
            { year: '2001', items: ['上虞永明电子有限公司在上虞成立。'] },
            { year: '2005', items: ['公司更名为“上海永铭电子有限公司”，并迁至上海市奉贤区。'] },
            { year: '2007', items: ['获认定为上海市高新技术企业。'] },
            { year: '2008', items: ['获国家高新技术企业认定。'] },
            { year: '2009', items: ['第二期厂房扩建。', '通过ISO 9001质量管理体系认证。'] },
            { year: '2013', items: ['通过ISO 14001环境管理体系认证。', '通过OHSAS 18001职业健康安全管理体系认证。'] },
            { year: '2017', items: ['公司更名为“上海永铭电子股份有限公司”，实行股份制。'] },
            { year: '2018', items: ['第三期厂房开始动工，新增2.8万㎡生产面积。', '通过IATF 16949汽车行业质量管理体系认证。'] },
            { year: '2020', items: ['公司管理方式改为事业部制。'] },
            { year: '2022', items: ['通过GJB 9001C-2017武器装备质量管理体系认证。'] },
            { year: '2024', items: ['第四期厂房扩建，总生产面积达到约6.5万平方米。', '入选第六批国家级专精特新“小巨人”企业。'] },
            { year: '2025', items: ['入选国家重点支持的专精特新“小巨人”企业名单。', '获得中国合格评定国家认可委员会（CNAS）实验室认可。'] }
        ],
        product: [
            { year: '2001', events: [
                { text: '专注于照明电源专用电解电容器，液态铝电解电容器。' }
            ] },
            { year: '2005', events: [
                { text: '推出照明电源专用小型化电解电容。', highlight: ['小型化'] }
            ] },
            { year: '2010', events: [
                { text: '业内首推LED驱动电源专用系列。' },
                { text: '业内首推9mm高、全电压高端电源专用产品。', highlight: ['9mm高', '全电压'] },
                { text: '国内首推600V超高电压牛角型、螺栓型产品。', highlight: ['600V超高电压'] }
            ] },
            { year: '2013', events: [
                { text: '业内首推7mm高、全电压高端电源专用系列。', highlight: ['7mm高', '全电压'] },
                { text: '业内首推出全电压、小尺寸SMD贴片型电解电容。', highlight: ['全电压', '小尺寸'] },
                { text: '业内首推更小尺寸LKM系列，并推出室外电源超低温LKZ系列。', highlight: ['更小尺寸', '超低温'] }
            ] },
            { year: '2015', events: [
                { text: '业内首推直流充电桩专用系列，并推出智能电表专用LKJ系列（获得国网计量中心检验认定）。', highlight: ['直流充电桩专用', '智能电表专用'] },
                { text: '业内首推直流充电桩专用小型化CW3S系列（获得许继集团的应用）。', highlight: ['小型化'] }
            ] },
            { year: '2016', events: [
                { text: '推出新产品线高分子固态铝电解电容器（引线型、贴片型）。', major: true, image: 'assets/product-series/7ecdb00e500b7ca3.png' },
                { text: '推出新产品线高分子混合动力铝电解电容器。', major: true, image: 'assets/product-series/180776b3a8e480d6.png' }
            ] },
            { year: '2017', events: [
                { text: '推出新产品线超级电容器（引线型、纽扣型、模组型）。', major: true, image: 'assets/product-series/bf8e4007bf68a1c5.png' },
                { text: '推出超小体型、低阻抗液态贴片V3M系列。', highlight: ['超小体型', '低阻抗'] },
                { text: '推出135℃耐高温液态贴片VKL（R）系列。', highlight: ['135℃耐高温'] }
            ] },
            { year: '2018', events: [
                { text: '推出新产品线叠层高分子固态铝电解电容器。', major: true, image: 'assets/product-series/54ad3f85318e3277.png' },
                { text: '业内首推薄型化、全电压、5mm高SMD贴片型VMM系列。', highlight: ['薄型化', '全电压', '5mm高'] },
                { text: '推出快充电源专用高压、超小型KC系列。', highlight: ['快充电源专用', '高压', '超小型'] },
                { text: '推出低ESR大容量小型化NPG系列。', highlight: ['低ESR', '大容量', '小型化'] },
                { text: '推出超小直径NPM系列。', highlight: ['超小直径'] },
                { text: '推出大容量薄型固态电容VPS系列。', highlight: ['大容量薄型'] }
            ] },
            { year: '2019', events: [
                { text: '推出超级电容新产品线（双电层超级电容、混合型超级电容/锂离子电容）。', major: true, image: 'assets/product-series/63f9628d990b0956.png' },
                { text: '推出新产品线多层陶瓷片式电容器（高压、高Q）。', major: true },
                { text: '推出3.95mmL液态/固态贴片铝电解电容。', highlight: ['3.95mmL'] }
            ] },
            { year: '2021', events: [
                { text: '推出新产品线金属化聚丙烯薄膜电容器。', major: true, image: 'assets/product-series/d4976ddb603c4b78.png' },
                { text: '推出满足 AEC-Q200 的车规级超级电容。', highlight: ['AEC-Q200', '车规级'] },
                { text: '推出贴片型的双电层超级电容。', highlight: ['贴片型'] }
            ] },
            { year: '2022', events: [
                { text: '叠层推出ESR 3mΩ的产品。', highlight: ['ESR 3mΩ'] }
            ] },
            { year: '2023', events: [
                { text: '推出新产品线导电高分子钽电解电容器。', major: true, image: 'assets/product-series/149f96111608e68a.png' },
                { text: '液态推出适合氮化镓的高容量密度产品（KCM）。', highlight: ['氮化镓', '高容量密度'] }
            ] },
            { year: '2024', events: [
                { text: '推出方形混合超级电容。', highlight: ['方形混合超级电容'] }
            ] },
            { year: '2025', events: [
                { text: '推出新型高容量密度导电高分子钽电容。', highlight: ['新型高容量密度'] }
            ] },
            { year: '2026', events: [
                { text: '推出新型高容量密度叠层高分子固态铝电解电容器。', highlight: ['新型高容量密度'] },
                { text: '超级电容全系列产品通过 UL 认证', highlight: ['UL 认证'] }
            ] }
        ]
    };
})();
