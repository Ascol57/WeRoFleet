---
name: werofleet-design
description: Use this skill to generate well-branded interfaces and assets for WeRoFleet (a Room Kit fleet-management admin console), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the `DESIGN.md` file within this skill (the design-system guide), and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick map
- `styles.css` — link this one file for all tokens, fonts (IBM Plex), and both light + dark themes. Toggle dark with `data-theme="dark"`.
- `tokens/` — color (cool slate + teal, five-state status palette), typography (dense scale), spacing (4px grid, layout rails), elevation (subtle cool shadows + motion).
- `components/` — React primitives, exposed at `window.HelmRoomKitFleetDS_91f16f.<Name>` after loading `_ds_bundle.js`. See each `<Name>.prompt.md` for usage.
- `ui_kits/console/` — full click-through fleet admin console (Overview, Devices + detail drawer, Alerts) to copy patterns from.
- `guidelines/` — token specimen cards.
- `assets/` — WeRoFleet logo + mark SVGs.

## Non-negotiables
- **Voice:** calm, operational, sentence case, address the user as "you", concrete tabular numbers, no emoji.
- **Status** uses the five canonical states (Online / In call / Degraded / Critical / Offline) via the `StatusBadge` component — never teal, never hand-rolled.
- **Teal = action & live signal only.** Neutrals + borders carry hierarchy. Small radii, subtle cool shadows.
- **Icons:** Lucide (CDN), 1.5px stroke. No emoji, no Unicode glyphs.
- Reference **semantic tokens** only (`--surface-card`, `--text-primary`, `--status-critical`) so light/dark stays free.
