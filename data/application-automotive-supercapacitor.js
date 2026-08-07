(function (global) {
    'use strict';

    global.YMIN = global.YMIN || {};
    global.YMIN.applicationSupplemental = global.YMIN.applicationSupplemental || {};

    function cpmSpecs() {
        return [
            { series: 'SDH', voltage: '2.7V', cap: '25F', size: '16×25mm', note: '85℃，有第三方AEC-Q200报告' },
            { series: 'SDH', voltage: '2.7V', cap: '60F', size: '18×40mm', note: '85℃车规级' },
            { series: 'SDL(H)', voltage: '2.7V', cap: '10F', size: '12.5×20mm', note: '105℃，有第三方AEC-Q200报告' },
            { series: 'SDL(H)', voltage: '2.7V', cap: '25F', size: '16×25mm', note: '105℃车规级' },
            { series: 'SDB(H)', voltage: '3.0V', cap: '25F', size: '16×25mm', note: '105℃车规级' },
            { series: 'SDN', voltage: '3.0V', cap: '120F', size: '22×45mm', note: '85℃牛角型超级电容' }
        ];
    }

    global.YMIN.applicationSupplemental.automotive = {
        hero: {
            description: '覆盖电驱、电控、安全部件、热管理、智能座舱、智能驾驶、车灯、CPM碰撞模块与驻车锂电等汽车电子应用，提供车规级电容器选型参考。',
            tags: ['AEC-Q200', '耐高温', '耐振动', '应急备份']
        },
        removeSubApps: [
            { tab: '安全部件', name: 'CPM' }
        ],
        tabs: [
            {
                key: 'cpm-collision-module',
                name: 'CPM碰撞模块',
                icon: 'car_crash',
                template: 'supercapacitor',
                subApps: [
                    {
                        name: '电子门锁应急解锁',
                        icon: 'lock_open',
                        description: '车辆碰撞造成低压电源中断时，超级电容为电子门锁或隐藏式门把手提供短时大电流应急电源，保留逃生通道。',
                        flow: ['车辆碰撞/主电源中断', '超级电容应急备份', '电子门锁解锁'],
                        modules: [{
                            name: '应急备份电源单元',
                            icon: 'battery_charging_full',
                            desc: '需要低温可用、快速放电和高可靠性，碰撞断电后立即向门锁执行机构供能。',
                            specs: cpmSpecs()
                        }],
                        source: { title: '永铭车规级超级电容碰撞断电解决方案', url: 'https://www.ymin.com/index/newsDetails?id=1363' }
                    },
                    {
                        name: '电动车窗应急升降',
                        icon: 'window',
                        description: '车辆碰撞或热失控导致低压供电失效时，超级电容为车窗控制及执行机构提供短时应急能量。',
                        flow: ['低压供电失效', '超级电容应急备份', '车窗控制及执行机构'],
                        modules: [{
                            name: '车窗应急供电单元',
                            icon: 'battery_charging_full',
                            desc: '面向车窗电机启动瞬间的高电流需求，承担短时应急供电。',
                            specs: cpmSpecs()
                        }],
                        source: { title: '永铭车规级超级电容碰撞断电解决方案', url: 'https://www.ymin.com/index/newsDetails?id=1363' }
                    },
                    {
                        name: '电动尾门应急开启',
                        icon: 'sensor_door',
                        description: '主电源断开后，为电动尾门或后备箱锁止机构提供应急开启所需的瞬时能量。',
                        flow: ['碰撞断电', '超级电容应急备份', '尾门/后备箱应急开启'],
                        modules: [{
                            name: '尾门应急供电单元',
                            icon: 'battery_charging_full',
                            desc: '利用超级电容快速响应和大电流放电特性，驱动尾门锁止机构完成一次应急动作。',
                            specs: cpmSpecs()
                        }],
                        source: { title: '永铭车规级超级电容碰撞断电解决方案', url: 'https://www.ymin.com/index/newsDetails?id=1363' }
                    },
                    {
                        name: 'eCall紧急呼叫与定位',
                        icon: 'emergency_share',
                        description: '碰撞造成车载电源中断时，为eCall紧急呼叫与定位单元保留短时备份电源。',
                        flow: ['碰撞信号/电源中断', '超级电容备份电源', 'eCall呼叫与定位'],
                        modules: [{
                            name: 'eCall备份电源单元',
                            icon: 'sos',
                            desc: '面向紧急呼叫和定位数据发送的瞬时功率需求，提供免维护的短时备份。',
                            specs: [
                                { series: 'SDL(H)', voltage: '2.7V', cap: '10F', size: '12.5×20mm', note: '具体选型需按系统电压与保持时间确认' },
                                { series: 'SDB(H)', voltage: '3.0V', cap: '25F', size: '16×25mm', note: '具体选型需按系统电压与保持时间确认' }
                            ]
                        }],
                        source: { title: 'Eaton TVA汽车级超级电容应用', url: 'https://www.eaton.com/pe/es-mx/catalog/electronic-components/tva-supercapacitor-automotive.html' }
                    }
                ]
            },
            {
                key: 'parking-lithium',
                name: '驻车锂电',
                icon: 'local_shipping',
                template: 'supercapacitor',
                subApps: [
                    {
                        name: '重卡4G智联锂电一键强启',
                        icon: 'electric_bolt',
                        description: '重卡长时间驻车用电造成蓄电池电量不足时，超级电容通过一键强启功能提供发动机启动所需的瞬时大电流。',
                        flow: ['重卡4G智联锂电系统', '超级电容强启单元', '发动机一键启动'],
                        modules: [{
                            name: '一键强启超级电容单元',
                            icon: 'battery_charging_full',
                            desc: '在蓄电池馈电情况下承担启动瞬间的大功率输出，缩短等待救援时间。',
                            specs: [
                                { series: 'SDB', size: '16×25mm', voltage: '3.0V', cap: '30F', note: '重卡4G智联锂电一键强启' }
                            ]
                        }],
                        source: { title: '永铭SDB系列助力重卡4G智联锂电一键强启', url: 'https://ymin.com/index/newsDetails?id=1388' }
                    },
                    {
                        name: '驻车用电馈电应急启动',
                        icon: 'ac_unit',
                        description: '驻车空调、车载冰箱及生活电器等持续用电导致蓄电池馈电后，超级电容为发动机再次启动提供独立的瞬时功率保障。',
                        flow: ['驻车空调/生活电器用电', '蓄电池电量不足', '超级电容应急启动'],
                        modules: [{
                            name: '驻车馈电启动保障单元',
                            icon: 'offline_bolt',
                            desc: '超级电容不直接承担驻车负载供电，主要用于蓄电池馈电后的发动机应急启动。',
                            specs: [
                                { series: 'SDB', size: '16×25mm', voltage: '3.0V', cap: '30F', note: '按启动系统电压组合使用' }
                            ]
                        }],
                        source: { title: '永铭SDB系列助力重卡4G智联锂电一键强启', url: 'https://ymin.com/index/newsDetails?id=1388' }
                    },
                    {
                        name: '寒区重卡低温启动保障',
                        icon: 'severe_cold',
                        description: '低温环境下蓄电池功率能力下降时，超级电容凭借低温放电和瞬时大电流能力辅助重卡可靠启动。',
                        flow: ['低温驻车', '蓄电池功率衰减', '超级电容辅助启动'],
                        modules: [{
                            name: '低温启动保障单元',
                            icon: 'device_thermostat',
                            desc: '针对冬季或寒区重卡启动场景，提供低温下的快速能量释放。',
                            specs: [
                                { series: 'SDB', size: '16×25mm', voltage: '3.0V', cap: '30F', note: '低温启动应用' }
                            ]
                        }],
                        source: { title: '永铭SDB系列助力重卡4G智联锂电一键强启', url: 'https://ymin.com/index/newsDetails?id=1388' }
                    }
                ]
            }
        ]
    };
})(window);
