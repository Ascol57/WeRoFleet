/* WeRoFleet Console — Workspaces: select workspaces, apply a config preset */
(function () {
  const { useState, useMemo } = React;
  const { Card, Button, Input, Select, Checkbox, Badge, Banner, StatusBadge, Avatar, IconButton } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  const PR = window.WRF_PRESETS;
  const WX = window.WRF_WEBEX;
  const PageHead = window.WRF_PageHead;
  const { t } = window.WRF_I18N;

  function notify(msg, tone) { if (window.WRF_notify) window.WRF_notify(msg, tone); }

  function StateDots({ devices }) {
    const c = {};
    devices.forEach((d) => { c[d.state] = (c[d.state] || 0) + 1; });
    const order = ['critical', 'offline', 'degraded', 'incall', 'online'];
    return (
      <div className="wrf-ws-dots">
        {order.filter((k) => c[k]).map((k) => (
          <span key={k} className="wrf-ws-dot" style={{ background: DATA.STATE_VAR[k] }} title={`${c[k]} ${k}`} />
        ))}
      </div>
    );
  }

  function Workspaces({ onOpenDevice }) {
    const store = DATA.useStore();
    PR.useStore();
    const live = store.mode === 'live';
    const [q, setQ] = useState('');
    const [bld, setBld] = useState('');
    const [sel, setSel] = useState(() => new Set());
    const [presetId, setPresetId] = useState(PR.all()[0] ? PR.all()[0].id : '');
    const [run, setRun] = useState(null); // { preset, total, log, done }
    const applied = PR.loadApplied();

    const buildings = useMemo(() => {
      const s = new Set(); store.workspaces.forEach((w) => w.building && s.add(w.building)); return Array.from(s).sort();
    }, [store.workspaces]);

    let rows = store.workspaces;
    if (bld) rows = rows.filter((w) => w.building === bld);
    if (q) rows = rows.filter((w) => (w.name + ' ' + w.building).toLowerCase().includes(q.toLowerCase()));

    const selWs = store.workspaces.filter((w) => sel.has(w.id));
    const selDevicesAll = selWs.reduce((acc, w) => acc.concat(w.devices), []);
    const selDevices = WX.eligible(selDevicesAll);
    const allChecked = rows.length > 0 && rows.every((w) => sel.has(w.id));
    const someChecked = rows.some((w) => sel.has(w.id)) && !allChecked;

    const toggle = (id) => { const n = new Set(sel); n.has(id) ? n.delete(id) : n.add(id); setSel(n); };
    const toggleAll = () => { if (allChecked) setSel(new Set()); else setSel(new Set(rows.map((w) => w.id))); };

    async function applyPreset() {
      const preset = PR.get(presetId);
      if (!preset) { notify(t('Pick a preset first'), 'warning'); return; }
      if (!selDevices.length) { notify(t('No eligible devices (matching target models) in the selected workspaces'), 'warning'); return; }
      if (live && !window.confirm(t('Apply “{name}” to {d} eligible device(s) across {w} workspace(s)?', { name: preset.name, d: selDevices.length, w: selWs.length }))) return;

      const runState = { preset, total: selDevices.length, log: [], done: false, ok: 0, err: 0 };
      setRun({ ...runState });
      const onLog = (e) => {
        if (e.update) {
          const i = runState.log.findIndex((x) => x.uid === e.uid);
          if (i >= 0) runState.log[i] = { ...runState.log[i], status: e.status, detail: e.detail };
          if (e.status === 'ok') runState.ok++; if (e.status === 'err') runState.err++;
        } else { runState.log.push(e); }
        setRun({ ...runState, log: [...runState.log] });
      };
      await PR.apply(preset, selDevices, { live, onLog });
      selWs.forEach((w) => { if (WX.eligible(w.devices).length) PR.recordApplied(w.id, preset.name); });
      runState.done = true;
      setRun({ ...runState, log: [...runState.log] });
      notify(t('Applied “{name}” · {ok} ok', { name: preset.name, ok: runState.ok }) + (runState.err ? t(' · {err} failed', { err: runState.err }) : ''), runState.err ? 'warning' : 'success');
    }

    const presetOpts = PR.all().map((p) => ({ value: p.id, label: p.name }));

    return (
      <div>
        <PageHead
          title={t('Workspaces')}
          sub={t('{n} workspaces', { n: store.workspaces.length }) + (live ? '' : t(' · demo'))}
          actions={<Button variant="secondary" leadingIcon={I('sliders-horizontal')} onClick={() => window.WRF_notify && window.WRF_notify(t('Open the Presets tab to edit configs'), 'neutral')}>{t('Manage presets')}</Button>}
        />

        {!live && (
          <Banner tone="info" title={t('Demo workspaces')}>
            {t('Connect Webex to load your real workspaces. Selecting workspaces and applying a preset works the same — in demo the config calls are simulated.')}
          </Banner>
        )}

        <div className="wrf-toolbar">
          <div className="wrf-toolbar-right" style={{ marginLeft: 0 }}>
            <div style={{ width: 240 }}><Input size="sm" leadingIcon={I('search')} placeholder={t('Search workspaces…')} value={q} onChange={(e) => setQ(e.target.value)} /></div>
            <div style={{ width: 180 }}><Select size="sm" value={bld} onChange={(e) => setBld(e.target.value)} options={['', ...buildings].map((b) => ({ value: b, label: b || t('All buildings') }))} /></div>
          </div>
        </div>

        {sel.size > 0 && (
          <div className="wrf-bulkbar">
            <span className="wrf-bulk-count">{sel.size} {sel.size > 1 ? t('workspaces') : t('workspace')} · {selDevices.length} {t('eligible')} {selDevices.length === 1 ? t('device') : t('devices')}</span>
            <div className="wrf-bulk-actions" style={{ alignItems: 'center' }}>
              <div style={{ width: 220 }}><Select size="sm" value={presetId} onChange={(e) => setPresetId(e.target.value)} options={presetOpts} placeholder={t('Choose preset…')} /></div>
              <Button size="sm" variant="primary" leadingIcon={I('rocket')} onClick={applyPreset}>{t('Apply preset')}</Button>
            </div>
            <button className="wrf-bulk-clear" onClick={() => setSel(new Set())}>{t('Clear')}</button>
          </div>
        )}

        <div className="wrf-table-wrap">
          <table className="wrf-table">
            <thead>
              <tr>
                <th className="wrf-th-check"><Checkbox indeterminate={someChecked} checked={allChecked} onChange={toggleAll} aria-label={t('Select all')} /></th>
                <th>{t('Workspace')}</th>
                <th>{t('Building')}</th>
                <th>{t('Devices')}</th>
                <th>{t('State')}</th>
                <th>{t('Last applied')}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((w) => {
                const ap = applied[w.id];
                return (
                  <tr key={w.id} className="wrf-trow" onClick={() => toggle(w.id)}>
                    <td className="wrf-td-check" onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={sel.has(w.id)} onChange={() => toggle(w.id)} aria-label={t('Select {name}', { name: w.name })} />
                    </td>
                    <td>
                      <div className="wrf-cell-device">
                        <Avatar kind="device" name={w.name} size="sm" icon={I('door-open')} />
                        <div className="wrf-cell-device-main"><span className="wrf-cell-device-name">{w.name}</span></div>
                      </div>
                    </td>
                    <td><span className="wrf-cell-model">{w.building}</span></td>
                    <td>
                      <div className="wrf-ws-devcell">
                        <span className="wrf-ws-count">{w.devices.length}</span>
                        <span className="wrf-ws-models">{WX.eligible(w.devices).length ? t('{n} eligible', { n: WX.eligible(w.devices).length }) : t('no target models')}</span>
                      </div>
                    </td>
                    <td><StateDots devices={w.devices} /></td>
                    <td>{ap ? <span className="wrf-ws-applied">{I('check-circle-2')}{ap.name}</span> : <span className="wrf-cell-sub">—</span>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {run && <RunModal run={run} onClose={() => setRun(null)} />}
      </div>
    );
  }

  function RunModal({ run, onClose }) {
    const okN = run.log.filter((x) => x.status === 'ok').length;
    const errN = run.log.filter((x) => x.status === 'err').length;
    const actTotal = run.log.filter((x) => x.kind === 'act').length;
    const pct = actTotal ? Math.round(((okN + errN) / actTotal) * 100) : 0;
    return (
      <div className="wrf-modal-scrim" onClick={run.done ? onClose : undefined}>
        <div className="wrf-modal wrf-runmodal" onClick={(e) => e.stopPropagation()}>
          <div className="wrf-modal-head">
            <div className="wrf-connect-brand">
              <span className="wrf-connect-ic" style={{ background: 'color-mix(in srgb, ' + (run.preset.accent || 'var(--accent)') + ' 16%, transparent)', color: run.preset.accent || 'var(--accent)' }}>{I('rocket')}</span>
              <div>
                <h2 className="wrf-modal-title">{run.done ? t('Deployment complete') : t('Applying preset…')}</h2>
                <p className="wrf-modal-sub">{t('{name} · {n} device(s)', { name: run.preset.name, n: run.total })}</p>
              </div>
            </div>
            {run.done && <button className="wrf-modal-x" onClick={onClose} aria-label={t('Close')}>{I('x')}</button>}
          </div>
          <div className="wrf-runbar"><div className="wrf-runbar-fill" style={{ width: pct + '%', background: errN ? 'var(--status-degraded)' : 'var(--status-online)' }} /></div>
          <div className="wrf-modal-body wrf-runlog">
            {run.log.map((x) => x.kind === 'head' ? (
              <div key={x.uid} className="wrf-log-head">{I('monitor')}<b>{x.name}</b><span>{x.model}</span></div>
            ) : (
              <div key={x.uid} className="wrf-log-line" data-status={x.status}>
                <span className="wrf-log-ic">{x.status === 'ok' ? I('check') : x.status === 'err' ? I('x') : I('loader-2', { className: 'wrf-spin' })}</span>
                <span className="wrf-log-label">{x.label}</span>
                {x.detail && <span className="wrf-log-detail">{x.detail}</span>}
              </div>
            ))}
          </div>
          <div className="wrf-modal-foot">
            <span className="wrf-run-summary">{t('{ok} ok', { ok: okN })}{errN ? t(' · {err} failed', { err: errN }) : ''}</span>
            <div style={{ flex: 1 }} />
            <Button variant={run.done ? 'primary' : 'ghost'} disabled={!run.done} onClick={onClose}>{run.done ? t('Done') : t('Running…')}</Button>
          </div>
        </div>
      </div>
    );
  }

  window.WRF_Workspaces = Workspaces;
})();
