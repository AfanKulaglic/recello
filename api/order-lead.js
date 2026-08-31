/**
 * Vercel serverless funkcija — proxy za narudžbe sa /order (get-started) stranice.
 *
 * Isti princip kao contact-lead.js: browser poziva funkciju na ISTOM originu
 * (HTTPS), a ona server-side prosljeđuje na backend
 * (https://api.recello.co.uk/api/order-submit) gdje se narudžba čuva u bazi
 * (admin panel) i šalju se branded emailovi (vlasniku + potvrda kupcu).
 *
 * Prosljeđuje i geo podatke iz Vercel headera + pravu IP adresu posjetioca.
 */
const BACKEND = 'https://api.recello.co.uk/api/order-submit';

export default async function handler(req, res) {
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
    const h = req.headers || {};
    const forwarded = String(h['x-forwarded-for'] || '').split(',')[0].trim();
    const realIp = forwarded || h['x-real-ip'] || '';

    const payload = {
      fullName: String(body.fullName || '').slice(0, 200),
      company: String(body.company || '').slice(0, 200),
      email: String(body.email || '').slice(0, 200),
      phone: String(body.phone || '').slice(0, 60),
      plan: String(body.plan || '').slice(0, 100),
      about: String(body.about || '').slice(0, 3000),
      numberSituation: String(body.numberSituation || '').slice(0, 200),
      country: String(h['x-vercel-ip-country'] || '').slice(0, 2),
      countryName: String(h['x-vercel-ip-country-region'] || '').slice(0, 60),
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
