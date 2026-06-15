/* WeRoFleet Console — Alerts screen */
(function () {
  const { useState } = React;
  const { Card, Badge, Button, IconButton, Tabs, Avatar } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  const PageHead = window.WRF_PageHead;
  const { t } = window.WRF_I18N;

  const SEV = {
    critical: { tone: 'critical', icon: 'alert-octagon', label: t('Critical') },
    warning: { tone: 'degraded', icon: 'alert-triangle', label: t('Warning') },
    info: { tone: 'incall', icon: 'info', label: t('Info') },
  };
  const SEV_VAR = { critical: 'var(--status-critical)', warning: 'var(--status-degraded)', info: 'var(--status-incall)' };

  function notify(msg, tone) { if (window.WRF_notify) window.WRF_notify(msg, tone); }

  function Alerts({ onOpenDevice }) {
    const store = DATA.useStore();
    const [tab, setTab] = useState('open');
    const live = store.mode === 'live';
    const allAlerts = DATA.alerts();
    const rows = allAlerts.filter((a) => tab === 'all' ? true : tab === 'open' ? a.status !== 'resolved' : a.status === 'resolved');
    const openN = allAlerts.filter((a) => a.status !== 'resolved').length;
    const resolvedN = allAlerts.length - openN;

    const act = (a, patch, msg) => {
      if (live && a.deviceId) { DATA.setLocalAct(a.deviceId, patch); notify(msg, 'success'); }
      else notify(t('{msg} (demo)', { msg }), 'neutral');
    };

    return (
      <div>
        <PageHead
          title={t('Alerts')}
          sub={t('{open} active · {resolved} resolved', { open: openN, resolved: resolvedN })}
          actions={<>
            <Button variant="secondary" leadingIcon={I('bell-off')}>{t('Mute rules')}</Button>
            <Button variant="secondary" leadingIcon={I('check-check')}
              onClick={() => { if (live) allAlerts.forEach((a) => a.deviceId && a.status === 'open' && DATA.setLocalAct(a.deviceId, { acked: true, who: store.me && store.me.displayName })); notify(t('All alerts acknowledged'), 'success'); }}>
              {t('Acknowledge all')}
            </Button>
          </>}
        />

        <div className="wrf-toolbar">
          <Tabs value={tab} onChange={setTab} tabs={[
            { value: 'open', label: t('Active'), count: openN },
            { value: 'resolved', label: t('Resolved'), count: resolvedN },
            { value: 'all', label: t('All'), count: allAlerts.length },
          ]} />
        </div>

        {rows.length === 0 ? (
          <Card>
            <div className="wrf-empty" style={{ padding: '40px 12px' }}>
              <div className="wrf-empty-ic" style={{ color: 'var(--status-online-text)' }}>{I('check-circle-2')}</div>
              <div className="wrf-empty-title">{tab === 'open' ? t('No active alerts') : t('Nothing here')}</div>
              <div className="wrf-empty-sub">{tab === 'open' ? t('Every device is healthy right now.') : t('No alerts in this view.')}</div>
            </div>
          </Card>
        ) : (
          <div className="wrf-alert-list">
            {rows.map((a) => {
              const s = SEV[a.sev];
              return (
                <div key={a.id} className="wrf-alert-card" data-sev={a.sev}>
                  <span className="wrf-alert-rail" style={{ background: SEV_VAR[a.sev] }} />
                  <span className="wrf-alert-ic" style={{ color: SEV_VAR[a.sev] }}>{I(s.icon)}</span>
                  <div className="wrf-alert-main">
                    <div className="wrf-alert-top">
                      <span className="wrf-alert-msg">{a.msg}</span>
                      <Badge tone={s.tone} outline>{s.label}</Badge>
                      {a.status === 'ack' && <Badge tone="neutral">{t('Acknowledged')}</Badge>}
                      {a.status === 'resolved' && <Badge tone="online" outline>{t('Resolved')}</Badge>}
                    </div>
                    <div className="wrf-alert-meta">
                      <button className="wrf-alert-device" onClick={() => onOpenDevice(a.deviceId)}>{I('monitor')}{a.device}</button>
                      {a.site && <><span>·</span><span>{a.site}</span></>}
                      <span>·</span><span>{a.time}</span>
                      {a.who && <><span>·</span><span className="wrf-alert-who"><Avatar name={a.who} size="xs" /> {a.who}</span></>}
                    </div>
                  </div>
                  <div className="wrf-alert-actions">
                    {a.status === 'open' && <Button size="sm" variant="secondary" onClick={() => act(a, { acked: true, who: store.me && store.me.displayName }, t('Acknowledged · {device}', { device: a.device }))}>{t('Acknowledge')}</Button>}
                    {a.status !== 'resolved' && <Button size="sm" variant="ghost" onClick={() => act(a, { resolved: true }, t('Resolved · {device}', { device: a.device }))}>{t('Resolve')}</Button>}
                    <IconButton size="sm" variant="ghost" icon={I('more-vertical')} label={t('More')} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  window.WRF_Alerts = Alerts;
})();
