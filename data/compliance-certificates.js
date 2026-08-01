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

    var productReports = [
        { id: 'sc-sgs-23402', category: '双电层超级电容', name: '超电 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25008423402', reportDate: '2025-04-22', issuer: '通标标准技术服务有限公司', fileUrl: '' },
        { id: 'sc-sgs-20506', category: '双电层超级电容', name: '超电 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25008420506', reportDate: '2025-04-28', issuer: '通标标准技术服务有限公司', fileUrl: '' },
        { id: 'sc-sgs-21802', category: '双电层超级电容', name: '超电 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25008421802', reportDate: '2025-04-25', issuer: '通标标准技术服务有限公司', fileUrl: '' },
        { id: 'sc-sgs-03604', category: '双电层超级电容', name: '超电 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25008403604', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: '' },
        { id: 'stack-sgs-16702', category: '叠层高分子固态铝电解电容器', name: '叠层 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24014516702', reportDate: '2024-07-08', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/1551635c6fd1b1579a215610d0b245d4.pdf' },
        { id: 'stack-sgs-16704', category: '叠层高分子固态铝电解电容器', name: '叠层 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24014516704', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/eb21f24392b0f4d883caa5ef897daa1e.pdf' },
        { id: 'stack-sgs-16706', category: '叠层高分子固态铝电解电容器', name: '叠层 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24014516706', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/f0595a9d885b42b1da702c24171a6636.pdf' },
        { id: 'stack-sgs-16708', category: '叠层高分子固态铝电解电容器', name: '叠层 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24014516708', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/82be983c6654ceb3e5da6301f0f4222e.pdf' },
        { id: 'solid-sgs-11110', category: '高分子固态铝电解电容器', name: '固态 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25003101110', reportDate: '2025-02-27', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/2bdf3e9bbc4fc3c3334d5aa291f0dbce.pdf' },
        { id: 'solid-sgs-11102', category: '高分子固态铝电解电容器', name: '固态 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25003101102', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/fa0da0cad6cf464f09d0c1e01c13f672.pdf' },
        { id: 'solid-sgs-11106', category: '高分子固态铝电解电容器', name: '固态 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25003101106', reportDate: '2025-02-25', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/1dad1e0a270b0a0e7474073f6fda6d81.pdf' },
        { id: 'solid-sgs-11104', category: '高分子固态铝电解电容器', name: '固态 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC25003101104', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/6b22ae91280ba06f4e262a8cd0599b8d.pdf' },
        { id: 'liquid-large-sgs-41402', category: '液态铝电解电容器（大型）', name: '液态大型 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24029041402', reportDate: '2025-02-27', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/f8da4f3fada0c050e476ff9c438834e1.pdf' },
        { id: 'liquid-large-sgs-54902', category: '液态铝电解电容器（大型）', name: '液态大型 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24029054902', reportDate: '2024-12-25', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/199c093e1d78298bc4f5756c6a36f039.pdf' },
        { id: 'liquid-small-sgs-10602', category: '液态铝电解电容器（小型）', name: '液态小型 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24021610602', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/11b8d87e2fda412213994ba56a468561.pdf' },
        { id: 'liquid-small-sgs-10604', category: '液态铝电解电容器（小型）', name: '液态小型 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24021610604', reportDate: '2024-09-30', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/ed28554706c0cbcdda9eeb5e8f7bf417.pdf' },
        { id: 'liquid-small-sgs-10606', category: '液态铝电解电容器（小型）', name: '液态小型 SGS 检测报告', type: 'SGS', reportNo: 'SHAEC24021610606', reportDate: '2025-06-03', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20250603/16f4b4b4c7788a13c26dbb12b0df3589.pdf' },
        { id: 'sc-ul-26112806', category: '双电层超级电容', name: '超级电容 UL 认证', type: 'UL', reportNo: 'UL-US-26112806-0', reportDate: '2026-04-13', issuer: '超级电容 UL 认证', fileUrl: '' },
        { id: 'tantalum-rohs-21202', category: '导电高分子钽电解电容器', name: '导电高分子钽电解电容器 SGS RoHS', type: 'RoHS', reportNo: 'SHAEC25028621202', reportDate: '2026-07-21', issuer: '通标标准技术服务（上海）有限公司', fileUrl: baseUrl + '/uploads/files/20260721/9fe2c771625de061c5e08050dbed5809.pdf' },
        { id: 'tantalum-halogen-21204', category: '导电高分子钽电解电容器', name: '导电高分子钽电解电容器无卤', type: '无卤', reportNo: 'SHAEC25028621204', reportDate: '2026-07-21', issuer: '通标标准技术服务（上海）有限公司', fileUrl: baseUrl + '/uploads/files/20260721/fd136286ec94466aac51212bc94fd63a.pdf' },
        { id: 'tantalum-reach-21206', category: '导电高分子钽电解电容器', name: '导电高分子钽电解电容器 REACH', type: 'REACH', reportNo: 'SHAEC25028621206', reportDate: '2026-07-21', issuer: '通标标准技术服务有限公司', fileUrl: baseUrl + '/uploads/files/20260721/5fff0f49952d8724440c21cecaa141f6.pdf' }
    ];

    return {
        updatedAt: '2026-08-01',
        sourceUrl: baseUrl + '/index/aboutCertify?column_id=34',
        systemCertifications: systemCertifications,
        productReports: productReports
    };
})();
