import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-iconbtn {
  --_s: var(--control-md);
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--_s); height: var(--_s);
  border-radius: var(--radius-sm);
  border: var(--border-width) solid transparent;
  background: transparent; color: var(--text-secondary);
  cursor: pointer; flex: none;
  transition: background-color var(--dur-fast) var(--ease-standard),
              color var(--dur-fast) var(--ease-standard),
              border-color var(--dur-fast) var(--ease-standard),
              box-shadow var(--dur-fast) var(--ease-standard);
}
.wrf-iconbtn[data-size="sm"] { --_s: var(--control-sm); }
.wrf-iconbtn[data-size="lg"] { --_s: var(--control-lg); }
.wrf-iconbtn:hover:not(:disabled) { background: var(--surface-hover); color: var(--text-primary); }
.wrf-iconbtn:active:not(:disabled) { background: var(--surface-active); }
.wrf-iconbtn:focus-visible { outline: none; box-shadow: var(--focus-ring); }
.wrf-iconbtn:disabled { cursor: not-allowed; opacity: 0.45; }
.wrf-iconbtn[data-variant="outline"] { border-color: var(--border-default); background: var(--surface-card); }
.wrf-iconbtn[data-variant="outline"]:hover:not(:disabled) { border-color: var(--border-strong); }
.wrf-iconbtn[data-variant="solid"] { background: var(--accent); color: var(--accent-on); }
.wrf-iconbtn[data-variant="solid"]:hover:not(:disabled) { background: var(--accent-hover); }
.wrf-iconbtn[data-variant="danger"] { color: var(--red-500); }
.wrf-iconbtn[data-variant="danger"]:hover:not(:disabled) { background: var(--red-50); color: var(--red-600); }
.wrf-iconbtn svg, .wrf-iconbtn i { width: 1.07em; height: 1.07em; }
.wrf-iconbtn { font-size: var(--text-base); }
`;

/**
 * Square icon-only button for toolbars, table row actions, and chrome.
 */
export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  ...rest
}) {
  useInject('wrf-iconbtn-css', CSS);
  return (
    <button
      type="button"
      className="wrf-iconbtn"
      data-variant={variant}
      data-size={size}
      aria-label={label}
      title={label}
      disabled={disabled}
      {...rest}
    >
      {icon}
    </button>
  );
}
