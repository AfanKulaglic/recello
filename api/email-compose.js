/**
 * Vercel serverless funkcija — proxy za profesionalni email composer (/mail).
 *
 * Browser poziva ovu funkciju na ISTOM originu (HTTPS), a ona server-side
 * prosljeđuje zahtjev na backend (https://api.recello.co.uk/api/email-compose)
 * gdje se email komponuje i šalje preko Resend-a sa brendiranim izgledom.
 */
const BACKEND = 'https://api.recello.co.uk/api/email-compose';

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

    const upstream = await fetch(BACKEND, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: String(body.to || '').slice(0, 200),
        subject: String(body.subject || '').slice(0, 300),
        title: String(body.title || '').slice(0, 200),
        message: String(body.message || '').slice(0, 5000),
        buttons: Array.isArray(body.buttons)
          ? body.buttons.slice(0, 3).map((b) => ({
              label: String((b && b.label) || '').slice(0, 60),
              url: String((b && b.url) || '').slice(0, 500),
            }))
          : undefined,
        preview: Boolean(body.preview),
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok || !data.ok) {
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }
    if (data.html) {
      return res.status(200).json({ ok: true, html: data.html });
    }
    return res.status(200).json({ ok: true, message: 'Email sent' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}