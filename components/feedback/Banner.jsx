import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-banner {
  display: flex; align-items: flex-start; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-sans); font-size: var(--text-sm); line-height: var(--leading-snug);
}
.wrf-banner[data-flush="true"] { border-radius: 0; border-left: none; border-right: none; border-top: none; }
.wrf-banner-icon { flex: none; margin-top: 1px; }
.wrf-banner-icon svg, .wrf-banner-icon i { width: 16px; height: 16px; }
.wrf-banner-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.wrf-banner-title { font-weight: var(--weight-semibold); color: var(--text-primary); }
.wrf-banner-msg { color: var(--text-secondary); }
.wrf-banner-actions { display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-1); }
.wrf-banner-close {
  flex: none; border: none; background: transparent; cursor: pointer; padding: 2px;
  color: var(--text-tertiary); border-radius: var(--radius-xs); display: inline-flex;
}
.wrf-banner-close:hover { color: var(--text-primary); background: color-mix(in srgb, currentColor 10%, transparent); }
.wrf-banner-close svg, .wrf-banner-close i { width: 14px; height: 14px; }

.wrf-banner[data-tone="info"]     { background: var(--status-incall-bg);   border-color: color-mix(in srgb, var(--status-incall) 30%, transparent); }
.wrf-banner[data-tone="info"]     .wrf-banner-icon { color: var(--status-incall-text); }
.wrf-banner[data-tone="success"]  { background: var(--status-online-bg);   border-color: color-mix(in srgb, var(--status-online) 30%, transparent); }
.wrf-banner[data-tone="success"]  .wrf-banner-icon { color: var(--status-online-text); }
.wrf-banner[data-tone="warning"]  { background: var(--status-degraded-bg); border-color: color-mix(in srgb, var(--status-degraded) 35%, transparent); }
.wrf-banner[data-tone="warning"]  .wrf-banner-icon { color: var(--status-degraded-text); }
.wrf-banner[data-tone="critical"] { background: var(--status-critical-bg); border-color: color-mix(in srgb, var(--status-critical) 35%, transparent); }
.wrf-banner[data-tone="critical"] .wrf-banner-icon { color: var(--status-critical-text); }
.wrf-banner[data-tone="neutral"]  { background: var(--surface-sunken);     border-color: var(--border-default); }
.wrf-banner[data-tone="neutral"]  .wrf-banner-icon { color: var(--text-tertiary); }
`;

const ICONS = {
  info: 'info', success: 'check-circle-2', warning: 'alert-triangle',
  critical: 'alert-octagon', neutral: 'bell',
};

/**
 * Inline alert / system message. For page-level notices (incident, maintenance)
 * and contextual warnings inside panels.
 */
export function Banner({
  tone = 'info',
  title,
  icon,
  flush = false,
  onClose = null,
  actions = null,
  children,
  ...rest
}) {
  useInject('wrf-banner-css', CSS);
  return (
    <div className="wrf-banner" data-tone={tone} data-flush={flush ? 'true' : undefined} role="status" {...rest}>
      <span className="wrf-banner-icon">{icon ?? <i data-lucide={ICONS[tone]} />}</span>
      <div className="wrf-banner-body">
        {title && <div className="wrf-banner-title">{title}</div>}
        {children && <div className="wrf-banner-msg">{children}</div>}
        {actions && <div className="wrf-banner-actions">{actions}</div>}
      </div>
      {onClose && (
        <button type="button" className="wrf-banner-close" aria-label="Dismiss" onClick={onClose}>
          <i data-lucide="x" />
        </button>
      )}
    </div>
  );
}
