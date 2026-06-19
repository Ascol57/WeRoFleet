/* WeRoFleet Console — reactive store (demo + live Webex data) */
(function () {
  const { t } = window.WRF_I18N;
  const SITES = ['San Jose HQ', 'London', 'Sydney', 'Austin'];

  // ---- Demo fleet (used until a live Webex org is connected) ----
  const DEMO_DEVICES = [
    { id: 'd-01', name: 'Boardroom A',        room: 'Floor 3 · East',   site: 'San Jose HQ', model: 'Room Kit Pro',  state: 'incall',   fw: '11.21.1.6', fwOld: false, uptime: '14d 06:22', ip: '10.4.22.18',  serial: 'FOC2530NX9K', mac: 'F4:DB:E6:1A:22:0C', issue: null, meeting: 'Q3 Planning · 24 people' },
    { id: 'd-02', name: 'Executive Briefing', room: 'Floor 12',         site: 'San Jose HQ', model: 'Board 70',      state: 'online',   fw: '11.21.1.6', fwOld: false, uptime: '32d 01:10', ip: '10.4.22.41',  serial: 'FOC2511PQ2A', mac: 'F4:DB:E6:1A:31:7E', issue: null, meeting: null },
    { id: 'd-03', name: 'Huddle 2',           room: 'Floor 2 · West',   site: 'San Jose HQ', model: 'Room Bar',      state: 'degraded', fw: '11.19.0.3', fwOld: true,  uptime: '5d 22:48',  ip: '10.4.21.9',   serial: 'FOC2548RR1B', mac: 'F4:DB:E6:1A:09:42', issue: 'Camera not detected', meeting: null },
    { id: 'd-04', name: 'Focus Room 4',       room: 'Floor 2 · West',   site: 'San Jose HQ', model: 'Room Kit Mini', state: 'online',   fw: '11.21.1.6', fwOld: false, uptime: '9d 14:03',  ip: '10.4.21.27',  serial: 'FOC2550MM8C', mac: 'F4:DB:E6:1A:27:11', issue: null, meeting: null },
    { id: 'd-05', name: 'Lobby Signage',      room: 'Ground · Atrium',  site: 'San Jose HQ', model: 'Board 70',      state: 'online',   fw: '11.21.1.6', fwOld: false, uptime: '61d 09:55', ip: '10.4.20.3',   serial: 'FOC2490SG4D', mac: 'F4:DB:E6:1A:03:55', issue: null, meeting: null },
    { id: 'd-06', name: 'Training Room',      room: 'Floor 1',          site: 'San Jose HQ', model: 'Room Kit Pro',  state: 'critical', fw: '11.21.1.6', fwOld: false, uptime: '—',         ip: '10.4.20.61',  serial: 'FOC2530TR0E', mac: 'F4:DB:E6:1A:61:9A', issue: 'Lost network · last seen 41m', meeting: null },
    { id: 'd-07', name: 'Cromwell Room',      room: 'Floor 4',          site: 'London',      model: 'Room Bar',      state: 'incall',   fw: '11.21.1.6', fwOld: false, uptime: '21d 18:30', ip: '10.8.4.12',   serial: 'LON2531RB7F', mac: 'A0:3C:E6:44:12:08', issue: null, meeting: 'EMEA Standup · 9 people' },
    { id: 'd-08', name: 'Thames Boardroom',   room: 'Floor 8',          site: 'London',      model: 'Board 70',      state: 'online',   fw: '11.21.1.6', fwOld: false, uptime: '44d 02:14', ip: '10.8.8.5',    serial: 'LON2498BR3G', mac: 'A0:3C:E6:44:05:31', issue: null, meeting: null },
    { id: 'd-09', name: 'Camden Huddle',      room: 'Floor 2',          site: 'London',      model: 'Room Kit Mini', state: 'degraded', fw: '11.19.0.3', fwOld: true,  uptime: '12d 07:41', ip: '10.8.2.18',   serial: 'LON2547KM9H', mac: 'A0:3C:E6:44:18:6C', issue: 'Microphone level low', meeting: null },
    { id: 'd-10', name: 'Harbour View',       room: 'Level 14',         site: 'Sydney',      model: 'Room Kit Pro',  state: 'online',   fw: '11.21.1.6', fwOld: false, uptime: '28d 12:09', ip: '10.12.14.7',  serial: 'SYD2532RP5J', mac: 'B8:27:EB:90:07:14', issue: null, meeting: null },
    { id: 'd-11', name: 'Opera Room',         room: 'Level 9',          site: 'Sydney',      model: 'Room Bar',      state: 'offline',  fw: '11.21.1.6', fwOld: false, uptime: '—',         ip: '10.12.9.22',  serial: 'SYD2533RB2K', mac: 'B8:27:EB:90:22:5F', issue: 'Powered off · scheduled', meeting: null },
    { id: 'd-12', name: 'Darling Focus',      room: 'Level 9',          site: 'Sydney',      model: 'Room Kit Mini', state: 'online',   fw: '11.21.1.6', fwOld: false, uptime: '7d 03:38',  ip: '10.12.9.40',  serial: 'SYD2551KM1L', mac: 'B8:27:EB:90:40:A2', issue: null, meeting: null },
    { id: 'd-13', name: 'Congress Hall',      room: 'Floor 1',          site: 'Austin',      model: 'Board 70',      state: 'incall',   fw: '11.21.1.6', fwOld: false, uptime: '53d 21:02', ip: '10.16.1.11',  serial: 'AUS2495BR8M', mac: 'C4:17:FE:33:11:0D', issue: null, meeting: 'All-Hands rehearsal · 38' },
    { id: 'd-14', name: 'Pecan Huddle',       room: 'Floor 3',          site: 'Austin',      model: 'Room Kit Mini', state: 'online',   fw: '11.21.1.6', fwOld: false, uptime: '19d 16:47', ip: '10.16.3.6',   serial: 'AUS2552KM4N', mac: 'C4:17:FE:33:06:88', issue: null, meeting: null },
    { id: 'd-15', name: 'Riverside Briefing', room: 'Floor 6',          site: 'Austin',      model: 'Room Kit Pro',  state: 'degraded', fw: '11.21.1.6', fwOld: false, uptime: '3d 09:12',  ip: '10.16.6.19',  serial: 'AUS2534RP6P', mac: 'C4:17:FE:33:19:41', issue: 'Display HDMI handshake errors', meeting: null },
  ];

  const ACTIVITY_DEMO = [
    { who: 'Priya Anand', action: 'rebooted', target: 'Huddle 2', time: '12m' },
    { who: 'System',      action: 'pushed config to', target: '15 devices', time: '38m' },
    { who: 'Marcus Lee',  action: 'acknowledged alert on', target: 'Camden Huddle', time: '1h' },
    { who: 'Dana Cole',   action: 'scheduled update for', target: 'San Jose HQ', time: '2h' },
    { who: 'System',      action: 'detected new device', target: 'Pecan Huddle', time: '4h' },
  ];

  const STATE_LABEL = { online: 'Online', incall: 'In call', degraded: 'Degraded', critical: 'Critical', offline: 'Offline' };
  const STATE_VAR = {
    online: 'var(--status-online)', incall: 'var(--status-incall)', degraded: 'var(--status-degraded)',
    critical: 'var(--status-critical)', offline: 'var(--status-offline)',
  };

  // ---- store ----
  const store = {
    mode: 'demo',        // 'demo' | 'live'
    status: 'ready',     // 'ready' | 'connecting' | 'error'
    connected: false,
    org: null,           // { id, name }
    me: null,            // { displayName, email }
    devices: DEMO_DEVICES.map((d) => ({ ...d })),
    workspaces: [],
    baseline: '11.21.1.6',
    error: null,
    lastSync: null,      // Date
  };

  const listeners = new Set();
  function emit() { listeners.forEach((fn) => { try { fn(); } catch (e) {} }); }
  function subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); }
  function setState(patch) { Object.assign(store, patch); emit(); }

  function useStore() {
    const [, force] = React.useReducer((x) => x + 1, 0);
    React.useEffect(() => subscribe(force), []);
    return store;
  }

  // ---- RoomOS version verification ----
  function parseVer(str) {
    const m = String(str == null ? '' : str).match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?/);
    if (!m) return null;
    return [1, 2, 3, 4].map((i) => parseInt(m[i] || '0', 10));
  }
  function cmpVer(a, b) {
    const pa = parseVer(a), pb = parseVer(b);
    if (!pa && !pb) return 0; if (!pa) return -1; if (!pb) return 1;
    for (let i = 0; i < 4; i++) { if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1; }
    return 0;
  }
  function cleanVer(str) {
    const p = parseVer(str);
    return p ? p.join('.').replace(/(?:\.0)+$/, '') : (str || '—');
  }
  function roomos(d) { return d.version || d.fw; }

  // Baseline = the latest RoomOS present in the fleet (the update target).
  function computeBaseline(devs) {
    let best = null;
    devs.forEach((d) => { const v = roomos(d); if (v && v !== '—') { if (best === null || cmpVer(v, best) > 0) best = v; } });
    return best ? cleanVer(best) : null;
  }
  function markFw(devs, baseline) {
    return devs.map((d) => ({ ...d, fwOld: baseline ? cmpVer(roomos(d), baseline) < 0 : false }));
  }

  function bldg(name) {
    return (String(name || '').split(/\s*[-\u2013\u2014|\u00b7:]\s*/)[0] || '').trim() || (name || '');
  }

  // Group devices into workspaces (rooms). wsMeta = optional [{id, displayName}] from Webex.
  function buildWorkspaces(devices, wsMeta) {
    const metaMap = {};
    (wsMeta || []).forEach((w) => { if (w && w.id) metaMap[w.id] = w.displayName; });
    const map = new Map();
    devices.forEach((d) => {
      const id = d.workspaceId || ('room::' + (d.site || '') + '::' + (d.room || d.name));
      if (!map.has(id)) {
        const name = d.workspaceName || metaMap[id] || d.room || d.name || t('Unassigned');
        map.set(id, { id, name, building: d.site || bldg(name) || t('Unassigned'), devices: [] });
      }
      map.get(id).devices.push(d);
    });
    return Array.from(map.values()).sort((a, b) => (a.building + '/' + a.name).localeCompare(b.building + '/' + b.name));
  }

  function loadDemo() {
    const dev = DEMO_DEVICES.map((d) => ({ ...d }));
    setState({
      mode: 'demo', status: 'ready', connected: false, org: null, me: null,
      devices: dev, workspaces: buildWorkspaces(dev), baseline: '11.21.1.6',
      error: null, lastSync: new Date(),
    });
  }

  // devices: already mapped by webex.mapDevice
  function setLive({ org, me, devices, workspaces }) {
    const baseline = computeBaseline(devices);
    const withFw = markFw(devices, baseline);
    setState({
      mode: 'live', status: 'ready', connected: true, org: org || null, me: me || null,
      devices: withFw, workspaces: buildWorkspaces(withFw, workspaces), baseline, error: null, lastSync: new Date(),
    });
  }

  // Merge a background poll result into one device, re-deriving in-call & version state.
  function applyLiveStatus(id, s) {
    let touched = false;
    const devs = store.devices.map((d) => {
      if (d.id !== id) return d;
      touched = true;
      const next = { ...d, polledAt: Date.now() };
      if (s.version) next.version = cleanVer(s.version);
      if (s.uptime != null) next.uptimeSec = s.uptime;
      if (s.activeCalls != null) {
        next.activeCalls = s.activeCalls;
        if (d.state === 'online' || d.state === 'incall') next.state = s.activeCalls > 0 ? 'incall' : 'online';
      }
      return next;
    });
    if (!touched) return;
    const baseline = computeBaseline(devs) || store.baseline;
    setState({ devices: markFw(devs, baseline), baseline });
  }

  // RoomOS version distribution + behind-baseline summary.
  function firmwareSummary() {
    const dist = {};
    store.devices.forEach((d) => { const v = cleanVer(roomos(d)) || '—'; dist[v] = (dist[v] || 0) + 1; });
    const versions = Object.keys(dist).sort((a, b) => cmpVer(b, a))
      .map((v) => ({ version: v, count: dist[v], behind: store.baseline ? cmpVer(v, store.baseline) < 0 : false }));
    const behind = store.devices.filter((d) => d.fwOld).length;
    return { baseline: store.baseline, behind, upToDate: store.devices.length - behind, versions };
  }

  function patchDevice(id, patch) {
    setState({ devices: store.devices.map((d) => (d.id === id ? { ...d, ...patch } : d)) });
  }

  // Merge a freshly-fetched (mapped) device over the stored one, re-deriving firmware state.
  function mergeDevice(id, mapped) {
    if (!mapped) return;
    const devs = store.devices.map((d) => {
      if (d.id !== id) return d;
      // keep workspace/site enrichment we computed at connect time
      return { ...d, ...mapped, room: d.room, site: d.site, workspaceId: d.workspaceId, workspaceName: d.workspaceName };
    });
    const baseline = computeBaseline(devs) || store.baseline;
    setState({ devices: markFw(devs, baseline), baseline });
  }

  function counts(devs) {
    const list = devs || store.devices;
    const c = { total: list.length, online: 0, incall: 0, degraded: 0, critical: 0, offline: 0 };
    list.forEach((d) => { if (c[d.state] != null) c[d.state]++; });
    return c;
  }

  function sites() {
    const set = new Set();
    store.devices.forEach((d) => { if (d.site) set.add(d.site); });
    return Array.from(set).sort();
  }

  function relTime(iso) {
    if (!iso) return '—';
    const ts = Date.parse(iso);
    if (isNaN(ts)) return '—';
    const s = Math.max(0, (Date.now() - ts) / 1000);
    if (s < 60) return t('just now');
    const m = s / 60; if (m < 60) return t('{n}m ago', { n: Math.round(m) });
    const h = m / 60; if (h < 24) return t('{n}h ago', { n: Math.round(h) });
    return t('{n}d ago', { n: Math.round(h / 24) });
  }

  function fmtUptime(sec) {
    if (sec == null || isNaN(sec)) return '—';
    sec = Number(sec);
    const d = Math.floor(sec / 86400);
    const h = Math.floor((sec % 86400) / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (d > 0) return d + 'd ' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }

  window.WRF_DATA = {
    SITES, STATE_LABEL, STATE_VAR, ACTIVITY_DEMO,
    store, subscribe, useStore, setState,
    loadDemo, setLive, patchDevice, mergeDevice, buildWorkspaces, applyLiveStatus,
    counts, sites, relTime, fmtUptime, firmwareSummary, cmpVer, cleanVer,
  };

  // Build workspaces for the initial demo fleet.
  store.workspaces = buildWorkspaces(store.devices);
})();
