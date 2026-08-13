/**
 * Vercel serverless funkcija — proxy za verifikaciju (narudžbu usluge sa /verify).
 *
 * Browser (HTTPS na recello.co.uk) šalje podatke + optimizovane slike dokumenata
 * (base64, JPEG ~800px). Ova funkcija prosljeđuje sve na backend
 * (https://api.recello.co.uk/api/verify-submit) koji čuva u Firebase Realtime DB
 * (tracking/verifications) — vidljivo u admin panelu.
 *
 * FormSubmit i dalje šalje email sa originalnim prilozima (backup).
 */
const BACKEND = 'https://api.recello.co.uk/api/verify-submit';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  try {
    const body = req.body || {};
    const h = req.headers || {};
    const forwarded = String(h['x-forwarded-for'] || '').split(',')[0].trim();
    const realIp = forwarded || h['x-real-ip'] || '';

    const payload = {
      fullName: String(body.fullName || '').slice(0, 200),
      email: String(body.email || '').slice(0, 200),
      phone: String(body.phone || '').slice(0, 60),
      company: String(body.company || '').slice(0, 200),
      address: String(body.address || '').slice(0, 300),
      plan: String(body.plan || '').slice(0, 100),
      idFront: String(body.idFront || '').slice(0, 600000),
      idBack: String(body.idBack || '').slice(0, 600000),
      proofAddress: String(body.proofAddress || '').slice(0, 600000),
      country: String(h['x-vercel-ip-country'] || '').slice(0, 2),
      countryName: String(h['x-vercel-ip-country-region'] || '').slice(0, 60),
      clientIp: realIp.slice(0, 45),
    };

    const upstream = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) return res.status(502).json({ ok: false, error: 'upstream_failed' });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}
