/**
 * Recello — praćenje posjeta na prezentacijskoj stranici.
 * Svaka stranica šalje posjetu na backend (tracking endpoint),
 * a vlasnik vidi sve u admin panelu (Posjete): koja stranica,
 * iz koje države, sa kojeg uređaja i koliko dugo je gledao.
 *
 * Strategija slanja:
 * 1. Prvo pokušava RELATIVNU putanju "/api/track-visit" (isti origin).
 *    - Na Vercelu (HTTPS): to je serverless funkcija → prosljeđuje na backend
 *      (izbjegava mixed-content blokadu browsera) + dodaje državu i IP.
 *    - Lokalno (http-server): vrati 404 → prelazi na fallback.
 * 2. Fallback: direktno na http://46.101.166.181:3001 (kad se testira lokalno).
 *
 * Vrijeme na stranici: šalje se "heartbeat" kada korisnik napusti stranicu
 * (pagehide/visibilitychange) sa visitId i durationMs → backend ažurira zapis.
 *
 * Otporno na greške: ako backend ne odgovori, ništa se ne lomi na sajtu.
 */
(function () {
  try {
    var startTs = Date.now();

    // Generiši ID posjete (stabilan za ovu stranicu — koristi se za heartbeat)
    var visitId = (function () {
      try {
        var k = 'recello_visit_' + window.location.pathname;
        var s = sessionStorage.getItem(k);
        if (s) return s;
        var id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        sessionStorage.setItem(k, id);
        return id;
      } catch (e) {
        return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      }
    })();

    var payload = {
      visitId: visitId,
      page: window.location.pathname + window.location.search,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent || '',
      lang: navigator.language || '',
      screen: (window.screen && window.screen.width + 'x' + window.screen.height) || '',
    };

    function send(url, extra) {
      try {
        var body = Object.assign({}, payload, extra || {});
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          keepalive: true,
        }).catch(function () { /* tiho */ });
        return true;
      } catch (e) {
        return false;
      }
    }

    // 1. Relativna putanja — na Vercelu ide na serverless funkciju (HTTPS).
    fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then(function (r) {
        if (!r.ok) throw new Error('nope');
      })
      .catch(function () {
        // 2. Fallback: direktno na backend preko HTTPS domene (lokalni razvoj).
        send('https://api.recello.co.uk/api/track-visit');
      });

    // Heartbeat na odlasku sa stranice — koliko dugo je gledao.
    var sentHeartbeat = false;
    function heartbeat() {
      if (sentHeartbeat) return;
      sentHeartbeat = true;
      var durationMs = Date.now() - startTs;
      var extra = { durationMs: durationMs };

      // Probaj relativnu putanju (Vercel), pa fallback na VPS
      fetch('/api/track-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.assign({}, payload, extra)),
        keepalive: true,
      })
        .then(function (r) {
          if (!r.ok) throw new Error('nope');
        })
        .catch(function () {
          send('https://api.recello.co.uk/api/track-visit', extra);
        });
    }

    if (typeof document.addEventListener === 'function') {
      document.addEventListener('pagehide', heartbeat);
      document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') heartbeat();
      });
    }
  } catch (e) {
    /* potpuno tiho */
  }
})();
