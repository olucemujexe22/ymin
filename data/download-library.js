(function () {
    'use strict';

    var records = [];

    function add(config) {
        records.push({
            id: config.id,
            title: config.title,
            type: config.type,
            typeLabel: config.typeLabel,
            group: config.group,
            productLine: config.productLine || '',
            application: config.application || '',
            language: config.language || 'CN',
            updated: config.updated || '',
            version: config.version || config.updated || '',
            href: config.href,
            external: Boolean(config.external),
            keywords: config.keywords || ''
        });
    }

    var productCatalogs = [
        {
            id: 'catalog-liquid-small',
            title: '液态小型铝电解电容器目录册',
            productLine: '液态小型铝电解电容器',
            updated: '2025-06-04',
            href: '产品资料库/01 产品目录册/液态小型目录册20250604(已确定，最新)/液态小型目录册20250604_optimize.pdf',
            keywords: '贴片 引线 液态小型 目录'
        },
        {
            id: 'catalog-liquid-large',
            title: '液态大型铝电解电容器目录册',
            productLine: '液态大型铝电解电容器',
            updated: '2026-01-13',
            href: '产品资料库/01 产品目录册/液态大型品目录册20250630(已确定，最新)/液态大型品目录册20260113.pdf',
            keywords: '牛角 基板自立 螺栓 液态大型 目录'
        },
        {
            id: 'catalog-solid-hybrid',
            title: '高分子固态及固液混合铝电解电容器目录册',
            productLine: '固态及固液混合铝电解电容器',
            updated: '2025-08-05',
            href: '产品资料库/01 产品目录册/固态、固液混合目录册20250805(已确定，最新)/固态固液混合目录册20250805.pdf',
            keywords: '固态 固液混合 混合动力 目录'
        },
        {
            id: 'catalog-stacked',
            title: '叠层高分子固态铝电解电容器目录册',
            productLine: '叠层高分子固态铝电解电容器',
            updated: '2024-09-11',
            href: '产品资料库/01 产品目录册/叠层目录册20240911(已确定，最新)/叠层目录册20240911.pdf',
            keywords: '叠层 高分子 固态 目录'
        },
        {
            id: 'catalog-supercap',
            title: '超级电容器目录册',
            productLine: '超级电容器',
            updated: '2026-04-22',
            href: '产品资料库/01 产品目录册/超电目录册20260422(已确定，最新)/超电目录册20260422.pdf',
            keywords: '双电层 锂离子 LIC 超级电容 目录'
        },
        {
            id: 'catalog-film',
            title: '薄膜电容器目录册',
            productLine: '薄膜电容器',
            updated: '2025-10-25',
            href: '产品资料库/01 产品目录册/薄膜电容器目录册 20251025（已确定，最新）/薄膜目录册20251025.pdf',
            keywords: '薄膜 DC-Link 目录'
        },
        {
            id: 'catalog-tantalum',
            title: '导电高分子钽电解电容器目录册',
            productLine: '导电高分子钽电解电容器',
            updated: '2026-04-27',
            href: '产品资料库/01 产品目录册/导电高分子钽电容器20260427(已确定，最新)/导电高分子钽电解电容20260427.pdf',
            keywords: '钽电容 导电高分子 目录'
        },
        {
            id: 'catalog-mlcc',
            title: '多层陶瓷片式电容器（MLCC）目录册',
            productLine: '多层陶瓷片式电容器',
            updated: '2025-01-13',
            href: 'https://www.ymin.com/uploads/files/20250113/3be50c896ce15198e4835a3fb02d2349.pdf',
            external: true,
            keywords: 'MLCC 陶瓷 电容 目录'
        }
    ];

    productCatalogs.forEach(function (item) {
        add(Object.assign({}, item, {
            type: 'product-catalog',
            typeLabel: '产品目录册',
            group: 'product-catalog'
        }));
    });

    var applicationCatalogs = [
        {
            id: 'application-automotive-liquid',
            title: '汽车电子液态铝电解电容应用手册',
            productLine: '液态铝电解电容器',
            application: '汽车电子',
            updated: '2025-06-14',
            href: '产品资料库/02 应用宣传目录/汽车电子-液态铝电解电容手册20250614/液态铝电解电容-汽车电子手册20250614_optimize.pdf',
            keywords: '汽车 车载 液态 铝电解'
        },
        {
            id: 'application-automotive-hybrid',
            title: '汽车电子固液混合电容应用手册',
            productLine: '固态及固液混合铝电解电容器',
            application: '汽车电子',
            updated: '2026-04-21',
            href: '产品资料库/02 应用宣传目录/汽车电子-固液混合电容手册20250603/汽车电子固液混合电容手册20260421.pdf',
            keywords: '汽车 车载 固液混合 混合动力'
        },
        {
            id: 'application-ai-server',
            title: 'AI服务器专用电容应用手册',
            application: 'AI服务器与数据中心',
            updated: '2025-10-31',
            href: '产品资料库/02 应用宣传目录/AI服务器专用电容应用手册20251031/AI服务器专用电容手册20251031.pdf',
            keywords: 'AI 服务器 数据中心 电源 PDN'
        },
        {
            id: 'application-storage',
            title: '储能专用电容应用手册',
            application: '储能',
            updated: '2026-04-18',
            href: '产品资料库/02 应用宣传目录/储能专用产品手册20260418/储能专用电容应用手册20260418.pdf',
            keywords: '储能 PCS BMS 逆变器'
        },
        {
            id: 'application-motor',
            title: '电机驱动专用电容应用手册',
            application: '新型电机驱动',
            updated: '2025-09-12',
            href: '产品资料库/02 应用宣传目录/电机驱动专用电容应用手册20250912/电机驱动专用电容应用手册0912.pdf',
            keywords: '电机 驱动 变频 伺服'
        },
        {
            id: 'application-power',
            title: '电力电子专用电容应用手册',
            application: '电源与电力电子',
            updated: '2026-03-21',
            href: '产品资料库/02 应用宣传目录/电力电子专用电容应用手册20260321/电力电子专用电容应用手册20260321.pdf',
            keywords: '电力电子 电源 逆变 变流'
        },
        {
            id: 'application-robot',
            title: '机器人专用电容应用手册',
            application: '机器人',
            updated: '2025-02-06',
            href: '产品资料库/02 应用宣传目录/机器人专用电容应用手册20250206/机器人专用电容应用手册20250206.pdf',
            keywords: '机器人 控制器 伺服 电源'
        },
        {
            id: 'application-drone',
            title: '无人机专用电容应用手册',
            application: '无人机',
            updated: '2025-02-06',
            href: '产品资料库/02 应用宣传目录/无人机专用电容应用手册20250206/无人机专用电容应用手册20250206.pdf',
            keywords: '无人机 飞控 电调 电源'
        },
        {
            id: 'application-pd',
            title: 'PD快充专用铝电解电容产品应用手册',
            application: '消费类电子与PD快充',
            updated: '2024-06-13',
            href: '产品资料库/02 应用宣传目录/PD快充专用铝电解电容产品应用手册20240613(已确定，最新)/20240613 PD快充专用铝电解电容产品应用手册.pdf',
            keywords: 'PD 快充 充电器 消费电子 电源'
        }
    ];

    applicationCatalogs.forEach(function (item) {
        add(Object.assign({}, item, {
            type: 'application-catalog',
            typeLabel: '应用手册',
            group: 'application-catalog'
        }));
    });

    add({
        id: 'selection-automotive',
        title: '汽车电子电容应用手册',
        type: 'application-catalog',
        typeLabel: '应用手册',
        group: 'application-catalog',
        application: '汽车电子',
        updated: '2025-01-14',
        href: 'https://www.ymin.com/uploads/files/20250114/d612fdc6df727643f9abaf2ba5afec5b.pdf',
        external: true,
        keywords: '汽车 车载 选型'
    });

    var codingRules = [
        {
            id: 'rule-liquid-small',
            title: '液态小型铝电解电容器产品编码规则',
            productLine: '液态小型铝电解电容器',
            updated: '2024-05-18',
            href: '产品资料库/各事业部编码规则/20240518液态小型铝电解电容器编码规则.pdf'
        },
        {
            id: 'rule-liquid-large-snapin',
            title: '液态大型铝电解电容器产品编码规则（基板自立型）',
            productLine: '液态大型铝电解电容器',
            updated: '2024-05-18',
            href: '产品资料库/各事业部编码规则/20240518液态大型铝电解电容器产品编码规则-基板自立型.pdf'
        },
        {
            id: 'rule-liquid-large-screw',
            title: '液态大型铝电解电容器产品编码规则（螺栓型）',
            productLine: '液态大型铝电解电容器',
            updated: '2024-05-18',
            href: '产品资料库/各事业部编码规则/20240518液态大型铝电解电容器产品编码规则-螺栓型.pdf'
        },
        {
            id: 'rule-solid-hybrid',
            title: '高分子固态及固液混合铝电解电容器产品编码规则',
            productLine: '固态及固液混合铝电解电容器',
            updated: '2024-05-18',
            href: '产品资料库/各事业部编码规则/20240518高分子固态及固液混合铝电解电容器产品编码规则.pdf'
        },
        {
            id: 'rule-stacked',
            title: '叠层高分子固态铝电解电容器产品编码规则',
            productLine: '叠层高分子固态铝电解电容器',
            updated: '2024-05-18',
            href: '产品资料库/各事业部编码规则/20240518叠层高分子固态铝电解电容器产品编码规则.pdf'
        },
        {
            id: 'rule-supercap',
            title: '超级电容器产品编码规则',
            productLine: '超级电容器',
            updated: '2024-05-18',
            href: '产品资料库/各事业部编码规则/20240518超级电容器编码规则.pdf'
        },
        {
            id: 'rule-tantalum',
            title: '导电高分子钽电解电容器产品编码规则',
            productLine: '导电高分子钽电解电容器',
            updated: '2024-05-18',
            href: '产品资料库/各事业部编码规则/20240518导电高分子钽电解电容器产品编码规则.pdf'
        },
        {
            id: 'rule-mlcc',
            title: '多层陶瓷片式电容器产品编码规则',
            productLine: '多层陶瓷片式电容器',
            updated: '2024-12-13',
            href: '产品资料库/各事业部编码规则/20241213多层陶瓷片式电容器编码规则.pdf'
        }
    ];

    codingRules.forEach(function (item) {
        add(Object.assign({}, item, {
            type: 'coding-rule',
            typeLabel: '编码规则',
            group: 'guidance',
            keywords: '编码 料号 命名 规则'
        }));
    });

    add({
        id: 'guide-package-quantity',
        title: '产品包装数量说明',
        type: 'usage-guide',
        typeLabel: '使用资料',
        group: 'guidance',
        updated: '2023-09-16',
        href: 'https://www.ymin.com/uploads/files/20230916/5c56f70c9ef3359d92ba2dafc81cd756.pdf',
        external: true,
        keywords: '包装 数量 包装方式'
    });

    window.YMIN_DOWNLOAD_LIBRARY = records;
})();
