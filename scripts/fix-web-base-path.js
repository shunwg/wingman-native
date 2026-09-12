/**
 * expo export --platform web hardcodes every asset path as root-absolute
 * (/assets/..., /_expo/..., /favicon.ico) — correct for a server at the
 * domain root, wrong for a GitHub Pages *project* site, which serves from
 * /<repo-name>/. This rewrites every occurrence after export, so `docs/`
 * (what GitHub Pages serves) actually resolves once deployed.
 *
 * Run after `npx expo export --platform web --output-dir docs`.
 */
const fs = require('fs');
const path = require('path');

const REPO = 'wingman-native';
const ROOT = path.join(__dirname, '..', 'docs');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(html|js|json)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
let changed = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  // Order matters: only rewrite root-absolute references (a leading slash
  // followed by one of these known top-level export folders), never a bare
  // "/assets" occurring mid-word or already-prefixed.
  text = text
    .replace(/(["'(])\/_expo\//g, `$1/${REPO}/_expo/`)
    .replace(/(["'(])\/assets\//g, `$1/${REPO}/assets/`)
    .replace(/(["'(])\/favicon\.ico/g, `$1/${REPO}/favicon.ico`);
  if (text !== before) {
    fs.writeFileSync(file, text, 'utf8');
    changed++;
  }
}
console.log(`Rewrote ${changed} of ${files.length} exported file(s) for /${REPO}/ base path.`);
