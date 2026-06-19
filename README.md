# WeRoFleet Console

A calm, data-dense **fleet-management console** for IT/AV teams who run large
estates of video-conferencing **room devices** (Room Kits, Room Bars, Boards).
One pane of glass to see every device's live state, triage alerts, push
firmware/branding presets, and drill into a single room's diagnostics.

It ships as a **single, self-contained HTML file** — no build server, no
install — and runs either against demo data or, with your own access token,
against a live Webex organization.

> **Not affiliated with Webex or Cisco.** "Room Kit" is used generically for a
> class of meeting-room hardware. WeRoFleet is an independent project; all
> device names, serials, and data shipped here are invented for demonstration.

---

## Features

- **Overview** — fleet health metrics, operational-state bar, firmware coverage, "needs attention" list.
- **Devices** — filterable/selectable table + a device-detail drawer (identity, health, live xAPI status, peripherals, history) with reboot.
- **Workspaces** — select rooms and apply a configuration **preset** in one run.
- **Config presets** — author reusable branding + call-button bundles; import/export as JSON.
- **Alerts** — severity-ranked queue with acknowledge / resolve.
- **Settings** — language, Webex API rate limit, polling cadence, connection.
- **Live Webex integration** — connect with a personal/integration bearer token; demo mode otherwise.
- **Multilingual (EN · FR · DE · LB)** — English, French, German, and Luxembourgish; auto-detects the browser language, switch any time from the top bar or Settings, choice is remembered.
- **Light & dark themes**, first-class peers.
- **Offline single-file build** — everything (React, icons, fonts, app) inlined; no network needed except the Webex API itself.

---

## Quick start

### Option A — open the single-file build
Grab `dist/WeRoFleet.html` (build it as below, or download it
from the project's Releases) and open it in any modern browser. It is fully
self-contained.

### Option B — run from source (dev)
Open `ui_kits/console/index.html` in a browser. In dev mode React, Babel, and
Lucide load from a CDN and JSX is transpiled in the browser, so an internet
connection is needed the first time.

---

## Build the self-contained bundle

Requires **Node 18+** (uses the built-in `fetch`).

```bash
node tools/build-bundle.mjs
# -> dist/WeRoFleet.html
```

The bundler:
1. downloads React, ReactDOM, and Lucide and **inlines** them (cached in `tools/.cache/`),
2. **pre-compiles all JSX with Babel in Node** — Babel is *not* shipped,
3. inlines all CSS, scripts, and the IBM Plex web fonts (base64 woff2),
4. emits one HTML file with **no remote dependencies** (the live Webex API aside).

A custom output path is supported: `node tools/build-bundle.mjs my-output.html`.

---

## Connecting to a live Webex org

1. In the console, open **Connect** and paste a Webex **access token** (and optionally an org ID).
2. Required scopes: `spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands`.
3. Webex doesn't send CORS headers for browser calls. If direct calls are blocked,
   run the tiny local proxy in [`ui_kits/console/proxy/`](ui_kits/console/proxy/)
   (no install — uses the runtime your OS already ships) and point **Connect →
   Advanced** at `http://localhost:8788/v1`.

Your token is stored only in this browser's local storage and sent directly to
Webex. Nothing is uploaded to WeRoFleet.

---

## Project structure

```
README.md                 You are here.
DESIGN.md                 Design-system guide (brand, tokens, components, voice).
LICENSE                   Non-commercial source-available license.
styles.css                Single CSS entry point (@imports tokens).
tokens/                   Design tokens: colors, type, spacing, elevation, fonts.
components/               React DS primitives (Button, StatusBadge, Input, …).
guidelines/               Token specimen cards.
assets/                   WeRoFleet logo + mark (SVG).
ui_kits/console/          The Fleet Console app (views, data, Webex client, i18n).
  ├─ i18n.js                i18n runtime; i18n.{fr,de,lb}.js dictionaries.
  ├─ *.view.jsx             screens (overview, devices, workspaces, …).
  ├─ webex.js / data.js     Webex API client + reactive store.
  └─ proxy/                 optional local CORS proxy launchers.
tools/build-bundle.mjs    Single-file bundler.
dist/                     Build output (git-ignored).
_ds_bundle.js, _ds_manifest.json   Generated design-system bundle (do not edit).
```

## Internationalization

UI strings are wrapped in a small `t()` helper using the English text as the
key. Translations live in `ui_kits/console/i18n.<lang>.js` — currently
**French (`fr`), German (`de`), and Luxembourgish (`lb`)**, with English as the
source/default. The language auto-detects from the browser (e.g. `fr-*` → `fr`,
`de-*` → `de`, `lb` → `lb`, otherwise `en`), can be switched from the top bar or
Settings, and is persisted per browser. Missing keys fall back to English, so
partial coverage is always safe. To add a language, drop in a new
`i18n.<lang>.js` setting `window.__WRF_<LANG>_DICT` and add it to `SUPPORTED`
in `i18n.js`.

## Design system

Brand, color, typography, spacing, motion, and component contracts are
documented in **[DESIGN.md](DESIGN.md)**. New work should reference semantic
tokens only (`--surface-card`, `--text-primary`, `--status-critical`) so light
/ dark and future retheming stay free.

---

## License

This project is released under a **custom non-commercial, source-available
license** — see **[LICENSE](LICENSE)**.

- ✅ Use, copy, and **modify** for non-commercial purposes.
- ✅ The **University of Luxembourg** is granted use and modification rights for its institutional purposes.
- ❌ **No commercial use, and no selling** the software or derivatives.

© 2026 Constant Rusche.

Bundled third-party components keep their own licenses: React/ReactDOM and Babel
(MIT), Lucide (ISC), IBM Plex fonts (SIL OFL 1.1).
