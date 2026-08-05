var YMIN = window.YMIN || {};

YMIN.supportCertification = (function () {
    'use strict';

    var data = YMIN.complianceCertificates || {
        systemCertifications: [],
        productLines: [],
        documentTypes: [],
        productCertificationDocuments: [],
        updatedAt: ''
    };
    var documents = data.productCertificationDocuments || [];
    var pageSize = 8;
    var state = {
        search: '',
        productLine: 'all',
        documentType: 'all',
        page: 1,
        openId: ''
    };
    var toastTimer = 0;
    function isEnglishPage() {
        return (window.YMIN && YMIN.i18n && YMIN.i18n.language === 'en') ||
            new URLSearchParams(window.location.search).get('lang') === 'en';
    }

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
        if (isEnglishPage()) {
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return date.getFullYear() + '年' + String(date.getMonth() + 1).padStart(2, '0') + '月' + String(date.getDate()).padStart(2, '0') + '日';
    }

    function productLines() {
        return (data.productLines || []).map(function (item) { return item.name; });
    }

    function documentTypes() {
        return data.documentTypes || [];
    }

    function iconForDocumentType(documentType) {
        return 'eco';
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

    function includesText(document, keyword) {
        if (!keyword) return true;
        var needle = keyword.toLocaleLowerCase();
        var textMatch = [document.productLine, document.documentType, document.name, document.reportNo, document.reportDate, document.issuer]
            .join(' ')
            .toLocaleLowerCase()
            .indexOf(needle) !== -1;
        return textMatch;
    }

    function filteredDocuments() {
        return documents.filter(function (document) {
            if (state.productLine !== 'all' && document.productLine !== state.productLine) return false;
            if (state.documentType !== 'all' && document.documentType !== state.documentType) return false;
            return includesText(document, state.search);
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
        if (state.productLine !== 'all') items.push(activeFilter('产品线', state.productLine));
        if (state.documentType !== 'all') items.push(activeFilter('资料类型', state.documentType));
        node.innerHTML = items.join('');
    }

    function documentDetail(document) {
        var deepLink = window.location.href.split('#')[0] + '#cert-report-' + document.id;
        return '<div class="certification-report-detail">' +
            '<div class="certification-report-detail-inner">' +
            '<p><strong>资料类型：</strong>' + escapeHtml(document.documentType) + '；<strong>检测机构：</strong>' +
            escapeHtml(document.issuer || '—') + '。</p>' +
            '<button class="certification-permalink" type="button" data-copy-link="' + escapeHtml(deepLink) + '">' +
            '<span class="material-symbols-outlined">link</span>复制页面链接</button>' +
            '</div></div>';
    }

    function documentMarkup(document) {
        var available = Boolean(document.fileUrl);
        var fileAction = available
            ? '<a class="certification-report-action" href="' + escapeHtml(document.fileUrl) + '" target="_blank" rel="noopener">' +
                '<span class="material-symbols-outlined">download</span>下载 PDF</a>'
            : '';
        var openClass = state.openId === document.id ? ' is-open' : '';
        return '<article class="certification-report' + openClass + '" id="cert-report-' + escapeHtml(document.id) + '">' +
            '<div class="certification-report-main">' +
            '<div class="certification-report-icon"><span class="material-symbols-outlined">' + iconForDocumentType(document.documentType) + '</span></div>' +
            '<div class="certification-report-title"><h3>' + escapeHtml(document.name) + '</h3>' +
            '<div class="certification-report-meta"><span class="certification-badge">' + escapeHtml(document.productLine) + '</span>' +
            '<span class="certification-badge is-type">' + escapeHtml(document.documentType) + '</span></div></div>' +
            '<div class="certification-report-field"><small>报告编号</small><strong>' + escapeHtml(document.reportNo || '—') + '</strong></div>' +
            '<div class="certification-report-field"><small>检测日期</small><strong>' + escapeHtml(formatDate(document.reportDate)) + '</strong></div>' +
            '<div class="certification-report-actions">' +
            '<button class="certification-report-action" type="button" data-toggle-report="' + escapeHtml(document.id) + '"><span class="material-symbols-outlined">article</span>' + (isEnglishPage() ? 'Details' : '详情') + '</button>' +
            fileAction +
            '</div></div>' + documentDetail(document) + '</article>';
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

    function renderDocuments() {
        var filtered = filteredDocuments();
        var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (state.page > pages) state.page = pages;
        var start = (state.page - 1) * pageSize;
        var visible = filtered.slice(start, start + pageSize);
        var count = byId('cert-result-count');
        var list = byId('cert-report-results');
        var pagination = byId('cert-report-pagination');
        if (count) {
            count.innerHTML = isEnglishPage()
                ? 'Found <strong>' + filtered.length + '</strong> product certification documents' + (filtered.length ? ', sorted by test date' : '')
                : '共 <strong>' + filtered.length + '</strong> 条产品认证文件' + (filtered.length ? '，按检测日期排序' : '');
        }
        if (list) {
            list.innerHTML = visible.length
                ? visible.map(documentMarkup).join('')
                : '<div class="support-empty"><span class="material-symbols-outlined">search_off</span><h3>未找到匹配资料</h3><p>请调整产品线、资料类型或关键词后再次查询。</p></div>';
        }
        if (pagination) pagination.innerHTML = paginationMarkup(filtered.length, state.page);
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

    function fillProductLineSelect(node, allLabel) {
        if (!node) return;
        node.innerHTML = '<option value="all">' + escapeHtml(allLabel) + '</option>' + productLines().map(function (productLine) {
            return '<option value="' + escapeHtml(productLine) + '">' + escapeHtml(productLine) + '</option>';
        }).join('');
    }

    function renderDocumentTypeFilter() {
        var node = byId('cert-document-type-filter');
        if (!node) return;
        var values = ['all'].concat(documentTypes());
        node.innerHTML = values.map(function (documentType) {
            var label = documentType === 'all' ? '全部' : documentType;
            return '<button class="support-chip' + (state.documentType === documentType ? ' is-active' : '') + '" type="button" data-cert-document-type="' + escapeHtml(documentType) + '">' + escapeHtml(label) + '</button>';
        }).join('');
    }

    function renderStatistics() {
        byId('cert-product-report-count').textContent = documents.length;
        byId('cert-system-cert-count').textContent = data.systemCertifications.length;
    }

    function documentPage(document) {
        var sorted = documents.slice().sort(function (a, b) {
            return String(b.reportDate || '').localeCompare(String(a.reportDate || ''));
        });
        return Math.floor(sorted.findIndex(function (item) { return item.id === document.id; }) / pageSize) + 1;
    }

    function openDocument(id, shouldScroll) {
        var document = documents.find(function (item) { return item.id === id; });
        if (!document) return;
        state.openId = state.openId === id ? '' : id;
        if (state.openId) {
            state.search = '';
            state.productLine = 'all';
            state.documentType = 'all';
            state.page = documentPage(document);
        }
        syncControls();
        renderDocumentTypeFilter();
        renderDocuments();
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
        var productLine = byId('cert-product-line-filter');
        if (search) search.value = state.search;
        if (productLine) productLine.value = state.productLine;
    }

    function copyLink(link) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(link).then(function () {
                showToast('页面链接已复制。');
            }).catch(function () {
                showToast('无法自动复制，请从浏览器地址栏复制该链接。');
            });
        } else {
            showToast('请从浏览器地址栏复制该链接。');
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
            name: '永铭电子合规证书与产品认证文件索引',
            description: '永铭电子公开的体系认证与产品认证文件索引，包含产品线、资料类型、报告编号、检测日期、检测机构及文件链接。',
            dateModified: data.updatedAt,
            creator: { '@type': 'Organization', name: '上海永铭电子股份有限公司' },
            hasPart: documents.map(function (document) {
                return {
                    '@type': 'CreativeWork',
                    '@id': pageUrl + '#cert-report-' + document.id,
                    name: document.name,
                    identifier: document.reportNo,
                    datePublished: document.reportDate,
                    publisher: { '@type': 'Organization', name: document.issuer },
                    keywords: [document.productLine, document.documentType],
                    url: document.fileUrl || pageUrl + '#cert-report-' + document.id
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
            var document = documents.find(function (item) { return item.id === match[1]; });
            if (document) {
                state.openId = document.id;
                state.page = documentPage(document);
                window.setTimeout(function () {
                    var node = byId('cert-report-' + document.id);
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
            renderDocuments();
        });

        byId('cert-product-line-filter').addEventListener('change', function (event) {
            state.productLine = event.target.value;
            state.page = 1;
            state.openId = '';
            renderDocuments();
        });

        byId('cert-document-type-filter').addEventListener('click', function (event) {
            var button = event.target.closest('[data-cert-document-type]');
            if (!button) return;
            state.documentType = button.dataset.certDocumentType;
            state.page = 1;
            state.openId = '';
            renderDocumentTypeFilter();
            renderDocuments();
        });

        byId('cert-filter-reset').addEventListener('click', function () {
            state = { search: '', productLine: 'all', documentType: 'all', page: 1, openId: '' };
            syncControls();
            renderDocumentTypeFilter();
            renderDocuments();
        });

        byId('cert-report-results').addEventListener('click', function (event) {
            var toggle = event.target.closest('[data-toggle-report]');
            if (toggle) {
                openDocument(toggle.dataset.toggleReport, false);
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
            renderDocuments();
            byId('product-reports').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });

        window.addEventListener('hashchange', function () {
            handleHash();
            renderDocuments();
        });
    }

    function init() {
        if (YMIN.navbar && YMIN.navbar.inject) YMIN.navbar.inject('support');
        if (YMIN.footer && YMIN.footer.inject) YMIN.footer.inject();
        fillProductLineSelect(byId('cert-product-line-filter'), '全部产品线');
        renderStatistics();
        renderSystemCertifications();
        renderDocumentTypeFilter();
        handleHash();
        syncControls();
        renderDocuments();
        bindEvents();
        addStructuredData();
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    YMIN.supportCertification.init();
});
