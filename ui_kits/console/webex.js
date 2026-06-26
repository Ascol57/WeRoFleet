/* WeRoFleet Console — Webex cloud API client (window.WRF_WEBEX)
   Talks to the Webex REST API + cloud xAPI from the browser using a
   personal/integration bearer token. Credentials live only in localStorage. */
(function () {
  const { t } = window.WRF_I18N;
  const CREDS_KEY = 'wrf-webex-creds';
  const DEFAULT_BASE = 'https://webexapis.com/v1';

  // Room-device models eligible for branding (from the deployment CLI).
  const MODELS = [
    'board pro 55', 'board pro 55 g2', 'board pro 75', 'board pro 75 g2',
    'desk series', 'codec eq', 'codec pro', 'codec pro g2',
    'room 70 dual g2', 'room 70 panorama', 'room 70 single g2',
    'room bar', 'room bar pro', 'room panorama', 'room kit',
  ];

  let creds = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(CREDS_KEY)) || {}; } catch (e) { return {}; }
  }
  function persist() {
    try { localStorage.setItem(CREDS_KEY, JSON.stringify(creds)); } catch (e) {}
  }
  function setCreds({ token, orgId, base }) {
    creds = {
      token: (token || '').trim().replace(/^Bearer\s+/i, ''),
      orgId: (orgId || '').trim(),
      base: (base || '').trim().replace(/\/+$/, '') || DEFAULT_BASE,
    };
    persist();
    return creds;
  }
  function clearCreds() { creds = {}; try { localStorage.removeItem(CREDS_KEY); } catch (e) {} }
  function hasCreds() { return !!(creds && creds.token); }
  function getCreds() { return { ...creds, base: creds.base || DEFAULT_BASE }; }

  function err(kind, message, extra) {
    const e = new Error(message || kind); e.kind = kind; Object.assign(e, extra || {}); return e;
  }

  async function req(path, opts) {
    opts = opts || {};
    if (!creds.token) throw err('auth', t('No token set'));
    const base = creds.base || DEFAULT_BASE;
    const url = base + path;
    const priority = opts.priority || 'normal';

    const exec = async () => {
      let res;
      try {
        res = await fetch(url, {
          method: opts.method || 'GET',
          headers: Object.assign({
            Authorization: 'Bearer ' + creds.token,
            'Content-Type': 'application/json',
          }, opts.headers || {}),
          body: opts.body || undefined,
        });
      } catch (e) {
        // Browser network/CORS failures surface here as an opaque TypeError.
        throw err('network', t('Network or CORS error — the browser could not reach {base}. A CORS proxy may be required.', { base: base }));
      }
      if (res.status === 401) throw err('auth', t('Unauthorized — token is invalid or expired.'));
      if (res.status === 403) throw err('scope', t('Forbidden — the token is missing a required scope.'));
      if (res.status === 429) throw err('rate', t('Rate limited by Webex — wait a moment and retry.'), { retryAfter: res.headers.get('Retry-After') });
      if (!res.ok) {
        let body = ''; try { body = await res.text(); } catch (e) {}
        // Surface Webex's own explanation (message / errors[].description / trackingId).
        let detail = '';
        try {
          const j = JSON.parse(body);
          detail = j.message || (j.errors && j.errors[0] && (j.errors[0].description || j.errors[0].message)) || '';
          if (j.trackingId) detail += (detail ? ' ' : '') + '[' + j.trackingId + ']';
        } catch (e) { detail = (body || '').slice(0, 160); }
        throw err('http', 'Webex ' + res.status + (detail ? ' — ' + detail : ''), { status: res.status, body });
      }
      if (res.status === 204) return null;
      const txt = await res.text();
      return txt ? JSON.parse(txt) : null;
    };

    // All Webex traffic is throttled + prioritized by the RequestManager.
    return window.WRF_RM ? window.WRF_RM.schedule(exec, priority) : exec();
  }

  // ---- mapping ----
  function modelName(p) { return (p || '').replace(/^Cisco\s+/i, '').trim() || '—'; }

  // Is this device one of the branding-eligible room models?
  function isEligible(d) {
    const p = String((d && d.model) || '').toLowerCase();
    return MODELS.some((m) => p.includes(m));
  }
  function eligible(devices) { return (devices || []).filter(isEligible); }

  function stateFor(raw) {
    const cs = String(raw.connectionStatus || '').toLowerCase();
    if (cs === 'connected') return 'online';
    if (cs === 'connected_with_issues') return 'degraded';
    if (cs.indexOf('disconnected') === 0 || cs.indexOf('offline') === 0) {
      return (raw.errorCodes && raw.errorCodes.length) ? 'critical' : 'offline';
    }
    return 'offline';
  }

  function errText(raw) {
    if (!raw.errorCodes || !raw.errorCodes.length) return null;
    return raw.errorCodes.map((e) => (typeof e === 'string' ? e : (e.description || e.id || ''))).filter(Boolean).join(', ');
  }

  function mapDevice(raw) {
    const st = stateFor(raw);
    return {
      id: raw.id,
      name: raw.displayName || raw.product || raw.id,
      model: modelName(raw.product),
      type: raw.type || '',
      site: (raw.tags && raw.tags[0]) || '',
      room: '',
      state: st,
      connectionStatus: raw.connectionStatus || '',
      fw: raw.software || '—',
      fwOld: false,
      uptime: '—',
      ip: raw.ip || '—',
      serial: raw.serial || '—',
      mac: raw.mac || '—',
      workspaceId: raw.workspaceId || null,
      errorCodes: raw.errorCodes || [],
      issue: errText(raw) || (st === 'offline' ? 'Disconnected' : null),
      lastSeen: raw.lastSeen || null,
      firstSeen: raw.firstSeen || null,
      meeting: null,
      _raw: raw,
    };
  }

  // ---- calls ----
  async function me() {
    const p = await req('/people/me', { priority: 'high' });
    return { displayName: p.displayName || p.nickName || t('You'), email: (p.emails && p.emails[0]) || '', orgId: p.orgId };
  }

  async function orgInfo(orgId) {
    if (!orgId) return null;
    try {
      const o = await req('/organizations/' + encodeURIComponent(orgId), { priority: 'high' });
      return { id: o.id, name: o.displayName || orgId };
    } catch (e) { return { id: orgId, name: orgId }; }
  }

  async function listDevices(orgId, priority) {
    const q = new URLSearchParams();
    q.set('max', '1000');
    if (orgId) q.set('orgId', orgId);
    const data = await req('/devices?' + q.toString(), { priority: priority || 'high' });
    const items = (data && data.items) || [];
    return items.map(mapDevice);
  }

  // Re-fetch a single device (for live status refresh after an action). High priority.
  async function getDevice(id, priority) {
    const raw = await req('/devices/' + encodeURIComponent(id), { priority: priority || 'high' });
    return mapDevice(raw);
  }

  function building(name) {
    return (String(name || '').split(/\s*[-\u2013\u2014|\u00b7:]\s*/)[0] || '').trim() || (name || '');
  }

  async function listWorkspaces(orgId) {
    const q = new URLSearchParams();
    q.set('max', '500');
    if (orgId) q.set('orgId', orgId);
    const data = await req('/workspaces?' + q.toString(), { priority: 'high' });
    return (data && data.items) || [];
  }

  async function listDevicesByWorkspace(workspaceId) {
    const data = await req('/devices?workspaceId=' + encodeURIComponent(workspaceId));
    return ((data && data.items) || []).map(mapDevice);
  }

  // Full connect flow: validate token, resolve org, fetch devices, join workspace names.
  async function connect() {
    const who = await me();
    // `orgId` on /devices & /workspaces is ONLY allowed for partner/cross-org tokens.
    // A normal org-admin token passing its own orgId gets a 400 — so only send it when
    // the user explicitly typed one, and fall back to no-orgId on a 400.
    const explicitOrg = (creds.orgId || '').trim();
    const displayOrgId = explicitOrg || who.orgId || '';

    const devicesP = listDevices(explicitOrg).catch((e) => {
      if (e && e.status === 400 && explicitOrg) return listDevices('');
      throw e;
    });
    const workspacesP = listWorkspaces(explicitOrg)
      .catch((e) => (e && e.status === 400 && explicitOrg) ? listWorkspaces('') : [])
      .catch(() => []);

    const [org, devices, workspaces] = await Promise.all([
      orgInfo(displayOrgId),
      devicesP,
      workspacesP,
    ]);
    const wsMap = {};
    workspaces.forEach((w) => { wsMap[w.id] = w; });
    devices.forEach((d) => {
      const w = d.workspaceId && wsMap[d.workspaceId];
      if (w && w.displayName) {
        d.workspaceName = w.displayName;
        d.room = w.displayName;
        d.site = building(w.displayName);
      }
    });
    return { me: who, org, devices, workspaces };
  }

  // cloud xAPI status — names like 'SystemUnit.Uptime'
  async function xStatus(deviceId, names, priority) {
    const q = new URLSearchParams();
    q.set('deviceId', deviceId);
    (Array.isArray(names) ? names : [names]).forEach((n) => q.append('name', n));
    return req('/xapi/status?' + q.toString(), { priority: priority || 'normal' });
  }

  // cloud xAPI command — name like 'SystemUnit.Boot'
  async function xCommand(deviceId, name, args) {
    return req('/xapi/command/' + name, {
      method: 'POST', priority: 'high',
      body: JSON.stringify({ deviceId: deviceId, arguments: args || {} }),
    });
  }

  function reboot(deviceId) { return xCommand(deviceId, 'SystemUnit.Boot', { Action: 'Restart' }); }

  // ---- wallpaper bundles ----
  // Normalize a WallpaperBundle.List result into [{ name, setupTypes }], in order.
  // Cloud xAPI returns { result: { WallpaperBundle: [ { Name, SetupType, ... }, ... ] } };
  // be lenient about casing and single-vs-array shapes. The bundle is keyed by its
  // Name — that is what WallpaperBundle.Set expects.
  function parseWallpaperBundles(r) {
    const result = (r && r.result) || r || {};
    let list = result.WallpaperBundle || result.WallpaperBundles || [];
    if (!Array.isArray(list)) list = list ? [list] : [];
    return list
      .map((b) => {
        let st = b.SetupType != null ? b.SetupType : (b.setupType != null ? b.setupType : []);
        if (!Array.isArray(st)) st = st ? [st] : [];
        return { name: b.Name || b.name || '', setupTypes: st };
      })
      .filter((b) => b.name !== '');
  }

  // List the wallpaper bundles available on a device, in device order.
  async function listWallpaperBundles(deviceId) {
    const r = await xCommand(deviceId, 'UserInterface.WallpaperBundle.List', {});
    return parseWallpaperBundles(r);
  }

  // Activate a wallpaper bundle by its Name (from listWallpaperBundles).
  function setWallpaperBundle(deviceId, name) {
    return xCommand(deviceId, 'UserInterface.WallpaperBundle.Set', { Name: name });
  }

  // ---- branding & configuration (deployment) ----
  // Upload a branding image. type e.g. 'HalfwakeBackground' | 'Background'. base64 = raw base64 (no data: prefix).
  function uploadBranding(deviceId, type, base64) {
    return req('/xapi/command/UserInterface.Branding.Upload', {
      method: 'POST', priority: 'high',
      body: JSON.stringify({ deviceId: deviceId, arguments: { Type: type }, body: base64 }),
    });
  }

  // Remove a previously-uploaded branding image of the given type.
  function deleteBranding(deviceId, type) {
    return req('/xapi/command/UserInterface.Branding.Delete', {
      method: 'POST', priority: 'high',
      body: JSON.stringify({ deviceId: deviceId, arguments: { Type: type } }),
    });
  }

  // PATCH device configurations with an array of JSON-patch ops.
  function patchConfig(deviceId, ops) {
    return req('/deviceConfigurations?deviceId=' + encodeURIComponent(deviceId), {
      method: 'PATCH', priority: 'high',
      headers: { 'Content-Type': 'application/json-patch+json' },  // Webex requires this exact type
      body: JSON.stringify(ops),
    });
  }
  function setCustomMessage(deviceId, msg) {
    return patchConfig(deviceId, [{ op: 'replace', path: 'UserInterface.CustomMessage/sources/configured/value', value: msg }]);
  }
  // key: JoinWebex | JoinMicrosoftTeamsDirectGuestJoin | JoinGoogleMeet | JoinZoom ; value: 'Auto' | 'Hidden'
  function setCallFeature(deviceId, key, value) {
    return patchConfig(deviceId, [{ op: 'replace', path: 'UserInterface.Features.Call.' + key + '/sources/configured/value', value: value }]);
  }

  // Generic UI config value setter, e.g. configPath 'UserInterface.HomeScreen.Dashboard', value 'On'|'Off'.
  function setConfigValue(deviceId, configPath, value) {
    return patchConfig(deviceId, [{ op: 'replace', path: configPath + '/sources/configured/value', value: value }]);
  }

  const CALL_FEATURE_KEYS = ['JoinWebex', 'JoinMicrosoftTeamsDirectGuestJoin', 'JoinGoogleMeet', 'JoinZoom'];

  // Read the CURRENT applied configuration of a device (not what we'd push).
  // GET /v1/deviceConfigurations?deviceId= returns { items: { 'Key': { value, source, ... } } }.
  async function getConfig(deviceId, priority) {
    const data = await req('/deviceConfigurations?deviceId=' + encodeURIComponent(deviceId), { priority: priority || 'normal' });
    const items = (data && data.items) || {};
    const val = (key) => {
      const it = items[key];
      if (!it) return undefined;
      return it.value !== undefined ? it.value : (it.source && it.source.value);
    };
    const call = {};
    CALL_FEATURE_KEYS.forEach((k) => { const v = val('UserInterface.Features.Call.' + k); if (v !== undefined) call[k] = v; });
    return {
      customMessage: val('UserInterface.CustomMessage'),
      call,
      wallpaperOverlay: val('UserInterface.CustomWallpaperOverlay'),
      dashboard: val('UserInterface.HomeScreen.Dashboard'),
      raw: items,
    };
  }

  // Pull a few live status values for the detail drawer.
  async function deviceDetail(deviceId, priority) {
    const r = await xStatus(deviceId, ['SystemUnit.Uptime', 'SystemUnit.State.NumberOfActiveCalls', 'Peripherals.ConnectedDevice'], priority || 'normal');
    const result = (r && r.result) || {};
    const su = result.SystemUnit || {};
    const uptime = su.Uptime != null ? Number(su.Uptime) : null;
    const activeCalls = (su.State && su.State.NumberOfActiveCalls != null) ? Number(su.State.NumberOfActiveCalls) : null;
    let peripherals = (result.Peripherals && result.Peripherals.ConnectedDevice) || [];
    if (!Array.isArray(peripherals)) peripherals = [peripherals];
    return { uptime, activeCalls, peripherals, raw: result };
  }

  // Lightweight per-device status for the background fleet poll (low priority).
  // Returns { activeCalls, version, uptime }.
  async function liveStatus(deviceId, priority) {
    const r = await xStatus(deviceId, ['SystemUnit.State.NumberOfActiveCalls', 'SystemUnit.Software.Version', 'SystemUnit.Uptime'], priority || 'low');
    const result = (r && r.result) || {};
    const su = result.SystemUnit || {};
    return {
      activeCalls: (su.State && su.State.NumberOfActiveCalls != null) ? Number(su.State.NumberOfActiveCalls) : null,
      version: (su.Software && su.Software.Version) ? String(su.Software.Version) : null,
      uptime: su.Uptime != null ? Number(su.Uptime) : null,
    };
  }

  window.WRF_WEBEX = {
    DEFAULT_BASE, MODELS,
    setCreds, clearCreds, hasCreds, getCreds,
    connect, me, orgInfo, listDevices, getDevice, listDevicesByWorkspace, listWorkspaces, mapDevice, building,
    isEligible, eligible,
    xStatus, xCommand, reboot, deviceDetail, liveStatus,
    listWallpaperBundles, setWallpaperBundle,
    uploadBranding, deleteBranding, patchConfig, setCustomMessage, setCallFeature, setConfigValue, getConfig, CALL_FEATURE_KEYS,
  };
})();
