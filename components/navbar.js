/**
 * 永铭官网 — 统一导航栏组件
 * 使用: 在页面中放入 <nav id="ymin-navbar"></nav>，然后加载此脚本
 *       调用 YMIN.navbar.inject('products') 指定当前高亮页面
 *
 * activePage 可选值: 'home' | 'products' | 'applications' | 'tools' | 'support' | 'about'
 */
var YMIN = window.YMIN || {};

YMIN.navbar = (function () {
    'use strict';

    function isInternationalPage() {
        var language = (YMIN.i18n && YMIN.i18n.language) ||
            new URLSearchParams(window.location.search).get('lang') ||
            document.documentElement.lang || 'zh-CN';
        return String(language).toLowerCase() !== 'zh-cn' && String(language).toLowerCase() !== 'zh';
    }

    function languageSwitcher() {
        if (YMIN.i18n && typeof YMIN.i18n.switcher === 'function') {
            return YMIN.i18n.switcher();
        }
        return '<a class="inline-flex items-center gap-1 border border-slate-300 bg-white px-3 py-2 text-[11px] font-bold text-slate-600" href="?lang=zh-CN" data-i18n-ignore>' +
            '<span class="material-symbols-outlined text-[18px]">language</span><span>Language</span></a>';
    }

    function navLink(href, label, activeClass, hasDropdown) {
        var cls = 'flex h-full items-center justify-center gap-1.5 px-1 font-[\'Space_Grotesk\'] tracking-[0.01em] text-[15px] font-bold whitespace-nowrap ';
        cls += activeClass
            ? 'text-[#1B365D] dark:text-white border-b-[3px] border-[#1B365D] dark:border-[#d6e3ff]'
            : 'text-slate-700 dark:text-slate-300 border-b-[3px] border-transparent hover:text-[#1B365D] hover:border-[#1B365D]/35 transition-colors duration-150';
        var arrow = hasDropdown ? '<span class="material-symbols-outlined text-[16px] leading-none">expand_more</span>' : '';
        return '<a class="' + cls + '" href="' + href + '">' + label + ' ' + arrow + '</a>';
    }

    function dropdownItem(href, label) {
        return '<a class="block px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-[#edeef1] dark:hover:bg-slate-800 transition-colors" href="' + href + '">' + label + '</a>';
    }

    function dropdownMenu(items, width) {
        var w = width || 'w-48';
        return '<div class="mega-menu absolute top-[72px] left-0 ' + w + ' bg-white dark:bg-slate-900 shadow-xl border-t-2 border-[#1B365D] py-4 px-2 z-50">'
            + items.map(function (it) { return dropdownItem(it.href, it.label); }).join('')
            + '</div>';
    }

    function dropdownMenuRight(items, width) {
        var w = width || 'w-48';
        return '<div class="mega-menu absolute top-[72px] right-0 md:left-0 ' + w + ' bg-white dark:bg-slate-900 shadow-xl border-t-2 border-[#1B365D] py-4 px-2 z-50">'
            + items.map(function (it) { return dropdownItem(it.href, it.label); }).join('')
            + '</div>';
    }

    /**
     * @param {string} active - 'home'|'products'|'applications'|'tools'|'support'|'about'
     */
    function render(active) {
        var activePage = active || 'home';
        var international = isInternationalPage();
        var html = '';
        html += '<header class="ymin-site-header relative z-[100] bg-white dark:bg-slate-950 w-full border-b border-slate-200 dark:border-slate-800 flex-shrink-0">';
        html += '<div class="relative flex items-center w-full px-6 lg:px-8 2xl:px-12 h-[72px] max-w-[1680px] mx-auto">';

        // Logo
        html += '<a class="ymin-site-logo relative z-10 flex shrink-0 items-center gap-3" href="index.html" aria-label="永铭电子首页">';
        html += '<img alt="YMIN" class="h-11 w-auto object-contain" src="logo.png">';
        html += '</a>';

        // 导航菜单
        html += '<nav class="hidden md:flex absolute left-1/2 lg:left-[calc(50%-70px)] xl:left-[calc(50%-90px)] top-0 -translate-x-1/2 gap-3 lg:gap-5 xl:gap-8 2xl:gap-10 h-full">';

        // 首页：直接返回首页，不设重复的页内模块下拉菜单
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('index.html', '首页', activePage === 'home', false);
        html += '</div>';

        // 产品中心
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('product-center.html', '产品中心', activePage === 'products', true);
        html += dropdownMenu([
            { href: 'product-center.html?category=' + encodeURIComponent('液态铝电解电容器'), label: '液态铝电解电容器' },
            { href: 'product-center.html?category=' + encodeURIComponent('高分子固态铝电解电容器'), label: '高分子固态铝电解电容器' },
            { href: 'product-center.html?category=' + encodeURIComponent('高分子混合动力铝电解电容器'), label: '高分子混合动力铝电解电容器' },
            { href: 'product-center.html?category=' + encodeURIComponent('叠层高分子固态铝电解电容器'), label: '叠层高分子固态铝电解电容器' },
            { href: 'product-center.html?category=' + encodeURIComponent('导电高分子钽电解电容器'), label: '导电高分子钽电解电容器' },
            { href: 'product-center.html?category=' + encodeURIComponent('双电层超级电容'), label: '双电层超级电容器' },
            { href: 'product-center.html?category=' + encodeURIComponent('混合型超级电容（锂离子电容）'), label: '混合型超级电容器（锂离子电容器）' },
            { href: 'product-center.html?category=' + encodeURIComponent('金属化聚丙烯薄膜电容器'), label: '金属化聚丙烯薄膜电容器' }
        ], 'w-72');
        html += '</div>';

        // 应用中心
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('application-center.html', '应用中心', activePage === 'applications', true);
        html += dropdownMenu([
            { href: 'application-automotive.html', label: '汽车电子' },
            { href: 'application-ai-server.html', label: 'AI服务器与数据中心' },
            { href: 'application-instrument.html', label: '仪器仪表' },
            { href: 'application-motor-drive.html', label: '新型电机驱动' },
            { href: 'application-power.html', label: '第三代半导体电源（GaN&SiC）' },
            { href: 'application-robotics.html', label: '机器人' },
            { href: 'application-drone.html', label: '无人机' },
            { href: 'application-energy-storage.html', label: '光储充' },
            { href: 'application-consumer.html', label: '消费类电子' }
        ], 'w-60');
        html += '</div>';

        // 设计工具
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('design-tools.html', '设计工具', activePage === 'tools', true);
        html += dropdownMenu([
            { href: 'design-life-calc.html', label: '寿命推算工具' },
            { href: 'design-3d-cad.html', label: '3D-CAD 模型' },
            { href: 'design-spice.html', label: 'SPICE 模型' },
            { href: 'design-reliability.html', label: '可靠性实验数据' }
        ], 'w-52');
        html += '</div>';

        // 服务支持
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('support.html', '服务支持', activePage === 'support', true);
        html += dropdownMenu([
            { href: 'support-news.html', label: '新闻资讯' },
            { href: 'support-faq.html', label: '知识库' },
            { href: 'support-download.html', label: '下载中心' },
            { href: 'support-certification.html', label: '合规证书' }
        ], 'w-48');
        html += '</div>';

        // 关于永铭
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('about.html', '关于永铭', activePage === 'about', true);
        var aboutItems = [
            { href: 'about-company.html', label: '公司简介' },
            { href: 'about-honors.html', label: '企业荣誉' },
            { href: 'about-distributors.html', label: '代理商网络' }
        ];
        if (!international) {
            aboutItems.push({ href: 'about-careers.html', label: '加入我们' });
            aboutItems.push({ href: 'about-procurement.html', label: '原材料采购发布与供应商准入申请' });
        }
        html += dropdownMenuRight(aboutItems, international ? 'w-48' : 'w-72');
        html += '</div>';

        html += '</nav>';

        // 右侧操作区
        html += '<div class="relative z-10 ml-auto flex items-center gap-3 xl:gap-4">';
        html += '<div class="relative hidden 2xl:block">';
        html += '<input class="bg-[#f3f3f7] dark:bg-slate-900 border-b-2 border-outline-variant px-4 py-2 focus:border-primary outline-none text-xs w-56 no-radius font-[\'Inter\']" placeholder="搜索型号或参数..." type="text">';
        html += '<span class="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant text-lg">search</span>';
        html += '</div>';
        html += '<div class="hidden xl:flex items-center gap-2">';
        html += languageSwitcher();
        html += '<a data-member-account-icon class="flex items-center p-2 hover:bg-[#edeef1] dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400" href="member-login.html" title="会员账户" aria-label="会员账户"><span class="material-symbols-outlined">person</span></a>';
        html += '</div>';
        html += '<a data-member-nav class="hidden lg:block bg-[#1B365D] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 no-radius" href="member-login.html">登录</a>';
        html += '</div>';

        html += '</div>';
        html += '</header>';

        return html;
    }

    /**
     * 注入导航栏到指定容器
     * @param {string} activePage - 'home'|'products'|'applications'|'tools'|'support'|'about'
     * @param {string} containerId - 可选，默认 'ymin-navbar'
     */
    function inject(activePage, containerId) {
        var id = containerId || 'ymin-navbar';
        var el = document.getElementById(id);
        if (el) {
            el.outerHTML = render(activePage);
            loadMemberModule();
        }
    }

    // YMIN_MEMBER_BEGIN：会员功能独立加载区。合并中英文导航时请保留此区块。
    function loadMemberModule() {
        if (YMIN.member && typeof YMIN.member.init === 'function') {
            YMIN.member.init();
            return;
        }
        if (document.querySelector('script[data-ymin-member-module]')) return;
        var script = document.createElement('script');
        script.src = 'components/member.js?v=20260807ui3';
        script.setAttribute('data-ymin-member-module', 'true');
        script.onload = function () {
            if (YMIN.member && typeof YMIN.member.init === 'function') YMIN.member.init();
        };
        document.head.appendChild(script);
    }
    // YMIN_MEMBER_END

    return {
        render: render,
        inject: inject
    };
})();
