/* WeRoFleet Console — config presets store + apply engine (window.WRF_PRESETS)
   Presets are reusable config bundles authored in the Presets interface and
   applied to the devices inside selected workspaces. */
(function () {
  const { t } = window.WRF_I18N;
  const KEY = 'wrf-presets-v1';
  const CALL_KEYS = [
    ['JoinWebex', 'Webex'],
    ['JoinMicrosoftTeamsCVI', 'Microsoft Teams CVI'],
    ['JoinMicrosoftTeamsDirectGuestJoin', 'Microsoft Teams Direct Guest Join'],
    ['JoinGoogleMeet', 'Google Meet'],
    ['JoinZoom', 'Zoom'],
  ];
  const IMAGE_TYPE = 'HalfwakeBackground';
  const BG_TYPE = 'Background';
  // On/Off/Auto config toggles pushed via deviceConfigurations. 'auto' = leave unchanged.
  // label is the English key; views localize it with t(label) at render time.
  const VALUE_TOGGLES = [
    { key: 'wallpaperOverlay', label: 'Custom wallpaper overlay', path: 'UserInterface.CustomWallpaperOverlay' },
    { key: 'dashboard', label: 'Home screen dashboard', path: 'UserInterface.HomeScreen.Dashboard' },
  ];
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  // Demo mode only: fail a fraction of simulated actions with a plausible reason
  // so a demo run (and the exported PDF) actually exercises the error path — you
  // can see what a partial deployment looks like without a live org. Live mode
  // never calls this; real errors come from the Webex API.
  const DEMO_ERRORS = [
    'Webex 429 — rate limited, retry a bit later',
    'Webex 403 — the token is missing a required scope',
    'Device offline — could not reach the xAPI',
    'xAPI command timed out after 10s',
    'Webex 500 — internal error, please retry',
  ];
  function demoFault(rate) {
    if (Math.random() >= (rate == null ? 0.14 : rate)) return null;
    return DEMO_ERRORS[Math.floor(Math.random() * DEMO_ERRORS.length)];
  }

  // Wallpaper bundle selection. 'auto' = leave unchanged; 'first'/'last' resolve
  // against the device's WallpaperBundle.List; 'custom' uses a human 1-based
  // position (1..256) that maps to the 0-based list index at apply time;
  // 'name' targets a specific bundle by its exact Name (case-insensitive),
  // which is the reliable way to pick one of the device's default wallpapers.
  const WB_MODES = ['auto', 'first', 'last', 'custom', 'name'];
  const WB_MIN = 1, WB_MAX = 256;
  // Accent is injected into inline styles (swatches, color-mix). Only allow a
  // hex color so an imported preset can't smuggle in another CSS value/function.
  const ACCENT_RE = /^#[0-9a-f]{3,8}$/i;
  function safeAccent(c) { return ACCENT_RE.test(c) ? c : '#0E7C86'; }
  function wbNum(v) {
    const n = parseInt(v, 10);
    if (!isFinite(n)) return WB_MIN;
    return Math.max(WB_MIN, Math.min(WB_MAX, n));
  }
  // 0-based index into a bundle list of `count` entries, clamped to its bounds.
  function wbIndex(p, count) {
    if (!count || count < 1) return -1;
    if (p.wallpaperBundleMode === 'first') return 0;
    if (p.wallpaperBundleMode === 'last') return count - 1;
    return Math.min(wbNum(p.wallpaperBundleIndex) - 1, count - 1);
  }
  // Short label for the chosen bundle (badge + apply log).
  function wbLabel(p) {
    if (p.wallpaperBundleMode === 'first') return t('First');
    if (p.wallpaperBundleMode === 'last') return t('Last');
    if (p.wallpaperBundleMode === 'name') return '“' + (String(p.wallpaperBundleName || '').trim() || t('(unnamed)')) + '”';
    return '#' + wbNum(p.wallpaperBundleIndex);
  }

  function normImg(img) {
    if (!img || !img.base64) return null;
    // Reject anything that isn't clean base64, and rebuild the data: URL from it
    // ourselves — never trust an imported `url` field (it could point off-origin
    // or be a non-image data: payload and end up in <img src> / CSS url()).
    const b64 = String(img.base64).replace(/\s+/g, '');
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(b64)) return null;
    let mime = 'image/png';
    const m = typeof img.url === 'string' && img.url.match(/^data:(image\/(?:png|jpeg|webp|gif));base64,/i);
    if (m) mime = m[1].toLowerCase();
    return { name: String(img.name || 'image').slice(0, 200), size: Number(img.size) || 0, base64: b64, url: 'data:' + mime + ';base64,' + b64 };
  }

  // Branding modes: 'set' = upload image, 'remove' = Branding.Delete, 'auto' = leave unchanged.
  function migrate(p) {
    if (!p) return p;
    const m = (mode, flag) => (mode === 'set' || mode === 'remove' || mode === 'auto') ? mode : (flag === true ? 'set' : 'auto');
    p.imageMode = m(p.imageMode, p.useImage);
    p.bgMode = m(p.bgMode, p.useBgImage);
    // On/Off/Auto value toggles default to 'auto' (don't touch the device).
    VALUE_TOGGLES.forEach((t) => {
      const v = p[t.key + 'Mode'];
      p[t.key + 'Mode'] = (v === 'on' || v === 'off' || v === 'auto') ? v : 'auto';
    });
    // Wallpaper bundle defaults to 'auto' (older presets have no such field).
    p.wallpaperBundleMode = WB_MODES.includes(p.wallpaperBundleMode) ? p.wallpaperBundleMode : 'auto';
    p.wallpaperBundleIndex = wbNum(p.wallpaperBundleIndex);
    p.wallpaperBundleName = typeof p.wallpaperBundleName === 'string' ? p.wallpaperBundleName.slice(0, 200) : '';
    p.accent = safeAccent(p.accent);
    return p;
  }

  const SEED = [
    {
      id: 'pr-standard', name: t('Standard meeting room'), accent: '#0E7C86',
      description: t('Default branding for everyday meeting rooms — Webex & Teams visible.'),
      image: null, imageMode: 'auto', bgImage: null, bgMode: 'auto',
      customMessage: t('If help needed, please call 9911.'), useMessage: true,
      call: { JoinWebex: 'Auto', JoinMicrosoftTeamsDirectGuestJoin: 'Auto', JoinGoogleMeet: 'Hidden', JoinZoom: 'Hidden' }, useCall: true,
      updatedAt: Date.now() - 864e5 * 4,
    },
    {
      id: 'pr-exec', name: t('Executive boardroom'), accent: '#2A6FDB',
      description: t('All call platforms enabled for cross-company guests.'),
      image: null, imageMode: 'auto', bgImage: null, bgMode: 'auto',
      customMessage: t('For AV support, dial 9911.'), useMessage: true,
      call: { JoinWebex: 'Auto', JoinMicrosoftTeamsDirectGuestJoin: 'Auto', JoinGoogleMeet: 'Auto', JoinZoom: 'Auto' }, useCall: true,
      updatedAt: Date.now() - 864e5 * 11,
    },
    {
      id: 'pr-lobby', name: t('Lobby / signage'), accent: '#B0830B',
      description: t('Signage devices — no call buttons, reception message.'),
      image: null, imageMode: 'auto', bgImage: null, bgMode: 'remove',
      customMessage: t('Welcome — please see reception for assistance.'), useMessage: true,
      call: { JoinWebex: 'Hidden', JoinMicrosoftTeamsDirectGuestJoin: 'Hidden', JoinGoogleMeet: 'Hidden', JoinZoom: 'Hidden' }, useCall: true,
      updatedAt: Date.now() - 864e5 * 2,
    },
  ];

  function load() {
    try { const v = JSON.parse(localStorage.getItem(KEY)); if (Array.isArray(v)) return v.map(migrate); } catch (e) {}
    return SEED.map((s) => migrate({ ...s }));
  }
  function persist() { try { localStorage.setItem(KEY, JSON.stringify(presets)); } catch (e) {} }

  let presets = load();
  const listeners = new Set();
  function emit() { listeners.forEach((f) => { try { f(); } catch (e) {} }); }
  function subscribe(f) { listeners.add(f); return () => listeners.delete(f); }
  function useStore() {
    const [, force] = React.useReducer((x) => x + 1, 0);
    React.useEffect(() => subscribe(force), []);
    return presets;
  }

  function all() { return presets; }
  function get(id) { return presets.find((p) => p.id === id); }
  function upsert(p) {
    p = { ...p, updatedAt: Date.now() };
    const i = presets.findIndex((x) => x.id === p.id);
    presets = i >= 0 ? presets.map((x, k) => (k === i ? p : x)) : [...presets, p];
    persist(); emit(); return p;
  }
  function remove(id) { presets = presets.filter((p) => p.id !== id); persist(); emit(); }
  function duplicate(id) {
    const p = get(id); if (!p) return;
    upsert({ ...p, id: 'pr-' + Math.random().toString(36).slice(2, 8), name: p.name + ' ' + t('copy') });
  }
  function blank() {
    return {
      id: 'pr-' + Math.random().toString(36).slice(2, 8), name: '', description: '', accent: '#0E7C86',
      image: null, imageMode: 'auto',
      bgImage: null, bgMode: 'auto',
      wallpaperOverlayMode: 'auto', dashboardMode: 'auto',
      wallpaperBundleMode: 'auto', wallpaperBundleIndex: 1, wallpaperBundleName: '',
      customMessage: t('If help needed, please call 9911.'), useMessage: true,
      call: { JoinWebex: 'Auto', JoinMicrosoftTeamsDirectGuestJoin: 'Auto', JoinGoogleMeet: 'Hidden', JoinZoom: 'Hidden' }, useCall: true,
    };
  }
  function actions(p) {
    const a = [];
    if (p.imageMode === 'set' && p.image) a.push({ label: t('Halfwake'), tone: 'neutral' });
    else if (p.imageMode === 'remove') a.push({ label: t('Halfwake: clear'), tone: 'degraded' });
    if (p.bgMode === 'set' && p.bgImage) a.push({ label: t('Background'), tone: 'neutral' });
    else if (p.bgMode === 'remove') a.push({ label: t('Background: clear'), tone: 'degraded' });
    if (p.wallpaperBundleMode && p.wallpaperBundleMode !== 'auto') a.push({ label: t('Wallpaper bundle') + ': ' + wbLabel(p), tone: 'neutral' });
    if (p.useMessage && p.customMessage) a.push({ label: t('Message'), tone: 'neutral' });
    if (p.useCall && p.call) a.push({ label: t('Call buttons'), tone: 'neutral' });
    VALUE_TOGGLES.forEach((tog) => {
      const m = p[tog.key + 'Mode'];
      if (m === 'on' || m === 'off') a.push({ label: t(tog.label) + ': ' + (m === 'on' ? t('On') : t('Off')), tone: m === 'on' ? 'neutral' : 'degraded' });
    });
    return a;
  }

  // ---- export / import ----
  function serialize(list) {
    return JSON.stringify({ type: 'werofleet.presets', version: 1, exportedAt: new Date().toISOString(), presets: list }, null, 2);
  }
  function exportAll() { return serialize(presets); }
  function exportOne(id) { const p = get(id); return p ? serialize([p]) : null; }

  function normalizeCall(c) {
    const def = { JoinWebex: 'Auto', JoinMicrosoftTeamsDirectGuestJoin: 'Auto', JoinGoogleMeet: 'Hidden', JoinZoom: 'Hidden' };
    if (!c || typeof c !== 'object') return def;
    const out = { ...def };
    CALL_KEYS.forEach(([k]) => { if (c[k] === 'Auto' || c[k] === 'Hidden') out[k] = c[k]; });
    return out;
  }
  function sanitize(raw) {
    raw = raw || {};
    const img = normImg(raw.image);
    const bg = normImg(raw.bgImage);
    const mode = (m, flag, hasImg) => (m === 'set' || m === 'remove' || m === 'auto') ? m : (flag === true ? 'set' : 'auto');
    return {
      id: 'pr-' + Math.random().toString(36).slice(2, 8),
      name: String(raw.name || t('Imported preset')),
      description: String(raw.description || ''),
      accent: safeAccent(raw.accent),
      image: img, imageMode: mode(raw.imageMode, raw.useImage),
      bgImage: bg, bgMode: mode(raw.bgMode, raw.useBgImage),
      wallpaperOverlayMode: ['on', 'off', 'auto'].includes(raw.wallpaperOverlayMode) ? raw.wallpaperOverlayMode : 'auto',
      dashboardMode: ['on', 'off', 'auto'].includes(raw.dashboardMode) ? raw.dashboardMode : 'auto',
      wallpaperBundleMode: WB_MODES.includes(raw.wallpaperBundleMode) ? raw.wallpaperBundleMode : 'auto',
      wallpaperBundleIndex: wbNum(raw.wallpaperBundleIndex),
      wallpaperBundleName: typeof raw.wallpaperBundleName === 'string' ? raw.wallpaperBundleName.slice(0, 200) : '',
      customMessage: raw.customMessage != null ? String(raw.customMessage) : '',
      useMessage: raw.useMessage !== false,
      call: normalizeCall(raw.call), useCall: raw.useCall !== false,
      updatedAt: Date.now(),
    };
  }
  function importJSON(text) {
    let data;
    try { data = JSON.parse(text); } catch (e) { throw new Error(t('Invalid JSON file')); }
    const arr = Array.isArray(data) ? data : (data && Array.isArray(data.presets) ? data.presets : (data && data.id ? [data] : null));
    if (!arr || !arr.length) throw new Error(t('No presets found in this file'));
    const added = arr.map(sanitize);
    presets = [...presets, ...added]; persist(); emit();
    return added.length;
  }

  // Apply a preset to a list of devices. onLog receives entries; updates carry { uid, update:true }.
  async function apply(p, devices, opts) {
    opts = opts || {};
    const live = opts.live;
    const log = opts.onLog || function () {};
    const WX = window.WRF_WEBEX;
    let uid = 0;
    const head = (d) => log({ uid: ++uid, kind: 'head', name: d.workspaceName || d.room || d.name, model: d.model });
    const start = (label) => { const id = ++uid; log({ uid: id, kind: 'act', label, status: 'run' }); return id; };
    const fin = (id, status, detail) => log({ uid: id, update: true, status, detail });

    for (const d of devices) {
      head(d);
      await applyImage(d, p.imageMode, IMAGE_TYPE, p.image);
      await applyImage(d, p.bgMode, BG_TYPE, p.bgImage);
      async function applyImage(dev, mode, type, image) {
        if (mode === 'set' && image && image.base64) {
          const id = start(t('Upload {type}', { type: type }));
          try {
            if (live) await WX.uploadBranding(dev.id, type, image.base64);
            else { await delay(240); const f = demoFault(); if (f) throw new Error(f); }
            fin(id, 'ok');
          } catch (e) { fin(id, 'err', e.message); }
          await delay(200);
        } else if (mode === 'remove') {
          const id = start(t('Remove {type}', { type: type }));
          try {
            if (live) await WX.deleteBranding(dev.id, type);
            else { await delay(160); const f = demoFault(); if (f) throw new Error(f); }
            fin(id, 'ok');
          } catch (e) { fin(id, 'err', e.message); }
          await delay(200);
        }
        // 'auto' → leave unchanged
      }
      if (p.wallpaperBundleMode && p.wallpaperBundleMode !== 'auto') {
        const id = start(t('Wallpaper bundle') + ' → ' + wbLabel(p));
        try {
          if (live) {
            const bundles = await WX.listWallpaperBundles(d.id);
            if (!bundles.length) throw new Error(t('No wallpaper bundles on this device'));
            let b;
            if (p.wallpaperBundleMode === 'name') {
              const want = String(p.wallpaperBundleName || '').trim().toLowerCase();
              if (!want) throw new Error(t('No wallpaper bundle name set on this preset'));
              b = bundles.find((x) => x.name.toLowerCase() === want);
              if (!b) throw new Error(t('Bundle “{name}” not found on this device', { name: p.wallpaperBundleName }));
            } else {
              const idx = wbIndex(p, bundles.length);
              if (idx < 0) throw new Error(t('No wallpaper bundles on this device'));
              b = bundles[idx];
            }
            await WX.setWallpaperBundle(d.id, b.name);
            fin(id, 'ok', b.name);
          } else { await delay(220); const f = demoFault(); if (f) throw new Error(f); fin(id, 'ok', p.wallpaperBundleMode === 'name' ? p.wallpaperBundleName : undefined); }
        } catch (e) { fin(id, 'err', e.message); }
        await delay(200);
      }
      if (p.useMessage && p.customMessage != null) {
        const id = start(t('Set CustomMessage'));
        try {
          if (live) await WX.setCustomMessage(d.id, p.customMessage);
          else { await delay(180); const f = demoFault(); if (f) throw new Error(f); }
          fin(id, 'ok');
        } catch (e) { fin(id, 'err', e.message); }
        await delay(200);
      }
      if (p.useCall && p.call) {
        for (const [key, label] of CALL_KEYS) {
          const id = start(t('Call · {platform}', { platform: label }) + ' \u2192 ' + t(p.call[key]));
          try {
            if (live) await WX.setCallFeature(d.id, key, p.call[key]);
            else { await delay(110); const f = demoFault(); if (f) throw new Error(f); }
            fin(id, 'ok');
          } catch (e) { fin(id, 'err', e.message); }
          await delay(140);
        }
      }
      for (const tog of VALUE_TOGGLES) {
        const mode = p[tog.key + 'Mode'];
        if (mode !== 'on' && mode !== 'off') continue; // 'auto' → leave unchanged
        const value = mode === 'on' ? 'On' : 'Off';
        const id = start(t(tog.label) + ' \u2192 ' + t(value));
        try {
          if (live) await WX.setConfigValue(d.id, tog.path, value);
          else { await delay(150); const f = demoFault(); if (f) throw new Error(f); }
          fin(id, 'ok');
        } catch (e) { fin(id, 'err', e.message); }
        await delay(160);
      }
    }
  }

  // Track which preset was last applied to each workspace (local only).
  const APPLIED_KEY = 'wrf-ws-applied-v1';
  function loadApplied() { try { return JSON.parse(localStorage.getItem(APPLIED_KEY)) || {}; } catch (e) { return {}; } }
  function recordApplied(wsId, presetName) {
    const m = loadApplied(); m[wsId] = { name: presetName, at: Date.now() };
    try { localStorage.setItem(APPLIED_KEY, JSON.stringify(m)); } catch (e) {}
  }

  window.WRF_PRESETS = {
    all, get, upsert, remove, duplicate, blank, actions, useStore, subscribe, apply,
    exportAll, exportOne, importJSON,
    CALL_KEYS, IMAGE_TYPE, BG_TYPE, VALUE_TOGGLES, loadApplied, recordApplied,
    WB_MODES, WB_MIN, WB_MAX, wbNum, wbLabel,
  };
})();
