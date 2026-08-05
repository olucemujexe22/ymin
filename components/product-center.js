(function () {
    'use strict';

    var catalog = window.YMIN_PRODUCT_CATALOG || { meta: {}, products: [] };
    var fieldApi = window.YMIN && YMIN.productFields ? YMIN.productFields : null;
    var supportedCategories = [
        '液态铝电解电容器',
        '高分子固态铝电解电容器',
        '高分子混合动力铝电解电容器',
        '双电层超级电容',
        '混合型超级电容（锂离子电容）',
        '叠层高分子固态铝电解电容器',
        '导电高分子钽电解电容器',
        '金属化聚丙烯薄膜电容器'
    ];
    var products = (Array.isArray(catalog.products) ? catalog.products : [])
        .filter(function (product) { return product && supportedCategories.indexOf(product.category) >= 0; })
        .map(function (product, index) {
            if (fieldApi && fieldApi.packageValue) product.package = fieldApi.packageValue(product);
            product.__compareKey = String(product.itemNo || 'product') + '::' + index;
            return product;
        });
    var replacementCatalog = window.YMIN_REPLACEMENT_CROSS_REFERENCE || { meta: {}, mappings: [] };
    var replacementMappings = Array.isArray(replacementCatalog.mappings) ? replacementCatalog.mappings : [];
    var replacementByCompetitor = {};
    var productByPartKey = {};
    var replacementMode = null;
    products.forEach(function (product) { productByPartKey[partKey(product.itemNo)] = product; });
    replacementMappings.forEach(function (mapping) {
        competitorLookupKeys(mapping).forEach(function (key) {
            replacementByCompetitor[key] = replacementByCompetitor[key] || [];
            if (replacementByCompetitor[key].indexOf(mapping) < 0) replacementByCompetitor[key].push(mapping);
        });
    });
    var filtered = products.slice();
    var page = 1;
    var pageSize = 50;
    var currentView = 'list';
    var draftPackage = '';
    var applied = null;
    var selectedCompare = [];
    var initialParams = new URLSearchParams(location.search);
    var initialCategory = initialParams.get('category') || initialParams.get('majorCategory') || '';
    var initialSeries = initialParams.get('series') || '';
    var initialStatus = initialParams.get('status') || '';
    var initialKeyword = initialParams.get('search') || initialParams.get('q') || '';
    var initialSeriesConsumed = false;
    var dimensionDefinitions = [
        { key: 'diameter', label: '直径 D' },
        { key: 'length', label: '高度 L' },
        { key: 'width', label: '宽 W' },
        { key: 'height', label: '高 H' }
    ];
    var categoryDimensions = {
        '液态铝电解电容器': ['diameter', 'length'],
        '高分子固态铝电解电容器': ['diameter', 'length'],
        '高分子混合动力铝电解电容器': ['diameter', 'length'],
        '双电层超级电容': ['diameter', 'length'],
        '混合型超级电容（锂离子电容）': ['diameter', 'length'],
        '叠层高分子固态铝电解电容器': ['length', 'width', 'height'],
        '导电高分子钽电解电容器': ['length', 'width', 'height'],
        '金属化聚丙烯薄膜电容器': ['length', 'width', 'height']
    };

    function byId(id) { return document.getElementById(id); }
    function esc(value) {
        return String(value == null ? '' : value).replace(/[&<>'"]/g, function (character) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
        });
    }
    function blank(value) { return value == null || value === ''; }
    function empty(value) { return blank(value) ? '—' : esc(value); }
    function numberFrom(value) {
        var number = parseFloat(value);
        return Number.isFinite(number) ? number : null;
    }
    function numberValue(id) {
        var element = byId(id);
        return element ? numberFrom(element.value) : null;
    }
    function unique(values) {
        return values.filter(function (value, index, list) { return value && list.indexOf(value) === index; });
    }
    function partKey(value) {
        var text = String(value || '');
        if (text.normalize) text = text.normalize('NFKC');
        return text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }
    function competitorLookupKeys(mapping) {
        var raw = String(mapping.competitorPart || '');
        if (raw.normalize) raw = raw.normalize('NFKC');
        var withoutNotes = raw.replace(/\([^)]*\)/g, '').trim();
        var withoutTrailingSize = withoutNotes.replace(/\s+\d+(?:\.\d+)?\s*[X*]\s*\d+(?:\.\d+)?$/i, '').trim();
        return unique([mapping.competitorPartKey, partKey(raw), partKey(withoutNotes), partKey(withoutTrailingSize)]);
    }
    function replacementMatches(value) {
        var key = partKey(value);
        if (!key || productByPartKey[key]) return [];
        return replacementByCompetitor[key] || [];
    }
    function formatNumber(value, decimals) {
        if (!Number.isFinite(value)) return '—';
        var precision = typeof decimals === 'number' ? decimals : (Math.abs(value) >= 100 ? 0 : Math.abs(value) >= 10 ? 2 : 4);
        return Number(value.toFixed(precision)).toLocaleString('zh-CN');
    }
    function externalAsset(value) {
        if (!value) return '';
        if (/^https?:\/\//i.test(value)) return value;
        return value.charAt(0) === '/' ? 'https://www.ymin.com' + value : value;
    }
    function seriesImage(product) {
        var library = window.YMIN_SERIES_IMAGES || {};
        var categoryImages = (library.images || {})[product.category] || {};
        return categoryImages[product.series] || '';
    }
    function selectedCategories() {
        return Array.from(document.querySelectorAll('.cat-cb:checked')).map(function (checkbox) { return checkbox.value; });
    }
    function selectedStatuses() {
        return Array.from(document.querySelectorAll('.status-cb:checked')).map(function (checkbox) { return checkbox.value; });
    }
    function selectedSeries() {
        return Array.from(document.querySelectorAll('.series-cb:checked')).map(function (checkbox) { return checkbox.value; });
    }
    function categoryGroup() {
        var selected = document.querySelector('.cat-cb:checked');
        return selected ? selected.dataset.group : '';
    }
    function isSuperCategory(category) {
        return category === '双电层超级电容' || category === '混合型超级电容（锂离子电容）';
    }
    function isFilmCategory(category) { return category === '金属化聚丙烯薄膜电容器'; }
    function isLiquidCategory(category) { return category === '液态铝电解电容器'; }
    function normalizeStatus(status) {
        var text = String(status || '');
        if (/不推荐|新项目/.test(text)) return '新项目不推荐';
        if (/新品/.test(text)) return '新品';
        return '量产品';
    }
    function canonicalCategory(category) {
        var key = String(category || '').replace(/\s+/g, '').replace(/\(/g, '（').replace(/\)/g, '）');
        return supportedCategories.find(function (name) {
            return name.replace(/\s+/g, '').replace(/\(/g, '（').replace(/\)/g, '）') === key;
        }) || '';
    }
    function resolveInitialSeriesContext() {
        initialCategory = canonicalCategory(initialCategory);
        if (!initialSeries) return;

        var candidates = products.filter(function (product) { return product.series === initialSeries; });
        if (!initialCategory || !candidates.some(function (product) { return product.category === initialCategory; })) {
            var categoryCounts = {};
            candidates.forEach(function (product) {
                categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
            });
            initialCategory = Object.keys(categoryCounts).sort(function (left, right) {
                return categoryCounts[right] - categoryCounts[left];
            })[0] || initialCategory;
        }

        var scoped = initialCategory
            ? candidates.filter(function (product) { return product.category === initialCategory; })
            : candidates;
        var availableStatuses = unique(scoped.map(function (product) { return normalizeStatus(product.status); }));
        var requestedStatus = initialStatus ? normalizeStatus(initialStatus) : '';
        initialStatus = requestedStatus && (!availableStatuses.length || availableStatuses.indexOf(requestedStatus) >= 0)
            ? requestedStatus
            : (availableStatuses.indexOf('量产品') >= 0 ? '量产品' : (availableStatuses[0] || '量产品'));
    }
    function statusClass(status) {
        if (status === '新品') return 'status-new';
        if (status === '新项目不推荐') return 'status-discouraged';
        return 'status-production';
    }
    function productScope(usePackage) {
        var categories = selectedCategories();
        return products.filter(function (product) {
            if (categories.length && categories.indexOf(product.category) < 0) return false;
            if (usePackage && draftPackage && product.package !== draftPackage) return false;
            return true;
        });
    }
    function dimensionValue(product, key) {
        if (fieldApi && fieldApi.dimensionValue) return fieldApi.dimensionValue(product, key);
        return product[key];
    }
    function dimensionLabel(key) {
        if (fieldApi && fieldApi.listDimensionLabel) return fieldApi.listDimensionLabel(selectedCategories(), draftPackage, key);
        var definition = dimensionDefinitions.find(function (item) { return item.key === key; });
        return definition ? definition.label : key;
    }
    function temperatureBounds(product) {
        if (fieldApi && fieldApi.temperatureRange) return fieldApi.temperatureRange(product, {});
        return { min: numberFrom(product.temperatureMin), max: numberFrom(product.temperatureMax) };
    }
    function scopeUnits() {
        var categories = selectedCategories();
        var esrUnits = unique(productScope(true).map(function (product) {
            return fieldApi && fieldApi.esrUnit ? fieldApi.esrUnit(product) : (isLiquidCategory(product.category) ? 'Ω' : 'mΩ');
        }));
        var esrMixed = esrUnits.length > 1;
        var esrUnit = esrMixed ? 'mΩ' : (esrUnits[0] || 'mΩ');
        return {
            capacity: categories.length && categories.every(isSuperCategory) ? 'F' : 'µF',
            ripple: categories.length && categories.every(isFilmCategory) ? 'Arms' : 'mArms',
            esr: esrUnit,
            esrMixed: esrMixed
        };
    }

    function updateCategoryLock() {
        var group = categoryGroup();
        document.querySelectorAll('.cat-cb').forEach(function (checkbox) {
            var disabled = Boolean(group && checkbox.dataset.group !== group);
            checkbox.disabled = disabled;
            checkbox.closest('.category-option').classList.toggle('is-disabled', disabled);
        });
    }

    function updateCategoryCounts() {
        var counts = {};
        products.forEach(function (product) { counts[product.category] = (counts[product.category] || 0) + 1; });
        document.querySelectorAll('[data-category-count]').forEach(function (element) {
            element.textContent = (counts[element.dataset.categoryCount] || 0).toLocaleString('zh-CN');
        });
    }

    function updatePackageOptions() {
        var holder = byId('packageOptions');
        var categories = selectedCategories();
        if (!categories.length) {
            draftPackage = '';
            holder.innerHTML = '<span class="text-[11px] text-slate-400">请先选择产品线</span>';
            byId('packageSelectedText').textContent = '全部';
            return;
        }
        var packages = unique(productScope(false).map(function (product) { return product.package; })).sort();
        if (draftPackage && packages.indexOf(draftPackage) < 0) draftPackage = '';
        if (!packages.length) {
            draftPackage = '';
            holder.innerHTML = '<span class="text-[11px] text-slate-400">当前产品线暂无封装分类</span>';
            byId('packageSelectedText').textContent = '暂无分类';
            return;
        }
        holder.innerHTML = packages.map(function (packageName) {
            return '<button class="option-chip package-chip' + (packageName === draftPackage ? ' is-active' : '') + '" type="button" data-package="' + esc(packageName) + '">' + esc(packageName) + '</button>';
        }).join('');
        byId('packageSelectedText').textContent = draftPackage || '全部';
    }

    function updateSeriesOptions() {
        var holder = byId('seriesOptions');
        var retained = selectedSeries();
        var series = unique(productScope(true).map(function (product) { return product.series; })).sort(function (a, b) { return String(a).localeCompare(String(b), 'zh-CN'); });
        if (!initialSeriesConsumed && initialSeries && series.indexOf(initialSeries) < 0) {
            series.unshift(initialSeries);
        }
        if (!series.length) {
            holder.innerHTML = '<p class="text-[11px] text-slate-400">当前条件下暂无系列</p>';
            byId('seriesSelectedText').textContent = '全部';
            return;
        }
        if (!initialSeriesConsumed && initialSeries && series.indexOf(initialSeries) >= 0) {
            retained.push(initialSeries);
            initialSeriesConsumed = true;
        }
        holder.innerHTML = series.map(function (seriesName) {
            var checked = retained.indexOf(seriesName) >= 0 ? ' checked' : '';
            return '<label class="series-option flex items-center gap-2 px-1 py-1 text-xs cursor-pointer" data-series-label="' + esc(String(seriesName).toLowerCase()) + '"><input class="series-cb" type="checkbox" value="' + esc(seriesName) + '"' + checked + '><span>' + esc(seriesName) + '</span></label>';
        }).join('');
        updateSeriesSelectedText();
        filterSeriesOptions();
    }

    function updateSeriesSelectedText() {
        var count = selectedSeries().length;
        byId('seriesSelectedText').textContent = count ? '已选 ' + count + ' 个' : '全部';
    }

    function filterSeriesOptions() {
        var keyword = String(byId('seriesSearch').value || '').trim().toLowerCase();
        document.querySelectorAll('.series-option').forEach(function (option) {
            option.classList.toggle('hidden', keyword && option.dataset.seriesLabel.indexOf(keyword) < 0);
        });
    }

    function maxFor(values, fallback) {
        var valid = values.filter(Number.isFinite);
        if (!valid.length) return fallback;
        var maximum = Math.max.apply(Math, valid);
        if (maximum <= 0) return fallback;
        var magnitude = Math.pow(10, Math.floor(Math.log10(maximum)));
        return Math.ceil(maximum / magnitude) * magnitude;
    }

    function configureRange(id, maximum, step, resetIfBlank) {
        var range = byId(id);
        if (!range) return;
        range.max = String(maximum);
        range.step = String(step);
        var pairedId = id.replace('Range', '');
        var paired = byId(pairedId);
        if (resetIfBlank && paired && paired.value === '') range.value = id.indexOf('Max') >= 0 ? String(maximum) : '0';
        if (numberFrom(range.value) > maximum) range.value = String(maximum);
    }

    function clearUnitSensitiveFields(prefix) {
        ['Min', 'Max', 'Exact'].forEach(function (suffix) {
            var field = byId(prefix + suffix);
            if (field) field.value = '';
        });
    }

    function updateUnitsAndRanges(previousUnits) {
        var units = scopeUnits();
        var source = productScope(true);
        var unitChanged = previousUnits && (
            previousUnits.capacity !== units.capacity ||
            previousUnits.ripple !== units.ripple ||
            previousUnits.esr !== units.esr
        );
        if (unitChanged) {
            if (previousUnits.capacity !== units.capacity) clearUnitSensitiveFields('capacity');
            if (previousUnits.ripple !== units.ripple) clearUnitSensitiveFields('ripple');
            if (previousUnits.esr !== units.esr) clearUnitSensitiveFields('esr');
        }

        byId('capacityUnit').textContent = units.capacity;
        byId('capacityUnitInput').textContent = units.capacity;
        byId('rippleUnit').textContent = units.ripple;
        byId('rippleUnitInput').textContent = units.ripple;
        byId('esrUnit').textContent = units.esr;
        byId('esrUnitInput').textContent = units.esr;

        var capacityValues = source.map(function (product) {
            var value = numberFrom(product.capacitanceUf);
            return units.capacity === 'F' && value != null ? value / 1000000 : value;
        });
        var rippleValues = source.map(function (product) {
            var value = numberFrom(product.rippleMilliAmp);
            return units.ripple === 'Arms' && value != null ? value / 1000 : value;
        });
        var esrValues = source.map(function (product) {
            var value = numberFrom(product.esrMilliOhm);
            return units.esr === 'Ω' && value != null ? value / 1000 : value;
        });
        var voltageValues = source.map(function (product) { return numberFrom(product.voltageNumber); });
        var lifeValues = source.map(function (product) { return numberFrom(product.lifeNumber); });

        var capacityMax = maxFor(capacityValues, units.capacity === 'F' ? 500 : 50000);
        var rippleMax = maxFor(rippleValues, units.ripple === 'Arms' ? 20 : 10000);
        var esrMax = maxFor(esrValues, units.esr === 'Ω' ? 10 : 5000);
        var voltageMax = maxFor(voltageValues, 1000);
        var lifeMax = Math.max(1000, maxFor(lifeValues, 20000));

        configureRange('capacityRangeMin', capacityMax, capacityMax <= 10 ? 0.01 : capacityMax <= 100 ? 0.1 : 1, true);
        configureRange('capacityRangeMax', capacityMax, capacityMax <= 10 ? 0.01 : capacityMax <= 100 ? 0.1 : 1, true);
        configureRange('rippleRangeMin', rippleMax, rippleMax <= 20 ? 0.01 : 1, true);
        configureRange('rippleRangeMax', rippleMax, rippleMax <= 20 ? 0.01 : 1, true);
        configureRange('esrRangeMin', esrMax, esrMax <= 20 ? 0.01 : 1, true);
        configureRange('esrRangeMax', esrMax, esrMax <= 20 ? 0.01 : 1, true);
        configureRange('voltageRangeMin', voltageMax, voltageMax <= 20 ? 0.1 : 1, true);
        configureRange('voltageRangeMax', voltageMax, voltageMax <= 20 ? 0.1 : 1, true);
        configureRange('lifeRangeMin', lifeMax, 100, true);
        configureRange('lifeRangeMax', lifeMax, 100, true);
    }

    function activeDimensionKeys() {
        var categories = selectedCategories();
        if (!categories.length) return [];
        var keys = [];
        categories.forEach(function (category) {
            var dimensions = (categoryDimensions[category] || []).slice();
            if (category === '双电层超级电容' && (draftPackage === '模组型' || !draftPackage)) {
                dimensions = ['diameter', 'length', 'height'];
            }
            dimensions.forEach(function (key) { if (keys.indexOf(key) < 0) keys.push(key); });
        });
        return dimensionDefinitions.map(function (definition) { return definition.key; }).filter(function (key) { return keys.indexOf(key) >= 0; });
    }

    function renderDimensionFilters(retainValues) {
        var values = retainValues || {};
        var keys = activeDimensionKeys();
        var holder = byId('dimensionRows');
        byId('dimensionHint').textContent = selectedCategories().length
            ? '当前显示：' + keys.map(dimensionLabel).join('、')
            : '请先选择电容器类别，尺寸字段将按事业部确认规则显示。';
        holder.innerHTML = keys.map(function (key) {
            var minimum = values[key + 'Min'] == null ? '' : values[key + 'Min'];
            var maximum = values[key + 'Max'] == null ? '' : values[key + 'Max'];
            return '<div class="dimension-card" data-dimension="' + key + '">' +
                '<div class="mb-2 flex items-center justify-between"><span class="text-[11px] font-bold text-slate-600">' + esc(dimensionLabel(key)) + '</span><span class="text-[10px] text-slate-400">mm</span></div>' +
                '<div class="range-values"><input id="' + key + 'Min" class="filter-input" type="number" min="0" step="any" value="' + esc(minimum) + '" placeholder="最小"><span class="text-center text-slate-400">–</span><input id="' + key + 'Max" class="filter-input" type="number" min="0" step="any" value="' + esc(maximum) + '" placeholder="最大"><span class="text-[10px] text-slate-500">mm</span></div>' +
            '</div>';
        }).join('');
        holder.querySelectorAll('input').forEach(function (input) { input.addEventListener('input', updateDraftCount); });
    }

    function captureDimensionDraft() {
        var result = {};
        dimensionDefinitions.forEach(function (definition) {
            var min = byId(definition.key + 'Min');
            var max = byId(definition.key + 'Max');
            if (min && min.value !== '') result[definition.key + 'Min'] = min.value;
            if (max && max.value !== '') result[definition.key + 'Max'] = max.value;
        });
        return result;
    }

    function wirePairRange(prefix) {
        var rangeMin = byId(prefix + 'RangeMin');
        var rangeMax = byId(prefix + 'RangeMax');
        var inputMin = byId(prefix + 'Min');
        var inputMax = byId(prefix + 'Max');
        if (!rangeMin || !rangeMax || !inputMin || !inputMax) return;
        rangeMin.addEventListener('input', function () {
            if (numberFrom(rangeMin.value) > numberFrom(rangeMax.value)) rangeMax.value = rangeMin.value;
            inputMin.value = rangeMin.value;
            if (numberFrom(inputMax.value) != null && numberFrom(inputMax.value) < numberFrom(inputMin.value)) inputMax.value = inputMin.value;
            updateDraftCount();
        });
        rangeMax.addEventListener('input', function () {
            if (numberFrom(rangeMax.value) < numberFrom(rangeMin.value)) rangeMin.value = rangeMax.value;
            inputMax.value = rangeMax.value;
            if (numberFrom(inputMin.value) != null && numberFrom(inputMin.value) > numberFrom(inputMax.value)) inputMin.value = inputMax.value;
            updateDraftCount();
        });
        inputMin.addEventListener('input', function () {
            var value = numberFrom(inputMin.value);
            if (value != null) rangeMin.value = String(value);
            updateDraftCount();
        });
        inputMax.addEventListener('input', function () {
            var value = numberFrom(inputMax.value);
            if (value != null) rangeMax.value = String(value);
            updateDraftCount();
        });
    }

    function wireSingleRange(prefix, type) {
        var range = byId(prefix + 'Range' + type);
        var input = byId(prefix + type);
        if (!range || !input) return;
        range.addEventListener('input', function () {
            input.value = range.value;
            updateDraftCount();
        });
        input.addEventListener('input', function () {
            var value = numberFrom(input.value);
            if (value != null) range.value = String(value);
            updateDraftCount();
        });
    }

    function wireExactButton(button) {
        button.addEventListener('click', function () {
            var prefix = button.dataset.exactButton;
            var exact = numberValue(prefix + 'Exact');
            if (exact == null) return;
            var min = byId(prefix + 'Min');
            var max = byId(prefix + 'Max');
            if (min) min.value = exact;
            if (max) max.value = exact;
            var rangeMin = byId(prefix + 'RangeMin');
            var rangeMax = byId(prefix + 'RangeMax');
            if (rangeMin) rangeMin.value = exact;
            if (rangeMax) rangeMax.value = exact;
            updateDraftCount();
        });
    }

    function updateDependentControls() {
        var previousUnits = {
            capacity: byId('capacityUnit').textContent,
            ripple: byId('rippleUnit').textContent,
            esr: byId('esrUnit').textContent
        };
        var dimensions = captureDimensionDraft();
        updateCategoryLock();
        updatePackageOptions();
        updateSeriesOptions();
        updateUnitsAndRanges(previousUnits);
        renderDimensionFilters(dimensions);
        updateDraftCount();
    }

    function validateDraft() {
        var error = '';
        var pairs = [
            ['voltageMin', 'voltageMax', '额定电压'],
            ['capacityMin', 'capacityMax', '标称容量'],
            ['lifeMin', 'lifeMax', '寿命'],
            ['rippleMin', 'rippleMax', '额定纹波电流'],
            ['esrMin', 'esrMax', 'ESR / 阻抗']
        ];
        activeDimensionKeys().forEach(function (key) {
            pairs.push([key + 'Min', key + 'Max', dimensionLabel(key)]);
        });
        pairs.some(function (pair) {
            var min = numberValue(pair[0]);
            var max = numberValue(pair[1]);
            if (min != null && max != null && min > max) {
                error = pair[2] + '的最小值不能大于最大值。';
                return true;
            }
            return false;
        });
        var errorElement = byId('filterError');
        errorElement.textContent = error;
        errorElement.classList.toggle('hidden', !error);
        return !error;
    }

    function captureFilters() {
        var units = scopeUnits();
        var capacityFactor = units.capacity === 'F' ? 1000000 : 1;
        var rippleFactor = units.ripple === 'Arms' ? 1000 : 1;
        var esrFactor = units.esr === 'Ω' ? 1000 : 1;
        var dimensions = {};
        activeDimensionKeys().forEach(function (key) {
            dimensions[key] = { min: numberValue(key + 'Min'), max: numberValue(key + 'Max') };
        });
        return {
            keywordRaw: String(byId('keywordFilter').value || '').trim(),
            keyword: String(byId('keywordFilter').value || '').trim().toLowerCase(),
            categories: selectedCategories(),
            packageName: draftPackage,
            series: selectedSeries(),
            statuses: selectedStatuses(),
            voltageMin: numberValue('voltageMin'),
            voltageMax: numberValue('voltageMax'),
            capacityMin: numberValue('capacityMin') == null ? null : numberValue('capacityMin') * capacityFactor,
            capacityMax: numberValue('capacityMax') == null ? null : numberValue('capacityMax') * capacityFactor,
            temperatureMin: numberValue('temperatureMinFilter'),
            temperatureMax: numberValue('temperatureMaxFilter'),
            lifeMin: numberValue('lifeMin'),
            lifeMax: numberValue('lifeMax'),
            rippleMin: numberValue('rippleMin') == null ? null : numberValue('rippleMin') * rippleFactor,
            rippleMax: numberValue('rippleMax') == null ? null : numberValue('rippleMax') * rippleFactor,
            esrMin: numberValue('esrMin') == null ? null : numberValue('esrMin') * esrFactor,
            esrMax: numberValue('esrMax') == null ? null : numberValue('esrMax') * esrFactor,
            dimensions: dimensions,
            aec: byId('aecFilter').checked,
            rohs: byId('rohsFilter').checked,
            cad: byId('cadFilter').checked,
            units: units
        };
    }

    function matchesNumber(value, min, max) {
        var number = numberFrom(value);
        if (min == null && max == null) return true;
        if (number == null) return false;
        if (min != null && number < min) return false;
        if (max != null && number > max) return false;
        return true;
    }

    function applyFilters() {
        if (!validateDraft()) return;
        applied = captureFilters();
        var mappedReplacements = replacementMatches(applied.keywordRaw);
        if (mappedReplacements.length) {
            replacementMode = { query: applied.keywordRaw, mappings: mappedReplacements.slice() };
            var replacementOrder = {};
            mappedReplacements.forEach(function (mapping, index) {
                var key = mapping.yminPartKey || partKey(mapping.yminPart);
                if (replacementOrder[key] == null) replacementOrder[key] = index;
            });
            filtered = unique(mappedReplacements.map(function (mapping) {
                return productByPartKey[mapping.yminPartKey || partKey(mapping.yminPart)];
            }).filter(Boolean)).sort(function (left, right) {
                return replacementOrder[partKey(left.itemNo)] - replacementOrder[partKey(right.itemNo)];
            });
            page = 1;
            renderAll();
            return;
        }
        replacementMode = null;
        filtered = products.filter(function (product) {
            if (applied.keyword) {
                var haystack = [product.itemNo, product.series, product.category, product.package].join(' ').toLowerCase();
                if (haystack.indexOf(applied.keyword) < 0) return false;
            }
            if (applied.categories.length && applied.categories.indexOf(product.category) < 0) return false;
            if (applied.packageName && product.package !== applied.packageName) return false;
            if (applied.series.length && applied.series.indexOf(product.series) < 0) return false;
            if (applied.statuses.length && applied.statuses.indexOf(normalizeStatus(product.status)) < 0) return false;
            if (!matchesNumber(product.voltageNumber, applied.voltageMin, applied.voltageMax)) return false;
            if (!matchesNumber(product.capacitanceUf, applied.capacityMin, applied.capacityMax)) return false;
            var temperature = temperatureBounds(product);
            if (applied.temperatureMin != null && (temperature.min == null || temperature.min > applied.temperatureMin)) return false;
            if (applied.temperatureMax != null && (temperature.max == null || temperature.max < applied.temperatureMax)) return false;
            if (!matchesNumber(product.lifeNumber, applied.lifeMin, applied.lifeMax)) return false;
            if (!matchesNumber(product.rippleMilliAmp, applied.rippleMin, applied.rippleMax)) return false;
            if (!matchesNumber(product.esrMilliOhm, applied.esrMin, applied.esrMax)) return false;
            var dimensionMismatch = Object.keys(applied.dimensions).some(function (key) {
                var range = applied.dimensions[key];
                return !matchesNumber(dimensionValue(product, key), range.min, range.max);
            });
            if (dimensionMismatch) return false;
            if (applied.aec && !productAec(product)) return false;
            if (applied.rohs && !String(product.rohs || '').trim()) return false;
            if (applied.cad && !(numberFrom(product.cadCandidateCount) > 0)) return false;
            return true;
        });
        sortFiltered();
        page = 1;
        renderAll();
    }

    function sortFiltered() {
        var mode = byId('sortProducts').value;
        if (mode === 'default') return;
        var key = mode === 'voltageAsc' ? 'voltageNumber' : mode === 'capacityAsc' ? 'capacitanceUf' : 'lifeNumber';
        var direction = mode === 'lifeDesc' ? -1 : 1;
        filtered.sort(function (left, right) {
            var a = numberFrom(left[key]);
            var b = numberFrom(right[key]);
            if (a == null && b == null) return 0;
            if (a == null) return 1;
            if (b == null) return -1;
            return (a - b) * direction;
        });
    }

    function visibleDimensionKeys() {
        if (applied && applied.categories.length) {
            var keys = [];
            applied.categories.forEach(function (category) {
                var dimensions = (categoryDimensions[category] || []).slice();
                if (category === '双电层超级电容' && (applied.packageName === '模组型' || !applied.packageName)) dimensions = ['diameter', 'length', 'height'];
                dimensions.forEach(function (key) { if (keys.indexOf(key) < 0) keys.push(key); });
            });
            return keys;
        }
        return ['diameter', 'length', 'width', 'height'];
    }

    function updateDimensionColumns() {
        var visible = visibleDimensionKeys();
        document.querySelectorAll('[data-dimension-column]').forEach(function (cell) {
            cell.classList.toggle('hidden', visible.indexOf(cell.dataset.dimensionColumn) < 0);
        });
        document.querySelectorAll('[data-result-dimension]').forEach(function (cell) {
            cell.classList.toggle('hidden', visible.indexOf(cell.dataset.resultDimension) < 0);
        });
        document.querySelectorAll('[data-dimension-label]').forEach(function (label) {
            label.textContent = dimensionLabel(label.dataset.dimensionLabel);
        });
    }

    function productCapacity(product) {
        var value = numberFrom(product.capacitanceUf);
        if (isSuperCategory(product.category) && value != null) return formatNumber(value / 1000000) + ' F';
        if (value != null) return formatNumber(value) + ' µF';
        return empty(product.capacitance);
    }
    function productRipple(product) {
        var value = numberFrom(product.rippleMilliAmp);
        if (isFilmCategory(product.category) && value != null) return formatNumber(value / 1000) + ' Arms';
        if (value != null) return formatNumber(value) + ' mArms';
        return empty(product.ripple);
    }
    function productEsr(product) {
        var value = numberFrom(product.esrMilliOhm);
        var units = applied && applied.units ? applied.units : scopeUnits();
        var unit = units.esrMixed && fieldApi && fieldApi.esrUnit ? fieldApi.esrUnit(product) : units.esr;
        if (unit === 'Ω' && value != null) return formatNumber(value / 1000) + ' Ω';
        if (value != null) return formatNumber(value) + ' mΩ';
        return empty(product.esr);
    }
    function productVoltage(product) {
        var value = numberFrom(product.voltageNumber);
        return value != null ? formatNumber(value) + ' V' : empty(product.voltage);
    }
    function productAec(product) {
        return fieldApi && fieldApi.aecValue ? fieldApi.aecValue(product, {}) : product.certification;
    }
    function productLife(product) {
        var value = numberFrom(product.lifeNumber);
        return value != null ? formatNumber(value, 0) : empty(product.life);
    }
    function productTemperature(product) {
        var range = temperatureBounds(product);
        if (range.min != null && range.max != null) return esc(formatNumber(range.min)) + '～' + esc(formatNumber(range.max));
        return empty(product.temperature);
    }
    function productImage(product, large) {
        var imageUrl = externalAsset(product.image || seriesImage(product));
        var sizeClass = large ? 'w-24 h-24' : '';
        if (imageUrl) {
            return '<span class="product-thumb ' + sizeClass + '"><img src="' + esc(imageUrl) + '" alt="' + esc(product.itemNo || '产品图片') + '" loading="lazy"></span>';
        }
        return '<span class="product-thumb ' + sizeClass + '" title="产品图片待关联"><span class="material-symbols-outlined text-2xl">inventory_2</span></span>';
    }
    function productDetailUrl(product) {
        return 'product-detail.html?pn=' + encodeURIComponent(product.itemNo || '');
    }
    function cadLink(product) {
        var hasCad = numberFrom(product.cadCandidateCount) > 0;
        var href = hasCad
            ? 'design-3d-cad.html?item=' + encodeURIComponent(product.itemNo || '')
            : 'design-3d-cad-request.html?item=' + encodeURIComponent(product.itemNo || '');
        return '<a class="inline-flex items-center gap-1 font-semibold text-primary hover:underline" href="' + href + '"><span class="material-symbols-outlined text-base">' + (hasCad ? 'view_in_ar' : 'assignment') + '</span>' + (hasCad ? '查看' : '申请') + '</a>';
    }

    function renderRows(pageProducts) {
        var holder = byId('productRows');
        if (!pageProducts.length) {
            var emptyText = replacementMode
                ? '已找到替代关系，但对应永铭料号的产品详情资料尚未同步。'
                : '没有找到符合当前条件的产品，请调整筛选条件。';
            holder.innerHTML = '<tr><td class="p-12 text-center text-slate-400" colspan="21"><span class="material-symbols-outlined mb-2 block text-4xl">search_off</span>' + emptyText + '</td></tr>';
            return;
        }
        holder.innerHTML = pageProducts.map(function (product, index) {
            var checked = selectedCompare.indexOf(product.__compareKey) >= 0;
            var pdfUrl = externalAsset(product.datasheet);
            var pdf = pdfUrl ? '<a class="text-red-600 hover:text-red-700" href="' + esc(pdfUrl) + '" target="_blank" rel="noopener" title="查看系列规格书"><span class="material-symbols-outlined text-xl">picture_as_pdf</span></a>' : '—';
            var certification = productAec(product);
            var status = normalizeStatus(product.status);
            var rowClass = checked ? 'compare-highlight' : (index % 2 ? 'bg-slate-50/35' : '');
            return '<tr class="' + rowClass + ' hover:bg-slate-50" data-product-row="' + esc(product.__compareKey) + '">' +
                '<td class="px-2.5 py-3 text-center"><input class="compare-checkbox" type="checkbox" data-compare-key="' + esc(product.__compareKey) + '"' + (checked ? ' checked' : '') + ' aria-label="选择 ' + esc(product.itemNo) + ' 进行对比"></td>' +
                '<td class="p-2">' + productImage(product, false) + '</td>' +
                '<td class="min-w-28 px-2.5 py-3">' + empty(product.category) + '</td>' +
                '<td class="px-2.5 py-3 font-semibold">' + empty(product.series) + '</td>' +
                '<td class="px-2.5 py-3"><span class="status-badge ' + statusClass(status) + '">' + status + '</span></td>' +
                '<td class="px-2.5 py-3 font-bold"><a class="text-primary hover:underline" href="' + productDetailUrl(product) + '">' + empty(product.itemNo) + '</a></td>' +
                '<td class="px-2.5 py-3">' + empty(product.package) + '</td>' +
                '<td class="px-2.5 py-3">' + productTemperature(product) + '</td>' +
                '<td class="px-2.5 py-3 font-semibold">' + productVoltage(product) + '</td>' +
                '<td class="px-2.5 py-3 font-semibold">' + productCapacity(product) + '</td>' +
                '<td class="px-2.5 py-3" data-result-dimension="diameter">' + empty(dimensionValue(product, 'diameter')) + '</td>' +
                '<td class="px-2.5 py-3" data-result-dimension="length">' + empty(dimensionValue(product, 'length')) + '</td>' +
                '<td class="px-2.5 py-3" data-result-dimension="width">' + empty(dimensionValue(product, 'width')) + '</td>' +
                '<td class="px-2.5 py-3" data-result-dimension="height">' + empty(dimensionValue(product, 'height')) + '</td>' +
                '<td class="px-2.5 py-3">' + empty(product.leakage) + '</td>' +
                '<td class="min-w-28 px-2.5 py-3">' + productRipple(product) + '</td>' +
                '<td class="min-w-28 px-2.5 py-3">' + productEsr(product) + '</td>' +
                '<td class="px-2.5 py-3">' + productLife(product) + '</td>' +
                '<td class="product-certification-column px-2 py-3">' + (certification ? esc(certification) : '—') + '</td>' +
                '<td class="px-2.5 py-3 text-center">' + pdf + '</td>' +
                '<td class="px-2.5 py-3 text-center">' + cadLink(product) + '</td>' +
            '</tr>';
        }).join('');
    }

    function renderGrid(pageProducts) {
        var holder = byId('gridResults');
        if (!pageProducts.length) {
            holder.innerHTML = '<div class="col-span-full border border-slate-200 bg-white p-12 text-center text-slate-400">' + (replacementMode ? '替代料号已找到，对应产品详情资料尚未同步。' : '没有找到符合当前条件的产品。') + '</div>';
            return;
        }
        holder.innerHTML = pageProducts.map(function (product) {
            var checked = selectedCompare.indexOf(product.__compareKey) >= 0;
            var status = normalizeStatus(product.status);
            return '<article class="grid-product-card ' + (checked ? 'compare-highlight' : '') + '">' +
                '<div class="flex items-start gap-4">' +
                    productImage(product, true) +
                    '<div class="min-w-0 flex-1">' +
                        '<div class="flex items-start justify-between gap-3"><span class="status-badge ' + statusClass(status) + '">' + status + '</span><label class="flex items-center gap-1 text-[10px] text-slate-500 cursor-pointer"><input class="compare-checkbox" type="checkbox" data-compare-key="' + esc(product.__compareKey) + '"' + (checked ? ' checked' : '') + '>对比</label></div>' +
                        '<p class="mt-3 text-[11px] text-slate-500">' + empty(product.category) + '</p>' +
                        '<h3 class="mt-1 truncate text-base font-bold text-primary"><a class="hover:underline" href="' + productDetailUrl(product) + '">' + empty(product.itemNo) + '</a></h3>' +
                        '<p class="mt-1 text-xs text-slate-500">' + empty(product.series) + ' · ' + empty(product.package) + '</p>' +
                    '</div>' +
                '</div>' +
                '<dl class="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-100 pt-4 text-xs">' +
                    '<div><dt class="text-[10px] text-slate-400">额定电压</dt><dd class="mt-1 font-semibold">' + productVoltage(product) + '</dd></div>' +
                    '<div><dt class="text-[10px] text-slate-400">标称容量</dt><dd class="mt-1 font-semibold">' + productCapacity(product) + '</dd></div>' +
                    '<div><dt class="text-[10px] text-slate-400">寿命</dt><dd class="mt-1">' + productLife(product) + ' hrs</dd></div>' +
                    '<div><dt class="text-[10px] text-slate-400">温度范围</dt><dd class="mt-1">' + productTemperature(product) + ' ℃</dd></div>' +
                '</dl>' +
                '<div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"><a class="text-xs font-bold text-primary hover:underline" href="' + productDetailUrl(product) + '">查看详情</a>' + cadLink(product) + '</div>' +
            '</article>';
        }).join('');
    }

    function renderPagination() {
        var holder = byId('pagination');
        var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (pages <= 1) {
            holder.innerHTML = '';
            return;
        }
        var start = Math.max(1, page - 2);
        var end = Math.min(pages, start + 4);
        start = Math.max(1, end - 4);
        var html = '<button class="page-button border border-slate-200 bg-white px-3 py-2 text-xs disabled:opacity-40" data-page="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + '>上一页</button>';
        if (start > 1) html += '<button class="page-button border border-slate-200 bg-white px-3 py-2 text-xs" data-page="1">1</button><span class="text-slate-400">…</span>';
        for (var number = start; number <= end; number += 1) {
            html += '<button class="page-button border px-3 py-2 text-xs ' + (number === page ? 'border-primary bg-primary text-white' : 'border-slate-200 bg-white') + '" data-page="' + number + '">' + number + '</button>';
        }
        if (end < pages) html += '<span class="text-slate-400">…</span><button class="page-button border border-slate-200 bg-white px-3 py-2 text-xs" data-page="' + pages + '">' + pages + '</button>';
        html += '<button class="page-button border border-slate-200 bg-white px-3 py-2 text-xs disabled:opacity-40" data-page="' + (page + 1) + '"' + (page === pages ? ' disabled' : '') + '>下一页</button>';
        holder.innerHTML = html;
    }

    function renderChips() {
        if (!applied) return;
        if (replacementMode) {
            byId('filterChips').innerHTML = '<span class="border border-primary/15 bg-white px-2 py-1 text-[10px] text-primary">同行料号：' + esc(replacementMode.query) + '</span>';
            return;
        }
        var chips = [];
        applied.categories.forEach(function (value) { chips.push(value); });
        if (applied.packageName) chips.push('封装：' + applied.packageName);
        applied.series.forEach(function (value) { chips.push('系列：' + value); });
        applied.statuses.forEach(function (value) { chips.push(value); });
        if (applied.voltageMin != null || applied.voltageMax != null) chips.push('电压：' + (applied.voltageMin == null ? '不限' : applied.voltageMin) + '–' + (applied.voltageMax == null ? '不限' : applied.voltageMax) + ' V');
        if (applied.capacityMin != null || applied.capacityMax != null) {
            var factor = applied.units.capacity === 'F' ? 1000000 : 1;
            chips.push('容量：' + (applied.capacityMin == null ? '不限' : formatNumber(applied.capacityMin / factor)) + '–' + (applied.capacityMax == null ? '不限' : formatNumber(applied.capacityMax / factor)) + ' ' + applied.units.capacity);
        }
        if (applied.lifeMin != null || applied.lifeMax != null) chips.push('寿命：' + (applied.lifeMin == null ? '不限' : formatNumber(applied.lifeMin, 0)) + '–' + (applied.lifeMax == null ? '不限' : formatNumber(applied.lifeMax, 0)) + ' hrs');
        if (applied.rippleMin != null || applied.rippleMax != null) {
            var rippleFactor = applied.units.ripple === 'Arms' ? 1000 : 1;
            chips.push('纹波：' + (applied.rippleMin == null ? '不限' : formatNumber(applied.rippleMin / rippleFactor)) + '–' + (applied.rippleMax == null ? '不限' : formatNumber(applied.rippleMax / rippleFactor)) + ' ' + applied.units.ripple);
        }
        if (applied.esrMin != null || applied.esrMax != null) {
            var esrFactor = applied.units.esr === 'Ω' ? 1000 : 1;
            chips.push('ESR：' + (applied.esrMin == null ? '不限' : formatNumber(applied.esrMin / esrFactor)) + '–' + (applied.esrMax == null ? '不限' : formatNumber(applied.esrMax / esrFactor)) + ' ' + applied.units.esr);
        }
        if (applied.aec) chips.push('AEC-Q200');
        if (applied.rohs) chips.push('RoHS');
        if (applied.cad) chips.push('有 3D-CAD');
        byId('filterChips').innerHTML = chips.map(function (chip) { return '<span class="border border-primary/15 bg-white px-2 py-1 text-[10px] text-primary">' + esc(chip) + '</span>'; }).join('');
    }

    function renderReplacementSummary() {
        var holder = byId('replacementSummary');
        if (!replacementMode) {
            holder.classList.add('hidden');
            holder.innerHTML = '';
            return;
        }
        var mappings = replacementMode.mappings;
        var targetKeys = unique(mappings.map(function (mapping) { return mapping.yminPartKey || partKey(mapping.yminPart); }));
        var availableCount = targetKeys.filter(function (key) { return !!productByPartKey[key]; }).length;
        var source = mappings[0] || {};
        var cards = mappings.map(function (mapping) {
            var product = productByPartKey[mapping.yminPartKey || partKey(mapping.yminPart)];
            var specs = product
                ? [product.category, product.series ? product.series + ' 系列' : '', product.voltage, product.capacitance, product.size].filter(Boolean).join(' · ')
                : (mapping.yminDescription || '产品资料待同步');
            var action = product
                ? '<a class="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline" href="' + productDetailUrl(product) + '">查看产品详情<span class="material-symbols-outlined text-base">arrow_forward</span></a>'
                : '<span class="inline-flex items-center gap-1 text-xs font-medium text-slate-400"><span class="material-symbols-outlined text-base">sync_problem</span>产品资料待同步</span>';
            return '<article class="border border-slate-200 bg-white p-5"><div class="flex flex-wrap items-start justify-between gap-3"><div><p class="text-[10px] font-bold text-slate-500">' + esc(mapping.competitorBrand || mapping.competitorBrandRaw || '同行品牌') + '</p><p class="mt-1 break-all font-mono text-sm text-slate-700">' + esc(mapping.competitorPart) + '</p></div><span class="bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700">' + esc(mapping.matchType || '对应关系') + '</span></div><div class="my-4 flex items-center gap-3 text-primary"><span class="material-symbols-outlined">arrow_downward</span><span class="text-[10px] font-bold tracking-wider">永铭替代料号</span></div><p class="break-all font-mono text-lg font-bold text-primary">' + esc(mapping.yminPart) + '</p><p class="mt-2 text-xs leading-5 text-slate-500">' + esc(specs) + '</p><div class="mt-4 border-t border-slate-100 pt-3">' + action + '</div></article>';
        }).join('');
        holder.classList.remove('hidden');
        holder.innerHTML = '<div class="border-l-4 border-primary bg-primary/[0.04] p-5"><div class="flex flex-wrap items-start justify-between gap-4"><div><div class="flex items-center gap-2"><span class="material-symbols-outlined text-primary">compare_arrows</span><h2 class="text-xl font-bold text-primary">已找到 ' + targetKeys.length + ' 个永铭替代料号</h2></div><p class="mt-2 text-xs text-slate-600">查询：' + esc(source.competitorBrand || source.competitorBrandRaw || '同行品牌') + ' · <span class="font-mono font-bold">' + esc(replacementMode.query) + '</span></p></div><div class="text-right text-[10px] leading-5 text-slate-500"><p>' + availableCount + ' 个可查看产品详情</p><p>' + (targetKeys.length - availableCount) + ' 个产品资料待同步</p></div></div><div class="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-2">' + cards + '</div><p class="mt-4 flex items-start gap-2 text-[11px] leading-5 text-amber-800"><span class="material-symbols-outlined mt-0.5 text-sm">info</span>替代关系来自永铭替代国际品牌数据表；PIN TO PIN 不代表所有电气指标完全等效，批量替换前请核对完整规格并完成工程验证。</p></div>';
    }

    function renderAll() {
        var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
        if (page > pages) page = pages;
        var pageProducts = filtered.slice((page - 1) * pageSize, page * pageSize);
        byId('resultCount').textContent = (replacementMode ? unique(replacementMode.mappings.map(function (mapping) { return mapping.yminPartKey || partKey(mapping.yminPart); })).length : filtered.length).toLocaleString('zh-CN');
        byId('capacityColumn').textContent = applied && applied.units.capacity === 'F' ? '标称容量 (F)' : '标称容量';
        byId('rippleColumn').innerHTML = '<span class="block">额定纹波电流</span><span class="block text-[9px] font-medium">(' + esc(applied ? applied.units.ripple : 'mArms') + ')</span>';
        byId('esrColumn').textContent = applied && applied.units.esrMixed ? 'ESR / 阻抗（单位按封装）' : (applied ? 'ESR / 阻抗 (' + applied.units.esr + ')' : 'ESR / 阻抗');
        renderRows(pageProducts);
        renderGrid(pageProducts);
        renderReplacementSummary();
        renderPagination();
        renderChips();
        updateDimensionColumns();
        renderCompareBar();
    }

    function findProduct(key) {
        return products.find(function (product) { return product.__compareKey === key; });
    }

    function toggleCompare(key, checked) {
        var index = selectedCompare.indexOf(key);
        if (checked && index < 0) {
            if (selectedCompare.length >= 4) {
                alert('最多可同时对比 4 个产品。');
                document.querySelectorAll('.compare-checkbox[data-compare-key="' + CSS.escape(key) + '"]').forEach(function (checkbox) { checkbox.checked = false; });
                return;
            }
            selectedCompare.push(key);
        } else if (!checked && index >= 0) {
            selectedCompare.splice(index, 1);
        }
        renderAll();
    }

    function renderCompareBar() {
        var bar = byId('compareBar');
        bar.classList.toggle('hidden', !selectedCompare.length);
        byId('compareItems').innerHTML = selectedCompare.map(function (key) {
            var product = findProduct(key);
            if (!product) return '';
            return '<span class="inline-flex flex-shrink-0 items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-[11px]"><strong class="text-primary">' + esc(product.itemNo) + '</strong><button class="remove-compare text-slate-400 hover:text-red-600" type="button" data-remove-key="' + esc(key) + '" aria-label="移除"><span class="material-symbols-outlined text-sm">close</span></button></span>';
        }).join('');
        byId('openCompare').disabled = selectedCompare.length < 2;
        byId('openCompare').classList.toggle('opacity-40', selectedCompare.length < 2);
    }

    function compareRows() {
        var rows = [
            ['产品线', function (product) { return product.category; }],
            ['系列', function (product) { return product.series; }],
            ['全生命周期状态', function (product) { return normalizeStatus(product.status); }],
            ['封装形式', function (product) { return product.package; }],
            ['额定电压', productVoltage],
            ['标称容量', productCapacity],
            ['工作温度', function (product) { return productTemperature(product) + ' ℃'; }],
            ['寿命', function (product) { return productLife(product) + ' hrs'; }],
            ['ESR / 阻抗', productEsr],
            ['额定纹波电流', productRipple],
            ['漏电流', function (product) { return product.leakage; }]
        ];
        activeDimensionKeys().forEach(function (key) {
            rows.push([dimensionLabel(key), function (product) {
                var value = dimensionValue(product, key);
                return blank(value) ? '' : value + ' mm';
            }]);
        });
        return rows.concat([
            ['AEC-Q200', productAec],
            ['RoHS指令', function (product) { return product.rohs; }],
            ['系列规格书', function (product) { return product.datasheet ? '有' : '—'; }],
            ['3D-CAD', function (product) { return numberFrom(product.cadCandidateCount) > 0 ? '有' : '可申请'; }]
        ]);
    }

    function openCompareModal() {
        var compareProducts = selectedCompare.map(findProduct).filter(Boolean);
        if (compareProducts.length < 2) return;
        var rows = compareRows();
        var head = '<thead><tr class="bg-primary text-white"><th class="sticky left-0 z-10 min-w-36 bg-primary p-4 text-left text-xs">参数</th>' + compareProducts.map(function (product) {
            return '<th class="min-w-64 p-4 text-left">' +
                '<div class="flex items-center gap-3">' + productImage(product, true) + '<div><p class="text-[10px] font-normal text-white/70">' + empty(product.series) + '</p><a class="mt-1 block text-sm font-bold hover:underline" href="' + productDetailUrl(product) + '">' + empty(product.itemNo) + '</a></div></div>' +
            '</th>';
        }).join('') + '</tr></thead>';
        var body = '<tbody>' + rows.map(function (row, rowIndex) {
            var values = compareProducts.map(function (product) { return String(row[1](product) || '—'); });
            var comparable = unique(values.filter(function (value) { return value !== '—'; }));
            var different = comparable.length > 1;
            return '<tr class="' + (rowIndex % 2 ? 'bg-slate-50' : 'bg-white') + '"><th class="sticky left-0 z-10 border-t border-slate-200 ' + (rowIndex % 2 ? 'bg-slate-50' : 'bg-white') + ' p-4 text-left text-xs font-bold text-slate-600">' + row[0] + '</th>' +
                values.map(function (value) { return '<td class="border-t border-slate-200 p-4 text-xs ' + (different ? 'compare-diff' : '') + '">' + esc(value) + '</td>'; }).join('') +
            '</tr>';
        }).join('') + '</tbody>';
        byId('compareContent').innerHTML = '<table class="w-full border-collapse">' + head + body + '</table>';
        byId('compareModal').classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }

    function updateDraftCount() {
        var count = 0;
        if (byId('keywordFilter').value.trim()) count += 1;
        count += selectedCategories().length + selectedSeries().length + selectedStatuses().length;
        if (draftPackage) count += 1;
        ['voltageMin', 'voltageMax', 'capacityMin', 'capacityMax', 'lifeMin', 'lifeMax', 'rippleMin', 'rippleMax', 'esrMin', 'esrMax', 'temperatureMinFilter', 'temperatureMaxFilter'].forEach(function (id) {
            var field = byId(id);
            if (field && field.value !== '') count += 1;
        });
        activeDimensionKeys().forEach(function (key) {
            if ((byId(key + 'Min') && byId(key + 'Min').value !== '') || (byId(key + 'Max') && byId(key + 'Max').value !== '')) count += 1;
        });
        ['aecFilter', 'rohsFilter', 'cadFilter'].forEach(function (id) { if (byId(id).checked) count += 1; });
        byId('draftCount').textContent = count ? '(' + count + ')' : '';
    }

    function resetFilters() {
        byId('filterForm').reset();
        draftPackage = '';
        initialSeries = '';
        initialSeriesConsumed = true;
        byId('seriesSearch').value = '';
        replacementMode = null;
        document.querySelectorAll('.cat-cb, .status-cb').forEach(function (checkbox) { checkbox.checked = false; });
        ['voltageMin', 'voltageMax', 'voltageExact', 'capacityMin', 'capacityMax', 'capacityExact', 'lifeMin', 'lifeMax', 'lifeExact', 'rippleMin', 'rippleMax', 'rippleExact', 'esrMin', 'esrMax', 'esrExact'].forEach(function (id) {
            if (byId(id)) byId(id).value = '';
        });
        updateDependentControls();
        applied = captureFilters();
        filtered = products.slice();
        byId('sortProducts').value = 'default';
        page = 1;
        renderAll();
    }

    function exportProducts() {
        if (replacementMode) {
            var replacementHeaders = ['同行品牌', '同行料号', '同行系列', '永铭替代料号', '对应关系', '产品详情状态'];
            var replacementRows = replacementMode.mappings.map(function (mapping) {
                return [mapping.competitorBrand || mapping.competitorBrandRaw, mapping.competitorPart, mapping.competitorSeries, mapping.yminPart, mapping.matchType, productByPartKey[mapping.yminPartKey || partKey(mapping.yminPart)] ? '可查看' : '资料待同步'];
            });
            downloadCsv([replacementHeaders].concat(replacementRows), '永铭替代料查询结果.csv');
            return;
        }
        var headers = ['产品线', '系列', '全生命周期状态', '产品料号', '形状/封装', '工作温度', '额定电压', '标称容量', '直径/尺寸D', '高度/长/尺寸L', '宽W', '高/尺寸H', '漏电流', '额定纹波电流', 'ESR/阻抗', '额定寿命', 'AEC-Q200', 'RoHS指令', '系列规格书', '3D-CAD'];
        var rows = filtered.map(function (product) {
            return [product.category, product.series, normalizeStatus(product.status), product.itemNo, product.package, productTemperature(product), productVoltage(product), productCapacity(product), dimensionValue(product, 'diameter'), dimensionValue(product, 'length'), dimensionValue(product, 'width'), dimensionValue(product, 'height'), product.leakage, productRipple(product), productEsr(product), productLife(product), productAec(product), product.rohs, product.datasheet ? '有' : '', numberFrom(product.cadCandidateCount) > 0 ? '有' : '可申请'];
        });
        downloadCsv([headers].concat(rows), '永铭产品筛选结果.csv');
    }

    function downloadCsv(rows, fileName) {
        var csv = rows.map(function (row) {
            return row.map(function (cell) { return '"' + String(cell == null ? '' : cell).replace(/"/g, '""') + '"'; }).join(',');
        }).join('\r\n');
        var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function wireEvents() {
        document.querySelectorAll('.cat-cb').forEach(function (checkbox) {
            checkbox.addEventListener('change', function () {
                draftPackage = '';
                updateDependentControls();
            });
        });
        byId('packageOptions').addEventListener('click', function (event) {
            var button = event.target.closest('.package-chip');
            if (!button) return;
            var dimensions = captureDimensionDraft();
            draftPackage = draftPackage === button.dataset.package ? '' : button.dataset.package;
            updatePackageOptions();
            updateSeriesOptions();
            updateUnitsAndRanges(scopeUnits());
            renderDimensionFilters(dimensions);
            updateDraftCount();
        });
        byId('seriesOptions').addEventListener('change', function (event) {
            if (event.target.classList.contains('series-cb')) {
                updateSeriesSelectedText();
                updateDraftCount();
            }
        });
        byId('seriesSearch').addEventListener('input', filterSeriesOptions);
        document.querySelectorAll('.status-cb, #aecFilter, #rohsFilter, #cadFilter').forEach(function (field) { field.addEventListener('change', updateDraftCount); });
        document.querySelectorAll('#keywordFilter, #temperatureMinFilter, #temperatureMaxFilter').forEach(function (field) {
            field.addEventListener(field.tagName === 'SELECT' ? 'change' : 'input', updateDraftCount);
        });
        wirePairRange('voltage');
        wirePairRange('capacity');
        wirePairRange('life');
        wirePairRange('ripple');
        wirePairRange('esr');
        document.querySelectorAll('[data-exact-button]').forEach(wireExactButton);

        byId('applyFilters').addEventListener('click', applyFilters);
        byId('keywordSearchButton').addEventListener('click', applyFilters);
        byId('keywordFilter').addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                applyFilters();
            }
        });
        byId('keywordFilter').addEventListener('paste', function () {
            setTimeout(applyFilters, 0);
        });
        byId('resetFilters').addEventListener('click', resetFilters);
        byId('clearAllTop').addEventListener('click', resetFilters);
        byId('refreshProducts').addEventListener('click', applyFilters);
        byId('sortProducts').addEventListener('change', function () { sortFiltered(); page = 1; renderAll(); });
        byId('listView').addEventListener('click', function () {
            currentView = 'list';
            byId('listResults').classList.remove('hidden');
            byId('gridResults').classList.add('hidden');
            byId('listView').className = 'bg-primary p-2 text-white';
            byId('gridView').className = 'p-2 text-slate-500 hover:text-primary';
        });
        byId('gridView').addEventListener('click', function () {
            currentView = 'grid';
            byId('listResults').classList.add('hidden');
            byId('gridResults').classList.remove('hidden');
            byId('gridView').className = 'bg-primary p-2 text-white';
            byId('listView').className = 'p-2 text-slate-500 hover:text-primary';
        });
        byId('pagination').addEventListener('click', function (event) {
            var button = event.target.closest('.page-button');
            if (!button || button.disabled) return;
            page = Number(button.dataset.page);
            renderAll();
            document.querySelector('section.flex-1').scrollTo({ top: 0, behavior: 'smooth' });
        });
        document.addEventListener('change', function (event) {
            if (event.target.classList.contains('compare-checkbox')) toggleCompare(event.target.dataset.compareKey, event.target.checked);
        });
        byId('compareItems').addEventListener('click', function (event) {
            var button = event.target.closest('.remove-compare');
            if (!button) return;
            toggleCompare(button.dataset.removeKey, false);
        });
        byId('clearCompare').addEventListener('click', function () { selectedCompare = []; renderAll(); });
        byId('openCompare').addEventListener('click', openCompareModal);
        byId('closeCompare').addEventListener('click', function () { byId('compareModal').classList.add('hidden'); document.body.classList.remove('overflow-hidden'); });
        byId('compareModal').addEventListener('click', function (event) {
            if (event.target === byId('compareModal')) {
                byId('compareModal').classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
        byId('exportProducts').addEventListener('click', exportProducts);
        byId('printProducts').addEventListener('click', function () { window.print(); });
    }

    function initialize() {
        resolveInitialSeriesContext();
        updateCategoryCounts();
        if (initialKeyword) byId('keywordFilter').value = initialKeyword;
        if (initialCategory) {
            var categoryCheckbox = Array.from(document.querySelectorAll('.cat-cb')).find(function (checkbox) { return checkbox.value === initialCategory; });
            if (categoryCheckbox) categoryCheckbox.checked = true;
        }
        if (initialStatus) {
            var statusCheckbox = Array.from(document.querySelectorAll('.status-cb')).find(function (checkbox) {
                return checkbox.value === normalizeStatus(initialStatus);
            });
            if (statusCheckbox) statusCheckbox.checked = true;
        }
        updateCategoryLock();
        updatePackageOptions();
        updateSeriesOptions();
        updateUnitsAndRanges();
        renderDimensionFilters();
        wireEvents();
        applyFilters();
    }

    initialize();
})();
