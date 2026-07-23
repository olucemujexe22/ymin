(function () {
    'use strict';

    var catalog = window.YMIN_PRODUCT_CATALOG || { meta: {}, products: [] };
    var products = Array.isArray(catalog.products) ? catalog.products : [];
    var legacyArticles = [
        { title: '混合动力电容器在车载ECU中的应用优势', date: '2024-03-15', category: '技术文章' },
        { title: '如何通过低ESR电容提升DC-DC转换器效率', date: '2024-02-28', category: '设计指南' },
        { title: 'VHT系列新品发布：满足125℃高温长寿命需求', date: '2024-01-10', category: '产品新闻' }
    ];

    function byId(id) { return document.getElementById(id); }

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

    function comparableNumber(value) {
        var number = Number(value);
        return Number.isFinite(number) ? number : null;
    }

    function relatedProducts(product) {
        var voltage = comparableNumber(product.voltageNumber);
        var capacitance = comparableNumber(product.capacitanceUf);
        return products.filter(function (candidate) {
            return candidate.itemNo !== product.itemNo && candidate.category === product.category;
        }).map(function (candidate) {
            var score = 0;
            if (product.series && candidate.series === product.series) score += 12;
            if (product.package && candidate.package === product.package) score += 7;
            var candidateVoltage = comparableNumber(candidate.voltageNumber);
            var candidateCapacitance = comparableNumber(candidate.capacitanceUf);
            if (voltage != null && candidateVoltage != null) score -= Math.abs(candidateVoltage - voltage) / Math.max(voltage, 1);
            if (capacitance != null && candidateCapacitance != null && capacitance > 0 && candidateCapacitance > 0) {
                score -= Math.abs(Math.log(candidateCapacitance / capacitance));
            }
            return { product: candidate, score: score };
        }).sort(function (left, right) {
            return right.score - left.score || left.product.itemNo.localeCompare(right.product.itemNo);
        }).slice(0, 3).map(function (entry) { return entry.product; });
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

    function dimensionDiagram(product) {
        if (product.diameter || product.length) {
            return '<svg viewBox="0 0 240 170" class="w-full h-48" role="img" aria-label="圆柱形产品尺寸示意图"><rect x="45" y="35" width="135" height="75" rx="4" fill="#e2e8f0" stroke="#1B365D" stroke-width="2"/><line x1="45" y1="22" x2="180" y2="22" stroke="#1B365D"/><text x="112" y="17" font-size="10" fill="#1B365D" text-anchor="middle">L (' + display(product.length) + ')</text><line x1="195" y1="35" x2="195" y2="110" stroke="#1B365D"/><text x="201" y="76" font-size="10" fill="#1B365D">D (' + display(product.diameter) + ')</text><line x1="82" y1="110" x2="82" y2="142" stroke="#1B365D" stroke-width="2"/><line x1="143" y1="110" x2="143" y2="142" stroke="#1B365D" stroke-width="2"/><text x="71" y="157" font-size="9" fill="#1B365D">正极</text><text x="132" y="157" font-size="9" fill="#1B365D">负极</text></svg>';
        }
        if (product.width || product.height || product.thickness) {
            return '<svg viewBox="0 0 240 170" class="w-full h-48" role="img" aria-label="方形产品尺寸示意图"><path d="M45 55 L160 55 L195 34 L80 34 Z" fill="#f1f5f9" stroke="#1B365D" stroke-width="2"/><path d="M160 55 L195 34 L195 125 L160 146 Z" fill="#cbd5e1" stroke="#1B365D" stroke-width="2"/><rect x="45" y="55" width="115" height="91" fill="#e2e8f0" stroke="#1B365D" stroke-width="2"/><text x="103" y="164" font-size="10" fill="#1B365D" text-anchor="middle">W (' + display(product.width) + ')</text><text x="8" y="103" font-size="10" fill="#1B365D">H (' + display(product.height) + ')</text><text x="168" y="22" font-size="10" fill="#1B365D">B/T (' + display(product.thickness) + ')</text></svg>';
        }
        return '<div class="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">[尺寸图待数据库补充]</div>';
    }

    function renderError(message) {
        byId('dynamicContent').innerHTML = '<div class="bg-white border border-slate-200 p-12 text-center"><span class="material-symbols-outlined text-5xl text-slate-300">search_off</span><h1 class="text-2xl font-bold text-primary mt-4">未找到产品</h1><p class="text-sm text-slate-500 mt-2">' + esc(message) + '</p><a class="inline-flex mt-6 bg-primary text-white px-6 py-3 text-xs font-bold" href="product-center.html">返回产品中心</a></div>';
    }

    function renderProduct(product, detail) {
        var merged = Object.assign({}, product, detail);
        var specFields = Array.isArray(merged.specFields) ? merged.specFields : [];
        var features = descriptionLines(merged.description);
        var alternatives = relatedProducts(merged);
        var applications = applicationReferences(merged.category);
        var cad = merged.cad;
        var cadUrl = 'design-3d-cad.html?item=' + encodeURIComponent(merged.itemNo);
        var datasheet = externalAsset(merged.datasheet);
        var sourceUrl = externalAsset(merged.sourceUrl);
        var imageUrl = externalAsset(merged.image);
        var lcsc = externalAsset(merged.lcsc);
        var ickey = externalAsset(merged.ickey);
        var updated = dateText(merged.updatedAt);
        var packageQuantity = findSpec(specFields, ['包装数量', '最小包装']);

        var quickSpecs = [
            ['额定电压', merged.voltage], ['标称容量', merged.capacitance], ['工作温度', merged.temperature],
            ['ESR / 阻抗', merged.esr], ['额定寿命', merged.life ? merged.life + ' h' : ''], ['封装尺寸', merged.size]
        ];
        var generalSpecs = [
            ['电容类别', merged.category], ['形状 / 封装', merged.package], ['产品料号', merged.itemNo], ['系列', merged.series], ['全生命周期状态', merged.status]
        ];
        var allSpecs = generalSpecs.concat(specFields.map(function (field) { return [field.label, field.value]; }));
        var certifications = [];
        if (merged.certification) certifications.push(merged.certification);
        if (merged.rohs) certifications.push('RoHS ' + merged.rohs);

        document.title = merged.itemNo + ' - 产品详情 | 永铭电子';
        byId('detailBreadcrumb').innerHTML = '<a href="index.html" class="hover:text-primary">首页</a><span>/</span><a href="product-center.html" class="hover:text-primary">产品中心</a><span>/</span><a href="product-center.html?category=' + encodeURIComponent(merged.category || '') + '" class="hover:text-primary">' + display(merged.category) + '</a><span>/</span><span class="text-primary font-bold">' + esc(merged.itemNo) + '</span>';

        var featureHtml = features.length ? '<div class="flex flex-wrap gap-2 mt-4">' + features.slice(0, 6).map(function (feature) { return '<span class="px-3 py-1 text-[11px] border border-primary/25 bg-primary/5 text-primary">' + esc(feature) + '</span>'; }).join('') + '</div>' : '';
        var certHtml = certifications.length ? '<div class="flex flex-wrap gap-2 mt-4">' + certifications.map(function (cert) { return '<span class="bg-primary text-white px-3 py-1 text-[10px] font-bold">' + esc(cert) + '</span>'; }).join('') + '</div>' : '';
        var productImage = imageUrl ? '<img class="h-24 w-24 object-contain border bg-white p-2" src="' + esc(imageUrl) + '" alt="' + esc(merged.itemNo) + '">' : '';

        var shopButtons = '';
        if (lcsc) shopButtons += '<a class="block w-full border border-primary text-primary text-center text-xs py-2 font-bold hover:bg-primary hover:text-white" href="' + esc(lcsc) + '" target="_blank" rel="noopener">立创商城</a>';
        if (ickey) shopButtons += '<a class="block w-full border border-primary text-primary text-center text-xs py-2 font-bold hover:bg-primary hover:text-white" href="' + esc(ickey) + '" target="_blank" rel="noopener">云汉芯城</a>';
        if (!shopButtons) shopButtons = '<div class="text-xs text-slate-400 border bg-slate-50 p-3 text-center">当前料号暂无商城链接</div>';

        var dimensionRows = [
            ['D', merged.diameter], ['L', merged.length], ['W', merged.width], ['H', merged.height], ['B/T', merged.thickness]
        ].filter(function (item) { return item[1] !== '' && item[1] != null; });
        var dimensionTable = dimensionRows.length ? '<table class="w-full text-xs border-collapse"><thead><tr class="bg-slate-100"><th class="border px-3 py-2">尺寸代号</th><th class="border px-3 py-2">数值 (mm)</th></tr></thead><tbody>' + dimensionRows.map(function (item) { return '<tr><td class="border px-3 py-2 font-bold text-center">' + esc(item[0]) + '</td><td class="border px-3 py-2 text-center">' + display(item[1]) + '</td></tr>'; }).join('') + '</tbody></table>' : '<div class="bg-slate-50 border p-6 text-xs text-slate-400 text-center">尺寸字段待补充</div>';

        var cadSubtitle = cad && cad.candidateCount ? cad.candidateCount + ' 个候选，待确认' : '暂无尺寸匹配候选';
        var alternativesHtml = alternatives.length ? alternatives.map(function (candidate) {
            return '<li><a class="flex items-center gap-3 p-3 bg-slate-50 border hover:border-primary" href="product-detail.html?pn=' + encodeURIComponent(candidate.itemNo) + '"><span class="material-symbols-outlined text-primary">memory</span><div class="min-w-0"><span class="font-mono text-sm font-bold break-all">' + esc(candidate.itemNo) + '</span><p class="text-[10px] text-slate-500">' + display(candidate.voltage) + ' · ' + display(candidate.capacitance) + ' · ' + display(candidate.size) + '</p></div></a></li>';
        }).join('') : '<li class="p-4 bg-slate-50 border text-xs text-slate-400">暂无可推荐的相近料号</li>';

        var html = '';
        html += '<div class="bg-white border border-slate-200 p-8 mb-8"><div class="flex flex-col lg:flex-row gap-8"><div class="flex-1"><div class="text-3xl font-bold text-primary mb-1 leading-tight">' + display(merged.category) + '</div><h1 class="text-4xl font-bold text-primary mb-2 break-all">' + esc(merged.itemNo) + '</h1><div class="flex flex-wrap items-center gap-3 mb-2"><span class="bg-primary text-white text-[11px] px-3 py-1 font-bold uppercase tracking-wider">' + display(merged.status) + '</span><span class="text-xs text-slate-500">' + display(merged.series) + ' 系列 · ' + display(merged.package) + '</span>' + (updated ? '<span class="text-[10px] text-slate-400">数据更新：' + esc(updated) + '</span>' : '') + '</div>' + featureHtml + certHtml + '<div class="grid grid-cols-2 md:grid-cols-3 gap-4 bg-slate-50 p-5 border border-slate-100 mt-6">' + quickSpecs.map(function (spec) { return '<div><div class="text-[10px] uppercase tracking-wider text-slate-500">' + esc(spec[0]) + '</div><div class="text-base font-semibold text-primary">' + display(spec[1]) + '</div></div>'; }).join('') + '</div></div>';
        html += '<div class="lg:w-80 flex flex-col gap-4">' + (productImage ? '<div class="flex justify-end">' + productImage + '</div>' : '') + '<div class="bg-white border border-slate-200 p-5 flex flex-col items-center"><a class="w-full border border-primary text-primary py-2.5 text-sm font-bold flex items-center justify-center gap-1 hover:bg-primary hover:text-white mb-3" href="mailto:web@ymin.com"><span class="material-symbols-outlined text-base">support_agent</span> 在线客服</a><div class="bg-slate-100 p-3 border w-full flex flex-col items-center"><div class="w-32 h-32 bg-white border flex items-center justify-center"><span class="material-symbols-outlined text-7xl text-primary">qr_code_2</span></div><p class="text-xs font-bold text-primary mt-2">企业微信客服</p><p class="text-[10px] text-slate-500">扫码咨询产品/样品</p></div></div><div class="bg-slate-50 border border-slate-200 p-5"><h4 class="text-sm font-bold text-primary mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-base">storefront</span>网销商城</h4><div class="text-xs space-y-2"><div class="flex justify-between"><span class="text-slate-500">最小包装量 (MOQ):</span><span class="font-semibold">' + display(packageQuantity) + '</span></div><div class="flex justify-between"><span class="text-slate-500">封装形式:</span><span class="font-semibold">' + display(merged.package) + '</span></div><div class="space-y-2 mt-3">' + shopButtons + '</div></div></div></div></div></div>';

        html += '<div class="flex flex-col lg:flex-row gap-8 mb-8"><div class="flex-1 bg-white border border-slate-200 p-8"><div class="flex items-center justify-between mb-6"><div class="flex items-center gap-3"><span class="material-symbols-outlined text-primary text-2xl">description</span><h2 class="text-2xl font-bold text-primary">详细规格参数</h2></div><div class="flex gap-2"><button class="bg-white p-2 border border-slate-200 hover:bg-slate-100" id="downloadTableBtn" title="下载规格表"><span class="material-symbols-outlined text-lg">download</span></button><button class="bg-white p-2 border border-slate-200 hover:bg-slate-100" id="printTableBtn" title="打印"><span class="material-symbols-outlined text-lg">print</span></button></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-x-8">' + allSpecs.map(function (field) { return '<div class="flex justify-between items-start gap-5 py-3 border-b border-slate-100"><span class="text-slate-600 text-sm">' + esc(field[0]) + '</span><span class="font-medium text-sm text-primary text-right">' + display(field[1]) + '</span></div>'; }).join('') + '</div><p class="text-[10px] text-slate-400 mt-6">* 参数来自现官网生产数据库，空字段以“—”显示。</p>';
        html += '<div class="mt-10 pt-6 border-t"><h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined">straighten</span>产品尺寸图（单位：mm）</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="bg-slate-50 border p-4">' + dimensionDiagram(merged) + '<p class="text-xs text-slate-500 mt-2 text-center">' + display(merged.series) + ' 系列外形尺寸示意图</p></div><div class="overflow-x-auto">' + dimensionTable + '</div></div></div>';
        html += '<div class="mt-10 pt-6 border-t"><h3 class="text-xl font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined">show_chart</span>额定纹波电流与频率条件</h3><div class="overflow-x-auto"><table class="w-full text-xs border-collapse"><thead><tr class="bg-slate-100"><th class="border px-4 py-2">额定纹波电流</th><th class="border px-4 py-2">测试条件</th><th class="border px-4 py-2">ESR / 阻抗</th></tr></thead><tbody><tr class="text-center"><td class="border px-4 py-3 font-medium">' + display(merged.ripple) + '</td><td class="border px-4 py-3">' + display(merged.rippleLabel) + '</td><td class="border px-4 py-3">' + display(merged.esr) + '</td></tr></tbody></table></div><p class="text-[10px] text-slate-400 mt-3">* 分频修正因子尚未结构化入库，请以官方规格书为准。</p></div>';
        html += '<div class="mt-10 pt-6 border-t"><h3 class="text-xl font-bold text-primary mb-4">特性曲线与图表</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="border p-4"><h4 class="font-bold text-sm mb-3">纹波电流频率修正系数</h4><div class="h-40 bg-slate-100 flex items-center justify-center text-slate-400 text-xs">[图表数据待关联]</div></div><div class="border p-4"><h4 class="font-bold text-sm mb-3">温度与寿命关系曲线</h4><div class="h-40 bg-slate-100 flex flex-col items-center justify-center text-slate-400 text-xs"><span>' + display(merged.temperature) + '</span><span class="mt-2">额定寿命 ' + display(merged.life ? merged.life + ' h' : '') + '</span></div></div></div></div></div>';

        html += '<aside class="lg:w-80 flex flex-col gap-6"><div class="bg-white border border-slate-200 p-6"><div class="flex items-center gap-2 mb-5"><span class="material-symbols-outlined text-primary text-xl">build</span><h3 class="text-xl font-bold text-primary">设计工具与资源</h3></div><div class="space-y-3">' + resourceItem('timer', '寿命推算工具', '在线计算工作寿命', 'design-life-calc.html', true) + resourceItem('query_stats', 'SPICE 模型', '电路仿真模型', 'design-spice.html', true) + resourceItem('token', '3D-CAD 模型', cadSubtitle, cadUrl, !!(cad && cad.candidateCount)) + resourceItem('picture_as_pdf', '产品规格书', datasheet ? '已提供 PDF' : '暂无 PDF', datasheet, !!datasheet) + resourceItem('fact_check', 'RoHS / REACH', display(merged.rohs), 'support-download.html', true) + resourceItem('monitoring', '可靠性数据', '试验报告', 'design-reliability.html', true) + (sourceUrl ? resourceItem('database', '原始数据页', '查看现官网来源', sourceUrl, true) : '') + '</div></div>';
        html += '<div class="bg-white border border-slate-200 p-6"><h3 class="text-lg font-bold text-primary mb-4 flex items-center gap-2"><span class="material-symbols-outlined">compare_arrows</span>交叉参考</h3><p class="text-xs text-slate-500 mb-4">同类别、同系列/封装的相近规格：</p><ul class="space-y-3">' + alternativesHtml + '</ul><div class="mt-4 p-3 bg-amber-50/50 border border-amber-200"><p class="text-xs flex items-start gap-2"><span class="material-symbols-outlined text-amber-600 text-sm">info</span>替换前请核对完整电气与机械规格。</p></div></div></aside></div>';

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
