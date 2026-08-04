(function () {
    'use strict';

    var data = window.YMIN_ABOUT_DATA || {};

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderStats() {
        document.querySelectorAll('[data-about-stats]').forEach(function (mount) {
            mount.innerHTML = (data.stats || []).map(function (item) {
                return '<div class="about-stat"><strong>' + escapeHtml(item.value) + '</strong><span>' + escapeHtml(item.label) + '</span></div>';
            }).join('');
        });
    }

    function renderProductLines() {
        document.querySelectorAll('[data-product-lines]').forEach(function (mount) {
            mount.innerHTML = (data.productLines || []).map(function (item) {
                return '<article class="about-line-card about-card"><h3>' + escapeHtml(item.name) + '</h3><p>' + escapeHtml(item.description) + '</p></article>';
            }).join('');
        });
    }

    function renderHistory() {
        var mount = document.querySelector('[data-company-history]');
        if (!mount) return;
        mount.innerHTML = (data.history || []).map(function (item) {
            return '<article class="about-timeline-item"><span class="about-timeline-year">' + escapeHtml(item.year) + '</span><h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.description) + '</p></article>';
        }).join('');
    }

    function initHonors() {
        var grid = document.querySelector('[data-honor-grid]');
        if (!grid) return;
        var tabs = document.querySelector('[data-honor-filters]');
        var current = '全部';

        function render() {
            var list = (data.honors || []).filter(function (item) {
                return current === '全部' || item.category === current;
            });
            grid.innerHTML = list.map(function (item) {
                return '<article class="honor-card" data-honor-category="' + escapeHtml(item.category) + '">' +
                    '<button class="honor-image-button" type="button" data-lightbox-image="' + escapeHtml(item.image) + '" data-lightbox-alt="' + escapeHtml(item.title) + '">' +
                    '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy"></button>' +
                    '<div class="honor-card-body"><span class="honor-tag">' + escapeHtml(item.category) + '</span>' +
                    '<h3>' + escapeHtml(item.title) + '</h3><div class="honor-meta">' +
                    '<span>颁发单位：' + escapeHtml(item.issuer) + '</span>' +
                    '<span>时间：' + escapeHtml(item.date) + '</span>' +
                    (item.number ? '<span>编号：' + escapeHtml(item.number) + '</span>' : '') +
                    '</div></div></article>';
            }).join('');
            bindLightboxButtons();
        }

        if (tabs) {
            tabs.addEventListener('click', function (event) {
                var button = event.target.closest('button[data-filter]');
                if (!button) return;
                current = button.getAttribute('data-filter');
                tabs.querySelectorAll('button').forEach(function (item) {
                    item.classList.toggle('is-active', item === button);
                });
                render();
            });
        }

        var lightbox = document.querySelector('[data-about-lightbox]');
        function closeLightbox() {
            if (!lightbox) return;
            lightbox.classList.remove('is-open');
            lightbox.setAttribute('aria-hidden', 'true');
        }
        function bindLightboxButtons() {
            grid.querySelectorAll('[data-lightbox-image]').forEach(function (button) {
                button.addEventListener('click', function () {
                    if (!lightbox) return;
                    var image = lightbox.querySelector('img');
                    image.src = button.getAttribute('data-lightbox-image');
                    image.alt = button.getAttribute('data-lightbox-alt') || '';
                    lightbox.classList.add('is-open');
                    lightbox.setAttribute('aria-hidden', 'false');
                });
            });
        }
        if (lightbox) {
            lightbox.addEventListener('click', function (event) {
                if (event.target === lightbox || event.target.closest('[data-lightbox-close]')) closeLightbox();
            });
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') closeLightbox();
            });
        }
        render();
    }

    function initDistributors() {
        var tableBody = document.querySelector('[data-distributor-body]');
        if (!tableBody) return;
        var search = document.querySelector('[data-distributor-search]');
        var year = document.querySelector('[data-distributor-year]');
        var count = document.querySelector('[data-distributor-count]');
        var summary = document.querySelector('[data-distributor-summary]');
        var previous = document.querySelector('[data-page-prev]');
        var next = document.querySelector('[data-page-next]');
        var pageLabel = document.querySelector('[data-page-label]');
        var page = 1;
        var pageSize = 20;

        var years = Array.from(new Set((data.distributors || []).map(function (item) {
            return item[1].slice(0, 4);
        }))).sort().reverse();
        if (year) {
            year.innerHTML = '<option value="">全部授权年份</option>' + years.map(function (item) {
                return '<option value="' + item + '">' + item + '年</option>';
            }).join('');
        }

        function filteredList() {
            var keyword = search ? search.value.trim().toLowerCase() : '';
            var selectedYear = year ? year.value : '';
            return (data.distributors || []).map(function (item, index) {
                return { name: item[0], date: item[1], sourceIndex: index + 1 };
            }).filter(function (item) {
                return (!keyword || item.name.toLowerCase().indexOf(keyword) !== -1) && (!selectedYear || item.date.indexOf(selectedYear) === 0);
            }).sort(function (a, b) { return b.date.localeCompare(a.date); });
        }

        function render() {
            var list = filteredList();
            var totalPages = Math.max(1, Math.ceil(list.length / pageSize));
            page = Math.min(page, totalPages);
            var start = (page - 1) * pageSize;
            var visible = list.slice(start, start + pageSize);
            tableBody.innerHTML = visible.length ? visible.map(function (item, index) {
                return '<tr><td>' + (start + index + 1) + '</td><td><strong>' + escapeHtml(item.name) + '</strong></td><td>' + escapeHtml(item.date) + '</td></tr>';
            }).join('') : '<tr><td colspan="3"><div class="about-empty"><span class="material-symbols-outlined">search_off</span><h3>未找到匹配的代理商</h3><p>请调整公司名称或授权年份后重试。</p></div></td></tr>';
            if (count) count.textContent = '共 ' + list.length + ' 家';
            if (summary) summary.textContent = list.length ? '显示第 ' + (start + 1) + '–' + Math.min(start + pageSize, list.length) + ' 条，共 ' + list.length + ' 条' : '共 0 条';
            if (pageLabel) pageLabel.textContent = page + ' / ' + totalPages;
            if (previous) previous.disabled = page <= 1;
            if (next) next.disabled = page >= totalPages;
        }

        function resetAndRender() { page = 1; render(); }
        if (search) search.addEventListener('input', resetAndRender);
        if (year) year.addEventListener('change', resetAndRender);
        if (previous) previous.addEventListener('click', function () { if (page > 1) { page -= 1; render(); } });
        if (next) next.addEventListener('click', function () { if (page < Math.ceil(filteredList().length / pageSize)) { page += 1; render(); } });
        render();
    }

    function initCareerSearch() {
        var listMount = document.querySelector('[data-career-list]');
        if (!listMount) return;
        var jobs = data.jobs || [];
        var keyword = document.querySelector('[data-career-keyword]');
        var category = document.querySelector('[data-career-category]');
        var location = document.querySelector('[data-career-location]');
        var type = document.querySelector('[data-career-type]');
        var major = document.querySelector('[data-career-major]');
        var count = document.querySelector('[data-career-count]');
        var reset = document.querySelector('[data-career-reset]');

        function populate(select, field, placeholder) {
            if (!select) return;
            var options = Array.from(new Set(jobs.map(function (job) { return job[field]; }).filter(Boolean))).sort();
            select.innerHTML = '<option value="">' + placeholder + '</option>' + options.map(function (option) {
                return '<option value="' + escapeHtml(option) + '">' + escapeHtml(option) + '</option>';
            }).join('');
        }

        populate(category, 'category', '全部职位类别');
        populate(location, 'location', '全部工作地点');
        populate(type, 'type', '全部工作性质');
        populate(major, 'major', '全部专业方向');

        function render() {
            var query = keyword ? keyword.value.trim().toLowerCase() : '';
            var filtered = jobs.filter(function (job) {
                var keywordMatch = !query || [job.title, job.category, job.description].join(' ').toLowerCase().indexOf(query) !== -1;
                return keywordMatch &&
                    (!category || !category.value || job.category === category.value) &&
                    (!location || !location.value || job.location === location.value) &&
                    (!type || !type.value || job.type === type.value) &&
                    (!major || !major.value || job.major === major.value);
            });
            if (count) count.textContent = String(jobs.length);
            if (!jobs.length) {
                listMount.innerHTML = '<div class="about-empty"><span class="material-symbols-outlined">work_history</span><h3>当前暂无公开职位</h3><p>现官网当前工作机会为0，后续招聘信息以本页面更新为准。</p></div>';
                return;
            }
            if (!filtered.length) {
                listMount.innerHTML = '<div class="about-empty"><span class="material-symbols-outlined">search_off</span><h3>未找到匹配职位</h3><p>请调整关键词或筛选条件后重试。</p></div>';
                return;
            }
            listMount.innerHTML = filtered.map(function (job) {
                var hasDetails = (job.responsibilities || []).length || (job.requirements || []).length;
                var details = hasDetails ?
                    '<details class="career-job-details"><summary><span>查看岗位详情</span><span class="material-symbols-outlined">expand_more</span></summary>' +
                        '<div class="career-job-detail-content">' +
                            ((job.responsibilities || []).length ? '<section><h4>核心职责</h4><ol>' +
                                job.responsibilities.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') +
                            '</ol></section>' : '') +
                            ((job.requirements || []).length ? '<section><h4>任职资格</h4><h5>必备条件</h5><ul>' +
                                job.requirements.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') +
                            '</ul>' + ((job.preferred || []).length ? '<h5>加分项</h5><ul>' +
                                job.preferred.map(function (item) { return '<li>' + escapeHtml(item) + '</li>'; }).join('') +
                            '</ul>' : '') + '</section>' : '') +
                            (job.contactPhone ? '<div class="career-job-contact"><span>质量经理岗位咨询</span><a href="tel:' +
                                escapeHtml(job.contactPhone) + '">' + escapeHtml(job.contactPhone) + '｜' +
                                escapeHtml(job.contactName || '招聘联系人') + '</a>' +
                                (job.contactNote ? '<small>' + escapeHtml(job.contactNote) + '</small>' : '') + '</div>' : '') +
                        '</div></details>' : '';
                return '<article class="career-job-card' + (hasDetails ? ' is-detailed' : '') + '"><div class="career-job-summary"><span class="honor-tag">' +
                    escapeHtml(job.category) + '</span><h3>' + escapeHtml(job.title) + '</h3>' +
                    (job.description ? '<p>' + escapeHtml(job.description) + '</p>' : '') +
                    '</div><div class="career-job-meta"><span><span class="material-symbols-outlined">badge</span>' +
                    escapeHtml(job.type) + '</span><span><span class="material-symbols-outlined">school</span>' +
                    escapeHtml(job.major) + '</span><span><span class="material-symbols-outlined">location_on</span>' +
                    escapeHtml(job.location) + '</span></div>' + details + '</article>';
            }).join('');
        }

        [keyword, category, location, type, major].filter(Boolean).forEach(function (control) {
            control.addEventListener(control.tagName === 'INPUT' ? 'input' : 'change', render);
        });
        if (reset) reset.addEventListener('click', function () {
            if (keyword) keyword.value = '';
            [category, location, type, major].filter(Boolean).forEach(function (select) { select.value = ''; });
            render();
        });
        render();
    }

    function initMailForms() {
        document.querySelectorAll('[data-mail-form]').forEach(function (form) {
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                if (!form.reportValidity()) return;
                var target = form.getAttribute('data-mail-to') || 'web@ymin.com';
                var subjectPrefix = form.getAttribute('data-mail-subject') || '官网咨询';
                var formData = new FormData(form);
                var rows = [];
                formData.forEach(function (value, key) {
                    if (key !== 'consent') rows.push(key + '：' + value);
                });
                var subject = subjectPrefix + (formData.get('公司') ? ' - ' + formData.get('公司') : '');
                var mailto = 'mailto:' + target + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(rows.join('\n'));
                var message = form.querySelector('[data-form-message]');
                if (message) {
                    message.textContent = '已为您生成邮件，请在邮件客户端中确认并发送。';
                    message.classList.add('is-visible');
                }
                window.location.href = mailto;
            });
        });
    }

    function initCrmForms() {
        document.querySelectorAll('[data-crm-form]').forEach(function (form) {
            form.addEventListener('submit', async function (event) {
                event.preventDefault();
                if (!form.reportValidity()) return;

                var files = form.querySelector('[data-crm-files]');
                var selectedFiles = files ? Array.from(files.files || []) : [];
                var message = form.querySelector('[data-form-message]');
                var submit = form.querySelector('[type="submit"]');
                var maxFileSize = 20 * 1024 * 1024;
                if (message) message.classList.add('is-visible');

                if (selectedFiles.length > 5) {
                    if (message) message.textContent = '最多可上传 5 个附件。';
                    return;
                }
                if (selectedFiles.some(function (file) { return file.size > maxFileSize; })) {
                    if (message) message.textContent = '单个附件不能超过 20MB。';
                    return;
                }

                var endpoint = form.getAttribute('data-crm-endpoint');
                if (!endpoint) return;
                if (submit) submit.disabled = true;
                if (message) message.textContent = '正在提交，请稍候…';

                try {
                    var response = await fetch(endpoint, { method: 'POST', body: new FormData(form) });
                    if (!response.ok) throw new Error('CRM request failed');
                    form.reset();
                    if (message) message.textContent = '合作意向已提交，我们将尽快与您联系。';
                } catch (error) {
                    if (message) message.textContent = '提交失败，请稍后重试或联系永铭采购人员。';
                } finally {
                    if (submit) submit.disabled = false;
                }
            });
        });
    }

    function initQueryDefaults() {
        var params = new URLSearchParams(window.location.search);
        var type = params.get('type');
        if (!type) return;
        document.querySelectorAll('select[name="咨询类型"]').forEach(function (select) {
            var option = Array.from(select.options).find(function (item) { return item.value === type; });
            if (option) select.value = type;
        });
    }

    function init() {
        renderStats();
        renderProductLines();
        renderHistory();
        initHonors();
        initDistributors();
        initCareerSearch();
        initMailForms();
        initCrmForms();
        initQueryDefaults();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
