import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-check {
  display: inline-flex; align-items: flex-start; gap: var(--space-2);
  cursor: pointer; user-select: none;
  font-family: var(--font-sans); font-size: var(--text-sm); color: var(--text-primary);
}
.wrf-check[data-disabled="true"] { cursor: not-allowed; opacity: 0.5; }
.wrf-check input { position: absolute; opacity: 0; width: 0; height: 0; }
.wrf-check-box {
  display: inline-flex; align-items: center; justify-content: center; flex: none;
  width: 17px; height: 17px; margin-top: 1px;
  border: var(--border-width-strong) solid var(--border-strong);
  border-radius: var(--radius-xs);
  background: var(--surface-card); color: #fff;
  transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard);
}
.wrf-check[data-shape="radio"] .wrf-check-box { border-radius: var(--radius-full); }
.wrf-check-box svg, .wrf-check-box i { width: 12px; height: 12px; opacity: 0; transform: scale(0.6); transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-spring); }
.wrf-check input:checked + .wrf-check-box,
.wrf-check input:indeterminate + .wrf-check-box { background: var(--accent); border-color: var(--accent); }
.wrf-check input:checked + .wrf-check-box svg,
.wrf-check input:checked + .wrf-check-box i { opacity: 1; transform: scale(1); }
.wrf-check input:focus-visible + .wrf-check-box { box-shadow: var(--focus-ring); }
.wrf-check:hover input:not(:checked):not(:disabled) + .wrf-check-box { border-color: var(--accent); }
.wrf-check[data-shape="radio"] .wrf-check-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; opacity: 0; transform: scale(0.4); transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-spring); }
.wrf-check[data-shape="radio"] input:checked + .wrf-check-box .wrf-check-dot { opacity: 1; transform: scale(1); }
.wrf-check-text { display: flex; flex-direction: column; gap: 1px; }
.wrf-check-desc { font-size: var(--text-xs); color: var(--text-tertiary); }
`;

/**
 * Checkbox (default) or radio (`shape="radio"`) with optional label + description.
 * Supports an indeterminate "select-all" state.
 */
export function Checkbox({
  label,
  description,
  shape = 'check',
  indeterminate = false,
  disabled = false,
  ...rest
}) {
  useInject('wrf-check-css', CSS);
  const ref = React.useRef(null);
  React.useEffect(() => { if (ref.current) ref.current.indeterminate = indeterminate; }, [indeterminate]);
  const type = shape === 'radio' ? 'radio' : 'checkbox';
  return (
    <label className="wrf-check" data-shape={shape} data-disabled={disabled ? 'true' : undefined}>
      <input ref={ref} type={type} disabled={disabled} {...rest} />
      <span className="wrf-check-box">
        {shape === 'radio'
          ? <span className="wrf-check-dot" />
          : <i data-lucide={indeterminate ? 'minus' : 'check'} />}
      </span>
      {(label || description) && (
        <span className="wrf-check-text">
          {label && <span>{label}</span>}
          {description && <span className="wrf-check-desc">{description}</span>}
        </span>
      )}
    </label>
  );
}
