/**
 * 永铭官网 — 中英文独立页脚组件
 * 中文页脚保留国内联系方式与微信/抖音入口；英文页脚采用国际业务联系方式与海外社媒入口。
 */
var YMIN = window.YMIN || {};

YMIN.footer = (function () {
    'use strict';

    function isEnglishPage() {
        return (YMIN.i18n && YMIN.i18n.language === 'en') ||
            new URLSearchParams(window.location.search).get('lang') === 'en' ||
            document.documentElement.lang === 'en';
    }

    function renderChinese() {
        var html = '';
        html += '<footer class="ymin-site-footer w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 px-6 mt-12" data-footer-language="zh-CN">';
        html += '<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">';

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

        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">产品中心</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="product-replacement.html" class="font-bold text-[#1B365D] hover:underline">寻找替代料</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">液态铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">双电层超级电容</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">高分子固态铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">混合型超级电容(锂离子电容)</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">高分子混合动力铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">叠层高分子固态铝电解电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">金属化聚丙烯薄膜电容器</a></li>';
        html += '<li><a href="product-center.html" class="hover:text-[#1B365D]">导电高分子钽电解电容器</a></li>';
        html += '</ul></div>';

        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">关于我们</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="about-company.html" class="hover:text-[#1B365D]">公司简介</a></li>';
        html += '<li><a href="about-honors.html" class="hover:text-[#1B365D]">企业荣誉</a></li>';
        html += '<li><a href="about-distributors.html" class="hover:text-[#1B365D]">代理商网络</a></li>';
        html += '<li><a href="about-contact.html" class="hover:text-[#1B365D]">联系我们</a></li>';
        html += '<li><a href="about-careers.html" class="hover:text-[#1B365D]">加入我们</a></li>';
        html += '<li><a href="about-procurement.html" class="hover:text-[#1B365D]">原材料采购</a></li>';
        html += '</ul></div>';

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
        html += '<div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">';
        html += '<p class="text-[10px] uppercase tracking-wider text-slate-400">© 2026 永铭电子有限公司. 版权所有.</p>';
        html += '<div class="flex gap-8"><a href="#" class="text-[10px] uppercase tracking-wider text-slate-400 hover:text-[#1B365D]">隐私政策</a><a href="#" class="text-[10px] uppercase tracking-wider text-slate-400 hover:text-[#1B365D]">使用条款</a></div>';
        html += '</div></footer>';
        return html;
    }

    function renderEnglish() {
        var html = '';
        html += '<footer class="ymin-site-footer w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-16 px-6 mt-12" data-footer-language="en" data-i18n-ignore>';
        html += '<div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">';

        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">Site Navigation</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="index-en.html">Home</a></li><li><a href="product-center.html">Products</a></li><li><a href="application-center.html">Applications</a></li><li><a href="design-tools.html">Design Tools</a></li><li><a href="support.html">Support</a></li><li><a href="about.html">About YMIN</a></li><li><a href="support-news.html">News Center</a></li>';
        html += '</ul></div>';

        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">Products</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="product-replacement.html" class="font-bold text-[#1B365D] hover:underline">Cross-reference Search</a></li>';
        html += '<li><a href="product-center.html">Liquid Aluminum Electrolytic Capacitors</a></li>';
        html += '<li><a href="product-center.html">Electric Double-layer Supercapacitors</a></li>';
        html += '<li><a href="product-center.html">Polymer Solid Aluminum Electrolytic Capacitors</a></li>';
        html += '<li><a href="product-center.html">Hybrid Supercapacitors (Lithium-ion Capacitors)</a></li>';
        html += '<li><a href="product-center.html">Polymer Hybrid Aluminum Electrolytic Capacitors</a></li>';
        html += '<li><a href="product-center.html">Stacked Polymer Solid Aluminum Electrolytic Capacitors</a></li>';
        html += '<li><a href="product-center.html">Metallized Polypropylene Film Capacitors</a></li>';
        html += '<li><a href="product-center.html">Conductive Polymer Tantalum Electrolytic Capacitors</a></li>';
        html += '</ul></div>';

        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">About Us</h4>';
        html += '<ul class="space-y-3 text-xs uppercase tracking-wider text-slate-500">';
        html += '<li><a href="about-company.html">Company Profile</a></li><li><a href="about-honors.html">Honors and Certifications</a></li><li><a href="about-distributors.html">Distributor Network</a></li><li><a href="about-contact.html">Contact Us</a></li>';
        html += '</ul></div>';

        html += '<div><h4 class="text-xs font-bold text-[#1B365D] uppercase mb-6 tracking-widest">Contact Support</h4>';
        html += '<div class="space-y-2 text-xs text-slate-700 dark:text-slate-300">';
        html += '<a href="mailto:web@ymin.com" class="flex items-start gap-2 hover:text-[#1B365D]"><span class="material-symbols-outlined text-[#1B365D] text-base">mail</span><span>web@ymin.com (China Sales)</span></a>';
        html += '<a href="mailto:ymin-sale@ymin.com" class="flex items-start gap-2 hover:text-[#1B365D]"><span class="material-symbols-outlined text-[#1B365D] text-base">mail</span><span>ymin-sale@ymin.com (International Sales)</span></a>';
        html += '<a href="https://www.google.com/maps/search/?api=1&amp;query=No.%20258%20Guangcun%20Road%2C%20Yangwang%20Economic%20Park%2C%20Nanqiao%20Town%2C%20Fengxian%20District%2C%20Shanghai" target="_blank" rel="noopener noreferrer" class="flex items-start gap-2 hover:text-[#1B365D]"><span class="material-symbols-outlined text-[#1B365D] text-base">location_on</span><span>No. 258 Guangcun Road, Nanqiao Town, Fengxian District, Shanghai, China</span></a>';
        html += '</div>';
        html += '<div class="mt-7 flex items-center gap-3">';
        html += '<a href="https://www.facebook.com/profile.php?id=100090904592502&amp;mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook" class="inline-flex h-10 w-10 items-center justify-center border border-slate-300 text-[#1B365D] hover:bg-[#1B365D] hover:text-white"><svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 22v-9h3l.5-3h-3.5V8.3c0-.9.3-1.8 1.8-1.8H17V3.8c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5V10H7v3h3v9h3.5z"/></svg></a>';
        html += '<a href="https://x.com/YMINcapacitor" target="_blank" rel="noopener noreferrer" aria-label="X" title="X" class="inline-flex h-10 w-10 items-center justify-center border border-slate-300 text-[#1B365D] hover:bg-[#1B365D] hover:text-white"><svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>';
        html += '<a href="https://youtube.com/@shanghaiyongmingelectroniccolt" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube" class="inline-flex h-10 w-10 items-center justify-center border border-slate-300 text-[#1B365D] hover:bg-[#1B365D] hover:text-white"><svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg></a>';
        html += '<a href="https://www.linkedin.com/company/shanghai-yongming-electronic/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn" class="inline-flex h-10 w-10 items-center justify-center border border-slate-300 text-[#1B365D] hover:bg-[#1B365D] hover:text-white"><svg aria-hidden="true" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.32 7.41a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.1 20.45H3.54V8.98H7.1v11.47z"/></svg></a>';
        html += '</div></div>';

        html += '</div>';
        html += '<div class="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">';
        html += '<p class="text-[10px] uppercase tracking-wider text-slate-400">© 2026 YMIN Electronics Co., Ltd. All rights reserved.</p>';
        html += '<div class="flex gap-8"><a href="#" class="text-[10px] uppercase tracking-wider text-slate-400 hover:text-[#1B365D]">Privacy Policy</a><a href="#" class="text-[10px] uppercase tracking-wider text-slate-400 hover:text-[#1B365D]">Terms of Use</a></div>';
        html += '</div></footer>';
        return html;
    }

    function render() {
        return isEnglishPage() ? renderEnglish() : renderChinese();
    }

    function inject(containerId) {
        var id = containerId || 'ymin-footer';
        var el = document.getElementById(id);
        if (el) el.outerHTML = render();
    }

    return { render: render, inject: inject };
})();
