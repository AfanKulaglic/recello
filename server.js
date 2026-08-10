// Recello — landing page statički server.
// Pokretanje:  node server.js  (ili: node server.js 8080)
// Serves landing/ with correct MIME types (including .svg → image/svg+xml).
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = Number(process.argv[2] || 5566);
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
};

http
  .createServer((req, res) => {
    let p;
    try {
      p = decodeURIComponent(req.url.split('?')[0]);
    } catch {
      p = '/';
    }
    if (p === '/') p = '/index.html';

    // Protect against directory traversal outside the folder
    const f = path.join(ROOT, path.normalize(p).replace(/^([.][.][/\\])+/, ''));
    if (!f.startsWith(ROOT)) {
      res.writeHead(403);
      res.end('403');
      return;
    }

    fs.readFile(f, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(`Recello landing server: http://localhost:${PORT}`);
  });
