/**
 * Vercel serverless funkcija — proxy za automatski outreach status (/mail)
 * + admin login (POST /api/admin-auth -> backend /admin/auth).
 */
const BACKEND = 'https://api.recello.co.uk/api/outreach-status';
const BACKEND_AUTH = 'https://api.recello.co.uk/admin/auth';

export const maxDuration = 60;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // POST = admin login (rewrite /api/admin-auth -> ova funkcija)
  if (req.method === 'POST') {
    try {
      const chunks = [];
      for await (const ch of req) chunks.push(ch);
      const raw = Buffer.concat(chunks).toString('utf8') || '{}';
      const parsed = JSON.parse(raw) as { email?: string; password?: string };
      const payload = JSON.stringify({
        email: String(parsed.email ?? ''),
        password: String(parsed.password ?? ''),
      });
      const upstream = await fetch(BACKEND_AUTH, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });
      const data = await upstream.text();
      return res.status(upstream.status).setHeader('Content-Type', 'application/json').send(data);
    } catch (err) {
      return res.status(500).json({ ok: false, error: 'internal' });
    }
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  try {
    const upstream = await fetch(BACKEND, { method: 'GET' });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok || !data.ok) {
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}