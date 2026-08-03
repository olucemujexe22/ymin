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

        var html = '';
        html += '<header class="bg-white dark:bg-slate-950 w-full border-b border-slate-200 dark:border-slate-800 z-50 flex-shrink-0">';
        html += '<div class="relative flex items-center w-full px-6 lg:px-8 2xl:px-12 h-[72px] max-w-[1680px] mx-auto">';

        // Logo
        html += '<a class="relative z-10 flex shrink-0 items-center gap-3" href="index.html" aria-label="永铭电子首页">';
        html += '<img alt="YMIN" class="h-11 w-auto object-contain" src="logo.png">';
        html += '<span class="text-[26px] font-bold tracking-tighter text-[#1B365D] dark:text-white font-[\'Space_Grotesk\']">YMIN</span>';
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
            { href: 'product-series.html', label: '产品体系图' },
            { href: 'product-center.html', label: '系列总览 / 产品搜索' },
            { href: 'product-detail.html', label: '产品详情页' }
        ], 'w-56');
        html += '</div>';

        // 应用中心
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('application-center.html', '应用中心', activePage === 'applications', true);
        html += dropdownMenu([
            { href: 'application-center.html', label: '应用总览' },
            { href: 'application-automotive.html', label: '汽车电子' },
            { href: 'application-ai-server.html', label: 'AI服务器与数据中心' },
            { href: 'application-instrument.html', label: '仪器仪表' },
            { href: 'application-motor-drive.html', label: '新型电机驱动' },
            { href: 'application-power.html', label: '电源' },
            { href: 'application-robotics.html', label: '机器人' },
            { href: 'application-drone.html', label: '无人机' },
            { href: 'application-energy-storage.html', label: '储能' },
            { href: 'application-consumer.html', label: '消费类电子' }
        ], 'w-60');
        html += '</div>';

        // 设计工具
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('design-tools.html', '设计工具', activePage === 'tools', true);
        html += dropdownMenu([
            { href: 'design-life-calc.html', label: '寿命推算工具' },
            { href: 'design-spice.html', label: 'SPICE 模型' },
            { href: 'design-3d-cad.html', label: '3D-CAD 模型' },
            { href: 'design-sparams.html', label: 'S参数' },
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
        html += dropdownMenuRight([
            { href: 'about-company.html', label: '公司简介' },
            { href: 'about-honors.html', label: '企业荣誉' },
            { href: 'about-distributors.html', label: '代理商网络' },
            { href: 'about-contact.html', label: '联系我们' },
            { href: 'about-careers.html', label: '加入我们' },
            { href: 'about-procurement.html', label: '原材料采购' }
        ], 'w-48');
        html += '</div>';

        html += '</nav>';

        // 右侧操作区
        html += '<div class="relative z-10 ml-auto flex items-center gap-3 xl:gap-4">';
        html += '<div class="relative hidden 2xl:block">';
        html += '<input class="bg-[#f3f3f7] dark:bg-slate-900 border-b-2 border-outline-variant px-4 py-2 focus:border-primary outline-none text-xs w-56 no-radius font-[\'Inter\']" placeholder="搜索型号或参数..." type="text">';
        html += '<span class="material-symbols-outlined absolute right-2 top-2 text-on-surface-variant text-lg">search</span>';
        html += '</div>';
        html += '<div class="hidden xl:flex items-center gap-1">';
        html += '<span class="material-symbols-outlined p-2 hover:bg-[#edeef1] dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-400" title="Language">language</span>';
        html += '<span class="material-symbols-outlined p-2 hover:bg-[#edeef1] dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-400" title="Account">person</span>';
        html += '</div>';
        html += '<button class="hidden lg:block bg-[#1B365D] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all active:scale-95 no-radius">登录</button>';
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
        }
    }

    return {
        render: render,
        inject: inject
    };
})();
