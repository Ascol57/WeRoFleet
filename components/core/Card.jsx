import React from 'react';

function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id; el.textContent = css; document.head.appendChild(el);
}

const CSS = `
.wrf-card {
  background: var(--surface-card);
  border: var(--border-width) solid var(--border-subtle);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
}
.wrf-card[data-pad="true"] { padding: var(--pad-card); }
.wrf-card[data-elevation="flat"]  { box-shadow: none; }
.wrf-card[data-elevation="raised"]{ box-shadow: var(--shadow-md); }
.wrf-card[data-interactive="true"] { cursor: pointer; transition: box-shadow var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard); }
.wrf-card[data-interactive="true"]:hover { box-shadow: var(--shadow-md); border-color: var(--border-default); }
.wrf-card[data-interactive="true"]:active { transform: translateY(0.5px); }

.wrf-card-header {
  display: flex; align-items: center; gap: var(--space-3);
  padding: var(--space-4) var(--pad-card);
  border-bottom: var(--border-width) solid var(--border-subtle);
}
.wrf-card-header-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.wrf-card-title { font-size: var(--text-md); font-weight: var(--weight-semibold); color: var(--text-primary); line-height: 1.2; }
.wrf-card-subtitle { font-size: var(--text-xs); color: var(--text-tertiary); }
.wrf-card-header-actions { margin-left: auto; display: flex; align-items: center; gap: var(--space-1); }
.wrf-card-body { padding: var(--pad-card); }
`;

/**
 * Surface container. Compose a header (title/subtitle/actions) and body, or
 * pass children directly with `pad` for a simple padded panel.
 */
export function Card({
  title = null,
  subtitle = null,
  headerActions = null,
  icon = null,
  elevation = 'default',
  interactive = false,
  pad = false,
  children,
  ...rest
}) {
  useInject('wrf-card-css', CSS);
  const hasHeader = title || subtitle || headerActions || icon;
  return (
    <section
      className="wrf-card"
      data-elevation={elevation}
      data-interactive={interactive ? 'true' : undefined}
      data-pad={pad && !hasHeader ? 'true' : undefined}
      {...rest}
    >
      {hasHeader && (
        <header className="wrf-card-header">
          {icon}
          <div className="wrf-card-header-text">
            {title && <div className="wrf-card-title">{title}</div>}
            {subtitle && <div className="wrf-card-subtitle">{subtitle}</div>}
          </div>
          {headerActions && <div className="wrf-card-header-actions">{headerActions}</div>}
        </header>
      )}
      {hasHeader ? <div className="wrf-card-body">{children}</div> : children}
    </section>
  );
}
