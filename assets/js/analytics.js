/**
 * Recello — praćenje posjeta na prezentacijskoj stranici.
 * Svaka stranica šalje jednu "posjetu" na backend (tracking endpoint),
 * a vlasnik vidi sve u admin panelu (Posjete).
 *
 * Strategija slanja:
 * 1. Prvo pokušava RELATIVNU putanju "/api/track-visit" (isti origin).
 *    - Na Vercelu (HTTPS): to je serverless funkcija → prosljeđuje na backend
 *      (izbjegava mixed-content blokadu browsera).
 *    - Lokalno (http-server): vrati 404 → prelazi na fallback.
 * 2. Fallback: direktno na http://46.101.166.181:3001 (kad se testira lokalno).
 *
 * Otporno na greške: ako backend ne odgovori, ništa se ne lomi na sajtu.
 */
(function () {
  try {
    var payload = {
      page: window.location.pathname + window.location.search,
      referrer: document.referrer || '',
      userAgent: navigator.userAgent || '',
      lang: navigator.language || '',
    };

    function send(url) {
      try {
        // fetch sa keepalive:true podržava CORS preflight (sendBeacon sa
        // JSON blobom ne podržava preflight pa ga browser blokira).
        fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(function () { /* tiho */ });
        return true;
      } catch (e) {
        return false;
      }
    }

    // 1. Relativna putanja — na Vercelu ide na serverless funkciju (HTTPS).
    //    koristimo fetch da znamo da li je uspjelo (status 200/201).
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
        // 2. Fallback: direktno na VPS backend (lokalni razvoj / statički hosting
        //    bez serverless funkcije).
        send('http://46.101.166.181:3001/api/track-visit');
      });
  } catch (e) {
    /* potpuno tiho */
  }
})();
