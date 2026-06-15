import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-metric {
  display: flex; flex-direction: column; gap: var(--space-1);
  min-width: 0;
}
.wrf-metric-label {
  display: flex; align-items: center; gap: var(--space-1-5);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-caps); text-transform: uppercase;
  color: var(--text-tertiary);
}
.wrf-metric-label svg, .wrf-metric-label i { width: 13px; height: 13px; }
.wrf-metric-value {
  display: flex; align-items: baseline; gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-4xl); font-weight: var(--weight-semibold);
  line-height: 1; color: var(--text-primary);
  font-feature-settings: 'tnum' 1;
}
.wrf-metric[data-size="sm"] .wrf-metric-value { font-size: var(--text-2xl); }
.wrf-metric-unit { font-size: var(--text-md); font-weight: var(--weight-medium); color: var(--text-tertiary); }
.wrf-metric-foot { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-xs); color: var(--text-tertiary); }
.wrf-metric-delta {
  display: inline-flex; align-items: center; gap: 2px;
  font-weight: var(--weight-semibold); font-feature-settings: 'tnum' 1;
}
.wrf-metric-delta[data-trend="up"]   { color: var(--status-online-text); }
.wrf-metric-delta[data-trend="down"] { color: var(--status-critical-text); }
.wrf-metric-delta[data-trend="flat"] { color: var(--text-tertiary); }
.wrf-metric-delta svg, .wrf-metric-delta i { width: 12px; height: 12px; }
`;

const ARROW = { up: 'arrow-up-right', down: 'arrow-down-right', flat: 'minus' };

/**
 * KPI tile for the fleet dashboard — a labelled headline number with optional
 * unit, trend delta, and footnote. Drop inside a Card or a metric strip.
 */
export function MetricStat({
  label,
  value,
  unit,
  icon = null,
  delta = null,
  trend = 'flat',
  footnote = null,
  size = 'md',
  ...rest
}) {
  useInject('wrf-metric-css', CSS);
  return (
    <div className="wrf-metric" data-size={size} {...rest}>
      <div className="wrf-metric-label">{icon}{label}</div>
      <div className="wrf-metric-value">
        {value}
        {unit && <span className="wrf-metric-unit">{unit}</span>}
      </div>
      {(delta != null || footnote) && (
        <div className="wrf-metric-foot">
          {delta != null && (
            <span className="wrf-metric-delta" data-trend={trend}>
              <i data-lucide={ARROW[trend]} />{delta}
            </span>
          )}
          {footnote && <span>{footnote}</span>}
        </div>
      )}
    </div>
  );
}
