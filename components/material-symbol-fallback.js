(function (global) {
    'use strict';

    var symbolMap = {
        expand_more: '▾', chevron_right: '›', arrow_forward: '→', arrow_back: '←',
        language: '◎', person: '●', search: '⌕', download: '↓', upload: '↑',
        call: '☎', phone_in_talk: '☎', mail: '✉', location_on: '⌖',
        home: '⌂', check: '✓', close: '×', add: '+', remove: '−',
        description: '▤', newspaper: '▤', inventory_2: '□', query_stats: '▥',
        timer: '◷', build: '⚙', settings: '⚙', token: '◇', memory: '▦',
        directions_car: '◆', car_crash: '◆', local_shipping: '▰',
        emergency_share: '!', lock_open: '◇', sensor_door: '▯', window: '▦',
        power: 'ϟ', electrical_services: 'ϟ', electric_bolt: 'ϟ',
        battery_charging_full: '▥', offline_bolt: 'ϟ', ac_unit: '❄',
        severe_cold: '❄', photo: '▧', account_tree: '⌘',
        qr_code_scanner: '▦', menu: '☰', visibility: '◉', visibility_off: '○',
        login: '→', logout: '←', open_in_new: '↗', compare_arrows: '⇄',
        filter_alt: '▽', tune: '≡', refresh: '↻', delete: '×', edit: '✎'
    };
    var fallbackActivated = false;

    function materialFontAvailable() {
        var probe = document.createElement('span');
        probe.textContent = 'expand_more';
        probe.style.cssText = "position:absolute;left:-9999px;top:-9999px;visibility:hidden;white-space:nowrap;font:normal 24px/1 'Material Symbols Outlined';font-feature-settings:'liga';";
        document.body.appendChild(probe);
        var width = probe.getBoundingClientRect().width;
        probe.remove();
        return width > 0 && width <= 48;
    }

    function replaceSymbols(root) {
        var scope = root && root.querySelectorAll ? root : document;
        scope.querySelectorAll('.material-symbols-outlined:not([data-material-symbol])').forEach(function (element) {
            var name = String(element.textContent || '').trim();
            if (!name) return;
            element.dataset.materialSymbol = name;
            element.setAttribute('title', element.getAttribute('title') || name.replace(/_/g, ' '));
            element.textContent = symbolMap[name] || '◆';
            element.classList.add('material-symbol-fallback');
        });
    }

    function activateFallback() {
        if (fallbackActivated) return;
        if (materialFontAvailable()) return;
        fallbackActivated = true;
        document.documentElement.classList.add('material-symbols-unavailable');
        replaceSymbols(document);
        new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType !== 1) return;
                    if (node.matches && node.matches('.material-symbols-outlined')) replaceSymbols(node.parentNode || document);
                    else replaceSymbols(node);
                });
            });
        }).observe(document.body, { childList: true, subtree: true });
    }

    function start() {
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(activateFallback, activateFallback);
        else activateFallback();
        global.setTimeout(activateFallback, 800);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
})(window);
