/**
 * Vercel serverless funkcija — proxy za upite sa kontakt forme.
 *
 * Prezentacijska stranica je na Vercelu (HTTPS). Browser poziva ovu
 * funkciju na ISTOM originu, a ona server-side prosljeđuje podatke na
 * backend (https://api.recello.co.uk/api/contact-lead) gdje se upit čuva
 * u bazi i postaje vidljiv u admin panelu (pored emaila koji šalje FormSubmit).
 *
 * Prosljeđuje i geo podatke iz Vercel headera + pravu IP adresu posjetioca.
 */
  // Podrava i narudzbe sa /order stranice: frontend salje kind='order',
  // a vercel.json rewrite /api/order-lead -> ova funkcija (limit od 12 funkcija na Hobby planu).
  const isOrder = String(body.kind || '') === 'order';
  const BACKEND = isOrder
    ? 'https://api.recello.co.uk/api/order-submit'
    : 'https://api.recello.co.uk/api/contact-lead';

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

    const country = String(h['x-vercel-ip-country'] || '').slice(0, 2);
    const countryName = String(h['x-vercel-ip-country-region'] || '').slice(0, 60);
    const clientIp = realIp.slice(0, 45);

    const payload = isOrder ? {
      fullName: String(body.fullName || '').slice(0, 200),
      company: String(body.company || '').slice(0, 200),
      email: String(body.email || '').slice(0, 200),
      phone: String(body.phone || '').slice(0, 60),
      plan: String(body.plan || '').slice(0, 100),
      about: String(body.about || '').slice(0, 3000),
      numberSituation: String(body.numberSituation || '').slice(0, 200),
      country,
      countryName,
      clientIp,
    } : {
      fullName: String(body.fullName || '').slice(0, 200),
      company: String(body.company || '').slice(0, 200),
      email: String(body.email || '').slice(0, 200),
      phone: String(body.phone || '').slice(0, 60),
      enquiryType: String(body.enquiryType || '').slice(0, 100),
      message: String(body.message || '').slice(0, 5000),
      country,
      countryName,
      clientIp,
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
