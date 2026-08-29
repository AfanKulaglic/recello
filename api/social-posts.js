/** Vercel serverless — proxy za social queue (GET lista / POST dodaj / PATCH edit / DELETE brisi).
 *  Id=<post id> query param za PATCH/DELETE. */
const BACKEND = 'https://api.recello.co.uk/api/social-queue';
export const maxDuration = 30;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  try {
    const url = new URL(req.url, 'https://x');
    const id = url.searchParams.get('id');
    const target = id ? `${BACKEND}/${encodeURIComponent(id)}` : BACKEND;
    const method = req.method === 'OPTIONS' ? 'GET' : req.method;
    const upstream = await fetch(target, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: method === 'GET' ? undefined : JSON.stringify(req.body ?? {}),
    });
    const data = await upstream.json().catch(() => ({}));
    return res.status(upstream.ok ? 200 : 502).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}