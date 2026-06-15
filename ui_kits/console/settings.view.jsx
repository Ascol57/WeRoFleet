/* WeRoFleet Console — Settings: language, Webex API rate limit, polling, connection */
(function () {
  const { useState } = React;
  const { Card, Button, Badge, Tabs, Banner } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const { t } = window.WRF_I18N;
  const I18N = window.WRF_I18N;
  const DATA = window.WRF_DATA;
  const WX = window.WRF_WEBEX;
  const RM = window.WRF_RM;
  const PageHead = window.WRF_PageHead;

  function notify(msg, tone) { if (window.WRF_notify) window.WRF_notify(msg, tone); }

  const RATES = [1, 2, 3, 5, 8, 10];
  const INTERVALS = [10000, 20000, 30000, 60000, 120000];
  const LANG_LABEL = { en: 'English', fr: 'Français' };

  function Settings({ cooldown, onCooldown, onConnect }) {
    const store = DATA.useStore();
    const lang = I18N.useStore();
    const live = store.mode === 'live';
    const [rate, setRate] = useState(RM ? RM.getRate() : 3);
    const [rm, setRm] = useState(RM ? RM.stats() : null);

    React.useEffect(() => {
      if (!RM || !RM.onState) return;
      return RM.onState((s) => setRm(s));
    }, []);

    function applyRate(n) {
      RM && RM.setRate(n); setRate(n);
      notify(t('Rate limit set to {n} requests/second', { n }), 'success');
    }

    function disconnect() {
      if (!window.confirm(t('Disconnect from Webex and clear the stored token?'))) return;
      WX.clearCreds(); DATA.loadDemo();
      notify(t('Disconnected · back to demo data'), 'neutral');
    }

    return (
      <div>
        <PageHead title={t('Settings')} sub={t('Language, Webex API throughput, polling & connection')} />

        <Card title={t('Language')} subtitle={t('Interface language for this browser')}
          action={<Badge tone="accent" outline>{LANG_LABEL[lang]}</Badge>}>
          <div style={{ display: 'inline-flex' }}>
            <Tabs variant="pill" value={lang} onChange={(v) => I18N.setLang(v)}
              tabs={I18N.SUPPORTED.map((l) => ({ value: l, label: LANG_LABEL[l] }))} />
          </div>
          <div className="wrf-fw-note" style={{ marginTop: 14 }}>
            {I('languages')}
            <span>{t('Your choice is saved in this browser. New visitors start in their browser language (French or English).')}</span>
          </div>
        </Card>

        <Card title={t('Webex API rate limit')} subtitle={t('Maximum requests per second across the whole console')}
          action={rm && rm.throttled
            ? <Badge tone="degraded" outline>{t('Throttled · {eff}/{rate}/s', { eff: rm.effRate, rate })}</Badge>
            : <Badge tone="accent" outline>{rate}/s</Badge>}>
          <div style={{ display: 'inline-flex' }}>
            <Tabs variant="pill" value={String(rate)} onChange={(v) => applyRate(+v)}
              tabs={RATES.map((n) => ({ value: String(n), label: n + '/s' }))} />
          </div>
          {rm && rm.throttled && (
            <div className="wrf-fw-note" style={{ marginTop: 14, color: 'var(--status-degraded-text)' }}>
              {I('alert-triangle')}
              <span>{t('Webex returned')} <code>429</code> — {t('temporarily easing to')} <b>{rm.effRate}/s</b> {t('and auto-retrying failed requests')}{rm.totalRetried ? t(' ({n} retried)', { n: rm.totalRetried }) : ''}. {t('The rate climbs back to {rate}/s once it settles.', { rate })}</span>
            </div>
          )}
          <div className="wrf-fw-note" style={{ marginTop: 14 }}>
            {I('gauge')}
            <span>{t('Every Webex call (status polls, commands, config pushes) is queued and throttled to this limit. On')} <code>429 Too Many Requests</code> {t('the console slows down automatically and retries — so raising this is safe to try.')} <b>{t('3/s is a conservative default.')}</b></span>
          </div>
        </Card>

        <Card title={t('Fleet auto-refresh')} subtitle={t('How long to wait between full status sweeps')}>
          <div style={{ display: 'inline-flex' }}>
            <Tabs variant="pill" value={String(cooldown)} onChange={(v) => { onCooldown(+v); notify(t('Auto-refresh interval updated'), 'success'); }}
              tabs={INTERVALS.map((ms) => ({ value: String(ms), label: ms / 1000 + 's' }))} />
          </div>
          <div className="wrf-fw-note" style={{ marginTop: 14 }}>
            {I('timer')}
            <span>{t('A sweep polls every device once (in-call, RoomOS version, uptime) at low priority. With {devices} devices at {rate}/s a full sweep takes about', { devices: store.devices.length, rate })} <b>{t('{n}s', { n: Math.max(1, Math.ceil(store.devices.length / rate)) })}</b>; {t('the console then waits this interval before sweeping again.')}</span>
          </div>
        </Card>

        <Card title={t('Connection')}>
          {live ? (
            <div className="wrf-set-conn">
              <div className="wrf-set-conn-main">
                <div className="wrf-set-conn-org">{store.org && store.org.name ? store.org.name : t('Connected')}</div>
                <div className="wrf-set-conn-meta">{t('{devices} devices · {workspaces} workspaces', { devices: store.devices.length, workspaces: store.workspaces.length })}{store.me && store.me.email ? ' · ' + store.me.email : ''}</div>
              </div>
              <Button variant="danger" leadingIcon={I('log-out')} onClick={disconnect}>{t('Disconnect')}</Button>
            </div>
          ) : (
            <Banner tone="info" title={t('Not connected')}
              actions={<Button size="sm" variant="secondary" onClick={onConnect}>{t('Connect to Webex')}</Button>}>
              {t("You're viewing demo data. Connect a Webex org to manage real devices.")}
            </Banner>
          )}
        </Card>
      </div>
    );
  }

  window.WRF_Settings = Settings;
})();
