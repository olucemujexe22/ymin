var YMIN = window.YMIN || {};

YMIN.complianceCertificates = (function () {
    'use strict';

    var baseUrl = 'https://www.ymin.com';

    var systemCertifications = [
        {
            id: 'iatf-16949',
            name: 'IATF 16949 质量管理体系证书',
            scope: '汽车行业质量管理体系',
            status: '已取得',
            certificateNo: 'GLRSGR',
            issuedDate: '2021-11-13',
            issuer: '—',
            fileUrl: baseUrl + '/uploads/files/20250107/ded5e2d8e3e8c9f242c00834d30ee36f.pdf'
        },
        {
            id: 'iso-9001',
            name: 'ISO 9001:2015 质量管理体系证书',
            scope: '质量管理体系',
            status: '已取得',
            certificateNo: '00124Q310772R5M/3302',
            issuedDate: '2009-12-29',
            issuer: '中国质量认证中心',
            fileUrl: baseUrl + '/uploads/files/20250107/cc462dec0959aa3b071c82c1013948f4.pdf'
        },
        {
            id: 'iso-45001',
            name: 'ISO 45001:2018 职业健康安全管理体系证书',
            scope: '职业健康安全管理体系',
            status: '已取得',
            certificateNo: '00124S34090R4M/3302',
            issuedDate: '2013-03-22',
            issuer: '中国质量认证中心',
            fileUrl: baseUrl + '/uploads/files/20250107/025aadf0acdeb0342c4d805eb66250bb.pdf'
        },
        {
            id: 'iso-14001',
            name: 'ISO 14001:2015 环境管理体系证书',
            scope: '环境管理体系',
            status: '已取得',
            certificateNo: '00124E35135R4M/3302',
            issuedDate: '2013-03-22',
            issuer: '中国质量认证中心',
            fileUrl: baseUrl + '/uploads/files/20250107/e26a2b446c4ea12a92ddfc8a872f8cc8.pdf'
        },
        {
            id: 'gjb-9001c',
            name: '国军标质量管理体系认证证书',
            scope: '质量管理体系',
            status: '已取得',
            certificateNo: '02622J31819R0M',
            issuedDate: '2022-10-17',
            issuer: '北京天一正认证中心',
            fileUrl: baseUrl + '/uploads/files/20250107/3ec4f7e5a8696af4e64226ce9b5c01d7.pdf'
        }
    ];

    var productLines = [
        { id: 'liquid-aluminum', name: '液态铝电解电容器' },
        { id: 'polymer-solid', name: '高分子固态铝电解电容器' },
        { id: 'polymer-hybrid', name: '高分子混合动力铝电解电容器' },
        { id: 'double-layer-supercap', name: '双电层超级电容' },
        { id: 'hybrid-supercap', name: '混合型超级电容（锂离子电容）' },
        { id: 'stacked-polymer', name: '叠层高分子固态铝电解电容器' },
        { id: 'polymer-tantalum', name: '导电高分子钽电解电容器' },
        { id: 'film', name: '薄膜电容器' }
    ];
    var documentTypes = ['REACH', 'RoHS', 'SGS'];

    // 当前已掌握的公开文件信息。其余条目由后台资料维护时补全，不影响 24 条资料的维护结构。
    var knownDocuments = {
        'liquid-aluminum-SGS': {
            reportNo: 'SHAEC24021610602',
            reportDate: '2025-06-03',
            issuer: '通标标准技术服务有限公司',
            fileUrl: baseUrl + '/uploads/files/20250603/11b8d87e2fda412213994ba56a468561.pdf'
        },
        'polymer-solid-SGS': {
            reportNo: 'SHAEC25003101102',
            reportDate: '2025-06-03',
            issuer: '通标标准技术服务有限公司',
            fileUrl: baseUrl + '/uploads/files/20250603/fa0da0cad6cf464f09d0c1e01c13f672.pdf'
        },
        'double-layer-supercap-SGS': {
            reportNo: 'SHAEC25008403604',
            reportDate: '2025-06-03',
            issuer: '通标标准技术服务有限公司',
            fileUrl: ''
        },
        'stacked-polymer-SGS': {
            reportNo: 'SHAEC24014516708',
            reportDate: '2025-06-03',
            issuer: '通标标准技术服务有限公司',
            fileUrl: baseUrl + '/uploads/files/20250603/82be983c6654ceb3e5da6301f0f4222e.pdf'
        },
        'polymer-tantalum-REACH': {
            reportNo: 'SHAEC25028621206',
            reportDate: '2026-07-21',
            issuer: '通标标准技术服务有限公司',
            fileUrl: baseUrl + '/uploads/files/20260721/5fff0f49952d8724440c21cecaa141f6.pdf'
        },
        'polymer-tantalum-RoHS': {
            reportNo: 'SHAEC25028621202',
            reportDate: '2026-07-21',
            issuer: '通标标准技术服务（上海）有限公司',
            fileUrl: baseUrl + '/uploads/files/20260721/9fe2c771625de061c5e08050dbed5809.pdf'
        }
    };

    var productCertificationDocuments = productLines.reduce(function (rows, productLine) {
        return rows.concat(documentTypes.map(function (documentType) {
            var known = knownDocuments[productLine.id + '-' + documentType] || {};
            return {
                id: productLine.id + '-' + documentType.toLowerCase(),
                productLine: productLine.name,
                documentType: documentType,
                name: productLine.name + ' ' + documentType + ' 文件',
                reportNo: known.reportNo || '待维护',
                reportDate: known.reportDate || '',
                issuer: known.issuer || '待维护',
                fileUrl: known.fileUrl || ''
            };
        }));
    }, []);

    return {
        updatedAt: '2026-08-01',
        sourceUrl: baseUrl + '/index/aboutCertify?column_id=34',
        systemCertifications: systemCertifications,
        productLines: productLines,
        documentTypes: documentTypes,
        productCertificationDocuments: productCertificationDocuments
    };
})();
