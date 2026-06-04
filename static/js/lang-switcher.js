(function () {
  var LANGS = ['en', 'zh', 'ja'];
  var KEY = 'site-lang';

  function apply(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'en';
    localStorage.setItem(KEY, lang);
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.classList.toggle('active', b.dataset.lang === lang);
    });

    document.querySelectorAll('[data-i18n]').forEach(function (wrap) {
      var children = wrap.querySelectorAll(':scope > [lang]');
      var found = false;
      children.forEach(function (el) {
        if (el.getAttribute('lang') === lang) { found = true; }
      });
      var target = found ? lang : 'en';
      children.forEach(function (el) {
        var show = el.getAttribute('lang') === target;
        el.style.display = show ? (el.tagName === 'SPAN' ? 'inline' : 'block') : 'none';
      });
    });
  }

  function init() {
    var lang = localStorage.getItem(KEY) || 'en';
    document.querySelectorAll('.lang-btn').forEach(function (b) {
      b.addEventListener('click', function () { apply(b.dataset.lang); });
    });
    apply(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
