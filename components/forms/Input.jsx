import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-field { display: flex; flex-direction: column; gap: var(--space-1-5); min-width: 0; }
.wrf-field-label {
  font-size: var(--text-xs); font-weight: var(--weight-semibold);
  color: var(--text-secondary);
}
.wrf-field-label .wrf-req { color: var(--red-500); margin-left: 2px; }
.wrf-input-wrap {
  display: flex; align-items: center; gap: var(--space-2);
  height: var(--control-md);
  padding: 0 var(--pad-control);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border-default);
  border-radius: var(--radius-sm);
  transition: border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard);
}
.wrf-input-wrap[data-size="sm"] { height: var(--control-sm); }
.wrf-input-wrap[data-size="lg"] { height: var(--control-lg); }
.wrf-input-wrap:hover:not([data-disabled]) { border-color: var(--border-strong); }
.wrf-input-wrap:focus-within { border-color: var(--border-focus); box-shadow: var(--focus-ring); }
.wrf-input-wrap[data-invalid="true"] { border-color: var(--red-500); }
.wrf-input-wrap[data-invalid="true"]:focus-within { box-shadow: 0 0 0 3px color-mix(in srgb, var(--red-500) 28%, transparent); }
.wrf-input-wrap[data-disabled] { background: var(--surface-disabled); cursor: not-allowed; }
.wrf-input-wrap[data-disabled] input { cursor: not-allowed; }
.wrf-input {
  flex: 1; min-width: 0; border: none; outline: none; background: transparent;
  font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-primary);
}
.wrf-input::placeholder { color: var(--text-tertiary); }
.wrf-input[data-mono="true"] { font-family: var(--font-mono); letter-spacing: var(--tracking-mono); }
.wrf-input-wrap .wrf-affix { display: inline-flex; color: var(--text-tertiary); flex: none; }
.wrf-input-wrap .wrf-affix svg, .wrf-input-wrap .wrf-affix i { width: 15px; height: 15px; }
.wrf-field-hint { font-size: var(--text-xs); color: var(--text-tertiary); }
.wrf-field-hint[data-invalid="true"] { color: var(--red-600); }
`;

/**
 * Single-line text input with optional label, lead/trail affixes, and validation.
 */
export function Input({
  label,
  hint,
  error,
  leadingIcon = null,
  trailingIcon = null,
  size = 'md',
  mono = false,
  required = false,
  disabled = false,
  id,
  ...rest
}) {
  useInject('wrf-input-css', CSS);
  const invalid = !!error;
  const fid = id || (label ? `wrf-${String(label).replace(/\s+/g, '-').toLowerCase()}` : undefined);
  return (
    <label className="wrf-field" htmlFor={fid}>
      {label && <span className="wrf-field-label">{label}{required && <span className="wrf-req">*</span>}</span>}
      <span className="wrf-input-wrap" data-size={size} data-invalid={invalid ? 'true' : undefined} data-disabled={disabled ? '' : undefined}>
        {leadingIcon && <span className="wrf-affix">{leadingIcon}</span>}
        <input id={fid} className="wrf-input" data-mono={mono ? 'true' : undefined} disabled={disabled} aria-invalid={invalid} {...rest} />
        {trailingIcon && <span className="wrf-affix">{trailingIcon}</span>}
      </span>
      {(error || hint) && <span className="wrf-field-hint" data-invalid={invalid ? 'true' : undefined}>{error || hint}</span>}
    </label>
  );
}
