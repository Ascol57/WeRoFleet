import React from 'react';

/* WeRoFleet primary action button — solid teal for the main action per view. */
/* Inject component CSS once (self-contained; styling hooks for pseudo-states). */
function useInject(id, css) {
  if (typeof document === 'undefined') return;
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}

const CSS = `
.wrf-btn {
  --_h: var(--control-md);
  display: inline-flex; align-items: center; justify-content: center;
  gap: var(--space-2);
  height: var(--_h);
  padding: 0 var(--space-4);
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--weight-semibold);
  line-height: 1;
  letter-spacing: var(--tracking-normal);
  border-radius: var(--radius-sm);
  border: var(--border-width) solid transparent;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  transition: background-color var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard),
              transform var(--dur-fast) var(--ease-standard);
}
.wrf-btn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.wrf-btn:active { transform: translateY(0.5px); }
.wrf-btn:disabled { cursor: not-allowed; opacity: 0.5; transform: none; box-shadow: none; }

.wrf-btn[data-size="sm"] { --_h: var(--control-sm); padding: 0 var(--space-3); font-size: var(--text-xs); }
.wrf-btn[data-size="lg"] { --_h: var(--control-lg); padding: 0 var(--space-5); font-size: var(--text-base); }
.wrf-btn[data-block="true"] { display: flex; width: 100%; }

/* primary */
.wrf-btn[data-variant="primary"] { background: var(--accent); color: var(--accent-on); }
.wrf-btn[data-variant="primary"]:hover:not(:disabled) { background: var(--accent-hover); }
.wrf-btn[data-variant="primary"]:active:not(:disabled) { background: var(--accent-active); }

/* secondary (outlined) */
.wrf-btn[data-variant="secondary"] { background: var(--surface-card); color: var(--text-primary); border-color: var(--border-default); }
.wrf-btn[data-variant="secondary"]:hover:not(:disabled) { background: var(--surface-hover); border-color: var(--border-strong); }
.wrf-btn[data-variant="secondary"]:active:not(:disabled) { background: var(--surface-active); }

/* ghost */
.wrf-btn[data-variant="ghost"] { background: transparent; color: var(--text-secondary); }
.wrf-btn[data-variant="ghost"]:hover:not(:disabled) { background: var(--surface-hover); color: var(--text-primary); }
.wrf-btn[data-variant="ghost"]:active:not(:disabled) { background: var(--surface-active); }

/* danger */
.wrf-btn[data-variant="danger"] { background: var(--red-500); color: #fff; }
.wrf-btn[data-variant="danger"]:hover:not(:disabled) { background: var(--red-600); }
.wrf-btn[data-variant="danger"]:active:not(:disabled) { background: var(--red-700); }

.wrf-btn svg { width: 1.07em; height: 1.07em; flex: none; }
`;

/**
 * WeRoFleet primary action button.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  leadingIcon = null,
  trailingIcon = null,
  type = 'button',
  disabled = false,
  children,
  ...rest
}) {
  useInject('wrf-button-css', CSS);
  return (
    <button
      type={type}
      className="wrf-btn"
      data-variant={variant}
      data-size={size}
      data-block={block ? 'true' : undefined}
      disabled={disabled}
      {...rest}
    >
      {leadingIcon}
      {children != null && <span>{children}</span>}
      {trailingIcon}
    </button>
  );
}
