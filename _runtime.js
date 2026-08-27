// DOM stub v3 — uzmi ZADNJI inline script blok (nas), trigger DCL, real fetch
const https = require('https');
const vm = require('vm');
https.get('https://recello.co.uk/mail', (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    const blocks = [];
    const re = /<script[^>]*>([\s\S]*?)<\/script>/g;
    let m;
    while ((m = re.exec(body))) blocks.push(m[1]);
    // nadji zadnji ne-prazan (nas)
    let code = '';
    for (let i = blocks.length - 1; i >= 0; i--) { if (blocks[i].trim().length > 100) { code = blocks[i]; break; } }
    console.log('main srript len=' + code.length);

    const elements = {};
    function mkEl(id) { if (!elements[id]) { elements[id] = { id, style: {}, value: '', textContent: '', innerHTML: '', className: '', addEventListener: () => {}, appendChild: () => {}, remove: () => {}, querySelector: () => mkEl('c'), querySelectorAll: () => [], children: { length: 0 }, setAttribute: () => {}, getAttribute: () => null, closest: () => null }; } return elements[id]; }
    let dcl = null;
    const document = { getElementById: (id) => mkEl(id), addEventListener: (ev, cb) => { if (ev === 'DOMContentLoaded') dcl = cb; }, querySelector: () => mkEl('q'), querySelectorAll: () => [], createElement: () => mkEl('c') };
    global.fetch = (url) => { console.log('[fetch] ' + url); return new Promise((resolve) => { const r = https.get('https://recello.co.uk' + url, (res2) => { let b = ''; res2.on('data', (d) => b += d); res2.on('end', () => resolve({ ok: res2.statusCode === 200, json: () => Promise.resolve(JSON.parse(b)) })); }); r.on('error', () => resolve({ ok: false, json: () => Promise.resolve({ ok: false }) })); }); };
    try {
      const sandbox = { document, fetch: global.fetch, window: {}, console, setInterval: () => 0, setTimeout: (f) => 0 };
      vm.createContext(sandbox);
      vm.runInContext(code, sandbox);
      // ispiši sve što je postalo globalno u sandbox
      console.log('SANDBOX KEYS:', Object.keys(sandbox).filter(k => typeof sandbox[k] === 'function').join(', '));
      if (dcl) { dcl(); console.log('DCL CALLED OK'); }
      setTimeout(() => { console.log('final check'); }, 1000);
    } catch (e) { console.log('RUNTIME ERR:', e.message); }
    process.on('uncaughtException', (e) => { console.log('UNCAUGHT:', e.message); console.log(e.stack.split('\n').slice(0,6).join('\n')); process.exit(1); });
  });
});
