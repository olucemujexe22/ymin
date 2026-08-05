var YMIN = window.YMIN || {};

YMIN.productReplacement = (function () {
    'use strict';

    var source = window.YMIN_REPLACEMENT_CROSS_REFERENCE || { meta: {}, mappings: [] };
    var catalog = window.YMIN_PRODUCT_CATALOG || { products: [] };
    var mappings = Array.isArray(source.mappings) ? source.mappings.slice() : [];
    var products = Array.isArray(catalog.products) ? catalog.products : [];
    var productByPart = Object.create(null);
    var competitorTargetCounts = Object.create(null);
    var filtered = [];
    var state = {
        search: '',
        brand: 'all',
        status: 'all',
        page: 1,
        pageSize: 50
    };

    function byId(id) {
        return document.getElementById(id);
    }

    function isEnglishPage() {
        return (YMIN.i18n && YMIN.i18n.language === 'en') ||
            new URLSearchParams(window.location.search).get('lang') === 'en';
    }

    function displayText(value) {
        return isEnglishPage() && YMIN.i18n ? YMIN.i18n.t(value) : value;
    }

    function brandDisplayName(value) {
        var name = String(value || '');
        if (!isEnglishPage()) return name;
        var brands = {
            '贵弥功（NCC）': 'Nippon Chemi-Con (NCC)', '禾伸堂（IHHEC）': 'IHHEC',
            '红宝石（Rubycon）': 'Rubycon', '基美': 'KEMET', '其他品牌': 'Other Brands',
            '三莹': 'Samyoung', '松下（Panasonic）': 'Panasonic', '威世（Vishay）': 'Vishay',
            'APAQ(钰邦)': 'APAQ', 'BERYL(绿宝石)': 'BERYL', 'KEMET (基美)': 'KEMET',
            'KEMET(基美)': 'KEMET', 'TAIYO YUDEN(太诱)': 'TAIYO YUDEN',
            '伊顿（Eaton）': 'Eaton', '尼吉康（Nichicon）': 'Nichicon'
        };
        if (brands[name]) return brands[name];
        var westernInChinese = name.match(/^[\u3400-\u9fff]+（([A-Za-z0-9 .&-]+)）$/);
        if (westernInChinese) return westernInChinese[1];
        var westernFirst = name.match(/^([A-Za-z0-9 .&-]+)\([^)]*[\u3400-\u9fff][^)]*\)$/);
        if (westernFirst) return westernFirst[1].trim();
        return /[\u3400-\u9fff]/.test(name) ? 'Other Brand' : name;
    }

    function esc(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function partKey(value) {
        var text = String(value == null ? '' : value);
        if (text.normalize) text = text.normalize('NFKC');
        return text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    function normalizeText(value) {
        var text = String(value == null ? '' : value);
        if (text.normalize) text = text.normalize('NFKC');
        return text.toLowerCase().replace(/\s+/g, ' ').trim();
    }

    function unique(values) {
        return Array.from(new Set(values.filter(Boolean)));
    }

    function mappingCompetitorKey(mapping) {
        return mapping.competitorPartKey || partKey(mapping.competitorPart);
    }

    function mappingYminKey(mapping) {
        return mapping.yminPartKey || partKey(mapping.yminPart);
    }

    function productFor(mapping) {
        return productByPart[mappingYminKey(mapping)] || null;
    }

    function brandName(mapping) {
        return mapping.competitorBrand || mapping.competitorBrandRaw || '其他品牌';
    }

    function initializeIndexes() {
        products.forEach(function (product) {
            var key = partKey(product.itemNo);
            if (key && !productByPart[key]) productByPart[key] = product;
        });
        mappings.forEach(function (mapping) {
            var key = mappingCompetitorKey(mapping);
            if (!key) return;
            if (!competitorTargetCounts[key]) competitorTargetCounts[key] = new Set();
            competitorTargetCounts[key].add(mappingYminKey(mapping));
        });
    }

    function renderStatistics() {
        var meta = source.meta || {};
        var competitorCount = Number(meta.competitorPartCount) || unique(mappings.map(mappingCompetitorKey)).length;
        var yminCount = Number(meta.yminPartCount) || unique(mappings.map(mappingYminKey)).length;
        var locale = isEnglishPage() ? 'en-US' : 'zh-CN';
        byId('replacement-competitor-count').textContent = competitorCount.toLocaleString(locale);
        byId('replacement-mapping-count').textContent = mappings.length.toLocaleString(locale);
        byId('replacement-ymin-count').textContent = yminCount.toLocaleString(locale);
    }

    function fillBrandFilter() {
        var brands = unique(mappings.map(brandName)).sort(function (a, b) { return a.localeCompare(b, 'zh-CN'); });
        byId('replacement-brand-filter').innerHTML = '<option value="all">' + (isEnglishPage() ? 'All Brands' : '全部品牌') + '</option>' + brands.map(function (brand) {
            return '<option value="' + esc(brand) + '">' + esc(brandDisplayName(brand)) + '</option>';
        }).join('');
    }

    function searchFields(mapping) {
        return normalizeText([
            brandName(mapping),
            mapping.competitorBrandRaw,
            mapping.competitorPart,
            mapping.competitorSeries,
            mapping.yminPart,
            mapping.yminDescription,
            mapping.voltage,
            mapping.capacitance,
            mapping.size
        ].filter(Boolean).join(' '));
    }

    function applyFilters() {
        var query = normalizeText(state.search);
        var queryPartKey = partKey(state.search);
        var rows = mappings.filter(function (mapping) {
            if (state.brand !== 'all' && brandName(mapping) !== state.brand) return false;
            var product = productFor(mapping);
            if (state.status === 'available' && !product) return false;
            if (state.status === 'pending' && product) return false;
            return true;
        });

        if (query) {
            var exactRows = queryPartKey ? rows.filter(function (mapping) {
                return mappingCompetitorKey(mapping) === queryPartKey || mappingYminKey(mapping) === queryPartKey;
            }) : [];
            filtered = exactRows.length ? exactRows : rows.filter(function (mapping) {
                return searchFields(mapping).indexOf(query) >= 0;
            });
        } else {
            filtered = rows;
        }

        filtered.sort(function (a, b) {
            return brandName(a).localeCompare(brandName(b), 'zh-CN') ||
                String(a.competitorPart || '').localeCompare(String(b.competitorPart || ''), 'en') ||
                String(a.yminPart || '').localeCompare(String(b.yminPart || ''), 'en');
        });
        state.page = 1;
        render();
        syncUrl();
    }

    function specText(mapping) {
        return [
            mapping.voltage ? (isEnglishPage() ? 'Voltage: ' : '电压：') + mapping.voltage : '',
            mapping.capacitance ? (isEnglishPage() ? 'Capacitance: ' : '容量：') + mapping.capacitance : '',
            mapping.size ? (isEnglishPage() ? 'Dimensions: ' : '尺寸：') + mapping.size : '',
            mapping.temperature ? (isEnglishPage() ? 'Temperature: ' : '温度：') + mapping.temperature : '',
            mapping.esr ? (isEnglishPage() ? 'ESR: ' : 'ESR：') + mapping.esr : '',
            mapping.life ? (isEnglishPage() ? 'Lifetime: ' : '寿命：') + mapping.life : ''
        ].filter(Boolean).join(' · ') || (isEnglishPage() ? 'Parameters pending' : '参数待补充');
    }

    function productDescription(mapping, product) {
        if (product) {
            return [displayText(product.category), product.series ? product.series + (isEnglishPage() ? ' Series' : ' 系列') : '', displayText(product.package)].filter(Boolean).join(' · ') || (isEnglishPage() ? 'Product Data' : '产品资料');
        }
        var description = displayText(mapping.yminDescription);
        if (isEnglishPage() && /[\u3400-\u9fff]/.test(String(description || ''))) description = '';
        return description || (isEnglishPage() ? 'Product data pending synchronization' : '产品资料待同步');
    }

    function rowHtml(mapping) {
        var product = productFor(mapping);
        var targetCount = competitorTargetCounts[mappingCompetitorKey(mapping)] ? competitorTargetCounts[mappingCompetitorKey(mapping)].size : 1;
        var countBadge = targetCount > 1 ? '<span class="replacement-count-badge">' + (isEnglishPage() ? targetCount + ' YMIN alternatives' : '对应 ' + targetCount + ' 个永铭料号') + '</span>' : '';
        var statusBadge = product
            ? '<span class="replacement-status-badge is-available">' + (isEnglishPage() ? 'Details Available' : '可查看详情') + '</span>'
            : '<span class="replacement-status-badge is-pending">' + (isEnglishPage() ? 'Data Pending' : '资料待同步') + '</span>';
        var action = product
            ? '<a class="replacement-detail-link" href="product-detail.html?pn=' + encodeURIComponent(product.itemNo || mapping.yminPart) + '">' + (isEnglishPage() ? 'View Details' : '查看详情') + '<span class="material-symbols-outlined">arrow_forward</span></a>'
            : '<span class="replacement-muted">' + (isEnglishPage() ? 'No Detail Page' : '暂无详情页') + '</span>';
        return '<tr>' +
            '<td><strong>' + esc(brandDisplayName(brandName(mapping))) + '</strong></td>' +
            '<td><div class="replacement-part">' + esc(mapping.competitorPart) + '</div>' + countBadge + '</td>' +
            '<td>' + esc(mapping.competitorSeries || '—') + '</td>' +
            '<td>' + esc(specText(mapping)) + '</td>' +
            '<td class="replacement-direction"><span class="material-symbols-outlined text-primary">arrow_forward</span></td>' +
            '<td><div class="replacement-part">' + esc(mapping.yminPart) + '</div></td>' +
            '<td><div>' + esc(productDescription(mapping, product)) + '</div>' + statusBadge + '</td>' +
            '<td>' + action + '</td>' +
        '</tr>';
    }

    function renderRows() {
        var start = (state.page - 1) * state.pageSize;
        var rows = filtered.slice(start, start + state.pageSize);
        byId('replacement-table-body').innerHTML = rows.map(rowHtml).join('');
        byId('replacement-empty').classList.toggle('hidden', filtered.length > 0);
        byId('replacement-table-body').classList.toggle('hidden', filtered.length === 0);
    }

    function paginationButton(label, page, disabled, active) {
        return '<button type="button" data-page="' + page + '"' + (disabled ? ' disabled' : '') + (active ? ' class="is-active" aria-current="page"' : '') + '>' + label + '</button>';
    }

    function renderPagination() {
        var totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
        if (state.page > totalPages) state.page = totalPages;
        if (filtered.length <= state.pageSize) {
            byId('replacement-pagination').innerHTML = '';
            return;
        }
        var parts = [paginationButton(isEnglishPage() ? 'Previous' : '上一页', state.page - 1, state.page === 1, false)];
        var start = Math.max(1, state.page - 2);
        var end = Math.min(totalPages, state.page + 2);
        if (start > 1) {
            parts.push(paginationButton('1', 1, false, state.page === 1));
            if (start > 2) parts.push('<span>…</span>');
        }
        for (var current = start; current <= end; current += 1) {
            parts.push(paginationButton(String(current), current, false, current === state.page));
        }
        if (end < totalPages) {
            if (end < totalPages - 1) parts.push('<span>…</span>');
            parts.push(paginationButton(String(totalPages), totalPages, false, state.page === totalPages));
        }
        parts.push(paginationButton(isEnglishPage() ? 'Next' : '下一页', state.page + 1, state.page === totalPages, false));
        byId('replacement-pagination').innerHTML = parts.join('');
    }

    function renderSummary() {
        var availableCount = filtered.reduce(function (count, mapping) { return count + (productFor(mapping) ? 1 : 0); }, 0);
        var locale = isEnglishPage() ? 'en-US' : 'zh-CN';
        byId('replacement-result-summary').innerHTML = isEnglishPage()
            ? '<strong>' + filtered.length.toLocaleString(locale) + '</strong> cross-reference records; ' + availableCount.toLocaleString(locale) + ' have product detail pages'
            : '共 <strong>' + filtered.length.toLocaleString(locale) + '</strong> 条替代关系，其中 ' + availableCount.toLocaleString(locale) + ' 条可查看产品详情';
        var queryBox = byId('replacement-active-query');
        queryBox.classList.toggle('hidden', !state.search);
        queryBox.innerHTML = state.search ? (isEnglishPage() ? 'Current query: ' : '当前查询：') + '<strong>' + esc(state.search) + '</strong>　<a href="#" id="replacement-query-clear">' + (isEnglishPage() ? 'Clear Query' : '清除查询') + '</a>' : '';
    }

    function render() {
        renderRows();
        renderPagination();
        renderSummary();
    }

    function syncUrl() {
        if (!window.history || !window.history.replaceState) return;
        var params = new URLSearchParams();
        if (state.search) params.set('search', state.search);
        if (state.brand !== 'all') params.set('brand', state.brand);
        params.set('lang', isEnglishPage() ? 'en' : 'zh-CN');
        var query = params.toString();
        window.history.replaceState(null, '', 'product-replacement.html' + (query ? '?' + query : ''));
    }

    function clearSearch() {
        state.search = '';
        byId('replacement-search-input').value = '';
        applyFilters();
    }

    function downloadCsv() {
        var header = isEnglishPage()
            ? ['Competitor Brand', 'Competitor Part Number', 'Competitor Series', 'Voltage', 'Capacitance', 'Dimensions', 'Temperature', 'ESR', 'Lifetime', 'YMIN Cross-reference Part Number', 'Product Detail Status']
            : ['同行品牌', '同行料号', '同行系列', '电压', '容量', '尺寸', '温度', 'ESR', '寿命', '永铭替代料号', '产品详情状态'];
        var rows = filtered.map(function (mapping) {
            return [brandDisplayName(brandName(mapping)), mapping.competitorPart, mapping.competitorSeries, mapping.voltage, mapping.capacitance, mapping.size, mapping.temperature, mapping.esr, mapping.life, mapping.yminPart, productFor(mapping) ? (isEnglishPage() ? 'Details Available' : '可查看详情') : (isEnglishPage() ? 'Product Data Pending' : '产品资料待同步')];
        });
        var csv = [header].concat(rows).map(function (row) {
            return row.map(function (cell) { return '"' + String(cell == null ? '' : cell).replace(/"/g, '""') + '"'; }).join(',');
        }).join('\r\n');
        var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = isEnglishPage() ? 'YMIN_cross_reference_results.csv' : '永铭替代料号查询结果.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function bindEvents() {
        byId('replacement-search-form').addEventListener('submit', function (event) {
            event.preventDefault();
            state.search = byId('replacement-search-input').value.trim();
            applyFilters();
        });
        byId('replacement-search-input').addEventListener('paste', function () {
            setTimeout(function () {
                state.search = byId('replacement-search-input').value.trim();
                applyFilters();
            }, 0);
        });
        byId('replacement-search-clear').addEventListener('click', clearSearch);
        byId('replacement-brand-filter').addEventListener('change', function () {
            state.brand = this.value;
            applyFilters();
        });
        byId('replacement-status-filter').addEventListener('change', function () {
            state.status = this.value;
            applyFilters();
        });
        byId('replacement-page-size').addEventListener('change', function () {
            state.pageSize = Number(this.value) || 50;
            state.page = 1;
            render();
        });
        byId('replacement-pagination').addEventListener('click', function (event) {
            var button = event.target.closest('button[data-page]');
            if (!button || button.disabled) return;
            state.page = Number(button.dataset.page) || 1;
            render();
            byId('replacement-list-title').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        byId('replacement-active-query').addEventListener('click', function (event) {
            if (event.target.id !== 'replacement-query-clear') return;
            event.preventDefault();
            clearSearch();
        });
        byId('replacement-export').addEventListener('click', downloadCsv);
    }

    function readInitialState() {
        var params = new URLSearchParams(window.location.search);
        state.search = String(params.get('search') || '').trim();
        state.brand = String(params.get('brand') || 'all');
        byId('replacement-search-input').value = state.search;
    }

    function init() {
        if (YMIN.navbar && YMIN.navbar.inject) YMIN.navbar.inject('products');
        if (YMIN.footer && YMIN.footer.inject) YMIN.footer.inject();
        initializeIndexes();
        renderStatistics();
        fillBrandFilter();
        readInitialState();
        if (state.brand !== 'all' && Array.from(byId('replacement-brand-filter').options).some(function (option) { return option.value === state.brand; })) {
            byId('replacement-brand-filter').value = state.brand;
        } else {
            state.brand = 'all';
        }
        bindEvents();
        applyFilters();
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    YMIN.productReplacement.init();
});
