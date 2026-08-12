/**
 * Vercel serverless funkcija — proxy za praćenje posjeta.
 *
 * Zašto postoji: prezentacijska stranica je na Vercelu (HTTPS). Browser
 * blokira pozive na http://VPS:3001 (mixed content). Ova funkcija živi na
 * ISTOM originu (HTTPS) i server-side prosljeđuje podatke na backend.
 *
 * Također prosljeđuje geo podatke koje Vercel automatski dodaje u headers
 * (x-vercel-ip-country, x-vercel-ip-country-region, x-vercel-ip-city) i
 * pravu IP adresu posjetioca (x-forwarded-for) — da admin panel može
 * pokazati IZ KOJE DRŽAVE je posjetilac.
 *
 * Kada se fajl ovdje nalazi, Vercel ga automatski prepoznaje kao
 * serverless funkciju na PUTANJI /api/track-visit.
 */
const BACKEND = 'https://api.recello.co.uk/api/track-visit';

export default async function handler(req, res) {
  // CORS (za svaki slučaj — beacon sa druge subdomene)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const body = req.body || {};

    // Vercel geo podaci (automatski u headerima) + pravi klijentski IP
    const h = req.headers || {};
    const forwarded = String(h['x-forwarded-for'] || '').split(',')[0].trim();
    const realIp = forwarded || h['x-real-ip'] || '';

    const payload = {
      page: String(body.page || '/').slice(0, 300),
      referrer: String(body.referrer || '').slice(0, 500),
      userAgent: String(body.userAgent || '').slice(0, 500),
      lang: String(body.lang || '').slice(0, 20),
      visitId: String(body.visitId || '').slice(0, 40),
      durationMs: Number(body.durationMs || 0) || 0,
      screen: String(body.screen || '').slice(0, 30),
      // Geo + IP (čita ih backend)
      country: String(h['x-vercel-ip-country'] || '').slice(0, 2),
      countryName: String(h['x-vercel-ip-country-region'] || '')
        .slice(0, 60) || '',
      clientIp: realIp.slice(0, 45),
    };

    const upstream = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}
