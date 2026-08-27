const https = require("https");
https.get("https://recello.co.uk/assets/js/components.js", (res) => {
  let b = "";
  res.on("data", d => b += d);
  res.on("end", () => {
    const cookie = String.fromCodePoint(0x1F36A);
    console.log("live components.js ima 🍪: " + b.includes(cookie));
    console.log("live ima mojibake: " + /\u00F0\u0178/.test(b));
    const i = b.indexOf("Cookies");
    if (i >= 0) console.log("uzorak: " + JSON.stringify(b.slice(Math.max(0,i-8), i+10)));
  });
});