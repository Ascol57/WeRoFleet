import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-badge {
  display: inline-flex; align-items: center; gap: var(--space-1);
  height: 18px; padding: 0 var(--space-1-5);
  font-family: var(--font-sans);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold);
  line-height: 1; letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-xs);
  border: var(--border-width) solid transparent;
  white-space: nowrap;
}
.wrf-badge[data-shape="pill"] { border-radius: var(--radius-full); padding: 0 var(--space-2); }
.wrf-badge[data-tone="neutral"]  { background: var(--slate-100); color: var(--slate-600); }
.wrf-badge[data-tone="accent"]   { background: var(--accent-subtle); color: var(--accent-active); }
.wrf-badge[data-tone="online"]   { background: var(--status-online-bg);   color: var(--status-online-text); }
.wrf-badge[data-tone="incall"]   { background: var(--status-incall-bg);   color: var(--status-incall-text); }
.wrf-badge[data-tone="degraded"] { background: var(--status-degraded-bg); color: var(--status-degraded-text); }
.wrf-badge[data-tone="critical"] { background: var(--status-critical-bg); color: var(--status-critical-text); }
.wrf-badge[data-tone="offline"]  { background: var(--status-offline-bg);  color: var(--status-offline-text); }
.wrf-badge[data-outline="true"] { background: transparent; border-color: currentColor; }
.wrf-badge svg, .wrf-badge i { width: 11px; height: 11px; }
`;

/**
 * Compact count / label badge. For device counts, version tags, "NEW",
 * unread alert counts. For live device state use StatusBadge instead.
 */
export function Badge({
  tone = 'neutral',
  shape = 'rounded',
  outline = false,
  children,
  ...rest
}) {
  useInject('wrf-badge-css', CSS);
  return (
    <span
      className="wrf-badge"
      data-tone={tone}
      data-shape={shape}
      data-outline={outline ? 'true' : undefined}
      {...rest}
    >
      {children}
    </span>
  );
}
