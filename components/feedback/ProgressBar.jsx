import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-progress { display: flex; flex-direction: column; gap: var(--space-1-5); }
.wrf-progress-head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-2); font-size: var(--text-xs); }
.wrf-progress-label { font-weight: var(--weight-medium); color: var(--text-secondary); }
.wrf-progress-value { font-variant-numeric: tabular-nums; color: var(--text-tertiary); font-feature-settings: 'tnum' 1; }
.wrf-progress-track {
  position: relative; height: 6px; border-radius: var(--radius-full);
  background: var(--slate-200); overflow: hidden;
}
.wrf-progress[data-size="lg"] .wrf-progress-track { height: 9px; }
.wrf-progress-fill {
  position: absolute; inset: 0 auto 0 0; height: 100%;
  border-radius: var(--radius-full);
  background: var(--accent);
  transition: width var(--dur-slow) var(--ease-decel);
}
.wrf-progress[data-tone="online"]   .wrf-progress-fill { background: var(--status-online); }
.wrf-progress[data-tone="degraded"] .wrf-progress-fill { background: var(--status-degraded); }
.wrf-progress[data-tone="critical"] .wrf-progress-fill { background: var(--status-critical); }
.wrf-progress[data-indeterminate="true"] .wrf-progress-fill {
  width: 35% !important; animation: wrf-indet 1.2s var(--ease-standard) infinite;
}
@keyframes wrf-indet {
  0% { left: -35%; } 100% { left: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .wrf-progress[data-indeterminate="true"] .wrf-progress-fill { animation: none; left: 0; width: 100% !important; opacity: 0.4; }
}
`;

/**
 * Thin determinate (or indeterminate) progress bar — firmware rollout coverage,
 * upload/transfer, storage usage. Optional label + value row.
 */
export function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  valueText,
  tone = 'accent',
  size = 'md',
  indeterminate = false,
  ...rest
}) {
  useInject('wrf-progress-css', CSS);
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className="wrf-progress" data-tone={tone} data-size={size} data-indeterminate={indeterminate ? 'true' : undefined} {...rest}>
      {(label || showValue) && (
        <div className="wrf-progress-head">
          {label && <span className="wrf-progress-label">{label}</span>}
          {showValue && <span className="wrf-progress-value">{valueText ?? `${Math.round(pct)}%`}</span>}
        </div>
      )}
      <div className="wrf-progress-track" role="progressbar" aria-valuenow={indeterminate ? undefined : Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
        <div className="wrf-progress-fill" style={indeterminate ? undefined : { width: `${pct}%` }} />
      </div>
    </div>
  );
}
