(function () {
    'use strict';

    var data = window.YMIN_TIMELINE_DATA || { company: [], product: [] };

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function renderCompanyCard(company) {
        if (!company) {
            return '<article class="about-history-card is-empty" aria-hidden="true"><span>—</span></article>';
        }
        return '<article class="about-history-card is-company">' +
            '<h3>' + escapeHtml(company.title) + '</h3>' +
            (company.text ? '<p>' + escapeHtml(company.text) + '</p>' : '') +
        '</article>';
    }

    function escapeRegExp(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function renderEventText(event) {
        var text = String(event.text == null ? '' : event.text);
        var keywords = event.highlight || [];
        if (!keywords.length) return escapeHtml(text);

        var pattern = new RegExp('(' + keywords.map(escapeRegExp).join('|') + ')', 'g');
        return text.split(pattern).map(function (part) {
            return keywords.indexOf(part) > -1
                ? '<strong class="about-history-keyword">' + escapeHtml(part) + '</strong>'
                : escapeHtml(part);
        }).join('');
    }

    function renderEventList(events) {
        return '<ul class="about-history-event-list">' + events.map(function (event) {
            return '<li>' + renderEventText(event) + '</li>';
        }).join('') + '</ul>';
    }

    function renderProductCard(product) {
        if (!product) {
            return '<article class="about-history-card is-empty" aria-hidden="true"><span>—</span></article>';
        }

        var events = product.events || [];
        var majorEvents = events.filter(function (event) { return event.major; });
        var regularEvents = events.filter(function (event) { return !event.major; });

        if (!majorEvents.length) {
            return '<article class="about-history-card is-product">' +
                renderEventList(regularEvents) +
            '</article>';
        }

        var majorPanel = '<article class="about-history-major">' +
            '<div class="about-history-major-head"><span>新产品线</span></div>' +
            '<div class="about-history-major-list">' + majorEvents.map(function (event) {
                return '<div class="about-history-major-row">' +
                    '<strong>' + escapeHtml(event.text) + '</strong>' +
                    (event.image ? '<img src="' + escapeHtml(event.image) + '" alt="" loading="lazy">' : '') +
                '</div>';
            }).join('') + '</div>' +
        '</article>';

        var regularPanel = regularEvents.length
            ? '<article class="about-history-regular">' +
                '<span class="about-history-regular-title">其他产品与技术突破</span>' +
                renderEventList(regularEvents) +
              '</article>'
            : '';

        return '<div class="about-history-product-stack">' + majorPanel + regularPanel + '</div>';
    }

    function render() {
        var root = document.querySelector('[data-about-dual-timeline]');
        if (!root) return;

        var companyByYear = {};
        (data.company || []).forEach(function (item) { companyByYear[item.year] = item; });

        var productByYear = {};
        (data.product || []).forEach(function (item) { productByYear[item.year] = item; });

        var years = Object.keys(companyByYear).concat(Object.keys(productByYear));
        years = years.filter(function (year, index, list) {
            return list.indexOf(year) === index;
        }).sort(function (a, b) {
            return Number(a) - Number(b);
        });

        root.innerHTML = years.map(function (year) {
            var company = companyByYear[year];
            var product = productByYear[year];
            var hasMajor = product && (product.events || []).some(function (event) { return event.major; });

            return '<section class="about-history-year' + (hasMajor ? ' has-major' : '') + '">' +
                '<div class="about-history-company">' + renderCompanyCard(company) + '</div>' +
                '<div class="about-history-center"><span>' + escapeHtml(year) + '</span></div>' +
                '<div class="about-history-product">' + renderProductCard(product) + '</div>' +
            '</section>';
        }).join('');
    }

    document.addEventListener('DOMContentLoaded', render);
})();
