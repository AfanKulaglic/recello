/** Vercel serverless — proxy za social results (statusi objava po postu/mrezi). */
const BACKEND = 'https://api.recello.co.uk/api/social-results';
export const maxDuration = 30;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  try {
    const upstream = await fetch(BACKEND, { method: 'GET' });
    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok) return res.status(502).json({ ok: false, error: 'upstream_failed' });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}