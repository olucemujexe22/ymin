(function () {
    'use strict';

    var library = Array.isArray(window.YMIN_DOWNLOAD_LIBRARY) ? window.YMIN_DOWNLOAD_LIBRARY.slice() : [];
    var pageSize = 10;
    var state = {
        query: '',
        type: 'all',
        productCategory: 'all',
        packageType: 'all',
        page: 1,
        selected: new Set()
    };

    var productCategoryDefinitions = [
        { value: 'all', label: '全部产品类别', packageTypes: ['贴片型', '引线型', '基板自立型／牛角型', '螺栓型'] },
        { value: '液态铝电解电容器', label: '液态铝电解电容器', packageTypes: ['贴片型', '引线型', '基板自立型／牛角型', '螺栓型'] },
        { value: '双电层超级电容器', label: '双电层超级电容器', packageTypes: ['贴片型', '引线型', '基板自立型／牛角型'] },
        { value: '高分子固态铝电解电容器', label: '高分子固态铝电解电容器', packageTypes: ['贴片型', '引线型'] },
        { value: '混合型超级电容器（锂离子电容器）', label: '混合型超级电容器（锂离子电容器）', packageTypes: ['引线型'] },
        { value: '高分子混合动力铝电解电容器', label: '高分子混合动力铝电解电容器', packageTypes: ['贴片型', '引线型'] },
        { value: '叠层高分子固态铝电解电容器', label: '叠层高分子固态铝电解电容器', packageTypes: ['贴片型'] },
        { value: '金属化聚丙烯薄膜电容器', label: '金属化聚丙烯薄膜电容器', packageTypes: ['引线型'] },
        { value: '导电高分子钽电解电容器', label: '导电高分子钽电解电容器', packageTypes: ['贴片型'] }
    ];

    var packageTypeDefinitions = [
        { value: 'all', label: '全部封装／结构形式' },
        { value: '贴片型', label: '贴片型' },
        { value: '引线型', label: '引线型' },
        { value: '基板自立型／牛角型', label: '基板自立型／牛角型' },
        { value: '螺栓型', label: '螺栓型' }
    ];

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

    function isEnglishPage() {
        return (window.YMIN && YMIN.i18n && YMIN.i18n.language === 'en') ||
            new URLSearchParams(window.location.search).get('lang') === 'en';
    }

    function displayText(value) {
        return isEnglishPage() && window.YMIN && YMIN.i18n
            ? YMIN.i18n.t(value)
            : value;
    }

    function cacheElements() {
        elements.search = document.getElementById('download-search');
        elements.searchButton = document.getElementById('download-search-button');
        elements.typeTabs = document.getElementById('download-type-tabs');
        elements.categorySelect = document.getElementById('download-category-select');
        elements.packageSelect = document.getElementById('download-package-select');
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
        renderStructuredOptions();
        renderTypeTabs();
        bindEvents();
        render();
    }

    function renderStats() {
        var productCount = library.filter(function (item) { return item.type === 'product-catalog'; }).length;
        var applicationCount = library.filter(function (item) { return item.type === 'application-catalog'; }).length;

        document.getElementById('download-total-count').textContent = library.length;
        document.getElementById('download-product-count').textContent = productCount;
        document.getElementById('download-application-count').textContent = applicationCount;

    }

    function renderStructuredOptions() {
        elements.categorySelect.innerHTML = productCategoryDefinitions.map(function (item) {
            return '<option value="' + escapeAttribute(item.value) + '">' + escapeHtml(displayText(item.label)) + '</option>';
        }).join('');
        renderPackageOptions();
    }

    function renderPackageOptions() {
        var categoryDefinition = productCategoryDefinitions.find(function (item) {
            return item.value === state.productCategory;
        }) || productCategoryDefinitions[0];
        var availablePackages = categoryDefinition.packageTypes || [];
        var visibleDefinitions = packageTypeDefinitions.filter(function (item) {
            return item.value === 'all' || availablePackages.indexOf(item.value) !== -1;
        });
        elements.packageSelect.innerHTML = visibleDefinitions.map(function (item) {
            return '<option value="' + escapeAttribute(item.value) + '">' + escapeHtml(displayText(item.label)) + '</option>';
        }).join('');
        if (!visibleDefinitions.some(function (item) { return item.value === state.packageType; })) {
            state.packageType = 'all';
        }
        elements.packageSelect.value = state.packageType;
    }

    function renderTypeTabs() {
        elements.typeTabs.innerHTML = typeDefinitions.map(function (item) {
            var count = item.value === 'all'
                ? library.length
                : library.filter(function (record) { return record.type === item.value; }).length;
            return '<button class="support-chip' + (state.type === item.value ? ' is-active' : '') +
                '" type="button" data-download-type="' + item.value + '">' +
                escapeHtml(displayText(item.label)) + ' <span>' + count + '</span></button>';
        }).join('');
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

        elements.categorySelect.addEventListener('change', function () {
            state.productCategory = elements.categorySelect.value;
            state.packageType = 'all';
            renderPackageOptions();
            state.page = 1;
            render();
        });

        elements.packageSelect.addEventListener('change', function () {
            state.packageType = elements.packageSelect.value;
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
        state.type = 'all';
        state.productCategory = 'all';
        state.packageType = 'all';
        state.page = 1;
        elements.search.value = '';
        elements.categorySelect.value = 'all';
        elements.packageSelect.value = 'all';
        renderTypeTabs();
        render();
    }

    function getFilteredRecords() {
        var query = normalize(state.query);
        return library.filter(function (item) {
            if (state.type !== 'all' && item.type !== state.type) return false;
            if (state.productCategory !== 'all' && item.productCategories.indexOf(state.productCategory) === -1) return false;
            if (state.packageType !== 'all' && item.packageTypes.indexOf(state.packageType) === -1) return false;

            if (query) {
                var haystack = normalize([
                    item.title,
                    item.typeLabel,
                    item.productCategories.join(' '),
                    item.packageTypes.join(' '),
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
        if (state.type !== 'all') {
            labels.push(typeDefinitions.find(function (item) { return item.value === state.type; }).label);
        }
        if (state.productCategory !== 'all') labels.push(state.productCategory);
        if (state.packageType !== 'all') labels.push(state.packageType);
        if (state.query) labels.push('关键词：' + state.query);

        elements.activeFilters.innerHTML = labels.map(function (label) {
            return '<span class="support-active-filter">' + escapeHtml(displayText(label)) + '</span>';
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
            item.productCategories.forEach(function (category) { scopeTags.push(category); });
            item.packageTypes.forEach(function (packageType) { scopeTags.push(packageType); });
            if (!item.productCategories.length && item.productLine) scopeTags.push(item.productLine);
            if (item.application) scopeTags.push(item.application);

            return '<article class="download-item' + (checked ? ' is-selected' : '') +
                '" itemscope itemtype="https://schema.org/DataDownload">' +
                '<input class="download-checkbox" type="checkbox" aria-label="' + escapeAttribute((isEnglishPage() ? 'Select ' : '选择 ') + displayText(item.title)) +
                '" data-download-select="' + escapeAttribute(item.id) + '"' + (checked ? ' checked' : '') + '>' +
                '<div class="download-file-badge" aria-hidden="true">PDF</div>' +
                '<div class="download-item-copy">' +
                '<h3 class="download-item-title" itemprop="name">' + escapeHtml(item.title) + '</h3>' +
                (item.external ? '<span class="download-source-mark">现官网资料</span>' : '') +
                '<div class="download-tags">' +
                '<span class="download-tag is-type">' + escapeHtml(displayText(item.typeLabel)) + '</span>' +
                scopeTags.map(function (tag) { return '<span class="download-tag">' + escapeHtml(displayText(tag)) + '</span>'; }).join('') +
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
