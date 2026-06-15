import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-tag {
  display: inline-flex; align-items: center; gap: var(--space-1);
  height: 22px; padding: 0 var(--space-2);
  font-family: var(--font-sans); font-size: var(--text-xs); font-weight: var(--weight-medium);
  color: var(--text-secondary);
  background: var(--surface-card);
  border: var(--border-width) solid var(--border-default);
  border-radius: var(--radius-xs);
  white-space: nowrap;
}
.wrf-tag[data-interactive="true"] { cursor: pointer; transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard); }
.wrf-tag[data-interactive="true"]:hover { background: var(--surface-hover); border-color: var(--border-strong); }
.wrf-tag[data-selected="true"] { background: var(--accent-subtle); border-color: var(--accent); color: var(--accent-active); }
.wrf-tag i, .wrf-tag svg { width: 12px; height: 12px; }
.wrf-tag-x {
  display: inline-flex; align-items: center; justify-content: center;
  width: 14px; height: 14px; margin-right: -2px; border-radius: var(--radius-full);
  color: var(--text-tertiary); cursor: pointer; border: none; background: transparent; padding: 0;
}
.wrf-tag-x:hover { background: var(--slate-200); color: var(--text-primary); }
.wrf-tag-dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
`;

/**
 * Removable / selectable chip — filters, location tags, group labels,
 * assigned peripherals. Optional leading color dot and dismiss affordance.
 */
export function Tag({
  children,
  dotColor = null,
  selected = false,
  onRemove = null,
  onClick = null,
  leadingIcon = null,
  ...rest
}) {
  useInject('wrf-tag-css', CSS);
  const interactive = !!onClick || selected;
  return (
    <span
      className="wrf-tag"
      data-interactive={interactive ? 'true' : undefined}
      data-selected={selected ? 'true' : undefined}
      onClick={onClick}
      {...rest}
    >
      {dotColor && <span className="wrf-tag-dot" style={{ background: dotColor }} />}
      {leadingIcon}
      {children}
      {onRemove && (
        <button
          type="button"
          className="wrf-tag-x"
          aria-label="Remove"
          onClick={(e) => { e.stopPropagation(); onRemove(e); }}
        >
          <i data-lucide="x" style={{ width: 11, height: 11 }} />
        </button>
      )}
    </span>
  );
}
