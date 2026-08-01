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

    // 产品合规资料按 8 个产品线维护；每个产品线当前只保留一条综合资料。
    // coverage 表示同一份资料覆盖的项目，不作为独立报告拆分。
    var productLineDocuments = [
        { id: 'liquid-aluminum', productLine: '液态铝电解电容器', name: '液态铝电解电容器合规检测资料', reportNo: 'SHAEC24021610602', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: baseUrl + '/uploads/files/20250603/11b8d87e2fda412213994ba56a468561.pdf' },
        { id: 'polymer-solid', productLine: '高分子固态铝电解电容器', name: '高分子固态铝电解电容器合规检测资料', reportNo: 'SHAEC25003101102', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: baseUrl + '/uploads/files/20250603/fa0da0cad6cf464f09d0c1e01c13f672.pdf' },
        { id: 'polymer-hybrid', productLine: '高分子混合动力铝电解电容器', name: '高分子混合动力铝电解电容器合规资料', reportNo: '待维护', reportDate: '', issuer: '待维护', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: '' },
        { id: 'double-layer-supercap', productLine: '双电层超级电容', name: '双电层超级电容合规检测资料', reportNo: 'SHAEC25008403604', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: '' },
        { id: 'hybrid-supercap', productLine: '混合型超级电容（锂离子电容）', name: '混合型超级电容（锂离子电容）合规资料', reportNo: '待维护', reportDate: '', issuer: '待维护', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: '' },
        { id: 'stacked-polymer', productLine: '叠层高分子固态铝电解电容器', name: '叠层高分子固态铝电解电容器合规检测资料', reportNo: 'SHAEC24014516708', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: baseUrl + '/uploads/files/20250603/82be983c6654ceb3e5da6301f0f4222e.pdf' },
        { id: 'polymer-tantalum', productLine: '导电高分子钽电解电容器', name: '导电高分子钽电解电容器合规检测资料', reportNo: 'SHAEC25028621202', reportDate: '2026-07-21', issuer: '通标标准技术服务（上海）有限公司', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: baseUrl + '/uploads/files/20260721/9fe2c771625de061c5e08050dbed5809.pdf' },
        { id: 'film', productLine: '薄膜电容器', name: '薄膜电容器合规资料', reportNo: '待维护', reportDate: '', issuer: '待维护', coverage: ['无卤', 'REACH', 'RoHS'], fileUrl: '' }
    ];

    return {
        updatedAt: '2026-08-01',
        sourceUrl: baseUrl + '/index/aboutCertify?column_id=34',
        systemCertifications: systemCertifications,
        productLineDocuments: productLineDocuments
    };
})();
