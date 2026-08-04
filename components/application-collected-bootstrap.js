(function (global) {
    'use strict';

    var script = document.currentScript;
    var pageKey = script && script.dataset ? script.dataset.pageKey : '';

    function start() {
        if (!global.YMIN || !global.YMIN.applicationCollectedPage || !pageKey) return;
        if (global.YMIN.navbar) global.YMIN.navbar.inject('applications');
        if (global.YMIN.footer) global.YMIN.footer.inject();
        global.YMIN.applicationCollectedPage.init({ pageKey: pageKey });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})(window);
