/* ============================================================
   Recello — Zajedničke komponente sajta
   ------------------------------------------------------------
   Ubaci ovaj skript na KRAJU body-ja svake stranice:
     <script src="assets/js/components.js" data-page="usluge" data-base=""></script>
   Za stranice u docs/ folderu koristi:
     <script src="../assets/js/components.js" data-page="pocetak" data-base="../"></script>

   data-page  → ključ aktivne stranice (vidi NAV ispod)
   data-base  → prefiks za assets putanje ('../' za docs/)
============================================================ */
(function () {
  const script = document.currentScript;
  const page = (script && script.getAttribute('data-page')) || 'pocetna';
  const base = (script && script.getAttribute('data-base')) || '';

  const NAV = [
    { key: 'pocetna', label: 'Home', href: 'index.html' },
    {
      key: 'usluge', label: 'Services', href: 'usluge.html', dropdown: true,
      items: [
        { key: 'usluge', label: 'Services', desc: '24/7 answering, chat, orders and transfer', href: 'usluge.html' },
        { key: 'o-nama', label: 'About us', desc: 'Our story and principles', href: 'o-nama.html' },
        { key: 'kako-radi', label: 'How it works', desc: 'Live in less than a day', href: 'kako-radi.html' },
        { key: 'cijene', label: 'Pricing', desc: 'Simple plans, no commitment', href: 'cijene.html' },
        { key: 'faq', label: 'FAQ', desc: 'Quick answers to everything', href: 'faq.html' },
      ],
    },
    {
      key: 'dokumentacija', label: 'Documentation', href: 'docs/pocetak.html', dropdown: true,
      items: [
        { key: 'pocetak', label: 'Quick start', desc: 'From zero to first call', href: 'docs/pocetak.html' },
        { key: 'nabavite-broj', label: 'DID number', desc: 'A business number for your company', href: 'docs/nabavite-broj.html' },
        { key: 'chat', label: 'Chat', desc: 'Teach the receptionist your data', href: 'docs/chat.html' },
        { key: 'narudzbe-termini', label: 'Bookings', desc: 'How customers order and book', href: 'docs/narudzbe-termini.html' },
        { key: 'mobilna-aplikacija', label: 'Mobile app', desc: 'Everything about the app', href: 'docs/mobilna-aplikacija.html' },
        { key: 'cijene-i-paketi', label: 'Pricing', desc: 'Details of every plan', href: 'docs/cijene-i-paketi.html' },
        { key: 'placanje', label: 'Payment & billing', desc: 'Invoices, VAT, guarantee, cancelling', href: 'docs/placanje.html' },
      ],
    },
    { key: 'kontakt', label: 'Contact', href: 'kontakt.html' },
  ];

  const DOCS_NAV = [
    { key: 'pocetak', label: 'Quick start', href: 'docs/pocetak.html', icon: 'rocket' },
    { key: 'verifikacija', label: 'Identity verification', href: 'docs/verifikacija.html', icon: 'help' },
    { key: 'nabavite-broj', label: 'Getting a DID number', href: 'docs/nabavite-broj.html', icon: 'phone-call' },
    { key: 'chat', label: 'Chat management', href: 'docs/chat.html', icon: 'message-circle' },
    { key: 'narudzbe-termini', label: 'Orders & appointments', href: 'docs/narudzbe-termini.html', icon: 'clipboard-list' },
    { key: 'mobilna-aplikacija', label: 'Mobile app', href: 'docs/mobilna-aplikacija.html', icon: 'device-mobile' },
    { key: 'cijene-i-paketi', label: 'Pricing & plans', href: 'docs/cijene-i-paketi.html', icon: 'tag' },
    { key: 'placanje', label: 'Payment & billing', href: 'docs/placanje.html', icon: 'card' },
    { key: 'faq-docs', label: 'FAQ', href: 'faq.html', icon: 'help-circle' },
  ];

  const icon = (name) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="${{
      phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
      headset: 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
      chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
      book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
      rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
      'phone-call': 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92zM16 2a5 5 0 0 1 5 5M16 6a2 2 0 0 1 2 2',
      'message-circle': 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z',
      'clipboard-list': 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 12h.01M13 12h2M9 16h.01M13 16h2',
      'device-mobile': 'M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z',
      'layout-dashboard': 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
      tag: 'M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82zM7 7h.01',
      card: 'M2 5h20a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm0 6h20v4H2zM6 17h4',
      'help-circle': 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z',
      check: 'M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3',
      arrow: 'M7 17L17 7M7 7h10v10',
      mail: 'M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6',
      facebook: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z',
      instagram: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M2 2h20v20H2z',
      linkedin: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
      users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
      settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z',
      help: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z',
      calendar: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01',
      mobile: 'M12 18h.01M8 21h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z',
    }[name] || ''}"/></svg>`;

  function renderHeader() {
    const navItems = NAV.map((n) => {
      if (n.dropdown) {
        const activeIn = n.items.some((i) => i.key === page) || n.key === page;
        const items = n.items
          .map(
            (i) =>
              `<a class="dropdown-item${i.key === page ? ' active' : ''}" href="${base}${i.href}">
                 <span class="dd-text">
                   <span class="dd-label">${i.label}</span>
                   <span class="dd-desc">${i.desc}</span>
                 </span>
               </a>`
          )
          .join('');
        return `<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle${activeIn ? ' active' : ''}" href="${base}${n.href}" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">${n.label}</a>
          <div class="dropdown-menu dropdown-menu-custom">
            <div class="dd-grid">${items}</div>
          </div>
        </li>`;
      }
      return `<li class="nav-item"><a class="nav-link${n.key === page ? ' active' : ''}" href="${base}${n.href}">${n.label}</a></li>`;
    }).join('');

    const el = document.getElementById('siteHeader');
    if (!el) return;
    el.innerHTML = `
      <header class="header-area style-two">
        <div class="header-top">
          <div class="container h-100 d-flex align-items-center justify-content-between">
            <div class="left-side d-flex align-items-center gap-4 gap-lg-5">
              <div class="d-flex align-items-center gap-2 text-white">
                ${icon('headset')}
                <span class="d-none d-lg-block">24/7 — no call is ever missed</span>
              </div>
              <div class="d-flex align-items-center gap-2 text-white">
                ${icon('phone')}
                <span class="d-none d-lg-block">+387 70 330 049</span>
              </div>
            </div>
            <div class="right-side">
              <div class="social-nav d-flex align-items-center gap-3">
                <a href="#">${icon('facebook')}</a>
                <a href="#">${icon('instagram')}</a>
                <a href="#">${icon('linkedin')}</a>
              </div>
            </div>
          </div>
        </div>

        <nav class="navbar navbar-expand-lg">
          <div class="container navbar-container">
            <a class="navbar-brand" href="${base}index.html">
              <img src="${base}assets/img/core-img/logo.png" alt="Recello" style="max-height:56px;width:auto;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#softoraNav" aria-controls="softoraNav" aria-expanded="false" aria-label="Toggle navigation">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            </button>
            <div class="collapse navbar-collapse" id="softoraNav">
              <ul class="navbar-nav navbar-nav-scroll">${navItems}</ul>
              <div class="d-flex align-items-center mt-4 mt-lg-0 ms-lg-4 navbar-mobile-cta">
                <a href="${base}verify.html" class="btn btn-primary">Get started ${icon('arrow')}</a>
              </div>
            </div>
            <div class="navbar-desktop-cta">
              <a href="${base}verify.html" class="btn btn-primary">Get started ${icon('arrow')}</a>
            </div>
          </div>
        </nav>
      </header>`;
  }

  function renderBackToTop() {
    // Dokumentacija nema back-to-top dugme
    if (document.getElementById('docsSidebar')) return;
    if (document.getElementById('scrollTopButton')) return;
    const btn = document.createElement('button');
    btn.id = 'scrollTopButton';
    btn.className = 'softora-scrolltop scrolltop-hide';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`;
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
    document.body.appendChild(btn);
  }

  function renderFooter() {
    const el = document.getElementById('siteFooter');
    if (!el) return;
    const year = new Date().getFullYear();
    el.innerHTML = `
      <footer class="footer-wrapper">
        <div class="divider"></div>
        <div class="container">
          <div class="row g-5">
            <div class="col-12 col-sm-6 col-lg-4">
              <div class="footer-card pe-lg-5">
                <a href="${base}index.html" class="d-block mb-4">
                  <img src="${base}assets/img/core-img/logo.png" alt="Recello" style="max-height:46px;width:auto;">
                </a>
                <p class="mb-0">Recello — a smart AI receptionist that answers for you 24/7. AI Secretary for your business.</p>
                <div class="social-nav">
                  <a href="#">${icon('facebook')}</a>
                  <a href="#">${icon('instagram')}</a>
                  <a href="#">${icon('linkedin')}</a>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Navigation</h5>
                <ul class="footer-nav">
                  <li><a href="${base}index.html">Home</a></li>
                  <li><a href="${base}o-nama.html">About us</a></li>
                  <li><a href="${base}usluge.html">Services</a></li>
                  <li><a href="${base}kako-radi.html">How it works</a></li>
                  <li><a href="${base}cijene.html">Pricing</a></li>
                  <li><a href="${base}verify.html">Verify &amp; start</a></li>
                  <li><a href="${base}kontakt.html">Contact</a></li>
                </ul>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Features</h5>
                <ul class="footer-nav">
                  <li><a href="${base}usluge.html#24-7">24/7 answering</a></li>
                  <li><a href="${base}usluge.html#chat">Chat that remembers everything</a></li>
                  <li><a href="${base}usluge.html#narudzbe">Orders & appointments</a></li>
                  <li><a href="${base}usluge.html#transfer">Smart call transfer</a></li>
                  <li><a href="${base}kako-radi.html">How it works</a></li>
                </ul>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Documentation</h5>
                <ul class="footer-nav">
                  <li><a href="${base}docs/pocetak.html">Quick start</a></li>
                  <li><a href="${base}docs/nabavite-broj.html">Getting a DID number</a></li>
                  <li><a href="${base}docs/chat.html">Chat commands</a></li>
                  <li><a href="${base}docs/narudzbe-termini.html">Orders & appointments</a></li>
                  <li><a href="${base}docs/mobilna-aplikacija.html">Mobile app</a></li>
                  <li><a href="${base}docs/placanje.html">Payment &amp; billing</a></li>
                  <li><a href="${base}faq.html">FAQ</a></li>
                </ul>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Contact</h5>
                <ul class="footer-nav">
                  <li><a href="mailto:lumionoai@gmail.com">lumionoai@gmail.com</a></li>
                  <li><a href="tel:+38770330049">+387 70 330 049</a></li>
                  <li><a href="#">United Kingdom</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="copyright-wrapper">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-12 col-md-6">
                <p class="mb-3 mb-md-0 copyright">Copyright © ${year} <a href="${base}index.html">Recello</a> — All rights reserved.</p>
              </div>
              <div class="col-12 col-md-6">
                <div class="footer-bottom-nav">
                  <a href="${base}privacy.html">Privacy Policy</a>
                  <a href="${base}terms.html">Terms of Service</a>
                  <a href="${base}kontakt.html">Contact</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>`;
  }

  // Mobile: dropdown (Usluge / Dokumentacija) radi kao accordion unutar
  // hamburger menija. Bootstrap dropdown bi preusmjerio na href — mi to
  // zaustavimo i ručno prebacujemo .show klasu.
  function initMobileDropdown() {
    const header = document.querySelector('.header-area');
    if (!header) return;

    header.addEventListener('click', (e) => {
      const toggle = e.target.closest('.nav-item.dropdown > .dropdown-toggle');
      if (!toggle || window.innerWidth >= 992) return;
      e.preventDefault();
      e.stopPropagation();
      const item = toggle.closest('.nav-item.dropdown');
      const wasOpen = item.classList.contains('show');

      // Close all others (accordion behaviour)
      header.querySelectorAll('.nav-item.dropdown.show').forEach((o) => {
        if (o !== item) {
          o.classList.remove('show');
          const t = o.querySelector('.dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('show', !wasOpen);
      toggle.setAttribute('aria-expanded', String(!wasOpen));
    });

    // Kad se hamburger meni zatvori, resetiraj otvorene dropdown-ove
    document.addEventListener('hidden.bs.collapse', (e) => {
      if (e.target && e.target.id === 'softoraNav') {
        header.querySelectorAll('.nav-item.dropdown.show').forEach((o) => {
          o.classList.remove('show');
          const t = o.querySelector('.dropdown-toggle');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  function renderDocsSidebar() {
    const el = document.getElementById('docsSidebar');
    if (!el) return;
    const items = DOCS_NAV.map(
      (d) =>
        `<a class="docs-nav-item${d.key === page ? ' active' : ''}" href="${base}${d.href}">
           <span class="docs-nav-icon">${icon(d.icon)}</span>${d.label}
         </a>`
    ).join('');
    el.innerHTML = `
      <div class="docs-sidebar-sticky">
        <div class="docs-sidebar-title">Documentation</div>
        <nav class="docs-nav">${items}</nav>
      </div>`;
  }

  // Cookie consent banner (PECR: analytics cookies need opt-in consent).
  // Only strictly-necessary cookies are set by default — the banner documents this.
  function renderCookieBanner() {
    if (document.getElementById('cookieBanner')) return;
    const banner = document.createElement('div');
    banner.id = 'cookieBanner';
    banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:99999;background:#0B0E14;color:#fff;padding:16px 20px;box-shadow:0 -6px 24px rgba(0,0,0,.25);font-size:14px;';
    banner.innerHTML = `
      <div style="max-width:1100px;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;">
        <div style="flex:1 1 300px;">
          <strong>🍪 Cookies</strong> — this site uses only strictly necessary cookies to function. We do not set analytics or marketing cookies without your consent. See our <a href="${base}privacy.html" style="color:#C9B4FF;text-decoration:underline;">Privacy Policy</a>.
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <button id="cookieAccept" style="background:#601FEB;color:#fff;border:none;border-radius:8px;padding:8px 18px;font-weight:600;cursor:pointer;">Accept</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
    document.getElementById('cookieAccept').addEventListener('click', function () {
      try { localStorage.setItem('luminaCookieConsent', 'accepted'); } catch (e) {}
      banner.remove();
    });
    try {
      if (localStorage.getItem('luminaCookieConsent')) banner.remove();
    } catch (e) {}
  }

  // Run immediately (script is at the end of body): header/footer/sidebar must exist before active.js
  renderHeader();
  renderFooter();
  renderDocsSidebar();
  renderBackToTop();
  renderCookieBanner();
  initMobileDropdown();
})();
