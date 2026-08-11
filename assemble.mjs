import { readFileSync, writeFileSync, readdirSync } from "node:fs";

const assets = readdirSync("dist/assets");
const cssFile = assets.find((f) => f.endsWith(".css"));
const jsFile = assets.find((f) => f.endsWith(".js"));
let css = readFileSync(`dist/assets/${cssFile}`, "utf8");
let js = readFileSync(`dist/assets/${jsFile}`, "utf8");

// Escape all non-ASCII to \uXXXX so rendering is charset-independent
const NON_ASCII = /[-￿]/g;
const esc = (s) =>
  s.replace(NON_ASCII, (c) => "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0"));
js = esc(js);
// Prevent a literal </script> inside JS strings from closing the tag early
js = js.replace(/<\/script/gi, "<\\/script");

const nonAsciiCss = (css.match(NON_ASCII) || []).length;

const fontB64 = readFileSync("ms.woff2").toString("base64");

const html = `<style>
@font-face {
  font-family: 'Material Symbols Rounded';
  font-style: normal;
  font-weight: 100 700;
  src: url(data:font/woff2;base64,${fontB64}) format('woff2');
}
.material-symbols-rounded { font-family: 'Material Symbols Rounded' !important; }
:root { color-scheme: light; }
html, body { background: #ffffff; }
</style>
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;

writeFileSync("share/index.html", html);
console.log(
  "Wrote share/index.html —",
  (Buffer.byteLength(html) / 1024 / 1024).toFixed(2),
  "MB",
);
console.log("non-ASCII left in CSS:", nonAsciiCss);
