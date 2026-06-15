import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-tip { position: relative; display: inline-flex; }
.wrf-tip-bubble {
  position: absolute; z-index: 60;
  pointer-events: none; opacity: 0; transform: translateY(2px);
  transition: opacity var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard);
  max-width: 240px; width: max-content;
  padding: var(--space-1-5) var(--space-2-5, 10px);
  background: var(--slate-900); color: var(--slate-50);
  font-family: var(--font-sans); font-size: var(--text-xs); font-weight: var(--weight-medium);
  line-height: var(--leading-snug); letter-spacing: 0;
  border-radius: var(--radius-sm); box-shadow: var(--shadow-lg);
}
[data-theme="dark"] .wrf-tip-bubble { background: var(--slate-700); }
.wrf-tip-kbd { color: var(--slate-300); font-family: var(--font-mono); font-size: var(--text-2xs); margin-left: var(--space-2); }
.wrf-tip:hover .wrf-tip-bubble, .wrf-tip:focus-within .wrf-tip-bubble { opacity: 1; transform: translateY(0); }
.wrf-tip-bubble[data-side="top"]    { bottom: 100%; left: 50%; transform: translate(-50%, 2px); margin-bottom: 6px; }
.wrf-tip-bubble[data-side="bottom"] { top: 100%; left: 50%; transform: translate(-50%, -2px); margin-top: 6px; }
.wrf-tip-bubble[data-side="left"]   { right: 100%; top: 50%; transform: translate(2px, -50%); margin-right: 6px; }
.wrf-tip-bubble[data-side="right"]  { left: 100%; top: 50%; transform: translate(-2px, -50%); margin-left: 6px; }
.wrf-tip:hover .wrf-tip-bubble[data-side="top"], .wrf-tip:focus-within .wrf-tip-bubble[data-side="top"] { transform: translate(-50%, 0); }
.wrf-tip:hover .wrf-tip-bubble[data-side="bottom"], .wrf-tip:focus-within .wrf-tip-bubble[data-side="bottom"] { transform: translate(-50%, 0); }
.wrf-tip:hover .wrf-tip-bubble[data-side="left"], .wrf-tip:focus-within .wrf-tip-bubble[data-side="left"] { transform: translate(0, -50%); }
.wrf-tip:hover .wrf-tip-bubble[data-side="right"], .wrf-tip:focus-within .wrf-tip-bubble[data-side="right"] { transform: translate(0, -50%); }
@media (prefers-reduced-motion: reduce) { .wrf-tip-bubble { transition: opacity var(--dur-fast) linear; } }
`;

/**
 * Lightweight CSS hover/focus tooltip. Wraps a single interactive child and
 * shows a dark bubble on the chosen side, with an optional keyboard hint.
 */
export function Tooltip({
  label,
  side = 'top',
  kbd = null,
  children,
  ...rest
}) {
  useInject('wrf-tip-css', CSS);
  return (
    <span className="wrf-tip" {...rest}>
      {children}
      <span className="wrf-tip-bubble" data-side={side} role="tooltip">
        {label}
        {kbd && <span className="wrf-tip-kbd">{kbd}</span>}
      </span>
    </span>
  );
}
