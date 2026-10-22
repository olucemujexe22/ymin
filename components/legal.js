/**
 * Site-wide legal document helpers.
 * Content language is controlled by components/i18n.js.
 */
(function (window, document) {
  'use strict';

  function init() {
    var documentType = document.body.getAttribute('data-legal-document');
    var language = (window.YMIN && YMIN.i18n && YMIN.i18n.language) || 'zh-CN';
    var isEnglish = String(language).toLowerCase().indexOf('zh') !== 0;
    var title = document.querySelector('title');
    var description = document.querySelector('meta[name="description"]');

    if (documentType === 'privacy' && isEnglish) {
      if (title) title.textContent = 'Privacy Policy - YMIN';
      if (description) description.setAttribute('content', 'How YMIN collects, uses, shares, retains and protects personal information on its official website.');
    } else if (documentType === 'privacy') {
      if (title) title.textContent = '隐私政策 - YMIN';
      if (description) description.setAttribute('content', '永铭电子官网隐私政策，说明个人信息收集、使用、共享、保存、安全保护及用户权利。');
    } else if (documentType === 'terms' && isEnglish) {
      if (title) title.textContent = 'Terms of Use - YMIN';
      if (description) description.setAttribute('content', 'Terms governing access to the YMIN website, technical materials, design tools and online services.');
    } else if (documentType === 'terms') {
      if (title) title.textContent = '使用条款 - YMIN';
      if (description) description.setAttribute('content', '永铭电子官网使用条款，说明网站访问、资料下载、设计工具、知识产权及责任范围。');
    } else if (documentType === 'cookie' && isEnglish) {
      if (title) title.textContent = 'Cookie Policy - YMIN';
      if (description) description.setAttribute('content', 'How the YMIN website uses cookies, local storage, analytics and preference technologies, and how you can manage them.');
    } else if (documentType === 'cookie') {
      if (title) title.textContent = 'Cookie 政策 - YMIN';
      if (description) description.setAttribute('content', '永铭电子官网 Cookie 政策，说明 Cookie、本地存储、用途、第三方服务及管理方式。');
    }

    var topButton = document.querySelector('[data-legal-top]');
    if (topButton) {
      if (isEnglish) topButton.setAttribute('aria-label', 'Back to top');
      var updateButton = function () {
        topButton.classList.toggle('is-visible', window.scrollY > 520);
      };
      updateButton();
      window.addEventListener('scroll', updateButton, { passive: true });
      topButton.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    var links = Array.prototype.slice.call(document.querySelectorAll('.legal-toc a[href^="#"]'));
    var sections = links.map(function (link) {
      return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

    var observer = new IntersectionObserver(function (entries) {
      var visible = entries.filter(function (entry) { return entry.isIntersecting; });
      if (!visible.length) return;
      var activeId = visible.sort(function (a, b) {
        return b.intersectionRatio - a.intersectionRatio;
      })[0].target.id;
      links.forEach(function (link) {
        var active = link.getAttribute('href') === '#' + activeId;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    }, {
      rootMargin: '-90px 0px -62% 0px',
      threshold: [0.1, 0.35, 0.65]
    });

    sections.forEach(function (section) { observer.observe(section); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})(window, document);
