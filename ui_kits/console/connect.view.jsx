/* WeRoFleet Console — Webex connection modal */
(function () {
  const { useState } = React;
  const { Card, Button, Input, Banner, Switch } = window.HelmRoomKitFleetDS_91f16f;
  const { I } = window.WRF_SHELL;
  const WX = window.WRF_WEBEX;
  const DATA = window.WRF_DATA;
  const { t } = window.WRF_I18N;

  const SCOPES = 'spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands';

  function ConnectModal({ onClose, onConnected }) {
    const saved = WX.getCreds();
    const [token, setToken] = useState(saved.token || '');
    const [orgId, setOrgId] = useState(saved.orgId || '');
    const [base, setBase] = useState(saved.base !== WX.DEFAULT_BASE ? saved.base : '');
    const [advanced, setAdvanced] = useState(!!(saved.base && saved.base !== WX.DEFAULT_BASE));
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);

    const closable = DATA.store.connected || DATA.store.mode === 'demo';

    async function doConnect() {
      setError(null);
      if (!token.trim()) { setError({ kind: 'auth', message: t('Paste a Webex access token to continue.') }); return; }
      setBusy(true);
      WX.setCreds({ token, orgId, base: advanced ? base : '' });
      DATA.setState({ status: 'connecting' });
      try {
        const { me, org, devices, workspaces } = await WX.connect();
        DATA.setLive({ me, org, devices, workspaces });
        if (onConnected) onConnected({ count: devices.length, org });
        if (onClose) onClose();
      } catch (e) {
        DATA.setState({ status: 'error' });
        setError({ kind: e.kind || 'http', message: e.message || t('Connection failed.'), body: e.body });
      } finally {
        setBusy(false);
      }
    }

    function useDemo() {
      DATA.loadDemo();
      if (onClose) onClose();
    }

    return (
      <div className="wrf-modal-scrim" onClick={closable ? onClose : undefined}>
        <div className="wrf-modal wrf-connect" onClick={(e) => e.stopPropagation()}>
          <div className="wrf-modal-head">
            <div className="wrf-connect-brand">
              <span className="wrf-connect-ic">{I('plug-zap')}</span>
              <div>
                <h2 className="wrf-modal-title">{t('Connect to Webex')}</h2>
                <p className="wrf-modal-sub">{t('Use your own access token to load your real device fleet.')}</p>
              </div>
            </div>
            {closable && <button className="wrf-modal-x" onClick={onClose} aria-label={t('Close')}>{I('x')}</button>}
          </div>

          <div className="wrf-modal-body">
            {error && (
              <Banner tone={error.kind === 'network' ? 'warning' : 'critical'}
                title={ERR_TITLE[error.kind] || t('Connection failed')}>
                {error.message}
                {error.kind === 'scope' && <div className="wrf-connect-scopes">{t('Required scopes: {scopes}', { scopes: SCOPES })}</div>}
                {error.kind === 'network' && <div className="wrf-connect-scopes">{t('Tip: enable advanced options below to route through a CORS proxy.')}</div>}
              </Banner>
            )}

            <Input
              label={t('Webex access token')}
              type="password"
              mono
              leadingIcon={I('key-round')}
              placeholder={t("Paste your Bearer token (without 'Bearer ')")}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              hint={t('Personal access token or an integration token with admin scopes.')}
            />
            <Input
              label={t('Organization ID')}
              mono
              leadingIcon={I('building-2')}
              placeholder={t("Y2lzY29zcGFyazovL3VzL09SR0FO…  (optional)")}
              value={orgId}
              onChange={(e) => setOrgId(e.target.value)}
              hint={t("Optional — defaults to the token owner's org.")}
            />

            <div className="wrf-connect-adv">
              <Switch size="sm" checked={advanced} onChange={(e) => setAdvanced(e.target.checked)}
                label={t('Advanced — custom API base / proxy')} />
              {advanced && (
                <Input
                  mono
                  leadingIcon={I('route')}
                  placeholder={WX.DEFAULT_BASE}
                  value={base}
                  onChange={(e) => setBase(e.target.value)}
                  hint={t('Point at a CORS proxy that forwards to webexapis.com/v1 if the browser blocks direct calls.')}
                />
              )}
            </div>

            <div className="wrf-connect-note">
              {I('shield')}
              <span>{t("Your token is stored only in this browser's local storage and sent directly to Webex. Nothing is uploaded to WeRoFleet.")}</span>
            </div>
          </div>

          <div className="wrf-modal-foot">
            <Button variant="ghost" onClick={useDemo} disabled={busy}>{t('Use demo data')}</Button>
            <div style={{ flex: 1 }} />
            <Button variant="primary" onClick={doConnect} disabled={busy}
              leadingIcon={busy ? I('loader-2', { className: 'wrf-spin' }) : I('plug')}>
              {busy ? t('Connecting…') : t('Connect')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const ERR_TITLE = {
    auth: t('Invalid token'),
    scope: t('Missing scope'),
    network: t('Could not reach Webex'),
    rate: t('Rate limited'),
    http: t('Webex API error'),
  };

  window.WRF_ConnectModal = ConnectModal;
})();
