const appData = {
    mainDrive: {
        name: '主驱 / 电驱电控',
        description: '电驱电控系统是新能源汽车的核心动力单元，包含DC-DC转换器、DC-AC逆变器、EPS转向控制等。永铭液态抗震座板贴片型铝电解电容器广泛应用于热管理系统/水泵/油泵/助力转向控制系统，兼具高抗震需求与成本效益。',
        subApps: [
            { name: 'DC-DC转换器', series: ['VHT/VHU', 'VPG'], icon: 'power' },
            { name: 'DC-AC逆变器', series: ['薄膜电容'], icon: 'conversion_path' },
            { name: 'EPS转向控制', series: ['LKL(R)', 'VKM'], icon: 'settings_suggest' },
            { name: '电机驱动', series: ['VHT', 'VPG'], icon: 'precision_manufacturing' }
        ],
        seriesCards: [
            { series: 'VHT/VHU', pkg: '贴片型', feature: '固液混合，ESR≤8mΩ，125℃，4000h', samplePn: 'VHTC0771H470MV', link: 'product-center.html?series=VHT' },
            { series: 'LKL(R)', pkg: '引线型', feature: '135℃超高温，DC-Link专用，低ESR', samplePn: 'LKL(R) 25V/4700μF', link: 'product-center.html?series=LKL(R)' },
            { series: 'VKM', pkg: '贴片型', feature: '105℃, 9000h, AEC-Q200', samplePn: 'VKMC1001H680MVTM', link: 'product-center.html?series=VKM' },
            { series: 'VPG', pkg: '引线型', feature: '高纹波, 大容量, 2000h', samplePn: 'VPGJ1951H122MVTM', link: 'product-center.html?series=VPG' }
        ]
    },
    charge: {
        name: '充电系统',
        description: '充电系统包含OBC车载充电机和DC-DC转换器。永铭针对性推出高性能电容产品矩阵，应对高压系统下对电容器耐高压、小尺寸、长寿命、耐大纹波电流的严苛要求。',
        subApps: [
            { name: 'OBC车载充电机', series: ['VHT/VHU', 'CW3H', 'LKD'], icon: 'ev_station' },
            { name: 'DC-DC转换器', series: ['VHT/VHU', '薄膜电容'], icon: 'transform' },
            { name: 'BMS电池管理', series: ['VHT', 'VPT'], icon: 'battery_horiz_075' }
        ],
        seriesCards: [
            { series: 'VHT/VHU', pkg: '贴片型', feature: '固液混合，ESR≤8mΩ，125℃', samplePn: 'VHTC0771H470MV', link: 'product-center.html?series=VHT' },
            { series: 'CW3H', pkg: '牛角型', feature: '400-500V, 800V平台DC-Link', samplePn: 'CW3H 800V平台', link: 'product-center.html?series=CW3H' },
            { series: 'LKD', pkg: '引线型', feature: '400-500V高压OBC', samplePn: 'LKD高压系列', link: 'product-center.html?series=LKD' }
        ]
    },
    safety: {
        name: '安全部件',
        description: '安全部件包括安全气囊ECU、ABS防抱死系统、EPS、one-box/ESC/EBS等。永铭LK系列通过AEC-Q200认证，专为安全气囊ECU设计。',
        subApps: [
            { name: '安全气囊', series: ['LK(引线型)', 'VKO(贴片型)'], icon: 'airbag', link: 'application-airbag.html' },
            { name: 'ABS防抱死系统', series: ['VKO', 'VKM'], icon: 'car_brake' },
            { name: 'EPS', series: ['LKL(R)', '液态抗震SMD'], icon: 'steering' },
            { name: 'one-box / ESC / EBS', series: ['VKO', 'LKL(R)'], icon: 'emergency' }
        ],
        seriesCards: [
            { series: 'LK', pkg: '引线型', feature: 'AEC-Q200, 低漏电流, 6000h', samplePn: 'OLKC1101C271MF', link: 'product-center.html?series=LK' },
            { series: 'VKO', pkg: '贴片型', feature: 'AEC-Q200, 大容量3300μF, 8000h', samplePn: 'VKOI2101C332MVTM', link: 'product-center.html?series=VKO' },
            { series: 'LKL(R)', pkg: '引线型', feature: '135℃, DC-Link, 低ESR', samplePn: 'LKL(R) 25V/4700μF', link: 'product-center.html?series=LKL(R)' }
        ]
    },
    adas: {
        name: 'ADAS / 自动驾驶辅助系统',
        description: 'ADAS系统包含域控制器、毫米波雷达、激光雷达、摄像头等传感器模组。需要高性能处理器和传感器供电，对电源稳定性、纹波抑制和瞬态响应要求极高。',
        subApps: [
            { name: '域控制器', series: ['NPX', 'VHT'], icon: 'memory' },
            { name: '毫米波雷达', series: ['VHT', 'VKM'], icon: 'radar' },
            { name: '摄像头模组', series: ['NPX', 'VKM'], icon: 'camera' }
        ],
        seriesCards: [
            { series: 'NPX', pkg: '贴片型', feature: '超低ESR(≤10mΩ), 小型化', samplePn: 'NPXC0700J561MJTM', link: 'product-center.html?series=NPX' },
            { series: 'VHT', pkg: '贴片型', feature: '125℃, 4000h, 固液混合', samplePn: 'VHTC0771H470MV', link: 'product-center.html?series=VHT' }
        ]
    },
    thermal: {
        name: '热管理',
        description: '热管理系统包括电子水泵、空调压缩机、水阀、PTC加热、电子油泵、冷却风扇、鼓风机等。VHE系列高分子混合电容专为热管理系统设计，135℃环境下稳定运行4000小时。',
        subApps: [
            { name: '电子水泵/油泵', series: ['VHE', '液态贴片SMD'], icon: 'water_pump' },
            { name: '空调压缩机', series: ['VHE', 'VHT'], icon: 'ac_unit' },
            { name: '冷却风扇/鼓风机', series: ['液态贴片SMD', 'VPG'], icon: 'fan' },
            { name: 'PTC加热器', series: ['VHE', 'VPG'], icon: 'heat' }
        ],
        seriesCards: [
            { series: 'VHE', pkg: '引线型', feature: '135℃超高温, 4000h, 高分子混合', samplePn: 'VHE系列 135℃', link: 'product-center.html?series=VHE' },
            { series: '液态贴片SMD', pkg: '贴片型', feature: '耐大纹波, 抗振动, 长寿命', samplePn: '液态抗震座板贴片型', link: 'product-center.html?series=SMD' }
        ]
    },
    cockpit: {
        name: '智能座舱',
        description: '智能座舱涵盖天窗、车窗、雨刮器、座椅控制、车载无线充、域控制器、HUD、多媒体等。',
        subApps: [
            { name: '域控制器/HUD', series: ['NPX', 'VKM'], icon: 'dashboard' },
            { name: '多媒体/T-BOX', series: ['VKM', 'VPT'], icon: 'speaker' },
            { name: '车窗/天窗/座椅', series: ['液态贴片SMD', 'VPG'], icon: 'chair' }
        ],
        seriesCards: [
            { series: 'NPX', pkg: '贴片型', feature: '超低ESR, 小型化', samplePn: 'NPXC0801H560MJTM', link: 'product-center.html?series=NPX' },
            { series: 'VKM', pkg: '贴片型', feature: 'AEC-Q200, 105℃, 9000h', samplePn: 'VKMC1001H680MVTM', link: 'product-center.html?series=VKM' }
        ]
    },
    lamp: {
        name: '车灯',
        description: '车灯系统包括前照大灯、刹车灯、转向灯、尾灯、雾灯、氛围灯等。推荐低ESR、高纹波电流电容以抑制EMI。',
        subApps: [
            { name: '前照大灯/LED', series: ['NPX', 'VHT'], icon: 'light' },
            { name: '刹车/转向/尾灯', series: ['VKM', 'VPG'], icon: 'emoji_objects' }
        ],
        seriesCards: [
            { series: 'NPX', pkg: '贴片型', feature: '超低ESR, 小型化', samplePn: 'NPXC0801H560MJTM', link: 'product-center.html?series=NPX' },
            { series: 'VHT', pkg: '贴片型', feature: '125℃, 固液混合', samplePn: 'VHTC0771H470MV', link: 'product-center.html?series=VHT' }
        ]
    },
    charger: {
        name: '充电桩',
        description: '充电桩需处理大功率AC-DC和DC-DC转换，要求高耐压、大容量、低ESR和长寿命。',
        subApps: [
            { name: 'AC-DC整流', series: ['VPG', '薄膜电容'], icon: 'power' },
            { name: 'DC-DC变换', series: ['CW3H', 'LKD'], icon: 'transform' }
        ],
        seriesCards: [
            { series: 'VPG', pkg: '引线型', feature: '高纹波, 大容量', samplePn: 'VPGJ1951H122MVTM', link: 'product-center.html?series=VPG' },
            { series: 'CW3H', pkg: '牛角型', feature: '400-500V, 大功率DC-Link', samplePn: 'CW3H系列', link: 'product-center.html?series=CW3H' }
        ]
    }
};
