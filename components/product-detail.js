(function () {
    'use strict';

    var catalog = window.YMIN_PRODUCT_CATALOG || { meta: {}, products: [] };
    var products = Array.isArray(catalog.products) ? catalog.products : [];
    var fieldApi = window.YMIN && YMIN.productFields ? YMIN.productFields : null;
    var replacementCatalog = window.YMIN_REPLACEMENT_CROSS_REFERENCE || { meta: {}, mappings: [] };
    var replacementMappings = Array.isArray(replacementCatalog.mappings) ? replacementCatalog.mappings : [];
    var replacementByYmin = {};
    replacementMappings.forEach(function (mapping) {
        var key = mapping.yminPartKey || partKey(mapping.yminPart);
        if (!key) return;
        replacementByYmin[key] = replacementByYmin[key] || [];
        replacementByYmin[key].push(mapping);
    });
    var legacyArticles = [
        { title: '混合动力电容器在车载ECU中的应用优势', date: '2024-03-15', category: '技术文章' },
        { title: '如何通过低ESR电容提升DC-DC转换器效率', date: '2024-02-28', category: '设计指南' },
        { title: 'VHT系列新品发布：满足125℃高温长寿命需求', date: '2024-01-10', category: '产品新闻' }
    ];

    function byId(id) { return document.getElementById(id); }

    function partKey(value) {
        var text = String(value || '');
        if (text.normalize) text = text.normalize('NFKC');
        return text.toUpperCase().replace(/[^A-Z0-9]/g, '');
    }

    function esc(value) {
        return String(value == null ? '' : value).replace(/[&<>'"]/g, function (char) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char];
        });
    }

    function display(value) { return value == null || value === '' ? '—' : esc(value); }

    function externalAsset(path) {
        if (!path) return '';
        if (/^https?:\/\//i.test(path)) return path.replace(/&amp;/g, '&');
        if (path.charAt(0) === '/') return 'https://www.ymin.com' + path;
        return path;
    }

    function seriesImage(product) {
        var library = window.YMIN_SERIES_IMAGES || {};
        var categoryImages = (library.images || {})[product.category] || {};
        return categoryImages[product.series] || '';
    }

    function seriesTechnicalAsset(product) {
        var library = window.YMIN_SERIES_TECHNICAL_ASSETS || {};
        var categoryAssets = (library.images || {})[product.category] || {};
        return categoryAssets[product.series] || null;
    }

    function dateText(timestamp) {
        if (!timestamp) return '';
        var date = new Date(Number(timestamp) * 1000);
        return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('zh-CN');
    }

    function descriptionLines(value) {
        var holder = document.createElement('div');
        holder.innerHTML = String(value || '').replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n');
        return (holder.textContent || '').split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean);
    }

    function findProduct(itemNo) {
        var target = String(itemNo || '').toUpperCase();
        return products.find(function (product) { return String(product.itemNo || '').toUpperCase() === target; });
    }

    function loadDetail(product, callback) {
        window.YMIN_PRODUCT_DETAILS = window.YMIN_PRODUCT_DETAILS || {};
        if (window.YMIN_PRODUCT_DETAILS[product.itemNo]) {
            callback(window.YMIN_PRODUCT_DETAILS[product.itemNo]);
            return;
        }
        var script = document.createElement('script');
        script.src = 'data/product-details/' + String(product.detailShard).padStart(2, '0') + '.js';
        script.onload = function () { callback((window.YMIN_PRODUCT_DETAILS || {})[product.itemNo] || {}); };
        script.onerror = function () { renderError('产品规格分片加载失败，请通过本地预览服务器打开此页面。'); };
        document.head.appendChild(script);
    }

    function findSpec(specFields, names) {
        var field = specFields.find(function (item) {
            var label = String(item.label || '').toLowerCase();
            return names.some(function (name) { return label.indexOf(String(name).toLowerCase()) >= 0; });
        });
        return field && field.value ? field.value : '';
    }

    function measurementConditions(value) {
        var parts = String(value || '').split('/').map(function (part) { return part.trim(); }).filter(Boolean);
        return parts.length > 1 ? parts.slice(1).join(' / ') : '';
    }

    function crossReferencesFor(itemNo) {
        return replacementByYmin[partKey(itemNo)] || [];
    }

    function applicationReferences(category) {
        var text = String(category || '');
        if (text.indexOf('超级电容') >= 0) return [
            ['backup_power', '备用电源'], ['electric_meter', '智能仪表'], ['energy_savings_leaf', '储能系统'], ['precision_manufacturing', '工业控制']
        ];
        if (text.indexOf('薄膜') >= 0) return [
            ['electrical_services', 'DC-Link'], ['ev_station', '新能源汽车'], ['solar_power', '光储逆变'], ['manufacturing', '工业变频']
        ];
        if (text.indexOf('混合') >= 0 || text.indexOf('铝电解') >= 0) return [
            ['directions_car', '汽车电子'], ['cell_tower', '5G 基站电源'], ['power', 'DC-DC 转换器'], ['electrical_services', '工业电源']
        ];
        return [
            ['memory', '高密度电子'], ['router', '通信设备'], ['power', 'DC-DC 转换'], ['devices', '消费电子']
        ];
    }

    function resourceItem(icon, title, subtitle, href, enabled) {
        var content = '<span class="material-symbols-outlined text-primary">' + icon + '</span><div><p class="font-bold text-sm">' + esc(title) + '</p><p class="text-[10px] text-slate-500">' + esc(subtitle) + '</p></div><span class="material-symbols-outlined ml-auto">' + (enabled ? 'arrow_forward' : 'block') + '</span>';
        if (!enabled) return '<div class="flex items-center gap-3 p-3 bg-slate-50 border opacity-45 cursor-not-allowed">' + content + '</div>';
        return '<a class="flex items-center gap-3 p-3 bg-slate-50 border hover:border-primary" href="' + esc(href) + '"' + (/^https?:/i.test(href) ? ' target="_blank" rel="noopener"' : '') + '>' + content + '</a>';
    }

    function renderError(message) {
        byId('dynamicContent').innerHTML = '<div class="bg-white border border-slate-200 p-12 text-center"><span class="material-symbols-outlined text-5xl text-slate-300">search_off</span><h1 class="text-2xl font-bold text-primary mt-4">未找到产品</h1><p class="text-sm text-slate-500 mt-2">' + esc(message) + '</p><a class="inline-flex mt-6 bg-primary text-white px-6 py-3 text-xs font-bold" href="product-center.html">返回产品中心</a></div>';
    }

    function renderProduct(product, detail) {
        var merged = Object.assign({}, product, detail);
        if (fieldApi && fieldApi.packageValue) merged.package = fieldApi.packageValue(merged);
        var specFields = Array.isArray(merged.specFields) ? merged.specFields : [];
        var features = descriptionLines(merged.description);
        var crossReferences = crossReferencesFor(merged.itemNo);
        var applications = applicationReferences(merged.category);
        var cad = merged.cad;
        var cadAvailable = !!(cad && cad.candidateCount);
        var cadRequestParams = new URLSearchParams();
        [
            ['item', merged.itemNo],
            ['category', merged.category],
            ['series', merged.series],
            ['package', merged.package],
            ['voltage', merged.voltage],
            ['capacitance', merged.capacitance],
            ['size', merged.size]
        ].forEach(function (entry) {
            if (entry[1] !== '' && entry[1] != null) cadRequestParams.set(entry[0], entry[1]);
        });
        var cadUrl = cadAvailable
            ? 'design-3d-cad.html?item=' + encodeURIComponent(merged.itemNo)
            : 'design-3d-cad-request.html?' + cadRequestParams.toString();
        var datasheet = externalAsset(merged.datasheet);
        var sourceUrl = externalAsset(merged.sourceUrl);
        var imageUrl = externalAsset(merged.image || seriesImage(merged));
        var technicalAsset = seriesTechnicalAsset(merged);
        var technicalImageUrl = technicalAsset ? externalAsset(technicalAsset.localPath || technicalAsset.sourceUrl) : '';
        var lcsc = externalAsset(merged.lcsc);
        var ickey = externalAsset(merged.ickey);
        var updated = dateText(merged.updatedAt);
        var confirmedFields = fieldApi && fieldApi.detailFields ? fieldApi.detailFields(merged, merged) : specFields.map(function (field) {
            return { key: '', label: field.label, value: field.value };
        });
        function confirmedValue(key, fallback) {
            var value = fieldApi && fieldApi.fieldValue ? fieldApi.fieldValue(confirmedFields, key) : '';
            return value === '' || value == null ? (fallback || '') : value;
        }
        var packageQuantity = confirmedValue('minimumPack', findSpec(specFields, ['包装数量', '最小包装']));
        var esrField = confirmedFields.find(function (field) { return field.key === 'esr'; }) || { label: 'ESR / 阻抗', value: merged.esr };
        var esrFrequency = confirmedValue('esrFrequency');
        var rippleField = confirmedFields.find(function (field) { return field.key === 'ripple' || field.key === 'rippleFilm'; }) || { label: '额定纹波电流', value: merged.ripple };

        var quickSpecs = [
            ['额定电压', confirmedValue('voltage', merged.voltage)], ['标称容量', confirmedValue('capacity', merged.capacitance)], ['工作温度', merged.temperature],
            [esrField.label, esrField.value], ['额定寿命', confirmedValue('life', merged.life)], ['封装尺寸', merged.size]
        ];
        var lifecycleStatus = fieldApi && fieldApi.lifecycleStatus ? fieldApi.lifecycleStatus(merged.status) : (/不推荐|新项目/.test(String(merged.status || '')) ? '新项目不推荐' : /新品/.test(String(merged.status || '')) ? '新品' : '量产品');
        // 特性标签已在料号下方由 description 字段拆分展示，不在规格参数区重复出现。
        var allSpecs = confirmedFields.filter(function (field) { return field.key !== 'featureTags'; }).map(function (field) { return [field.label, field.value]; });
        var certifications = [];
        if (confirmedValue('aec', merged.certification)) certifications.push('AEC-Q200：' + confirmedValue('aec', merged.certification));
        if (confirmedValue('rohs', merged.rohs)) certifications.push('RoHS：' + confirmedValue('rohs', merged.rohs));

        document.title = merged.itemNo + ' - 产品详情 | 永铭电子';
        byId('detailBreadcrumb').innerHTML = '<a href="index.html" class="hover:text-primary">首页</a><span>/</span><a href="product-center.html" class="hover:text-primary">产品中心</a><span>/</span><a href="product-center.html?category=' + encodeURIComponent(merged.category || '') + '" class="hover:text-primary">' + display(merged.category) + '</a><span>/</span><span class="text-primary font-bold">' + esc(merged.itemNo) + '</span>';

        var featureHtml = features.length ? '<div class="flex flex-wrap gap-2 mt-4">' + features.slice(0, 6).map(function (feature) { return '<span class="px-3 py-1 text-[11px] border border-primary/25 bg-primary/5 text-primary">' + esc(feature) + '</span>'; }).join('') + '</div>' : '';
        var certHtml = certifications.length ? '<div class="flex flex-wrap gap-2 mt-4">' + certifications.map(function (cert) { return '<span class="bg-primary text-white px-3 py-1 text-[10px] font-bold">' + esc(cert) + '</span>'; }).join('') + '</div>' : '';
        var productImage = imageUrl
            ? '<div class="h-44 md:h-48 w-full border border-slate-200 bg-white p-4 flex items-center justify-center"><img class="h-full w-full object-contain" src="' + esc(imageUrl) + '" alt="' + esc(merged.itemNo) + ' 产品图片"></div>'
            : '<div class="h-44 md:h-48 w-full border border-slate-200 bg-gradient-to-br from-white to-slate-100 flex flex-col items-center justify-center text-slate-400"><span class="material-symbols-outlined text-5xl">inventory_2</span><p class="mt-2 text-xs font-bold text-slate-500">产品图片待关联</p><p class="mt-1 max-w-[220px] text-center text-[10px]">' + esc(merged.category || '') + ' · ' + esc(merged.itemNo || '') + '</p></div>';

        var shopButtons = '';
        if (lcsc) shopButtons += '<a class="block w-full border border-primary text-primary text-center text-xs py-2 font-bold hover:bg-primary hover:text-white" href="' + esc(lcsc) + '" target="_blank" rel="noopener">立创商城</a>';
        if (ickey) shopButtons += '<a class="block w-full border border-primary text-primary text-center text-xs py-2 font-bold hover:bg-primary hover:text-white" href="' + esc(ickey) + '" target="_blank" rel="noopener">云汉芯城</a>';
        if (!shopButtons) shopButtons = '<div class="text-xs text-slate-400 border bg-slate-50 p-3 text-center">当前料号暂无商城链接</div>';

        var dimensionRows = fieldApi && fieldApi.dimensionFields ? fieldApi.dimensionFields(merged) : [
            { symbol: 'D', label: '直径 D', value: merged.diameter }, { symbol: 'L', label: '高度 L', value: merged.length },
            { symbol: 'W', label: '宽 W', value: merged.width }, { symbol: 'H', label: '高 H', value: merged.height }
        ];
        dimensionRows = dimensionRows.filter(function (item) { return item.value !== '' && item.value != null; });
        var dimensionTable = dimensionRows.length ? '<table class="w-full text-xs border-collapse"><thead><tr class="bg-slate-100"><th class="border px-3 py-2">尺寸项目</th><th class="border px-3 py-2">代号</th><th class="border px-3 py-2">数值 (mm)</th></tr></thead><tbody>' + dimensionRows.map(function (item) { return '<tr><td class="border px-3 py-2 text-center">' + esc(item.label) + '</td><td class="border px-3 py-2 font-bold text-center">' + esc(item.symbol) + '</td><td class="border px-3 py-2 text-center">' + display(item.value) + '</td></tr>'; }).join('') + '</tbody></table>' : '<div class="bg-slate-50 border p-6 text-xs text-slate-400 text-center">尺寸字段待补充</div>';
        var rippleTable = '<table class="w-full text-xs border-collapse"><thead><tr class="bg-slate-100"><th class="border px-3 py-2">' + esc(rippleField.label) + '</th><th class="border px-3 py-2">纹波测试条件</th><th class="border px-3 py-2">' + esc(esrField.label) + '</th><th class="border px-3 py-2">ESR频率</th></tr></thead><tbody><tr class="text-center"><td class="border px-3 py-3 font-medium">' + display(rippleField.value) + '</td><td class="border px-3 py-3">' + display(measurementConditions(merged.ripple)) + '</td><td class="border px-3 py-3">' + display(esrField.value) + '</td><td class="border px-3 py-3">' + display(esrFrequency) + '</td></tr></tbody></table>';
        var technicalFigure = technicalImageUrl
            ? '<figure class="mt-6 border border-slate-200 bg-white p-3 md:p-5"><img class="series-technical-image block w-full h-auto" src="' + esc(technicalImageUrl) + '" alt="' + esc(merged.series || merged.itemNo) + ' 系列产品尺寸与额定纹波电流条件" loading="lazy"><figcaption class="mt-3 text-[11px] leading-5 text-slate-500">' + display(merged.series) + ' 系列技术图，同系列料号共用；具体尺寸、电气条件及修正系数以正式规格书为准。</figcaption></figure>'
            : '<div class="mt-6 border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-xs text-slate-500"><span class="material-symbols-outlined block mb-2 text-3xl text-slate-300">image_not_supported</span>当前系列技术图待资料库补充</div>';

        var cadTitle = cadAvailable ? '3D-CAD 模型' : '申请 3D-CAD';
        var cadSubtitle = cadAvailable ? '已有 STEP 模型，可预览与下载' : '当前暂无模型，可提交需求';
        var cadIcon = cadAvailable ? 'token' : 'add_box';
        var crossReferencesHtml = crossReferences.length ? crossReferences.map(function (mapping) {
            var referenceSpecs = [
                mapping.competitorSeries ? '系列：' + mapping.competitorSeries : '',
                mapping.voltage ? '电压：' + mapping.voltage : '',
                mapping.capacitance ? '容量：' + mapping.capacitance : '',
                mapping.size ? '尺寸：' + mapping.size : '',
                mapping.life ? '寿命：' + mapping.life : ''
            ].filter(Boolean).join(' · ');
            return '<li class="border border-slate-200 bg-slate-50 p-4"><div class="flex flex-wrap items-start justify-between gap-2"><div class="min-w-0"><p class="text-[10px] font-bold text-slate-500">' + esc(mapping.competitorBrand || mapping.competitorBrandRaw || '同行品牌') + '</p><p class="mt-1 break-all font-mono text-sm font-bold text-primary">' + esc(mapping.competitorPart) + '</p></div><span class="bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">' + esc(mapping.matchType || '对应关系') + '</span></div>' + (referenceSpecs ? '<p class="mt-2 text-[10px] leading-4 text-slate-500">' + esc(referenceSpecs) + '</p>' : '') + '</li>';
        }).join('') : '<li class="border border-slate-200 bg-slate-50 p-4 text-xs text-slate-400">暂无已收录的同行替代关系</li>';

        var html = '';
        html += '<div class="bg-white border border-slate-200 p-6 lg:p-8 mb-6"><div class="flex flex-col lg:flex-row gap-6 lg:gap-8"><div class="flex-1 min-w-0"><div class="flex flex-col md:flex-row md:items-start gap-6"><div class="flex-1 min-w-0"><div class="text-3xl font-bold text-primary mb-1 leading-tight">' + display(merged.category) + '</div><h1 class="text-4xl font-bold text-primary mb-2 break-all">' + esc(merged.itemNo) + '</h1><div class="flex flex-wrap items-center gap-3 mb-2"><span class="bg-primary text-white text-[11px] px-3 py-1 font-bold uppercase tracking-wider">' + lifecycleStatus + '</span><span class="text-xs text-slate-500">' + display(merged.series) + ' 系列 · ' + display(merged.package) + '</span>' + (updated ? '<span class="text-[10px] text-slate-400">数据更新：' + esc(updated) + '</span>' : '') + '</div>' + featureHtml + certHtml + '</div><div class="md:w-52 lg:w-56 shrink-0">' + productImage + '</div></div><div class="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-5 border border-slate-100 mt-5">' + quickSpecs.map(function (spec) { return '<div><div class="text-[10px] uppercase tracking-wider text-slate-500">' + esc(spec[0]) + '</div><div class="text-base font-semibold text-primary">' + display(spec[1]) + '</div></div>'; }).join('') + '</div></div>';
        html += '<div class="lg:w-80 shrink-0"><div class="bg-slate-50 border border-slate-200 p-5"><h4 class="text-sm font-bold text-primary mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-base">storefront</span>网销商城</h4><div class="text-xs space-y-2"><div class="flex justify-between gap-4"><span class="text-slate-500">最小包装量 (MOQ):</span><span class="font-semibold text-right">' + display(packageQuantity) + '</span></div><div class="flex justify-between gap-4"><span class="text-slate-500">封装形式:</span><span class="font-semibold text-right">' + display(merged.package) + '</span></div><div class="space-y-2 mt-4">' + shopButtons + '</div></div></div></div></div></div>';

        html += '<div class="flex flex-col lg:flex-row gap-8 mb-8"><div class="flex-1 bg-white border border-slate-200 p-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-2xl">description</span><h2 class="text-2xl font-bold text-primary">详细规格参数</h2></div><div class="flex gap-2"><button class="bg-white p-2 border border-slate-200 hover:bg-slate-100" id="downloadTableBtn" title="下载规格表"><span class="material-symbols-outlined text-lg">download</span></button><button class="bg-white p-2 border border-slate-200 hover:bg-slate-100" id="printTableBtn" title="打印"><span class="material-symbols-outlined text-lg">print</span></button></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-8">' + allSpecs.map(function (field) { return '<div class="flex justify-between items-start gap-5 py-3 border-b border-slate-100"><span class="text-slate-600 text-sm">' + esc(field[0]) + '</span><span class="font-medium text-sm text-primary text-right">' + display(field[1]) + '</span></div>'; }).join('') + '</div><p class="text-[10px] text-slate-400 mt-6">* 具体参数及测试条件以正式规格书为准。</p>';
        html += '<div class="mt-10 pt-6 border-t"><h3 class="text-xl font-bold text-primary mb-2 flex items-center gap-2"><span class="material-symbols-outlined">straighten</span>产品尺寸图与额定纹波电流、频率条件</h3><p class="text-xs text-slate-500 mb-5">本料号结构化参数与系列技术图对应展示。</p><div class="grid grid-cols-1 xl:grid-cols-2 gap-5"><div><h4 class="font-bold text-sm text-primary mb-3">本料号尺寸（单位：mm）</h4><div class="overflow-x-auto">' + dimensionTable + '</div></div><div><h4 class="font-bold text-sm text-primary mb-3">本料号纹波参数</h4><div class="overflow-x-auto">' + rippleTable + '</div></div></div>' + technicalFigure + '</div></div>';

        html += '<aside class="lg:w-80 flex flex-col gap-6"><div class="bg-white border border-slate-200 p-6"><div class="flex items-center gap-2 mb-5"><span class="material-symbols-outlined text-primary text-xl">build</span><h3 class="text-xl font-bold text-primary">设计工具与资源</h3></div><div class="space-y-3">' + resourceItem('timer', '寿命推算工具', '在线计算工作寿命', 'design-life-calc.html', true) + resourceItem('query_stats', 'SPICE 模型', '电路仿真模型', 'design-spice.html', true) + resourceItem(cadIcon, cadTitle, cadSubtitle, cadUrl, true) + resourceItem('picture_as_pdf', '产品规格书', datasheet ? '已提供 PDF' : '暂无 PDF', datasheet, !!datasheet) + resourceItem('fact_check', 'RoHS / REACH', display(merged.rohs), 'support-download.html', true) + resourceItem('monitoring', '可靠性数据', '试验报告', 'design-reliability.html', true) + (sourceUrl ? resourceItem('database', '原始数据页', '查看现官网来源', sourceUrl, true) : '') + '</div></div>';
        html += '<div class="bg-white border border-slate-200 p-6"><div class="mb-4 flex items-center justify-between gap-3"><h3 class="text-lg font-bold text-primary flex items-center gap-2"><span class="material-symbols-outlined">compare_arrows</span>交叉参考</h3><a class="text-[10px] font-bold text-primary hover:underline" href="product-replacement.html?search=' + encodeURIComponent(merged.itemNo || '') + '">查看全部替代料</a></div><p class="text-xs text-slate-500 mb-4">该永铭料号在替代数据表中对应的同行料号：</p><ul class="space-y-3">' + crossReferencesHtml + '</ul><div class="mt-4 p-3 bg-amber-50/50 border border-amber-200"><p class="text-xs flex items-start gap-2"><span class="material-symbols-outlined text-amber-600 text-sm">info</span>PIN TO PIN 不代表所有电气指标完全等效，批量替换前请核对完整规格并完成工程验证。</p></div></div></aside></div>';

        html += '<div class="bg-white border border-slate-200 p-8 mb-8"><h2 class="text-2xl font-bold text-primary mb-6 flex items-center gap-3"><span class="material-symbols-outlined text-2xl">devices</span>推荐应用场景</h2><div class="grid grid-cols-2 md:grid-cols-4 gap-4">' + applications.map(function (application) { return '<a class="bg-slate-50 border p-5 text-center hover:border-primary" href="application-center.html"><span class="material-symbols-outlined text-3xl text-primary mb-2">' + esc(application[0]) + '</span><h4 class="font-bold text-sm mb-1">' + esc(application[1]) + '</h4><p class="text-[10px] text-slate-500 uppercase">典型应用</p></a>'; }).join('') + '</div><div class="mt-6 p-5 bg-primary/5 border-l-4 border-primary"><p class="text-sm text-slate-700"><span class="font-bold">产品类别：</span>' + display(merged.category) + '。应用场景为类别级参考，实际选型请结合额定电压、容量、温度、纹波电流及寿命要求。</p></div></div>';

        html += '<div class="bg-white border border-slate-200 p-8 mb-8"><h2 class="text-2xl font-bold text-primary mb-6 flex items-center gap-3"><span class="material-symbols-outlined text-2xl">newspaper</span>相关技术文章与新闻</h2><div class="space-y-5">' + legacyArticles.map(function (article) { return '<a class="block border-b pb-4 last:border-0 hover:bg-slate-50 p-2" href="support-news.html"><div class="flex justify-between"><div><span class="text-[10px] font-bold uppercase px-2 py-0.5 bg-slate-100">' + esc(article.category) + '</span><h4 class="font-bold text-primary mt-2 hover:underline">' + esc(article.title) + '</h4><p class="text-xs text-slate-500 mt-1">' + esc(article.date) + '</p></div><span class="material-symbols-outlined text-slate-400">arrow_forward</span></div></a>'; }).join('') + '</div><a href="support-news.html" class="inline-block mt-5 text-primary text-xs font-bold uppercase hover:underline">浏览全部文章 →</a></div>';

        byId('dynamicContent').innerHTML = html;
        byId('printTableBtn').addEventListener('click', function () { window.print(); });
        byId('downloadTableBtn').addEventListener('click', function () { downloadSpecs(merged, allSpecs); });
    }

    function downloadSpecs(product, specs) {
        function cell(value) { return '"' + String(value == null ? '' : value).replace(/"/g, '""') + '"'; }
        var lines = [['字段', '值'].map(cell).join(',')].concat(specs.map(function (spec) { return spec.map(cell).join(','); }));
        var blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = product.itemNo + '_产品规格.csv';
        link.click();
        URL.revokeObjectURL(link.href);
    }

    function init() {
        if (window.YMIN && YMIN.navbar) YMIN.navbar.inject('products');
        if (window.YMIN && YMIN.footer) YMIN.footer.inject();
        var itemNo = new URLSearchParams(location.search).get('pn');
        if (!itemNo) {
            renderError('地址中缺少产品料号参数 pn。');
            return;
        }
        var product = findProduct(itemNo);
        if (!product) {
            renderError('生产库中没有找到料号“' + itemNo + '”。');
            return;
        }
        loadDetail(product, function (detail) { renderProduct(product, detail); });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
