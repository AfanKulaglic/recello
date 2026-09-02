/** Vercel serverless — proxy za admin login (POST /api/admin-auth -> backend /admin/auth). */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: { message: 'method_not_allowed' } });
  try {
    const chunks = [];
    for await (const ch of req) chunks.push(ch);
    const raw = Buffer.concat(chunks).toString('utf8') || '{}';
    const upstream = await fetch('https://api.recello.co.uk/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': String(Buffer.byteLength(raw)) },
      body: raw,
    });
    const data = await upstream.text();
    res.status(upstream.status).setHeader('Content-Type', 'application/json').send(data);
  } catch {
    res.status(500).json({ ok: false, error: { code: 'internal', message: 'proxy error' } });
  }
}