/**
 * Vercel serverless — proxy za admin login (GET /api/admin-auth -> backend /admin/auth).
 * Preusmjeri na backend koji provjerava afan/080513 i vraća x-admin-token.
 */
const BACKEND = 'https://api.recello.co.uk/admin/auth';

export const maxDuration = 30;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'GET') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  try {
    const url = new URL(req.url, 'https://x');
    const target = new URL(BACKEND);
    for (const [k, v] of url.searchParams) target.searchParams.set(k, v);
    const upstream = await fetch(target.toString(), { method: 'GET' });
    const data = await upstream.json().catch(() => ({}));
    return res.status(upstream.ok ? 200 : 502).json(data);
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'internal' });
  }
}