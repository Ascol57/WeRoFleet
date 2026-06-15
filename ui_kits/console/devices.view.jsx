/* WeRoFleet Console — Devices table + Device detail drawer */
(function () {
  const { useState } = React;
  const { Card, StatusBadge, Badge, Button, IconButton, Input, Select, Checkbox, Tabs, Avatar, Tooltip, ProgressBar, Banner } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  const WX = window.WRF_WEBEX;
  const PageHead = window.WRF_PageHead;
  const { t, tState } = window.WRF_I18N;

  const CALL_LABELS = {
    JoinWebex: 'Webex',
    JoinMicrosoftTeamsDirectGuestJoin: 'Microsoft Teams',
    JoinGoogleMeet: 'Google Meet',
    JoinZoom: 'Zoom',
  };

  function notify(msg, tone) { if (window.WRF_notify) window.WRF_notify(msg, tone); }

  // Fresh live check of active calls just before a reboot. Falls back to cached state.
  async function liveInCall(d) {
    if (DATA.store.mode !== 'live') return d.state === 'incall';
    try {
      const s = await WX.liveStatus(d.id, 'high');
      if (s && s.activeCalls != null) return s.activeCalls > 0;
    } catch (e) { /* fall back to cached state */ }
    return d.state === 'incall';
  }

  // Confirm a single-device reboot, warning hard if it's currently in a call.
  async function confirmReboot(d) {
    if (await liveInCall(d)) {
      return window.confirm(t('⚠\uFE0F {name} is currently IN A CALL. Rebooting will disconnect everyone on it.\n\nReboot anyway?', { name: d.name }));
    }
    return window.confirm(t('Reboot {name}? It will briefly go offline.', { name: d.name }));
  }

  async function doReboot(d) {
    if (DATA.store.mode !== 'live') { notify(t('Reboot sent to {name} (demo)', { name: d.name }), 'neutral'); return; }
    if (!(await confirmReboot(d))) return;
    notify(t('Rebooting {name}…', { name: d.name }), 'neutral');
    WX.reboot(d.id).then(() => notify(t('{name} is rebooting', { name: d.name }), 'success'))
      .catch((e) => notify(t('Reboot failed: {message}', { message: e.message }), 'critical'));
  }

  function Devices({ onOpenDevice }) {
    const store = DATA.useStore();
    const [q, setQ] = useState('');
    const [site, setSite] = useState('');
    const [tab, setTab] = useState('all');
    const [sel, setSel] = useState({});

    const all = store.devices;
    const attentionN = all.filter((d) => d.state === 'critical' || d.state === 'degraded').length;
    const incallN = all.filter((d) => d.state === 'incall').length;

    let rows = all;
    if (tab === 'attention') rows = rows.filter((d) => d.state === 'critical' || d.state === 'degraded');
    if (tab === 'incall') rows = rows.filter((d) => d.state === 'incall');
    if (site) rows = rows.filter((d) => d.site === site);
    if (q) rows = rows.filter((d) => (d.name + d.serial + (d.room || '') + d.model).toLowerCase().includes(q.toLowerCase()));

    const selCount = Object.values(sel).filter(Boolean).length;
    const allChecked = rows.length > 0 && rows.every((d) => sel[d.id]);
    const someChecked = rows.some((d) => sel[d.id]) && !allChecked;
    const toggleAll = () => {
      const next = { ...sel };
      rows.forEach((d) => { next[d.id] = !allChecked; });
      setSel(next);
    };
    const bulkReboot = async () => {
      const targets = all.filter((d) => sel[d.id]);
      if (store.mode !== 'live') { notify(t('Reboot sent to {count} devices (demo)', { count: targets.length }), 'neutral'); setSel({}); return; }
      // Fresh in-call check across the selection before doing anything.
      notify(t('Checking call status…'), 'neutral');
      const checks = await Promise.all(targets.map(async (d) => ({ d, inCall: await liveInCall(d) })));
      const busy = checks.filter((c) => c.inCall).map((c) => c.d);
      let msg = t('Reboot {count} device(s)? They will briefly go offline.', { count: targets.length });
      if (busy.length) {
        const names = busy.slice(0, 3).map((d) => d.name).join(', ') + (busy.length > 3 ? t(', +{count} more', { count: busy.length - 3 }) : '');
        msg = t('⚠\uFE0F {busy} of {total} selected device(s) are IN A CALL ({names}). Rebooting will disconnect them.\n\nReboot all anyway?', { busy: busy.length, total: targets.length, names });
      }
      if (!window.confirm(msg)) return;
      notify(t('Rebooting {count} devices…', { count: targets.length }), 'neutral');
      Promise.allSettled(targets.map((d) => WX.reboot(d.id))).then((res) => {
        const ok = res.filter((r) => r.status === 'fulfilled').length;
        notify(t('{ok}/{total} reboots sent', { ok, total: targets.length }), ok === targets.length ? 'success' : 'warning');
        setSel({});
      });
    };

    const siteOpts = ['', ...DATA.sites()].map((s) => ({ value: s, label: s || t('All sites') }));

    return (
      <div>
        <PageHead
          title={t('Devices')}
          sub={`${all.length} ${all.length === 1 ? t('device') : t('devices')}${store.mode === 'live' ? '' : ' · demo'}`}
          actions={<>
            <Button variant="secondary" leadingIcon={I('sliders-horizontal')}>{t('Columns')}</Button>
            <Button variant="primary" leadingIcon={I('plus')}>{t('Add device')}</Button>
          </>}
        />

        <div className="wrf-toolbar">
          <Tabs value={tab} onChange={setTab} tabs={[
            { value: 'all', label: t('All'), count: all.length },
            { value: 'attention', label: t('Needs attention'), icon: I('alert-triangle'), count: attentionN },
            { value: 'incall', label: t('In call'), count: incallN },
          ]} />
          <div className="wrf-toolbar-right">
            <div style={{ width: 220 }}><Input size="sm" leadingIcon={I('search')} placeholder={t('Search devices…')} value={q} onChange={(e) => setQ(e.target.value)} /></div>
            <div style={{ width: 170 }}><Select size="sm" value={site} onChange={(e) => setSite(e.target.value)} options={siteOpts} /></div>
          </div>
        </div>

        {selCount > 0 && (
          <div className="wrf-bulkbar">
            <span className="wrf-bulk-count">{t('{count} selected', { count: selCount })}</span>
            <div className="wrf-bulk-actions">
              <Button size="sm" variant="secondary" leadingIcon={I('rotate-cw')} onClick={bulkReboot}>{t('Reboot')}</Button>
              <Button size="sm" variant="secondary" leadingIcon={I('image')}>{t('Branding…')}</Button>
              <Button size="sm" variant="ghost" leadingIcon={I('tag')}>{t('Tag')}</Button>
            </div>
            <button className="wrf-bulk-clear" onClick={() => setSel({})}>{t('Clear')}</button>
          </div>
        )}

        {rows.length === 0 ? (
          <Card>
            <div className="wrf-empty" style={{ padding: '40px 12px' }}>
              <div className="wrf-empty-ic">{I('monitor-off')}</div>
              <div className="wrf-empty-title">{t('No matching devices')}</div>
              <div className="wrf-empty-sub">{all.length === 0 ? t('No devices in this org yet — or none returned by the Devices API.') : t('Try a different filter or search.')}</div>
            </div>
          </Card>
        ) : (
          <div className="wrf-table-wrap">
            <table className="wrf-table">
              <thead>
                <tr>
                  <th className="wrf-th-check"><Checkbox indeterminate={someChecked} checked={allChecked} onChange={toggleAll} aria-label={t('Select all')} /></th>
                  <th>{t('Device')}</th>
                  <th>{t('Status')}</th>
                  <th>{t('Site · Room')}</th>
                  <th>{t('Model')}</th>
                  <th>{t('Firmware')}</th>
                  <th className="wrf-th-act"></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((d) => (
                  <tr key={d.id} className="wrf-trow" onClick={() => onOpenDevice(d.id)}>
                    <td className="wrf-td-check" onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={!!sel[d.id]} onChange={() => setSel({ ...sel, [d.id]: !sel[d.id] })} aria-label={t('Select {name}', { name: d.name })} />
                    </td>
                    <td>
                      <div className="wrf-cell-device">
                        <Avatar kind="device" name={d.name} size="sm" />
                        <div className="wrf-cell-device-main">
                          <span className="wrf-cell-device-name">{d.name}</span>
                          <span className="wrf-cell-device-serial">{d.serial}</span>
                        </div>
                      </div>
                    </td>
                    <td><StatusBadge state={d.state} label={tState(d.state)} /></td>
                    <td><div className="wrf-cell-2"><span>{d.site || '—'}</span>{d.room && d.room !== d.site && <span className="wrf-cell-sub">{d.room}</span>}</div></td>
                    <td><span className="wrf-cell-model">{d.model}</span></td>
                    <td><span className="wrf-cell-fw">{d.fw}{d.fwOld && <Badge tone="degraded" outline>{t('old')}</Badge>}</span></td>
                    <td className="wrf-td-act" onClick={(e) => e.stopPropagation()}>
                      <div className="wrf-act-wrap">
                        <Tooltip label={t('Reboot')} side="left"><IconButton size="sm" variant="ghost" icon={I('rotate-cw')} label={t('Reboot')} onClick={() => doReboot(d)} /></Tooltip>
                        <IconButton size="sm" variant="ghost" icon={I('more-vertical')} label={t('More')} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  function Row({ k, v, mono }) {
    return (
      <div className="wrf-dd-row">
        <span className="wrf-dd-k">{k}</span>
        <span className={'wrf-dd-v' + (mono ? ' mono' : '')}>{v}</span>
      </div>
    );
  }

  function DeviceDrawer({ id, onClose }) {
    const store = DATA.useStore();
    const [tab, setTab] = useState('overview');
    const [det, setDet] = useState(null);
    const [detBusy, setDetBusy] = useState(false);
    const [detErr, setDetErr] = useState(null);
    const [cfg, setCfg] = useState(null);
    const [cfgBusy, setCfgBusy] = useState(false);
    const [cfgErr, setCfgErr] = useState(null);
    const [rebooting, setRebooting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showBranding, setShowBranding] = useState(false);
    const d = store.devices.find((x) => x.id === id);
    const live = store.mode === 'live';

    function queryLive() {
      setDetBusy(true); setDetErr(null);
      WX.deviceDetail(d.id, 'normal').then(setDet).catch((e) => setDetErr(e.message)).finally(() => setDetBusy(false));
    }
    function queryConfig() {
      setCfgBusy(true); setCfgErr(null);
      WX.getConfig(d.id, 'normal').then(setCfg).catch((e) => setCfgErr(e.message)).finally(() => setCfgBusy(false));
    }

    // Re-fetch this device's connection status (Devices API) and live xAPI detail.
    function refreshStatus() {
      if (!live) { notify(t('Connect Webex to refresh live status'), 'neutral'); return; }
      setRefreshing(true);
      Promise.resolve(WX.getDevice(d.id, 'high'))
        .then((m) => { DATA.mergeDevice(d.id, m); })
        .catch((e) => notify(t('Status refresh failed: {message}', { message: e.message }), 'critical'))
        .finally(() => setRefreshing(false));
      queryLive();
    }

    async function reboot() {
      if (!live) { notify(t('Reboot sent to {name} (demo)', { name: d.name }), 'neutral'); return; }
      setRebooting(true);
      const ok = await confirmReboot(d);
      if (!ok) { setRebooting(false); return; }
      notify(t('Rebooting {name}…', { name: d.name }), 'neutral');
      WX.reboot(d.id)
        .then(() => {
          notify(t('{name} is rebooting', { name: d.name }), 'success');
          DATA.patchDevice(d.id, { state: 'offline', issue: 'Rebooting…' });
          // Poll back to life: check status after the device has time to restart.
          setTimeout(() => WX.getDevice(d.id, 'low').then((m) => DATA.mergeDevice(d.id, m)).catch(() => {}), 45000);
        })
        .catch((e) => notify(t('Reboot failed: {message}', { message: e.message }), 'critical'))
        .finally(() => setRebooting(false));
    }

    // Auto-load live status + applied config when the drawer opens (live only).
    React.useEffect(() => {
      if (!live || !d) return;
      queryLive();
      queryConfig();
      // eslint-disable-next-line
    }, [id, live]);

    if (!d) return null;

    return (
      <div className="wrf-drawer-scrim" onClick={onClose}>
        <aside className="wrf-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="wrf-drawer-head">
            <div className="wrf-drawer-title">
              <Avatar kind="device" name={d.name} size="lg" statusColor={DATA.STATE_VAR[d.state]} />
              <div>
                <h2 className="wrf-drawer-name">{d.name}</h2>
                <div className="wrf-drawer-meta">{[d.model, d.room || d.site].filter(Boolean).join(' · ')}</div>
              </div>
            </div>
            <IconButton variant="ghost" icon={I('x')} label={t('Close')} onClick={onClose} />
          </div>

          <div className="wrf-drawer-statusrow">
            <StatusBadge state={d.state} label={tState(d.state)} />
            {d.fwOld && <Badge tone="degraded" outline>{t('Firmware behind')}</Badge>}
            <span className="wrf-drawer-seen">{live ? t('Last seen {time}', { time: DATA.relTime(d.lastSeen) }) : (d.state === 'critical' || d.state === 'offline' ? t(d.issue) : t('Last seen just now'))}</span>
            {live && (
              <Tooltip label={t('Refresh status')} side="left">
                <IconButton size="sm" variant="ghost" icon={refreshing ? I('loader-2', { className: 'wrf-spin' }) : I('refresh-cw')} label={t('Refresh status')} onClick={refreshStatus} disabled={refreshing} />
              </Tooltip>
            )}
          </div>

          <div className="wrf-drawer-actions">
            <Button variant="primary" size="sm" leadingIcon={rebooting ? I('loader-2', { className: 'wrf-spin' }) : I('rotate-cw')} onClick={reboot} disabled={rebooting}>{rebooting ? t('Rebooting…') : t('Reboot')}</Button>
            <Button variant="secondary" size="sm" leadingIcon={I('image')} onClick={() => setShowBranding(true)}>{t('Branding')}</Button>
            {live && <Button variant="secondary" size="sm" leadingIcon={detBusy ? I('loader-2', { className: 'wrf-spin' }) : I('activity')} onClick={queryLive} disabled={detBusy}>{detBusy ? t('Querying…') : t('Query xAPI')}</Button>}
            <IconButton variant="outline" size="sm" icon={I('more-horizontal')} label={t('More')} />
          </div>

          <div className="wrf-drawer-tabs">
            <Tabs value={tab} onChange={setTab} tabs={[
              { value: 'overview', label: t('Overview') },
              { value: 'config', label: t('Configuration') },
              { value: 'peripherals', label: t('Peripherals') },
              { value: 'history', label: t('History') },
            ]} />
          </div>

          <div className="wrf-drawer-body">
            {tab === 'overview' && <>
              {d.issue && d.state !== 'incall' && <Banner tone={d.state === 'critical' ? 'critical' : 'warning'} title={t(d.issue)} />}
              {det && det.activeCalls > 0 && <Banner tone="info" title={t('In a call now · {count} active', { count: det.activeCalls })} />}
              {detErr && <Banner tone="critical" title={t('xAPI query failed')}>{detErr}</Banner>}
              <Card title={t('Identity')}>
                <Row k={t('Serial')} v={d.serial} mono />
                <Row k={t('IP address')} v={d.ip} mono />
                <Row k={t('MAC')} v={d.mac} mono />
                <Row k={t('Software')} v={d.fw} mono />
                <Row k={t('Uptime')} v={det && det.uptime != null ? DATA.fmtUptime(det.uptime) : (detBusy ? t('Loading…') : (live ? '—' : d.uptime))} mono />
                {live && d.workspaceName && <Row k={t('Workspace')} v={d.workspaceName} />}
              </Card>
              {!live && (
                <Card title={t('Health')} subtitle={t('Sample data')}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <ProgressBar label={t('CPU')} value={d.state === 'critical' ? 0 : 34} showValue tone="online" />
                    <ProgressBar label={t('Memory')} value={d.state === 'critical' ? 0 : 61} showValue tone="online" />
                    <ProgressBar label={t('Storage')} value={d.name === 'Boardroom A' ? 88 : 47} showValue tone={d.name === 'Boardroom A' ? 'degraded' : 'online'} />
                  </div>
                </Card>
              )}
            </>}
            {tab === 'config' && (
              <Card title={t('Applied configuration')}
                subtitle={live ? t('Live from deviceConfigurations') : t('Connect Webex to read live config')}
                action={live ? <Button size="sm" variant="ghost" leadingIcon={cfgBusy ? I('loader-2', { className: 'wrf-spin' }) : I('refresh-cw')} onClick={queryConfig} disabled={cfgBusy}>{t('Refresh')}</Button> : null}>
                {!live ? (
                  <div className="wrf-empty" style={{ padding: '28px 8px' }}>
                    <div className="wrf-empty-ic">{I('plug')}</div>
                    <div className="wrf-empty-sub">{t('The current CustomMessage and call-button visibility are read from the device once you connect a Webex org.')}</div>
                  </div>
                ) : cfgErr ? (
                  <Banner tone="critical" title={t("Couldn't read configuration")}>{cfgErr}</Banner>
                ) : !cfg ? (
                  <div className="wrf-empty" style={{ padding: '28px 8px' }}>
                    <div className="wrf-empty-ic">{I('loader-2', { className: 'wrf-spin' })}</div>
                    <div className="wrf-empty-sub">{t('Reading device configuration…')}</div>
                  </div>
                ) : <>
                  <Row k={t('Custom message')} v={cfg.customMessage != null && cfg.customMessage !== '' ? cfg.customMessage : t('— (not set)')} />
                  <div className="wrf-cfg-divider" />
                  <div className="wrf-cfg-callhead">{t('Call buttons')}</div>
                  {WX.CALL_FEATURE_KEYS.map((k) => (
                    <div key={k} className="wrf-dd-row">
                      <span className="wrf-dd-k">{CALL_LABELS[k]}</span>
                      <span className="wrf-dd-v">
                        {cfg.call[k] != null
                          ? <Badge tone={cfg.call[k] === 'Auto' ? 'online' : 'neutral'} outline>{cfg.call[k]}</Badge>
                          : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}
                      </span>
                    </div>
                  ))}
                  <div className="wrf-cfg-divider" />
                  <div className="wrf-cfg-callhead">{t('Interface')}</div>
                  <div className="wrf-dd-row">
                    <span className="wrf-dd-k">{t('Custom wallpaper overlay')}</span>
                    <span className="wrf-dd-v">{cfg.wallpaperOverlay != null ? <Badge tone={cfg.wallpaperOverlay === 'On' ? 'online' : 'neutral'} outline>{cfg.wallpaperOverlay}</Badge> : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}</span>
                  </div>
                  <div className="wrf-dd-row">
                    <span className="wrf-dd-k">{t('Home screen dashboard')}</span>
                    <span className="wrf-dd-v">{cfg.dashboard != null ? <Badge tone={cfg.dashboard === 'On' ? 'online' : 'neutral'} outline>{cfg.dashboard}</Badge> : <span style={{ color: 'var(--text-tertiary)' }}>—</span>}</span>
                  </div>
                </>}
              </Card>
            )}
              <Card title={t('Connected peripherals')}>
                {live ? (
                  det ? (
                    det.peripherals && det.peripherals.length ? (
                      <div className="wrf-periph">
                        {det.peripherals.map((p, i) => (
                          <div key={i} className="wrf-periph-row">
                            <span className="wrf-periph-ic">{I(periphIcon(p))}</span>
                            <div className="wrf-periph-main"><b>{p.Name || p.Type || t('Device')}</b><span>{[p.Type, p.SoftwareInfo].filter(Boolean).join(' · ') || '—'}</span></div>
                            <StatusBadge state={String(p.Status).toLowerCase() === 'connected' ? 'online' : 'degraded'} plain />
                          </div>
                        ))}
                      </div>
                    ) : <div className="wrf-empty" style={{ padding: '24px 8px' }}><div className="wrf-empty-sub">{t('No peripherals reported.')}</div></div>
                  ) : (
                    <div className="wrf-empty" style={{ padding: '28px 8px' }}>
                      <div className="wrf-empty-ic">{I('plug')}</div>
                      <div className="wrf-empty-sub">{t('Run an xAPI query to load live peripherals.')}</div>
                      <Button size="sm" variant="secondary" onClick={queryLive} disabled={detBusy} leadingIcon={detBusy ? I('loader-2', { className: 'wrf-spin' }) : I('activity')}>{t('Query device')}</Button>
                    </div>
                  )
                ) : (
                  <div className="wrf-periph">
                    <div className="wrf-periph-row"><span className="wrf-periph-ic">{I('camera')}</span><div className="wrf-periph-main"><b>Quad Camera</b><span>{t('Firmware 1.0.6 · Healthy')}</span></div><StatusBadge state={d.state === 'degraded' ? 'degraded' : 'online'} plain /></div>
                    <div className="wrf-periph-row"><span className="wrf-periph-ic">{I('mic')}</span><div className="wrf-periph-main"><b>Table Microphone ×2</b><span>{t('Healthy')}</span></div><StatusBadge state="online" plain /></div>
                    <div className="wrf-periph-row"><span className="wrf-periph-ic">{I('tablet')}</span><div className="wrf-periph-main"><b>Touch 10 Controller</b><span>{t('Paired')}</span></div><StatusBadge state="online" plain /></div>
                    <div className="wrf-periph-row"><span className="wrf-periph-ic">{I('monitor')}</span><div className="wrf-periph-main"><b>Display · HDMI 1</b><span>{d.name === 'Riverside Briefing' ? t('Handshake errors') : '3840×2160 · 60Hz'}</span></div><StatusBadge state={d.name === 'Riverside Briefing' ? 'degraded' : 'online'} plain /></div>
                  </div>
                )}
              </Card>
            )}
            {tab === 'history' && (
              <Card title={t('Recent events')}>
                {live ? (
                  <div className="wrf-empty" style={{ padding: '24px 8px' }}><div className="wrf-empty-sub">{t("Per-device history isn't available from the Devices API.")}</div></div>
                ) : (
                  <div className="wrf-timeline">
                    {[['Rebooted by Priya Anand', '12m ago', 'rotate-cw'], ['Joined call · Q3 Planning', '38m ago', 'video'], ['Firmware check passed', '2h ago', 'check-circle-2'], ['Config pushed', '1d ago', 'settings'], ['Came online', '14d ago', 'power']].map(([ev, time, ic], i) => (
                      <div key={i} className="wrf-tl-row"><span className="wrf-tl-ic">{I(ic)}</span><div className="wrf-tl-main"><span>{t(ev)}</span><span className="wrf-tl-time">{time}</span></div></div>
                    ))}
                  </div>
                )}
              </Card>
            )}
          </div>
          {showBranding && window.WRF_BrandingModal &&
            React.createElement(window.WRF_BrandingModal, {
              device: d, live, currentCfg: cfg,
              onClose: () => setShowBranding(false),
              onApplied: () => { queryConfig(); },
            })}
        </aside>
      </div>
    );
  }

  function periphIcon(p) {
    const t = String(p.Type || p.Name || '').toLowerCase();
    if (t.includes('camera')) return 'camera';
    if (t.includes('mic')) return 'mic';
    if (t.includes('touch') || t.includes('navigator') || t.includes('control')) return 'tablet';
    if (t.includes('display') || t.includes('screen')) return 'monitor';
    return 'plug';
  }

  window.WRF_Devices = Devices;
  window.WRF_DeviceDrawer = DeviceDrawer;
})();
