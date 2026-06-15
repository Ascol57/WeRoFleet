/* WeRoFleet Console — Config presets library + editor (the authoring interface) */
(function () {
  const { useState, useRef } = React;
  const { Card, Button, Input, Switch, Badge, Tabs, IconButton, Banner } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const PR = window.WRF_PRESETS;
  const PageHead = window.WRF_PageHead;
  const { t } = window.WRF_I18N;

  const ACCENTS = ['#0E7C86', '#2A6FDB', '#1F8A5B', '#B0830B', '#8257E6', '#C2410C'];
  function notify(msg, tone) { if (window.WRF_notify) window.WRF_notify(msg, tone); }
  function rel(ts) {
    if (!ts) return t('just now');
    const s = (Date.now() - ts) / 1000;
    if (s < 60) return t('just now');
    const d = Math.floor(s / 86400);
    if (d >= 1) return t('{n}d ago', { n: d });
    const h = Math.floor(s / 3600); if (h >= 1) return t('{n}h ago', { n: h });
    return t('{n}m ago', { n: Math.floor(s / 60) });
  }
  function fmtSize(bytes) {
    if (!bytes) return '0 KB';
    return bytes >= 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(1) + ' MB' : Math.round(bytes / 1024) + ' KB';
  }

  // Downscale to fit within MAX (keeping aspect ratio, shrink-only) then return base64.
  const MAX_W = 3840, MAX_H = 2160;
  function resizeToBase64(file, cb) {
    const reader = new FileReader();
    reader.onerror = () => cb(new Error(t('Could not read the image')));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => cb(new Error(t('Unsupported image file')));
      img.onload = () => {
        const scale = Math.min(1, MAX_W / img.width, MAX_H / img.height);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const url = canvas.toDataURL(mime, 0.9);
        const base64 = url.split(',')[1] || '';
        cb(null, { base64, url, w, h, bytes: Math.round(base64.length * 0.75), resized: scale < 1 });
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function Presets({ onGoWorkspaces }) {
    const presets = PR.useStore();
    const [editing, setEditing] = useState(null); // preset object or null
    const fileRef = useRef(null);

    function download(name, text) {
      if (!text) return;
      const blob = new Blob([text], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    function onImportFile(e) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try { const n = PR.importJSON(String(r.result)); notify(t('Imported {n} preset(s)', { n }), 'success'); }
        catch (err) { notify(err.message, 'critical'); }
      };
      r.readAsText(f);
      e.target.value = '';
    }
    const slug = (s) => (s || 'preset').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    return (
      <div>
        <PageHead
          title={t('Config presets')}
          sub={t('Reusable branding & call-setting bundles · apply them from Workspaces')}
          actions={<>
            <input type="file" accept="application/json,.json" hidden ref={fileRef} onChange={onImportFile} />
            <Button variant="ghost" leadingIcon={I('upload')} onClick={() => fileRef.current && fileRef.current.click()}>{t('Import')}</Button>
            <Button variant="secondary" leadingIcon={I('download')} onClick={() => download('werofleet-presets.json', PR.exportAll())}>{t('Export all')}</Button>
            <Button variant="primary" leadingIcon={I('plus')} onClick={() => setEditing(PR.blank())}>{t('New preset')}</Button>
          </>}
        />

        <Banner tone="info" title={t('How presets work')}>
          {t('Build a preset here, then go to ')}<b>{t('Workspaces')}</b>{t(', tick the rooms you want, and apply it. Each preset maps to the same Webex routes: ')}<code>Branding.Upload</code>{t(', ')}<code>CustomMessage</code>{t(' and ')}<code>UserInterface.Features.Call.*</code>{t('.')}
        </Banner>

        <div className="wrf-preset-grid">
          {presets.map((p) => (
            <div key={p.id} className="wrf-preset-card">
              <div className="wrf-preset-top">
                <span className="wrf-preset-swatch" style={{ background: p.accent || 'var(--accent)' }}>
                  {p.imageMode === 'set' && p.image ? <img src={p.image.url} alt="" /> : I('layers')}
                </span>
                <div className="wrf-preset-name-wrap">
                  <div className="wrf-preset-name">{p.name || t('Untitled preset')}</div>
                  <div className="wrf-preset-updated">{t('Updated {when}', { when: rel(p.updatedAt) })}</div>
                </div>
                <div className="wrf-preset-menu">
                  <IconButton size="sm" variant="ghost" icon={I('download')} label={t('Export')} onClick={() => download(slug(p.name) + '.json', PR.exportOne(p.id))} />
                  <IconButton size="sm" variant="ghost" icon={I('copy')} label={t('Duplicate')} onClick={() => { PR.duplicate(p.id); notify(t('Preset duplicated'), 'success'); }} />
                  <IconButton size="sm" variant="ghost" icon={I('pencil')} label={t('Edit')} onClick={() => setEditing({ ...p })} />
                  <IconButton size="sm" variant="ghost" icon={I('trash-2')} label={t('Delete')} onClick={() => { if (window.confirm(t('Delete preset “{name}”?', { name: p.name }))) { PR.remove(p.id); notify(t('Preset deleted'), 'neutral'); } }} />
                </div>
              </div>
              {p.description && <p className="wrf-preset-desc">{p.description}</p>}
              <div className="wrf-preset-actions">
                {PR.actions(p).length ? PR.actions(p).map((a, i) => <Badge key={i} tone={a.tone || 'neutral'} outline>{a.label}</Badge>) : <span className="wrf-cell-sub">{t('Leaves device unchanged')}</span>}
              </div>
              <div className="wrf-preset-foot">
                <Button size="sm" variant="ghost" leadingIcon={I('pencil')} onClick={() => setEditing({ ...p })}>{t('Edit')}</Button>
                <Button size="sm" variant="secondary" leadingIcon={I('door-open')} onClick={onGoWorkspaces}>{t('Apply…')}</Button>
              </div>
            </div>
          ))}
        </div>

        {editing && <PresetEditor preset={editing} onClose={() => setEditing(null)}
          onSave={(p) => { PR.upsert(p); setEditing(null); notify(t('Preset saved'), 'success'); }} />}
      </div>
    );
  }

  function PresetEditor({ preset, onClose, onSave }) {
    const [p, setP] = useState(preset);
    const set = (patch) => setP({ ...p, ...patch });
    const setCall = (key, val) => setP({ ...p, call: { ...p.call, [key]: val } });

    function onFile(e, fieldKey, modeKey, typeLabel) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (!/^image\//.test(f.type)) { notify(t('Choose an image file'), 'warning'); return; }
      resizeToBase64(f, (err, out) => {
        if (err) { notify(err.message, 'critical'); return; }
        set({ [fieldKey]: { name: f.name, size: out.bytes, base64: out.base64, url: out.url, w: out.w, h: out.h }, [modeKey]: 'set' });
        notify(out.resized ? t('{label} resized to {w}×{h} · {size}', { label: typeLabel, w: out.w, h: out.h, size: fmtSize(out.bytes) }) : t('{label} ready · {w}×{h}', { label: typeLabel, w: out.w, h: out.h }), 'success');
      });
      e.target.value = '';
    }

    function ImageBlock({ label, hint, fieldKey, modeKey, brandType }) {
      const img = p[fieldKey];
      const mode = p[modeKey] || 'auto';
      return (
        <div className="wrf-cfg-block">
          <div className="wrf-cfg-head">
            <span className="wrf-cfg-title">{label}</span>
            <div className="wrf-seg wrf-seg-tri" data-mode={mode}>
              <Tabs variant="pill" value={mode} onChange={(v) => set({ [modeKey]: v })}
                tabs={[{ value: 'set', label: t('On') }, { value: 'remove', label: t('Off') }, { value: 'auto', label: t('Auto') }]} />
            </div>
          </div>
          {mode === 'set' && (
            <div className="wrf-imgdrop">
              <div className="wrf-imgprev" style={img ? { backgroundImage: `url(${img.url})` } : undefined}>{!img && I('image')}</div>
              <div className="wrf-imgmeta">
                {img ? <>
                  <span className="wrf-imgname">{img.name}</span>
                  <span className="wrf-imgsize">{img.w ? `${img.w}×${img.h} · ` : ''}{fmtSize(img.size)} · via Branding.Upload</span>
                </> : <span className="wrf-imgsize">{hint}</span>}
                <label className="wrf-filebtn">{I('upload')}<span>{img ? 'Replace image' : 'Choose image'}</span><input type="file" accept="image/*" onChange={(e) => onFile(e, fieldKey, modeKey, label)} hidden /></label>
              </div>
            </div>
          )}
          {mode === 'remove' && (
            <div className="wrf-cfg-removalnote" data-tone="warn">{I('trash-2')}<span>{t('On apply, sends ')}<b>Branding.Delete</b>{t(' for ')}<b>{brandType}</b>{t(' — clears any image left on the device.')}</span></div>
          )}
          {mode === 'auto' && (
            <div className="wrf-cfg-removalnote">{I('minus-circle')}<span>{t("Left unchanged — this preset won't touch the device's ")}<b>{brandType}</b>{t('.')}</span></div>
          )}
        </div>
      );
    }

    return (
      <div className="wrf-modal-scrim" onClick={onClose}>
        <div className="wrf-modal wrf-editor" onClick={(e) => e.stopPropagation()}>
          <div className="wrf-modal-head">
            <div className="wrf-connect-brand">
              <span className="wrf-connect-ic" style={{ background: 'color-mix(in srgb, ' + (p.accent || 'var(--accent)') + ' 16%, transparent)', color: p.accent || 'var(--accent)' }}>{I('layers')}</span>
              <div>
                <h2 className="wrf-modal-title">{preset.name ? t('Edit preset') : t('New preset')}</h2>
                <p className="wrf-modal-sub">{t('A reusable bundle of device branding & call settings.')}</p>
              </div>
            </div>
            <button className="wrf-modal-x" onClick={onClose} aria-label="Close">{I('x')}</button>
          </div>

          <div className="wrf-modal-body">
            <Input label={t('Preset name')} placeholder={t('e.g. Standard meeting room')} value={p.name} onChange={(e) => set({ name: e.target.value })} />
            <Input label={t('Description')} placeholder={t('What is this preset for?')} value={p.description} onChange={(e) => set({ description: e.target.value })} />

            <div className="wrf-field-label" style={{ marginTop: 4 }}>{t('Accent')}</div>
            <div className="wrf-accent-row">
              {ACCENTS.map((c) => (
                <button key={c} className="wrf-accent-sw" data-on={p.accent === c ? 'true' : undefined} style={{ background: c }} onClick={() => set({ accent: c })} aria-label={c} />
              ))}
            </div>

            <ImageBlock label={t('Halfwake background')} fieldKey="image" modeKey="imageMode" brandType="HalfwakeBackground"
              hint={t('Standby screen · PNG/JPG · auto-resized to max 3840×2160, ratio kept')} />

            <ImageBlock label={t('Background')} fieldKey="bgImage" modeKey="bgMode" brandType="Background"
              hint={t('In-call wallpaper · PNG/JPG · auto-resized to max 3840×2160, ratio kept')} />

            <div className="wrf-cfg-block" data-off={!p.useMessage ? 'true' : undefined}>
              <div className="wrf-cfg-head"><Switch checked={p.useMessage} onChange={(e) => set({ useMessage: e.target.checked })} label={t('Custom message')} /></div>
              <Input size="sm" leadingIcon={I('message-square')} value={p.customMessage} onChange={(e) => set({ customMessage: e.target.value })} placeholder={t('Shown on the device home screen')} />
            </div>

            <div className="wrf-cfg-block" data-off={!p.useCall ? 'true' : undefined}>
              <div className="wrf-cfg-head"><Switch checked={p.useCall} onChange={(e) => set({ useCall: e.target.checked })} label={t('Call buttons')} /></div>
              <div className="wrf-call-grid">
                {PR.CALL_KEYS.map(([key, label]) => (
                  <div key={key} className="wrf-call-row">
                    <span className="wrf-call-label">{label}</span>
                    <div className="wrf-seg">
                      <Tabs variant="pill" value={p.call[key]} onChange={(v) => setCall(key, v)}
                        tabs={[{ value: 'Auto', label: t('Auto') }, { value: 'Hidden', label: t('Hidden') }]} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="wrf-cfg-block">
              <div className="wrf-cfg-head"><span className="wrf-cfg-title">{t('Interface toggles')}</span></div>
              <div className="wrf-call-grid">
                {PR.VALUE_TOGGLES.map((tog) => {
                  const mk = tog.key + 'Mode';
                  const mode = p[mk] || 'auto';
                  return (
                    <div key={tog.key} className="wrf-call-row">
                      <span className="wrf-call-label">{tog.label}</span>
                      <div className="wrf-seg wrf-seg-tri" data-mode={mode === 'on' ? 'set' : mode === 'off' ? 'remove' : 'auto'}>
                        <Tabs variant="pill" value={mode} onChange={(v) => set({ [mk]: v })}
                          tabs={[{ value: 'on', label: t('On') }, { value: 'off', label: t('Off') }, { value: 'auto', label: t('Auto') }]} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="wrf-cfg-removalnote">{I('info')}<span><b>{t('Auto')}</b>{t(" leaves the device's current setting untouched. On / Off push the value via deviceConfigurations.")}</span></div>
            </div>
          </div>

          <div className="wrf-modal-foot">
            <Button variant="ghost" onClick={onClose}>{t('Cancel')}</Button>
            <div style={{ flex: 1 }} />
            <Button variant="primary" leadingIcon={I('check')} disabled={!p.name.trim()} onClick={() => onSave(p)}>{t('Save preset')}</Button>
          </div>
        </div>
      </div>
    );
  }

  window.WRF_Presets = Presets;
  window.WRF_UTIL = { resizeToBase64, fmtSize, rel };
})();
