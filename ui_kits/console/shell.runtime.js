/* WeRoFleet Console — app shell: Sidebar + TopBar + AppShell (window-scoped) */
(function () {
  const { useEffect } = React;
  const { Avatar, IconButton, Badge, Input, Tooltip } = window.HelmRoomKitFleetDS_91f16f;
  const { t } = window.WRF_I18N;
  const I = (n, s) => React.createElement('i', { 'data-lucide': n, style: s });

  const CSS = `
  .wrf-app { display: flex; height: 100vh; width: 100%; overflow: hidden; background: var(--surface-app); color: var(--text-primary); font-family: var(--font-sans); }
  .wrf-side { width: var(--rail-nav); flex: none; display: flex; flex-direction: column; background: var(--surface-card); border-right: 1px solid var(--border-default); }
  .wrf-side-top { display: flex; align-items: center; gap: 10px; height: var(--topbar-height); padding: 0 16px; border-bottom: 1px solid var(--border-subtle); }
  .wrf-side-mark { width: 26px; height: 26px; border-radius: 7px; flex: none; }
  .wrf-side-name { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; color: var(--text-primary); line-height: 1; }
  .wrf-side-sub { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-tertiary); margin-top: 3px; }
  .wrf-nav { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 1px; }
  .wrf-nav-sec { font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-tertiary); padding: 14px 10px 6px; }
  .wrf-nav-item { display: flex; align-items: center; gap: 10px; height: 34px; padding: 0 10px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text-secondary); font-size: 13px; font-weight: 500; border: none; background: transparent; width: 100%; text-align: left; transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard); }
  .wrf-nav-item svg, .wrf-nav-item i { width: 16px; height: 16px; flex: none; }
  .wrf-nav-item:hover { background: var(--surface-hover); color: var(--text-primary); }
  .wrf-nav-item[data-active="true"] { background: var(--accent-subtle); color: var(--accent-active); font-weight: 600; }
  .wrf-nav-item .wrf-nav-grow { margin-left: auto; }
  .wrf-side-foot { border-top: 1px solid var(--border-subtle); padding: 10px; }
  .wrf-org { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: var(--radius-sm); cursor: pointer; }
  .wrf-org:hover { background: var(--surface-hover); }
  .wrf-org-name { font-size: 13px; font-weight: 600; color: var(--text-primary); line-height: 1.1; }
  .wrf-org-meta { font-size: 11px; color: var(--text-tertiary); }

  .wrf-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .wrf-top { display: flex; align-items: center; gap: 14px; height: var(--topbar-height); flex: none; padding: 0 20px; background: var(--surface-card); border-bottom: 1px solid var(--border-default); }
  .wrf-top-search { flex: 1; max-width: 420px; }
  .wrf-top-right { margin-left: auto; display: flex; align-items: center; gap: 6px; }
  .wrf-bell { position: relative; }
  .wrf-bell-dot { position: absolute; top: 5px; right: 5px; min-width: 15px; height: 15px; padding: 0 4px; border-radius: 999px; background: var(--status-critical); color: #fff; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--surface-card); }
  .wrf-conn { display: inline-flex; align-items: center; gap: 7px; height: 28px; padding: 0 10px 0 9px; border-radius: var(--radius-full); border: 1px solid var(--border-default); background: var(--surface-card); cursor: pointer; font-family: var(--font-sans); font-size: 12px; font-weight: 600; color: var(--text-secondary); transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard); }
  .wrf-conn:hover { background: var(--surface-hover); border-color: var(--border-strong); }
  .wrf-conn-dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
  .wrf-conn[data-mode="live"] { color: var(--status-online-text); border-color: color-mix(in srgb, var(--status-online) 35%, transparent); background: var(--status-online-bg); }
  .wrf-conn[data-mode="live"] .wrf-conn-dot { background: var(--status-online); }
  .wrf-conn[data-mode="demo"] .wrf-conn-dot { background: var(--status-offline); }
  .wrf-conn[data-mode="connecting"] .wrf-conn-dot { background: var(--status-degraded); }
  .wrf-conn-org { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .wrf-live { display: inline-flex; align-items: center; gap: 7px; height: 28px; padding: 0 11px; border-radius: var(--radius-full); border: 1px solid var(--border-default); background: var(--surface-card); cursor: pointer; font-family: var(--font-sans); font-size: 12px; font-weight: 600; color: var(--text-tertiary); transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard); }
  .wrf-live:hover { background: var(--surface-hover); }
  .wrf-live-dot { width: 7px; height: 7px; border-radius: 50%; flex: none; background: var(--slate-400); }
  .wrf-live[data-on="true"] { color: var(--status-online-text); border-color: color-mix(in srgb, var(--status-online) 35%, transparent); }
  .wrf-live[data-on="true"] .wrf-live-dot { background: var(--status-online); }
  .wrf-live[data-sweeping="true"] .wrf-live-dot { animation: wrf-ping-dot var(--pulse-period, 2s) var(--ease-decel) infinite; }
  @keyframes wrf-ping-dot { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--status-online) 60%, transparent); } 70%, 100% { box-shadow: 0 0 0 6px transparent; } }
  @media (prefers-reduced-motion: reduce) { .wrf-live[data-sweeping="true"] .wrf-live-dot { animation: none; } }
  .wrf-langtoggle { display: inline-flex; align-items: center; gap: 1px; height: 28px; padding: 2px; border-radius: var(--radius-full); border: 1px solid var(--border-default); background: var(--surface-card); }
  .wrf-langtoggle button { height: 22px; min-width: 30px; padding: 0 8px; border: none; background: transparent; border-radius: var(--radius-full); cursor: pointer; font-family: var(--font-sans); font-size: 11px; font-weight: 700; letter-spacing: 0.03em; color: var(--text-tertiary); transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard); }
  .wrf-langtoggle button:hover { color: var(--text-secondary); }
  .wrf-langtoggle button[data-on="true"] { background: var(--accent-subtle); color: var(--accent-active); }
  .wrf-content { flex: 1; overflow-y: auto; }
  .wrf-content-inner { max-width: var(--content-max); margin: 0 auto; padding: 22px 24px 48px; }
  `;

  function inject() {
    if (document.getElementById('wrf-shell-css')) return;
    const el = document.createElement('style'); el.id = 'wrf-shell-css'; el.textContent = CSS; document.head.appendChild(el);
  }

  const NAV = [
    { sec: 'Fleet' },
    { id: 'overview', label: 'Overview', icon: 'layout-dashboard' },
    { id: 'devices', label: 'Devices', icon: 'monitor', countKey: 'devices' },
    { id: 'workspaces', label: 'Workspaces', icon: 'layout-grid', countKey: 'workspaces' },
    { sec: 'Configure' },
    { id: 'presets', label: 'Config presets', icon: 'layers' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  function Sidebar({ active, onNav, store, onConnectClick, bell }) {
    const live = store.mode === 'live';
    const deviceN = store.devices.length;
    const siteN = window.WRF_DATA.sites().length;
    const counts = { devices: deviceN, workspaces: store.workspaces.length, alerts: bell };
    return (
      React.createElement('aside', { className: 'wrf-side' },
        React.createElement('div', { className: 'wrf-side-top' },
          React.createElement('img', { className: 'wrf-side-mark', src: (window.__resources && window.__resources.mark) || '../../assets/werofleet-mark.svg', alt: '' }),
          React.createElement('div', null,
            React.createElement('div', { className: 'wrf-side-name' }, 'WeRoFleet'),
            React.createElement('div', { className: 'wrf-side-sub' }, 'Console'),
          ),
        ),
        React.createElement('nav', { className: 'wrf-nav' },
          NAV.map((n, i) => n.sec
            ? React.createElement('div', { key: 'sec' + i, className: 'wrf-nav-sec' }, t(n.sec))
            : React.createElement('button', { key: n.id, className: 'wrf-nav-item', 'data-active': active === n.id ? 'true' : undefined, onClick: () => onNav(n.id) },
                I(n.icon),
                React.createElement('span', null, t(n.label)),
                n.badgeKey && counts[n.badgeKey] > 0 ? React.createElement('span', { className: 'wrf-nav-grow' },
                  React.createElement(Badge, { tone: 'critical', shape: 'pill' }, counts[n.badgeKey])) : null,
                n.countKey ? React.createElement('span', { className: 'wrf-nav-grow', style: { fontSize: 11, color: 'var(--text-tertiary)', fontVariantNumeric: 'tabular-nums' } }, counts[n.countKey]) : null,
              )
          ),
        ),
        React.createElement('div', { className: 'wrf-side-foot' },
          React.createElement('button', { className: 'wrf-org', onClick: onConnectClick },
            React.createElement(Avatar, { name: live && store.org ? store.org.name : t('Demo'), kind: 'device', size: 'sm' }),
            React.createElement('div', { style: { minWidth: 0, flex: 1, textAlign: 'left' } },
              React.createElement('div', { className: 'wrf-org-name', style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, live && store.org ? store.org.name : t('Demo fleet')),
              React.createElement('div', { className: 'wrf-org-meta' }, live ? (t('{n} devices', { n: deviceN }) + (siteN ? ' · ' + t('{n} sites', { n: siteN }) : '')) : t('Not connected · sample data')),
            ),
            React.createElement('span', { style: { marginLeft: 'auto', color: 'var(--text-tertiary)' } }, I(live ? 'chevrons-up-down' : 'plug', { width: 15, height: 15 })),
          ),
        ),
      )
    );
  }

  const I18N = window.WRF_I18N;
  // Compact FR | EN switch. Subscribes to the i18n store so it (and, via AppShell
  // re-render, the whole tree) reflows on language change.
  function LangToggle() {
    const lang = I18N.useStore();
    return React.createElement('div', { className: 'wrf-langtoggle', role: 'group', 'aria-label': t('Language') },
      I18N.SUPPORTED.map((l) => React.createElement('button', {
        key: l, type: 'button', 'data-on': lang === l ? 'true' : undefined,
        'aria-pressed': lang === l, onClick: () => I18N.setLang(l),
        title: l === 'fr' ? t('Français') : t('English'),
      }, l.toUpperCase())));
  }

  function ConnPill({ store, onConnectClick }) {
    const mode = store.status === 'connecting' ? 'connecting' : store.mode;
    const label = store.status === 'connecting' ? t('Connecting…')
      : store.mode === 'live' ? (store.org && store.org.name ? store.org.name : t('Connected'))
      : t('Demo data');
    return React.createElement('button', { className: 'wrf-conn', 'data-mode': mode, onClick: onConnectClick, title: store.mode === 'live' ? t('Connected to Webex — manage connection') : t('Connect to your Webex org') },
      React.createElement('span', { className: 'wrf-conn-dot' }),
      React.createElement('span', { className: 'wrf-conn-org' }, label),
      I(store.mode === 'live' ? 'chevron-down' : 'plug', { width: 13, height: 13 }),
    );
  }

  function LivePill({ pollOn, sweeping, onTogglePoll }) {
    return React.createElement(Tooltip, { label: pollOn ? t('Live status polling on (3 req/s, low priority) — click to pause') : t('Status polling paused — click to resume') },
      React.createElement('button', { className: 'wrf-live', 'data-on': pollOn ? 'true' : undefined, 'data-sweeping': (pollOn && sweeping) ? 'true' : undefined, onClick: onTogglePoll },
        React.createElement('span', { className: 'wrf-live-dot' }),
        React.createElement('span', null, pollOn ? (sweeping ? t('Polling…') : t('Live')) : t('Paused')),
      ));
  }

  function TopBar({ theme, onToggleTheme, store, onConnectClick, onRefresh, bell, pollOn, sweeping, onTogglePoll }) {
    const live = store.mode === 'live';
    return (
      React.createElement('header', { className: 'wrf-top' },
        React.createElement('div', { className: 'wrf-top-search' },
          React.createElement(Input, { leadingIcon: I('search'), placeholder: t('Search devices, rooms, serials…'), size: 'sm' }),
        ),
        React.createElement('div', { className: 'wrf-top-right' },
          React.createElement(ConnPill, { store, onConnectClick }),
          live ? React.createElement(LivePill, { pollOn, sweeping, onTogglePoll }) : null,
          live ? React.createElement(Tooltip, { label: t('Re-sync devices now') },
            React.createElement(IconButton, { variant: 'ghost', icon: I('refresh-cw'), label: t('Refresh'), onClick: onRefresh })) : null,
          React.createElement('div', { style: { width: 1, height: 24, background: 'var(--border-default)', margin: '0 2px' } }),
          React.createElement(LangToggle),
          React.createElement(Tooltip, { label: theme === 'dark' ? t('Light mode') : t('Dark mode') },
            React.createElement(IconButton, { variant: 'ghost', icon: I(theme === 'dark' ? 'sun' : 'moon'), label: t('Theme'), onClick: onToggleTheme })),
          React.createElement('span', { className: 'wrf-bell' },
            React.createElement(IconButton, { variant: 'ghost', icon: I('bell'), label: t('Notifications') }),
            bell > 0 ? React.createElement('span', { className: 'wrf-bell-dot' }, bell) : null,
          ),
          React.createElement('div', { style: { width: 1, height: 24, background: 'var(--border-default)', margin: '0 4px' } }),
          React.createElement(Avatar, { name: store.me && store.me.displayName ? store.me.displayName : 'Jordan Reyes', size: 'sm', statusColor: 'var(--status-online)' }),
        )
      )
    );
  }

  function AppShell({ active, onNav, theme, onToggleTheme, store, onConnectClick, onRefresh, bell, pollOn, sweeping, onTogglePoll, children }) {
    useEffect(() => { inject(); });
    return (
      React.createElement('div', { className: 'wrf-app', 'data-theme': theme },
        React.createElement(Sidebar, { active, onNav, store, onConnectClick, bell }),
        React.createElement('div', { className: 'wrf-main' },
          React.createElement(TopBar, { theme, onToggleTheme, store, onConnectClick, onRefresh, bell, pollOn, sweeping, onTogglePoll }),
          React.createElement('div', { className: 'wrf-content' },
            React.createElement('div', { className: 'wrf-content-inner' }, children),
          ),
        ),
      )
    );
  }

  window.WRF_SHELL = { AppShell, Sidebar, TopBar, I };
})();
