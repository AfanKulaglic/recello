# Recello — AI Receptionist · Presentation Site

Marketing / presentation site for **Recello**, the AI phone receptionist for small businesses.

## Stack

- Static HTML + CSS + vanilla JS (no build step, no framework)
- Bootstrap 5, Swiper, WOW animations
- Multi-page: home, services, pricing, FAQ, docs (10+ pages)

## Local development

```bash
node server.js          # http://localhost:5566
# or any static server, e.g.:
npx serve .
```

## Deployment (Vercel)

This is a **static site** — Vercel just serves the files, no build command needed.

1. Connect the GitHub repo (`AfanKulaglic/recello`) to Vercel.
2. **Framework Preset:** `Other`
3. **Build Command:** *(leave empty)*
4. **Output Directory:** *(leave empty)*
5. Deploy — done.

`vercel.json` enables clean URLs (`/pricing` instead of `/pricing.html`) and long-lived asset caching.

## Pages

| Page | Purpose |
|---|---|
| `index.html` | Home |
| `usluge.html` | Services |
| `o-nama.html` | About |
| `kako-radi.html` | How it works |
| `cijene.html` | Pricing |
| `faq.html` | FAQ |
| `dokumentacija.html` | Docs index |
| `docs/*.html` | Documentation (quick start, chat, billing…) |
| `verify.html` | Identity verification |
| `kontakt.html` | Contact |
| `privacy.html` / `terms.html` | Legal |
