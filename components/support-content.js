var YMIN = window.YMIN || {};

YMIN.supportContent = (function () {
    'use strict';

    var dataCache = {};
    var powerApplicationLabel = '三代半导体电源（GaN&SiC）';
    var applicationOrder = [
        '汽车电子',
        'AI服务器与数据中心',
        '仪器仪表',
        '新型电机驱动',
        powerApplicationLabel,
        '机器人',
        '无人机',
        '光储充（光伏储能充电）',
        '消费类电子'
    ];
    var applicationIcons = {
        '汽车电子': 'directions_car',
        'AI服务器与数据中心': 'dns',
        '仪器仪表': 'speed',
        '新型电机驱动': 'electric_bolt',
        '三代半导体电源（GaN&SiC）': 'power',
        '机器人': 'smart_toy',
        '无人机': 'flight',
        '光储充（光伏储能充电）': 'solar_power',
        '消费类电子': 'devices'
    };
    var faqProductLineOrder = [
        '液态铝电解电容器',
        '高分子固态铝电解电容器',
        '高分子混合动力铝电解电容器',
        '双电层超级电容',
        '混合型超级电容（锂离子电容）',
        '叠层高分子固态铝电解电容器',
        '导电高分子钽电解电容器',
        '薄膜电容器'
    ];
    var faqSeriesProductLineMap = {
        'CW3H': '液态铝电解电容器',
        'CW6': '液态铝电解电容器',
        'CW6H': '液态铝电解电容器',
        'IDC3': '液态铝电解电容器',
        'KCG': '液态铝电解电容器',
        'KCM': '液态铝电解电容器',
        'KCX': '液态铝电解电容器',
        'LK': '液态铝电解电容器',
        'LKF': '液态铝电解电容器',
        'LKG': '液态铝电解电容器',
        'LKL(R)': '液态铝电解电容器',
        'LKM': '液态铝电解电容器',
        'LKZ': '液态铝电解电容器',
        'LMM': '液态铝电解电容器',
        'NPX': '高分子固态铝电解电容器',
        'NGY': '高分子混合动力铝电解电容器',
        'NHX': '高分子混合动力铝电解电容器',
        'VHT': '高分子混合动力铝电解电容器',
        'VHU': '高分子混合动力铝电解电容器',
        'SDF': '双电层超级电容',
        'SDM': '双电层超级电容',
        'SDN': '双电层超级电容',
        'SLF': '混合型超级电容（锂离子电容）',
        'MPS': '叠层高分子固态铝电解电容器',
        'TQD': '导电高分子钽电解电容器',
        'TQW': '导电高分子钽电解电容器'
    };
    var searchAliases = {
        '固液混合': '混合',
        '混合型': '混合',
        'ai服务器': '数据中心',
        'ai': '服务器',
        '三代半导体电源': '电源',
        'gan': '电源',
        'sic': '电源',
        '储能': '光储充',
        '充电桩': '光储充',
        '法拉': '超级电容',
        '寿命计算': '寿命',
        '贴片': 'smd',
        '引线': 'lead'
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function htmlText(value) {
        return escapeHtml(value).replace(/\n/g, '<br>');
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

    function normalizeApplication(value) {
        var name = String(value || '').trim();
        return name === '电源' ? powerApplicationLabel : name;
    }

    function applicationValues(item) {
        return unique((item.applications || []).map(normalizeApplication));
    }

    function flattenText(value) {
        if (Array.isArray(value)) return value.join(' ');
        return value == null ? '' : String(value);
    }

    function normalizeSearch(value) {
        var text = String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
        Object.keys(searchAliases).forEach(function (alias) {
            if (text.indexOf(alias) !== -1) text += ' ' + searchAliases[alias];
        });
        return text;
    }

    function matchesSearch(needle, values) {
        if (!needle) return true;
        var haystack = normalizeSearch(values.map(flattenText).join(' '));
        return needle.split(/\s+/).every(function (term) {
            return haystack.indexOf(term) !== -1;
        });
    }

    function faqProductLines(faq) {
        var directLines = faq.productLines || faq.productLine || [];
        if (!Array.isArray(directLines)) directLines = [directLines];
        directLines = unique(directLines);
        if (directLines.length) return directLines;
        return unique((faq.series || []).map(function (series) {
            return faqSeriesProductLineMap[series] || '';
        }));
    }

    function queryValue(name) {
        return new URLSearchParams(window.location.search).get(name) || '';
    }

    function setQuery(params, replace) {
        var current = new URLSearchParams(window.location.search);
        Object.keys(params).forEach(function (key) {
            var value = params[key];
            if (value) current.set(key, value);
            else current.delete(key);
        });
        var url = window.location.pathname + (current.toString() ? '?' + current.toString() : '');
        window.history[replace ? 'replaceState' : 'pushState']({}, '', url);
    }

    function loadData(kind) {
        if (dataCache[kind]) return Promise.resolve(dataCache[kind]);
        var path = kind === 'articles' ? 'data/support-articles.json' : 'data/support-faqs.json';
        return fetch(path, { cache: 'no-store' })
            .then(function (response) {
                if (!response.ok) throw new Error('数据读取失败');
                return response.json();
            })
            .then(function (payload) {
                dataCache[kind] = payload.items || payload;
                return dataCache[kind];
            });
    }

    function showError(container, title) {
        if (!container) return;
        container.innerHTML =
            '<div class="support-empty">' +
                '<span class="material-symbols-outlined">error</span>' +
                '<h3>' + escapeHtml(title || '内容暂时无法读取') + '</h3>' +
                '<p>请刷新页面重试，或返回服务支持首页。</p>' +
            '</div>';
    }

    function renderTags(values, className, limit) {
        return unique(values || []).slice(0, limit || 5).map(function (value) {
            return '<span class="' + className + '">' + escapeHtml(value) + '</span>';
        }).join('');
    }

    function formatDate(value) {
        if (!value) return '';
        var parts = String(value).split('-');
        if (parts.length !== 3) return value;
        return parts[0] + '.' + parts[1] + '.' + parts[2];
    }

    function renderPagination(container, total, page, size, onChange) {
        if (!container) return;
        var pages = Math.ceil(total / size);
        if (pages <= 1) {
            container.innerHTML = '';
            return;
        }
        var start = Math.max(1, page - 2);
        var end = Math.min(pages, start + 4);
        start = Math.max(1, end - 4);
        var html = '<button class="support-page-button" data-page="' + (page - 1) + '" ' +
            (page === 1 ? 'disabled' : '') + '>上一页</button>';
        for (var i = start; i <= end; i += 1) {
            html += '<button class="support-page-button ' + (i === page ? 'is-active' : '') +
                '" data-page="' + i + '">' + i + '</button>';
        }
        html += '<button class="support-page-button" data-page="' + (page + 1) + '" ' +
            (page === pages ? 'disabled' : '') + '>下一页</button>';
        container.innerHTML = html;
        container.onclick = function (event) {
            var button = event.target.closest('[data-page]');
            if (!button || button.disabled) return;
            onChange(Number(button.dataset.page));
        };
    }

    function injectShell() {
        if (YMIN.navbar) YMIN.navbar.inject('support');
        if (YMIN.footer) YMIN.footer.inject();
    }

    function populateCounts(faqs, articles) {
        document.querySelectorAll('[data-faq-count]').forEach(function (node) {
            node.textContent = faqs.length;
        });
        document.querySelectorAll('[data-article-count]').forEach(function (node) {
            node.textContent = articles.length;
        });
    }

    function initHub() {
        Promise.all([loadData('faqs'), loadData('articles')]).then(function (sets) {
            populateCounts(sets[0], sets[1]);
        });
    }

    function initFaqList() {
        var resultNode = document.getElementById('faq-results');
        var countNode = document.getElementById('faq-count');
        var paginationNode = document.getElementById('faq-pagination');
        var searchInput = document.getElementById('support-global-search');
        var searchButton = document.getElementById('faq-search-button');
        var appSelect = document.getElementById('faq-app-select');
        var productLineSelect = document.getElementById('faq-product-line-select');
        var typeNode = document.getElementById('faq-type-chips');
        var appButtons = document.getElementById('faq-app-buttons');
        var resetButton = document.getElementById('faq-reset');
        var activeNode = document.getElementById('faq-active-filters');
        var state = {
            search: queryValue('q'),
            app: normalizeApplication(queryValue('app')),
            productLine: queryValue('line'),
            type: queryValue('type'),
            page: Math.max(1, Number(queryValue('page')) || 1)
        };
        var pageSize = 8;

        Promise.all([loadData('faqs'), loadData('articles')]).then(function (sets) {
            var faqs = sets[0];
            var articles = sets[1];
            populateCounts(faqs, articles);
            var articleMap = {};
            articles.forEach(function (article) { articleMap[article.id] = article; });

            var applications = applicationOrder.slice();
            var types = unique(faqs.map(function (item) { return item.type; }));

            appSelect.innerHTML = '<option value="">全部应用</option>' + applications.map(function (app) {
                return '<option value="' + escapeHtml(app) + '">' + escapeHtml(app) + '</option>';
            }).join('');
            productLineSelect.innerHTML = '<option value="">全部产品线</option>' + faqProductLineOrder.map(function (name) {
                return '<option value="' + escapeHtml(name) + '">' + escapeHtml(name) + '</option>';
            }).join('');
            typeNode.innerHTML =
                '<button class="support-chip" data-type="">全部</button>' +
                types.map(function (type) {
                    return '<button class="support-chip" data-type="' + escapeHtml(type) + '">' +
                        escapeHtml(type) + '</button>';
                }).join('');
            appButtons.innerHTML = applications.map(function (app) {
                return '<button class="support-app-button" data-app="' + escapeHtml(app) + '">' +
                    '<span class="material-symbols-outlined">' +
                        (applicationIcons[app] || 'category') +
                    '</span><span>' + escapeHtml(app) + '</span></button>';
            }).join('');

            searchInput.value = state.search;
            appSelect.value = state.app;
            productLineSelect.value = state.productLine;

            function updateControls() {
                appSelect.value = state.app;
                productLineSelect.value = state.productLine;
                typeNode.querySelectorAll('[data-type]').forEach(function (button) {
                    button.classList.toggle('is-active', button.dataset.type === state.type);
                });
                appButtons.querySelectorAll('[data-app]').forEach(function (button) {
                    button.classList.toggle('is-active', button.dataset.app === state.app);
                });
            }

            function render() {
                var needle = normalizeSearch(state.search);
                var filtered = faqs.filter(function (faq) {
                    return (!state.app || applicationValues(faq).indexOf(state.app) !== -1) &&
                        (!state.productLine || faqProductLines(faq).indexOf(state.productLine) !== -1) &&
                        (!state.type || faq.type === state.type) &&
                        matchesSearch(needle, [
                            faq.question,
                            faq.answer,
                            faq.type,
                            faqProductLines(faq),
                            faq.series,
                            applicationValues(faq),
                            faq.secondaryApplications
                        ]);
                });
                var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
                state.page = Math.min(state.page, pages);
                var visible = filtered.slice((state.page - 1) * pageSize, state.page * pageSize);
                countNode.innerHTML = '共找到 <strong>' + filtered.length + '</strong> 条解答';
                activeNode.innerHTML = [
                    state.search ? '关键词：' + state.search : '',
                    state.app,
                    state.productLine ? '产品线：' + state.productLine : '',
                    state.type
                ].filter(Boolean).map(function (value) {
                    return '<span class="support-active-filter">' + escapeHtml(value) + '</span>';
                }).join('');
                if (!visible.length) {
                    resultNode.innerHTML =
                        '<div class="support-empty"><span class="material-symbols-outlined">search_off</span>' +
                        '<h3>没有找到匹配的解答</h3><p>试试更短的关键词，或清除部分筛选条件。</p></div>';
                } else {
                    resultNode.innerHTML = visible.map(function (faq) {
                        var article = articleMap[faq.articleId];
                        return '<article class="faq-item" data-faq="' + escapeHtml(faq.id) + '">' +
                            '<button class="faq-question" aria-expanded="false">' +
                                '<span class="faq-mark">Q</span>' +
                                '<span><h3>' + escapeHtml(faq.question) + '</h3>' +
                                '<span class="faq-tags">' +
                                    renderTags([faq.type].concat(applicationValues(faq), faq.series || []), 'faq-tag', 5) +
                                '</span></span>' +
                                '<span class="material-symbols-outlined faq-toggle">expand_more</span>' +
                            '</button>' +
                            '<div class="faq-answer">' +
                                '<div class="faq-answer-inner">' + htmlText(faq.answer) +
                                    '<div class="faq-answer-actions">' +
                                        '<a class="support-text-link" href="support-faq-detail.html?id=' +
                                            encodeURIComponent(faq.id) + '">查看完整解答' +
                                            '<span class="material-symbols-outlined">arrow_forward</span></a>' +
                                        (article ? '<a class="support-text-link" href="support-news-detail.html?id=' +
                                            encodeURIComponent(article.id) + '">阅读相关技术文章' +
                                            '<span class="material-symbols-outlined">north_east</span></a>' : '') +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</article>';
                    }).join('');
                }
                renderPagination(paginationNode, filtered.length, state.page, pageSize, function (page) {
                    state.page = page;
                    sync(false);
                    render();
                    resultNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                updateControls();
            }

            function sync(replace) {
                setQuery({
                    q: state.search,
                    app: state.app,
                    line: state.productLine,
                    series: '',
                    type: state.type,
                    page: state.page > 1 ? state.page : ''
                }, replace);
            }

            function search() {
                state.search = searchInput.value.trim();
                state.page = 1;
                sync(false);
                render();
            }

            searchButton.onclick = search;
            searchInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') search();
            });
            appSelect.onchange = function () {
                state.app = this.value;
                state.page = 1;
                sync(false);
                render();
            };
            productLineSelect.onchange = function () {
                state.productLine = this.value;
                state.page = 1;
                sync(false);
                render();
            };
            typeNode.onclick = function (event) {
                var button = event.target.closest('[data-type]');
                if (!button) return;
                state.type = button.dataset.type;
                state.page = 1;
                sync(false);
                render();
            };
            appButtons.onclick = function (event) {
                var button = event.target.closest('[data-app]');
                if (!button) return;
                state.app = state.app === button.dataset.app ? '' : button.dataset.app;
                state.page = 1;
                sync(false);
                render();
            };
            resetButton.onclick = function () {
                state = { search: '', app: '', productLine: '', type: '', page: 1 };
                searchInput.value = '';
                sync(false);
                render();
            };
            resultNode.onclick = function (event) {
                var question = event.target.closest('.faq-question');
                if (!question) return;
                var item = question.closest('.faq-item');
                var open = !item.classList.contains('is-open');
                item.classList.toggle('is-open', open);
                question.setAttribute('aria-expanded', String(open));
            };
            window.addEventListener('popstate', function () { window.location.reload(); });
            render();
        }).catch(function () {
            showError(resultNode);
        });
    }

    function faqTools(faq) {
        var text = normalizeSearch([faq.question, faq.answer, faq.type].join(' '));
        var tools = [];
        if (text.indexOf('寿命') !== -1 || text.indexOf('温度') !== -1) {
            tools.push({
                href: 'design-life-calc.html',
                title: '电容寿命计算工具',
                note: '按实际工况估算电容使用寿命'
            });
        }
        if (text.indexOf('尺寸') !== -1 || text.indexOf('安装') !== -1 ||
            text.indexOf('空间') !== -1 || text.indexOf('封装') !== -1) {
            tools.push({
                href: 'design-3d-cad.html',
                title: '3D-CAD 数据下载',
                note: '核对器件尺寸并下载 CAD 模型'
            });
        }
        tools.push({
            href: 'product-center.html',
            title: '产品中心',
            note: '按参数、系列和应用继续筛选'
        });
        tools.push({
            href: 'support-download.html',
            title: '下载中心',
            note: '查找规格书、目录和应用资料'
        });
        return tools.slice(0, 4);
    }

    function initFaqDetail() {
        var mainNode = document.getElementById('faq-detail-content');
        var asideNode = document.getElementById('faq-detail-aside');
        var faqId = queryValue('id');
        Promise.all([loadData('faqs'), loadData('articles')]).then(function (sets) {
            var faqs = sets[0];
            var articles = sets[1];
            var faq = faqs.find(function (item) { return item.id === faqId; });
            if (!faq) {
                showError(mainNode, '未找到这条FAQ');
                return;
            }
            var relatedArticle = articles.find(function (item) { return item.id === faq.articleId; });
            var relatedFaqs = faqs.filter(function (item) {
                if (item.id === faq.id) return false;
                var sameSeries = (item.series || []).some(function (name) {
                    return (faq.series || []).indexOf(name) !== -1;
                });
                var sameApp = applicationValues(item).some(function (name) {
                    return applicationValues(faq).indexOf(name) !== -1;
                });
                return sameSeries || sameApp;
            }).slice(0, 4);
            var tools = faqTools(faq);
            document.title = faq.question + ' - 永铭电子FAQ';

            mainNode.innerHTML =
                '<div class="support-detail-eyebrow">FAQ · ' + escapeHtml(faq.type || '技术问答') + '</div>' +
                '<h1>' + escapeHtml(faq.question) + '</h1>' +
                '<div class="support-detail-meta">' +
                    '<span><span class="material-symbols-outlined">calendar_month</span>' +
                        escapeHtml(formatDate(faq.date)) + '</span>' +
                    '<span><span class="material-symbols-outlined">tag</span>' +
                        escapeHtml((faq.series || []).join(' / ') || '通用') + '</span>' +
                '</div>' +
                '<div class="faq-tags">' +
                    renderTags([faq.type].concat(applicationValues(faq), faq.series || []), 'faq-tag', 8) +
                '</div>' +
                '<div class="faq-detail-answer">' + htmlText(faq.answer) + '</div>' +
                (relatedArticle ?
                    '<section class="support-detail-section"><h2>相关技术文章</h2>' +
                        '<a class="support-link-card" href="support-news-detail.html?id=' +
                        encodeURIComponent(relatedArticle.id) + '">' +
                        '<strong>' + escapeHtml(relatedArticle.title) + '</strong>' +
                        '<small>' + escapeHtml(relatedArticle.excerpt || '查看完整技术说明与产品应用') + '</small>' +
                        '</a></section>' : '') +
                '<section class="support-detail-section"><div class="support-feedback" id="faq-feedback">' +
                    '<span>这条解答是否解决了您的问题？</span>' +
                    '<button data-feedback="yes">有帮助</button>' +
                    '<button data-feedback="no">仍需帮助</button>' +
                '</div></section>';

            asideNode.innerHTML =
                '<div class="support-aside-block"><h3>适用范围</h3>' +
                    '<div class="article-tags">' +
                        renderTags(applicationValues(faq).concat(faq.secondaryApplications || [], faq.series || []),
                            'article-tag', 10) +
                    '</div></div>' +
                '<div class="support-aside-block"><h3>推荐工具</h3><div class="support-link-list">' +
                    tools.map(function (tool) {
                        return '<a class="support-link-card" href="' + tool.href + '">' +
                            '<strong>' + escapeHtml(tool.title) + '</strong>' +
                            '<small>' + escapeHtml(tool.note) + '</small></a>';
                    }).join('') +
                '</div></div>' +
                (relatedFaqs.length ? '<div class="support-aside-block"><h3>相关问题</h3>' +
                    '<div class="support-link-list">' +
                    relatedFaqs.map(function (item) {
                        return '<a class="support-link-card" href="support-faq-detail.html?id=' +
                            encodeURIComponent(item.id) + '"><strong>' +
                            escapeHtml(item.question) + '</strong></a>';
                    }).join('') + '</div></div>' : '');

            var feedback = document.getElementById('faq-feedback');
            feedback.onclick = function (event) {
                var button = event.target.closest('[data-feedback]');
                if (!button) return;
                feedback.querySelectorAll('button').forEach(function (item) {
                    item.classList.toggle('is-selected', item === button);
                });
                feedback.querySelector('span').textContent =
                    button.dataset.feedback === 'yes' ? '感谢反馈，这将帮助我们持续优化知识库。' :
                        '已记录反馈，您也可以通过页面底部联系方式获得人工支持。';
            };
            addStructuredData({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [{
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: { '@type': 'Answer', text: faq.answer }
                }]
            });
        }).catch(function () {
            showError(mainNode);
        });
    }

    function newsPlaceholder(item) {
        var initials = (item.series || []).slice(0, 3).join(' · ') || 'YMIN';
        return '<div class="news-card-media"><div style="height:100%;display:grid;place-items:center;color:#fff;' +
            'font:700 18px/1.4 Space Grotesk,sans-serif;letter-spacing:.08em;text-align:center;padding:24px">' +
            escapeHtml(initials) + '</div></div>';
    }

    function newsMedia(item, featured) {
        var className = featured ? 'news-featured-media' : 'news-card-media';
        if (item.coverImage) {
            return '<div class="' + className + '"><img src="' + escapeHtml(item.coverImage) +
                '" alt="' + escapeHtml(item.title) + '" loading="lazy"></div>';
        }
        if (featured) {
            var series = (item.series || []).slice(0, 4).join(' · ') || 'YMIN';
            return '<div class="' + className + '"><div style="height:100%;display:grid;place-items:center;color:#fff;' +
                'font:700 21px/1.5 Space Grotesk,sans-serif;letter-spacing:.08em;text-align:center;padding:30px">' +
                escapeHtml(series) + '</div></div>';
        }
        return newsPlaceholder(item);
    }

    function initNewsList() {
        var featuredNode = document.getElementById('news-featured');
        var resultNode = document.getElementById('news-results');
        var countNode = document.getElementById('news-count');
        var paginationNode = document.getElementById('news-pagination');
        var searchInput = document.getElementById('news-search');
        var searchButton = document.getElementById('news-search-button');
        var appSelect = document.getElementById('news-app-select');
        var seriesInput = document.getElementById('news-series-input');
        var typeNode = document.getElementById('news-type-tabs');
        var resetButton = document.getElementById('news-reset');
        var activeNode = document.getElementById('news-active-filters');
        var state = {
            search: queryValue('q'),
            app: normalizeApplication(queryValue('app')),
            series: queryValue('series'),
            type: queryValue('type'),
            page: Math.max(1, Number(queryValue('page')) || 1)
        };
        var pageSize = 8;

        Promise.all([loadData('articles'), loadData('faqs')]).then(function (sets) {
            var articles = sets[0].slice().sort(function (a, b) {
                return String(b.date || '').localeCompare(String(a.date || ''));
            });
            var faqs = sets[1];
            populateCounts(faqs, articles);
            var featured = articles.find(function (item) { return item.coverImage; }) || articles[0];
            var applications = applicationOrder.slice();
            var types = unique(articles.map(function (item) { return item.type; }));

            featuredNode.innerHTML =
                newsMedia(featured, true) +
                '<div class="news-featured-copy"><span class="news-type">' +
                    escapeHtml(featured.type || '技术文章') + '</span>' +
                    '<h2>' + escapeHtml(featured.title) + '</h2>' +
                    '<p>' + escapeHtml(featured.excerpt || '') + '</p>' +
                    '<a class="support-text-link" href="support-news-detail.html?id=' +
                        encodeURIComponent(featured.id) + '">阅读完整内容' +
                        '<span class="material-symbols-outlined">arrow_forward</span></a>' +
                '</div>';
            appSelect.innerHTML = '<option value="">全部应用</option>' + applications.map(function (app) {
                return '<option value="' + escapeHtml(app) + '">' + escapeHtml(app) + '</option>';
            }).join('');
            typeNode.innerHTML =
                '<button class="support-chip" data-type="">全部</button>' +
                types.map(function (type) {
                    return '<button class="support-chip" data-type="' + escapeHtml(type) + '">' +
                        escapeHtml(type) + '</button>';
                }).join('');
            searchInput.value = state.search;
            appSelect.value = state.app;
            seriesInput.value = state.series;

            function sync(replace) {
                setQuery({
                    q: state.search,
                    app: state.app,
                    series: state.series,
                    type: state.type,
                    page: state.page > 1 ? state.page : ''
                }, replace);
            }

            function updateControls() {
                appSelect.value = state.app;
                seriesInput.value = state.series;
                typeNode.querySelectorAll('[data-type]').forEach(function (button) {
                    button.classList.toggle('is-active', button.dataset.type === state.type);
                });
            }

            function render() {
                var needle = normalizeSearch(state.search);
                var filtered = articles.filter(function (article) {
                    var seriesText = normalizeSearch(state.series);
                    return (!state.app || applicationValues(article).indexOf(state.app) !== -1) &&
                        (!state.type || article.type === state.type) &&
                        (!seriesText || normalizeSearch((article.series || []).join(' ')).indexOf(seriesText) !== -1) &&
                        matchesSearch(needle, [
                            article.title,
                            article.excerpt,
                            article.plainText,
                            article.series,
                            applicationValues(article),
                            article.secondaryApplications,
                            article.keywords,
                            article.partNumbers
                        ]);
                });
                var pages = Math.max(1, Math.ceil(filtered.length / pageSize));
                state.page = Math.min(state.page, pages);
                var visible = filtered.slice((state.page - 1) * pageSize, state.page * pageSize);
                countNode.innerHTML = '共找到 <strong>' + filtered.length + '</strong> 篇内容';
                activeNode.innerHTML = [
                    state.search ? '关键词：' + state.search : '',
                    state.app,
                    state.series ? '系列：' + state.series : '',
                    state.type
                ].filter(Boolean).map(function (value) {
                    return '<span class="support-active-filter">' + escapeHtml(value) + '</span>';
                }).join('');
                if (!visible.length) {
                    resultNode.innerHTML =
                        '<div class="support-empty"><span class="material-symbols-outlined">search_off</span>' +
                        '<h3>没有找到匹配内容</h3><p>请尝试产品系列、应用名称或更简短的关键词。</p></div>';
                } else {
                    resultNode.innerHTML = visible.map(function (article) {
                        return '<article class="news-card">' +
                            newsMedia(article, false) +
                            '<div class="news-card-body">' +
                                '<div class="news-card-meta"><span class="news-type">' +
                                    escapeHtml(article.type || '技术文章') + '</span><span>' +
                                    escapeHtml(formatDate(article.date)) + '</span></div>' +
                                '<h3><a href="support-news-detail.html?id=' +
                                    encodeURIComponent(article.id) + '">' +
                                    escapeHtml(article.title) + '</a></h3>' +
                                '<p>' + escapeHtml(article.excerpt || '') + '</p>' +
                                '<div class="article-tags">' +
                                    renderTags(applicationValues(article).concat(article.series || []),
                                        'article-tag', 5) +
                                '</div>' +
                            '</div>' +
                        '</article>';
                    }).join('');
                }
                renderPagination(paginationNode, filtered.length, state.page, pageSize, function (page) {
                    state.page = page;
                    sync(false);
                    render();
                    resultNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
                updateControls();
            }

            function search() {
                state.search = searchInput.value.trim();
                state.page = 1;
                sync(false);
                render();
            }

            searchButton.onclick = search;
            searchInput.addEventListener('keydown', function (event) {
                if (event.key === 'Enter') search();
            });
            appSelect.onchange = function () {
                state.app = this.value;
                state.page = 1;
                sync(false);
                render();
            };
            seriesInput.addEventListener('change', function () {
                state.series = this.value.trim();
                state.page = 1;
                sync(false);
                render();
            });
            typeNode.onclick = function (event) {
                var button = event.target.closest('[data-type]');
                if (!button) return;
                state.type = button.dataset.type;
                state.page = 1;
                sync(false);
                render();
            };
            resetButton.onclick = function () {
                state = { search: '', app: '', series: '', type: '', page: 1 };
                searchInput.value = '';
                seriesInput.value = '';
                sync(false);
                render();
            };
            window.addEventListener('popstate', function () { window.location.reload(); });
            render();
        }).catch(function () {
            showError(resultNode);
        });
    }

    function addStructuredData(data) {
        var script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
    }

    function initNewsDetail() {
        var mainNode = document.getElementById('news-detail-content');
        var asideNode = document.getElementById('news-detail-aside');
        var navNode = document.getElementById('news-detail-nav');
        var articleId = queryValue('id');
        Promise.all([loadData('articles'), loadData('faqs')]).then(function (sets) {
            var articles = sets[0].slice().sort(function (a, b) {
                return String(b.date || '').localeCompare(String(a.date || ''));
            });
            var faqs = sets[1];
            var article = articles.find(function (item) { return item.id === articleId; });
            if (!article) {
                showError(mainNode, '未找到这篇文章');
                return;
            }
            var relatedFaqs = faqs.filter(function (item) {
                return item.articleId === article.id || (article.faqIds || []).indexOf(item.id) !== -1;
            }).slice(0, 6);
            var relatedArticles = articles.filter(function (item) {
                if (item.id === article.id) return false;
                var sameSeries = (item.series || []).some(function (name) {
                    return (article.series || []).indexOf(name) !== -1;
                });
                var sameApp = applicationValues(item).some(function (name) {
                    return applicationValues(article).indexOf(name) !== -1;
                });
                return sameSeries || sameApp;
            }).slice(0, 4);
            var index = articles.indexOf(article);
            var previous = articles[index + 1];
            var next = articles[index - 1];
            document.title = article.title + ' - 永铭电子';
            var description = article.seoDescription || article.excerpt || '';
            var metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) metaDescription.setAttribute('content', description);

            mainNode.innerHTML =
                '<div class="support-detail-eyebrow">' + escapeHtml(article.type || '技术文章') + '</div>' +
                '<h1>' + escapeHtml(article.title) + '</h1>' +
                '<div class="support-detail-meta">' +
                    '<span><span class="material-symbols-outlined">calendar_month</span>' +
                        escapeHtml(formatDate(article.date)) + '</span>' +
                    '<span><span class="material-symbols-outlined">inventory_2</span>' +
                        escapeHtml((article.series || []).join(' / ') || '通用') + '</span>' +
                '</div>' +
                '<div class="article-tags">' +
                    renderTags(applicationValues(article).concat(article.series || []), 'article-tag', 10) +
                '</div>' +
                (article.excerpt ? '<div class="article-summary">' + escapeHtml(article.excerpt) + '</div>' : '') +
                '<div class="article-body">' + (article.contentHtml || '<p>' + htmlText(article.plainText) + '</p>') + '</div>' +
                '<section class="support-detail-section"><div class="support-feedback">' +
                    '<span>本文内容来自永铭官网原文，产品选型请以最新规格书为准。</span>' +
                    '<a class="support-text-link" target="_blank" rel="noopener" href="' +
                        escapeHtml(article.sourceUrl) + '">查看原始页面' +
                        '<span class="material-symbols-outlined">north_east</span></a>' +
                '</div></section>';

            asideNode.innerHTML =
                '<div class="support-aside-block"><h3>文章索引</h3><div class="article-tags">' +
                    renderTags(applicationValues(article).concat(article.secondaryApplications || [],
                        article.series || []), 'article-tag', 12) +
                '</div></div>' +
                (relatedFaqs.length ? '<div class="support-aside-block"><h3>相关FAQ</h3>' +
                    '<div class="support-link-list">' +
                    relatedFaqs.map(function (faq) {
                        return '<a class="support-link-card" href="support-faq-detail.html?id=' +
                            encodeURIComponent(faq.id) + '"><strong>' +
                            escapeHtml(faq.question) + '</strong><small>' +
                            escapeHtml(faq.type || '技术问答') + '</small></a>';
                    }).join('') + '</div></div>' : '') +
                (relatedArticles.length ? '<div class="support-aside-block"><h3>相关阅读</h3>' +
                    '<div class="support-link-list">' +
                    relatedArticles.map(function (item) {
                        return '<a class="support-link-card" href="support-news-detail.html?id=' +
                            encodeURIComponent(item.id) + '"><strong>' +
                            escapeHtml(item.title) + '</strong><small>' +
                            escapeHtml(formatDate(item.date)) + '</small></a>';
                    }).join('') + '</div></div>' : '');

            navNode.innerHTML =
                (previous ? '<a class="support-link-card" href="support-news-detail.html?id=' +
                    encodeURIComponent(previous.id) + '"><small>上一篇</small><strong>' +
                    escapeHtml(previous.title) + '</strong></a>' : '<span></span>') +
                (next ? '<a class="support-link-card" href="support-news-detail.html?id=' +
                    encodeURIComponent(next.id) + '"><small>下一篇</small><strong>' +
                    escapeHtml(next.title) + '</strong></a>' : '');

            addStructuredData({
                '@context': 'https://schema.org',
                '@type': 'NewsArticle',
                headline: article.title,
                datePublished: article.date,
                description: description,
                image: article.coverImage || undefined,
                author: { '@type': 'Organization', name: '上海永铭电子股份有限公司' },
                publisher: { '@type': 'Organization', name: '上海永铭电子股份有限公司' }
            });
        }).catch(function () {
            showError(mainNode);
        });
    }

    function init() {
        injectShell();
        var page = document.body.dataset.supportPage;
        if (page === 'hub') initHub();
        if (page === 'faq-list') initFaqList();
        if (page === 'faq-detail') initFaqDetail();
        if (page === 'news-list') initNewsList();
        if (page === 'news-detail') initNewsDetail();
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', function () {
    YMIN.supportContent.init();
});
