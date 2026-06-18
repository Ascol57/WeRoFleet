/* WeRoFleet Console — root app: store wiring, Webex connection, routing */
(function () {
  const { useState, useEffect, useCallback } = React;
  const { AppShell, I } = window.WRF_SHELL;
  const { t } = window.WRF_I18N;
  const { Card, Button } = window.HelmRoomKitFleetDS_91f16f;
  const DATA = window.WRF_DATA;
  const WX = window.WRF_WEBEX;
  const POLLER = window.WRF_POLLER;

  const PREFS_KEY = 'wrf-console-prefs';
  function loadPrefs() { try { return JSON.parse(localStorage.getItem(PREFS_KEY)) || {}; } catch (e) { return {}; } }
  function savePrefs(s) { try { localStorage.setItem(PREFS_KEY, JSON.stringify(s)); } catch (e) {} }

  // ---- toasts ----
  function useToasts() {
    const [toasts, setToasts] = useState([]);
    const notify = useCallback((msg, tone) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, msg, tone: tone || 'neutral' }]);
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
    }, []);
    return { toasts, notify };
  }

  const TOAST_IC = { success: 'check-circle-2', critical: 'alert-octagon', warning: 'alert-triangle', neutral: 'info' };
  function Toasts({ toasts }) {
    return (
      <div className="wrf-toasts">
        {toasts.map((t) => (
          <div key={t.id} className="wrf-toast" data-tone={t.tone}>
            <span className="wrf-toast-ic">{I(TOAST_IC[t.tone] || 'info')}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    );
  }

  function Placeholder({ title }) {
    const PageHead = window.WRF_PageHead;
    return (
      <div>
        <PageHead title={title} sub={t('Demonstration surface')} />
        <Card>
          <div className="wrf-empty">
            <div className="wrf-empty-ic"><i data-lucide="construction"></i></div>
            <div className="wrf-empty-title">{t('{title} lives here', { title })}</div>
            <div className="wrf-empty-sub">{t('This UI kit focuses on Overview, Devices, and Workspaces. Other surfaces follow the same shell.')}</div>
          </div>
        </Card>
      </div>
    );
  }

  function App() {
    const prefs = loadPrefs();
    const store = DATA.useStore();
    window.WRF_I18N.useStore();   // re-render the whole tree on language change
    const [active, setActive] = useState(prefs.active && prefs.active !== 'alerts' ? prefs.active : 'overview');
    const [theme, setTheme] = useState(prefs.theme || 'light');
    const [device, setDevice] = useState(null);
    const [showConnect, setShowConnect] = useState(false);
    const [pollOn, setPollOn] = useState(true);
    const [sweeping, setSweeping] = useState(false);
    const [cooldown, setCooldown] = useState(prefs.cooldown || 20000);
    const { toasts, notify } = useToasts();

    // ---- first-run splash: keep it visible until the first full fleet status sweep completes ----
    const splashDone = React.useRef(false);
    const hideSplash = useCallback(() => {
      if (splashDone.current) return;
      splashDone.current = true;
      if (window.__wrfHideSplash) window.__wrfHideSplash();
    }, []);
    useEffect(() => {
      if (!window.__wrfSplashFirstUse) { hideSplash(); return; }       // returning visit — reveal immediately
      if (!WX.hasCreds()) { const t = setTimeout(hideSplash, 1200); return () => clearTimeout(t); } // no live fleet to sweep
      // Has creds → keep splash up; the first poller sweep (or a connect failure) hides it.
    }, [hideSplash]);

    // expose notify to screens
    useEffect(() => { window.WRF_notify = notify; }, [notify]);

    // Surface adaptive-throttle transitions (429 backoff) to the user.
    useEffect(() => {
      if (!window.WRF_RM || !window.WRF_RM.onState) return;
      let wasThrottled = false;
      return window.WRF_RM.onState((s) => {
        if (s.throttled && !wasThrottled) {
          wasThrottled = true;
          notify(t('Webex rate limit hit — slowing to {rate}/s and retrying', { rate: s.effRate }), 'warning');
        } else if (!s.throttled && wasThrottled) {
          wasThrottled = false;
          notify(t('Rate back to normal ({rate}/s)', { rate: s.rate }), 'success');
        }
      });
    }, [notify]);

    useEffect(() => { savePrefs({ active, theme, cooldown }); }, [active, theme, cooldown]);
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      if (window.lucide) window.lucide.createIcons();
    });
    useEffect(() => { if (window.lucide) window.lucide.createIcons(); });

    // auto-connect with saved creds, else stay in demo
    useEffect(() => {
      if (WX.hasCreds()) {
        DATA.setState({ status: 'connecting' });
        WX.connect()
          .then(({ me, org, devices, workspaces }) => { DATA.setLive({ me, org, devices, workspaces }); notify(t('Connected · {n} devices loaded', { n: devices.length }), 'success'); })
          .catch((e) => { DATA.setState({ status: 'error' }); notify(t('Auto-connect failed: {msg}', { msg: e.message || t('error') }), 'critical'); hideSplash(); });
      }
    }, []);

    const refresh = useCallback(() => {
      if (store.mode !== 'live') return;
      DATA.setState({ status: 'connecting' });
      WX.connect()
        .then(({ me, org, devices, workspaces }) => { DATA.setLive({ me, org, devices, workspaces }); notify(t('Synced · {n} devices', { n: devices.length }), 'success'); })
        .catch((e) => { DATA.setState({ status: 'error' }); notify(t('Sync failed: {msg}', { msg: e.message || t('error') }), 'critical'); });
    }, [store.mode]);

    // Background fleet poll: sweep live xAPI status (in-call, RoomOS, uptime) at low priority.
    useEffect(() => {
      if (store.mode === 'live' && pollOn && POLLER) {
        POLLER.start({
          // Only sweep branding-eligible room devices — phones/headsets/etc. have
          // no cloud xAPI and would 404 on every sweep, spamming the console.
          getDevices: () => WX.eligible(DATA.store.devices),
          onDevice: (id, s) => DATA.applyLiveStatus(id, s),
          onState: (st) => { if (st.sweeping !== undefined) setSweeping(st.sweeping); if (st.sweptAt) hideSplash(); },
          cooldown: cooldown,
        });
        return () => POLLER.stop();
      }
      if (POLLER) POLLER.stop();
      setSweeping(false);
    }, [store.mode, pollOn, cooldown]);

    const onNav = (id) => { setActive(id); setDevice(null); };
    const onOpenDevice = (id) => setDevice(id || (store.devices[0] && store.devices[0].id));

    const Overview = window.WRF_Overview;
    const Devices = window.WRF_Devices;
    const Workspaces = window.WRF_Workspaces;
    const Presets = window.WRF_Presets;
    const Settings = window.WRF_Settings;
    const DeviceDrawer = window.WRF_DeviceDrawer;
    const ConnectModal = window.WRF_ConnectModal;

    const bell = DATA.alerts().filter((a) => a.status !== 'resolved').length;

    let screen;
    if (active === 'overview') screen = <Overview onOpenDevice={onOpenDevice} onNav={onNav} onConnect={() => setShowConnect(true)} />;
    else if (active === 'devices') screen = <Devices onOpenDevice={onOpenDevice} />;
    else if (active === 'workspaces') screen = <Workspaces onOpenDevice={onOpenDevice} />;
    else if (active === 'presets') screen = <Presets onGoWorkspaces={() => onNav('workspaces')} />;
    else if (active === 'settings') screen = <Settings cooldown={cooldown} onCooldown={setCooldown} onConnect={() => setShowConnect(true)} />;
    else screen = <Placeholder title={active.charAt(0).toUpperCase() + active.slice(1)} />;

    return (
      <AppShell
        active={active} onNav={onNav}
        theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        store={store} bell={bell}
        onConnectClick={() => setShowConnect(true)}
        onRefresh={refresh}
        pollOn={pollOn} sweeping={sweeping} onTogglePoll={() => setPollOn((v) => !v)}
      >
        {screen}
        {device && <DeviceDrawer id={device} onClose={() => setDevice(null)} notify={notify} />}
        {showConnect && <ConnectModal onClose={() => setShowConnect(false)} onConnected={(r) => notify(t('Connected · {n} devices loaded', { n: r.count }), 'success')} />}
        <Toasts toasts={toasts} />
      </AppShell>
    );
  }

  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();
