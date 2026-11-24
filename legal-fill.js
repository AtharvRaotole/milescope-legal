/**
 * Fills [data-legal-email], [data-legal-mailto], [data-legal-base] from config.js.
 * Safe no-op when config still has UNSET sentinels (pages show the placeholder text).
 */
(function () {
  var cfg = window.MILESCOPE_LEGAL || {};
  var email = cfg.contactEmail || 'UNSET_LEGAL_CONTACT_EMAIL';
  var base = (cfg.baseUrl || '').replace(/\/$/, '');
  var nodes = document.querySelectorAll('[data-legal-email]');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].textContent = email;
  }
  var mails = document.querySelectorAll('[data-legal-mailto]');
  for (var j = 0; j < mails.length; j++) {
    mails[j].setAttribute('href', 'mailto:' + email);
    if (!mails[j].textContent || mails[j].getAttribute('data-legal-email') != null) {
      mails[j].textContent = email;
    }
  }
  var bases = document.querySelectorAll('[data-legal-base]');
  for (var k = 0; k < bases.length; k++) {
    var path = bases[k].getAttribute('data-legal-path') || '';
    var href = path ? base + '/' + path.replace(/^\//, '') : base || '#';
    bases[k].setAttribute('href', href);
    if (bases[k].getAttribute('data-legal-show-url') === '1') {
      bases[k].textContent = href;
    }
  }
})();