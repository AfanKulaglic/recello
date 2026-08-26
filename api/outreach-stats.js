/** Vercel serverless — proxy za /mail dashboard statistiku. */
const BACKEND = 'https://api.recello.co.uk/api/outreach-stats';
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  try {
    const u = await fetch(BACKEND, { method: 'GET' });
    const d = await u.json().catch(() => ({}));
    if (!u.ok || !d.ok) return res.status(502).json({ ok: false, error: 'upstream_failed' });
    return res.status(200).json(d);
  } catch { return res.status(500).json({ ok: false, error: 'internal' }); }
}