(function () {
    'use strict';

    // 公司简介发展历程：公司发展与产品发展共用同一时间轴。
    window.YMIN_TIMELINE_DATA = {
        company: [
            { year: '2001', title: '上虞永明电子有限公司在上虞成立', text: '' },
            { year: '2005', title: '迁址上海', text: '公司更名为"上海永铭电子有限公司"，迁至上海市奉贤区。' },
            { year: '2017', title: '股份制升级', text: '公司更名为"上海永铭电子股份有限公司"，实行股份制。' },
            { year: '2018', title: '厂房扩建', text: '第三期厂房动工，新增约2.8万㎡生产面积。' },
            { year: '2020', title: '事业部制', text: '公司管理方式改为事业部制。' },
            { year: '2024', title: '四期扩充', text: '第四期厂房扩充生产面积，总生产面积达到约6.5万平方米。' }
        ],
        product: [
            { year: '2001', events: [
                { text: '专注于照明电源专用电解电容器。', highlight: ['照明电源专用'] }
            ] },
            { year: '2005', events: [
                { text: '推出照明电源专用小型化电解电容。', highlight: ['小型化'] }
            ] },
            { year: '2010', events: [
                { text: '推出LED驱动电源专用系列。' },
                { text: '推出9mm高、全电压高端电源专用产品。', highlight: ['9mm高', '全电压'] },
                { text: '推出600V超高压牛角型、螺栓型产品。', highlight: ['600V超高压'] }
            ] },
            { year: '2013', events: [
                { text: '推出7mm高、全电压高端电源专用系列。', highlight: ['7mm高', '全电压'] },
                { text: '推出全电压、小尺寸SMD贴片型电解电容。', highlight: ['小尺寸'] },
                { text: '推出更小尺寸LKM系列、室外电源超低温LKZ系列。', highlight: ['更小尺寸', '超低温'] }
            ] },
            { year: '2015', events: [
                { text: '推出直流充电桩专用系列、智能电表专用LKJ系列。', highlight: ['直流充电桩专用', '智能电表专用'] },
                { text: '推出直流充电桩专用小型化CW3S系列。', highlight: ['小型化'] }
            ] },
            { year: '2017', events: [
                { text: '推出叠层高分子固态铝电解电容。', major: true, image: 'assets/product-series/54ad3f85318e3277.png' },
                { text: '推出超级电容（引线型、纽扣型、模组型）。', major: true, image: 'assets/product-series/bf8e4007bf68a1c5.png' },
                { text: '推出超小体型、低阻抗液态贴片V3M系列。', highlight: ['超小体型', '低阻抗'] },
                { text: '推出135℃耐高温液态贴片VKL（R）系列。', highlight: ['135℃耐高温'] }
            ] },
            { year: '2018', events: [
                { text: '推出高分子固态铝电解电容（引线型、贴片型）。', major: true, image: 'assets/product-series/7ecdb00e500b7ca3.png' },
                { text: '推出高分子混合动力铝电解电容。', major: true, image: 'assets/product-series/180776b3a8e480d6.png' },
                { text: '推出薄型化、全电压、5mm高SMD贴片VMM系列。', highlight: ['薄型化', '5mm高'] },
                { text: '推出快充电源专用高压、超小型KC系列。', highlight: ['快充电源专用', '高压', '超小型'] },
                { text: '推出低ESR大容量小型化NPG系列。', highlight: ['低ESR', '大容量', '小型化'] },
                { text: '推出超小直径NPM系列。', highlight: ['超小直径'] },
                { text: '推出大容量薄型固态电容VPS系列。', highlight: ['大容量薄型'] }
            ] },
            { year: '2019', events: [
                { text: '推出超级电容体系（双电层、混合型超级电容/锂离子电容）。', major: true, image: 'assets/product-series/63f9628d990b0956.png' },
                { text: '推出3.95mm液态/固态贴片铝电解电容。', highlight: ['3.95mm'] }
            ] },
            { year: '2021', events: [
                { text: '推出金属化聚丙烯薄膜电容。', major: true, image: 'assets/product-series/d4976ddb603c4b78.png' },
                { text: '推出超级电容各事业部模组（牛角型、引线型）。' }
            ] },
            { year: '2022', events: [
                { text: '叠层产品ESR达到3mΩ。', highlight: ['ESR达到3mΩ'] }
            ] },
            { year: '2023', events: [
                { text: '推出导电高分子钽电解电容。', major: true, image: 'assets/product-series/149f96111608e68a.png' },
                { text: '推出适用于氮化镓的高容量密度KCM系列。', highlight: ['氮化镓', '高容量密度'] }
            ] }
        ]
    };
})();
