import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-status {
  display: inline-flex; align-items: center; gap: var(--space-1-5);
  height: 20px; padding: 0 var(--space-2) 0 var(--space-1-5);
  font-family: var(--font-sans);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide); line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
}
.wrf-status[data-state="online"]   { background: var(--status-online-bg);   color: var(--status-online-text); }
.wrf-status[data-state="incall"]   { background: var(--status-incall-bg);   color: var(--status-incall-text); }
.wrf-status[data-state="degraded"] { background: var(--status-degraded-bg); color: var(--status-degraded-text); }
.wrf-status[data-state="critical"] { background: var(--status-critical-bg); color: var(--status-critical-text); }
.wrf-status[data-state="offline"]  { background: var(--status-offline-bg);  color: var(--status-offline-text); }
.wrf-status[data-plain="true"] { background: transparent; padding: 0; gap: var(--space-2); }

.wrf-status-dot {
  position: relative; width: 7px; height: 7px; border-radius: 50%; flex: none;
  background: var(--_dot);
}
.wrf-status[data-state="online"]   { --_dot: var(--status-online); }
.wrf-status[data-state="incall"]   { --_dot: var(--status-incall); }
.wrf-status[data-state="degraded"] { --_dot: var(--status-degraded); }
.wrf-status[data-state="critical"] { --_dot: var(--status-critical); }
.wrf-status[data-state="offline"]  { --_dot: var(--status-offline); }

/* live ping for in-call & critical */
.wrf-status[data-live="true"] .wrf-status-dot::after {
  content: ''; position: absolute; inset: 0; border-radius: 50%;
  background: var(--_dot);
  animation: wrf-ping var(--pulse-period) var(--ease-decel) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .wrf-status[data-live="true"] .wrf-status-dot::after { animation: none; }
}
`;

const LABELS = {
  online: 'Online', incall: 'In call', degraded: 'Degraded',
  critical: 'Critical', offline: 'Offline',
};

/**
 * Live device-state pill with a status dot. The canonical way to show whether a
 * Room Kit is online, in a call, degraded, critical, or offline.
 */
export function StatusBadge({
  state = 'online',
  label,
  live,
  plain = false,
  ...rest
}) {
  useInject('wrf-status-css', CSS);
  const isLive = live ?? (state === 'incall' || state === 'critical');
  return (
    <span
      className="wrf-status"
      data-state={state}
      data-live={isLive ? 'true' : undefined}
      data-plain={plain ? 'true' : undefined}
      {...rest}
    >
      <span className="wrf-status-dot" />
      {label ?? LABELS[state]}
    </span>
  );
}
