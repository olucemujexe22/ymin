/**
 * 永铭官网 — 统一页脚组件
 * 使用: 在页面中放入 <footer id="ymin-footer"></footer>，然后加载此脚本
 *       调用 YMIN.footer.inject()
 */
var YMIN = window.YMIN || {};

YMIN.footer = (function () {
    'use strict';

    function render() {
        var html = '';
        html += '<footer class="w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 px-6 mt-12">';
        html += '<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">';

        // 网站导航
        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">网站导航</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="index.html" class="hover:text-[#1B365D]">首页</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">产品中心</a></li>';
        html += '<li><a href="application-center.html" class="hover:text-[#1B365D]">应用中心</a></li>';
        html += '<li><a href="design-tools.html" class="hover:text-[#1B365D]">设计工具</a></li>';
        html += '<li><a href="support.html" class="hover:text-[#1B365D]">服务支持</a></li>';
        html += '<li><a href="about.html" class="hover:text-[#1B365D]">关于永铭</a></li>';
        html += '<li><a href="support-news.html" class="hover:text-[#1B365D]">新闻中心</a></li>';
        html += '</ul></div>';

        // 产品中心
        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">产品中心</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">液态铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">双电层超级电容</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">高分子固态铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">混合型超级电容(锂离子电容)</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">高分子混合动力铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">叠层高分子固态铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">薄膜电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">导电高分子钽电解电容器</a></li>';
        html += '</ul></div>';

        // 关于我们
        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">关于我们</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="about-company.html" class="hover:text-[#1B365D]">公司简介</a></li>';
        html += '<li><a href="about-honors.html" class="hover:text-[#1B365D]">企业荣誉</a></li>';
        html += '<li><a href="about-distributors.html" class="hover:text-[#1B365D]">代理商网络</a></li>';
        html += '<li><a href="about-contact.html" class="hover:text-[#1B365D]">联系我们</a></li>';
        html += '<li><a href="about-careers.html" class="hover:text-[#1B365D]">加入我们</a></li>';
        html += '<li><a href="about-procurement.html" class="hover:text-[#1B365D]">原材料采购</a></li>';
        html += '</ul></div>';

        // 联系支持
        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">联系支持</h4>';
        html += '<div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">';
        html += '<p class="flex items-start gap-2"><span class="material-symbols-outlined text-[#1B365D] text-base">call</span><span><span class="font-bold">400 900 1922</span> (产品服务热线)</span></p>';
        html += '<p class="flex items-start gap-2"><span class="material-symbols-outlined text-[#1B365D] text-base">mail</span><span>web@ymin.com (国内业务)</span></p>';
        html += '<p class="flex items-start gap-2"><span class="material-symbols-outlined text-[#1B365D] text-base">mail</span><span>ymin-sale@ymin.com (国外业务)</span></p>';
        html += '<p class="flex items-start gap-2"><span class="material-symbols-outlined text-[#1B365D] text-base">phone_in_talk</span><span>公司总机：021-33617848</span></p>';
        html += '<p class="flex items-start gap-2"><span class="material-symbols-outlined text-[#1B365D] text-base">location_on</span><span>上海市奉贤区南桥镇杨王经济园区光村路258号</span></p>';
        html += '</div>';
        html += '<div class="mt-8 flex gap-8">';
        html += '<div class="text-center"><div class="w-20 h-20 bg-slate-200 border border-slate-300 flex items-center justify-center mx-auto"><span class="material-symbols-outlined text-4xl text-slate-500">qr_code_scanner</span></div><p class="text-[10px] text-slate-500 uppercase tracking-wider mt-2">扫码关注服务号</p></div>';
        html += '<div class="text-center"><div class="w-20 h-20 bg-slate-200 border border-slate-300 flex items-center justify-center mx-auto"><span class="material-symbols-outlined text-4xl text-slate-500">qr_code_scanner</span></div><p class="text-[10px] text-slate-500 uppercase tracking-wider mt-2">扫码关注抖音号</p></div>';
        html += '</div></div>';

        html += '</div>';

        // 底部法律信息
        html += '<div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">';
        html += '<p class="text-[10px] uppercase tracking-wider text-slate-400">© 2026 永铭电子有限公司. 版权所有.</p>';
        html += '<div class="flex gap-8">';
        html += '<a href="#" class="text-[10px] uppercase tracking-wider text-slate-400 hover:text-[#1B365D] transition-colors">隐私政策</a>';
        html += '<a href="#" class="text-[10px] uppercase tracking-wider text-slate-400 hover:text-[#1B365D] transition-colors">使用条款</a>';
        html += '</div>';
        html += '</div>';

        html += '</footer>';
        return html;
    }

    function inject(containerId) {
        var id = containerId || 'ymin-footer';
        var el = document.getElementById(id);
        if (el) {
            el.outerHTML = render();
        }
    }

    return {
        render: render,
        inject: inject
    };
})();
