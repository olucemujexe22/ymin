(function (global) {
    'use strict';

    global.YMIN = global.YMIN || {};

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function unique(values) {
        var seen = {};
        return values.filter(function (value) {
            var key = String(value || '').trim();
            if (!key || seen[key]) return false;
            seen[key] = true;
            return true;
        });
    }

    function formatDescription(value) {
        var text = escapeHtml(value || '');
        if (!text) return '';
        text = text.replace(/(应用要求|电容作用|YMIN产品优势|对电容的要求|电容核心作用|永铭[^：\n]{0,24}优势)(：)/g, '<strong class="text-primary">$1$2</strong>');
        return text.replace(/\r?\n/g, '<br>');
    }

    function collectSpecs(sub) {
        var result = [];
        (sub.modules || []).forEach(function (module) {
            (module.specs || []).forEach(function (spec) { result.push(spec); });
        });
        return result;
    }

    function renderTopology(sub) {
        var images = sub.topologyImages || [];
        if (images.length) {
            return '<section class="bg-slate-50 border border-slate-200 p-4 mb-5">' +
                '<div class="flex items-center justify-between gap-3 mb-3"><h4 class="text-sm font-bold text-primary flex items-center gap-2"><span class="material-symbols-outlined text-base">circuit_board</span>电路拓扑图</h4><span class="text-[10px] text-slate-400">' + images.length + ' 张</span></div>' +
                '<div class="grid grid-cols-1 ' + (images.length > 1 ? 'md:grid-cols-2' : '') + ' gap-3">' +
                images.map(function (image) {
                    return '<div class="bg-white border border-slate-200 p-2 flex items-center justify-center min-h-28"><img src="' + escapeHtml(image.src) + '" alt="' + escapeHtml(image.alt) + '" class="max-w-full h-auto object-contain"></div>';
                }).join('') + '</div></section>';
        }

        var modules = sub.modules || [];
        if (!modules.length) return '';
        return '<section class="bg-slate-50 border border-slate-200 p-4 mb-5">' +
            '<h4 class="text-sm font-bold text-primary flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-base">circuit_board</span>电路关键位置</h4>' +
            '<div class="flex flex-wrap items-center gap-2">' + modules.map(function (module, index) {
                var arrow = index ? '<span class="material-symbols-outlined text-slate-300 text-base">arrow_forward</span>' : '';
                return arrow + '<span class="px-3 py-2 bg-white border border-slate-200 text-xs font-semibold text-primary">' + escapeHtml(module.name) + '</span>';
            }).join('') + '</div></section>';
    }

    function hasValue(specs, key) {
        return specs.some(function (spec) { return String(spec[key] || '').trim() !== ''; });
    }

    function looksLikePartNumber(value) {
        return /^[A-Za-z0-9()._-]{8,}$/.test(String(value || '').trim());
    }

    function renderSpecTable(specs) {
        if (!specs.length) {
            return '<div class="border border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-xs text-slate-500">该位置暂未填写推荐料号。</div>';
        }

        var includesSeparateSpec = hasValue(specs, 'spec');
        var columns = [
            { key: 'series', label: '系列', align: 'text-left', strong: true },
            { key: 'spec', label: '规格', align: 'text-left', optional: true },
            { key: 'pn', label: includesSeparateSpec ? '料号' : '料号/规格', align: 'text-left', part: true },
            { key: 'voltage', label: '电压', align: 'text-center' },
            { key: 'cap', label: '容量', align: 'text-center' },
            { key: 'temperature', label: '温度', align: 'text-center', optional: true },
            { key: 'life', label: '寿命', align: 'text-center' },
            { key: 'size', label: '尺寸', align: 'text-center' },
            { key: 'esr', label: 'ESR', align: 'text-center' },
            { key: 'ripple', label: '纹波电流', align: 'text-center' },
            { key: 'note', label: '备注', align: 'text-left', optional: true }
        ].filter(function (column) { return !column.optional || hasValue(specs, column.key); });

        var head = columns.map(function (column) {
            return '<th class="border border-slate-300 px-2 py-2 whitespace-nowrap ' + column.align + '">' + column.label + '</th>';
        }).join('');
        var body = specs.map(function (spec) {
            return '<tr class="hover:bg-slate-50">' + columns.map(function (column) {
                var value = spec[column.key] || '';
                var content = escapeHtml(value || '—');
                if (column.part && looksLikePartNumber(value)) {
                    content = '<a href="product-detail.html?pn=' + encodeURIComponent(value) + '" class="text-primary font-medium hover:underline whitespace-nowrap">' + escapeHtml(value) + '</a>';
                }
                return '<td class="border border-slate-200 px-2 py-2 text-[11px] ' + column.align + ' ' + (column.strong ? 'font-bold text-primary' : 'text-slate-600') + '">' + content + '</td>';
            }).join('') + '</tr>';
        }).join('');

        return '<div class="overflow-x-auto"><table class="w-full min-w-max text-xs border-collapse"><thead class="bg-slate-100 text-slate-700"><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>';
    }

    function renderModule(module, index) {
        var specs = module.specs || [];
        var series = unique(specs.map(function (spec) { return spec.series; }));
        var seriesHtml = series.length ? '<div class="flex flex-wrap gap-1.5 mt-3">' + series.map(function (name) {
            return '<span class="px-2 py-1 bg-primary/5 border border-primary/15 text-primary text-[10px] font-bold">' + escapeHtml(name) + ' 系列</span>';
        }).join('') + '</div>' : '';

        return '<section class="border border-slate-200 mb-4 bg-white">' +
            '<div class="p-4 border-b border-slate-100">' +
                '<div class="flex items-start gap-3">' +
                    '<span class="w-8 h-8 flex items-center justify-center bg-primary/10 text-primary shrink-0"><span class="material-symbols-outlined text-lg">' + escapeHtml(module.icon || 'memory') + '</span></span>' +
                    '<div class="min-w-0 flex-1"><div class="flex flex-wrap items-center justify-between gap-2"><h4 class="text-sm font-bold text-primary">' + escapeHtml(module.name || ('电路位置 ' + (index + 1))) + '</h4><span class="text-[10px] text-slate-400">' + specs.length + ' 个推荐料号</span></div>' +
                    (module.desc ? '<p class="text-xs text-slate-600 leading-6 mt-2">' + formatDescription(module.desc) + '</p>' : '') + seriesHtml + '</div>' +
                '</div>' +
            '</div>' +
            '<div class="p-3">' + renderSpecTable(specs) + '</div>' +
        '</section>';
    }

    function renderLegacyFlow(sub) {
        var flow = sub.flow || [];
        if (!flow.length) return '';
        return '<section class="bg-slate-50 border border-slate-200 p-4 mb-5">' +
            '<h4 class="text-sm font-bold text-primary flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-base">circuit_board</span>应用链路</h4>' +
            '<div class="flex flex-wrap items-center gap-2">' + flow.map(function (node, index) {
                var arrow = index ? '<span class="material-symbols-outlined text-slate-300 text-base">arrow_forward</span>' : '';
                var active = index === flow.length - 1 ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 bg-white text-slate-700';
                return arrow + '<span class="px-3 py-2 border text-xs font-semibold ' + active + '">' + escapeHtml(node) + '</span>';
            }).join('') + '</div></section>';
    }

    function renderLegacySpecTable(specs) {
        if (!specs.length) return '';
        var columns = [
            { key: 'series', label: '推荐系列', strong: true },
            { key: 'voltage', label: '电压' },
            { key: 'cap', label: '容量' },
            { key: 'size', label: '尺寸', optional: true },
            { key: 'note', label: '应用说明', optional: true }
        ].filter(function (column) { return !column.optional || hasValue(specs, column.key); });
        return '<div class="overflow-x-auto"><table class="w-full min-w-max text-xs border-collapse"><thead class="bg-slate-100 text-slate-700"><tr>' +
            columns.map(function (column) { return '<th class="border border-slate-300 px-3 py-2 text-left whitespace-nowrap">' + column.label + '</th>'; }).join('') +
            '</tr></thead><tbody>' + specs.map(function (spec) {
                return '<tr class="hover:bg-slate-50">' + columns.map(function (column) {
                    return '<td class="border border-slate-200 px-3 py-2 text-[11px] ' + (column.strong ? 'font-bold text-primary' : 'text-slate-600') + '">' + escapeHtml(spec[column.key] || '—') + '</td>';
                }).join('') + '</tr>';
            }).join('') + '</tbody></table></div>';
    }

    function renderLegacyContent(page, tab, sub) {
        var specs = collectSpecs(sub);
        var series = unique(specs.map(function (spec) { return spec.series; }));
        var modules = sub.modules || [];
        var html = '<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">' +
            '<div class="flex items-start gap-3"><span class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary shrink-0"><span class="material-symbols-outlined text-2xl">' + escapeHtml(sub.icon || tab.icon || page.icon) + '</span></span><div><h3 class="text-xl font-bold text-primary">' + escapeHtml(sub.name) + '</h3><p class="text-xs text-slate-500 mt-1">' + escapeHtml(tab.name) + ' · 推荐系列：' + escapeHtml(series.join('、') || '待补充') + '</p></div></div>' +
            '</div>';
        if (sub.description) {
            html += '<p class="text-xs text-slate-600 leading-6 border-l-2 border-primary pl-3 mb-5">' + formatDescription(sub.description) + '</p>';
        }
        html += renderLegacyFlow(sub);
        if (modules.length) {
            html += '<h4 class="text-sm font-bold text-primary mb-3 mt-4 flex items-center gap-2"><span class="material-symbols-outlined text-base">settings_suggest</span>系统模块详解与推荐系列</h4>' +
                '<div class="grid grid-cols-1 ' + (modules.length > 1 ? 'md:grid-cols-2' : '') + ' gap-3 mb-5">' + modules.map(function (module) {
                    var moduleSeries = unique((module.specs || []).map(function (spec) { return spec.series; }));
                    return '<div class="border border-slate-200 p-4 hover:border-primary transition-colors"><div class="flex items-start gap-3"><span class="material-symbols-outlined text-primary text-xl">' + escapeHtml(module.icon || 'memory') + '</span><div class="flex-1"><h5 class="text-sm font-bold text-primary mb-1">' + escapeHtml(module.name) + '</h5><p class="text-xs text-slate-600 leading-6">' + formatDescription(module.desc) + '</p>' +
                        (moduleSeries.length ? '<div class="mt-3 space-y-1">' + moduleSeries.map(function (name) { return '<div class="flex items-center gap-2 text-[11px]"><span class="material-symbols-outlined text-primary text-sm">check_circle</span><span class="font-bold text-primary">' + escapeHtml(name) + '</span><span class="text-slate-400">系列</span></div>'; }).join('') + '</div>' : '') +
                        '</div></div></div>';
                }).join('') + '</div>';
            html += '<h4 class="text-sm font-bold text-primary mb-3 flex items-center gap-2"><span class="material-symbols-outlined text-base">inventory</span>推荐规格</h4>' + renderLegacySpecTable(specs);
        }
        return html;
    }

    function prepareTabs(page, supplemental) {
        var removals = (supplemental && supplemental.removeSubApps) || [];
        var tabs = (page.tabs || []).map(function (tab) {
            var copy = Object.assign({}, tab);
            copy.subApps = (tab.subApps || []).filter(function (sub) {
                return !removals.some(function (item) { return item.tab === tab.name && item.name === sub.name; });
            });
            return copy;
        });
        return tabs.concat((supplemental && supplemental.tabs) || []);
    }

    function init(options) {
        options = options || {};
        var dataset = global.YMIN.applicationCollected;
        var page = dataset && dataset.getPage(options.pageKey);
        var supplemental = global.YMIN.applicationSupplemental && global.YMIN.applicationSupplemental[options.pageKey];
        var tabContainer = document.getElementById('tabContainer');
        var subtabContainer = document.getElementById('subtabContainer');
        var contentContainer = document.getElementById('tabContent');
        if (!page || !tabContainer || !subtabContainer || !contentContainer) return;

        var tabs = prepareTabs(page, supplemental);
        var hero = Object.assign({}, page.hero || {}, (supplemental && supplemental.hero) || {});
        var heroTitle = document.getElementById('applicationHeroTitle');
        var heroDescription = document.getElementById('applicationHeroDescription');
        var heroTags = document.getElementById('applicationHeroTags');
        var heroIcon = document.getElementById('applicationHeroIcon');
        if (heroTitle && hero.title) heroTitle.textContent = hero.title;
        if (heroDescription && hero.description) heroDescription.textContent = hero.description;
        if (heroTags) {
            heroTags.innerHTML = (hero.tags || []).map(function (tag) {
                return '<span class="px-3 py-1 bg-primary/10 text-primary text-xs font-bold">' + escapeHtml(tag) + '</span>';
            }).join('');
        }
        if (heroIcon) heroIcon.textContent = page.icon || 'category';

        var params = new URLSearchParams(global.location.search);
        var requestedTab = params.get('tab');
        var currentTabIndex = 0;
        var currentSubIndex = 0;
        if (requestedTab) {
            tabs.some(function (tab, index) {
                if (tab.key === requestedTab || tab.name === requestedTab) {
                    currentTabIndex = index;
                    return true;
                }
                return false;
            });
        }

        function renderTabs() {
            tabContainer.innerHTML = tabs.map(function (tab, index) {
                var active = index === currentTabIndex ? 'tab-active' : 'text-slate-500 hover:text-primary';
                return '<button class="px-5 py-2 text-sm font-semibold transition-colors ' + active + '" data-collected-tab="' + index + '">' + escapeHtml(tab.name) + '</button>';
            }).join('');
            tabContainer.querySelectorAll('button[data-collected-tab]').forEach(function (button) {
                button.addEventListener('click', function () {
                    currentTabIndex = Number(button.dataset.collectedTab) || 0;
                    currentSubIndex = 0;
                    renderAll();
                });
            });
        }

        function renderSubTabs() {
            var tab = tabs[currentTabIndex];
            if (!tab) return;
            var label = document.getElementById('applicationSubtabLabel');
            if (label) label.textContent = tab.template === 'legacy' ? '选择终端' : '选择子应用';
            subtabContainer.innerHTML = tab.subApps.map(function (sub, index) {
                var active = index === currentSubIndex ? 'subtab-active' : 'text-slate-600 hover:bg-slate-100';
                return '<button class="w-full text-left px-3 py-2.5 text-xs font-medium transition-colors flex items-center gap-2 ' + active + '" data-collected-sub="' + index + '"><span class="material-symbols-outlined text-base">' + escapeHtml(sub.icon || tab.icon || page.icon) + '</span><span class="flex-1">' + escapeHtml(sub.name) + '</span><span class="material-symbols-outlined text-xs">chevron_right</span></button>';
            }).join('');
            subtabContainer.querySelectorAll('button[data-collected-sub]').forEach(function (button) {
                button.addEventListener('click', function () {
                    currentSubIndex = Number(button.dataset.collectedSub) || 0;
                    renderSubTabs();
                    renderContent();
                });
            });
        }

        function renderContent() {
            var tab = tabs[currentTabIndex];
            var sub = tab && tab.subApps[currentSubIndex];
            if (!sub) {
                contentContainer.innerHTML = '<p class="text-sm text-slate-500">暂无应用数据。</p>';
                return;
            }
            if (tab.template === 'legacy') {
                contentContainer.innerHTML = renderLegacyContent(page, tab, sub);
                return;
            }
            var specs = collectSpecs(sub);
            var series = unique(specs.map(function (spec) { return spec.series; }));
            var html = '<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">' +
                '<div class="flex items-start gap-3"><span class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary shrink-0"><span class="material-symbols-outlined text-2xl">' + escapeHtml(sub.icon || tab.icon || page.icon) + '</span></span><div><h3 class="text-xl font-bold text-primary">' + escapeHtml(sub.name) + '</h3><p class="text-xs text-slate-500 mt-1">' + escapeHtml(tab.name) + ' · ' + (sub.modules || []).length + ' 个电路位置 · ' + specs.length + ' 个推荐料号</p></div></div>' +
                (series.length ? '<div class="text-[10px] text-slate-500 md:text-right">推荐系列<br><strong class="text-primary text-xs">' + escapeHtml(series.join('、')) + '</strong></div>' : '') +
            '</div>';
            html += renderTopology(sub);
            (sub.modules || []).forEach(function (module, index) { html += renderModule(module, index); });
            contentContainer.innerHTML = html;
        }

        function renderAll() {
            renderTabs();
            renderSubTabs();
            renderContent();
        }

        renderAll();
    }

    global.YMIN.applicationCollectedPage = { init: init };
})(window);
