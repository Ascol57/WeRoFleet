#!/usr/bin/env node
// ============================================================
// WeRoFleet — single-file bundler  (fully self-contained output)
//
// Produces the Claude Design "unpacking" single-file format:
// a small shell + runtime loader, then three payload blocks —
//   • <script type="__bundler/manifest">    gzip+base64 binary assets
//   • <script type="__bundler/ext_resources"> id -> asset uuid
//   • <script type="__bundler/template">     the whole app HTML (JSON string)
//
// Unlike the original, this build is OFFLINE-CAPABLE — nothing is
// fetched at view time:
//   • CDN libs (React, ReactDOM, Lucide) are downloaded at build time
//     and INLINED into the template (no remote <script src>).
//   • JSX (type="text/babel") is PRE-COMPILED with Babel here in Node,
//     so the output ships plain JS and DROPS Babel-standalone entirely.
//   • All local scripts + CSS are inlined; binary assets ride along in
//     the gzip manifest and decode to blob: URLs at view time.
//
// Downloads are cached under tools/.cache so rebuilds are fast/offline.
//
//   Usage:  node tools/build-bundle.mjs [output.html]
//   Default output:  ./dist/WeRoFleet.html
// ============================================================

import { readFileSync, writeFileSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import vm from 'node:vm';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const ENTRY = join(ROOT, 'ui_kits', 'console', 'index.html');
const ENTRY_DIR = dirname(ENTRY);
const SHELL = join(ROOT, 'tools', 'bundler-shell.html');
const CACHE = join(ROOT, 'tools', '.cache');
const OUT = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : join(ROOT, 'dist', 'WeRoFleet.html');

const read = (p) => readFileSync(p, 'utf8');
const log = (...a) => console.log('[bundle]', ...a);
// Inlined <script>/<style> bodies must not contain a literal closing tag,
// or DOMParser ends the block early once the JSON is parsed back.
const guardScript = (s) => s.replace(/<\/script>/gi, '<\\/script>');
const guardStyle = (s) => s.replace(/<\/style>/gi, '<\\/style>');

// ---- download cache --------------------------------------------------------
if (!existsSync(CACHE)) mkdirSync(CACHE, { recursive: true });
// Google Fonts serves woff2 only to browser-like clients.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
function cacheKey(url) {
  return createHash('sha1').update(url).digest('hex').slice(0, 16) + '-' + basename(new URL(url).pathname);
}
async function fetchCached(url, headers) {
  const file = join(CACHE, cacheKey(url));
  if (existsSync(file)) { log('cache  :', basename(url)); return read(file); }
  log('fetch  :', url);
  const res = await fetch(url, headers ? { headers } : undefined);
  if (!res.ok) throw new Error('Download failed ' + res.status + ' for ' + url);
  const text = await res.text();
  writeFileSync(file, text, 'utf8');
  return text;
}
async function fetchCachedBinary(url) {
  const file = join(CACHE, cacheKey(url));
  if (existsSync(file)) return readFileSync(file);
  log('fetch  :', basename(url));
  const res = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('Download failed ' + res.status + ' for ' + url);
  const buf = Buffer.from(await res.arrayBuffer());
  writeFileSync(file, buf);
  return buf;
}

// Replace a remote Google Fonts @import with self-contained @font-face rules:
// fetch the stylesheet, keep the latin subsets, and embed each woff2 as a
// data: URL so the bundle needs no network for type.
async function inlineGoogleFonts(htmlStr) {
  const importRe = /@import\s+url\(\s*['"]?(https:\/\/fonts\.googleapis\.com[^'")]+)['"]?\s*\)\s*;?/gi;
  const imports = [...htmlStr.matchAll(importRe)];
  for (const m of imports) {
    const cssUrl = m[1].replace(/&amp;/g, '&');
    const css = await fetchCached(cssUrl, { 'User-Agent': UA });
    // Each @font-face is preceded by a /* subset */ comment; keep only latin.
    const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*(@font-face\s*\{[\s\S]*?\})/g)];
    let kept = 0;
    const parts = [];
    for (const b of blocks) {
      const subset = b[1];
      if (subset !== 'latin' && subset !== 'latin-ext') continue;
      let face = b[2];
      const url = (face.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+\.woff2)\)/) || [])[1];
      if (url) {
        const data = (await fetchCachedBinary(url)).toString('base64');
        face = face.replace(/url\(https:\/\/fonts\.gstatic\.com[^)]+\.woff2\)/, `url(data:font/woff2;base64,${data})`);
      }
      parts.push('/* ' + subset + ' */\n' + face);
      kept++;
    }
    log('fonts  : embedded', kept, 'latin @font-face from', basename(new URL(cssUrl).pathname));
    htmlStr = htmlStr.replace(m[0], parts.join('\n'));
  }
  return htmlStr;
}

// ---- Babel-standalone, loaded in a vm so JSX transpiles here in Node -------
let _Babel = null;
async function getBabel() {
  if (_Babel) return _Babel;
  const code = await fetchCached('https://unpkg.com/@babel/standalone@7.29.0/babel.min.js');
  const sandbox = {};
  sandbox.self = sandbox; sandbox.window = sandbox; sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox, { filename: 'babel.min.js' });
  _Babel = sandbox.Babel || (sandbox.window && sandbox.window.Babel);
  if (!_Babel || typeof _Babel.transform !== 'function') throw new Error('Babel-standalone did not initialise');
  return _Babel;
}
async function transpileJsx(code, filename) {
  const Babel = await getBabel();
  // JSX → React.createElement only. No preset-env: the target is a modern
  // browser, and these files are plain <script>s (no import/export).
  return Babel.transform(code, { presets: ['react'], filename, sourceType: 'script', compact: false }).code;
}

const MIME = {
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
};
const mimeFor = (p) => MIME[p.slice(p.lastIndexOf('.')).toLowerCase()] || 'application/octet-stream';
// Deterministic UUID-shaped id (stable builds): sha1 of path + bytes.
function uuidFor(key, bytes) {
  const h = createHash('sha1').update(key).update(bytes).digest('hex');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20, 32)}`;
}

// Recursively inline local @import url('./x.css'); leave remote ones.
function inlineCss(absCssPath, seen = new Set()) {
  const cssDir = dirname(absCssPath);
  return read(absCssPath).replace(
    /@import\s+url\(\s*['"]?([^'")]+)['"]?\s*\)\s*;?/g,
    (m, url) => {
      if (/^https?:\/\//i.test(url)) return m;     // remote (Google Fonts) -> keep
      const target = resolve(cssDir, url);
      if (seen.has(target)) return '';
      seen.add(target);
      return `\n/* inlined: ${url} */\n${inlineCss(target, seen)}\n`;
    }
  );
}

// ---- 1) build the template HTML (the real app, fully inlined) -------------
log('entry  :', ENTRY);
let html = read(ENTRY);

// Drop the design-system annotation comments (@dsCard / @startingPoint) that
// precede the doctype, so the template starts at <!DOCTYPE html>.
html = html.replace(/^﻿?(?:\s*<!--[\s\S]*?-->)*\s*(?=<!DOCTYPE)/i, '');

// CSS: <link rel="stylesheet"> -> inlined <style>
html = html.replace(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi, (tag) => {
  const href = (tag.match(/\bhref=["']([^"']+)["']/i) || [])[1];
  if (!href || /^https?:\/\//i.test(href)) return tag;
  log('css    :', href);
  return `<style>\n/* ${href} */\n${guardStyle(inlineCss(resolve(ENTRY_DIR, href)))}\n</style>`;
});

// Fonts: swap the remote Google Fonts @import for embedded base64 woff2.
html = await inlineGoogleFonts(html);

// Assets: ext-resource-dependency <meta> -> manifest entries (gzip+base64),
// dropped from the template (the runtime rebuilds window.__resources).
const manifest = {};
const extResources = [];
html = html.replace(/<meta\b[^>]*\bname=["']ext-resource-dependency["'][^>]*>/gi, (tag) => {
  const content = (tag.match(/\bcontent=["']([^"']+)["']/i) || [])[1];
  const id = (tag.match(/\bdata-resource-id=["']([^"']+)["']/i) || [])[1];
  if (!content || !id) return '';
  const abs = resolve(ENTRY_DIR, content);
  const bytes = readFileSync(abs);
  const uuid = uuidFor(content, bytes);
  manifest[uuid] = { mime: mimeFor(abs), compressed: true, data: gzipSync(bytes).toString('base64') };
  extResources.push({ id, uuid });
  log('asset  :', id, '->', content, `(${bytes.length}B gzipped)`);
  return '';
});

// Scripts: collect every <script ...></script> (empty body = it has a src),
// then resolve them sequentially (await for downloads / JSX transpile).
// - remote CDN  -> download + inline   (DROP Babel-standalone entirely)
// - local JSX   -> Babel-transpile here + inline as plain JS (no text/babel)
// - local JS    -> inline verbatim
const SCRIPT_RE = /<script\b([^>]*)>\s*<\/script>/gi;
const tasks = [];
html = html.replace(SCRIPT_RE, (tag, attrs) => {
  const token = ' SCRIPT' + tasks.length + ' ';
  tasks.push({ tag, attrs });
  return token;
});

for (let i = 0; i < tasks.length; i++) {
  const { attrs } = tasks[i];
  const src = (attrs.match(/\bsrc=["']([^"']+)["']/i) || [])[1] || '';
  const type = (attrs.match(/\btype=["']([^"']+)["']/i) || [])[1] || '';
  let out;

  if (/^https?:\/\//i.test(src)) {
    if (/@babel\/standalone/i.test(src)) {
      log('drop   :', src, '(JSX pre-compiled — Babel not shipped)');
      out = '';
    } else {
      const code = await fetchCached(src);
      log('inline :', src, `(${(code.length / 1024).toFixed(0)} KB)`);
      out = `<script>\n${guardScript(code)}\n</script>`;
    }
  } else if (src) {
    const abs = resolve(ENTRY_DIR, src);
    let body = read(abs);
    if (type === 'text/babel' || type === 'text/jsx') {
      log('jsx    :', src);
      body = await transpileJsx(body, src);
      out = `<script data-src="${src}">\n${guardScript(body)}\n</script>`;   // plain JS now
    } else {
      log('script :', src);
      out = `<script data-src="${src}">\n${guardScript(body)}\n</script>`;
    }
  } else {
    out = tasks[i].tag; // no src and no body matched here (shouldn't happen)
  }
  html = html.replace(' SCRIPT' + i + ' ', () => out);
}

// ---- 2) fill the shell with the three payloads ---------------------------
const templateJson = JSON.stringify(html).replace(/<\//g, '<\\/');
const manifestJson = JSON.stringify(manifest);
const extResJson = JSON.stringify(extResources);

let outHtml = read(SHELL)
  .split('__MANIFEST__').join(manifestJson)
  .split('__EXT_RESOURCES__').join(extResJson)
  .split('__TEMPLATE__').join(templateJson);

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, outHtml, 'utf8');
const kb = (statSync(OUT).size / 1024).toFixed(0);
log('assets :', extResources.length, '· template', (templateJson.length / 1024).toFixed(0), 'KB');
log('OK     :', OUT, `(${kb} KB)`);
