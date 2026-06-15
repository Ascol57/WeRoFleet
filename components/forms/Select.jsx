import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-select-field { display: flex; flex-direction: column; gap: var(--space-1-5); min-width: 0; }
.wrf-select-label { font-size: var(--text-xs); font-weight: var(--weight-semibold); color: var(--text-secondary); }
.wrf-select-wrap { position: relative; display: flex; align-items: center; }
.wrf-select {
  appearance: none; -webkit-appearance: none;
  width: 100%; height: var(--control-md);
  padding: 0 calc(var(--pad-control) + 18px) 0 var(--pad-control);
  font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-primary);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border-default);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.wrf-select[data-size="sm"] { height: var(--control-sm); font-size: var(--text-xs); }
.wrf-select[data-size="lg"] { height: var(--control-lg); }
.wrf-select:hover:not(:disabled) { border-color: var(--border-strong); }
.wrf-select:focus-visible { outline: none; border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.wrf-select:disabled { background: var(--surface-disabled); color: var(--text-disabled); cursor: not-allowed; }
.wrf-select-caret {
  position: absolute; right: var(--space-2); pointer-events: none;
  display: inline-flex; color: var(--text-tertiary);
}
.wrf-select-caret svg, .wrf-select-caret i { width: 15px; height: 15px; }
`;

/**
 * Native-backed dropdown select. Pass `options` (string[] or {value,label}[])
 * or `children` <option>s directly.
 */
export function Select({
  label,
  options = null,
  placeholder = null,
  size = 'md',
  disabled = false,
  id,
  children,
  ...rest
}) {
  useInject('wrf-select-css', CSS);
  const fid = id || (label ? `wrf-sel-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const opts = options
    ? options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
    : null;
  return (
    <label className="wrf-select-field" htmlFor={fid}>
      {label && <span className="wrf-select-label">{label}</span>}
      <span className="wrf-select-wrap">
        <select id={fid} className="wrf-select" data-size={size} disabled={disabled} {...rest}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {opts ? opts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>) : children}
        </select>
        <span className="wrf-select-caret"><i data-lucide="chevron-down" /></span>
      </span>
    </label>
  );
}
