/**
 * Fills [data-legal-email], [data-legal-mailto], [data-legal-base] from config.js.
 * When contactEmail is missing or an UNSET_* sentinel, contact nodes show
 * "the support page" and point at support.html so the public pages never
 * display the placeholder. A real email renders as text plus a mailto link.
 */
(function () {
  var cfg = window.MILESCOPE_LEGAL || {};
  var email = cfg.contactEmail || '';
  var unset = !email || /^UNSET_/i.test(email);
  var base = (cfg.baseUrl || '').replace(/\/$/, '');
  var contactText = unset ? 'the support page' : email;
  var contactHref = unset ? 'support.html' : ('mailto:' + email);

  var nodes = document.querySelectorAll('[data-legal-email]');
  for (var i = 0; i < nodes.length; i++) {
    nodes[i].textContent = contactText;
    if (nodes[i].tagName === 'A' && nodes[i].getAttribute('data-legal-mailto') == null) {
      nodes[i].setAttribute('href', contactHref);
    }
  }
  var mails = document.querySelectorAll('[data-legal-mailto]');
  for (var j = 0; j < mails.length; j++) {
    mails[j].setAttribute('href', contactHref);
    if (!mails[j].textContent || mails[j].getAttribute('data-legal-email') != null) {
      mails[j].textContent = contactText;
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
