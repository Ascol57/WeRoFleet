import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-tabs { display: flex; align-items: stretch; gap: var(--space-1); max-width: 100%; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.wrf-tabs::-webkit-scrollbar { display: none; }
.wrf-tabs[data-variant="underline"] { gap: var(--space-5); border-bottom: var(--border-width) solid var(--border-subtle); }
.wrf-tab {
  position: relative; flex: none; display: inline-flex; align-items: center; gap: var(--space-2);
  border: none; background: transparent; cursor: pointer;
  font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--weight-medium);
  color: var(--text-secondary); white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard);
}
.wrf-tab svg, .wrf-tab i { width: 15px; height: 15px; }
.wrf-tab:hover { color: var(--text-primary); }

/* underline variant */
.wrf-tabs[data-variant="underline"] .wrf-tab { height: 38px; padding: 0 1px; }
.wrf-tabs[data-variant="underline"] .wrf-tab::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background: var(--accent); border-radius: 2px 2px 0 0;
  transform: scaleX(0); transition: transform var(--dur-fast) var(--ease-emphasized);
}
.wrf-tabs[data-variant="underline"] .wrf-tab[data-active="true"] { color: var(--text-primary); font-weight: var(--weight-semibold); }
.wrf-tabs[data-variant="underline"] .wrf-tab[data-active="true"]::after { transform: scaleX(1); }

/* pill / segmented variant */
.wrf-tabs[data-variant="pill"] { background: var(--surface-sunken); padding: var(--space-1); border-radius: var(--radius-sm); border: var(--border-width) solid var(--border-subtle); width: max-content; max-width: 100%; }
.wrf-tabs[data-variant="pill"] .wrf-tab { height: 28px; padding: 0 var(--space-3); border-radius: var(--radius-xs); }
.wrf-tabs[data-variant="pill"] .wrf-tab[data-active="true"] { background: var(--surface-card); color: var(--text-primary); font-weight: var(--weight-semibold); box-shadow: var(--shadow-xs); }

.wrf-tab:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-xs); }
.wrf-tab-count {
  display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 16px;
  padding: 0 5px; border-radius: var(--radius-full);
  background: var(--slate-150); color: var(--text-secondary);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold); font-feature-settings: 'tnum' 1;
}
.wrf-tab[data-active="true"] .wrf-tab-count { background: var(--accent-subtle); color: var(--accent-active); }
`;

/**
 * Horizontal tab strip — underline (page sections) or pill (segmented control).
 * Controlled: pass `value` + `onChange`. Each tab: {value,label,icon?,count?}.
 */
export function Tabs({
  tabs = [],
  value,
  onChange = () => {},
  variant = 'underline',
  ...rest
}) {
  useInject('wrf-tabs-css', CSS);
  return (
    <div className="wrf-tabs" data-variant={variant} role="tablist" {...rest}>
      {tabs.map((t) => (
        <button
          key={t.value}
          type="button"
          role="tab"
          className="wrf-tab"
          data-active={value === t.value ? 'true' : undefined}
          aria-selected={value === t.value}
          onClick={() => onChange(t.value)}
        >
          {t.icon}
          {t.label}
          {t.count != null && <span className="wrf-tab-count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}
