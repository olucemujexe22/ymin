(function (global) {
    'use strict';

    global.YMIN = global.YMIN || {};
    var dataset = global.YMIN.applicationCollected;
    if (!dataset || !dataset.pages) return;

    function specifications(pageKey, tabKey, subName) {
        if (!global.YMIN.sysMod || !global.YMIN.sysMod.getSpecs) return [];
        return global.YMIN.sysMod.getSpecs(pageKey, tabKey, subName) || [];
    }

    function advantage(name, profile) {
        var descriptions = {
            power: '应用要求：高频开关、高功率密度和宽负载范围下保持供电稳定。\n电容作用：承担输入与输出滤波、能量缓冲及纹波抑制。\nYMIN产品优势：低ESR、耐高纹波、长寿命，并提供适配GaN与SiC电源的小型化方案。',
            instrument: '应用要求：仪表长期在线运行，要求低功耗、稳定供电和可靠数据保持。\n电容作用：完成电源滤波、瞬态支撑与掉电数据备份。\nYMIN产品优势：低漏电、小型化、宽温与长寿命，适合仪表紧凑空间及长期运行。',
            energy: '应用要求：系统需承受高母线电压、大纹波电流和频繁充放电工况。\n电容作用：承担DC-Link储能、母线支撑、滤波与浪涌吸收。\nYMIN产品优势：高耐压、高纹波能力、低ESR及长寿命，适配逆变器、变流器和BMS。'
        };
        return [{ name: name + '关键电容应用位置', icon: 'memory', desc: descriptions[profile] }];
    }

    function subApp(pageKey, tabKey, name, icon, profile) {
        var specs = specifications(pageKey, tabKey, name);
        return {
            name: name,
            icon: icon,
            template: 'electrolytic',
            description: profile === 'instrument'
                ? name + '需要稳定供电、低功耗运行和可靠的数据保持能力。'
                : '',
            modules: advantage(name, profile),
            specs: specs
        };
    }

    function tab(pageKey, key, name, icon, profile, subApps) {
        return {
            key: key,
            name: name,
            icon: icon,
            template: 'electrolytic',
            subApps: subApps.map(function (item) {
                return subApp(pageKey, key, item[0], item[1], profile);
            })
        };
    }

    dataset.pages.power = {
        sheet: '三代半导体电源（GaN&SiC）',
        icon: 'power',
        hero: {
            title: '三代半导体电源（GaN&SiC）应用指南',
            description: '面向高频、高压及高功率密度电源应用，提供输入、输出与DC-Link关键位置的电容选型参考。',
            tags: ['GaN&SiC', '低ESR', '高纹波', '长寿命']
        },
        tabs: [
            tab('power', 'smps', '开关电源', 'power', 'power', [['开关电源-AC输入', 'power'], ['开关电源-DC输出', 'electrical_services']]),
            tab('power', 'ups', 'UPS电源', 'battery_charging_full', 'power', [['UPS-逆变模块', 'battery_charging_full']]),
            tab('power', 'pd', 'PD快充', 'bolt', 'power', [['PD快充-初级侧', 'bolt'], ['PD快充-次级侧', 'electrical_services']])
        ]
    };

    dataset.pages.instrument = {
        sheet: '仪器仪表',
        icon: 'speed',
        hero: {
            title: '仪器仪表应用指南',
            description: '覆盖智能电表、燃气表、水表及配电自动化终端的电源滤波、瞬态支撑和数据保持应用。',
            tags: ['低漏电', '长寿命', '数据保持', '宽温']
        },
        tabs: [
            tab('instrument', 'precision', '智能电表', 'bolt', 'instrument', [
                ['智能电表', 'bolt'], ['载波模块', 'router'], ['集中器', 'hub'], ['新融合终端', 'device_hub'],
                ['DTU (配电自动化终端)', 'settings_input_antenna'], ['开关电源', 'power'], ['断路器', 'electrical_services']
            ]),
            tab('instrument', 'industrial', '智能燃气表', 'local_fire_department', 'instrument', [['智能燃气表', 'local_fire_department']]),
            tab('instrument', 'medical', '智能水表', 'water_drop', 'instrument', [['智能水表、热量表', 'water_drop']])
        ]
    };

    dataset.pages['energy-storage'] = {
        sheet: '储能',
        icon: 'battery_charging_full',
        hero: {
            title: '储能应用指南',
            description: '覆盖逆变器、变流器和电池管理系统的DC-Link、母线支撑、滤波与浪涌吸收应用。',
            tags: ['高耐压', '高纹波', 'DC-Link', '长寿命']
        },
        tabs: [
            tab('energy', 'pv', '逆变器', 'solar_power', 'energy', [['逆变器', 'solar_power'], ['定日镜', 'wb_sunny']]),
            tab('energy', 'pcs', '变流器', 'transform', 'energy', [['变流器', 'transform']]),
            tab('energy', 'bms', 'BMS', 'battery_horiz_075', 'energy', [['电池管理系统-BMS', 'battery_horiz_075']])
        ]
    };
})(window);
