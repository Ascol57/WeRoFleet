/* WeRoFleet Console — i18n runtime (window.WRF_I18N)
   String-as-key model: the English text written in the source IS the lookup key.
   t('Fleet overview') returns the French string in FR mode, or the key itself
   (English) as the fallback. Interpolate with {named} placeholders:
     t('Connected · {n} devices', { n: 12 })
   Components re-render on language change by subscribing via WRF_I18N.useStore(). */
(function () {
  const KEY = 'wrf-lang';
  const SUPPORTED = ['en', 'fr', 'de', 'lb'];
  // Endonyms shown in the language switcher (same in every UI language).
  const LANG_LABEL = { en: 'English', fr: 'Français', de: 'Deutsch', lb: 'Lëtzebuergesch' };

  function detect() {
    try { const s = localStorage.getItem(KEY); if (s && SUPPORTED.indexOf(s) >= 0) return s; } catch (e) {}
    try {
      const n = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
      const hit = SUPPORTED.find(function (l) { return l !== 'en' && n.indexOf(l) === 0; });
      if (hit) return hit;
    } catch (e) {}
    return 'en';
  }
  let lang = detect();

  // ---- dictionaries (key = English source string) ------------------------
  // Loaded from the i18n.<lang>.js files; English keys with no entry fall back
  // to themselves, so partial coverage is always safe.
  const DICTS = {
    fr: window.__WRF_FR_DICT || {},
    de: window.__WRF_DE_DICT || {},
    lb: window.__WRF_LB_DICT || {},
  };

  function format(str, vars) {
    if (!vars) return str;
    return String(str).replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
  }

  function t(key, vars) {
    const d = DICTS[lang];
    const s = (d && d[key] != null) ? d[key] : key;   // fall back to the English key
    return format(s, vars);
  }

  // Canonical device-state → English label (matches the DS StatusBadge labels).
  // Pass tState(state) into <StatusBadge label=…> so the pill is localized too.
  const STATE_KEYS = { online: 'Online', incall: 'In call', degraded: 'Degraded', critical: 'Critical', offline: 'Offline' };
  function tState(state) { return t(STATE_KEYS[state] || state); }

  // ---- reactive language switch ------------------------------------------
  const listeners = new Set();
  function subscribe(fn) { listeners.add(fn); return function () { listeners.delete(fn); }; }
  function emit() { listeners.forEach(function (fn) { try { fn(); } catch (e) {} }); }

  function getLang() { return lang; }
  function setLang(l) {
    if (SUPPORTED.indexOf(l) < 0 || l === lang) return;
    lang = l;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    try { document.documentElement.setAttribute('lang', l); } catch (e) {}
    emit();
  }
  function toggle() { setLang(lang === 'fr' ? 'en' : 'fr'); }

  // React hook: re-render the calling component whenever the language changes.
  function useStore() {
    const r = React.useReducer(function (x) { return x + 1; }, 0);
    React.useEffect(function () { return subscribe(r[1]); }, []);
    return lang;
  }

  try { document.documentElement.setAttribute('lang', lang); } catch (e) {}

  window.WRF_I18N = { t: t, tState: tState, getLang: getLang, setLang: setLang, toggle: toggle, subscribe: subscribe, useStore: useStore, SUPPORTED: SUPPORTED, LANG_LABEL: LANG_LABEL, STATE_KEYS: STATE_KEYS };
})();
