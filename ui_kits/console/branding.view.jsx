/* WeRoFleet Console — per-device Branding editor (drawer "Branding" button) */
(function () {
  const { useState } = React;
  const { Button, Input, Switch, Tabs, Badge, Banner, Select } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const PR = window.WRF_PRESETS;
  const WX = window.WRF_WEBEX;
  const DATA = window.WRF_DATA;
  const { t } = window.WRF_I18N;

  function notify(msg, tone) { if (window.WRF_notify) window.WRF_notify(msg, tone); }
  const util = () => window.WRF_UTIL || {};
  function fmtSize(b) { return (util().fmtSize ? util().fmtSize(b) : Math.round((b || 0) / 1024) + ' KB'); }

  const CALL_LABELS = {
    JoinWebex: 'Webex', JoinMicrosoftTeamsDirectGuestJoin: 'Microsoft Teams',
    JoinGoogleMeet: 'Google Meet', JoinZoom: 'Zoom',
  };

  function ImageControl({ label, brandType, hint, value, mode, onMode, onFile }) {
    return (
      <div className="wrf-cfg-block">
        <div className="wrf-cfg-head">
          <span className="wrf-cfg-title">{label}</span>
          <div className="wrf-seg wrf-seg-tri" data-mode={mode}>
            <Tabs variant="pill" value={mode} onChange={onMode}
              tabs={[{ value: 'set', label: t('On') }, { value: 'remove', label: t('Off') }, { value: 'auto', label: t('Auto') }]} />
          </div>
        </div>
        {mode === 'set' && (
          <div className="wrf-imgdrop">
            <div className="wrf-imgprev" style={value ? { backgroundImage: `url(${value.url})` } : undefined}>{!value && I('image')}</div>
            <div className="wrf-imgmeta">
              {value
                ? <><span className="wrf-imgname">{value.name}</span><span className="wrf-imgsize">{value.w ? `${value.w}×${value.h} · ` : ''}{fmtSize(value.size)}{t(' · via Branding.Upload')}</span></>
                : <span className="wrf-imgsize">{hint}</span>}
              <label className="wrf-filebtn">{I('upload')}<span>{value ? t('Replace image') : t('Choose image')}</span><input type="file" accept="image/*" onChange={onFile} hidden /></label>
            </div>
          </div>
        )}
        {mode === 'remove' && <div className="wrf-cfg-removalnote" data-tone="warn">{I('trash-2')}<span>{t('Sends')} <b>Branding.Delete</b> {t('for')} <b>{brandType}</b>{t(' — clears the image on this device.')}</span></div>}
        {mode === 'auto' && <div className="wrf-cfg-removalnote">{I('minus-circle')}<span>{t('Left unchanged.')}</span></div>}
      </div>
    );
  }

  function BrandingModal({ device, live, currentCfg, onClose, onApplied }) {
    const presets = PR.useStore();
    const [presetId, setPresetId] = useState('');
    const [img, setImg] = useState(null);
    const [imgMode, setImgMode] = useState('auto');
    const [bg, setBg] = useState(null);
    const [bgMode, setBgMode] = useState('auto');
    const [useMsg, setUseMsg] = useState(false);
    const [msg, setMsg] = useState((currentCfg && currentCfg.customMessage) || 'If help needed, please call 9911.');
    const [useCall, setUseCall] = useState(false);
    const [call, setCall] = useState(() => {
      const base = { JoinWebex: 'Auto', JoinMicrosoftTeamsDirectGuestJoin: 'Auto', JoinGoogleMeet: 'Hidden', JoinZoom: 'Hidden' };
      return Object.assign(base, (currentCfg && currentCfg.call) || {});
    });
    // Wallpaper bundle: pick one of the device's own default wallpapers by name.
    const [wbMode, setWbMode] = useState('auto');     // 'auto' | 'name'
    const [wbName, setWbName] = useState('');
    const [wbList, setWbList] = useState(null);        // null = not loaded yet
    const [wbBusy, setWbBusy] = useState(false);
    const [wbErr, setWbErr] = useState('');
    const [run, setRun] = useState(null); // { log, done, ok, err }

    async function loadBundles() {
      setWbBusy(true); setWbErr('');
      try {
        const list = await WX.listWallpaperBundles(device.id);
        setWbList(list);
        if (list.length && !list.some((b) => b.name === wbName)) setWbName(list[0].name);
      } catch (e) {
        setWbList([]);
        setWbErr((e && e.message) || t('Could not list the device’s wallpapers'));
      } finally { setWbBusy(false); }
    }

    function pickFile(e, setter, setMode) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (!/^image\//.test(f.type)) { notify(t('Choose an image file'), 'warning'); return; }
      const rz = util().resizeToBase64;
      if (!rz) { notify(t('Image helper unavailable'), 'critical'); return; }
      rz(f, (err, out) => {
        if (err) { notify(err.message, 'critical'); return; }
        setter({ name: f.name, size: out.bytes, base64: out.base64, url: out.url, w: out.w, h: out.h });
        setMode('set');
      });
      e.target.value = '';
    }

    function applyPreset(pid) {
      setPresetId(pid);
      const p = PR.get(pid);
      if (!p) return;
      setImgMode(p.imageMode || 'auto'); setImg(p.image || null);
      setBgMode(p.bgMode || 'auto'); setBg(p.bgImage || null);
      setUseMsg(p.useMessage !== false && p.customMessage != null);
      if (p.customMessage != null) setMsg(p.customMessage);
      setUseCall(p.useCall !== false && !!p.call);
      if (p.call) setCall(Object.assign({ JoinWebex: 'Auto', JoinMicrosoftTeamsDirectGuestJoin: 'Auto', JoinGoogleMeet: 'Hidden', JoinZoom: 'Hidden' }, p.call));
      if (p.wallpaperBundleMode === 'name' && p.wallpaperBundleName) { setWbMode('name'); setWbName(p.wallpaperBundleName); setWbList(null); setWbErr(''); }
      else { setWbMode('auto'); }
      notify(t('Loaded “{name}” — review and apply', { name: p.name }), 'neutral');
    }

    function summary() {
      const a = [];
      if (imgMode === 'set' && img) a.push(t('Halfwake')); else if (imgMode === 'remove') a.push(t('Clear Halfwake'));
      if (bgMode === 'set' && bg) a.push(t('Background')); else if (bgMode === 'remove') a.push(t('Clear Background'));
      if (wbMode === 'name' && wbName) a.push(t('Wallpaper') + ' · ' + wbName);
      if (useMsg) a.push(t('Message'));
      if (useCall) a.push(t('Call buttons'));
      return a;
    }

    async function apply() {
      const acts = summary();
      if (!acts.length) { notify(t('Nothing to apply — pick at least one action'), 'warning'); return; }
      if (live && !window.confirm(t('Apply branding to {name}?', { name: device.name }))) return;

      const preset = {
        image: img, imageMode: imgMode,
        bgImage: bg, bgMode: bgMode,
        wallpaperBundleMode: (wbMode === 'name' && wbName) ? 'name' : 'auto',
        wallpaperBundleName: wbName,
        customMessage: msg, useMessage: useMsg,
        call: call, useCall: useCall,
      };
      const r = { log: [], done: false, ok: 0, err: 0 };
      setRun({ ...r });
      const onLog = (e) => {
        if (e.update) {
          const i = r.log.findIndex((x) => x.uid === e.uid);
          if (i >= 0) r.log[i] = { ...r.log[i], status: e.status, detail: e.detail };
          if (e.status === 'ok') r.ok++; if (e.status === 'err') r.err++;
        } else r.log.push(e);
        setRun({ ...r, log: [...r.log] });
      };
      await PR.apply(preset, [device], { live, onLog });
      r.done = true;
      setRun({ ...r, log: [...r.log] });
      notify(t('Branding applied to {name} · {ok} ok', { name: device.name, ok: r.ok }) + (r.err ? t(' · {err} failed', { err: r.err }) : ''), r.err ? 'warning' : 'success');
      if (onApplied) onApplied();
    }

    const presetOpts = [{ value: '', label: t('Start from a preset…') }].concat(presets.map((p) => ({ value: p.id, label: p.name })));

    return (
      <div className="wrf-modal-scrim" onClick={run && !run.done ? undefined : onClose}>
        <div className="wrf-modal wrf-editor" onClick={(e) => e.stopPropagation()}>
          <div className="wrf-modal-head">
            <div className="wrf-connect-brand">
              <span className="wrf-connect-ic" style={{ background: 'var(--accent-subtle)', color: 'var(--accent-active)' }}>{I('image')}</span>
              <div>
                <h2 className="wrf-modal-title">{t('Branding · {name}', { name: device.name })}</h2>
                <p className="wrf-modal-sub">{live ? t('Pushes to this device via Branding.Upload / deviceConfigurations') : t('Demo — calls are simulated')}</p>
              </div>
            </div>
            {(!run || run.done) && <button className="wrf-modal-x" onClick={onClose} aria-label="Close">{I('x')}</button>}
          </div>

          {run ? (
            <>
              <div className="wrf-modal-body wrf-runlog">
                {run.log.map((x) => x.kind === 'head'
                  ? <div key={x.uid} className="wrf-log-head">{I('monitor')}<b>{x.name}</b><span>{x.model}</span></div>
                  : <div key={x.uid} className="wrf-log-line" data-status={x.status}>
                      <span className="wrf-log-ic">{x.status === 'ok' ? I('check') : x.status === 'err' ? I('x') : I('loader-2', { className: 'wrf-spin' })}</span>
                      <span className="wrf-log-label">{x.label}</span>
                      {x.detail && <span className="wrf-log-detail">{x.detail}</span>}
                    </div>
                )}
              </div>
              <div className="wrf-modal-foot">
                <span className="wrf-run-summary">{t('{ok} ok', { ok: run.ok })}{run.err ? t(' · {err} failed', { err: run.err }) : ''}</span>
                <div style={{ flex: 1 }} />
                {run.done && window.WRF_REPORT && window.WRF_REPORT.available() && (
                  <Button variant="secondary" leadingIcon={I('file-text')} onClick={() => {
                    try {
                      window.WRF_REPORT.applyRunPdf({
                        preset: { name: device.name }, title: t('Branding report'),
                        live: live, log: run.log, ok: run.ok, err: run.err, total: 1,
                      });
                    } catch (e) { notify((e && e.message) || t('Could not generate the PDF'), 'critical'); }
                  }}>{t('Download PDF')}</Button>
                )}
                <Button variant={run.done ? 'primary' : 'ghost'} disabled={!run.done} onClick={onClose}>{run.done ? t('Done') : t('Applying…')}</Button>
              </div>
            </>
          ) : (
            <>
              <div className="wrf-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ width: 260 }}>
                  <Select size="sm" value={presetId} onChange={(e) => applyPreset(e.target.value)} options={presetOpts} />
                </div>
                <ImageControl label={t('Halfwake background')} brandType="HalfwakeBackground"
                  hint={t('Standby screen · auto-resized to max 3840×2160')}
                  value={img} mode={imgMode} onMode={setImgMode} onFile={(e) => pickFile(e, setImg, setImgMode)} />
                <ImageControl label={t('Background')} brandType="Background"
                  hint={t('In-call wallpaper · auto-resized to max 3840×2160')}
                  value={bg} mode={bgMode} onMode={setBgMode} onFile={(e) => pickFile(e, setBg, setBgMode)} />

                <div className="wrf-cfg-block">
                  <div className="wrf-cfg-head">
                    <span className="wrf-cfg-title">{t('Wallpaper bundle')}</span>
                    <div className="wrf-seg">
                      <Tabs variant="pill" value={wbMode}
                        onChange={(v) => { setWbMode(v); if (v === 'name' && wbList === null && !wbBusy) loadBundles(); }}
                        tabs={[{ value: 'auto', label: t('Auto') }, { value: 'name', label: t('Choose…') }]} />
                    </div>
                  </div>
                  {wbMode === 'name' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {wbBusy && <div className="wrf-cfg-removalnote">{I('loader-2', { className: 'wrf-spin' })}<span>{t('Loading the device’s wallpapers…')}</span></div>}
                      {!wbBusy && wbErr && <div className="wrf-cfg-removalnote" data-tone="warn">{I('alert-triangle')}<span>{wbErr}</span></div>}
                      {!wbBusy && !wbErr && wbList && wbList.length > 0 && (
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <div style={{ flex: 1 }}>
                            <Select size="sm" value={wbName} onChange={(e) => setWbName(e.target.value)}
                              options={wbList.map((b) => ({ value: b.name, label: b.name }))} />
                          </div>
                          <label className="wrf-filebtn" onClick={loadBundles}>{I('refresh-cw')}<span>{t('Reload')}</span></label>
                        </div>
                      )}
                      {!wbBusy && !wbErr && wbList && wbList.length === 0 && (
                        <div className="wrf-cfg-removalnote">{I('minus-circle')}<span>{t('No wallpaper bundles on this device')}</span></div>
                      )}
                      <div className="wrf-cfg-removalnote">{I('info')}<span>{t('Activates one of the device’s default wallpapers via ')}<b>WallpaperBundle.Set</b>{t('.')}</span></div>
                    </div>
                  ) : (
                    <div className="wrf-cfg-removalnote">{I('minus-circle')}<span>{t('Left unchanged.')}</span></div>
                  )}
                </div>

                <div className="wrf-cfg-block">
                  <div className="wrf-cfg-head"><Switch checked={useMsg} onChange={(e) => setUseMsg(e.target.checked)} label={t('Custom message')} /></div>
                  {useMsg && <Input size="sm" leadingIcon={I('message-square')} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t('Shown on the home screen')} />}
                </div>

                <div className="wrf-cfg-block">
                  <div className="wrf-cfg-head"><Switch checked={useCall} onChange={(e) => setUseCall(e.target.checked)} label={t('Call buttons')} /></div>
                  {useCall && (
                    <div className="wrf-call-grid">
                      {WX.CALL_FEATURE_KEYS.map((k) => (
                        <div key={k} className="wrf-call-row">
                          <span className="wrf-call-label">{CALL_LABELS[k]}</span>
                          <div className="wrf-seg">
                            <Tabs variant="pill" value={call[k]} onChange={(v) => setCall({ ...call, [k]: v })}
                              tabs={[{ value: 'Auto', label: t('Auto') }, { value: 'Hidden', label: t('Hidden') }]} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="wrf-modal-foot">
                <div className="wrf-review-v" style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{summary().join(' · ') || t('No actions selected')}</div>
                <div style={{ flex: 1 }} />
                <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
                <Button variant="primary" leadingIcon={I('rocket')} disabled={!summary().length} onClick={apply}>{live ? t('Apply to device') : t('Simulate')}</Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  window.WRF_BrandingModal = BrandingModal;
})();
