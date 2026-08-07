(function (global) {
    'use strict';

    global.YMIN = global.YMIN || {};
    global.YMIN.applicationSupplemental = global.YMIN.applicationSupplemental || {};

    function collisionModuleDemoSpecs() {
        return [
            { series: 'SDH', voltage: '2.7V', cap: '25F', size: '16×25mm', note: '85℃，有第三方AEC-Q200报告' },
            { series: 'SDH', voltage: '2.7V', cap: '60F', size: '18×40mm', note: '85℃车规级' },
            { series: 'SDL(H)', voltage: '2.7V', cap: '10F', size: '12.5×20mm', note: '105℃，有第三方AEC-Q200报告' },
            { series: 'SDL(H)', voltage: '2.7V', cap: '25F', size: '16×25mm', note: '105℃车规级' },
            { series: 'SDB(H)', voltage: '3.0V', cap: '25F', size: '16×25mm', note: '105℃车规级' },
            { series: 'SDN', voltage: '3.0V', cap: '120F', size: '22×45mm', note: '85℃牛角型超级电容' }
        ];
    }

    function createSupercapacitorApplication(key, name, icon, description) {
        return {
            key: key,
            name: name,
            icon: icon,
            template: 'supercapacitor',
            subApps: [{
                name: name,
                icon: icon,
                description: description,
                modules: [{
                    name: '超级电容单元',
                    icon: 'battery_charging_full',
                    desc: '利用超级电容快速充放电、低温性能和大电流输出能力，为系统提供短时高功率支撑与备用能量。',
                    specs: collisionModuleDemoSpecs()
                }]
            }]
        };
    }

    global.YMIN.applicationSupplemental['ai-server'] = {
        tabs: [
            createSupercapacitorApplication(
                'pcs',
                'PCS',
                'conversion_path',
                'PCS系统在功率突变、母线波动或短时断电时，需要超级电容提供瞬时功率支撑与短时备用能量。'
            ),
            createSupercapacitorApplication(
                'bbu-backup-power',
                'BBU备用电源',
                'battery_charging_full',
                'BBU备用电源在主电源异常或负载突变时，由超级电容提供快速响应的短时备用能量。'
            ),
            createSupercapacitorApplication(
                'raid-disk-array',
                'RAID磁盘阵列',
                'storage',
                'RAID磁盘阵列在掉电保护与数据写回过程中，由超级电容提供短时能量，支持关键数据安全保存。'
            ),
            createSupercapacitorApplication(
                'plp-storage',
                'PLP存储',
                'save',
                'PLP存储在系统意外断电时，由超级电容为缓存数据写入非易失性存储提供短时备用电源。'
            )
        ]
    };
})(window);
