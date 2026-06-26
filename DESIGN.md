# WeRoFleet — Design System

**WeRoFleet Console** is a fleet-management admin tool for IT and AV teams who run large estates of video-conferencing **room devices** (Room Kits, Room Bars, Boards). It is the single pane of glass where an admin sees every device's live state, triages what needs attention, pushes firmware, and drills into a single room's diagnostics.

> **Not affiliated with Webex or Cisco.** "Room Kit" is used generically to describe a class of meeting-room hardware. WeRoFleet is an independent, fictional product; all device names, serials, and data in this system are invented for demonstration.

**Audience:** fleet administrators, AV/IT operations, helpdesk. **Core job:** *"Is my fleet healthy, and what needs my attention right now?"* The product is data-dense, trustworthy, and calm — an operations console, not a marketing surface.

### Sources
This is a **greenfield** system — no external codebase or Figma was provided. The visual language was designed from the product brief (a calm enterprise admin console, cool blue/teal telecom heritage, humanist type, light + dark as first-class themes, high information density). If a real codebase or Figma exists, link it here so future contributors can reconcile.

---

## Brand concept

**WeRoFleet** = *"we run your fleet."* The voice is that of a dependable operations tool: precise, quiet, and confidence-inspiring. The signal motif — a connected device pulsing on the network — drives the teal accent and the live status dots that are the heartbeat of every screen.

- **Name in copy:** always one word, "WeRoFleet" (capital W, R, F). The product surface is the "WeRoFleet **Console**."
- **Tagline tone:** functional over clever. "Your rooms, at a glance."

---

## CONTENT FUNDAMENTALS

How copy is written across the console.

- **Voice:** calm, direct, operational. Short. We state the situation and the next action — never hype. Think NOC dashboard, not consumer app.
- **Person:** address the admin as **you** ("Devices you manage"). The product refers to itself as **WeRoFleet** or "the console," never "I/we" in UI strings. System-generated activity is attributed to **"System."**
- **Casing:** **Sentence case** everywhere — buttons, menus, headers, table columns are the one exception (column headers are `UPPERCASE` micro-labels, letter-spaced). Never Title Case full sentences.
- **Numbers:** always concrete and tabular. "1,184 online," "7 critical," "RoomOS 11.21.1.6." Counts lead; percentages support ("98.2% uptime · 30d"). Use thousands separators.
- **Status language:** the five canonical states are **Online · In call · Degraded · Critical · Offline** — used verbatim, never reworded ("down," "broken" → use *Critical* or *Offline*).
- **Time:** relative and short — "41m ago," "2h ago," "just now," "Last seen 2 minutes ago." Absolute timestamps only in detail/log views.
- **Buttons:** verb-first and specific — "Deploy update," "Acknowledge," "Reboot," "Add device." Avoid "OK / Submit."
- **Empty & error states:** factual + a path forward. "2 devices behind baseline — scheduled for tonight's maintenance window."
- **Severity vocabulary:** Critical (red) → Warning (amber) → Info (blue). Map every alert to one; don't invent new levels.
- **Emoji:** **never.** This is an enterprise ops tool. Iconography carries all glyph meaning.
- **Jargon:** domain terms are welcome and precise — firmware, baseline, peripheral, RoomOS, maintenance window, MAC, serial — because the audience is technical. Don't over-explain them.

**Examples (good):**
- `7 devices offline in San Jose HQ` · `Switch SJ-3F-SW2 stopped responding at 09:14.`
- `RoomOS 11.21 rolls out tonight, 22:00–02:00 PT`
- `Camera peripheral not detected`

---

## VISUAL FOUNDATIONS

The look: **calm, cool, and dense.** Borders and a cool-slate neutral ramp carry hierarchy; teal is reserved for action and live signal; shadows are subtle. Both light and dark are designed as peers (dark = NOC / dim-room mode).

### Color
- **Neutral spine — cool slate.** A 12-step slate ramp (`--slate-50…950`) with a faint blue cast is the backbone: app canvas, cards, text, borders, chrome. Slightly cool, never warm-gray.
- **Primary — teal (`--teal-500`, `#0E7C86`).** "Connected-signal" teal for the single primary action per view, links, focus, selection, and active nav. Restrained: most of a screen is neutral; teal punctuates. In dark mode the accent lifts to `--teal-400` for contrast.
- **Status palette** is the product's most important color system. Five states, each with a dot/fill color, a tinted `-bg`, and an accessible `-text`:
  - Online → green · In call → blue · Degraded → amber · Critical → red · Offline → slate.
  - These map 1:1 to the `StatusBadge` component. **Never** use teal for status (teal = action, not health).
- **Semantic aliases** (`--surface-*`, `--text-*`, `--border-*`, `--accent-*`, `--status-*`) are the *only* things components reference. Both themes redefine the same aliases under `[data-theme="dark"]`, so components are theme-agnostic.
- **Imagery vibe:** minimal photography. Where device imagery appears it's clean product-on-neutral; the UI itself is the hero. No gradients-as-decoration, no duotones.

### Typography
- **IBM Plex Sans** — all UI text. Humanist grotesque: warm, highly legible at small sizes, technical without being cold. Weights 400/500/600/700.
- **IBM Plex Sans Condensed** — table column headers and tight metric labels where horizontal space is scarce.
- **IBM Plex Mono** — telemetry and identifiers: serials, MAC/IP, firmware versions, uptime, log lines. Anything you'd copy-paste is mono.
- **Scale** is tuned dense: body **13px** (`--text-sm`) in tables/controls, **14px** standard body, page titles **24px**, dashboard headline metrics **40px**. Micro-labels **11px** uppercase + `0.06em` tracking.
- **Tabular figures** (`font-feature-settings: 'tnum'`) on every metric and data column so numbers align.

### Spacing & layout
- **4px base grid.** Tight by default (`--space-1`=4 → `--space-16`=64). Controls are compact: 28/34/40px heights.
- **Fixed layout rails:** left nav `--rail-nav` (248px), top bar `--topbar-height` (56px), right inspector `--rail-detail` (360px), content capped at `--content-max` (1440px) and centered.
- Density target was **7/10** — generous enough to read, tight enough to see a whole site's fleet without scrolling forever.

### Shape, borders & elevation
- **Corner radii are small and restrained:** chips/badges 3px, inputs/buttons 5px, cards/menus 8px, modals 12px, pills/dots full. Nothing is bubbly.
- **Borders do the heavy lifting.** `--border-subtle/default/strong` (cool slate) separate rows, cards, and regions. Cards are a 1px border + `--surface-card` + a *whisper* of shadow.
- **Shadows are subtle and cool-tinted** (`rgba(11,16,21,…)`): `xs` hairline → `xl` for drawers/modals. Elevation is a last resort; most hierarchy is border + surface tint. Dark mode uses deeper black shadows.
- **No protection gradients or glows.** Overlays use a flat `--scrim` (semi-opaque slate), not blur, except where a true frosted layer is warranted.

### Motion
- **Crisp, short, mostly-standard easing.** `--ease-standard` (cubic-bezier(.2,0,0,1)) at ~150–220ms for the vast majority. `--ease-emphasized` for tab underlines; `--ease-spring` only for tiny pops (checkbox tick, switch thumb).
- **Live signal:** `incall` and `critical` status dots pulse on a 2s cadence (`--pulse-period`) — the one ambient animation. Everything respects `prefers-reduced-motion`.
- Hover = subtle surface tint (`--surface-hover`) or one step darker accent. Press/active = `--surface-active` / `--accent-active`. No scale-down bounce on buttons.

### Hover / focus / press states
- **Hover:** rows and nav items get `--surface-hover`; buttons darken one accent step; links underline-on-intent.
- **Focus:** always a visible `--focus-ring` (3px teal-at-35%) — never removed; critical for keyboard-driven ops work.
- **Selection:** active nav and selected rows use `--accent-subtle` bg + `--accent-active` text.

### Transparency & blur
Used sparingly: the modal/drawer scrim is a flat translucent slate. Frosted blur is **not** a brand motif — clarity beats decoration in an ops console.

---

## ICONOGRAPHY

- **System: [Lucide](https://lucide.dev) (v0.456.0), loaded from CDN.** Clean 1.5px-stroke open-line icons that pair naturally with IBM Plex's humanist forms. This is a **deliberate substitution** for a proprietary icon set (none was provided) — Lucide's stroke weight and geometry match the calm, technical tone. **Flag for the user:** if WeRoFleet has its own icon library, swap the CDN link and re-map names.
- **Usage:** rendered as `<i data-lucide="name"></i>` then `lucide.createIcons()`. Sizes 12–22px; inherit `currentColor`. Common glyphs: `monitor` (device), `video` (in call), `alert-octagon/triangle` (critical/warning), `rotate-cw` (reboot), `upload-cloud`/`download-cloud` (firmware), `layout-dashboard`, `door-open`, `settings`, `chevron-right`.
- **Status is never icon-only** — status uses the colored dot + label (`StatusBadge`); icons add meaning but color + text carry it (accessibility).
- **No emoji. No Unicode-as-icon.** All glyphs come from Lucide.
- **Logo:** the WeRoFleet wordmark + mark live in `assets/` as SVG (light, on-dark, and standalone mark variants). The mark is a stylized signal/fleet glyph in teal.

---

## INDEX / MANIFEST

### Root
- **`styles.css`** — the single entry point consumers link. `@import`s only.
- **`DESIGN.md`** — this guide (the design-system reference). The repository overview lives in `README.md`.
- **`SKILL.md`** — Agent-Skill front-matter so this folder works as a Claude Skill.
- `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json` — **auto-generated**, do not edit.

### `tokens/` (CSS custom properties, imported by `styles.css`)
- `fonts.css` — IBM Plex Sans / Sans Condensed / Mono via Google Fonts CDN.
- `colors.css` — slate + teal ramps, full semantic alias layer, status palette, **light + dark** themes.
- `typography.css` — families, dense type scale, weights, tracking, leading, line-heights.
- `spacing.css` — 4px scale, control sizes, layout rails, radii, border widths.
- `elevation.css` — cool-tinted shadow scale + motion (durations, easings, pulse cadence).

### `components/` (React primitives — `window.HelmRoomKitFleetDS_91f16f.<Name>`)
- **core/** — `Button`, `IconButton`, `Badge`, `StatusBadge`, `Tag`, `Avatar`, `MetricStat`, `Card`
- **forms/** — `Input`, `Select`, `Checkbox` (+ radio), `Switch`
- **feedback/** — `Banner`, `ProgressBar`, `Tooltip`
- **navigation/** — `Tabs` (underline + segmented)

Each component dir has `<Name>.jsx` (impl), `<Name>.d.ts` (props/contract), `<Name>.prompt.md` (usage), and one `*.card.html` thumbnail for the Design System tab.

### `ui_kits/console/` — Fleet Console (the product)
A click-through admin console composing the primitives above. Plain `<script>`s
(no bundler): `*.view.jsx` screens are transpiled in-browser by Babel in dev and
pre-compiled by the bundler for the single-file build. Each screen registers a
`window.WRF_*` global.

- `index.html` — entry (light/dark toggle, persisted nav, first-run splash, dev CSP).
- `app.boot.jsx` — root app: store wiring, Webex auto-connect, routing, theme, toasts.
- `shell.runtime.js` — sidebar + top-bar app shell (nav, global search, connection status).
- `overview.view.jsx` — dashboard: health metrics, fleet-state bar, firmware coverage, "needs attention" list.
- `devices.view.jsx` — filterable/selectable device table **+ device-detail drawer** (identity, health, live xAPI status, peripherals, history) with reboot.
- `workspaces.view.jsx` — select rooms and apply a config preset in one run.
- `presets.view.jsx` — author reusable config presets; import/export as JSON.
- `branding.view.jsx` — per-device branding editor (opened from the device drawer).
- `connect.view.jsx` — Webex connect modal (token, org id, optional CORS proxy).
- `settings.view.jsx` — language, Webex API rate limit, polling cadence, connection.
- `data.js` — reactive store + demo fleet (15 devices).
- `webex.js` — Webex API client (devices, xAPI status/commands, branding).
- `poller.js` — background low-priority fleet status sweep.
- `presets.js` — preset model + local storage.
- `request-manager.js` — rate-limited request queue with 429 backoff.
- `i18n.js` + `i18n.{fr,de,lb}.js` — i18n runtime + dictionaries.
- `console.css` — kit-local layout (uses DS tokens only).
- `proxy/` — optional local CORS-proxy launchers (macOS/Windows/Linux).

### `guidelines/` — foundation specimen cards
Small `@dsCard` HTML files rendering the live tokens: color ramps (primary/neutral/status/semantic), type (scale/families/numerics), spacing (scale/radii/elevation/motion), and brand (logo).

### `assets/`
WeRoFleet logo lockups (light, on-dark) and the standalone mark, as SVG.

---

## Using this system

1. Link `styles.css` for tokens, fonts, and both themes. Toggle dark with `data-theme="dark"` on any container.
2. Load React UMD + the generated `_ds_bundle.js`, then read components from `window.HelmRoomKitFleetDS_91f16f`.
3. Reference **only semantic tokens** in new work (`--surface-card`, `--text-primary`, `--status-critical`) so light/dark and future retheming stay free.
4. Iconography via Lucide CDN; status via `StatusBadge` (never hand-rolled).
