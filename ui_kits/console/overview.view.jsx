/* WeRoFleet Console — Overview screen */
(function () {
  const { Card, MetricStat, StatusBadge, Banner, Button, Badge, ProgressBar, Avatar } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const { t, tState } = window.WRF_I18N;
  const DATA = window.WRF_DATA;

  function PageHead({ title, sub, actions }) {
    return (
      <div className="wrf-pagehead">
        <div>
          <h1 className="wrf-h1">{title}</h1>
          {sub && <p className="wrf-sub">{sub}</p>}
        </div>
        {actions && <div className="wrf-pagehead-actions">{actions}</div>}
      </div>
    );
  }
  window.WRF_PageHead = PageHead;

  function DonutBar({ c }) {
    const segs = [
      ['online', c.online, 'var(--status-online)'],
      ['incall', c.incall, 'var(--status-incall)'],
      ['degraded', c.degraded, 'var(--status-degraded)'],
      ['critical', c.critical, 'var(--status-critical)'],
      ['offline', c.offline, 'var(--status-offline)'],
    ];
    const any = segs.some(([, v]) => v > 0);
    return (
      <div className="wrf-stack-bar">
        <div className="wrf-stack-track">
          {any ? segs.map(([k, v, col]) => v > 0 && (
            <div key={k} className="wrf-stack-seg" style={{ flex: v, background: col }} title={`${k}: ${v}`} />
          )) : <div className="wrf-stack-seg" style={{ flex: 1, background: 'var(--slate-200)' }} />}
        </div>
        <div className="wrf-stack-legend">
          {segs.map(([k, v, col]) => (
            <div key={k} className="wrf-legend-item">
              <span className="wrf-legend-dot" style={{ background: col }} />
              <span className="wrf-legend-k">{k}</span>
              <span className="wrf-legend-v">{v}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function Overview({ onOpenDevice, onNav, onConnect }) {
    const store = DATA.store;
    const live = store.mode === 'live';
    const devices = store.devices;
    const c = DATA.counts();
    const siteN = DATA.sites().length;
    const attention = devices.filter((d) => d.state === 'critical' || d.state === 'degraded');
    const down = devices.filter((d) => d.state === 'critical' || d.state === 'offline');
    const onBaseline = devices.filter((d) => !d.fwOld).length;
    const behind = devices.filter((d) => d.fwOld).length;

    return (
      <div>
        <PageHead
          title={t('Fleet overview')}
          sub={`${c.total === 1 ? t('{n} device', { n: c.total }) : t('{n} devices', { n: c.total })}${siteN ? (siteN === 1 ? t(' across {n} site', { n: siteN }) : t(' across {n} sites', { n: siteN })) : ''} · ${live ? t('live') : t('demo data')}`}
          actions={<>
            {!live && <Button variant="secondary" leadingIcon={I('plug')} onClick={onConnect}>{t('Connect Webex')}</Button>}
            <Button variant="secondary" leadingIcon={I('download')}>{t('Export')}</Button>
            <Button variant="primary" leadingIcon={I('upload-cloud')} onClick={() => onNav('updates')}>{t('Deploy update')}</Button>
          </>}
        />

        {!live && (
          <Banner tone="info" title={t('Showing sample data')}
            actions={<Button size="sm" variant="secondary" onClick={onConnect}>{t('Connect to Webex')}</Button>}>
            {t('Connect your Webex org with an access token to monitor your real device fleet.')}
          </Banner>
        )}

        {down.length > 0 && (
          <Banner tone="critical" title={down.length === 1 ? t('{n} device is offline or unreachable', { n: down.length }) : t('{n} devices are offline or unreachable', { n: down.length })}
            actions={<Button size="sm" variant="secondary" onClick={() => onNav('devices')}>{t('View devices')}</Button>}>
            {down.slice(0, 3).map((d) => `${d.name}${d.site ? ` (${d.site})` : ''}`).join(', ')}{down.length > 3 ? t(' and {n} more', { n: down.length - 3 }) : ''}.
          </Banner>
        )}

        <div className="wrf-metric-strip">
          <Card pad><MetricStat label={t('Total devices')} value={c.total} icon={I('monitor')} footnote={siteN ? (siteN === 1 ? t('{n} site', { n: siteN }) : t('{n} sites', { n: siteN })) : null} /></Card>
          <Card pad><MetricStat label={t('Online')} value={c.online + c.incall} unit={`/ ${c.total}`} footnote={t('{p}% reachable', { p: pct(c.online + c.incall, c.total) })} /></Card>
          <Card pad><MetricStat label={t('In call now')} value={c.incall} icon={I('video')} footnote={live ? null : t('{n} participants', { n: 71 })} /></Card>
          <Card pad><MetricStat label={t('Needs attention')} value={c.degraded + c.critical} footnote={c.critical ? t('{n} critical', { n: c.critical }) : t('all clear')} /></Card>
        </div>

        <div className="wrf-two-col">
          <Card title={t('Fleet health')} subtitle={t('By operational state')}>
            <DonutBar c={c} />
          </Card>
          <Card title={t('Firmware coverage')} subtitle={store.baseline ? t('{v} baseline', { v: store.baseline }) : t('No baseline')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingTop: 4 }}>
              <ProgressBar label={t('On baseline')} value={onBaseline} max={c.total || 1} showValue valueText={`${onBaseline} / ${c.total}`} tone="online" />
              <ProgressBar label={t('Behind baseline')} value={behind} max={c.total || 1} showValue valueText={`${behind} / ${c.total}`} tone="degraded" />
              <div className="wrf-fw-note">
                {I('info')}
                <span>{behind > 0 ? (behind === 1 ? t('{n} device is behind the fleet baseline.', { n: behind }) : t('{n} devices are behind the fleet baseline.', { n: behind })) : t('Every reachable device is on the baseline build.')}</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="wrf-two-col" style={{ gridTemplateColumns: '1fr' }}>
          <Card title={t('Needs attention')} subtitle={attention.length === 1 ? t('{n} device', { n: attention.length }) : t('{n} devices', { n: attention.length })} action={attention.length ? <Button size="sm" variant="ghost" onClick={() => onNav('devices')}>{t('View all')}</Button> : null}>
            {attention.length ? (
              <div className="wrf-mini-list">
                {attention.slice(0, 6).map((d) => (
                  <button key={d.id} className="wrf-mini-row" onClick={() => onOpenDevice(d.id)}>
                    <Avatar kind="device" name={d.name} />
                    <div className="wrf-mini-main">
                      <div className="wrf-mini-name">{d.name}</div>
                      <div className="wrf-mini-meta">{[d.site, d.model].filter(Boolean).join(' · ')}</div>
                    </div>
                    <div className="wrf-mini-issue">{t(d.issue)}</div>
                    <StatusBadge state={d.state} label={tState(d.state)} />
                    <span className="wrf-mini-chev">{I('chevron-right')}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="wrf-empty" style={{ padding: '28px 12px' }}>
                <div className="wrf-empty-ic" style={{ color: 'var(--status-online-text)' }}>{I('check-circle-2')}</div>
                <div className="wrf-empty-title">{t('All devices healthy')}</div>
                <div className="wrf-empty-sub">{t('No degraded or critical devices right now.')}</div>
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  }

  function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }

  window.WRF_Overview = Overview;
})();
