/**
 * Vercel serverless funkcija — proxy za praćenje posjeta.
 *
 * Zašto postoji: prezentacijska stranica je na Vercelu (HTTPS). Browser
 * blokira pozive na http://VPS:3001 (mixed content). Ova funkcija živi na
 * ISTOM originu (HTTPS) i server-side prosljeđuje podatke na backend.
 *
 * Kada se fajl ovdje nalazi, Vercel ga automatski prepoznaje kao
 * serverless funkciju na PUTANJI /api/track-visit.
 */
const BACKEND = 'http://46.101.166.181:3001/api/track-visit';

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
    const upstream = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: String(body.page || '/').slice(0, 300),
        referrer: String(body.referrer || '').slice(0, 500),
        userAgent: String(body.userAgent || '').slice(0, 500),
        lang: String(body.lang || '').slice(0, 20),
      }),
    });

    if (!upstream.ok) {
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}
