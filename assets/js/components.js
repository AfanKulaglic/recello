/* ============================================================
   Recello — Zajedničke komponente sajta
   ------------------------------------------------------------
   Ubaci ovaj skript na KRAJU body-ja svake stranice:
     <script src="assets/js/components.js" data-page="services" data-base=""></script>
   Za stranice u docs/ folderu koristi:
     <script src="../assets/js/components.js" data-page="getting-started" data-base="../"></script>

   data-page  → ključ aktivne stranice (vidi NAV ispod)
   data-base  → prefiks za assets putanje ('../' za docs/)
============================================================ */
(function () {
  const script = document.currentScript;
  const page = (script && script.getAttribute('data-page')) || 'pocetna';
  const base = (script && script.getAttribute('data-base')) || '';

  const NAV = [
    { key: 'home', label: 'Home', href: 'index.html' },
    {
      key: 'services', label: 'Services', href: 'services.html', dropdown: true,
      items: [
        { key: 'services', label: 'Services', desc: '24/7 answering, chat, orders and transfer', href: 'services.html' },
        { key: 'about', label: 'About us', desc: 'Our story and principles', href: 'about.html' },
        { key: 'how-it-works', label: 'How it works', desc: 'Live in less than a day', href: 'how-it-works.html' },
        { key: 'pricing', label: 'Pricing', desc: 'Simple plans, no commitment', href: 'pricing.html' },
        { key: 'faq', label: 'FAQ', desc: 'Quick answers to everything', href: 'faq.html' },
      ],
    },
    {
      key: 'documentation', label: 'Documentation', href: 'docs/getting-started.html', dropdown: true,
      items: [
        { key: 'getting-started', label: 'Quick start', desc: 'From zero to first call', href: 'docs/getting-started.html' },
        { key: 'getting-a-number', label: 'Phone number', desc: 'Your own number, or get one with our help', href: 'docs/getting-a-number.html' },
        { key: 'chat', label: 'Chat', desc: 'Teach the receptionist your data', href: 'docs/chat.html' },
        { key: 'orders-appointments', label: 'Bookings', desc: 'How customers order and book', href: 'docs/orders-appointments.html' },
        { key: 'mobile-app', label: 'Mobile app', desc: 'Everything about the app', href: 'docs/mobile-app.html' },
        { key: 'pricing-plans', label: 'Pricing', desc: 'Details of every plan', href: 'docs/pricing-plans.html' },
        { key: 'payment', label: 'Payment & billing', desc: 'Invoices, VAT, guarantee, cancelling', href: 'docs/payment.html' },
      ],
    },
    { key: 'contact', label: 'Contact', href: 'contact.html' },
  ];

  const DOCS_NAV = [
    { key: 'getting-started', label: 'Quick start', href: 'docs/getting-started.html', icon: 'rocket' },
    { key: 'benefits', label: 'Benefits', href: 'docs/benefits.html', icon: 'star' },
    { key: 'getting-a-number', label: 'Phone number', href: 'docs/getting-a-number.html', icon: 'phone-call' },
    { key: 'chat', label: 'Chat management', href: 'docs/chat.html', icon: 'message-circle' },
    { key: 'orders-appointments', label: 'Orders & appointments', href: 'docs/orders-appointments.html', icon: 'clipboard-list' },
    { key: 'mobile-app', label: 'Mobile app', href: 'docs/mobile-app.html', icon: 'device-mobile' },
    { key: 'pricing-plans', label: 'Pricing & plans', href: 'docs/pricing-plans.html', icon: 'tag' },
    { key: 'payment', label: 'Payment & billing', href: 'docs/payment.html', icon: 'card' },
    { key: 'faq-docs', label: 'FAQ', href: 'faq.html', icon: 'help-circle' },
  ];

  const icon = (name) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="${{
      phone: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
      headset: 'M3 18v-6a9 9 0 0 1 18 0v6M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z',
      chat: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z',
      book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 19.5A2.5 2.5 0 0 0 6.5 22H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z',
      rocket: 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2zM9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5',
      star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
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
                <a href="https://www.facebook.com/profile.php?id=61592861595686" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
                <a href="https://www.instagram.com/recello_ai_secretary/" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
                <a href="https://www.linkedin.com/in/recello-secretary-3aa183429/" target="_blank" rel="noopener" aria-label="LinkedIn">${icon('linkedin')}</a>
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
                <a href="${base}order.html" class="btn btn-primary">Get started ${icon('arrow')}</a>
              </div>
            </div>
            <div class="navbar-desktop-cta">
              <a href="${base}order.html" class="btn btn-primary">Get started ${icon('arrow')}</a>
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
    // Pozicija: IZNAD chat balona (oba su u donjem desnom uglu), a z-index
    // veći od cookie bannera da ga banner nikad ne prekrije.
    btn.style.bottom = '96px';
    btn.style.right = '32px';
    btn.style.zIndex = '99997';
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
                  <a href="https://www.facebook.com/profile.php?id=61592861595686" target="_blank" rel="noopener" aria-label="Facebook">${icon('facebook')}</a>
                  <a href="https://www.instagram.com/recello_ai_secretary/" target="_blank" rel="noopener" aria-label="Instagram">${icon('instagram')}</a>
                  <a href="https://www.linkedin.com/in/recello-secretary-3aa183429/" target="_blank" rel="noopener" aria-label="LinkedIn">${icon('linkedin')}</a>
                </div>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Navigation</h5>
                <ul class="footer-nav">
                  <li><a href="${base}index.html">Home</a></li>
                  <li><a href="${base}about.html">About us</a></li>
                  <li><a href="${base}services.html">Services</a></li>
                  <li><a href="${base}how-it-works.html">How it works</a></li>
                  <li><a href="${base}pricing.html">Pricing</a></li>
                  <li><a href="${base}contact.html">Order &amp; contact</a></li>
                </ul>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Features</h5>
                <ul class="footer-nav">
                  <li><a href="${base}services.html#24-7">24/7 answering</a></li>
                  <li><a href="${base}services.html#chat">Chat that remembers everything</a></li>
                  <li><a href="${base}services.html#orders">Orders & appointments</a></li>
                  <li><a href="${base}services.html#transfer">Smart call transfer</a></li>
                  <li><a href="${base}how-it-works.html">How it works</a></li>
                </ul>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Documentation</h5>
                <ul class="footer-nav">
                  <li><a href="${base}docs/getting-started.html">Quick start</a></li>
                  <li><a href="${base}docs/getting-a-number.html">Phone number guide</a></li>
                  <li><a href="${base}docs/chat.html">Chat commands</a></li>
                  <li><a href="${base}docs/orders-appointments.html">Orders & appointments</a></li>
                  <li><a href="${base}docs/mobile-app.html">Mobile app</a></li>
                  <li><a href="${base}docs/payment.html">Payment &amp; billing</a></li>
                  <li><a href="${base}faq.html">FAQ</a></li>
                </ul>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Guides</h5>
                <ul class="footer-nav">
                  <li><a href="${base}guides/ai-receptionist-for-small-businesses.html">AI receptionist for small businesses</a></li>
                  <li><a href="${base}guides/virtual-receptionist-cost.html">Virtual receptionist cost UK</a></li>
                  <li><a href="${base}guides/ai-phone-answering-service.html">AI phone answering service</a></li>
                  <li><a href="${base}guides/ai-receptionist-for-tradespeople.html">For plumbers &amp; tradespeople</a></li>
                  <li><a href="${base}guides/ai-receptionist-for-salons.html">For salons &amp; barbers</a></li>
                  <li><a href="${base}guides/missed-calls-cost.html">What missed calls cost you</a></li>
                </ul>
              </div>
            </div>

            <div class="col-12 col-sm-6 col-lg">
              <div class="footer-card">
                <h5 class="mb-4">Contact</h5>
                <ul class="footer-nav">
                  <li><a href="mailto:hello@recello.co.uk">hello@recello.co.uk</a></li>
                  <li><a href="mailto:support@recello.co.uk">support@recello.co.uk</a></li>
                  <li><a href="mailto:sales@recello.co.uk">sales@recello.co.uk</a></li>
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
                  <a href="${base}refunds.html">Refund Policy</a>
                  <a href="${base}contact.html">Contact</a>
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
    // Kompaktna kartica u DONJEM LIJEVOM uglu — ne dira desni ugao gdje su
    // chat balon i back-to-top dugme. Z-index ispod njih (99994).
    banner.style.cssText = 'position:fixed;bottom:16px;left:16px;z-index:99994;max-width:480px;background:#0B0E14;color:#fff;padding:14px 18px;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,.25);font-size:13.5px;line-height:1.45;';
    banner.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div>
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

  // ============================================================
  // CHAT WIDGET — "Iris", AI asistent sa prezentacijske stranice
  // ------------------------------------------------------------
  // Plivajući balon u donjem desnom uglu. Klik → otvori panel sa
  // kratkom porukom, predloženim pitanjima i chatom.
  // Poziva /api/chat (Vercel serverless proxy → backend → Groq,
  // najjeftiniji model). Radi na svakoj stranici jer je dio components.js.
  // ============================================================
  function renderChatWidget() {
    if (document.getElementById('recelloChatWidget')) return;

    const style = document.createElement('style');
    style.textContent = `
      #recelloChatWidget { --cw-primary:#601FEB; --cw-dark:#0B0E14; --cw-gray:#6B7280; }
      .cw-bubble {
        position:fixed; right:24px; bottom:24px; z-index:99998;
        width:60px; height:60px; border-radius:50%; border:none; cursor:pointer;
        background:linear-gradient(135deg,#7B3FF2 0%,#601FEB 100%);
        color:#fff; display:flex; align-items:center; justify-content:center;
        box-shadow:0 8px 24px rgba(96,31,235,.45); transition:transform .2s ease;
      }
      .cw-bubble:hover { transform:scale(1.08); }
      .cw-bubble svg { width:28px; height:28px; }
      .cw-bubble .cw-badge {
        position:absolute; top:-2px; right:-2px; width:14px; height:14px;
        background:#22C55E; border:2px solid #fff; border-radius:50%;
      }
      .cw-panel {
        position:fixed; right:24px; bottom:96px; z-index:99999;
        width:min(380px, calc(100vw - 32px)); height:min(560px, calc(100vh - 140px));
        background:#fff; border-radius:20px; box-shadow:0 24px 64px rgba(11,14,20,.28);
        display:flex; flex-direction:column; overflow:hidden;
        transform:translateY(16px) scale(.98); opacity:0; pointer-events:none;
        transition:transform .22s ease, opacity .22s ease;
        font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
      }
      .cw-panel.cw-open { transform:translateY(0) scale(1); opacity:1; pointer-events:auto; }
      .cw-head {
        background:linear-gradient(135deg,#7B3FF2 0%,#601FEB 100%); color:#fff;
        padding:16px 18px; display:flex; align-items:center; gap:12px;
      }
      .cw-avatar {
        width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,.18);
        display:flex; align-items:center; justify-content:center; flex-shrink:0;
      }
      .cw-avatar svg { width:22px; height:22px; }
      .cw-head-title { font-weight:700; font-size:15px; line-height:1.2; }
      .cw-head-sub { font-size:12px; opacity:.85; }
      .cw-close {
        margin-left:auto; background:none; border:none; color:#fff; cursor:pointer;
        width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center;
      }
      .cw-close:hover { background:rgba(255,255,255,.15); }
      .cw-body { flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px; background:#F7F8FB; }
      .cw-msg { max-width:85%; padding:10px 14px; border-radius:14px; font-size:14px; line-height:1.45; white-space:pre-wrap; word-wrap:break-word; }
      .cw-msg.cw-ai { background:#fff; color:#111; border:1px solid #EDEDF2; border-bottom-left-radius:4px; align-self:flex-start; }
      .cw-msg.cw-user { background:#601FEB; color:#fff; border-bottom-right-radius:4px; align-self:flex-end; }
      .cw-quick { display:flex; flex-wrap:wrap; gap:8px; padding:0 16px 12px; background:#F7F8FB; }
      .cw-quick button {
        background:#fff; border:1px solid #E2E4EA; color:#3A3F4B; font-size:12.5px;
        padding:7px 12px; border-radius:999px; cursor:pointer; transition:all .15s ease;
      }
      .cw-quick button:hover { border-color:#601FEB; color:#601FEB; background:#F4EFFF; }
      .cw-inputbar { display:flex; gap:8px; padding:12px; border-top:1px solid #EDEDF2; background:#fff; }
      .cw-inputbar input {
        flex:1; border:1px solid #E2E4EA; border-radius:12px; padding:10px 14px; font-size:14px; outline:none;
      }
      .cw-inputbar input:focus { border-color:#601FEB; box-shadow:0 0 0 3px rgba(96,31,235,.12); }
      .cw-send {
        width:42px; height:42px; border-radius:12px; border:none; cursor:pointer;
        background:#601FEB; color:#fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;
        transition:background .15s ease;
      }
      .cw-send:hover { background:#4B16C4; }
      .cw-send:disabled { opacity:.5; cursor:not-allowed; }
      .cw-send svg { width:18px; height:18px; }
      .cw-typing { display:inline-flex; gap:4px; padding:4px 2px; }
      .cw-typing span { width:7px; height:7px; border-radius:50%; background:#A0A4B0; animation:cwBlink 1.2s infinite; }
      .cw-typing span:nth-child(2) { animation-delay:.15s; } .cw-typing span:nth-child(3) { animation-delay:.3s; }
      @keyframes cwBlink { 0%,80%,100% { opacity:.25; } 40% { opacity:1; } }
      @media (max-width:480px) {
        .cw-panel { right:16px; bottom:88px; left:16px; width:auto; }
        .cw-bubble { right:16px; bottom:16px; }
      }
    `;
    document.head.appendChild(style);

    const chatIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
    const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    const sparkIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.7L19.6 10l-5.7 1.9L12 17.6l-1.9-5.7L4.4 10l5.7-1.3z"/><path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z"/></svg>';
    const sendIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';

    const widget = document.createElement('div');
    widget.id = 'recelloChatWidget';
    widget.innerHTML = `
      <button class="cw-bubble" id="cwBubble" aria-label="Chat with us">
        ${chatIcon}<span class="cw-badge"></span>
      </button>
      <div class="cw-panel" id="cwPanel">
        <div class="cw-head">
          <div class="cw-avatar">${sparkIcon}</div>
          <div>
            <div class="cw-head-title">Iris — Recello Assistant</div>
            <div class="cw-head-sub">Typically replies instantly</div>
          </div>
          <button class="cw-close" id="cwClose" aria-label="Close chat">${closeIcon}</button>
        </div>
        <div class="cw-body" id="cwBody"></div>
        <div class="cw-quick" id="cwQuick"></div>
        <div class="cw-inputbar">
          <input id="cwInput" type="text" placeholder="Ask about plans, prices, setup..." maxlength="2000" autocomplete="off">
          <button class="cw-send" id="cwSend" aria-label="Send message">${sendIcon}</button>
        </div>
      </div>`;
    document.body.appendChild(widget);

    const panel = document.getElementById('cwPanel');
    const body = document.getElementById('cwBody');
    const input = document.getElementById('cwInput');
    const quick = document.getElementById('cwQuick');
    const bubble = document.getElementById('cwBubble');
    let history = [];
    let opened = false;

    const QUICK = [
      'How much does it cost?',
      'How does it work?',
      'How do I order?',
      'Is there a guarantee?',
    ];

    function addMsg(role, text) {
      const div = document.createElement('div');
      div.className = 'cw-msg cw-' + role;
      div.textContent = text;
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }

    function addTyping() {
      const div = document.createElement('div');
      div.className = 'cw-msg cw-ai';
      div.innerHTML = '<span class="cw-typing"><span></span><span></span><span></span></span>';
      body.appendChild(div);
      body.scrollTop = body.scrollHeight;
      return div;
    }

    function showQuick() {
      quick.innerHTML = '';
      QUICK.forEach((q) => {
        const b = document.createElement('button');
        b.textContent = q;
        b.addEventListener('click', () => {
          quick.innerHTML = '';
          send(q);
        });
        quick.appendChild(b);
      });
    }

    function open() {
      opened = true;
      panel.classList.add('cw-open');
      bubble.innerHTML = closeIcon;
      if (!body.children.length) {
        addMsg('ai', 'Hi! 👋 I\'m Iris, the Recello assistant. Ask me anything about our AI receptionist — plans, prices, setup or ordering. I\'ll keep it short and helpful!');
        showQuick();
      }
      setTimeout(() => input.focus(), 250);
    }

    function close() {
      opened = false;
      panel.classList.remove('cw-open');
      bubble.innerHTML = chatIcon;
    }

    async function send(text) {
      const msg = text.trim();
      if (!msg) return;
      addMsg('user', msg);
      history.push({ role: 'user', content: msg });
      input.value = '';
      const typing = addTyping();
      const sendBtn = document.getElementById('cwSend');
      if (sendBtn) sendBtn.disabled = true;

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: msg, history: history.slice(-8), page: location.pathname }),
        });
        const data = await res.json().catch(() => ({}));
        typing.remove();
        if (res.ok && data.ok && data.reply) {
          history.push({ role: 'assistant', content: data.reply });
          addMsg('ai', data.reply);
        } else {
          addMsg('ai', 'Sorry, I could not reach the assistant just now. Please use the contact form or email hello@recello.co.uk and we\'ll get back to you.');
        }
      } catch (err) {
        typing.remove();
        addMsg('ai', 'Sorry, I could not reach the assistant just now. Please use the contact form or email hello@recello.co.uk and we\'ll get back to you.');
      } finally {
        if (sendBtn) sendBtn.disabled = false;
        showQuick();
      }
    }

    bubble.addEventListener('click', () => (opened ? close() : open()));
    document.getElementById('cwClose').addEventListener('click', close);
    document.getElementById('cwSend').addEventListener('click', () => send(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') send(input.value);
    });
  }

  // Run immediately (script is at the end of body): header/footer/sidebar must exist before active.js
  renderHeader();
  renderFooter();
  renderDocsSidebar();
  renderBackToTop();
  renderCookieBanner();
  renderChatWidget();
  initMobileDropdown();
})();
