#!/usr/bin/env node
// ============================================================
// WeRoFleet — release ZIP builder
//
// Assembles the user-facing distribution archive (WeRoFleet.zip),
// the file the University downloads from the GitHub Releases page:
//
//   WeRoFleet/
//     WeRoFleet.html                  the self-contained app
//     proxy/                          per-OS CORS-proxy launchers
//     docs/                           UNILU_{FR,EN,DE,LB}.md guides
//
// Zero dependencies: the ZIP is written with a tiny built-in writer
// (deflate via node:zlib), matching the "no install" spirit of the
// bundler. Unix exec bits are preserved for the .sh / .command
// launchers so they stay runnable after extraction.
//
//   Usage:
//     node tools/build-zip.mjs [output.zip]   # default: ./WeRoFleet.zip
//     node tools/build-zip.mjs --fresh        # force-rebuild the bundle first
//
// If the HTML bundle is missing, it is built automatically by
// invoking tools/build-bundle.mjs.
// ============================================================

import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve, join, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deflateRawSync } from 'node:zlib';
import { execFileSync } from 'node:child_process';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUNDLE = join(ROOT, 'dist', 'WeRoFleet.html');
const PROXY_DIR = join(ROOT, 'ui_kits', 'console', 'proxy');
const DOCS_DIR = join(ROOT, 'docs');
const TOP = 'WeRoFleet'; // wrapper folder inside the archive

const args = process.argv.slice(2);
const fresh = args.includes('--fresh');
const outArg = args.find((a) => !a.startsWith('--'));
const OUT = outArg ? resolve(process.cwd(), outArg) : join(ROOT, 'WeRoFleet.zip');

const log = (...a) => console.log('[zip]', ...a);

// CRC-32 table, defined before any top-level use (const isn't hoisted).
const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

// ---- 1. make sure the single-file bundle exists ----------------------------
if (fresh || !existsSync(BUNDLE)) {
  log(fresh ? 'rebuilding bundle (--fresh)…' : 'bundle missing — building it…');
  execFileSync('node', [join(ROOT, 'tools', 'build-bundle.mjs')], { stdio: 'inherit' });
}

// ---- 2. collect the files that go into the archive -------------------------
const DOC_NAMES = ['UNILU_FR.md', 'UNILU_EN.md', 'UNILU_DE.md', 'UNILU_LB.md'];

const entries = [];
const add = (zipPath, absFile, mode) =>
  entries.push({ name: `${TOP}/${zipPath}`, data: readFileSync(absFile), mode });

// the app
add(basename(BUNDLE), BUNDLE, 0o644);

// the proxy folder (all launchers + its README), exec bit for scripts
for (const f of readdirSync(PROXY_DIR)) {
  const abs = join(PROXY_DIR, f);
  if (!statSync(abs).isFile()) continue;
  const exec = /\.(sh|command)$/.test(f);
  add(`proxy/${f}`, abs, exec ? 0o755 : 0o644);
}

// the UNILU guides
for (const f of DOC_NAMES) {
  const abs = join(DOCS_DIR, f);
  if (!existsSync(abs)) { log(`WARN: missing doc ${f} — skipped`); continue; }
  add(`docs/${f}`, abs, 0o644);
}

// ---- 3. write the ZIP ------------------------------------------------------
writeFileSync(OUT, makeZip(entries));
const kb = (statSync(OUT).size / 1024).toFixed(0);
log(`wrote ${OUT}  (${entries.length} files, ${kb} KB)`);
for (const e of entries) log('  +', e.name);

// ============================================================
// Minimal ZIP writer  (store/deflate, CRC-32, Unix perms)
// ============================================================
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function makeZip(files) {
  // Fixed timestamp (2026-01-01 00:00) keeps the archive reproducible —
  // Date.now() would make every build byte-different.
  const dosDate = ((2026 - 1980) << 9) | (1 << 5) | 1;
  const dosTime = 0;

  const local = [];
  const central = [];
  let offset = 0;

  for (const f of files) {
    const nameBuf = Buffer.from(f.name, 'utf8');
    const crc = crc32(f.data);
    const deflated = deflateRawSync(f.data);
    const store = deflated.length >= f.data.length;
    const method = store ? 0 : 8;
    const body = store ? f.data : deflated;
    const extAttrs = (((f.mode ?? 0o644) & 0xffff) << 16) >>> 0; // Unix mode

    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0);
    lh.writeUInt16LE(20, 4); // version needed
    lh.writeUInt16LE(0x0800, 6); // flag: UTF-8 names
    lh.writeUInt16LE(method, 8);
    lh.writeUInt16LE(dosTime, 10);
    lh.writeUInt16LE(dosDate, 12);
    lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(body.length, 18);
    lh.writeUInt32LE(f.data.length, 22);
    lh.writeUInt16LE(nameBuf.length, 26);
    lh.writeUInt16LE(0, 28);
    local.push(lh, nameBuf, body);

    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE((3 << 8) | 20, 4); // version made by: Unix
    cd.writeUInt16LE(20, 6); // version needed
    cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(method, 10);
    cd.writeUInt16LE(dosTime, 12);
    cd.writeUInt16LE(dosDate, 14);
    cd.writeUInt32LE(crc, 16);
    cd.writeUInt32LE(body.length, 20);
    cd.writeUInt32LE(f.data.length, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30); // extra len
    cd.writeUInt16LE(0, 32); // comment len
    cd.writeUInt16LE(0, 34); // disk #
    cd.writeUInt16LE(0, 36); // internal attrs
    cd.writeUInt32LE(extAttrs, 38); // external attrs (Unix perms)
    cd.writeUInt32LE(offset, 42);
    central.push(cd, nameBuf);

    offset += lh.length + nameBuf.length + body.length;
  }

  const centralBuf = Buffer.concat(central);
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralBuf.length, 12);
  eocd.writeUInt32LE(offset, 16);
  eocd.writeUInt16LE(0, 20);

  return Buffer.concat([...local, centralBuf, eocd]);
}
