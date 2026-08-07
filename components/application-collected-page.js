(function (global) {
    'use strict';

    global.YMIN = global.YMIN || {};

    var productIndex = global.YMIN_APPLICATION_PRODUCT_INDEX || { aliases: {}, products: [] };
    var productByPart = {};
    var productsBySeries = {};
    var validPartNumbers = {};
    var lastAudit = null;

    (productIndex.validParts || []).forEach(function (partNumber) {
        validPartNumbers[String(partNumber || '').trim().toUpperCase()] = true;
    });

    (productIndex.products || []).forEach(function (product) {
        var partKey = String(product.pn || '').trim().toUpperCase();
        var seriesKey = String(product.series || '').trim().toUpperCase();
        if (partKey) productByPart[partKey] = product;
        if (seriesKey) {
            productsBySeries[seriesKey] = productsBySeries[seriesKey] || [];
            productsBySeries[seriesKey].push(product);
        }
    });

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

    function rawSpecs(sub) {
        var result = (sub.specs || []).slice();
        (sub.modules || []).forEach(function (module) {
            (module.specs || []).forEach(function (spec) { result.push(spec); });
        });
        return result;
    }

    function normalizedSeries(value) {
        var source = String(value || '').trim();
        var alias = productIndex.aliases && productIndex.aliases[source];
        return String(alias || source).trim().toUpperCase();
    }

    function numeric(value) {
        var match = String(value == null ? '' : value).replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
        return match ? Number(match[0]) : null;
    }

    function productScore(product, spec) {
        var score = 0;
        var targetVoltage = numeric(spec.voltage);
        var targetCapacitance = numeric(spec.cap);
        if (targetVoltage != null && product.voltageNumber != null) {
            score += Math.abs(Math.log((Number(product.voltageNumber) + 0.01) / (targetVoltage + 0.01))) * 3;
        }
        if (targetCapacitance != null && product.capacitanceUf != null) {
            var targetUf = /F/i.test(String(spec.cap || '')) && !/[uμµ]F/i.test(String(spec.cap || ''))
                ? targetCapacitance * 1000000
                : targetCapacitance;
            score += Math.abs(Math.log((Number(product.capacitanceUf) + 0.01) / (targetUf + 0.01)));
        }
        return score;
    }

    function toDisplaySpec(product, original) {
        return {
            series: product.series || original.series || '',
            pn: product.pn || original.pn || '',
            category: product.category || '',
            package: product.package || '',
            status: product.status || '',
            voltage: product.voltage || original.voltage || '',
            cap: product.cap || original.cap || '',
            temperature: product.temperature || original.temperature || '',
            life: product.life || original.life || '',
            size: product.size || original.size || '',
            esr: product.esr || original.esr || '',
            ripple: /\d/.test(String(product.ripple || '')) ? product.ripple : (original.ripple || ''),
            note: original.note || [product.package, product.category].filter(Boolean).join(' · '),
            source: 'product-center'
        };
    }

    function preserveConfirmedSpec(spec) {
        return {
            series: spec.series || '',
            pn: spec.pn || '',
            category: spec.category || '',
            package: spec.package || '',
            status: spec.status || '',
            voltage: spec.voltage || '',
            cap: spec.cap || '',
            temperature: spec.temperature || '',
            life: spec.life || '',
            size: spec.size || '',
            esr: spec.esr || '',
            ripple: spec.ripple || '',
            note: spec.note || '',
            source: 'application-data'
        };
    }

    function chooseProduct(spec, usedParts) {
        var partKey = String(spec.pn || '').trim().toUpperCase();
        if (partKey && productByPart[partKey]) return productByPart[partKey];

        var candidates = productsBySeries[normalizedSeries(spec.series)] || [];
        if (!candidates.length) return null;
        return candidates.slice().sort(function (a, b) {
            var aUsed = usedParts[String(a.pn || '').toUpperCase()] ? 1 : 0;
            var bUsed = usedParts[String(b.pn || '').toUpperCase()] ? 1 : 0;
            if (aUsed !== bUsed) return aUsed - bUsed;
            return productScore(a, spec) - productScore(b, spec);
        })[0];
    }

    function inferSeries(sub) {
        var values = [];
        var text = [sub.description || ''].concat((sub.modules || []).map(function (module) {
            return (module.name || '') + '\n' + (module.desc || '');
        })).join('\n');
        var match;
        var pattern = /([A-Z][A-Z0-9]*(?:\([A-Z]\))?)\s*系列/g;
        while ((match = pattern.exec(text))) values.push(match[1]);
        return unique(values);
    }

    function isSupercapacitorSpec(spec) {
        var partKey = String(spec.pn || '').trim().toUpperCase();
        var indexedProduct = partKey ? productByPart[partKey] : null;
        if (indexedProduct && /超级电容/.test(String(indexedProduct.category || ''))) return true;
        return /^(SDA|SDB|SDH|SDL|SDM|SDN|SDS|SDV|SLA|SLD|SLR|SLX|SM)$/i.test(normalizedSeries(spec.series));
    }

    function fallbackSeries(template, pageKey) {
        if (template === 'supercapacitor') return ['SDH', 'SDL', 'SDN'];
        var pageDefaults = {
            automotive: ['VHT', 'VKM', 'NPX'],
            'ai-server': ['VHT', 'MPS', 'NPX'],
            robotics: ['VHT', 'VPG', 'NPX'],
            drone: ['VHT', 'VPX', 'MPD19'],
            motor: ['VHT', 'VPG', 'LKE'],
            consumer: ['LKM', 'NPX', 'VKM'],
            power: ['VPG', 'CW3H', 'NPX'],
            instrument: ['VKM', 'NPL', 'LKJ'],
            'energy-storage': ['CW3', 'MDP', 'VHT']
        };
        return pageDefaults[pageKey] || ['VHT', 'VKM', 'NPX'];
    }

    function resolveSpecs(sub, template, pageKey) {
        var sourceRows = rawSpecs(sub);
        sourceRows = sourceRows.filter(function (spec) {
            return template === 'supercapacitor' ? isSupercapacitorSpec(spec) : !isSupercapacitorSpec(spec);
        });
        if (!sourceRows.length) {
            sourceRows = inferSeries(sub).map(function (series) { return { series: series }; });
            sourceRows = sourceRows.filter(function (spec) {
                return template === 'supercapacitor' ? isSupercapacitorSpec(spec) : !isSupercapacitorSpec(spec);
            });
        }
        if (!sourceRows.length) {
            sourceRows = fallbackSeries(template, pageKey).map(function (series) { return { series: series }; });
        }

        var usedParts = {};
        var resolved = [];
        sourceRows.forEach(function (spec) {
            var confirmedPartKey = String(spec.pn || '').trim().toUpperCase();
            if (confirmedPartKey && validPartNumbers[confirmedPartKey]) {
                if (!usedParts[confirmedPartKey]) {
                    usedParts[confirmedPartKey] = true;
                    resolved.push(preserveConfirmedSpec(spec));
                }
                return;
            }
            var product = chooseProduct(spec, usedParts);
            if (!product) return;
            var partKey = String(product.pn || '').toUpperCase();
            if (!partKey || usedParts[partKey]) return;
            usedParts[partKey] = true;
            resolved.push(toDisplaySpec(product, spec));
        });

        if (resolved.length < 3) {
            fallbackSeries(template, pageKey).forEach(function (series) {
                if (resolved.length >= 3) return;
                var candidates = productsBySeries[normalizedSeries(series)] || [];
                candidates.some(function (product) {
                    var partKey = String(product.pn || '').toUpperCase();
                    if (!partKey || usedParts[partKey]) return false;
                    usedParts[partKey] = true;
                    resolved.push(toDisplaySpec(product, { series: series }));
                    return true;
                });
            });
        }
        return resolved;
    }

    function templateFor(tab, sub, preliminarySpecs) {
        var explicit = sub.template || tab.template || '';
        if (explicit === 'legacy') explicit = 'supercapacitor';
        if (explicit === 'supercapacitor' || explicit === 'electrolytic') return explicit;
        return 'electrolytic';
    }

    function currentLanguageQuery() {
        var params = new URLSearchParams(global.location.search);
        var language = params.get('lang');
        return language ? '&lang=' + encodeURIComponent(language) : '';
    }

    function templateVisual(template, sub) {
        var imageMap = global.YMIN.applicationTemplateImages || {};
        var image = sub.templateImage || imageMap[template] || '';
        var title = template === 'supercapacitor' ? '终端图片' : '电路拓扑图';
        var icon = template === 'supercapacitor' ? (sub.icon || 'photo') : 'account_tree';

        if (image) {
            return '<section class="mb-6" data-template-visual="' + template + '">' +
                '<div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-primary text-lg">' + escapeHtml(icon) + '</span><h4 class="text-sm font-bold text-primary">' + title + '</h4></div>' +
                '<div class="border border-slate-200 bg-slate-50 p-4 flex items-center justify-center min-h-64"><img src="' + escapeHtml(image) + '" alt="' + escapeHtml(sub.name + title) + '" class="block max-w-full max-h-[420px] object-contain"></div>' +
            '</section>';
        }

        return '<section class="mb-6" data-template-visual="' + template + '">' +
            '<div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-primary text-lg">' + escapeHtml(icon) + '</span><h4 class="text-sm font-bold text-primary">' + title + '</h4></div>' +
            '<div class="relative overflow-hidden border border-slate-200 bg-slate-50 min-h-64 flex items-center justify-center">' +
                '<div class="absolute inset-0 opacity-40" style="background-image:linear-gradient(#dbe4ef 1px,transparent 1px),linear-gradient(90deg,#dbe4ef 1px,transparent 1px);background-size:28px 28px"></div>' +
                '<div class="relative text-center px-6 py-10"><span class="material-symbols-outlined text-6xl text-slate-300">' + escapeHtml(icon) + '</span><p class="mt-3 text-sm font-bold text-primary">' + escapeHtml(sub.name) + '</p></div>' +
            '</div>' +
        '</section>';
    }

    function renderAdvantages(sub) {
        var modules = sub.modules || [];
        var intro = sub.description
            ? '<p class="text-xs text-slate-600 leading-6 border-l-2 border-primary pl-3 mb-4">' + formatDescription(sub.description) + '</p>'
            : '';
        var cards = modules.map(function (module, index) {
            return '<article class="border border-slate-200 bg-white p-4">' +
                '<div class="flex items-start gap-3"><span class="w-8 h-8 shrink-0 flex items-center justify-center bg-primary/10 text-primary"><span class="material-symbols-outlined text-lg">' + escapeHtml(module.icon || 'memory') + '</span></span>' +
                '<div class="min-w-0"><h5 class="text-sm font-bold text-primary">' + escapeHtml(module.name || ('关键位置 ' + (index + 1))) + '</h5>' +
                (module.desc ? '<p class="mt-2 text-xs leading-6 text-slate-600">' + formatDescription(module.desc) + '</p>' : '') +
                '</div></div></article>';
        }).join('');
        if (!intro && !cards) return '';
        return '<section class="mb-6" data-template-copy="advantages">' +
            '<h4 class="text-sm font-bold text-primary flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-base">verified</span>优势介绍</h4>' +
            intro + '<div class="grid grid-cols-1 gap-3">' + cards + '</div></section>';
    }

    function renderSupercapacitorDescription(sub) {
        var paragraphs = [];
        if (sub.description) paragraphs.push(sub.description);
        (sub.modules || []).forEach(function (module) {
            if (module.desc) paragraphs.push(module.desc);
        });
        paragraphs = unique(paragraphs);
        return '<section class="mb-6" data-template-copy="description">' +
            '<h4 class="text-sm font-bold text-primary flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-base">description</span>终端 / 模块描述</h4>' +
            '<div class="border-l-2 border-primary bg-slate-50 px-4 py-3 text-xs leading-6 text-slate-600">' +
                (paragraphs.length ? paragraphs.map(formatDescription).join('<br>') : escapeHtml(sub.name + '采用超级电容提供瞬时功率、短时备份或能量回收支持。')) +
            '</div></section>';
    }

    function hasValue(specs, key) {
        return specs.some(function (spec) { return String(spec[key] || '').trim() !== ''; });
    }

    function renderSpecTable(specs) {
        var columns = [
            { key: 'series', label: '系列', align: 'text-left', strong: true },
            { key: 'pn', label: '完整料号', align: 'text-left', part: true },
            { key: 'voltage', label: '电压', align: 'text-center' },
            { key: 'cap', label: '容量', align: 'text-center' },
            { key: 'temperature', label: '工作温度', align: 'text-center', optional: true },
            { key: 'life', label: '寿命', align: 'text-center', optional: true },
            { key: 'size', label: '尺寸', align: 'text-center', optional: true },
            { key: 'esr', label: 'ESR', align: 'text-center', optional: true },
            { key: 'ripple', label: '额定纹波电流', align: 'text-center', optional: true },
            { key: 'status', label: '全生命周期状态', align: 'text-center', optional: true }
        ].filter(function (column) { return !column.optional || hasValue(specs, column.key); });

        var head = columns.map(function (column) {
            return '<th class="sticky top-0 z-10 border border-slate-300 bg-slate-100 px-2 py-2 whitespace-nowrap ' + column.align + '">' + column.label + '</th>';
        }).join('');

        var body = specs.map(function (spec) {
            return '<tr class="hover:bg-slate-50" data-recommended-pn="' + escapeHtml(spec.pn) + '">' +
                columns.map(function (column) {
                    var value = spec[column.key] || '';
                    var content = escapeHtml(value || '—');
                    if (column.part && value) {
                        content = '<a href="product-detail.html?pn=' + encodeURIComponent(value) + currentLanguageQuery() + '" class="text-primary font-semibold hover:underline whitespace-nowrap">' + escapeHtml(value) + '</a>';
                    }
                    return '<td class="border border-slate-200 px-2 py-2 text-[11px] ' + column.align + ' ' + (column.strong ? 'font-bold text-primary' : 'text-slate-600') + '">' + content + '</td>';
                }).join('') +
            '</tr>';
        }).join('');

        return '<section data-template-specifications><div class="flex items-center justify-between gap-3 mb-3"><h4 class="text-sm font-bold text-primary flex items-center gap-2"><span class="material-symbols-outlined text-base">inventory_2</span>推荐规格</h4><span class="text-[10px] text-slate-400">' + specs.length + ' 个推荐料号</span></div>' +
            '<div class="max-h-[420px] overflow-auto border border-slate-200"><table class="w-full min-w-max text-xs border-collapse"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div></section>';
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
        var requestedTerminal = params.get('terminal');
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
        if (requestedTerminal && tabs[currentTabIndex]) {
            tabs[currentTabIndex].subApps.some(function (sub, index) {
                if (sub.name === requestedTerminal) {
                    currentSubIndex = index;
                    return true;
                }
                return false;
            });
        }

        function renderTabs() {
            tabContainer.innerHTML = tabs.map(function (tab, index) {
                var active = index === currentTabIndex ? 'tab-active' : 'text-slate-500 hover:text-primary';
                return '<button type="button" class="px-5 py-2 text-sm font-semibold transition-colors ' + active + '" data-collected-tab="' + index + '">' + escapeHtml(tab.name) + '</button>';
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
            if (label) label.textContent = '选择终端';
            subtabContainer.innerHTML = (tab.subApps || []).map(function (sub, index) {
                var active = index === currentSubIndex ? 'subtab-active' : 'text-slate-600 hover:bg-slate-100';
                return '<button type="button" class="w-full text-left px-3 py-2.5 text-xs font-medium transition-colors flex items-center gap-2 ' + active + '" data-collected-sub="' + index + '"><span class="material-symbols-outlined text-base">' + escapeHtml(sub.icon || tab.icon || page.icon) + '</span><span class="flex-1">' + escapeHtml(sub.name) + '</span><span class="material-symbols-outlined text-xs">chevron_right</span></button>';
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

            var preliminary = resolveSpecs(sub, sub.template || tab.template || 'electrolytic', options.pageKey);
            var template = templateFor(tab, sub, preliminary);
            var specs = resolveSpecs(sub, template, options.pageKey);
            var series = unique(specs.map(function (spec) { return spec.series; }));
            var html = '<div data-application-template="' + template + '">' +
                '<div class="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-5">' +
                    '<div class="flex items-start gap-3"><span class="w-10 h-10 flex items-center justify-center bg-primary/10 text-primary shrink-0"><span class="material-symbols-outlined text-2xl">' + escapeHtml(sub.icon || tab.icon || page.icon) + '</span></span><div><h3 class="text-xl font-bold text-primary">' + escapeHtml(sub.name) + '</h3><p class="text-xs text-slate-500 mt-1">' + escapeHtml(tab.name) + ' · ' + specs.length + ' 个推荐料号</p></div></div>' +
                    (series.length ? '<div class="text-[10px] text-slate-500 md:text-right">推荐系列<br><strong class="text-primary text-xs">' + escapeHtml(series.join('、')) + '</strong></div>' : '') +
                '</div>' +
                templateVisual(template, sub) +
                (template === 'supercapacitor' ? renderSupercapacitorDescription(sub) : renderAdvantages(sub)) +
                renderSpecTable(specs) +
            '</div>';
            contentContainer.innerHTML = html;

            lastAudit = {
                pageKey: options.pageKey,
                tab: tab.name,
                terminal: sub.name,
                template: template,
                recommendedParts: specs.map(function (spec) { return spec.pn; })
            };
        }

        function renderAll() {
            renderTabs();
            renderSubTabs();
            renderContent();
        }

        renderAll();
    }

    global.YMIN.applicationCollectedPage = {
        init: init,
        getAudit: function () { return lastAudit; }
    };
})(window);
