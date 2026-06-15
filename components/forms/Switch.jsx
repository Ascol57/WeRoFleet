import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-switch {
  display: inline-flex; align-items: center; gap: var(--space-2);
  cursor: pointer; user-select: none;
  font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-primary);
}
.wrf-switch[data-disabled="true"] { cursor: not-allowed; opacity: 0.5; }
.wrf-switch input { position: absolute; opacity: 0; width: 0; height: 0; }
.wrf-switch-track {
  position: relative; flex: none;
  width: 34px; height: 20px; border-radius: var(--radius-full);
  background: var(--slate-300);
  transition: background var(--dur-fast) var(--ease-standard);
}
.wrf-switch[data-size="sm"] .wrf-switch-track { width: 28px; height: 16px; }
.wrf-switch-thumb {
  position: absolute; top: 2px; left: 2px;
  width: 16px; height: 16px; border-radius: 50%;
  background: #fff; box-shadow: var(--shadow-sm);
  transition: transform var(--dur-fast) var(--ease-spring);
}
.wrf-switch[data-size="sm"] .wrf-switch-thumb { width: 12px; height: 12px; }
.wrf-switch input:checked + .wrf-switch-track { background: var(--accent); }
.wrf-switch input:checked + .wrf-switch-track .wrf-switch-thumb { transform: translateX(14px); }
.wrf-switch[data-size="sm"] input:checked + .wrf-switch-track .wrf-switch-thumb { transform: translateX(12px); }
.wrf-switch input:focus-visible + .wrf-switch-track { box-shadow: var(--focus-ring); }
.wrf-switch-text { display: flex; flex-direction: column; gap: 1px; }
.wrf-switch-desc { font-size: var(--text-xs); color: var(--text-tertiary); }
`;

/**
 * On/off toggle for instant-apply settings (auto-update, do-not-disturb,
 * presence broadcast). Use Checkbox for form submissions instead.
 */
export function Switch({
  label,
  description,
  size = 'md',
  disabled = false,
  ...rest
}) {
  useInject('wrf-switch-css', CSS);
  return (
    <label className="wrf-switch" data-size={size} data-disabled={disabled ? 'true' : undefined}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="wrf-switch-track"><span className="wrf-switch-thumb" /></span>
      {(label || description) && (
        <span className="wrf-switch-text">
          {label && <span>{label}</span>}
          {description && <span className="wrf-switch-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}
