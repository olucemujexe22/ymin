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
        var cls = 'flex items-center gap-1 font-[\'Space_Grotesk\'] tracking-tight text-sm font-semibold ';
        cls += activeClass
            ? 'text-[#1B365D] dark:text-white border-b-2 border-[#1B365D] dark:border-[#d6e3ff] pb-1'
            : 'text-slate-600 dark:text-slate-400 hover:text-[#1B365D] transition-colors duration-150';
        var arrow = hasDropdown ? '<span class="material-symbols-outlined text-xs">expand_more</span>' : '';
        return '<a class="' + cls + '" href="' + href + '">' + label + ' ' + arrow + '</a>';
    }

    function dropdownItem(href, label) {
        return '<a class="block px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-[#edeef1] dark:hover:bg-slate-800 transition-colors" href="' + href + '">' + label + '</a>';
    }

    function dropdownMenu(items, width) {
        var w = width || 'w-48';
        return '<div class="mega-menu absolute top-16 left-0 ' + w + ' bg-white dark:bg-slate-900 shadow-xl border-t-2 border-[#1B365D] py-4 px-2 z-50">'
            + items.map(function (it) { return dropdownItem(it.href, it.label); }).join('')
            + '</div>';
    }

    function dropdownMenuRight(items, width) {
        var w = width || 'w-48';
        return '<div class="mega-menu absolute top-16 right-0 md:left-0 ' + w + ' bg-white dark:bg-slate-900 shadow-xl border-t-2 border-[#1B365D] py-4 px-2 z-50">'
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
        html += '<div class="flex justify-between items-center w-full px-8 h-16 max-w-[1920px] mx-auto">';
        html += '<div class="flex items-center gap-10 h-full">';

        // Logo
        html += '<div class="flex items-center gap-3">';
        html += '<img alt="YMIN" class="h-10 w-auto object-contain" src="logo.png">';
        html += '<span class="text-2xl font-bold tracking-tighter text-[#1B365D] dark:text-white font-[\'Space_Grotesk\']">YMIN</span>';
        html += '</div>';

        // 导航菜单
        html += '<nav class="hidden md:flex gap-8 h-full">';

        // 首页
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('index.html', '首页', activePage === 'home', true);
        html += dropdownMenu([
            { href: '#', label: '动态轮播' },
            { href: '#', label: '搜索功能' },
            { href: '#', label: '产品矩阵' },
            { href: '#', label: '设计工具' },
            { href: '#', label: '应用指南' },
            { href: '#', label: '新闻中心' }
        ]);
        html += '</div>';

        // 产品中心
        html += '<div class="group h-full flex items-center relative">';
        html += navLink('product-center.html', '产品中心', activePage === 'products', true);
        html += dropdownMenu([
            { href: 'product-center.html', label: '系列总览' },
            { href: 'product-detail.html', label: '产品详情页' },
            { href: '#', label: '产品搜索' }
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
            { href: 'application-energy-storage.html', label: '储能' },
            { href: 'application-consumer.html', label: '消费类电子' }
        ], 'w-60');
        html += '</div>';

        // 设计工具（暂未开放）
        html += '<div class="h-full flex items-center">';
        html += '<span class="text-sm font-semibold text-slate-400 cursor-not-allowed">设计工具</span>';
        html += '</div>';

        // 服务支持（暂未开放）
        html += '<div class="h-full flex items-center">';
        html += '<span class="text-sm font-semibold text-slate-400 cursor-not-allowed">服务支持</span>';
        html += '</div>';

        // 关于永铭（暂未开放）
        html += '<div class="h-full flex items-center">';
        html += '<span class="text-sm font-semibold text-slate-400 cursor-not-allowed">关于永铭</span>';
        html += '</div>';

        html += '</nav>';
        html += '</div>';

        // 右侧操作区
        html += '<div class="flex items-center gap-6">';
        html += '<div class="relative hidden lg:block">';
        html += '<input class="bg-[#f3f3f7] dark:bg-slate-900 border-b-2 border-outline-variant px-4 py-1.5 focus:border-primary outline-none text-xs w-64 no-radius font-[\'Inter\']" placeholder="搜索型号或参数..." type="text">';
        html += '<span class="material-symbols-outlined absolute right-2 top-1.5 text-on-surface-variant text-lg">search</span>';
        html += '</div>';
        html += '<div class="flex items-center gap-3">';
        html += '<span class="material-symbols-outlined p-2 hover:bg-[#edeef1] dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-400" title="Language">language</span>';
        html += '<span class="material-symbols-outlined p-2 hover:bg-[#edeef1] dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-600 dark:text-slate-400" title="Account">person</span>';
        html += '<button class="bg-[#1B365D] text-white px-6 py-2 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all scale-95 active:scale-90 no-radius">登录</button>';
        html += '</div>';
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
