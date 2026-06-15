import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-avatar-wrap {
  --_s: 32px;
  position: relative; display: inline-flex; flex: none;
  width: var(--_s); height: var(--_s); vertical-align: middle;
}
.wrf-avatar-wrap[data-size="xs"] { --_s: 22px; }
.wrf-avatar-wrap[data-size="sm"] { --_s: 28px; }
.wrf-avatar-wrap[data-size="lg"] { --_s: 40px; }
.wrf-avatar-wrap[data-size="xl"] { --_s: 56px; }
.wrf-avatar {
  position: relative; display: inline-flex; align-items: center; justify-content: center;
  width: 100%; height: 100%;
  border-radius: var(--radius-full);
  background: var(--accent-subtle); color: var(--accent-active);
  font-family: var(--font-sans); font-weight: var(--weight-semibold);
  font-size: calc(var(--_s) * 0.4); letter-spacing: 0;
  overflow: hidden; user-select: none;
}
.wrf-avatar-wrap[data-shape="square"] .wrf-avatar { border-radius: var(--radius-sm); }
.wrf-avatar[data-kind="device"] { background: var(--slate-150); color: var(--slate-600); border-radius: var(--radius-sm); }
.wrf-avatar img { width: 100%; height: 100%; object-fit: cover; }
.wrf-avatar svg, .wrf-avatar i { width: 55%; height: 55%; }
.wrf-avatar-ring {
  position: absolute; right: 0; bottom: 0; z-index: 1;
  width: 30%; height: 30%; min-width: 9px; min-height: 9px;
  border-radius: 50%; border: 2px solid var(--surface-card);
  box-sizing: border-box;
}
[data-theme="dark"] .wrf-avatar[data-kind="device"] { background: var(--slate-800); color: var(--slate-300); }
`;

const PALETTE = [
  ['var(--teal-50)', 'var(--teal-700)'],
  ['var(--blue-50)', 'var(--blue-700)'],
  ['var(--violet-100)', 'var(--violet-500)'],
  ['var(--amber-50)', 'var(--amber-700)'],
  ['var(--green-50)', 'var(--green-700)'],
];

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}
function hashIndex(str, mod) {
  let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return Math.abs(h) % mod;
}

/**
 * Round avatar for a person (initials or photo) or a square device glyph.
 * Initials get a deterministic color from the name.
 */
export function Avatar({
  name = '',
  src = null,
  icon = null,
  kind = 'user',
  size = 'md',
  shape = 'circle',
  statusColor = null,
  ...rest
}) {
  useInject('wrf-avatar-css', CSS);
  const isDevice = kind === 'device';
  const [bg, fg] = !isDevice && name ? PALETTE[hashIndex(name, PALETTE.length)] : [null, null];
  const style = bg && !src && !icon ? { background: bg, color: fg } : undefined;
  return (
    <span
      className="wrf-avatar-wrap"
      data-size={size}
      data-shape={shape}
      aria-label={name || undefined}
      {...rest}
    >
      <span className="wrf-avatar" data-kind={kind} style={style}>
        {src ? <img src={src} alt={name} />
          : icon ? icon
          : isDevice ? <i data-lucide="monitor" />
          : initials(name)}
      </span>
      {statusColor && <span className="wrf-avatar-ring" style={{ background: statusColor }} />}
    </span>
  );
}
