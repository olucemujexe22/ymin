(function () {
    'use strict';

    var library = Array.isArray(window.YMIN_DOWNLOAD_LIBRARY) ? window.YMIN_DOWNLOAD_LIBRARY.slice() : [];
    var pageSize = 10;
    var state = {
        query: '',
        group: 'all',
        type: 'all',
        scope: 'all',
        language: 'all',
        page: 1,
        selected: new Set()
    };

    var typeDefinitions = [
        { value: 'all', label: '全部' },
        { value: 'comprehensive-catalog', label: '综合目录册' },
        { value: 'product-catalog', label: '产品目录册' },
        { value: 'application-catalog', label: '应用选型手册' },
        { value: 'coding-rule', label: '编码规则' },
        { value: 'usage-guide', label: '使用资料' }
    ];

    var elements = {};
    var toastTimer = null;

    function cacheElements() {
        elements.search = document.getElementById('download-search');
        elements.searchButton = document.getElementById('download-search-button');
        elements.typeTabs = document.getElementById('download-type-tabs');
        elements.scopeSelect = document.getElementById('download-scope-select');
        elements.languageSelect = document.getElementById('download-language-select');
        elements.reset = document.getElementById('download-reset');
        elements.count = document.getElementById('download-count');
        elements.activeFilters = document.getElementById('download-active-filters');
        elements.results = document.getElementById('download-results');
        elements.pagination = document.getElementById('download-pagination');
        elements.batchButton = document.getElementById('download-batch-button');
        elements.selectedCount = document.getElementById('download-selected-count');
        elements.toast = document.getElementById('download-toast');
    }

    function initPage() {
        if (window.YMIN && YMIN.navbar) {
            YMIN.navbar.inject('support');
        }
        if (window.YMIN && YMIN.footer) {
            YMIN.footer.inject();
        }

        cacheElements();
        renderStats();
        renderTypeTabs();
        renderScopeOptions();
        bindEvents();
        render();
    }

    function renderStats() {
        var productCount = library.filter(function (item) { return item.type === 'product-catalog'; }).length;
        var applicationCount = library.filter(function (item) { return item.type === 'application-catalog'; }).length;

        document.getElementById('download-total-count').textContent = library.length;
        document.getElementById('download-product-count').textContent = productCount;
        document.getElementById('download-application-count').textContent = applicationCount;

        document.querySelectorAll('[data-group-count]').forEach(function (node) {
            var group = node.getAttribute('data-group-count');
            node.textContent = group === 'all'
                ? library.length
                : library.filter(function (item) { return item.group === group; }).length;
        });
    }

    function renderTypeTabs() {
        elements.typeTabs.innerHTML = typeDefinitions.map(function (item) {
            var count = item.value === 'all'
                ? library.length
                : library.filter(function (record) { return record.type === item.value; }).length;
            return '<button class="support-chip' + (state.type === item.value ? ' is-active' : '') +
                '" type="button" data-download-type="' + item.value + '">' +
                escapeHtml(item.label) + ' <span>' + count + '</span></button>';
        }).join('');
    }

    function renderScopeOptions() {
        var productLines = uniqueSorted(library.map(function (item) { return item.productLine; }).filter(Boolean));
        var applications = uniqueSorted(library.map(function (item) { return item.application; }).filter(Boolean));

        var html = '<option value="all">全部分类</option>';
        if (productLines.length) {
            html += '<optgroup label="产品类别">';
            html += productLines.map(function (name) {
                return '<option value="product|' + escapeAttribute(name) + '">' + escapeHtml(name) + '</option>';
            }).join('');
            html += '</optgroup>';
        }
        if (applications.length) {
            html += '<optgroup label="应用领域">';
            html += applications.map(function (name) {
                return '<option value="application|' + escapeAttribute(name) + '">' + escapeHtml(name) + '</option>';
            }).join('');
            html += '</optgroup>';
        }
        elements.scopeSelect.innerHTML = html;
    }

    function bindEvents() {
        elements.searchButton.addEventListener('click', applySearch);
        elements.search.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                applySearch();
            }
        });
        elements.search.addEventListener('input', function () {
            if (!elements.search.value.trim() && state.query) {
                state.query = '';
                state.page = 1;
                render();
            }
        });

        elements.typeTabs.addEventListener('click', function (event) {
            var button = event.target.closest('[data-download-type]');
            if (!button) return;
            state.type = button.getAttribute('data-download-type');
            state.page = 1;
            renderTypeTabs();
            render();
        });

        document.querySelectorAll('[data-download-group]').forEach(function (button) {
            button.addEventListener('click', function () {
                state.group = button.getAttribute('data-download-group');
                state.page = 1;
                document.querySelectorAll('[data-download-group]').forEach(function (node) {
                    node.classList.toggle('is-active', node === button);
                });
                render();
                document.querySelector('.download-content-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });

        elements.scopeSelect.addEventListener('change', function () {
            state.scope = elements.scopeSelect.value;
            state.page = 1;
            render();
        });

        elements.languageSelect.addEventListener('change', function () {
            state.language = elements.languageSelect.value;
            state.page = 1;
            render();
        });

        elements.reset.addEventListener('click', resetFilters);
        elements.results.addEventListener('change', handleSelection);
        elements.batchButton.addEventListener('click', downloadSelected);
        elements.pagination.addEventListener('click', handlePagination);
    }

    function applySearch() {
        state.query = elements.search.value.trim();
        state.page = 1;
        render();
    }

    function resetFilters() {
        state.query = '';
        state.group = 'all';
        state.type = 'all';
        state.scope = 'all';
        state.language = 'all';
        state.page = 1;
        elements.search.value = '';
        elements.scopeSelect.value = 'all';
        elements.languageSelect.value = 'all';
        document.querySelectorAll('[data-download-group]').forEach(function (node) {
            node.classList.toggle('is-active', node.getAttribute('data-download-group') === 'all');
        });
        renderTypeTabs();
        render();
    }

    function getFilteredRecords() {
        var query = normalize(state.query);
        return library.filter(function (item) {
            if (state.group !== 'all' && item.group !== state.group) return false;
            if (state.type !== 'all' && item.type !== state.type) return false;
            if (state.language !== 'all' && item.language !== state.language) return false;

            if (state.scope !== 'all') {
                var parts = state.scope.split('|');
                if (parts[0] === 'product' && item.productLine !== parts.slice(1).join('|')) return false;
                if (parts[0] === 'application' && item.application !== parts.slice(1).join('|')) return false;
            }

            if (query) {
                var haystack = normalize([
                    item.title,
                    item.typeLabel,
                    item.productLine,
                    item.application,
                    item.keywords
                ].join(' '));
                if (haystack.indexOf(query) === -1) return false;
            }
            return true;
        }).sort(function (a, b) {
            var typeOrder = {
                'comprehensive-catalog': 0,
                'product-catalog': 1,
                'application-catalog': 2,
                'coding-rule': 3,
                'usage-guide': 4
            };
            var aOrder = Object.prototype.hasOwnProperty.call(typeOrder, a.type) ? typeOrder[a.type] : 99;
            var bOrder = Object.prototype.hasOwnProperty.call(typeOrder, b.type) ? typeOrder[b.type] : 99;
            if (aOrder !== bOrder) return aOrder - bOrder;
            if (a.updated === b.updated) return a.title.localeCompare(b.title, 'zh-CN');
            return b.updated.localeCompare(a.updated);
        });
    }

    function render() {
        var filtered = getFilteredRecords();
        var totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (state.page > totalPages) state.page = totalPages;

        var start = (state.page - 1) * pageSize;
        var pageRecords = filtered.slice(start, start + pageSize);

        elements.count.innerHTML = '共找到 <strong>' + filtered.length + '</strong> 份资料';
        renderActiveFilters();
        renderResults(pageRecords);
        renderPagination(totalPages);
        updateSelectedState();
    }

    function renderActiveFilters() {
        var labels = [];
        if (state.group !== 'all') {
            var groupLabels = {
                'product-catalog': '产品目录册',
                'application-catalog': '应用选型手册',
                'comprehensive-catalog': '综合目录册',
                guidance: '编码与使用资料'
            };
            labels.push(groupLabels[state.group]);
        }
        if (state.type !== 'all') {
            labels.push(typeDefinitions.find(function (item) { return item.value === state.type; }).label);
        }
        if (state.scope !== 'all') {
            labels.push(state.scope.split('|').slice(1).join('|'));
        }
        if (state.language !== 'all') labels.push(state.language === 'CN' ? '中文' : '英文');
        if (state.query) labels.push('关键词：' + state.query);

        elements.activeFilters.innerHTML = labels.map(function (label) {
            return '<span class="support-active-filter">' + escapeHtml(label) + '</span>';
        }).join('');
    }

    function renderResults(records) {
        if (!records.length) {
            elements.results.innerHTML =
                '<div class="support-empty">' +
                '<span class="material-symbols-outlined">search_off</span>' +
                '<h3>暂未找到对应资料</h3>' +
                '<p>请尝试缩短关键词，或清除部分筛选条件。</p>' +
                '</div>';
            return;
        }

        elements.results.innerHTML = records.map(function (item) {
            var href = encodeURI(item.href);
            var checked = state.selected.has(item.id);
            var scopeTags = [];
            if (item.productLine) scopeTags.push(item.productLine);
            if (item.application) scopeTags.push(item.application);

            return '<article class="download-item' + (checked ? ' is-selected' : '') +
                '" itemscope itemtype="https://schema.org/DataDownload">' +
                '<input class="download-checkbox" type="checkbox" aria-label="选择 ' + escapeAttribute(item.title) +
                '" data-download-select="' + escapeAttribute(item.id) + '"' + (checked ? ' checked' : '') + '>' +
                '<div class="download-file-badge" aria-hidden="true">PDF</div>' +
                '<div class="download-item-copy">' +
                '<h3 class="download-item-title" itemprop="name">' + escapeHtml(item.title) + '</h3>' +
                (item.external ? '<span class="download-source-mark">现官网资料</span>' : '') +
                '<div class="download-tags">' +
                '<span class="download-tag is-type">' + escapeHtml(item.typeLabel) + '</span>' +
                scopeTags.map(function (tag) { return '<span class="download-tag">' + escapeHtml(tag) + '</span>'; }).join('') +
                '</div>' +
                '<div class="download-meta">' +
                '<span><span class="material-symbols-outlined">translate</span>' + escapeHtml(item.language) + '</span>' +
                '<span><span class="material-symbols-outlined">event</span>更新 ' + escapeHtml(item.updated) + '</span>' +
                '<span><span class="material-symbols-outlined">picture_as_pdf</span>PDF</span>' +
                '</div>' +
                '<meta itemprop="encodingFormat" content="application/pdf">' +
                '<meta itemprop="dateModified" content="' + escapeAttribute(item.updated) + '">' +
                '<meta itemprop="inLanguage" content="' + escapeAttribute(item.language) + '">' +
                '<link itemprop="contentUrl" href="' + href + '">' +
                '</div>' +
                '<div class="download-item-actions">' +
                '<a class="download-action" href="' + href + '" target="_blank" rel="noopener">' +
                '<span class="material-symbols-outlined">visibility</span>在线查看</a>' +
                '<a class="download-action is-primary" href="' + href + '"' +
                (item.external ? ' target="_blank" rel="noopener"' : ' download') + '>' +
                '<span class="material-symbols-outlined">download</span>下载</a>' +
                '</div>' +
                '</article>';
        }).join('');
    }

    function renderPagination(totalPages) {
        if (totalPages <= 1) {
            elements.pagination.innerHTML = '';
            return;
        }

        var html = '<button class="support-page-button" type="button" data-page="' + (state.page - 1) +
            '"' + (state.page === 1 ? ' disabled' : '') + '>上一页</button>';

        for (var page = 1; page <= totalPages; page += 1) {
            html += '<button class="support-page-button' + (page === state.page ? ' is-active' : '') +
                '" type="button" data-page="' + page + '">' + page + '</button>';
        }

        html += '<button class="support-page-button" type="button" data-page="' + (state.page + 1) +
            '"' + (state.page === totalPages ? ' disabled' : '') + '>下一页</button>';
        elements.pagination.innerHTML = html;
    }

    function handlePagination(event) {
        var button = event.target.closest('[data-page]');
        if (!button || button.disabled) return;
        state.page = Number(button.getAttribute('data-page')) || 1;
        render();
        document.querySelector('.download-toolbar').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function handleSelection(event) {
        var checkbox = event.target.closest('[data-download-select]');
        if (!checkbox) return;
        var id = checkbox.getAttribute('data-download-select');
        if (checkbox.checked) {
            state.selected.add(id);
        } else {
            state.selected.delete(id);
        }
        checkbox.closest('.download-item').classList.toggle('is-selected', checkbox.checked);
        updateSelectedState();
    }

    function updateSelectedState() {
        elements.selectedCount.textContent = state.selected.size;
        elements.batchButton.disabled = state.selected.size === 0;
    }

    function downloadSelected() {
        var selectedRecords = library.filter(function (item) { return state.selected.has(item.id); });
        if (!selectedRecords.length) return;

        selectedRecords.forEach(function (item, index) {
            window.setTimeout(function () {
                var anchor = document.createElement('a');
                anchor.href = encodeURI(item.href);
                if (item.external) {
                    anchor.target = '_blank';
                    anchor.rel = 'noopener';
                } else {
                    anchor.download = '';
                }
                document.body.appendChild(anchor);
                anchor.click();
                anchor.remove();
            }, index * 120);
        });

        showToast('已开始下载 ' + selectedRecords.length + ' 份资料。浏览器可能会提示允许多个文件下载。');
    }

    function showToast(message) {
        if (!elements.toast) return;
        elements.toast.textContent = message;
        elements.toast.classList.add('is-visible');
        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(function () {
            elements.toast.classList.remove('is-visible');
        }, 3600);
    }

    function uniqueSorted(values) {
        return Array.from(new Set(values)).sort(function (a, b) { return a.localeCompare(b, 'zh-CN'); });
    }

    function normalize(value) {
        return String(value || '').trim().toUpperCase().replace(/\s+/g, ' ');
    }

    function escapeHtml(value) {
        return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function escapeAttribute(value) {
        return escapeHtml(value);
    }

    document.addEventListener('DOMContentLoaded', initPage);
})();
