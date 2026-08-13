/**
 * Vercel serverless funkcija — proxy za chat widget na prezentacijskoj stranici.
 *
 * Browser poziva ovu funkciju na ISTOM originu (HTTPS), a ona server-side
 * prosljeđuje poruku na backend (https://api.recello.co.uk/api/chat) gdje
 * Groq (najjeftiniji model) generiše odgovor o Recello usluzi.
 */
const BACKEND = 'https://api.recello.co.uk/api/chat';

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
      message: String(body.message || '').slice(0, 2000),
      history: Array.isArray(body.history)
        ? body.history.slice(0, 10).map((m) => ({
            role: String(m.role) === 'assistant' ? 'assistant' : 'user',
            content: String(m.content || '').slice(0, 2000),
          }))
        : [],
      // Stranica na kojoj je postavljeno pitanje + geo podaci (za admin panel)
      page: String(body.page || '').slice(0, 300),
      country: String(h['x-vercel-ip-country'] || '').slice(0, 2),
      countryName: String(h['x-vercel-ip-country-region'] || '').slice(0, 60),
      clientIp: realIp.slice(0, 45),
    };

    const upstream = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok || !data.ok) {
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }
    return res.status(200).json({ ok: true, reply: String(data.reply || '') });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}
