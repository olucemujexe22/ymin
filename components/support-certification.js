var YMIN = window.YMIN || {};

YMIN.supportCertification = (function () {
    'use strict';

    var data = YMIN.complianceCertificates || {
        systemCertifications: [],
        productReports: [],
        updatedAt: ''
    };
    var pageSize = 8;
    var state = {
        search: '',
        type: 'all',
        category: 'all',
        file: 'all',
        page: 1,
        openId: ''
    };
    var toastTimer = 0;
    var categoryKeywords = {
        '双电层超级电容': ['SDA', 'SDB', 'SDH', 'SDL', 'SDM', 'SDN', 'SDS', 'SDV', 'SM'],
        '叠层高分子固态铝电解电容器': ['MPD', 'MPS', 'MPU', 'MPX'],
        '高分子固态铝电解电容器': ['V3', 'VG', 'VH', 'VK', 'VP', 'VMM'],
        '液态铝电解电容器（大型）': ['LK', 'LLK', 'LMM', 'NHT'],
        '液态铝电解电容器（小型）': ['CN', 'CW', 'EH', 'ES', 'EW', 'NH', 'NP', 'SN', 'SW'],
        '导电高分子钽电解电容器': ['TPA', 'TPB', 'TPD']
    };

    function byId(id) {
        return document.getElementById(id);
    }

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function formatDate(value) {
        if (!value) return '—';
        var date = new Date(value + 'T00:00:00');
        if (Number.isNaN(date.getTime())) return value;
        return date.getFullYear() + '年' + String(date.getMonth() + 1).padStart(2, '0') + '月' + String(date.getDate()).padStart(2, '0') + '日';
    }

    function iconForType(type) {
        if (type === 'RoHS' || type === 'REACH' || type === '无卤') return 'eco';
        if (type === 'UL') return 'verified_user';
        return 'fact_check';
    }

    function categories() {
        return Array.from(new Set(data.productReports.map(function (item) {
            return item.category;
        }))).sort(function (a, b) {
            return a.localeCompare(b, 'zh-CN');
        });
    }

    function types() {
        return Array.from(new Set(data.productReports.map(function (item) {
            return item.type;
        }))).sort(function (a, b) {
            return a.localeCompare(b, 'zh-CN');
        });
    }

    function showToast(message) {
        var toast = byId('certification-toast');
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('is-visible');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
            toast.classList.remove('is-visible');
        }, 2600);
    }

    function includesText(report, keyword) {
        if (!keyword) return true;
        var needle = keyword.toLocaleLowerCase();
        var normalizedNeedle = needle.replace(/[\s\-_]/g, '');
        var textMatch = [report.category, report.name, report.type, report.reportNo, report.reportDate, report.issuer]
            .join(' ')
            .toLocaleLowerCase()
            .indexOf(needle) !== -1;
        if (textMatch) return true;
        return (categoryKeywords[report.category] || []).some(function (prefix) {
            var normalizedPrefix = prefix.toLocaleLowerCase().replace(/[\s\-_]/g, '');
            return normalizedNeedle.indexOf(normalizedPrefix) === 0 || normalizedPrefix.indexOf(normalizedNeedle) === 0;
        });
    }

    function filteredReports() {
        return data.productReports.filter(function (report) {
            if (state.type !== 'all' && report.type !== state.type) return false;
            if (state.category !== 'all' && report.category !== state.category) return false;
            if (state.file === 'available' && !report.fileUrl) return false;
            if (state.file === 'pending' && report.fileUrl) return false;
            return includesText(report, state.search);
        }).sort(function (a, b) {
            return String(b.reportDate || '').localeCompare(String(a.reportDate || ''));
        });
    }

    function activeFilter(label, value) {
        return '<span class="support-active-filter">' + escapeHtml(label) + '：' + escapeHtml(value) + '</span>';
    }

    function updateActiveFilters() {
        var node = byId('cert-active-filters');
        if (!node) return;
        var items = [];
        if (state.search) items.push(activeFilter('关键词', state.search));
        if (state.type !== 'all') items.push(activeFilter('类型', state.type));
        if (state.category !== 'all') items.push(activeFilter('产品类别', state.category));
        if (state.file === 'available') items.push(activeFilter('文件', '已关联 PDF'));
        if (state.file === 'pending') items.push(activeFilter('文件', '待补附件'));
        node.innerHTML = items.join('');
    }

    function reportDetail(report) {
        var hasFile = Boolean(report.fileUrl);
        var deepLink = window.location.href.split('#')[0] + '#cert-report-' + report.id;
        var sourceText = hasFile
            ? '已关联 PDF 原始文件，可直接下载。'
            : '现官网已有该报告条目，但公开附件链接尚未关联，需由资料维护人员补充。';
        return '<div class="certification-report-detail">' +
            '<div class="certification-report-detail-inner">' +
            '<p><strong>机器可读摘要：</strong>' + escapeHtml(report.name) + '；报告编号 ' +
            escapeHtml(report.reportNo) + '；检测日期 ' + escapeHtml(formatDate(report.reportDate)) + '；检测机构 ' +
            escapeHtml(report.issuer) + '。' + sourceText + '</p>' +
            '<button class="certification-permalink" type="button" data-copy-link="' + escapeHtml(deepLink) + '">' +
            '<span class="material-symbols-outlined">link</span>复制永久链接</button>' +
            '</div></div>';
    }

    function reportMarkup(report) {
        var available = Boolean(report.fileUrl);
        var fileAction = available
            ? '<a class="certification-report-action" href="' + escapeHtml(report.fileUrl) + '" target="_blank" rel="noopener">' +
                '<span class="material-symbols-outlined">download</span>下载 PDF</a>'
            : '<span class="certification-report-action is-disabled"><span class="material-symbols-outlined">schedule</span>待补附件</span>';
        var openClass = state.openId === report.id ? ' is-open' : '';
        return '<article class="certification-report' + openClass + '" id="cert-report-' + escapeHtml(report.id) + '">' +
            '<div class="certification-report-main">' +
            '<div class="certification-report-icon"><span class="material-symbols-outlined">' + iconForType(report.type) + '</span></div>' +
            '<div class="certification-report-title"><h3>' + escapeHtml(report.name) + '</h3>' +
            '<div class="certification-report-meta"><span class="certification-badge is-type">' + escapeHtml(report.type) + '</span>' +
            '<span class="certification-badge">' + escapeHtml(report.category) + '</span></div></div>' +
            '<div class="certification-report-field"><small>报告编号</small><strong>' + escapeHtml(report.reportNo) + '</strong></div>' +
            '<div class="certification-report-field"><small>检测日期</small><strong>' + escapeHtml(formatDate(report.reportDate)) + '</strong></div>' +
            '<div class="certification-report-actions">' +
            '<button class="certification-report-action" type="button" data-toggle-report="' + escapeHtml(report.id) + '"><span class="material-symbols-outlined">article</span>摘要</button>' +
            fileAction +
            '</div></div>' + reportDetail(report) + '</article>';
    }

    function paginationMarkup(total, page) {
        var pages = Math.max(1, Math.ceil(total / pageSize));
        if (pages <= 1) return '';
        var result = '<button class="support-page-button" type="button" data-cert-page="' + Math.max(1, page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>上一页</button>';
        for (var i = 1; i <= pages; i += 1) {
            if (i === 1 || i === pages || Math.abs(i - page) <= 1) {
                result += '<button class="support-page-button' + (i === page ? ' is-active' : '') + '" type="button" data-cert-page="' + i + '">' + i + '</button>';
            } else if (i === 2 || i === pages - 1) {
                result += '<span class="certification-page-ellipsis">…</span>';
            }
        }
        return result + '<button class="support-page-button" type="button" data-cert-page="' + Math.min(pages, page + 1) + '"' + (page === pages ? ' disabled' : '') + '>下一页</button>';
    }

    function renderReports() {
        var reports = filteredReports();
        var pages = Math.max(1, Math.ceil(reports.length / pageSize));
        if (state.page > pages) state.page = pages;
        var start = (state.page - 1) * pageSize;
        var visible = reports.slice(start, start + pageSize);
        var count = byId('cert-result-count');
        var list = byId('cert-report-results');
        var pagination = byId('cert-report-pagination');
        if (count) {
            count.innerHTML = '共 <strong>' + reports.length + '</strong> 条产品检测报告' + (reports.length ? '，按检测日期排序' : '');
        }
        if (list) {
            list.innerHTML = visible.length
                ? visible.map(reportMarkup).join('')
                : '<div class="support-empty"><span class="material-symbols-outlined">search_off</span><h3>未找到匹配报告</h3><p>请调整产品类别、资料类型或关键词后再次查询。</p></div>';
        }
        if (pagination) pagination.innerHTML = paginationMarkup(reports.length, state.page);
        updateActiveFilters();
    }

    function renderSystemCertifications() {
        var rows = byId('cert-system-rows');
        if (!rows) return;
        rows.innerHTML = data.systemCertifications.map(function (certificate) {
            return '<tr id="cert-system-' + escapeHtml(certificate.id) + '">' +
                '<td>' + escapeHtml(certificate.name) + '</td>' +
                '<td>' + escapeHtml(certificate.scope) + '</td>' +
                '<td><span class="certification-status">' + escapeHtml(certificate.status) + '</span></td>' +
                '<td>' + escapeHtml(certificate.certificateNo) + '</td>' +
                '<td>' + escapeHtml(formatDate(certificate.issuedDate)) + '</td>' +
                '<td>' + escapeHtml(certificate.issuer) + '</td>' +
                '<td><a class="certification-file-link" href="' + escapeHtml(certificate.fileUrl) + '" target="_blank" rel="noopener"><span class="material-symbols-outlined">download</span>下载 PDF</a></td>' +
                '</tr>';
        }).join('');
    }

    function fillSelect(node, allLabel) {
        if (!node) return;
        node.innerHTML = '<option value="all">' + escapeHtml(allLabel) + '</option>' + categories().map(function (category) {
            return '<option value="' + escapeHtml(category) + '">' + escapeHtml(category) + '</option>';
        }).join('');
    }

    function renderTypeFilter() {
        var node = byId('cert-type-filter');
        if (!node) return;
        var values = ['all'].concat(types());
        node.innerHTML = values.map(function (type) {
            var label = type === 'all' ? '全部' : type;
            return '<button class="support-chip' + (state.type === type ? ' is-active' : '') + '" type="button" data-cert-type="' + escapeHtml(type) + '">' + escapeHtml(label) + '</button>';
        }).join('');
    }

    function renderStatistics() {
        var linkedProductFiles = data.productReports.filter(function (item) { return item.fileUrl; }).length;
        var systemFiles = data.systemCertifications.filter(function (item) { return item.fileUrl; }).length;
        byId('cert-product-report-count').textContent = data.productReports.length;
        byId('cert-system-cert-count').textContent = data.systemCertifications.length;
        byId('cert-file-count').textContent = linkedProductFiles + systemFiles;
        byId('cert-pending-count').textContent = data.productReports.length - linkedProductFiles;
    }

    function openReport(id, shouldScroll) {
        var report = data.productReports.find(function (item) { return item.id === id; });
        if (!report) return;
        state.openId = state.openId === id ? '' : id;
        if (state.openId) {
            state.search = '';
            state.type = 'all';
            state.category = 'all';
            state.file = 'all';
            state.page = Math.floor(data.productReports.slice().sort(function (a, b) {
                return String(b.reportDate || '').localeCompare(String(a.reportDate || ''));
            }).findIndex(function (item) { return item.id === id; }) / pageSize) + 1;
        }
        syncControls();
        renderTypeFilter();
        renderReports();
        if (state.openId) {
            window.history.replaceState(null, '', '#cert-report-' + id);
            if (shouldScroll) {
                window.setTimeout(function () {
                    var node = byId('cert-report-' + id);
                    if (node) node.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 0);
            }
        } else {
            window.history.replaceState(null, '', window.location.href.split('#')[0]);
        }
    }

    function syncControls() {
        var search = byId('cert-search-input');
        var category = byId('cert-category-filter');
        var file = byId('cert-file-filter');
        if (search) search.value = state.search;
        if (category) category.value = state.category;
        if (file) file.value = state.file;
    }

    function copyLink(link) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).then(function () {
                showToast('永久链接已复制，可用于资料归档或内部沟通。');
            }).catch(function () {
                showToast('无法自动复制，请从浏览器地址栏复制该链接。');
            });
        } else {
            showToast('请从浏览器地址栏复制该永久链接。');
        }
    }

    function lookupReports() {
        var keywordInput = byId('cert-lookup-keyword');
        var categorySelect = byId('cert-lookup-category');
        var keyword = keywordInput ? keywordInput.value.trim() : '';
        var category = categorySelect ? categorySelect.value : 'all';
        var candidates = data.productReports.filter(function (report) {
            return (category === 'all' || report.category === category) && includesText(report, keyword);
        });
        var result = byId('cert-lookup-result');
        if (!keyword && category === 'all') {
            result.classList.remove('is-found');
            result.innerHTML = '<span class="material-symbols-outlined">info</span><p>请至少输入料号/系列，或选择一个产品类别后再查询。</p>';
            return;
        }
        state.search = keyword;
        state.category = category;
        state.type = 'all';
        state.file = 'all';
        state.page = 1;
        state.openId = '';
        syncControls();
        renderTypeFilter();
        renderReports();
        if (candidates.length) {
            result.classList.add('is-found');
            result.innerHTML = '<span class="material-symbols-outlined">task_alt</span><p>当前公开资料中找到 <strong>' + candidates.length + '</strong> 条相关报告，已同步筛选至下方列表。该结果用于定位公开资料，不构成对单一料号的最终合规确认。</p>';
            byId('product-reports').scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            result.classList.remove('is-found');
            result.innerHTML = '<span class="material-symbols-outlined">info</span><p>当前公开资料未找到匹配报告。请尝试仅选择产品类别，或联系永铭获取料号级确认、材料成分和豁免条款资料。</p>';
        }
    }

    function addStructuredData() {
        var existing = document.getElementById('certification-structured-data');
        if (existing) existing.remove();
        var pageUrl = window.location.href.split('#')[0];
        var schema = {
            '@context': 'https://schema.org',
            '@type': 'Dataset',
            '@id': pageUrl + '#compliance-index',
            name: '永铭电子合规证书与产品检测报告索引',
            description: '永铭电子公开的体系认证与产品检测报告索引，包含报告编号、检测日期、检测机构及文件链接状态。',
            dateModified: data.updatedAt,
            creator: { '@type': 'Organization', name: '上海永铭电子股份有限公司' },
            hasPart: data.productReports.map(function (report) {
                return {
                    '@type': 'CreativeWork',
                    '@id': pageUrl + '#cert-report-' + report.id,
                    name: report.name,
                    identifier: report.reportNo,
                    datePublished: report.reportDate,
                    publisher: { '@type': 'Organization', name: report.issuer },
                    url: report.fileUrl || pageUrl + '#cert-report-' + report.id
                };
            })
        };
        var script = document.createElement('script');
        script.id = 'certification-structured-data';
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schema);
        document.head.appendChild(script);
    }

    function handleHash() {
        var match = window.location.hash.match(/^#cert-report-([\w-]+)$/);
        if (match) {
            var report = data.productReports.find(function (item) { return item.id === match[1]; });
            if (report) {
                state.openId = report.id;
                state.page = Math.floor(data.productReports.slice().sort(function (a, b) {
                    return String(b.reportDate || '').localeCompare(String(a.reportDate || ''));
                }).findIndex(function (item) { return item.id === report.id; }) / pageSize) + 1;
                window.setTimeout(function () {
                    var node = byId('cert-report-' + report.id);
                    if (node) node.scrollIntoView({ block: 'center' });
                }, 120);
            }
        }
    }

    function bindEvents() {
        byId('cert-search-form').addEventListener('submit', function (event) {
            event.preventDefault();
            state.search = byId('cert-search-input').value.trim();
            state.page = 1;
            state.openId = '';
            renderReports();
        });

        byId('cert-type-filter').addEventListener('click', function (event) {
            var button = event.target.closest('[data-cert-type]');
            if (!button) return;
            state.type = button.dataset.certType;
            state.page = 1;
            state.openId = '';
            renderTypeFilter();
            renderReports();
        });

        byId('cert-category-filter').addEventListener('change', function (event) {
            state.category = event.target.value;
            state.page = 1;
            state.openId = '';
            renderReports();
        });

        byId('cert-file-filter').addEventListener('change', function (event) {
            state.file = event.target.value;
            state.page = 1;
            state.openId = '';
            renderReports();
        });

        byId('cert-filter-reset').addEventListener('click', function () {
            state = { search: '', type: 'all', category: 'all', file: 'all', page: 1, openId: '' };
            syncControls();
            renderTypeFilter();
            renderReports();
        });

        byId('cert-report-results').addEventListener('click', function (event) {
            var toggle = event.target.closest('[data-toggle-report]');
            if (toggle) {
                openReport(toggle.dataset.toggleReport, false);
                return;
            }
            var copy = event.target.closest('[data-copy-link]');
            if (copy) copyLink(copy.dataset.copyLink);
        });

        byId('cert-report-pagination').addEventListener('click', function (event) {
            var button = event.target.closest('[data-cert-page]');
            if (!button || button.disabled) return;
            state.page = Number(button.dataset.certPage) || 1;
            state.openId = '';
            renderReports();
            byId('product-reports').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        byId('cert-lookup-button').addEventListener('click', lookupReports);
        byId('cert-lookup-keyword').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                lookupReports();
            }
        });

        window.addEventListener('hashchange', function () {
            handleHash();
            renderReports();
        });
    }

    function init() {
        if (YMIN.navbar && YMIN.navbar.inject) YMIN.navbar.inject('support');
        if (YMIN.footer && YMIN.footer.inject) YMIN.footer.inject();
        fillSelect(byId('cert-category-filter'), '全部产品类别');
        fillSelect(byId('cert-lookup-category'), '请选择产品类别');
        renderStatistics();
        renderSystemCertifications();
        renderTypeFilter();
        handleHash();
        syncControls();
        renderReports();
        bindEvents();
        addStructuredData();
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    YMIN.supportCertification.init();
});
