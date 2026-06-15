/* @ds-bundle: {"format":3,"namespace":"HelmRoomKitFleetDS_91f16f","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"MetricStat","sourcePath":"components/core/MetricStat.jsx"},{"name":"StatusBadge","sourcePath":"components/core/StatusBadge.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"18ebd72e4f1b","components/core/Badge.jsx":"00273e612d1f","components/core/Button.jsx":"d8217e1ee04a","components/core/Card.jsx":"703d7e5bcb86","components/core/IconButton.jsx":"4cf45c42cd35","components/core/MetricStat.jsx":"a5fe28bcf532","components/core/StatusBadge.jsx":"6dad43348439","components/core/Tag.jsx":"27a3ce2f6845","components/feedback/Banner.jsx":"2c4f130596f9","components/feedback/ProgressBar.jsx":"9c167206ed7b","components/feedback/Tooltip.jsx":"16baf60f4054","components/forms/Checkbox.jsx":"36c63429d2c2","components/forms/Input.jsx":"87e0004dcc54","components/forms/Select.jsx":"992e2ddc597d","components/forms/Switch.jsx":"8d3fc5a4ede8","components/navigation/Tabs.jsx":"d5b8023dcfdf","ui_kits/console/alerts.view.jsx":"f307a8d1abab","ui_kits/console/app.boot.jsx":"4128c31ebc93","ui_kits/console/branding.view.jsx":"c6fea4437766","ui_kits/console/connect.view.jsx":"7d758b7a7c4e","ui_kits/console/data.js":"c55f3666cc34","ui_kits/console/devices.view.jsx":"f084dd89cca0","ui_kits/console/overview.view.jsx":"02f5e7ff2fce","ui_kits/console/poller.js":"2d5b28fff53b","ui_kits/console/presets.js":"2818ce8d6c42","ui_kits/console/presets.view.jsx":"c4b0edadd27a","ui_kits/console/request-manager.js":"fd15b73e8d06","ui_kits/console/settings.view.jsx":"b4f53e81434b","ui_kits/console/shell.runtime.js":"e9c53e70855b","ui_kits/console/webex.js":"5e0447ce42b6","ui_kits/console/workspaces.view.jsx":"32d8f26a0901"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.HelmRoomKitFleetDS_91f16f = window.HelmRoomKitFleetDS_91f16f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
const PALETTE = [['var(--teal-50)', 'var(--teal-700)'], ['var(--blue-50)', 'var(--blue-700)'], ['var(--violet-100)', 'var(--violet-500)'], ['var(--amber-50)', 'var(--amber-700)'], ['var(--green-50)', 'var(--green-700)']];
function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}
function hashIndex(str, mod) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = h * 31 + str.charCodeAt(i) | 0;
  return Math.abs(h) % mod;
}

/**
 * Round avatar for a person (initials or photo) or a square device glyph.
 * Initials get a deterministic color from the name.
 */
function Avatar({
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
  const style = bg && !src && !icon ? {
    background: bg,
    color: fg
  } : undefined;
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "wrf-avatar-wrap",
    "data-size": size,
    "data-shape": shape,
    "aria-label": name || undefined
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wrf-avatar",
    "data-kind": kind,
    style: style
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : icon ? icon : isDevice ? /*#__PURE__*/React.createElement("i", {
    "data-lucide": "monitor"
  }) : initials(name)), statusColor && /*#__PURE__*/React.createElement("span", {
    className: "wrf-avatar-ring",
    style: {
      background: statusColor
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.wrf-badge {
  display: inline-flex; align-items: center; gap: var(--space-1);
  height: 18px; padding: 0 var(--space-1-5);
  font-family: var(--font-sans);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold);
  line-height: 1; letter-spacing: var(--tracking-wide);
  border-radius: var(--radius-xs);
  border: var(--border-width) solid transparent;
  white-space: nowrap;
}
.wrf-badge[data-shape="pill"] { border-radius: var(--radius-full); padding: 0 var(--space-2); }
.wrf-badge[data-tone="neutral"]  { background: var(--slate-100); color: var(--slate-600); }
.wrf-badge[data-tone="accent"]   { background: var(--accent-subtle); color: var(--accent-active); }
.wrf-badge[data-tone="online"]   { background: var(--status-online-bg);   color: var(--status-online-text); }
.wrf-badge[data-tone="incall"]   { background: var(--status-incall-bg);   color: var(--status-incall-text); }
.wrf-badge[data-tone="degraded"] { background: var(--status-degraded-bg); color: var(--status-degraded-text); }
.wrf-badge[data-tone="critical"] { background: var(--status-critical-bg); color: var(--status-critical-text); }
.wrf-badge[data-tone="offline"]  { background: var(--status-offline-bg);  color: var(--status-offline-text); }
.wrf-badge[data-outline="true"] { background: transparent; border-color: currentColor; }
.wrf-badge svg, .wrf-badge i { width: 11px; height: 11px; }
`;

/**
 * Compact count / label badge. For device counts, version tags, "NEW",
 * unread alert counts. For live device state use StatusBadge instead.
 */
function Badge({
  tone = 'neutral',
  shape = 'rounded',
  outline = false,
  children,
  ...rest
}) {
  useInject('wrf-badge-css', CSS);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "wrf-badge",
    "data-tone": tone,
    "data-shape": shape,
    "data-outline": outline ? 'true' : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
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
function Button({
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
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: "wrf-btn",
    "data-variant": variant,
    "data-size": size,
    "data-block": block ? 'true' : undefined,
    disabled: disabled
  }, rest), leadingIcon, children != null && /*#__PURE__*/React.createElement("span", null, children), trailingIcon);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function Card({
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
  return /*#__PURE__*/React.createElement("section", _extends({
    className: "wrf-card",
    "data-elevation": elevation,
    "data-interactive": interactive ? 'true' : undefined,
    "data-pad": pad && !hasHeader ? 'true' : undefined
  }, rest), hasHeader && /*#__PURE__*/React.createElement("header", {
    className: "wrf-card-header"
  }, icon, /*#__PURE__*/React.createElement("div", {
    className: "wrf-card-header-text"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "wrf-card-title"
  }, title), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "wrf-card-subtitle"
  }, subtitle)), headerActions && /*#__PURE__*/React.createElement("div", {
    className: "wrf-card-header-actions"
  }, headerActions)), hasHeader ? /*#__PURE__*/React.createElement("div", {
    className: "wrf-card-body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  label,
  disabled = false,
  ...rest
}) {
  useInject('wrf-iconbtn-css', CSS);
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: "wrf-iconbtn",
    "data-variant": variant,
    "data-size": size,
    "aria-label": label,
    title: label,
    disabled: disabled
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/MetricStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.wrf-metric {
  display: flex; flex-direction: column; gap: var(--space-1);
  min-width: 0;
}
.wrf-metric-label {
  display: flex; align-items: center; gap: var(--space-1-5);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-caps); text-transform: uppercase;
  color: var(--text-tertiary);
}
.wrf-metric-label svg, .wrf-metric-label i { width: 13px; height: 13px; }
.wrf-metric-value {
  display: flex; align-items: baseline; gap: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-4xl); font-weight: var(--weight-semibold);
  line-height: 1; color: var(--text-primary);
  font-feature-settings: 'tnum' 1;
}
.wrf-metric[data-size="sm"] .wrf-metric-value { font-size: var(--text-2xl); }
.wrf-metric-unit { font-size: var(--text-md); font-weight: var(--weight-medium); color: var(--text-tertiary); }
.wrf-metric-foot { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-xs); color: var(--text-tertiary); }
.wrf-metric-delta {
  display: inline-flex; align-items: center; gap: 2px;
  font-weight: var(--weight-semibold); font-feature-settings: 'tnum' 1;
}
.wrf-metric-delta[data-trend="up"]   { color: var(--status-online-text); }
.wrf-metric-delta[data-trend="down"] { color: var(--status-critical-text); }
.wrf-metric-delta[data-trend="flat"] { color: var(--text-tertiary); }
.wrf-metric-delta svg, .wrf-metric-delta i { width: 12px; height: 12px; }
`;
const ARROW = {
  up: 'arrow-up-right',
  down: 'arrow-down-right',
  flat: 'minus'
};

/**
 * KPI tile for the fleet dashboard — a labelled headline number with optional
 * unit, trend delta, and footnote. Drop inside a Card or a metric strip.
 */
function MetricStat({
  label,
  value,
  unit,
  icon = null,
  delta = null,
  trend = 'flat',
  footnote = null,
  size = 'md',
  ...rest
}) {
  useInject('wrf-metric-css', CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "wrf-metric",
    "data-size": size
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "wrf-metric-label"
  }, icon, label), /*#__PURE__*/React.createElement("div", {
    className: "wrf-metric-value"
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    className: "wrf-metric-unit"
  }, unit)), (delta != null || footnote) && /*#__PURE__*/React.createElement("div", {
    className: "wrf-metric-foot"
  }, delta != null && /*#__PURE__*/React.createElement("span", {
    className: "wrf-metric-delta",
    "data-trend": trend
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": ARROW[trend]
  }), delta), footnote && /*#__PURE__*/React.createElement("span", null, footnote)));
}
Object.assign(__ds_scope, { MetricStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MetricStat.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.wrf-status {
  display: inline-flex; align-items: center; gap: var(--space-1-5);
  height: 20px; padding: 0 var(--space-2) 0 var(--space-1-5);
  font-family: var(--font-sans);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide); line-height: 1;
  border-radius: var(--radius-full);
  white-space: nowrap;
}
.wrf-status[data-state="online"]   { background: var(--status-online-bg);   color: var(--status-online-text); }
.wrf-status[data-state="incall"]   { background: var(--status-incall-bg);   color: var(--status-incall-text); }
.wrf-status[data-state="degraded"] { background: var(--status-degraded-bg); color: var(--status-degraded-text); }
.wrf-status[data-state="critical"] { background: var(--status-critical-bg); color: var(--status-critical-text); }
.wrf-status[data-state="offline"]  { background: var(--status-offline-bg);  color: var(--status-offline-text); }
.wrf-status[data-plain="true"] { background: transparent; padding: 0; gap: var(--space-2); }

.wrf-status-dot {
  position: relative; width: 7px; height: 7px; border-radius: 50%; flex: none;
  background: var(--_dot);
}
.wrf-status[data-state="online"]   { --_dot: var(--status-online); }
.wrf-status[data-state="incall"]   { --_dot: var(--status-incall); }
.wrf-status[data-state="degraded"] { --_dot: var(--status-degraded); }
.wrf-status[data-state="critical"] { --_dot: var(--status-critical); }
.wrf-status[data-state="offline"]  { --_dot: var(--status-offline); }

/* live ping for in-call & critical */
.wrf-status[data-live="true"] .wrf-status-dot::after {
  content: ''; position: absolute; inset: 0; border-radius: 50%;
  background: var(--_dot);
  animation: wrf-ping var(--pulse-period) var(--ease-decel) infinite;
}
@media (prefers-reduced-motion: reduce) {
  .wrf-status[data-live="true"] .wrf-status-dot::after { animation: none; }
}
`;
const LABELS = {
  online: 'Online',
  incall: 'In call',
  degraded: 'Degraded',
  critical: 'Critical',
  offline: 'Offline'
};

/**
 * Live device-state pill with a status dot. The canonical way to show whether a
 * Room Kit is online, in a call, degraded, critical, or offline.
 */
function StatusBadge({
  state = 'online',
  label,
  live,
  plain = false,
  ...rest
}) {
  useInject('wrf-status-css', CSS);
  const isLive = live ?? (state === 'incall' || state === 'critical');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "wrf-status",
    "data-state": state,
    "data-live": isLive ? 'true' : undefined,
    "data-plain": plain ? 'true' : undefined
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wrf-status-dot"
  }), label ?? LABELS[state]);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function Tag({
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
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "wrf-tag",
    "data-interactive": interactive ? 'true' : undefined,
    "data-selected": selected ? 'true' : undefined,
    onClick: onClick
  }, rest), dotColor && /*#__PURE__*/React.createElement("span", {
    className: "wrf-tag-dot",
    style: {
      background: dotColor
    }
  }), leadingIcon, children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "wrf-tag-x",
    "aria-label": "Remove",
    onClick: e => {
      e.stopPropagation();
      onRemove(e);
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x",
    style: {
      width: 11,
      height: 11
    }
  })));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.wrf-banner {
  display: flex; align-items: flex-start; gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  font-family: var(--font-sans); font-size: var(--text-sm); line-height: var(--leading-snug);
}
.wrf-banner[data-flush="true"] { border-radius: 0; border-left: none; border-right: none; border-top: none; }
.wrf-banner-icon { flex: none; margin-top: 1px; }
.wrf-banner-icon svg, .wrf-banner-icon i { width: 16px; height: 16px; }
.wrf-banner-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
.wrf-banner-title { font-weight: var(--weight-semibold); color: var(--text-primary); }
.wrf-banner-msg { color: var(--text-secondary); }
.wrf-banner-actions { display: flex; align-items: center; gap: var(--space-2); margin-top: var(--space-1); }
.wrf-banner-close {
  flex: none; border: none; background: transparent; cursor: pointer; padding: 2px;
  color: var(--text-tertiary); border-radius: var(--radius-xs); display: inline-flex;
}
.wrf-banner-close:hover { color: var(--text-primary); background: color-mix(in srgb, currentColor 10%, transparent); }
.wrf-banner-close svg, .wrf-banner-close i { width: 14px; height: 14px; }

.wrf-banner[data-tone="info"]     { background: var(--status-incall-bg);   border-color: color-mix(in srgb, var(--status-incall) 30%, transparent); }
.wrf-banner[data-tone="info"]     .wrf-banner-icon { color: var(--status-incall-text); }
.wrf-banner[data-tone="success"]  { background: var(--status-online-bg);   border-color: color-mix(in srgb, var(--status-online) 30%, transparent); }
.wrf-banner[data-tone="success"]  .wrf-banner-icon { color: var(--status-online-text); }
.wrf-banner[data-tone="warning"]  { background: var(--status-degraded-bg); border-color: color-mix(in srgb, var(--status-degraded) 35%, transparent); }
.wrf-banner[data-tone="warning"]  .wrf-banner-icon { color: var(--status-degraded-text); }
.wrf-banner[data-tone="critical"] { background: var(--status-critical-bg); border-color: color-mix(in srgb, var(--status-critical) 35%, transparent); }
.wrf-banner[data-tone="critical"] .wrf-banner-icon { color: var(--status-critical-text); }
.wrf-banner[data-tone="neutral"]  { background: var(--surface-sunken);     border-color: var(--border-default); }
.wrf-banner[data-tone="neutral"]  .wrf-banner-icon { color: var(--text-tertiary); }
`;
const ICONS = {
  info: 'info',
  success: 'check-circle-2',
  warning: 'alert-triangle',
  critical: 'alert-octagon',
  neutral: 'bell'
};

/**
 * Inline alert / system message. For page-level notices (incident, maintenance)
 * and contextual warnings inside panels.
 */
function Banner({
  tone = 'info',
  title,
  icon,
  flush = false,
  onClose = null,
  actions = null,
  children,
  ...rest
}) {
  useInject('wrf-banner-css', CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "wrf-banner",
    "data-tone": tone,
    "data-flush": flush ? 'true' : undefined,
    role: "status"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "wrf-banner-icon"
  }, icon ?? /*#__PURE__*/React.createElement("i", {
    "data-lucide": ICONS[tone]
  })), /*#__PURE__*/React.createElement("div", {
    className: "wrf-banner-body"
  }, title && /*#__PURE__*/React.createElement("div", {
    className: "wrf-banner-title"
  }, title), children && /*#__PURE__*/React.createElement("div", {
    className: "wrf-banner-msg"
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    className: "wrf-banner-actions"
  }, actions)), onClose && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "wrf-banner-close",
    "aria-label": "Dismiss",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "x"
  })));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.wrf-progress { display: flex; flex-direction: column; gap: var(--space-1-5); }
.wrf-progress-head { display: flex; align-items: baseline; justify-content: space-between; gap: var(--space-2); font-size: var(--text-xs); }
.wrf-progress-label { font-weight: var(--weight-medium); color: var(--text-secondary); }
.wrf-progress-value { font-variant-numeric: tabular-nums; color: var(--text-tertiary); font-feature-settings: 'tnum' 1; }
.wrf-progress-track {
  position: relative; height: 6px; border-radius: var(--radius-full);
  background: var(--slate-200); overflow: hidden;
}
.wrf-progress[data-size="lg"] .wrf-progress-track { height: 9px; }
.wrf-progress-fill {
  position: absolute; inset: 0 auto 0 0; height: 100%;
  border-radius: var(--radius-full);
  background: var(--accent);
  transition: width var(--dur-slow) var(--ease-decel);
}
.wrf-progress[data-tone="online"]   .wrf-progress-fill { background: var(--status-online); }
.wrf-progress[data-tone="degraded"] .wrf-progress-fill { background: var(--status-degraded); }
.wrf-progress[data-tone="critical"] .wrf-progress-fill { background: var(--status-critical); }
.wrf-progress[data-indeterminate="true"] .wrf-progress-fill {
  width: 35% !important; animation: wrf-indet 1.2s var(--ease-standard) infinite;
}
@keyframes wrf-indet {
  0% { left: -35%; } 100% { left: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .wrf-progress[data-indeterminate="true"] .wrf-progress-fill { animation: none; left: 0; width: 100% !important; opacity: 0.4; }
}
`;

/**
 * Thin determinate (or indeterminate) progress bar — firmware rollout coverage,
 * upload/transfer, storage usage. Optional label + value row.
 */
function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  valueText,
  tone = 'accent',
  size = 'md',
  indeterminate = false,
  ...rest
}) {
  useInject('wrf-progress-css', CSS);
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "wrf-progress",
    "data-tone": tone,
    "data-size": size,
    "data-indeterminate": indeterminate ? 'true' : undefined
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    className: "wrf-progress-head"
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "wrf-progress-label"
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    className: "wrf-progress-value"
  }, valueText ?? `${Math.round(pct)}%`)), /*#__PURE__*/React.createElement("div", {
    className: "wrf-progress-track",
    role: "progressbar",
    "aria-valuenow": indeterminate ? undefined : Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrf-progress-fill",
    style: indeterminate ? undefined : {
      width: `${pct}%`
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function Tooltip({
  label,
  side = 'top',
  kbd = null,
  children,
  ...rest
}) {
  useInject('wrf-tip-css', CSS);
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "wrf-tip"
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "wrf-tip-bubble",
    "data-side": side,
    role: "tooltip"
  }, label, kbd && /*#__PURE__*/React.createElement("span", {
    className: "wrf-tip-kbd"
  }, kbd)));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function Checkbox({
  label,
  description,
  shape = 'check',
  indeterminate = false,
  disabled = false,
  ...rest
}) {
  useInject('wrf-check-css', CSS);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  const type = shape === 'radio' ? 'radio' : 'checkbox';
  return /*#__PURE__*/React.createElement("label", {
    className: "wrf-check",
    "data-shape": shape,
    "data-disabled": disabled ? 'true' : undefined
  }, /*#__PURE__*/React.createElement("input", _extends({
    ref: ref,
    type: type,
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "wrf-check-box"
  }, shape === 'radio' ? /*#__PURE__*/React.createElement("span", {
    className: "wrf-check-dot"
  }) : /*#__PURE__*/React.createElement("i", {
    "data-lucide": indeterminate ? 'minus' : 'check'
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    className: "wrf-check-text"
  }, label && /*#__PURE__*/React.createElement("span", null, label), description && /*#__PURE__*/React.createElement("span", {
    className: "wrf-check-desc"
  }, description)));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function Input({
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
  return /*#__PURE__*/React.createElement("label", {
    className: "wrf-field",
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "wrf-field-label"
  }, label, required && /*#__PURE__*/React.createElement("span", {
    className: "wrf-req"
  }, "*")), /*#__PURE__*/React.createElement("span", {
    className: "wrf-input-wrap",
    "data-size": size,
    "data-invalid": invalid ? 'true' : undefined,
    "data-disabled": disabled ? '' : undefined
  }, leadingIcon && /*#__PURE__*/React.createElement("span", {
    className: "wrf-affix"
  }, leadingIcon), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "wrf-input",
    "data-mono": mono ? 'true' : undefined,
    disabled: disabled,
    "aria-invalid": invalid
  }, rest)), trailingIcon && /*#__PURE__*/React.createElement("span", {
    className: "wrf-affix"
  }, trailingIcon)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: "wrf-field-hint",
    "data-invalid": invalid ? 'true' : undefined
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function Select({
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
  const opts = options ? options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o) : null;
  return /*#__PURE__*/React.createElement("label", {
    className: "wrf-select-field",
    htmlFor: fid
  }, label && /*#__PURE__*/React.createElement("span", {
    className: "wrf-select-label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "wrf-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: fid,
    className: "wrf-select",
    "data-size": size,
    disabled: disabled
  }, rest), placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), opts ? opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label)) : children), /*#__PURE__*/React.createElement("span", {
    className: "wrf-select-caret"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "chevron-down"
  }))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
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
function Switch({
  label,
  description,
  size = 'md',
  disabled = false,
  ...rest
}) {
  useInject('wrf-switch-css', CSS);
  return /*#__PURE__*/React.createElement("label", {
    className: "wrf-switch",
    "data-size": size,
    "data-disabled": disabled ? 'true' : undefined
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    disabled: disabled
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "wrf-switch-track"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wrf-switch-thumb"
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    className: "wrf-switch-text"
  }, label && /*#__PURE__*/React.createElement("span", null, label), description && /*#__PURE__*/React.createElement("span", {
    className: "wrf-switch-desc"
  }, description)));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function useInject(id, css) {
  if (typeof document === 'undefined' || document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = css;
  document.head.appendChild(el);
}
const CSS = `
.wrf-tabs { display: flex; align-items: stretch; gap: var(--space-1); max-width: 100%; overflow-x: auto; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.wrf-tabs::-webkit-scrollbar { display: none; }
.wrf-tabs[data-variant="underline"] { gap: var(--space-5); border-bottom: var(--border-width) solid var(--border-subtle); }
.wrf-tab {
  position: relative; flex: none; display: inline-flex; align-items: center; gap: var(--space-2);
  border: none; background: transparent; cursor: pointer;
  font-family: var(--font-sans); font-size: var(--text-sm); font-weight: var(--weight-medium);
  color: var(--text-secondary); white-space: nowrap;
  transition: color var(--dur-fast) var(--ease-standard), background var(--dur-fast) var(--ease-standard);
}
.wrf-tab svg, .wrf-tab i { width: 15px; height: 15px; }
.wrf-tab:hover { color: var(--text-primary); }

/* underline variant */
.wrf-tabs[data-variant="underline"] .wrf-tab { height: 38px; padding: 0 1px; }
.wrf-tabs[data-variant="underline"] .wrf-tab::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 2px;
  background: var(--accent); border-radius: 2px 2px 0 0;
  transform: scaleX(0); transition: transform var(--dur-fast) var(--ease-emphasized);
}
.wrf-tabs[data-variant="underline"] .wrf-tab[data-active="true"] { color: var(--text-primary); font-weight: var(--weight-semibold); }
.wrf-tabs[data-variant="underline"] .wrf-tab[data-active="true"]::after { transform: scaleX(1); }

/* pill / segmented variant */
.wrf-tabs[data-variant="pill"] { background: var(--surface-sunken); padding: var(--space-1); border-radius: var(--radius-sm); border: var(--border-width) solid var(--border-subtle); width: max-content; max-width: 100%; }
.wrf-tabs[data-variant="pill"] .wrf-tab { height: 28px; padding: 0 var(--space-3); border-radius: var(--radius-xs); }
.wrf-tabs[data-variant="pill"] .wrf-tab[data-active="true"] { background: var(--surface-card); color: var(--text-primary); font-weight: var(--weight-semibold); box-shadow: var(--shadow-xs); }

.wrf-tab:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-xs); }
.wrf-tab-count {
  display: inline-flex; align-items: center; justify-content: center; min-width: 18px; height: 16px;
  padding: 0 5px; border-radius: var(--radius-full);
  background: var(--slate-150); color: var(--text-secondary);
  font-size: var(--text-2xs); font-weight: var(--weight-semibold); font-feature-settings: 'tnum' 1;
}
.wrf-tab[data-active="true"] .wrf-tab-count { background: var(--accent-subtle); color: var(--accent-active); }
`;

/**
 * Horizontal tab strip — underline (page sections) or pill (segmented control).
 * Controlled: pass `value` + `onChange`. Each tab: {value,label,icon?,count?}.
 */
function Tabs({
  tabs = [],
  value,
  onChange = () => {},
  variant = 'underline',
  ...rest
}) {
  useInject('wrf-tabs-css', CSS);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "wrf-tabs",
    "data-variant": variant,
    role: "tablist"
  }, rest), tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.value,
    type: "button",
    role: "tab",
    className: "wrf-tab",
    "data-active": value === t.value ? 'true' : undefined,
    "aria-selected": value === t.value,
    onClick: () => onChange(t.value)
  }, t.icon, t.label, t.count != null && /*#__PURE__*/React.createElement("span", {
    className: "wrf-tab-count"
  }, t.count))));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/alerts.view.jsx
try { (() => {
/* WeRoFleet Console — Alerts screen */
(function () {
  const {
    useState
  } = React;
  const {
    Card,
    Badge,
    Button,
    IconButton,
    Tabs,
    Avatar
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  const PageHead = window.WRF_PageHead;
  const SEV = {
    critical: {
      tone: 'critical',
      icon: 'alert-octagon',
      label: 'Critical'
    },
    warning: {
      tone: 'degraded',
      icon: 'alert-triangle',
      label: 'Warning'
    },
    info: {
      tone: 'incall',
      icon: 'info',
      label: 'Info'
    }
  };
  const SEV_VAR = {
    critical: 'var(--status-critical)',
    warning: 'var(--status-degraded)',
    info: 'var(--status-incall)'
  };
  function notify(msg, tone) {
    if (window.WRF_notify) window.WRF_notify(msg, tone);
  }
  function Alerts({
    onOpenDevice
  }) {
    const store = DATA.useStore();
    const [tab, setTab] = useState('open');
    const live = store.mode === 'live';
    const allAlerts = DATA.alerts();
    const rows = allAlerts.filter(a => tab === 'all' ? true : tab === 'open' ? a.status !== 'resolved' : a.status === 'resolved');
    const openN = allAlerts.filter(a => a.status !== 'resolved').length;
    const resolvedN = allAlerts.length - openN;
    const act = (a, patch, msg) => {
      if (live && a.deviceId) {
        DATA.setLocalAct(a.deviceId, patch);
        notify(msg, 'success');
      } else notify(msg + ' (demo)', 'neutral');
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
      title: "Alerts",
      sub: `${openN} active · ${resolvedN} resolved`,
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        leadingIcon: I('bell-off')
      }, "Mute rules"), /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        leadingIcon: I('check-check'),
        onClick: () => {
          if (live) allAlerts.forEach(a => a.deviceId && a.status === 'open' && DATA.setLocalAct(a.deviceId, {
            acked: true,
            who: store.me && store.me.displayName
          }));
          notify('All alerts acknowledged', 'success');
        }
      }, "Acknowledge all"))
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-toolbar"
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'open',
        label: 'Active',
        count: openN
      }, {
        value: 'resolved',
        label: 'Resolved',
        count: resolvedN
      }, {
        value: 'all',
        label: 'All',
        count: allAlerts.length
      }]
    })), rows.length === 0 ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '40px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-ic",
      style: {
        color: 'var(--status-online-text)'
      }
    }, I('check-circle-2')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-title"
    }, tab === 'open' ? 'No active alerts' : 'Nothing here'), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, tab === 'open' ? 'Every device is healthy right now.' : 'No alerts in this view.'))) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-alert-list"
    }, rows.map(a => {
      const s = SEV[a.sev];
      return /*#__PURE__*/React.createElement("div", {
        key: a.id,
        className: "wrf-alert-card",
        "data-sev": a.sev
      }, /*#__PURE__*/React.createElement("span", {
        className: "wrf-alert-rail",
        style: {
          background: SEV_VAR[a.sev]
        }
      }), /*#__PURE__*/React.createElement("span", {
        className: "wrf-alert-ic",
        style: {
          color: SEV_VAR[a.sev]
        }
      }, I(s.icon)), /*#__PURE__*/React.createElement("div", {
        className: "wrf-alert-main"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wrf-alert-top"
      }, /*#__PURE__*/React.createElement("span", {
        className: "wrf-alert-msg"
      }, a.msg), /*#__PURE__*/React.createElement(Badge, {
        tone: s.tone,
        outline: true
      }, s.label), a.status === 'ack' && /*#__PURE__*/React.createElement(Badge, {
        tone: "neutral"
      }, "Acknowledged"), a.status === 'resolved' && /*#__PURE__*/React.createElement(Badge, {
        tone: "online",
        outline: true
      }, "Resolved")), /*#__PURE__*/React.createElement("div", {
        className: "wrf-alert-meta"
      }, /*#__PURE__*/React.createElement("button", {
        className: "wrf-alert-device",
        onClick: () => onOpenDevice(a.deviceId)
      }, I('monitor'), a.device), a.site && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, a.site)), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, a.time), a.who && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
        className: "wrf-alert-who"
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: a.who,
        size: "xs"
      }), " ", a.who)))), /*#__PURE__*/React.createElement("div", {
        className: "wrf-alert-actions"
      }, a.status === 'open' && /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        onClick: () => act(a, {
          acked: true,
          who: store.me && store.me.displayName
        }, `Acknowledged · ${a.device}`)
      }, "Acknowledge"), a.status !== 'resolved' && /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        onClick: () => act(a, {
          resolved: true
        }, `Resolved · ${a.device}`)
      }, "Resolve"), /*#__PURE__*/React.createElement(IconButton, {
        size: "sm",
        variant: "ghost",
        icon: I('more-vertical'),
        label: "More"
      })));
    })));
  }
  window.WRF_Alerts = Alerts;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/alerts.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/app.boot.jsx
try { (() => {
/* WeRoFleet Console — root app: store wiring, Webex connection, routing */
(function () {
  const {
    useState,
    useEffect,
    useCallback
  } = React;
  const {
    AppShell,
    I
  } = window.WRF_SHELL;
  const {
    Card,
    Button
  } = window.HelmRoomKitFleetDS_91f16f;
  const DATA = window.WRF_DATA;
  const WX = window.WRF_WEBEX;
  const POLLER = window.WRF_POLLER;
  const PREFS_KEY = 'wrf-console-prefs';
  function loadPrefs() {
    try {
      return JSON.parse(localStorage.getItem(PREFS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function savePrefs(s) {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(s));
    } catch (e) {}
  }

  // ---- toasts ----
  function useToasts() {
    const [toasts, setToasts] = useState([]);
    const notify = useCallback((msg, tone) => {
      const id = Math.random().toString(36).slice(2);
      setToasts(t => [...t, {
        id,
        msg,
        tone: tone || 'neutral'
      }]);
      setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
    }, []);
    return {
      toasts,
      notify
    };
  }
  const TOAST_IC = {
    success: 'check-circle-2',
    critical: 'alert-octagon',
    warning: 'alert-triangle',
    neutral: 'info'
  };
  function Toasts({
    toasts
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-toasts"
    }, toasts.map(t => /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: "wrf-toast",
      "data-tone": t.tone
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-toast-ic"
    }, I(TOAST_IC[t.tone] || 'info')), /*#__PURE__*/React.createElement("span", null, t.msg))));
  }
  function Placeholder({
    title
  }) {
    const PageHead = window.WRF_PageHead;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
      title: title,
      sub: "Demonstration surface"
    }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-ic"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "construction"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-title"
    }, title, " lives here"), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, "This UI kit focuses on Overview, Devices, and Workspaces. Other surfaces follow the same shell."))));
  }
  function App() {
    const prefs = loadPrefs();
    const store = DATA.useStore();
    const [active, setActive] = useState(prefs.active && prefs.active !== 'alerts' ? prefs.active : 'overview');
    const [theme, setTheme] = useState(prefs.theme || 'light');
    const [device, setDevice] = useState(null);
    const [showConnect, setShowConnect] = useState(false);
    const [pollOn, setPollOn] = useState(true);
    const [sweeping, setSweeping] = useState(false);
    const [cooldown, setCooldown] = useState(prefs.cooldown || 20000);
    const {
      toasts,
      notify
    } = useToasts();

    // ---- first-run splash: keep it visible until the first full fleet status sweep completes ----
    const splashDone = React.useRef(false);
    const hideSplash = useCallback(() => {
      if (splashDone.current) return;
      splashDone.current = true;
      if (window.__wrfHideSplash) window.__wrfHideSplash();
    }, []);
    useEffect(() => {
      if (!window.__wrfSplashFirstUse) {
        hideSplash();
        return;
      } // returning visit — reveal immediately
      if (!WX.hasCreds()) {
        const t = setTimeout(hideSplash, 1200);
        return () => clearTimeout(t);
      } // no live fleet to sweep
      // Has creds → keep splash up; the first poller sweep (or a connect failure) hides it.
    }, [hideSplash]);

    // expose notify to screens
    useEffect(() => {
      window.WRF_notify = notify;
    }, [notify]);

    // Surface adaptive-throttle transitions (429 backoff) to the user.
    useEffect(() => {
      if (!window.WRF_RM || !window.WRF_RM.onState) return;
      let wasThrottled = false;
      return window.WRF_RM.onState(s => {
        if (s.throttled && !wasThrottled) {
          wasThrottled = true;
          notify('Webex rate limit hit — slowing to ' + s.effRate + '/s and retrying', 'warning');
        } else if (!s.throttled && wasThrottled) {
          wasThrottled = false;
          notify('Rate back to normal (' + s.rate + '/s)', 'success');
        }
      });
    }, [notify]);
    useEffect(() => {
      savePrefs({
        active,
        theme,
        cooldown
      });
    }, [active, theme, cooldown]);
    useEffect(() => {
      document.documentElement.setAttribute('data-theme', theme);
      if (window.lucide) window.lucide.createIcons();
    });
    useEffect(() => {
      if (window.lucide) window.lucide.createIcons();
    });

    // auto-connect with saved creds, else stay in demo
    useEffect(() => {
      if (WX.hasCreds()) {
        DATA.setState({
          status: 'connecting'
        });
        WX.connect().then(({
          me,
          org,
          devices,
          workspaces
        }) => {
          DATA.setLive({
            me,
            org,
            devices,
            workspaces
          });
          notify('Connected · ' + devices.length + ' devices loaded', 'success');
        }).catch(e => {
          DATA.setState({
            status: 'error'
          });
          notify('Auto-connect failed: ' + (e.message || 'error'), 'critical');
          hideSplash();
        });
      }
    }, []);
    const refresh = useCallback(() => {
      if (store.mode !== 'live') return;
      DATA.setState({
        status: 'connecting'
      });
      WX.connect().then(({
        me,
        org,
        devices,
        workspaces
      }) => {
        DATA.setLive({
          me,
          org,
          devices,
          workspaces
        });
        notify('Synced · ' + devices.length + ' devices', 'success');
      }).catch(e => {
        DATA.setState({
          status: 'error'
        });
        notify('Sync failed: ' + (e.message || 'error'), 'critical');
      });
    }, [store.mode]);

    // Background fleet poll: sweep live xAPI status (in-call, RoomOS, uptime) at low priority.
    useEffect(() => {
      if (store.mode === 'live' && pollOn && POLLER) {
        POLLER.start({
          getDevices: () => DATA.store.devices,
          onDevice: (id, s) => DATA.applyLiveStatus(id, s),
          onState: st => {
            if (st.sweeping !== undefined) setSweeping(st.sweeping);
            if (st.sweptAt) hideSplash();
          },
          cooldown: cooldown
        });
        return () => POLLER.stop();
      }
      if (POLLER) POLLER.stop();
      setSweeping(false);
    }, [store.mode, pollOn, cooldown]);
    const onNav = id => {
      setActive(id);
      setDevice(null);
    };
    const onOpenDevice = id => setDevice(id || store.devices[0] && store.devices[0].id);
    const Overview = window.WRF_Overview;
    const Devices = window.WRF_Devices;
    const Workspaces = window.WRF_Workspaces;
    const Presets = window.WRF_Presets;
    const Settings = window.WRF_Settings;
    const DeviceDrawer = window.WRF_DeviceDrawer;
    const ConnectModal = window.WRF_ConnectModal;
    const bell = DATA.alerts().filter(a => a.status !== 'resolved').length;
    let screen;
    if (active === 'overview') screen = /*#__PURE__*/React.createElement(Overview, {
      onOpenDevice: onOpenDevice,
      onNav: onNav,
      onConnect: () => setShowConnect(true)
    });else if (active === 'devices') screen = /*#__PURE__*/React.createElement(Devices, {
      onOpenDevice: onOpenDevice
    });else if (active === 'workspaces') screen = /*#__PURE__*/React.createElement(Workspaces, {
      onOpenDevice: onOpenDevice
    });else if (active === 'presets') screen = /*#__PURE__*/React.createElement(Presets, {
      onGoWorkspaces: () => onNav('workspaces')
    });else if (active === 'settings') screen = /*#__PURE__*/React.createElement(Settings, {
      cooldown: cooldown,
      onCooldown: setCooldown,
      onConnect: () => setShowConnect(true)
    });else screen = /*#__PURE__*/React.createElement(Placeholder, {
      title: active.charAt(0).toUpperCase() + active.slice(1)
    });
    return /*#__PURE__*/React.createElement(AppShell, {
      active: active,
      onNav: onNav,
      theme: theme,
      onToggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
      store: store,
      bell: bell,
      onConnectClick: () => setShowConnect(true),
      onRefresh: refresh,
      pollOn: pollOn,
      sweeping: sweeping,
      onTogglePoll: () => setPollOn(v => !v)
    }, screen, device && /*#__PURE__*/React.createElement(DeviceDrawer, {
      id: device,
      onClose: () => setDevice(null),
      notify: notify
    }), showConnect && /*#__PURE__*/React.createElement(ConnectModal, {
      onClose: () => setShowConnect(false),
      onConnected: r => notify('Connected · ' + r.count + ' devices loaded', 'success')
    }), /*#__PURE__*/React.createElement(Toasts, {
      toasts: toasts
    }));
  }
  ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/app.boot.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/branding.view.jsx
try { (() => {
/* WeRoFleet Console — per-device Branding editor (drawer "Branding" button) */
(function () {
  const {
    useState
  } = React;
  const {
    Button,
    Input,
    Switch,
    Tabs,
    Badge,
    Banner,
    Select
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const PR = window.WRF_PRESETS;
  const WX = window.WRF_WEBEX;
  const DATA = window.WRF_DATA;
  function notify(msg, tone) {
    if (window.WRF_notify) window.WRF_notify(msg, tone);
  }
  const util = () => window.WRF_UTIL || {};
  function fmtSize(b) {
    return util().fmtSize ? util().fmtSize(b) : Math.round((b || 0) / 1024) + ' KB';
  }
  const CALL_LABELS = {
    JoinWebex: 'Webex',
    JoinMicrosoftTeamsDirectGuestJoin: 'Microsoft Teams',
    JoinGoogleMeet: 'Google Meet',
    JoinZoom: 'Zoom'
  };
  function ImageControl({
    label,
    brandType,
    hint,
    value,
    mode,
    onMode,
    onFile
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-cfg-title"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "wrf-seg wrf-seg-tri",
      "data-mode": mode
    }, /*#__PURE__*/React.createElement(Tabs, {
      variant: "pill",
      value: mode,
      onChange: onMode,
      tabs: [{
        value: 'set',
        label: 'On'
      }, {
        value: 'remove',
        label: 'Off'
      }, {
        value: 'auto',
        label: 'Auto'
      }]
    }))), mode === 'set' && /*#__PURE__*/React.createElement("div", {
      className: "wrf-imgdrop"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-imgprev",
      style: value ? {
        backgroundImage: `url(${value.url})`
      } : undefined
    }, !value && I('image')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-imgmeta"
    }, value ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "wrf-imgname"
    }, value.name), /*#__PURE__*/React.createElement("span", {
      className: "wrf-imgsize"
    }, value.w ? `${value.w}×${value.h} · ` : '', fmtSize(value.size), " \xB7 via Branding.Upload")) : /*#__PURE__*/React.createElement("span", {
      className: "wrf-imgsize"
    }, hint), /*#__PURE__*/React.createElement("label", {
      className: "wrf-filebtn"
    }, I('upload'), /*#__PURE__*/React.createElement("span", null, value ? 'Replace image' : 'Choose image'), /*#__PURE__*/React.createElement("input", {
      type: "file",
      accept: "image/*",
      onChange: onFile,
      hidden: true
    })))), mode === 'remove' && /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-removalnote",
      "data-tone": "warn"
    }, I('trash-2'), /*#__PURE__*/React.createElement("span", null, "Sends ", /*#__PURE__*/React.createElement("b", null, "Branding.Delete"), " for ", /*#__PURE__*/React.createElement("b", null, brandType), " \u2014 clears the image on this device.")), mode === 'auto' && /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-removalnote"
    }, I('minus-circle'), /*#__PURE__*/React.createElement("span", null, "Left unchanged.")));
  }
  function BrandingModal({
    device,
    live,
    currentCfg,
    onClose,
    onApplied
  }) {
    const presets = PR.useStore();
    const [presetId, setPresetId] = useState('');
    const [img, setImg] = useState(null);
    const [imgMode, setImgMode] = useState('auto');
    const [bg, setBg] = useState(null);
    const [bgMode, setBgMode] = useState('auto');
    const [useMsg, setUseMsg] = useState(false);
    const [msg, setMsg] = useState(currentCfg && currentCfg.customMessage || 'If help needed, please call 9911.');
    const [useCall, setUseCall] = useState(false);
    const [call, setCall] = useState(() => {
      const base = {
        JoinWebex: 'Auto',
        JoinMicrosoftTeamsDirectGuestJoin: 'Auto',
        JoinGoogleMeet: 'Hidden',
        JoinZoom: 'Hidden'
      };
      return Object.assign(base, currentCfg && currentCfg.call || {});
    });
    const [run, setRun] = useState(null); // { log, done, ok, err }

    function pickFile(e, setter, setMode) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (!/^image\//.test(f.type)) {
        notify('Choose an image file', 'warning');
        return;
      }
      const rz = util().resizeToBase64;
      if (!rz) {
        notify('Image helper unavailable', 'critical');
        return;
      }
      rz(f, (err, out) => {
        if (err) {
          notify(err.message, 'critical');
          return;
        }
        setter({
          name: f.name,
          size: out.bytes,
          base64: out.base64,
          url: out.url,
          w: out.w,
          h: out.h
        });
        setMode('set');
      });
      e.target.value = '';
    }
    function applyPreset(pid) {
      setPresetId(pid);
      const p = PR.get(pid);
      if (!p) return;
      setImgMode(p.imageMode || 'auto');
      setImg(p.image || null);
      setBgMode(p.bgMode || 'auto');
      setBg(p.bgImage || null);
      setUseMsg(p.useMessage !== false && p.customMessage != null);
      if (p.customMessage != null) setMsg(p.customMessage);
      setUseCall(p.useCall !== false && !!p.call);
      if (p.call) setCall(Object.assign({
        JoinWebex: 'Auto',
        JoinMicrosoftTeamsDirectGuestJoin: 'Auto',
        JoinGoogleMeet: 'Hidden',
        JoinZoom: 'Hidden'
      }, p.call));
      notify(`Loaded “${p.name}” — review and apply`, 'neutral');
    }
    function summary() {
      const a = [];
      if (imgMode === 'set' && img) a.push('Halfwake');else if (imgMode === 'remove') a.push('Clear Halfwake');
      if (bgMode === 'set' && bg) a.push('Background');else if (bgMode === 'remove') a.push('Clear Background');
      if (useMsg) a.push('Message');
      if (useCall) a.push('Call buttons');
      return a;
    }
    async function apply() {
      const acts = summary();
      if (!acts.length) {
        notify('Nothing to apply — pick at least one action', 'warning');
        return;
      }
      if (live && !window.confirm(`Apply branding to ${device.name}?`)) return;
      const preset = {
        image: img,
        imageMode: imgMode,
        bgImage: bg,
        bgMode: bgMode,
        customMessage: msg,
        useMessage: useMsg,
        call: call,
        useCall: useCall
      };
      const r = {
        log: [],
        done: false,
        ok: 0,
        err: 0
      };
      setRun({
        ...r
      });
      const onLog = e => {
        if (e.update) {
          const i = r.log.findIndex(x => x.uid === e.uid);
          if (i >= 0) r.log[i] = {
            ...r.log[i],
            status: e.status,
            detail: e.detail
          };
          if (e.status === 'ok') r.ok++;
          if (e.status === 'err') r.err++;
        } else r.log.push(e);
        setRun({
          ...r,
          log: [...r.log]
        });
      };
      await PR.apply(preset, [device], {
        live,
        onLog
      });
      r.done = true;
      setRun({
        ...r,
        log: [...r.log]
      });
      notify(`Branding applied to ${device.name} · ${r.ok} ok${r.err ? ` · ${r.err} failed` : ''}`, r.err ? 'warning' : 'success');
      if (onApplied) onApplied();
    }
    const presetOpts = [{
      value: '',
      label: 'Start from a preset…'
    }].concat(presets.map(p => ({
      value: p.id,
      label: p.name
    })));
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-scrim",
      onClick: run && !run.done ? undefined : onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal wrf-editor",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-connect-ic",
      style: {
        background: 'var(--accent-subtle)',
        color: 'var(--accent-active)'
      }
    }, I('image')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "wrf-modal-title"
    }, "Branding \xB7 ", device.name), /*#__PURE__*/React.createElement("p", {
      className: "wrf-modal-sub"
    }, live ? 'Pushes to this device via Branding.Upload / deviceConfigurations' : 'Demo — calls are simulated'))), (!run || run.done) && /*#__PURE__*/React.createElement("button", {
      className: "wrf-modal-x",
      onClick: onClose,
      "aria-label": "Close"
    }, I('x'))), run ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-body wrf-runlog"
    }, run.log.map(x => x.kind === 'head' ? /*#__PURE__*/React.createElement("div", {
      key: x.uid,
      className: "wrf-log-head"
    }, I('monitor'), /*#__PURE__*/React.createElement("b", null, x.name), /*#__PURE__*/React.createElement("span", null, x.model)) : /*#__PURE__*/React.createElement("div", {
      key: x.uid,
      className: "wrf-log-line",
      "data-status": x.status
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-log-ic"
    }, x.status === 'ok' ? I('check') : x.status === 'err' ? I('x') : I('loader-2', {
      className: 'wrf-spin'
    })), /*#__PURE__*/React.createElement("span", {
      className: "wrf-log-label"
    }, x.label), x.detail && /*#__PURE__*/React.createElement("span", {
      className: "wrf-log-detail"
    }, x.detail)))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-run-summary"
    }, run.ok, " ok", run.err ? ` · ${run.err} failed` : ''), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: run.done ? 'primary' : 'ghost',
      disabled: !run.done,
      onClick: onClose
    }, run.done ? 'Done' : 'Applying…'))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-body",
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 260
      }
    }, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      value: presetId,
      onChange: e => applyPreset(e.target.value),
      options: presetOpts
    })), /*#__PURE__*/React.createElement(ImageControl, {
      label: "Halfwake background",
      brandType: "HalfwakeBackground",
      hint: "Standby screen \xB7 auto-resized to max 3840\xD72160",
      value: img,
      mode: imgMode,
      onMode: setImgMode,
      onFile: e => pickFile(e, setImg, setImgMode)
    }), /*#__PURE__*/React.createElement(ImageControl, {
      label: "Background",
      brandType: "Background",
      hint: "In-call wallpaper \xB7 auto-resized to max 3840\xD72160",
      value: bg,
      mode: bgMode,
      onMode: setBgMode,
      onFile: e => pickFile(e, setBg, setBgMode)
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-head"
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: useMsg,
      onChange: e => setUseMsg(e.target.checked),
      label: "Custom message"
    })), useMsg && /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      leadingIcon: I('message-square'),
      value: msg,
      onChange: e => setMsg(e.target.value),
      placeholder: "Shown on the home screen"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-head"
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: useCall,
      onChange: e => setUseCall(e.target.checked),
      label: "Call buttons"
    })), useCall && /*#__PURE__*/React.createElement("div", {
      className: "wrf-call-grid"
    }, WX.CALL_FEATURE_KEYS.map(k => /*#__PURE__*/React.createElement("div", {
      key: k,
      className: "wrf-call-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-call-label"
    }, CALL_LABELS[k]), /*#__PURE__*/React.createElement("div", {
      className: "wrf-seg"
    }, /*#__PURE__*/React.createElement(Tabs, {
      variant: "pill",
      value: call[k],
      onChange: v => setCall({
        ...call,
        [k]: v
      }),
      tabs: [{
        value: 'Auto',
        label: 'Auto'
      }, {
        value: 'Hidden',
        label: 'Hidden'
      }]
    }))))))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-foot"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-review-v",
      style: {
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)'
      }
    }, summary().join(' · ') || 'No actions selected'), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      leadingIcon: I('rocket'),
      disabled: !summary().length,
      onClick: apply
    }, live ? 'Apply to device' : 'Simulate')))));
  }
  window.WRF_BrandingModal = BrandingModal;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/branding.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/connect.view.jsx
try { (() => {
/* WeRoFleet Console — Webex connection modal */
(function () {
  const {
    useState
  } = React;
  const {
    Card,
    Button,
    Input,
    Banner,
    Switch
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const WX = window.WRF_WEBEX;
  const DATA = window.WRF_DATA;
  const SCOPES = 'spark-admin:devices_read · spark:xapi_statuses · spark:xapi_commands';
  function ConnectModal({
    onClose,
    onConnected
  }) {
    const saved = WX.getCreds();
    const [token, setToken] = useState(saved.token || '');
    const [orgId, setOrgId] = useState(saved.orgId || '');
    const [base, setBase] = useState(saved.base !== WX.DEFAULT_BASE ? saved.base : '');
    const [advanced, setAdvanced] = useState(!!(saved.base && saved.base !== WX.DEFAULT_BASE));
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    const closable = DATA.store.connected || DATA.store.mode === 'demo';
    async function doConnect() {
      setError(null);
      if (!token.trim()) {
        setError({
          kind: 'auth',
          message: 'Paste a Webex access token to continue.'
        });
        return;
      }
      setBusy(true);
      WX.setCreds({
        token,
        orgId,
        base: advanced ? base : ''
      });
      DATA.setState({
        status: 'connecting'
      });
      try {
        const {
          me,
          org,
          devices,
          workspaces
        } = await WX.connect();
        DATA.setLive({
          me,
          org,
          devices,
          workspaces
        });
        if (onConnected) onConnected({
          count: devices.length,
          org
        });
        if (onClose) onClose();
      } catch (e) {
        DATA.setState({
          status: 'error'
        });
        setError({
          kind: e.kind || 'http',
          message: e.message || 'Connection failed.',
          body: e.body
        });
      } finally {
        setBusy(false);
      }
    }
    function useDemo() {
      DATA.loadDemo();
      if (onClose) onClose();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-scrim",
      onClick: closable ? onClose : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal wrf-connect",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-connect-ic"
    }, I('plug-zap')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "wrf-modal-title"
    }, "Connect to Webex"), /*#__PURE__*/React.createElement("p", {
      className: "wrf-modal-sub"
    }, "Use your own access token to load your real device fleet."))), closable && /*#__PURE__*/React.createElement("button", {
      className: "wrf-modal-x",
      onClick: onClose,
      "aria-label": "Close"
    }, I('x'))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-body"
    }, error && /*#__PURE__*/React.createElement(Banner, {
      tone: error.kind === 'network' ? 'warning' : 'critical',
      title: ERR_TITLE[error.kind] || 'Connection failed'
    }, error.message, error.kind === 'scope' && /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-scopes"
    }, "Required scopes: ", SCOPES), error.kind === 'network' && /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-scopes"
    }, "Tip: enable advanced options below to route through a CORS proxy.")), /*#__PURE__*/React.createElement(Input, {
      label: "Webex access token",
      type: "password",
      mono: true,
      leadingIcon: I('key-round'),
      placeholder: "Paste your Bearer token (without 'Bearer ')",
      value: token,
      onChange: e => setToken(e.target.value),
      hint: "Personal access token or an integration token with admin scopes."
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Organization ID",
      mono: true,
      leadingIcon: I('building-2'),
      placeholder: "Y2lzY29zcGFyazovL3VzL09SR0FO\u2026  (optional)",
      value: orgId,
      onChange: e => setOrgId(e.target.value),
      hint: "Optional \u2014 defaults to the token owner's org."
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-adv"
    }, /*#__PURE__*/React.createElement(Switch, {
      size: "sm",
      checked: advanced,
      onChange: e => setAdvanced(e.target.checked),
      label: "Advanced \u2014 custom API base / proxy"
    }), advanced && /*#__PURE__*/React.createElement(Input, {
      mono: true,
      leadingIcon: I('route'),
      placeholder: WX.DEFAULT_BASE,
      value: base,
      onChange: e => setBase(e.target.value),
      hint: "Point at a CORS proxy that forwards to webexapis.com/v1 if the browser blocks direct calls."
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-note"
    }, I('shield'), /*#__PURE__*/React.createElement("span", null, "Your token is stored only in this browser's local storage and sent directly to Webex. Nothing is uploaded to WeRoFleet."))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-foot"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: useDemo,
      disabled: busy
    }, "Use demo data"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: doConnect,
      disabled: busy,
      leadingIcon: busy ? I('loader-2', {
        className: 'wrf-spin'
      }) : I('plug')
    }, busy ? 'Connecting…' : 'Connect'))));
  }
  const ERR_TITLE = {
    auth: 'Invalid token',
    scope: 'Missing scope',
    network: 'Could not reach Webex',
    rate: 'Rate limited',
    http: 'Webex API error'
  };
  window.WRF_ConnectModal = ConnectModal;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/connect.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/data.js
try { (() => {
/* WeRoFleet Console — reactive store (demo + live Webex data) */
(function () {
  const SITES = ['San Jose HQ', 'London', 'Sydney', 'Austin'];

  // ---- Demo fleet (used until a live Webex org is connected) ----
  const DEMO_DEVICES = [{
    id: 'd-01',
    name: 'Boardroom A',
    room: 'Floor 3 · East',
    site: 'San Jose HQ',
    model: 'Room Kit Pro',
    state: 'incall',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '14d 06:22',
    ip: '10.4.22.18',
    serial: 'FOC2530NX9K',
    mac: 'F4:DB:E6:1A:22:0C',
    issue: null,
    meeting: 'Q3 Planning · 24 people'
  }, {
    id: 'd-02',
    name: 'Executive Briefing',
    room: 'Floor 12',
    site: 'San Jose HQ',
    model: 'Board 70',
    state: 'online',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '32d 01:10',
    ip: '10.4.22.41',
    serial: 'FOC2511PQ2A',
    mac: 'F4:DB:E6:1A:31:7E',
    issue: null,
    meeting: null
  }, {
    id: 'd-03',
    name: 'Huddle 2',
    room: 'Floor 2 · West',
    site: 'San Jose HQ',
    model: 'Room Bar',
    state: 'degraded',
    fw: '11.19.0.3',
    fwOld: true,
    uptime: '5d 22:48',
    ip: '10.4.21.9',
    serial: 'FOC2548RR1B',
    mac: 'F4:DB:E6:1A:09:42',
    issue: 'Camera not detected',
    meeting: null
  }, {
    id: 'd-04',
    name: 'Focus Room 4',
    room: 'Floor 2 · West',
    site: 'San Jose HQ',
    model: 'Room Kit Mini',
    state: 'online',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '9d 14:03',
    ip: '10.4.21.27',
    serial: 'FOC2550MM8C',
    mac: 'F4:DB:E6:1A:27:11',
    issue: null,
    meeting: null
  }, {
    id: 'd-05',
    name: 'Lobby Signage',
    room: 'Ground · Atrium',
    site: 'San Jose HQ',
    model: 'Board 70',
    state: 'online',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '61d 09:55',
    ip: '10.4.20.3',
    serial: 'FOC2490SG4D',
    mac: 'F4:DB:E6:1A:03:55',
    issue: null,
    meeting: null
  }, {
    id: 'd-06',
    name: 'Training Room',
    room: 'Floor 1',
    site: 'San Jose HQ',
    model: 'Room Kit Pro',
    state: 'critical',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '—',
    ip: '10.4.20.61',
    serial: 'FOC2530TR0E',
    mac: 'F4:DB:E6:1A:61:9A',
    issue: 'Lost network · last seen 41m',
    meeting: null
  }, {
    id: 'd-07',
    name: 'Cromwell Room',
    room: 'Floor 4',
    site: 'London',
    model: 'Room Bar',
    state: 'incall',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '21d 18:30',
    ip: '10.8.4.12',
    serial: 'LON2531RB7F',
    mac: 'A0:3C:E6:44:12:08',
    issue: null,
    meeting: 'EMEA Standup · 9 people'
  }, {
    id: 'd-08',
    name: 'Thames Boardroom',
    room: 'Floor 8',
    site: 'London',
    model: 'Board 70',
    state: 'online',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '44d 02:14',
    ip: '10.8.8.5',
    serial: 'LON2498BR3G',
    mac: 'A0:3C:E6:44:05:31',
    issue: null,
    meeting: null
  }, {
    id: 'd-09',
    name: 'Camden Huddle',
    room: 'Floor 2',
    site: 'London',
    model: 'Room Kit Mini',
    state: 'degraded',
    fw: '11.19.0.3',
    fwOld: true,
    uptime: '12d 07:41',
    ip: '10.8.2.18',
    serial: 'LON2547KM9H',
    mac: 'A0:3C:E6:44:18:6C',
    issue: 'Microphone level low',
    meeting: null
  }, {
    id: 'd-10',
    name: 'Harbour View',
    room: 'Level 14',
    site: 'Sydney',
    model: 'Room Kit Pro',
    state: 'online',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '28d 12:09',
    ip: '10.12.14.7',
    serial: 'SYD2532RP5J',
    mac: 'B8:27:EB:90:07:14',
    issue: null,
    meeting: null
  }, {
    id: 'd-11',
    name: 'Opera Room',
    room: 'Level 9',
    site: 'Sydney',
    model: 'Room Bar',
    state: 'offline',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '—',
    ip: '10.12.9.22',
    serial: 'SYD2533RB2K',
    mac: 'B8:27:EB:90:22:5F',
    issue: 'Powered off · scheduled',
    meeting: null
  }, {
    id: 'd-12',
    name: 'Darling Focus',
    room: 'Level 9',
    site: 'Sydney',
    model: 'Room Kit Mini',
    state: 'online',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '7d 03:38',
    ip: '10.12.9.40',
    serial: 'SYD2551KM1L',
    mac: 'B8:27:EB:90:40:A2',
    issue: null,
    meeting: null
  }, {
    id: 'd-13',
    name: 'Congress Hall',
    room: 'Floor 1',
    site: 'Austin',
    model: 'Board 70',
    state: 'incall',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '53d 21:02',
    ip: '10.16.1.11',
    serial: 'AUS2495BR8M',
    mac: 'C4:17:FE:33:11:0D',
    issue: null,
    meeting: 'All-Hands rehearsal · 38'
  }, {
    id: 'd-14',
    name: 'Pecan Huddle',
    room: 'Floor 3',
    site: 'Austin',
    model: 'Room Kit Mini',
    state: 'online',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '19d 16:47',
    ip: '10.16.3.6',
    serial: 'AUS2552KM4N',
    mac: 'C4:17:FE:33:06:88',
    issue: null,
    meeting: null
  }, {
    id: 'd-15',
    name: 'Riverside Briefing',
    room: 'Floor 6',
    site: 'Austin',
    model: 'Room Kit Pro',
    state: 'degraded',
    fw: '11.21.1.6',
    fwOld: false,
    uptime: '3d 09:12',
    ip: '10.16.6.19',
    serial: 'AUS2534RP6P',
    mac: 'C4:17:FE:33:19:41',
    issue: 'Display HDMI handshake errors',
    meeting: null
  }];
  const ALERTS_DEMO = [{
    id: 'a-1',
    sev: 'critical',
    device: 'Training Room',
    site: 'San Jose HQ',
    msg: 'Device lost network connectivity',
    time: '41m ago',
    status: 'open',
    who: null
  }, {
    id: 'a-2',
    sev: 'critical',
    device: 'Opera Room',
    site: 'Sydney',
    msg: 'Unexpected power loss',
    time: '1h 12m ago',
    status: 'open',
    who: null
  }, {
    id: 'a-3',
    sev: 'warning',
    device: 'Huddle 2',
    site: 'San Jose HQ',
    msg: 'Camera peripheral not detected',
    time: '2h ago',
    status: 'ack',
    who: 'Priya Anand'
  }, {
    id: 'a-4',
    sev: 'warning',
    device: 'Camden Huddle',
    site: 'London',
    msg: 'Microphone input level low',
    time: '3h ago',
    status: 'ack',
    who: 'Marcus Lee'
  }, {
    id: 'a-5',
    sev: 'warning',
    device: 'Riverside Briefing',
    site: 'Austin',
    msg: 'Display HDMI handshake errors',
    time: '5h ago',
    status: 'open',
    who: null
  }, {
    id: 'a-6',
    sev: 'info',
    device: 'Huddle 2',
    site: 'San Jose HQ',
    msg: 'Firmware behind fleet baseline',
    time: '6h ago',
    status: 'open',
    who: null
  }, {
    id: 'a-7',
    sev: 'warning',
    device: 'Camden Huddle',
    site: 'London',
    msg: 'Firmware behind fleet baseline',
    time: '6h ago',
    status: 'resolved',
    who: 'Dana Cole'
  }];
  const ACTIVITY_DEMO = [{
    who: 'Priya Anand',
    action: 'rebooted',
    target: 'Huddle 2',
    time: '12m'
  }, {
    who: 'System',
    action: 'pushed config to',
    target: '15 devices',
    time: '38m'
  }, {
    who: 'Marcus Lee',
    action: 'acknowledged alert on',
    target: 'Camden Huddle',
    time: '1h'
  }, {
    who: 'Dana Cole',
    action: 'scheduled update for',
    target: 'San Jose HQ',
    time: '2h'
  }, {
    who: 'System',
    action: 'detected new device',
    target: 'Pecan Huddle',
    time: '4h'
  }];
  const STATE_LABEL = {
    online: 'Online',
    incall: 'In call',
    degraded: 'Degraded',
    critical: 'Critical',
    offline: 'Offline'
  };
  const STATE_VAR = {
    online: 'var(--status-online)',
    incall: 'var(--status-incall)',
    degraded: 'var(--status-degraded)',
    critical: 'var(--status-critical)',
    offline: 'var(--status-offline)'
  };

  // ---- store ----
  const store = {
    mode: 'demo',
    // 'demo' | 'live'
    status: 'ready',
    // 'ready' | 'connecting' | 'error'
    connected: false,
    org: null,
    // { id, name }
    me: null,
    // { displayName, email }
    devices: DEMO_DEVICES.map(d => ({
      ...d
    })),
    workspaces: [],
    baseline: '11.21.1.6',
    error: null,
    lastSync: null,
    // Date
    localActs: {} // deviceId -> { acked:bool, resolved:bool } for live alerts
  };
  const listeners = new Set();
  function emit() {
    listeners.forEach(fn => {
      try {
        fn();
      } catch (e) {}
    });
  }
  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }
  function setState(patch) {
    Object.assign(store, patch);
    emit();
  }
  function useStore() {
    const [, force] = React.useReducer(x => x + 1, 0);
    React.useEffect(() => subscribe(force), []);
    return store;
  }

  // ---- RoomOS version verification ----
  function parseVer(str) {
    const m = String(str == null ? '' : str).match(/(\d+)(?:\.(\d+))?(?:\.(\d+))?(?:\.(\d+))?/);
    if (!m) return null;
    return [1, 2, 3, 4].map(i => parseInt(m[i] || '0', 10));
  }
  function cmpVer(a, b) {
    const pa = parseVer(a),
      pb = parseVer(b);
    if (!pa && !pb) return 0;
    if (!pa) return -1;
    if (!pb) return 1;
    for (let i = 0; i < 4; i++) {
      if (pa[i] !== pb[i]) return pa[i] < pb[i] ? -1 : 1;
    }
    return 0;
  }
  function cleanVer(str) {
    const p = parseVer(str);
    return p ? p.join('.').replace(/(?:\.0)+$/, '') : str || '—';
  }
  function roomos(d) {
    return d.version || d.fw;
  }

  // Baseline = the latest RoomOS present in the fleet (the update target).
  function computeBaseline(devs) {
    let best = null;
    devs.forEach(d => {
      const v = roomos(d);
      if (v && v !== '—') {
        if (best === null || cmpVer(v, best) > 0) best = v;
      }
    });
    return best ? cleanVer(best) : null;
  }
  function markFw(devs, baseline) {
    return devs.map(d => ({
      ...d,
      fwOld: baseline ? cmpVer(roomos(d), baseline) < 0 : false
    }));
  }
  function bldg(name) {
    return (String(name || '').split(/\s*[-\u2013\u2014|\u00b7:]\s*/)[0] || '').trim() || name || '';
  }

  // Group devices into workspaces (rooms). wsMeta = optional [{id, displayName}] from Webex.
  function buildWorkspaces(devices, wsMeta) {
    const metaMap = {};
    (wsMeta || []).forEach(w => {
      if (w && w.id) metaMap[w.id] = w.displayName;
    });
    const map = new Map();
    devices.forEach(d => {
      const id = d.workspaceId || 'room::' + (d.site || '') + '::' + (d.room || d.name);
      if (!map.has(id)) {
        const name = d.workspaceName || metaMap[id] || d.room || d.name || 'Unassigned';
        map.set(id, {
          id,
          name,
          building: d.site || bldg(name) || 'Unassigned',
          devices: []
        });
      }
      map.get(id).devices.push(d);
    });
    return Array.from(map.values()).sort((a, b) => (a.building + '/' + a.name).localeCompare(b.building + '/' + b.name));
  }
  function loadDemo() {
    const dev = DEMO_DEVICES.map(d => ({
      ...d
    }));
    setState({
      mode: 'demo',
      status: 'ready',
      connected: false,
      org: null,
      me: null,
      devices: dev,
      workspaces: buildWorkspaces(dev),
      baseline: '11.21.1.6',
      error: null,
      lastSync: new Date(),
      localActs: {}
    });
  }

  // devices: already mapped by webex.mapDevice
  function setLive({
    org,
    me,
    devices,
    workspaces
  }) {
    const baseline = computeBaseline(devices);
    const withFw = markFw(devices, baseline);
    setState({
      mode: 'live',
      status: 'ready',
      connected: true,
      org: org || null,
      me: me || null,
      devices: withFw,
      workspaces: buildWorkspaces(withFw, workspaces),
      baseline,
      error: null,
      lastSync: new Date()
    });
  }

  // Merge a background poll result into one device, re-deriving in-call & version state.
  function applyLiveStatus(id, s) {
    let touched = false;
    const devs = store.devices.map(d => {
      if (d.id !== id) return d;
      touched = true;
      const next = {
        ...d,
        polledAt: Date.now()
      };
      if (s.version) next.version = cleanVer(s.version);
      if (s.uptime != null) next.uptimeSec = s.uptime;
      if (s.activeCalls != null) {
        next.activeCalls = s.activeCalls;
        if (d.state === 'online' || d.state === 'incall') next.state = s.activeCalls > 0 ? 'incall' : 'online';
      }
      return next;
    });
    if (!touched) return;
    const baseline = computeBaseline(devs) || store.baseline;
    setState({
      devices: markFw(devs, baseline),
      baseline
    });
  }

  // RoomOS version distribution + behind-baseline summary.
  function firmwareSummary() {
    const dist = {};
    store.devices.forEach(d => {
      const v = cleanVer(roomos(d)) || '—';
      dist[v] = (dist[v] || 0) + 1;
    });
    const versions = Object.keys(dist).sort((a, b) => cmpVer(b, a)).map(v => ({
      version: v,
      count: dist[v],
      behind: store.baseline ? cmpVer(v, store.baseline) < 0 : false
    }));
    const behind = store.devices.filter(d => d.fwOld).length;
    return {
      baseline: store.baseline,
      behind,
      upToDate: store.devices.length - behind,
      versions
    };
  }
  function patchDevice(id, patch) {
    setState({
      devices: store.devices.map(d => d.id === id ? {
        ...d,
        ...patch
      } : d)
    });
  }

  // Merge a freshly-fetched (mapped) device over the stored one, re-deriving firmware state.
  function mergeDevice(id, mapped) {
    if (!mapped) return;
    const devs = store.devices.map(d => {
      if (d.id !== id) return d;
      // keep workspace/site enrichment we computed at connect time
      return {
        ...d,
        ...mapped,
        room: d.room,
        site: d.site,
        workspaceId: d.workspaceId,
        workspaceName: d.workspaceName
      };
    });
    const baseline = computeBaseline(devs) || store.baseline;
    setState({
      devices: markFw(devs, baseline),
      baseline
    });
  }
  function counts(devs) {
    const list = devs || store.devices;
    const c = {
      total: list.length,
      online: 0,
      incall: 0,
      degraded: 0,
      critical: 0,
      offline: 0
    };
    list.forEach(d => {
      if (c[d.state] != null) c[d.state]++;
    });
    return c;
  }
  function sites() {
    const set = new Set();
    store.devices.forEach(d => {
      if (d.site) set.add(d.site);
    });
    return Array.from(set).sort();
  }

  // Build the alert queue. Demo mode returns the curated list; live derives from device state.
  function alerts() {
    if (store.mode === 'demo') return ALERTS_DEMO;
    const out = [];
    store.devices.forEach(d => {
      const act = store.localActs[d.id] || {};
      const status = act.resolved ? 'resolved' : act.acked ? 'ack' : 'open';
      if (d.state === 'critical') {
        out.push({
          id: 'al-c-' + d.id,
          sev: 'critical',
          device: d.name,
          site: d.site || '—',
          msg: d.issue || 'Device unreachable',
          time: relTime(d.lastSeen),
          status,
          who: act.who || null,
          deviceId: d.id
        });
      } else if (d.state === 'offline') {
        out.push({
          id: 'al-o-' + d.id,
          sev: 'warning',
          device: d.name,
          site: d.site || '—',
          msg: d.issue || 'Disconnected',
          time: relTime(d.lastSeen),
          status,
          who: act.who || null,
          deviceId: d.id
        });
      } else if (d.state === 'degraded') {
        out.push({
          id: 'al-d-' + d.id,
          sev: 'warning',
          device: d.name,
          site: d.site || '—',
          msg: d.issue || 'Connected with issues',
          time: relTime(d.lastSeen),
          status,
          who: act.who || null,
          deviceId: d.id
        });
      }
      if (d.fwOld) {
        out.push({
          id: 'al-f-' + d.id,
          sev: 'info',
          device: d.name,
          site: d.site || '—',
          msg: 'Firmware behind fleet baseline (' + store.baseline + ')',
          time: relTime(d.lastSeen),
          status: 'open',
          who: null,
          deviceId: d.id
        });
      }
    });
    return out;
  }
  function setLocalAct(deviceId, patch) {
    const next = {
      ...store.localActs,
      [deviceId]: {
        ...(store.localActs[deviceId] || {}),
        ...patch
      }
    };
    setState({
      localActs: next
    });
  }
  function relTime(iso) {
    if (!iso) return '—';
    const t = Date.parse(iso);
    if (isNaN(t)) return '—';
    const s = Math.max(0, (Date.now() - t) / 1000);
    if (s < 60) return 'just now';
    const m = s / 60;
    if (m < 60) return Math.round(m) + 'm ago';
    const h = m / 60;
    if (h < 24) return Math.round(h) + 'h ago';
    return Math.round(h / 24) + 'd ago';
  }
  function fmtUptime(sec) {
    if (sec == null || isNaN(sec)) return '—';
    sec = Number(sec);
    const d = Math.floor(sec / 86400);
    const h = Math.floor(sec % 86400 / 3600);
    const m = Math.floor(sec % 3600 / 60);
    if (d > 0) return d + 'd ' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
    return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0');
  }
  window.WRF_DATA = {
    SITES,
    STATE_LABEL,
    STATE_VAR,
    ACTIVITY_DEMO,
    store,
    subscribe,
    useStore,
    setState,
    loadDemo,
    setLive,
    patchDevice,
    mergeDevice,
    setLocalAct,
    buildWorkspaces,
    applyLiveStatus,
    counts,
    sites,
    alerts,
    relTime,
    fmtUptime,
    firmwareSummary,
    cmpVer,
    cleanVer
  };

  // Build workspaces for the initial demo fleet.
  store.workspaces = buildWorkspaces(store.devices);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/data.js", error: String((e && e.message) || e) }); }

// ui_kits/console/devices.view.jsx
try { (() => {
/* WeRoFleet Console — Devices table + Device detail drawer */
(function () {
  const {
    useState
  } = React;
  const {
    Card,
    StatusBadge,
    Badge,
    Button,
    IconButton,
    Input,
    Select,
    Checkbox,
    Tabs,
    Avatar,
    Tooltip,
    ProgressBar,
    Banner
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  const WX = window.WRF_WEBEX;
  const PageHead = window.WRF_PageHead;
  const CALL_LABELS = {
    JoinWebex: 'Webex',
    JoinMicrosoftTeamsDirectGuestJoin: 'Microsoft Teams',
    JoinGoogleMeet: 'Google Meet',
    JoinZoom: 'Zoom'
  };
  function notify(msg, tone) {
    if (window.WRF_notify) window.WRF_notify(msg, tone);
  }

  // Fresh live check of active calls just before a reboot. Falls back to cached state.
  async function liveInCall(d) {
    if (DATA.store.mode !== 'live') return d.state === 'incall';
    try {
      const s = await WX.liveStatus(d.id, 'high');
      if (s && s.activeCalls != null) return s.activeCalls > 0;
    } catch (e) {/* fall back to cached state */}
    return d.state === 'incall';
  }

  // Confirm a single-device reboot, warning hard if it's currently in a call.
  async function confirmReboot(d) {
    if (await liveInCall(d)) {
      return window.confirm(`⚠\uFE0F ${d.name} is currently IN A CALL. Rebooting will disconnect everyone on it.\n\nReboot anyway?`);
    }
    return window.confirm(`Reboot ${d.name}? It will briefly go offline.`);
  }
  async function doReboot(d) {
    if (DATA.store.mode !== 'live') {
      notify(`Reboot sent to ${d.name} (demo)`, 'neutral');
      return;
    }
    if (!(await confirmReboot(d))) return;
    notify(`Rebooting ${d.name}…`, 'neutral');
    WX.reboot(d.id).then(() => notify(`${d.name} is rebooting`, 'success')).catch(e => notify(`Reboot failed: ${e.message}`, 'critical'));
  }
  function Devices({
    onOpenDevice
  }) {
    const store = DATA.useStore();
    const [q, setQ] = useState('');
    const [site, setSite] = useState('');
    const [tab, setTab] = useState('all');
    const [sel, setSel] = useState({});
    const all = store.devices;
    const attentionN = all.filter(d => d.state === 'critical' || d.state === 'degraded').length;
    const incallN = all.filter(d => d.state === 'incall').length;
    let rows = all;
    if (tab === 'attention') rows = rows.filter(d => d.state === 'critical' || d.state === 'degraded');
    if (tab === 'incall') rows = rows.filter(d => d.state === 'incall');
    if (site) rows = rows.filter(d => d.site === site);
    if (q) rows = rows.filter(d => (d.name + d.serial + (d.room || '') + d.model).toLowerCase().includes(q.toLowerCase()));
    const selCount = Object.values(sel).filter(Boolean).length;
    const allChecked = rows.length > 0 && rows.every(d => sel[d.id]);
    const someChecked = rows.some(d => sel[d.id]) && !allChecked;
    const toggleAll = () => {
      const next = {
        ...sel
      };
      rows.forEach(d => {
        next[d.id] = !allChecked;
      });
      setSel(next);
    };
    const bulkReboot = async () => {
      const targets = all.filter(d => sel[d.id]);
      if (store.mode !== 'live') {
        notify(`Reboot sent to ${targets.length} devices (demo)`, 'neutral');
        setSel({});
        return;
      }
      // Fresh in-call check across the selection before doing anything.
      notify('Checking call status…', 'neutral');
      const checks = await Promise.all(targets.map(async d => ({
        d,
        inCall: await liveInCall(d)
      })));
      const busy = checks.filter(c => c.inCall).map(c => c.d);
      let msg = `Reboot ${targets.length} device(s)? They will briefly go offline.`;
      if (busy.length) {
        const names = busy.slice(0, 3).map(d => d.name).join(', ') + (busy.length > 3 ? `, +${busy.length - 3} more` : '');
        msg = `⚠\uFE0F ${busy.length} of ${targets.length} selected device(s) are IN A CALL (${names}). Rebooting will disconnect them.\n\nReboot all anyway?`;
      }
      if (!window.confirm(msg)) return;
      notify(`Rebooting ${targets.length} devices…`, 'neutral');
      Promise.allSettled(targets.map(d => WX.reboot(d.id))).then(res => {
        const ok = res.filter(r => r.status === 'fulfilled').length;
        notify(`${ok}/${targets.length} reboots sent`, ok === targets.length ? 'success' : 'warning');
        setSel({});
      });
    };
    const siteOpts = ['', ...DATA.sites()].map(s => ({
      value: s,
      label: s || 'All sites'
    }));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
      title: "Devices",
      sub: `${all.length} ${all.length === 1 ? 'device' : 'devices'}${store.mode === 'live' ? '' : ' · demo'}`,
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        leadingIcon: I('sliders-horizontal')
      }, "Columns"), /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        leadingIcon: I('plus')
      }, "Add device"))
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-toolbar"
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'all',
        label: 'All',
        count: all.length
      }, {
        value: 'attention',
        label: 'Needs attention',
        icon: I('alert-triangle'),
        count: attentionN
      }, {
        value: 'incall',
        label: 'In call',
        count: incallN
      }]
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-toolbar-right"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 220
      }
    }, /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      leadingIcon: I('search'),
      placeholder: "Search devices\u2026",
      value: q,
      onChange: e => setQ(e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 170
      }
    }, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      value: site,
      onChange: e => setSite(e.target.value),
      options: siteOpts
    })))), selCount > 0 && /*#__PURE__*/React.createElement("div", {
      className: "wrf-bulkbar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-bulk-count"
    }, selCount, " selected"), /*#__PURE__*/React.createElement("div", {
      className: "wrf-bulk-actions"
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      leadingIcon: I('rotate-cw'),
      onClick: bulkReboot
    }, "Reboot"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      leadingIcon: I('image')
    }, "Branding\u2026"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      leadingIcon: I('tag')
    }, "Tag")), /*#__PURE__*/React.createElement("button", {
      className: "wrf-bulk-clear",
      onClick: () => setSel({})
    }, "Clear")), rows.length === 0 ? /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '40px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-ic"
    }, I('monitor-off')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-title"
    }, "No matching devices"), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, all.length === 0 ? 'No devices in this org yet — or none returned by the Devices API.' : 'Try a different filter or search.'))) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-table-wrap"
    }, /*#__PURE__*/React.createElement("table", {
      className: "wrf-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: "wrf-th-check"
    }, /*#__PURE__*/React.createElement(Checkbox, {
      indeterminate: someChecked,
      checked: allChecked,
      onChange: toggleAll,
      "aria-label": "Select all"
    })), /*#__PURE__*/React.createElement("th", null, "Device"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Site \xB7 Room"), /*#__PURE__*/React.createElement("th", null, "Model"), /*#__PURE__*/React.createElement("th", null, "Firmware"), /*#__PURE__*/React.createElement("th", {
      className: "wrf-th-act"
    }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(d => /*#__PURE__*/React.createElement("tr", {
      key: d.id,
      className: "wrf-trow",
      onClick: () => onOpenDevice(d.id)
    }, /*#__PURE__*/React.createElement("td", {
      className: "wrf-td-check",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement(Checkbox, {
      checked: !!sel[d.id],
      onChange: () => setSel({
        ...sel,
        [d.id]: !sel[d.id]
      }),
      "aria-label": `Select ${d.name}`
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cell-device"
    }, /*#__PURE__*/React.createElement(Avatar, {
      kind: "device",
      name: d.name,
      size: "sm"
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cell-device-main"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-cell-device-name"
    }, d.name), /*#__PURE__*/React.createElement("span", {
      className: "wrf-cell-device-serial"
    }, d.serial)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StatusBadge, {
      state: d.state
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cell-2"
    }, /*#__PURE__*/React.createElement("span", null, d.site || '—'), d.room && d.room !== d.site && /*#__PURE__*/React.createElement("span", {
      className: "wrf-cell-sub"
    }, d.room))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "wrf-cell-model"
    }, d.model)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "wrf-cell-fw"
    }, d.fw, d.fwOld && /*#__PURE__*/React.createElement(Badge, {
      tone: "degraded",
      outline: true
    }, "old"))), /*#__PURE__*/React.createElement("td", {
      className: "wrf-td-act",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-act-wrap"
    }, /*#__PURE__*/React.createElement(Tooltip, {
      label: "Reboot",
      side: "left"
    }, /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      variant: "ghost",
      icon: I('rotate-cw'),
      label: "Reboot",
      onClick: () => doReboot(d)
    })), /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      variant: "ghost",
      icon: I('more-vertical'),
      label: "More"
    })))))))));
  }
  function Row({
    k,
    v,
    mono
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-dd-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-dd-k"
    }, k), /*#__PURE__*/React.createElement("span", {
      className: 'wrf-dd-v' + (mono ? ' mono' : '')
    }, v));
  }
  function DeviceDrawer({
    id,
    onClose
  }) {
    const store = DATA.useStore();
    const [tab, setTab] = useState('overview');
    const [det, setDet] = useState(null);
    const [detBusy, setDetBusy] = useState(false);
    const [detErr, setDetErr] = useState(null);
    const [cfg, setCfg] = useState(null);
    const [cfgBusy, setCfgBusy] = useState(false);
    const [cfgErr, setCfgErr] = useState(null);
    const [rebooting, setRebooting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showBranding, setShowBranding] = useState(false);
    const d = store.devices.find(x => x.id === id);
    const live = store.mode === 'live';
    function queryLive() {
      setDetBusy(true);
      setDetErr(null);
      WX.deviceDetail(d.id, 'normal').then(setDet).catch(e => setDetErr(e.message)).finally(() => setDetBusy(false));
    }
    function queryConfig() {
      setCfgBusy(true);
      setCfgErr(null);
      WX.getConfig(d.id, 'normal').then(setCfg).catch(e => setCfgErr(e.message)).finally(() => setCfgBusy(false));
    }

    // Re-fetch this device's connection status (Devices API) and live xAPI detail.
    function refreshStatus() {
      if (!live) {
        notify('Connect Webex to refresh live status', 'neutral');
        return;
      }
      setRefreshing(true);
      Promise.resolve(WX.getDevice(d.id, 'high')).then(m => {
        DATA.mergeDevice(d.id, m);
      }).catch(e => notify('Status refresh failed: ' + e.message, 'critical')).finally(() => setRefreshing(false));
      queryLive();
    }
    async function reboot() {
      if (!live) {
        notify(`Reboot sent to ${d.name} (demo)`, 'neutral');
        return;
      }
      setRebooting(true);
      const ok = await confirmReboot(d);
      if (!ok) {
        setRebooting(false);
        return;
      }
      notify(`Rebooting ${d.name}…`, 'neutral');
      WX.reboot(d.id).then(() => {
        notify(`${d.name} is rebooting`, 'success');
        DATA.patchDevice(d.id, {
          state: 'offline',
          issue: 'Rebooting…'
        });
        // Poll back to life: check status after the device has time to restart.
        setTimeout(() => WX.getDevice(d.id, 'low').then(m => DATA.mergeDevice(d.id, m)).catch(() => {}), 45000);
      }).catch(e => notify(`Reboot failed: ${e.message}`, 'critical')).finally(() => setRebooting(false));
    }

    // Auto-load live status + applied config when the drawer opens (live only).
    React.useEffect(() => {
      if (!live || !d) return;
      queryLive();
      queryConfig();
      // eslint-disable-next-line
    }, [id, live]);
    if (!d) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-scrim",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("aside", {
      className: "wrf-drawer",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-title"
    }, /*#__PURE__*/React.createElement(Avatar, {
      kind: "device",
      name: d.name,
      size: "lg",
      statusColor: DATA.STATE_VAR[d.state]
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "wrf-drawer-name"
    }, d.name), /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-meta"
    }, [d.model, d.room || d.site].filter(Boolean).join(' · ')))), /*#__PURE__*/React.createElement(IconButton, {
      variant: "ghost",
      icon: I('x'),
      label: "Close",
      onClick: onClose
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-statusrow"
    }, /*#__PURE__*/React.createElement(StatusBadge, {
      state: d.state
    }), d.fwOld && /*#__PURE__*/React.createElement(Badge, {
      tone: "degraded",
      outline: true
    }, "Firmware behind"), /*#__PURE__*/React.createElement("span", {
      className: "wrf-drawer-seen"
    }, live ? `Last seen ${DATA.relTime(d.lastSeen)}` : d.state === 'critical' || d.state === 'offline' ? d.issue : 'Last seen just now'), live && /*#__PURE__*/React.createElement(Tooltip, {
      label: "Refresh status",
      side: "left"
    }, /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      variant: "ghost",
      icon: refreshing ? I('loader-2', {
        className: 'wrf-spin'
      }) : I('refresh-cw'),
      label: "Refresh status",
      onClick: refreshStatus,
      disabled: refreshing
    }))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-actions"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      size: "sm",
      leadingIcon: rebooting ? I('loader-2', {
        className: 'wrf-spin'
      }) : I('rotate-cw'),
      onClick: reboot,
      disabled: rebooting
    }, rebooting ? 'Rebooting…' : 'Reboot'), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      leadingIcon: I('image'),
      onClick: () => setShowBranding(true)
    }, "Branding"), live && /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      leadingIcon: detBusy ? I('loader-2', {
        className: 'wrf-spin'
      }) : I('activity'),
      onClick: queryLive,
      disabled: detBusy
    }, detBusy ? 'Querying…' : 'Query xAPI'), /*#__PURE__*/React.createElement(IconButton, {
      variant: "outline",
      size: "sm",
      icon: I('more-horizontal'),
      label: "More"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-tabs"
    }, /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      tabs: [{
        value: 'overview',
        label: 'Overview'
      }, {
        value: 'config',
        label: 'Configuration'
      }, {
        value: 'peripherals',
        label: 'Peripherals'
      }, {
        value: 'history',
        label: 'History'
      }]
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-drawer-body"
    }, tab === 'overview' && /*#__PURE__*/React.createElement(React.Fragment, null, d.issue && d.state !== 'incall' && /*#__PURE__*/React.createElement(Banner, {
      tone: d.state === 'critical' ? 'critical' : 'warning',
      title: d.issue
    }), det && det.activeCalls > 0 && /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      title: `In a call now · ${det.activeCalls} active`
    }), detErr && /*#__PURE__*/React.createElement(Banner, {
      tone: "critical",
      title: "xAPI query failed"
    }, detErr), /*#__PURE__*/React.createElement(Card, {
      title: "Identity"
    }, /*#__PURE__*/React.createElement(Row, {
      k: "Serial",
      v: d.serial,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "IP address",
      v: d.ip,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "MAC",
      v: d.mac,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Software",
      v: d.fw,
      mono: true
    }), /*#__PURE__*/React.createElement(Row, {
      k: "Uptime",
      v: det && det.uptime != null ? DATA.fmtUptime(det.uptime) : detBusy ? 'Loading…' : live ? '—' : d.uptime,
      mono: true
    }), live && d.workspaceName && /*#__PURE__*/React.createElement(Row, {
      k: "Workspace",
      v: d.workspaceName
    })), !live && /*#__PURE__*/React.createElement(Card, {
      title: "Health",
      subtitle: "Sample data"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(ProgressBar, {
      label: "CPU",
      value: d.state === 'critical' ? 0 : 34,
      showValue: true,
      tone: "online"
    }), /*#__PURE__*/React.createElement(ProgressBar, {
      label: "Memory",
      value: d.state === 'critical' ? 0 : 61,
      showValue: true,
      tone: "online"
    }), /*#__PURE__*/React.createElement(ProgressBar, {
      label: "Storage",
      value: d.name === 'Boardroom A' ? 88 : 47,
      showValue: true,
      tone: d.name === 'Boardroom A' ? 'degraded' : 'online'
    })))), tab === 'config' && /*#__PURE__*/React.createElement(Card, {
      title: "Applied configuration",
      subtitle: live ? 'Live from deviceConfigurations' : 'Connect Webex to read live config',
      action: live ? /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        leadingIcon: cfgBusy ? I('loader-2', {
          className: 'wrf-spin'
        }) : I('refresh-cw'),
        onClick: queryConfig,
        disabled: cfgBusy
      }, "Refresh") : null
    }, !live ? /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '28px 8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-ic"
    }, I('plug')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, "The current CustomMessage and call-button visibility are read from the device once you connect a Webex org.")) : cfgErr ? /*#__PURE__*/React.createElement(Banner, {
      tone: "critical",
      title: "Couldn't read configuration"
    }, cfgErr) : !cfg ? /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '28px 8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-ic"
    }, I('loader-2', {
      className: 'wrf-spin'
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, "Reading device configuration\u2026")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Row, {
      k: "Custom message",
      v: cfg.customMessage != null && cfg.customMessage !== '' ? cfg.customMessage : '— (not set)'
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-divider"
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-callhead"
    }, "Call buttons"), WX.CALL_FEATURE_KEYS.map(k => /*#__PURE__*/React.createElement("div", {
      key: k,
      className: "wrf-dd-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-dd-k"
    }, CALL_LABELS[k]), /*#__PURE__*/React.createElement("span", {
      className: "wrf-dd-v"
    }, cfg.call[k] != null ? /*#__PURE__*/React.createElement(Badge, {
      tone: cfg.call[k] === 'Auto' ? 'online' : 'neutral',
      outline: true
    }, cfg.call[k]) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)'
      }
    }, "\u2014")))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-divider"
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-callhead"
    }, "Interface"), /*#__PURE__*/React.createElement("div", {
      className: "wrf-dd-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-dd-k"
    }, "Custom wallpaper overlay"), /*#__PURE__*/React.createElement("span", {
      className: "wrf-dd-v"
    }, cfg.wallpaperOverlay != null ? /*#__PURE__*/React.createElement(Badge, {
      tone: cfg.wallpaperOverlay === 'On' ? 'online' : 'neutral',
      outline: true
    }, cfg.wallpaperOverlay) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)'
      }
    }, "\u2014"))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-dd-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-dd-k"
    }, "Home screen dashboard"), /*#__PURE__*/React.createElement("span", {
      className: "wrf-dd-v"
    }, cfg.dashboard != null ? /*#__PURE__*/React.createElement(Badge, {
      tone: cfg.dashboard === 'On' ? 'online' : 'neutral',
      outline: true
    }, cfg.dashboard) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-tertiary)'
      }
    }, "\u2014"))))), /*#__PURE__*/React.createElement(Card, {
      title: "Connected peripherals"
    }, live ? det ? det.peripherals && det.peripherals.length ? /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph"
    }, det.peripherals.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "wrf-periph-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-periph-ic"
    }, I(periphIcon(p))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-main"
    }, /*#__PURE__*/React.createElement("b", null, p.Name || p.Type || 'Device'), /*#__PURE__*/React.createElement("span", null, [p.Type, p.SoftwareInfo].filter(Boolean).join(' · ') || '—')), /*#__PURE__*/React.createElement(StatusBadge, {
      state: String(p.Status).toLowerCase() === 'connected' ? 'online' : 'degraded',
      plain: true
    })))) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '24px 8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, "No peripherals reported.")) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '28px 8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-ic"
    }, I('plug')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, "Run an xAPI query to load live peripherals."), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      onClick: queryLive,
      disabled: detBusy,
      leadingIcon: detBusy ? I('loader-2', {
        className: 'wrf-spin'
      }) : I('activity')
    }, "Query device")) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-periph-ic"
    }, I('camera')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-main"
    }, /*#__PURE__*/React.createElement("b", null, "Quad Camera"), /*#__PURE__*/React.createElement("span", null, "Firmware 1.0.6 \xB7 Healthy")), /*#__PURE__*/React.createElement(StatusBadge, {
      state: d.state === 'degraded' ? 'degraded' : 'online',
      plain: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-periph-ic"
    }, I('mic')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-main"
    }, /*#__PURE__*/React.createElement("b", null, "Table Microphone \xD72"), /*#__PURE__*/React.createElement("span", null, "Healthy")), /*#__PURE__*/React.createElement(StatusBadge, {
      state: "online",
      plain: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-periph-ic"
    }, I('tablet')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-main"
    }, /*#__PURE__*/React.createElement("b", null, "Touch 10 Controller"), /*#__PURE__*/React.createElement("span", null, "Paired")), /*#__PURE__*/React.createElement(StatusBadge, {
      state: "online",
      plain: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-periph-ic"
    }, I('monitor')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-periph-main"
    }, /*#__PURE__*/React.createElement("b", null, "Display \xB7 HDMI 1"), /*#__PURE__*/React.createElement("span", null, d.name === 'Riverside Briefing' ? 'Handshake errors' : '3840×2160 · 60Hz')), /*#__PURE__*/React.createElement(StatusBadge, {
      state: d.name === 'Riverside Briefing' ? 'degraded' : 'online',
      plain: true
    })))), ")}", tab === 'history' && /*#__PURE__*/React.createElement(Card, {
      title: "Recent events"
    }, live ? /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '24px 8px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, "Per-device history isn't available from the Devices API.")) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-timeline"
    }, [['Rebooted by Priya Anand', '12m ago', 'rotate-cw'], ['Joined call · Q3 Planning', '38m ago', 'video'], ['Firmware check passed', '2h ago', 'check-circle-2'], ['Config pushed', '1d ago', 'settings'], ['Came online', '14d ago', 'power']].map(([t, time, ic], i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "wrf-tl-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-tl-ic"
    }, I(ic)), /*#__PURE__*/React.createElement("div", {
      className: "wrf-tl-main"
    }, /*#__PURE__*/React.createElement("span", null, t), /*#__PURE__*/React.createElement("span", {
      className: "wrf-tl-time"
    }, time))))))), showBranding && window.WRF_BrandingModal && React.createElement(window.WRF_BrandingModal, {
      device: d,
      live,
      currentCfg: cfg,
      onClose: () => setShowBranding(false),
      onApplied: () => {
        queryConfig();
      }
    })));
  }
  function periphIcon(p) {
    const t = String(p.Type || p.Name || '').toLowerCase();
    if (t.includes('camera')) return 'camera';
    if (t.includes('mic')) return 'mic';
    if (t.includes('touch') || t.includes('navigator') || t.includes('control')) return 'tablet';
    if (t.includes('display') || t.includes('screen')) return 'monitor';
    return 'plug';
  }
  window.WRF_Devices = Devices;
  window.WRF_DeviceDrawer = DeviceDrawer;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/devices.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/overview.view.jsx
try { (() => {
/* WeRoFleet Console — Overview screen */
(function () {
  const {
    Card,
    MetricStat,
    StatusBadge,
    Banner,
    Button,
    Badge,
    ProgressBar,
    Avatar
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  function PageHead({
    title,
    sub,
    actions
  }) {
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-pagehead"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
      className: "wrf-h1"
    }, title), sub && /*#__PURE__*/React.createElement("p", {
      className: "wrf-sub"
    }, sub)), actions && /*#__PURE__*/React.createElement("div", {
      className: "wrf-pagehead-actions"
    }, actions));
  }
  window.WRF_PageHead = PageHead;
  function DonutBar({
    c
  }) {
    const segs = [['online', c.online, 'var(--status-online)'], ['incall', c.incall, 'var(--status-incall)'], ['degraded', c.degraded, 'var(--status-degraded)'], ['critical', c.critical, 'var(--status-critical)'], ['offline', c.offline, 'var(--status-offline)']];
    const any = segs.some(([, v]) => v > 0);
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-stack-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-stack-track"
    }, any ? segs.map(([k, v, col]) => v > 0 && /*#__PURE__*/React.createElement("div", {
      key: k,
      className: "wrf-stack-seg",
      style: {
        flex: v,
        background: col
      },
      title: `${k}: ${v}`
    })) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-stack-seg",
      style: {
        flex: 1,
        background: 'var(--slate-200)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-stack-legend"
    }, segs.map(([k, v, col]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      className: "wrf-legend-item"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-legend-dot",
      style: {
        background: col
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "wrf-legend-k"
    }, k), /*#__PURE__*/React.createElement("span", {
      className: "wrf-legend-v"
    }, v)))));
  }
  function Overview({
    onOpenDevice,
    onNav,
    onConnect
  }) {
    const store = DATA.store;
    const live = store.mode === 'live';
    const devices = store.devices;
    const c = DATA.counts();
    const siteN = DATA.sites().length;
    const attention = devices.filter(d => d.state === 'critical' || d.state === 'degraded');
    const down = devices.filter(d => d.state === 'critical' || d.state === 'offline');
    const onBaseline = devices.filter(d => !d.fwOld).length;
    const behind = devices.filter(d => d.fwOld).length;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
      title: "Fleet overview",
      sub: `${c.total} ${c.total === 1 ? 'device' : 'devices'}${siteN ? ` across ${siteN} ${siteN === 1 ? 'site' : 'sites'}` : ''} · ${live ? 'live' : 'demo data'}`,
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, !live && /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        leadingIcon: I('plug'),
        onClick: onConnect
      }, "Connect Webex"), /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        leadingIcon: I('download')
      }, "Export"), /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        leadingIcon: I('upload-cloud'),
        onClick: () => onNav('updates')
      }, "Deploy update"))
    }), !live && /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      title: "Showing sample data",
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        onClick: onConnect
      }, "Connect to Webex")
    }, "Connect your Webex org with an access token to monitor your real device fleet."), down.length > 0 && /*#__PURE__*/React.createElement(Banner, {
      tone: "critical",
      title: `${down.length} ${down.length === 1 ? 'device is' : 'devices are'} offline or unreachable`,
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        onClick: () => onNav('devices')
      }, "View devices")
    }, down.slice(0, 3).map(d => `${d.name}${d.site ? ` (${d.site})` : ''}`).join(', '), down.length > 3 ? ` and ${down.length - 3} more` : '', "."), /*#__PURE__*/React.createElement("div", {
      className: "wrf-metric-strip"
    }, /*#__PURE__*/React.createElement(Card, {
      pad: true
    }, /*#__PURE__*/React.createElement(MetricStat, {
      label: "Total devices",
      value: c.total,
      icon: I('monitor'),
      footnote: siteN ? `${siteN} ${siteN === 1 ? 'site' : 'sites'}` : null
    })), /*#__PURE__*/React.createElement(Card, {
      pad: true
    }, /*#__PURE__*/React.createElement(MetricStat, {
      label: "Online",
      value: c.online + c.incall,
      unit: `/ ${c.total}`,
      footnote: `${pct(c.online + c.incall, c.total)}% reachable`
    })), /*#__PURE__*/React.createElement(Card, {
      pad: true
    }, /*#__PURE__*/React.createElement(MetricStat, {
      label: "In call now",
      value: c.incall,
      icon: I('video'),
      footnote: live ? null : '71 participants'
    })), /*#__PURE__*/React.createElement(Card, {
      pad: true
    }, /*#__PURE__*/React.createElement(MetricStat, {
      label: "Needs attention",
      value: c.degraded + c.critical,
      footnote: c.critical ? `${c.critical} critical` : 'all clear'
    }))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-two-col"
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Fleet health",
      subtitle: "By operational state"
    }, /*#__PURE__*/React.createElement(DonutBar, {
      c: c
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Firmware coverage",
      subtitle: store.baseline ? `${store.baseline} baseline` : 'No baseline'
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        paddingTop: 4
      }
    }, /*#__PURE__*/React.createElement(ProgressBar, {
      label: "On baseline",
      value: onBaseline,
      max: c.total || 1,
      showValue: true,
      valueText: `${onBaseline} / ${c.total}`,
      tone: "online"
    }), /*#__PURE__*/React.createElement(ProgressBar, {
      label: "Behind baseline",
      value: behind,
      max: c.total || 1,
      showValue: true,
      valueText: `${behind} / ${c.total}`,
      tone: "degraded"
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-fw-note"
    }, I('info'), /*#__PURE__*/React.createElement("span", null, behind > 0 ? `${behind} ${behind === 1 ? 'device is' : 'devices are'} behind the fleet baseline.` : 'Every reachable device is on the baseline build.'))))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-two-col",
      style: {
        gridTemplateColumns: '1fr'
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Needs attention",
      subtitle: `${attention.length} ${attention.length === 1 ? 'device' : 'devices'}`,
      action: attention.length ? /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ghost",
        onClick: () => onNav('devices')
      }, "View all") : null
    }, attention.length ? /*#__PURE__*/React.createElement("div", {
      className: "wrf-mini-list"
    }, attention.slice(0, 6).map(d => /*#__PURE__*/React.createElement("button", {
      key: d.id,
      className: "wrf-mini-row",
      onClick: () => onOpenDevice(d.id)
    }, /*#__PURE__*/React.createElement(Avatar, {
      kind: "device",
      name: d.name
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-mini-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-mini-name"
    }, d.name), /*#__PURE__*/React.createElement("div", {
      className: "wrf-mini-meta"
    }, [d.site, d.model].filter(Boolean).join(' · '))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-mini-issue"
    }, d.issue), /*#__PURE__*/React.createElement(StatusBadge, {
      state: d.state
    }), /*#__PURE__*/React.createElement("span", {
      className: "wrf-mini-chev"
    }, I('chevron-right'))))) : /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty",
      style: {
        padding: '28px 12px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-ic",
      style: {
        color: 'var(--status-online-text)'
      }
    }, I('check-circle-2')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-title"
    }, "All devices healthy"), /*#__PURE__*/React.createElement("div", {
      className: "wrf-empty-sub"
    }, "No degraded or critical devices right now.")))));
  }
  function pct(n, d) {
    return d ? Math.round(n / d * 100) : 0;
  }
  window.WRF_Overview = Overview;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/overview.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/poller.js
try { (() => {
/* WeRoFleet Console — fleet poller
   Continuously sweeps every device's live xAPI status (in-call, RoomOS version,
   uptime) at LOW priority, so user actions always preempt it. After each full
   sweep it waits `cooldown` then sweeps again. Live mode only. */
(function () {
  let cfg = {};
  let stopped = true;
  let running = false;
  let timer = null;
  let sweeping = false;
  async function sweep() {
    if (stopped) return;
    sweeping = true;
    if (cfg.onState) cfg.onState({
      sweeping: true
    });
    const devices = cfg.getDevices && cfg.getDevices() || [];
    for (const d of devices) {
      if (stopped) {
        sweeping = false;
        return;
      }
      try {
        const s = await window.WRF_WEBEX.liveStatus(d.id, 'low');
        if (stopped) {
          sweeping = false;
          return;
        }
        if (cfg.onDevice) cfg.onDevice(d.id, s);
      } catch (e) {
        if (e && e.kind === 'cancelled') {
          sweeping = false;
          return;
        }
        // ignore per-device errors (offline device, transient) and continue
      }
    }
    sweeping = false;
    if (cfg.onState) cfg.onState({
      sweeping: false,
      sweptAt: Date.now()
    });
    if (!stopped) timer = setTimeout(sweep, cfg.cooldown || 20000);
  }
  function start(opts) {
    cfg = opts || {};
    stopped = false;
    if (!running) {
      running = true;
      sweep();
    }
  }
  function stop() {
    stopped = true;
    running = false;
    sweeping = false;
    clearTimeout(timer);
    if (window.WRF_RM) window.WRF_RM.clear('low'); // drop queued low-priority polls
  }
  function isRunning() {
    return running && !stopped;
  }
  window.WRF_POLLER = {
    start,
    stop,
    isRunning
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/poller.js", error: String((e && e.message) || e) }); }

// ui_kits/console/presets.js
try { (() => {
/* WeRoFleet Console — config presets store + apply engine (window.WRF_PRESETS)
   Presets are reusable config bundles authored in the Presets interface and
   applied to the devices inside selected workspaces. */
(function () {
  const KEY = 'wrf-presets-v1';
  const CALL_KEYS = [['JoinWebex', 'Webex'], ['JoinMicrosoftTeamsDirectGuestJoin', 'Microsoft Teams'], ['JoinGoogleMeet', 'Google Meet'], ['JoinZoom', 'Zoom']];
  const IMAGE_TYPE = 'HalfwakeBackground';
  const BG_TYPE = 'Background';
  // On/Off/Auto config toggles pushed via deviceConfigurations. 'auto' = leave unchanged.
  const VALUE_TOGGLES = [{
    key: 'wallpaperOverlay',
    label: 'Custom wallpaper overlay',
    path: 'UserInterface.CustomWallpaperOverlay'
  }, {
    key: 'dashboard',
    label: 'Home screen dashboard',
    path: 'UserInterface.HomeScreen.Dashboard'
  }];
  const delay = ms => new Promise(r => setTimeout(r, ms));
  function normImg(img) {
    return img && img.base64 ? {
      name: img.name || 'image',
      size: img.size || 0,
      base64: img.base64,
      url: img.url || 'data:image/png;base64,' + img.base64
    } : null;
  }

  // Branding modes: 'set' = upload image, 'remove' = Branding.Delete, 'auto' = leave unchanged.
  function migrate(p) {
    if (!p) return p;
    const m = (mode, flag) => mode === 'set' || mode === 'remove' || mode === 'auto' ? mode : flag === true ? 'set' : 'auto';
    p.imageMode = m(p.imageMode, p.useImage);
    p.bgMode = m(p.bgMode, p.useBgImage);
    // On/Off/Auto value toggles default to 'auto' (don't touch the device).
    VALUE_TOGGLES.forEach(t => {
      const v = p[t.key + 'Mode'];
      p[t.key + 'Mode'] = v === 'on' || v === 'off' || v === 'auto' ? v : 'auto';
    });
    return p;
  }
  const SEED = [{
    id: 'pr-standard',
    name: 'Standard meeting room',
    accent: '#0E7C86',
    description: 'Default branding for everyday meeting rooms — Webex & Teams visible.',
    image: null,
    imageMode: 'auto',
    bgImage: null,
    bgMode: 'auto',
    customMessage: 'If help needed, please call 9911.',
    useMessage: true,
    call: {
      JoinWebex: 'Auto',
      JoinMicrosoftTeamsDirectGuestJoin: 'Auto',
      JoinGoogleMeet: 'Hidden',
      JoinZoom: 'Hidden'
    },
    useCall: true,
    updatedAt: Date.now() - 864e5 * 4
  }, {
    id: 'pr-exec',
    name: 'Executive boardroom',
    accent: '#2A6FDB',
    description: 'All call platforms enabled for cross-company guests.',
    image: null,
    imageMode: 'auto',
    bgImage: null,
    bgMode: 'auto',
    customMessage: 'For AV support, dial 9911.',
    useMessage: true,
    call: {
      JoinWebex: 'Auto',
      JoinMicrosoftTeamsDirectGuestJoin: 'Auto',
      JoinGoogleMeet: 'Auto',
      JoinZoom: 'Auto'
    },
    useCall: true,
    updatedAt: Date.now() - 864e5 * 11
  }, {
    id: 'pr-lobby',
    name: 'Lobby / signage',
    accent: '#B0830B',
    description: 'Signage devices — no call buttons, reception message.',
    image: null,
    imageMode: 'auto',
    bgImage: null,
    bgMode: 'remove',
    customMessage: 'Welcome — please see reception for assistance.',
    useMessage: true,
    call: {
      JoinWebex: 'Hidden',
      JoinMicrosoftTeamsDirectGuestJoin: 'Hidden',
      JoinGoogleMeet: 'Hidden',
      JoinZoom: 'Hidden'
    },
    useCall: true,
    updatedAt: Date.now() - 864e5 * 2
  }];
  function load() {
    try {
      const v = JSON.parse(localStorage.getItem(KEY));
      if (Array.isArray(v)) return v.map(migrate);
    } catch (e) {}
    return SEED.map(s => migrate({
      ...s
    }));
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(presets));
    } catch (e) {}
  }
  let presets = load();
  const listeners = new Set();
  function emit() {
    listeners.forEach(f => {
      try {
        f();
      } catch (e) {}
    });
  }
  function subscribe(f) {
    listeners.add(f);
    return () => listeners.delete(f);
  }
  function useStore() {
    const [, force] = React.useReducer(x => x + 1, 0);
    React.useEffect(() => subscribe(force), []);
    return presets;
  }
  function all() {
    return presets;
  }
  function get(id) {
    return presets.find(p => p.id === id);
  }
  function upsert(p) {
    p = {
      ...p,
      updatedAt: Date.now()
    };
    const i = presets.findIndex(x => x.id === p.id);
    presets = i >= 0 ? presets.map((x, k) => k === i ? p : x) : [...presets, p];
    persist();
    emit();
    return p;
  }
  function remove(id) {
    presets = presets.filter(p => p.id !== id);
    persist();
    emit();
  }
  function duplicate(id) {
    const p = get(id);
    if (!p) return;
    upsert({
      ...p,
      id: 'pr-' + Math.random().toString(36).slice(2, 8),
      name: p.name + ' copy'
    });
  }
  function blank() {
    return {
      id: 'pr-' + Math.random().toString(36).slice(2, 8),
      name: '',
      description: '',
      accent: '#0E7C86',
      image: null,
      imageMode: 'auto',
      bgImage: null,
      bgMode: 'auto',
      wallpaperOverlayMode: 'auto',
      dashboardMode: 'auto',
      customMessage: 'If help needed, please call 9911.',
      useMessage: true,
      call: {
        JoinWebex: 'Auto',
        JoinMicrosoftTeamsDirectGuestJoin: 'Auto',
        JoinGoogleMeet: 'Hidden',
        JoinZoom: 'Hidden'
      },
      useCall: true
    };
  }
  function actions(p) {
    const a = [];
    if (p.imageMode === 'set' && p.image) a.push({
      label: 'Halfwake',
      tone: 'neutral'
    });else if (p.imageMode === 'remove') a.push({
      label: 'Halfwake: clear',
      tone: 'degraded'
    });
    if (p.bgMode === 'set' && p.bgImage) a.push({
      label: 'Background',
      tone: 'neutral'
    });else if (p.bgMode === 'remove') a.push({
      label: 'Background: clear',
      tone: 'degraded'
    });
    if (p.useMessage && p.customMessage) a.push({
      label: 'Message',
      tone: 'neutral'
    });
    if (p.useCall && p.call) a.push({
      label: 'Call buttons',
      tone: 'neutral'
    });
    VALUE_TOGGLES.forEach(t => {
      const m = p[t.key + 'Mode'];
      if (m === 'on' || m === 'off') a.push({
        label: t.label + ': ' + (m === 'on' ? 'On' : 'Off'),
        tone: m === 'on' ? 'neutral' : 'degraded'
      });
    });
    return a;
  }

  // ---- export / import ----
  function serialize(list) {
    return JSON.stringify({
      type: 'werofleet.presets',
      version: 1,
      exportedAt: new Date().toISOString(),
      presets: list
    }, null, 2);
  }
  function exportAll() {
    return serialize(presets);
  }
  function exportOne(id) {
    const p = get(id);
    return p ? serialize([p]) : null;
  }
  function normalizeCall(c) {
    const def = {
      JoinWebex: 'Auto',
      JoinMicrosoftTeamsDirectGuestJoin: 'Auto',
      JoinGoogleMeet: 'Hidden',
      JoinZoom: 'Hidden'
    };
    if (!c || typeof c !== 'object') return def;
    const out = {
      ...def
    };
    CALL_KEYS.forEach(([k]) => {
      if (c[k] === 'Auto' || c[k] === 'Hidden') out[k] = c[k];
    });
    return out;
  }
  function sanitize(raw) {
    raw = raw || {};
    const img = normImg(raw.image);
    const bg = normImg(raw.bgImage);
    const mode = (m, flag, hasImg) => m === 'set' || m === 'remove' || m === 'auto' ? m : flag === true ? 'set' : 'auto';
    return {
      id: 'pr-' + Math.random().toString(36).slice(2, 8),
      name: String(raw.name || 'Imported preset'),
      description: String(raw.description || ''),
      accent: raw.accent || '#0E7C86',
      image: img,
      imageMode: mode(raw.imageMode, raw.useImage),
      bgImage: bg,
      bgMode: mode(raw.bgMode, raw.useBgImage),
      wallpaperOverlayMode: ['on', 'off', 'auto'].includes(raw.wallpaperOverlayMode) ? raw.wallpaperOverlayMode : 'auto',
      dashboardMode: ['on', 'off', 'auto'].includes(raw.dashboardMode) ? raw.dashboardMode : 'auto',
      customMessage: raw.customMessage != null ? String(raw.customMessage) : '',
      useMessage: raw.useMessage !== false,
      call: normalizeCall(raw.call),
      useCall: raw.useCall !== false,
      updatedAt: Date.now()
    };
  }
  function importJSON(text) {
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      throw new Error('Invalid JSON file');
    }
    const arr = Array.isArray(data) ? data : data && Array.isArray(data.presets) ? data.presets : data && data.id ? [data] : null;
    if (!arr || !arr.length) throw new Error('No presets found in this file');
    const added = arr.map(sanitize);
    presets = [...presets, ...added];
    persist();
    emit();
    return added.length;
  }

  // Apply a preset to a list of devices. onLog receives entries; updates carry { uid, update:true }.
  async function apply(p, devices, opts) {
    opts = opts || {};
    const live = opts.live;
    const log = opts.onLog || function () {};
    const WX = window.WRF_WEBEX;
    let uid = 0;
    const head = d => log({
      uid: ++uid,
      kind: 'head',
      name: d.workspaceName || d.room || d.name,
      model: d.model
    });
    const start = label => {
      const id = ++uid;
      log({
        uid: id,
        kind: 'act',
        label,
        status: 'run'
      });
      return id;
    };
    const fin = (id, status, detail) => log({
      uid: id,
      update: true,
      status,
      detail
    });
    for (const d of devices) {
      head(d);
      await applyImage(d, p.imageMode, IMAGE_TYPE, p.image);
      await applyImage(d, p.bgMode, BG_TYPE, p.bgImage);
      async function applyImage(dev, mode, type, image) {
        if (mode === 'set' && image && image.base64) {
          const id = start('Upload ' + type);
          try {
            if (live) await WX.uploadBranding(dev.id, type, image.base64);else await delay(240);
            fin(id, 'ok');
          } catch (e) {
            fin(id, 'err', e.message);
          }
          await delay(200);
        } else if (mode === 'remove') {
          const id = start('Remove ' + type);
          try {
            if (live) await WX.deleteBranding(dev.id, type);else await delay(160);
            fin(id, 'ok');
          } catch (e) {
            fin(id, 'err', e.message);
          }
          await delay(200);
        }
        // 'auto' → leave unchanged
      }
      if (p.useMessage && p.customMessage != null) {
        const id = start('Set CustomMessage');
        try {
          if (live) await WX.setCustomMessage(d.id, p.customMessage);else await delay(180);
          fin(id, 'ok');
        } catch (e) {
          fin(id, 'err', e.message);
        }
        await delay(200);
      }
      if (p.useCall && p.call) {
        for (const [key, label] of CALL_KEYS) {
          const id = start('Call · ' + label + ' \u2192 ' + p.call[key]);
          try {
            if (live) await WX.setCallFeature(d.id, key, p.call[key]);else await delay(110);
            fin(id, 'ok');
          } catch (e) {
            fin(id, 'err', e.message);
          }
          await delay(140);
        }
      }
      for (const t of VALUE_TOGGLES) {
        const mode = p[t.key + 'Mode'];
        if (mode !== 'on' && mode !== 'off') continue; // 'auto' → leave unchanged
        const value = mode === 'on' ? 'On' : 'Off';
        const id = start(t.label + ' \u2192 ' + value);
        try {
          if (live) await WX.setConfigValue(d.id, t.path, value);else await delay(150);
          fin(id, 'ok');
        } catch (e) {
          fin(id, 'err', e.message);
        }
        await delay(160);
      }
    }
  }

  // Track which preset was last applied to each workspace (local only).
  const APPLIED_KEY = 'wrf-ws-applied-v1';
  function loadApplied() {
    try {
      return JSON.parse(localStorage.getItem(APPLIED_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function recordApplied(wsId, presetName) {
    const m = loadApplied();
    m[wsId] = {
      name: presetName,
      at: Date.now()
    };
    try {
      localStorage.setItem(APPLIED_KEY, JSON.stringify(m));
    } catch (e) {}
  }
  window.WRF_PRESETS = {
    all,
    get,
    upsert,
    remove,
    duplicate,
    blank,
    actions,
    useStore,
    subscribe,
    apply,
    exportAll,
    exportOne,
    importJSON,
    CALL_KEYS,
    IMAGE_TYPE,
    BG_TYPE,
    VALUE_TOGGLES,
    loadApplied,
    recordApplied
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/presets.js", error: String((e && e.message) || e) }); }

// ui_kits/console/presets.view.jsx
try { (() => {
/* WeRoFleet Console — Config presets library + editor (the authoring interface) */
(function () {
  const {
    useState,
    useRef
  } = React;
  const {
    Card,
    Button,
    Input,
    Switch,
    Badge,
    Tabs,
    IconButton,
    Banner
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const PR = window.WRF_PRESETS;
  const PageHead = window.WRF_PageHead;
  const ACCENTS = ['#0E7C86', '#2A6FDB', '#1F8A5B', '#B0830B', '#8257E6', '#C2410C'];
  function notify(msg, tone) {
    if (window.WRF_notify) window.WRF_notify(msg, tone);
  }
  function rel(ts) {
    if (!ts) return 'just now';
    const s = (Date.now() - ts) / 1000;
    if (s < 60) return 'just now';
    const d = Math.floor(s / 86400);
    if (d >= 1) return d + 'd ago';
    const h = Math.floor(s / 3600);
    if (h >= 1) return h + 'h ago';
    return Math.floor(s / 60) + 'm ago';
  }
  function fmtSize(bytes) {
    if (!bytes) return '0 KB';
    return bytes >= 1024 * 1024 ? (bytes / 1024 / 1024).toFixed(1) + ' MB' : Math.round(bytes / 1024) + ' KB';
  }

  // Downscale to fit within MAX (keeping aspect ratio, shrink-only) then return base64.
  const MAX_W = 3840,
    MAX_H = 2160;
  function resizeToBase64(file, cb) {
    const reader = new FileReader();
    reader.onerror = () => cb(new Error('Could not read the image'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => cb(new Error('Unsupported image file'));
      img.onload = () => {
        const scale = Math.min(1, MAX_W / img.width, MAX_H / img.height);
        const w = Math.max(1, Math.round(img.width * scale));
        const h = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, w, h);
        const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
        const url = canvas.toDataURL(mime, 0.9);
        const base64 = url.split(',')[1] || '';
        cb(null, {
          base64,
          url,
          w,
          h,
          bytes: Math.round(base64.length * 0.75),
          resized: scale < 1
        });
      };
      img.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  }
  function Presets({
    onGoWorkspaces
  }) {
    const presets = PR.useStore();
    const [editing, setEditing] = useState(null); // preset object or null
    const fileRef = useRef(null);
    function download(name, text) {
      if (!text) return;
      const blob = new Blob([text], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    function onImportFile(e) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        try {
          const n = PR.importJSON(String(r.result));
          notify(`Imported ${n} preset${n === 1 ? '' : 's'}`, 'success');
        } catch (err) {
          notify(err.message, 'critical');
        }
      };
      r.readAsText(f);
      e.target.value = '';
    }
    const slug = s => (s || 'preset').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
      title: "Config presets",
      sub: "Reusable branding & call-setting bundles \xB7 apply them from Workspaces",
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
        type: "file",
        accept: "application/json,.json",
        hidden: true,
        ref: fileRef,
        onChange: onImportFile
      }), /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        leadingIcon: I('upload'),
        onClick: () => fileRef.current && fileRef.current.click()
      }, "Import"), /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        leadingIcon: I('download'),
        onClick: () => download('werofleet-presets.json', PR.exportAll())
      }, "Export all"), /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        leadingIcon: I('plus'),
        onClick: () => setEditing(PR.blank())
      }, "New preset"))
    }), /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      title: "How presets work"
    }, "Build a preset here, then go to ", /*#__PURE__*/React.createElement("b", null, "Workspaces"), ", tick the rooms you want, and apply it. Each preset maps to the same Webex routes: ", /*#__PURE__*/React.createElement("code", null, "Branding.Upload"), ", ", /*#__PURE__*/React.createElement("code", null, "CustomMessage"), " and ", /*#__PURE__*/React.createElement("code", null, "UserInterface.Features.Call.*"), "."), /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-grid"
    }, presets.map(p => /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "wrf-preset-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-preset-swatch",
      style: {
        background: p.accent || 'var(--accent)'
      }
    }, p.imageMode === 'set' && p.image ? /*#__PURE__*/React.createElement("img", {
      src: p.image.url,
      alt: ""
    }) : I('layers')), /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-name-wrap"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-name"
    }, p.name || 'Untitled preset'), /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-updated"
    }, "Updated ", rel(p.updatedAt))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-menu"
    }, /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      variant: "ghost",
      icon: I('download'),
      label: "Export",
      onClick: () => download(slug(p.name) + '.json', PR.exportOne(p.id))
    }), /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      variant: "ghost",
      icon: I('copy'),
      label: "Duplicate",
      onClick: () => {
        PR.duplicate(p.id);
        notify('Preset duplicated', 'success');
      }
    }), /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      variant: "ghost",
      icon: I('pencil'),
      label: "Edit",
      onClick: () => setEditing({
        ...p
      })
    }), /*#__PURE__*/React.createElement(IconButton, {
      size: "sm",
      variant: "ghost",
      icon: I('trash-2'),
      label: "Delete",
      onClick: () => {
        if (window.confirm(`Delete preset “${p.name}”?`)) {
          PR.remove(p.id);
          notify('Preset deleted', 'neutral');
        }
      }
    }))), p.description && /*#__PURE__*/React.createElement("p", {
      className: "wrf-preset-desc"
    }, p.description), /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-actions"
    }, PR.actions(p).length ? PR.actions(p).map((a, i) => /*#__PURE__*/React.createElement(Badge, {
      key: i,
      tone: a.tone || 'neutral',
      outline: true
    }, a.label)) : /*#__PURE__*/React.createElement("span", {
      className: "wrf-cell-sub"
    }, "Leaves device unchanged")), /*#__PURE__*/React.createElement("div", {
      className: "wrf-preset-foot"
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      leadingIcon: I('pencil'),
      onClick: () => setEditing({
        ...p
      })
    }, "Edit"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      leadingIcon: I('door-open'),
      onClick: onGoWorkspaces
    }, "Apply\u2026"))))), editing && /*#__PURE__*/React.createElement(PresetEditor, {
      preset: editing,
      onClose: () => setEditing(null),
      onSave: p => {
        PR.upsert(p);
        setEditing(null);
        notify('Preset saved', 'success');
      }
    }));
  }
  function PresetEditor({
    preset,
    onClose,
    onSave
  }) {
    const [p, setP] = useState(preset);
    const set = patch => setP({
      ...p,
      ...patch
    });
    const setCall = (key, val) => setP({
      ...p,
      call: {
        ...p.call,
        [key]: val
      }
    });
    function onFile(e, fieldKey, modeKey, typeLabel) {
      const f = e.target.files && e.target.files[0];
      if (!f) return;
      if (!/^image\//.test(f.type)) {
        notify('Choose an image file', 'warning');
        return;
      }
      resizeToBase64(f, (err, out) => {
        if (err) {
          notify(err.message, 'critical');
          return;
        }
        set({
          [fieldKey]: {
            name: f.name,
            size: out.bytes,
            base64: out.base64,
            url: out.url,
            w: out.w,
            h: out.h
          },
          [modeKey]: 'set'
        });
        notify(out.resized ? `${typeLabel} resized to ${out.w}×${out.h} · ${fmtSize(out.bytes)}` : `${typeLabel} ready · ${out.w}×${out.h}`, 'success');
      });
      e.target.value = '';
    }
    function ImageBlock({
      label,
      hint,
      fieldKey,
      modeKey,
      brandType
    }) {
      const img = p[fieldKey];
      const mode = p[modeKey] || 'auto';
      return /*#__PURE__*/React.createElement("div", {
        className: "wrf-cfg-block"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wrf-cfg-head"
      }, /*#__PURE__*/React.createElement("span", {
        className: "wrf-cfg-title"
      }, label), /*#__PURE__*/React.createElement("div", {
        className: "wrf-seg wrf-seg-tri",
        "data-mode": mode
      }, /*#__PURE__*/React.createElement(Tabs, {
        variant: "pill",
        value: mode,
        onChange: v => set({
          [modeKey]: v
        }),
        tabs: [{
          value: 'set',
          label: 'On'
        }, {
          value: 'remove',
          label: 'Off'
        }, {
          value: 'auto',
          label: 'Auto'
        }]
      }))), mode === 'set' && /*#__PURE__*/React.createElement("div", {
        className: "wrf-imgdrop"
      }, /*#__PURE__*/React.createElement("div", {
        className: "wrf-imgprev",
        style: img ? {
          backgroundImage: `url(${img.url})`
        } : undefined
      }, !img && I('image')), /*#__PURE__*/React.createElement("div", {
        className: "wrf-imgmeta"
      }, img ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        className: "wrf-imgname"
      }, img.name), /*#__PURE__*/React.createElement("span", {
        className: "wrf-imgsize"
      }, img.w ? `${img.w}×${img.h} · ` : '', fmtSize(img.size), " \xB7 via Branding.Upload")) : /*#__PURE__*/React.createElement("span", {
        className: "wrf-imgsize"
      }, hint), /*#__PURE__*/React.createElement("label", {
        className: "wrf-filebtn"
      }, I('upload'), /*#__PURE__*/React.createElement("span", null, img ? 'Replace image' : 'Choose image'), /*#__PURE__*/React.createElement("input", {
        type: "file",
        accept: "image/*",
        onChange: e => onFile(e, fieldKey, modeKey, label),
        hidden: true
      })))), mode === 'remove' && /*#__PURE__*/React.createElement("div", {
        className: "wrf-cfg-removalnote",
        "data-tone": "warn"
      }, I('trash-2'), /*#__PURE__*/React.createElement("span", null, "On apply, sends ", /*#__PURE__*/React.createElement("b", null, "Branding.Delete"), " for ", /*#__PURE__*/React.createElement("b", null, brandType), " \u2014 clears any image left on the device.")), mode === 'auto' && /*#__PURE__*/React.createElement("div", {
        className: "wrf-cfg-removalnote"
      }, I('minus-circle'), /*#__PURE__*/React.createElement("span", null, "Left unchanged \u2014 this preset won't touch the device's ", /*#__PURE__*/React.createElement("b", null, brandType), ".")));
    }
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-scrim",
      onClick: onClose
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal wrf-editor",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-connect-ic",
      style: {
        background: 'color-mix(in srgb, ' + (p.accent || 'var(--accent)') + ' 16%, transparent)',
        color: p.accent || 'var(--accent)'
      }
    }, I('layers')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "wrf-modal-title"
    }, preset.name ? 'Edit preset' : 'New preset'), /*#__PURE__*/React.createElement("p", {
      className: "wrf-modal-sub"
    }, "A reusable bundle of device branding & call settings."))), /*#__PURE__*/React.createElement("button", {
      className: "wrf-modal-x",
      onClick: onClose,
      "aria-label": "Close"
    }, I('x'))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-body"
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Preset name",
      placeholder: "e.g. Standard meeting room",
      value: p.name,
      onChange: e => set({
        name: e.target.value
      })
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Description",
      placeholder: "What is this preset for?",
      value: p.description,
      onChange: e => set({
        description: e.target.value
      })
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-field-label",
      style: {
        marginTop: 4
      }
    }, "Accent"), /*#__PURE__*/React.createElement("div", {
      className: "wrf-accent-row"
    }, ACCENTS.map(c => /*#__PURE__*/React.createElement("button", {
      key: c,
      className: "wrf-accent-sw",
      "data-on": p.accent === c ? 'true' : undefined,
      style: {
        background: c
      },
      onClick: () => set({
        accent: c
      }),
      "aria-label": c
    }))), /*#__PURE__*/React.createElement(ImageBlock, {
      label: "Halfwake background",
      fieldKey: "image",
      modeKey: "imageMode",
      brandType: "HalfwakeBackground",
      hint: "Standby screen \xB7 PNG/JPG \xB7 auto-resized to max 3840\xD72160, ratio kept"
    }), /*#__PURE__*/React.createElement(ImageBlock, {
      label: "Background",
      fieldKey: "bgImage",
      modeKey: "bgMode",
      brandType: "Background",
      hint: "In-call wallpaper \xB7 PNG/JPG \xB7 auto-resized to max 3840\xD72160, ratio kept"
    }), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-block",
      "data-off": !p.useMessage ? 'true' : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-head"
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: p.useMessage,
      onChange: e => set({
        useMessage: e.target.checked
      }),
      label: "Custom message"
    })), /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      leadingIcon: I('message-square'),
      value: p.customMessage,
      onChange: e => set({
        customMessage: e.target.value
      }),
      placeholder: "Shown on the device home screen"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-block",
      "data-off": !p.useCall ? 'true' : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-head"
    }, /*#__PURE__*/React.createElement(Switch, {
      checked: p.useCall,
      onChange: e => set({
        useCall: e.target.checked
      }),
      label: "Call buttons"
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-call-grid"
    }, PR.CALL_KEYS.map(([key, label]) => /*#__PURE__*/React.createElement("div", {
      key: key,
      className: "wrf-call-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-call-label"
    }, label), /*#__PURE__*/React.createElement("div", {
      className: "wrf-seg"
    }, /*#__PURE__*/React.createElement(Tabs, {
      variant: "pill",
      value: p.call[key],
      onChange: v => setCall(key, v),
      tabs: [{
        value: 'Auto',
        label: 'Auto'
      }, {
        value: 'Hidden',
        label: 'Hidden'
      }]
    })))))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-cfg-title"
    }, "Interface toggles")), /*#__PURE__*/React.createElement("div", {
      className: "wrf-call-grid"
    }, PR.VALUE_TOGGLES.map(t => {
      const mk = t.key + 'Mode';
      const mode = p[mk] || 'auto';
      return /*#__PURE__*/React.createElement("div", {
        key: t.key,
        className: "wrf-call-row"
      }, /*#__PURE__*/React.createElement("span", {
        className: "wrf-call-label"
      }, t.label), /*#__PURE__*/React.createElement("div", {
        className: "wrf-seg wrf-seg-tri",
        "data-mode": mode === 'on' ? 'set' : mode === 'off' ? 'remove' : 'auto'
      }, /*#__PURE__*/React.createElement(Tabs, {
        variant: "pill",
        value: mode,
        onChange: v => set({
          [mk]: v
        }),
        tabs: [{
          value: 'on',
          label: 'On'
        }, {
          value: 'off',
          label: 'Off'
        }, {
          value: 'auto',
          label: 'Auto'
        }]
      })));
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-cfg-removalnote"
    }, I('info'), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Auto"), " leaves the device's current setting untouched. On / Off push the value via deviceConfigurations.")))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-foot"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: onClose
    }, "Cancel"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      leadingIcon: I('check'),
      disabled: !p.name.trim(),
      onClick: () => onSave(p)
    }, "Save preset"))));
  }
  window.WRF_Presets = Presets;
  window.WRF_UTIL = {
    resizeToBase64,
    fmtSize,
    rel
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/presets.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/request-manager.js
try { (() => {
/* WeRoFleet Console — RequestManager
   Throttles all Webex API calls to a global rate limit (default 3 req/s) with a
   3-level priority queue. Higher-priority jobs always start before lower ones.

   429 handling (adaptive backoff + auto-retry):
   - A job that rejects with kind 'rate' (HTTP 429) is automatically re-queued
     at the FRONT of its own priority lane and retried (up to MAX_ATTEMPTS).
   - The whole queue pauses for the server's Retry-After (or an exponential
     backoff), and the EFFECTIVE rate is cut so we ease off Webex.
   - When 429s stop, the effective rate ratchets back up to the configured rate.

   window.WRF_RM.schedule(fn, priority) -> Promise resolving to fn()'s result. */
(function () {
  const RATE_KEY = 'wrf-rate-limit';
  function loadRate() {
    const n = parseInt(localStorage.getItem(RATE_KEY), 10);
    return n >= 1 && n <= 20 ? n : 3;
  }
  let RATE = loadRate(); // configured ceiling (req per WINDOW)
  let effRate = RATE; // current effective rate (<= RATE; drops on 429)
  const WINDOW = 1000; // ms
  const ORDER = ['high', 'normal', 'low'];
  const MAX_ATTEMPTS = 6; // per-job retry cap for 429s
  const BACKOFF_BASE = 1000; // ms, first backoff when no Retry-After header
  const BACKOFF_MAX = 30000; // ms cap
  const RECOVERY_STEP = 4000; // ms of calm before nudging effRate back up

  const queues = {
    high: [],
    normal: [],
    low: []
  };
  let starts = []; // timestamps of recent request starts
  let pumping = false;
  let inFlight = 0;
  let totalDone = 0;
  let totalRetried = 0;

  // throttle state
  let pausedUntil = 0; // wall-clock ms; queue won't start jobs before this
  let consec429 = 0; // consecutive 429s (drives exponential backoff)
  let lastHit = 0; // last 429 timestamp
  let throttled = false;
  let recoveryTimer = null;
  const stateListeners = new Set();
  function emitState() {
    const s = snapshot();
    stateListeners.forEach(f => {
      try {
        f(s);
      } catch (e) {}
    });
  }
  function onState(f) {
    stateListeners.add(f);
    return () => stateListeners.delete(f);
  }
  function pending() {
    return queues.high.length + queues.normal.length + queues.low.length;
  }
  function schedule(fn, priority) {
    const p = queues[priority] ? priority : 'normal';
    return new Promise((resolve, reject) => {
      queues[p].push({
        fn,
        resolve,
        reject,
        priority: p,
        attempts: 0
      });
      kick();
    });
  }
  function dequeue() {
    for (const p of ORDER) {
      if (queues[p].length) return queues[p].shift();
    }
    return null;
  }
  function kick() {
    if (!pumping) {
      pumping = true;
      step();
    }
  }
  function step() {
    const now = Date.now();

    // Hard pause window after a 429 (Retry-After / backoff).
    if (now < pausedUntil) {
      setTimeout(step, pausedUntil - now + 5);
      return;
    }
    starts = starts.filter(t => now - t < WINDOW);
    if (pending() === 0) {
      pumping = false;
      return;
    }
    if (starts.length >= effRate) {
      const wait = WINDOW - (now - starts[0]) + 5;
      setTimeout(step, Math.max(5, wait));
      return;
    }
    const job = dequeue();
    starts.push(Date.now());
    inFlight++;
    Promise.resolve().then(job.fn).then(v => {
      inFlight--;
      onSuccess();
      job.resolve(v);
      finish();
    }, e => {
      inFlight--;
      onFailure(job, e);
      finish();
    });
    setTimeout(step, 0);
  }
  function finish() {
    if (!pumping) kick();
  }
  function onSuccess() {
    totalDone++;
    // A clean response means we can begin easing the throttle back off.
    if (throttled) startRecovery();
    consec429 = 0;
  }
  function onFailure(job, e) {
    const isRate = e && (e.kind === 'rate' || e.status === 429);
    if (isRate && job.attempts < MAX_ATTEMPTS) {
      job.attempts++;
      totalRetried++;
      applyBackoff(e);
      // Re-queue at the front of its lane so it retries as soon as the pause lifts.
      queues[job.priority].unshift(job);
      kick();
      return;
    }
    totalDone++;
    job.reject(e);
  }
  function applyBackoff(e) {
    const now = Date.now();
    consec429++;
    lastHit = now;
    throttled = true;

    // Cut the effective rate (halve, floor 1) so we stop hammering Webex.
    effRate = Math.max(1, Math.floor(Math.min(effRate, RATE) / 2));

    // Respect server Retry-After (seconds) when present, else exponential backoff.
    let waitMs = parseInt(e && e.retryAfter, 10);
    waitMs = waitMs > 0 ? waitMs * 1000 : Math.min(BACKOFF_MAX, BACKOFF_BASE * Math.pow(2, consec429 - 1));
    pausedUntil = Math.max(pausedUntil, now + waitMs);
    startRecovery();
    emitState();
  }

  // Gradually walk effRate back up to RATE once 429s stop arriving.
  function startRecovery() {
    if (recoveryTimer) return;
    recoveryTimer = setInterval(() => {
      if (Date.now() - lastHit < RECOVERY_STEP) return; // still hot; wait
      if (effRate < RATE) {
        effRate = Math.min(RATE, effRate + 1);
        emitState();
        kick();
      }
      if (effRate >= RATE) {
        throttled = false;
        clearInterval(recoveryTimer);
        recoveryTimer = null;
        emitState();
      }
    }, RECOVERY_STEP);
  }

  // Drop queued (not yet started) jobs; rejects them as cancelled.
  function clear(priority) {
    const ps = priority ? [priority] : ORDER;
    ps.forEach(p => {
      const q = queues[p] || [];
      q.splice(0).forEach(j => {
        const e = new Error('cancelled');
        e.kind = 'cancelled';
        j.reject(e);
      });
    });
  }
  function snapshot() {
    return {
      pending: pending(),
      inFlight,
      totalDone,
      totalRetried,
      rate: RATE,
      effRate,
      throttled,
      pausedMs: Math.max(0, pausedUntil - Date.now())
    };
  }
  function stats() {
    return snapshot();
  }
  function setRate(n) {
    n = Math.max(1, Math.min(20, Math.round(Number(n) || 3)));
    RATE = n;
    // Keep the effective rate at the ceiling when calm; never above it when throttled.
    effRate = throttled ? Math.min(effRate, RATE) : RATE;
    try {
      localStorage.setItem(RATE_KEY, String(n));
    } catch (e) {}
    emitState();
    kick();
    return RATE;
  }
  function getRate() {
    return RATE;
  }
  window.WRF_RM = {
    schedule,
    clear,
    pending,
    stats,
    setRate,
    getRate,
    onState,
    WINDOW
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/request-manager.js", error: String((e && e.message) || e) }); }

// ui_kits/console/settings.view.jsx
try { (() => {
/* WeRoFleet Console — Settings: Webex API rate limit, polling, connection */
(function () {
  const {
    useState
  } = React;
  const {
    Card,
    Button,
    Badge,
    Tabs,
    Banner
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  const WX = window.WRF_WEBEX;
  const RM = window.WRF_RM;
  const PageHead = window.WRF_PageHead;
  function notify(msg, tone) {
    if (window.WRF_notify) window.WRF_notify(msg, tone);
  }
  const RATES = [1, 2, 3, 5, 8, 10];
  const INTERVALS = [10000, 20000, 30000, 60000, 120000];
  function Settings({
    cooldown,
    onCooldown,
    onConnect
  }) {
    const store = DATA.useStore();
    const live = store.mode === 'live';
    const [rate, setRate] = useState(RM ? RM.getRate() : 3);
    const [rm, setRm] = useState(RM ? RM.stats() : null);
    React.useEffect(() => {
      if (!RM || !RM.onState) return;
      return RM.onState(s => setRm(s));
    }, []);
    function applyRate(n) {
      RM && RM.setRate(n);
      setRate(n);
      notify(`Rate limit set to ${n} request${n === 1 ? '' : 's'}/second`, 'success');
    }
    function disconnect() {
      if (!window.confirm('Disconnect from Webex and clear the stored token?')) return;
      WX.clearCreds();
      DATA.loadDemo();
      notify('Disconnected · back to demo data', 'neutral');
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
      title: "Settings",
      sub: "Webex API throughput, polling & connection"
    }), /*#__PURE__*/React.createElement(Card, {
      title: "Webex API rate limit",
      subtitle: "Maximum requests per second across the whole console",
      action: rm && rm.throttled ? /*#__PURE__*/React.createElement(Badge, {
        tone: "degraded",
        outline: true
      }, "Throttled \xB7 ", rm.effRate, "/", rate, "/s") : /*#__PURE__*/React.createElement(Badge, {
        tone: "accent",
        outline: true
      }, rate, "/s")
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      variant: "pill",
      value: String(rate),
      onChange: v => applyRate(+v),
      tabs: RATES.map(n => ({
        value: String(n),
        label: n + '/s'
      }))
    })), rm && rm.throttled && /*#__PURE__*/React.createElement("div", {
      className: "wrf-fw-note",
      style: {
        marginTop: 14,
        color: 'var(--status-degraded-text)'
      }
    }, I('alert-triangle'), /*#__PURE__*/React.createElement("span", null, "Webex returned ", /*#__PURE__*/React.createElement("code", null, "429"), " \u2014 temporarily easing to ", /*#__PURE__*/React.createElement("b", null, rm.effRate, "/s"), " and auto-retrying failed requests", rm.totalRetried ? ` (${rm.totalRetried} retried)` : '', ". The rate climbs back to ", rate, "/s once it settles.")), /*#__PURE__*/React.createElement("div", {
      className: "wrf-fw-note",
      style: {
        marginTop: 14
      }
    }, I('gauge'), /*#__PURE__*/React.createElement("span", null, "Every Webex call (status polls, commands, config pushes) is queued and throttled to this limit. On ", /*#__PURE__*/React.createElement("code", null, "429 Too Many Requests"), " the console slows down automatically and retries \u2014 so raising this is safe to try. ", /*#__PURE__*/React.createElement("b", null, "3/s is a conservative default.")))), /*#__PURE__*/React.createElement(Card, {
      title: "Fleet auto-refresh",
      subtitle: "How long to wait between full status sweeps"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'inline-flex'
      }
    }, /*#__PURE__*/React.createElement(Tabs, {
      variant: "pill",
      value: String(cooldown),
      onChange: v => {
        onCooldown(+v);
        notify('Auto-refresh interval updated', 'success');
      },
      tabs: INTERVALS.map(ms => ({
        value: String(ms),
        label: ms / 1000 + 's'
      }))
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-fw-note",
      style: {
        marginTop: 14
      }
    }, I('timer'), /*#__PURE__*/React.createElement("span", null, "A sweep polls every device once (in-call, RoomOS version, uptime) at low priority. With ", store.devices.length, " devices at ", rate, "/s a full sweep takes about ", /*#__PURE__*/React.createElement("b", null, Math.max(1, Math.ceil(store.devices.length / rate)), "s"), "; the console then waits this interval before sweeping again."))), /*#__PURE__*/React.createElement(Card, {
      title: "Connection"
    }, live ? /*#__PURE__*/React.createElement("div", {
      className: "wrf-set-conn"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-set-conn-main"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-set-conn-org"
    }, store.org && store.org.name ? store.org.name : 'Connected'), /*#__PURE__*/React.createElement("div", {
      className: "wrf-set-conn-meta"
    }, store.devices.length, " devices \xB7 ", store.workspaces.length, " workspaces", store.me && store.me.email ? ' · ' + store.me.email : '')), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      leadingIcon: I('log-out'),
      onClick: disconnect
    }, "Disconnect")) : /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      title: "Not connected",
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        onClick: onConnect
      }, "Connect to Webex")
    }, "You're viewing demo data. Connect a Webex org to manage real devices.")));
  }
  window.WRF_Settings = Settings;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/settings.view.jsx", error: String((e && e.message) || e) }); }

// ui_kits/console/shell.runtime.js
try { (() => {
/* WeRoFleet Console — app shell: Sidebar + TopBar + AppShell (window-scoped) */
(function () {
  const {
    useEffect
  } = React;
  const {
    Avatar,
    IconButton,
    Badge,
    Input,
    Tooltip
  } = window.HelmRoomKitFleetDS_91f16f;
  const I = (n, s) => React.createElement('i', {
    'data-lucide': n,
    style: s
  });
  const CSS = `
  .wrf-app { display: flex; height: 100vh; width: 100%; overflow: hidden; background: var(--surface-app); color: var(--text-primary); font-family: var(--font-sans); }
  .wrf-side { width: var(--rail-nav); flex: none; display: flex; flex-direction: column; background: var(--surface-card); border-right: 1px solid var(--border-default); }
  .wrf-side-top { display: flex; align-items: center; gap: 10px; height: var(--topbar-height); padding: 0 16px; border-bottom: 1px solid var(--border-subtle); }
  .wrf-side-mark { width: 26px; height: 26px; border-radius: 7px; flex: none; }
  .wrf-side-name { font-size: 15px; font-weight: 700; letter-spacing: -0.01em; color: var(--text-primary); line-height: 1; }
  .wrf-side-sub { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-tertiary); margin-top: 3px; }
  .wrf-nav { flex: 1; overflow-y: auto; padding: 10px; display: flex; flex-direction: column; gap: 1px; }
  .wrf-nav-sec { font-size: 10px; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: var(--text-tertiary); padding: 14px 10px 6px; }
  .wrf-nav-item { display: flex; align-items: center; gap: 10px; height: 34px; padding: 0 10px; border-radius: var(--radius-sm); cursor: pointer; color: var(--text-secondary); font-size: 13px; font-weight: 500; border: none; background: transparent; width: 100%; text-align: left; transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard); }
  .wrf-nav-item svg, .wrf-nav-item i { width: 16px; height: 16px; flex: none; }
  .wrf-nav-item:hover { background: var(--surface-hover); color: var(--text-primary); }
  .wrf-nav-item[data-active="true"] { background: var(--accent-subtle); color: var(--accent-active); font-weight: 600; }
  .wrf-nav-item .wrf-nav-grow { margin-left: auto; }
  .wrf-side-foot { border-top: 1px solid var(--border-subtle); padding: 10px; }
  .wrf-org { display: flex; align-items: center; gap: 10px; padding: 8px; border-radius: var(--radius-sm); cursor: pointer; }
  .wrf-org:hover { background: var(--surface-hover); }
  .wrf-org-name { font-size: 13px; font-weight: 600; color: var(--text-primary); line-height: 1.1; }
  .wrf-org-meta { font-size: 11px; color: var(--text-tertiary); }

  .wrf-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .wrf-top { display: flex; align-items: center; gap: 14px; height: var(--topbar-height); flex: none; padding: 0 20px; background: var(--surface-card); border-bottom: 1px solid var(--border-default); }
  .wrf-top-search { flex: 1; max-width: 420px; }
  .wrf-top-right { margin-left: auto; display: flex; align-items: center; gap: 6px; }
  .wrf-bell { position: relative; }
  .wrf-bell-dot { position: absolute; top: 5px; right: 5px; min-width: 15px; height: 15px; padding: 0 4px; border-radius: 999px; background: var(--status-critical); color: #fff; font-size: 9px; font-weight: 700; display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--surface-card); }
  .wrf-conn { display: inline-flex; align-items: center; gap: 7px; height: 28px; padding: 0 10px 0 9px; border-radius: var(--radius-full); border: 1px solid var(--border-default); background: var(--surface-card); cursor: pointer; font-family: var(--font-sans); font-size: 12px; font-weight: 600; color: var(--text-secondary); transition: background var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard); }
  .wrf-conn:hover { background: var(--surface-hover); border-color: var(--border-strong); }
  .wrf-conn-dot { width: 7px; height: 7px; border-radius: 50%; flex: none; }
  .wrf-conn[data-mode="live"] { color: var(--status-online-text); border-color: color-mix(in srgb, var(--status-online) 35%, transparent); background: var(--status-online-bg); }
  .wrf-conn[data-mode="live"] .wrf-conn-dot { background: var(--status-online); }
  .wrf-conn[data-mode="demo"] .wrf-conn-dot { background: var(--status-offline); }
  .wrf-conn[data-mode="connecting"] .wrf-conn-dot { background: var(--status-degraded); }
  .wrf-conn-org { max-width: 150px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .wrf-live { display: inline-flex; align-items: center; gap: 7px; height: 28px; padding: 0 11px; border-radius: var(--radius-full); border: 1px solid var(--border-default); background: var(--surface-card); cursor: pointer; font-family: var(--font-sans); font-size: 12px; font-weight: 600; color: var(--text-tertiary); transition: background var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard); }
  .wrf-live:hover { background: var(--surface-hover); }
  .wrf-live-dot { width: 7px; height: 7px; border-radius: 50%; flex: none; background: var(--slate-400); }
  .wrf-live[data-on="true"] { color: var(--status-online-text); border-color: color-mix(in srgb, var(--status-online) 35%, transparent); }
  .wrf-live[data-on="true"] .wrf-live-dot { background: var(--status-online); }
  .wrf-live[data-sweeping="true"] .wrf-live-dot { animation: wrf-ping-dot var(--pulse-period, 2s) var(--ease-decel) infinite; }
  @keyframes wrf-ping-dot { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--status-online) 60%, transparent); } 70%, 100% { box-shadow: 0 0 0 6px transparent; } }
  @media (prefers-reduced-motion: reduce) { .wrf-live[data-sweeping="true"] .wrf-live-dot { animation: none; } }
  .wrf-content { flex: 1; overflow-y: auto; }
  .wrf-content-inner { max-width: var(--content-max); margin: 0 auto; padding: 22px 24px 48px; }
  `;
  function inject() {
    if (document.getElementById('wrf-shell-css')) return;
    const el = document.createElement('style');
    el.id = 'wrf-shell-css';
    el.textContent = CSS;
    document.head.appendChild(el);
  }
  const NAV = [{
    sec: 'Fleet'
  }, {
    id: 'overview',
    label: 'Overview',
    icon: 'layout-dashboard'
  }, {
    id: 'devices',
    label: 'Devices',
    icon: 'monitor',
    countKey: 'devices'
  }, {
    id: 'workspaces',
    label: 'Workspaces',
    icon: 'layout-grid',
    countKey: 'workspaces'
  }, {
    sec: 'Configure'
  }, {
    id: 'presets',
    label: 'Config presets',
    icon: 'layers'
  }, {
    id: 'settings',
    label: 'Settings',
    icon: 'settings'
  }];
  function Sidebar({
    active,
    onNav,
    store,
    onConnectClick,
    bell
  }) {
    const live = store.mode === 'live';
    const deviceN = store.devices.length;
    const siteN = window.WRF_DATA.sites().length;
    const counts = {
      devices: deviceN,
      workspaces: store.workspaces.length,
      alerts: bell
    };
    return React.createElement('aside', {
      className: 'wrf-side'
    }, React.createElement('div', {
      className: 'wrf-side-top'
    }, React.createElement('img', {
      className: 'wrf-side-mark',
      src: window.__resources && window.__resources.mark || '../../assets/werofleet-mark.svg',
      alt: ''
    }), React.createElement('div', null, React.createElement('div', {
      className: 'wrf-side-name'
    }, 'WeRoFleet'), React.createElement('div', {
      className: 'wrf-side-sub'
    }, 'Console'))), React.createElement('nav', {
      className: 'wrf-nav'
    }, NAV.map((n, i) => n.sec ? React.createElement('div', {
      key: 'sec' + i,
      className: 'wrf-nav-sec'
    }, n.sec) : React.createElement('button', {
      key: n.id,
      className: 'wrf-nav-item',
      'data-active': active === n.id ? 'true' : undefined,
      onClick: () => onNav(n.id)
    }, I(n.icon), React.createElement('span', null, n.label), n.badgeKey && counts[n.badgeKey] > 0 ? React.createElement('span', {
      className: 'wrf-nav-grow'
    }, React.createElement(Badge, {
      tone: 'critical',
      shape: 'pill'
    }, counts[n.badgeKey])) : null, n.countKey ? React.createElement('span', {
      className: 'wrf-nav-grow',
      style: {
        fontSize: 11,
        color: 'var(--text-tertiary)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, counts[n.countKey]) : null))), React.createElement('div', {
      className: 'wrf-side-foot'
    }, React.createElement('button', {
      className: 'wrf-org',
      onClick: onConnectClick
    }, React.createElement(Avatar, {
      name: live && store.org ? store.org.name : 'Demo',
      kind: 'device',
      size: 'sm'
    }), React.createElement('div', {
      style: {
        minWidth: 0,
        flex: 1,
        textAlign: 'left'
      }
    }, React.createElement('div', {
      className: 'wrf-org-name',
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, live && store.org ? store.org.name : 'Demo fleet'), React.createElement('div', {
      className: 'wrf-org-meta'
    }, live ? deviceN + ' devices' + (siteN ? ' · ' + siteN + ' sites' : '') : 'Not connected · sample data')), React.createElement('span', {
      style: {
        marginLeft: 'auto',
        color: 'var(--text-tertiary)'
      }
    }, I(live ? 'chevrons-up-down' : 'plug', {
      width: 15,
      height: 15
    })))));
  }
  function ConnPill({
    store,
    onConnectClick
  }) {
    const mode = store.status === 'connecting' ? 'connecting' : store.mode;
    const label = store.status === 'connecting' ? 'Connecting…' : store.mode === 'live' ? store.org && store.org.name ? store.org.name : 'Connected' : 'Demo data';
    return React.createElement('button', {
      className: 'wrf-conn',
      'data-mode': mode,
      onClick: onConnectClick,
      title: store.mode === 'live' ? 'Connected to Webex — manage connection' : 'Connect to your Webex org'
    }, React.createElement('span', {
      className: 'wrf-conn-dot'
    }), React.createElement('span', {
      className: 'wrf-conn-org'
    }, label), I(store.mode === 'live' ? 'chevron-down' : 'plug', {
      width: 13,
      height: 13
    }));
  }
  function LivePill({
    pollOn,
    sweeping,
    onTogglePoll
  }) {
    return React.createElement(Tooltip, {
      label: pollOn ? 'Live status polling on (3 req/s, low priority) — click to pause' : 'Status polling paused — click to resume'
    }, React.createElement('button', {
      className: 'wrf-live',
      'data-on': pollOn ? 'true' : undefined,
      'data-sweeping': pollOn && sweeping ? 'true' : undefined,
      onClick: onTogglePoll
    }, React.createElement('span', {
      className: 'wrf-live-dot'
    }), React.createElement('span', null, pollOn ? sweeping ? 'Polling…' : 'Live' : 'Paused')));
  }
  function TopBar({
    theme,
    onToggleTheme,
    store,
    onConnectClick,
    onRefresh,
    bell,
    pollOn,
    sweeping,
    onTogglePoll
  }) {
    const live = store.mode === 'live';
    return React.createElement('header', {
      className: 'wrf-top'
    }, React.createElement('div', {
      className: 'wrf-top-search'
    }, React.createElement(Input, {
      leadingIcon: I('search'),
      placeholder: 'Search devices, rooms, serials…',
      size: 'sm'
    })), React.createElement('div', {
      className: 'wrf-top-right'
    }, React.createElement(ConnPill, {
      store,
      onConnectClick
    }), live ? React.createElement(LivePill, {
      pollOn,
      sweeping,
      onTogglePoll
    }) : null, live ? React.createElement(Tooltip, {
      label: 'Re-sync devices now'
    }, React.createElement(IconButton, {
      variant: 'ghost',
      icon: I('refresh-cw'),
      label: 'Refresh',
      onClick: onRefresh
    })) : null, React.createElement('div', {
      style: {
        width: 1,
        height: 24,
        background: 'var(--border-default)',
        margin: '0 2px'
      }
    }), React.createElement(Tooltip, {
      label: theme === 'dark' ? 'Light mode' : 'Dark mode'
    }, React.createElement(IconButton, {
      variant: 'ghost',
      icon: I(theme === 'dark' ? 'sun' : 'moon'),
      label: 'Theme',
      onClick: onToggleTheme
    })), React.createElement('span', {
      className: 'wrf-bell'
    }, React.createElement(IconButton, {
      variant: 'ghost',
      icon: I('bell'),
      label: 'Notifications'
    }), bell > 0 ? React.createElement('span', {
      className: 'wrf-bell-dot'
    }, bell) : null), React.createElement('div', {
      style: {
        width: 1,
        height: 24,
        background: 'var(--border-default)',
        margin: '0 4px'
      }
    }), React.createElement(Avatar, {
      name: store.me && store.me.displayName ? store.me.displayName : 'Jordan Reyes',
      size: 'sm',
      statusColor: 'var(--status-online)'
    })));
  }
  function AppShell({
    active,
    onNav,
    theme,
    onToggleTheme,
    store,
    onConnectClick,
    onRefresh,
    bell,
    pollOn,
    sweeping,
    onTogglePoll,
    children
  }) {
    useEffect(() => {
      inject();
    });
    return React.createElement('div', {
      className: 'wrf-app',
      'data-theme': theme
    }, React.createElement(Sidebar, {
      active,
      onNav,
      store,
      onConnectClick,
      bell
    }), React.createElement('div', {
      className: 'wrf-main'
    }, React.createElement(TopBar, {
      theme,
      onToggleTheme,
      store,
      onConnectClick,
      onRefresh,
      bell,
      pollOn,
      sweeping,
      onTogglePoll
    }), React.createElement('div', {
      className: 'wrf-content'
    }, React.createElement('div', {
      className: 'wrf-content-inner'
    }, children))));
  }
  window.WRF_SHELL = {
    AppShell,
    Sidebar,
    TopBar,
    I
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/shell.runtime.js", error: String((e && e.message) || e) }); }

// ui_kits/console/webex.js
try { (() => {
/* WeRoFleet Console — Webex cloud API client (window.WRF_WEBEX)
   Talks to the Webex REST API + cloud xAPI from the browser using a
   personal/integration bearer token. Credentials live only in localStorage. */
(function () {
  const CREDS_KEY = 'wrf-webex-creds';
  const DEFAULT_BASE = 'https://webexapis.com/v1';

  // Room-device models eligible for branding (from the deployment CLI).
  const MODELS = ['board pro 55', 'board pro 55 g2', 'board pro 75', 'board pro 75 g2', 'desk series', 'codec eq', 'codec pro', 'codec pro g2', 'room 70 dual g2', 'room 70 panorama', 'room 70 single g2', 'room bar', 'room bar pro', 'room panorama', 'room kit'];
  let creds = load();
  function load() {
    try {
      return JSON.parse(localStorage.getItem(CREDS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function persist() {
    try {
      localStorage.setItem(CREDS_KEY, JSON.stringify(creds));
    } catch (e) {}
  }
  function setCreds({
    token,
    orgId,
    base
  }) {
    creds = {
      token: (token || '').trim().replace(/^Bearer\s+/i, ''),
      orgId: (orgId || '').trim(),
      base: (base || '').trim().replace(/\/+$/, '') || DEFAULT_BASE
    };
    persist();
    return creds;
  }
  function clearCreds() {
    creds = {};
    try {
      localStorage.removeItem(CREDS_KEY);
    } catch (e) {}
  }
  function hasCreds() {
    return !!(creds && creds.token);
  }
  function getCreds() {
    return {
      ...creds,
      base: creds.base || DEFAULT_BASE
    };
  }
  function err(kind, message, extra) {
    const e = new Error(message || kind);
    e.kind = kind;
    Object.assign(e, extra || {});
    return e;
  }
  async function req(path, opts) {
    opts = opts || {};
    if (!creds.token) throw err('auth', 'No token set');
    const base = creds.base || DEFAULT_BASE;
    const url = base + path;
    const priority = opts.priority || 'normal';
    const exec = async () => {
      let res;
      try {
        res = await fetch(url, {
          method: opts.method || 'GET',
          headers: Object.assign({
            Authorization: 'Bearer ' + creds.token,
            'Content-Type': 'application/json'
          }, opts.headers || {}),
          body: opts.body || undefined
        });
      } catch (e) {
        // Browser network/CORS failures surface here as an opaque TypeError.
        throw err('network', 'Network or CORS error — the browser could not reach ' + base + '. A CORS proxy may be required.');
      }
      if (res.status === 401) throw err('auth', 'Unauthorized — token is invalid or expired.');
      if (res.status === 403) throw err('scope', 'Forbidden — the token is missing a required scope.');
      if (res.status === 429) throw err('rate', 'Rate limited by Webex — wait a moment and retry.', {
        retryAfter: res.headers.get('Retry-After')
      });
      if (!res.ok) {
        let body = '';
        try {
          body = await res.text();
        } catch (e) {}
        // Surface Webex's own explanation (message / errors[].description / trackingId).
        let detail = '';
        try {
          const j = JSON.parse(body);
          detail = j.message || j.errors && j.errors[0] && (j.errors[0].description || j.errors[0].message) || '';
          if (j.trackingId) detail += (detail ? ' ' : '') + '[' + j.trackingId + ']';
        } catch (e) {
          detail = (body || '').slice(0, 160);
        }
        throw err('http', 'Webex ' + res.status + (detail ? ' — ' + detail : ''), {
          status: res.status,
          body
        });
      }
      if (res.status === 204) return null;
      const txt = await res.text();
      return txt ? JSON.parse(txt) : null;
    };

    // All Webex traffic is throttled + prioritized by the RequestManager.
    return window.WRF_RM ? window.WRF_RM.schedule(exec, priority) : exec();
  }

  // ---- mapping ----
  function modelName(p) {
    return (p || '').replace(/^Cisco\s+/i, '').trim() || '—';
  }

  // Is this device one of the branding-eligible room models?
  function isEligible(d) {
    const p = String(d && d.model || '').toLowerCase();
    return MODELS.some(m => p.includes(m));
  }
  function eligible(devices) {
    return (devices || []).filter(isEligible);
  }
  function stateFor(raw) {
    const cs = String(raw.connectionStatus || '').toLowerCase();
    if (cs === 'connected') return 'online';
    if (cs === 'connected_with_issues') return 'degraded';
    if (cs.indexOf('disconnected') === 0 || cs.indexOf('offline') === 0) {
      return raw.errorCodes && raw.errorCodes.length ? 'critical' : 'offline';
    }
    return 'offline';
  }
  function errText(raw) {
    if (!raw.errorCodes || !raw.errorCodes.length) return null;
    return raw.errorCodes.map(e => typeof e === 'string' ? e : e.description || e.id || '').filter(Boolean).join(', ');
  }
  function mapDevice(raw) {
    const st = stateFor(raw);
    return {
      id: raw.id,
      name: raw.displayName || raw.product || raw.id,
      model: modelName(raw.product),
      type: raw.type || '',
      site: raw.tags && raw.tags[0] || '',
      room: '',
      state: st,
      connectionStatus: raw.connectionStatus || '',
      fw: raw.software || '—',
      fwOld: false,
      uptime: '—',
      ip: raw.ip || '—',
      serial: raw.serial || '—',
      mac: raw.mac || '—',
      workspaceId: raw.workspaceId || null,
      errorCodes: raw.errorCodes || [],
      issue: errText(raw) || (st === 'offline' ? 'Disconnected' : null),
      lastSeen: raw.lastSeen || null,
      firstSeen: raw.firstSeen || null,
      meeting: null,
      _raw: raw
    };
  }

  // ---- calls ----
  async function me() {
    const p = await req('/people/me', {
      priority: 'high'
    });
    return {
      displayName: p.displayName || p.nickName || 'You',
      email: p.emails && p.emails[0] || '',
      orgId: p.orgId
    };
  }
  async function orgInfo(orgId) {
    if (!orgId) return null;
    try {
      const o = await req('/organizations/' + encodeURIComponent(orgId), {
        priority: 'high'
      });
      return {
        id: o.id,
        name: o.displayName || orgId
      };
    } catch (e) {
      return {
        id: orgId,
        name: orgId
      };
    }
  }
  async function listDevices(orgId, priority) {
    const q = new URLSearchParams();
    q.set('max', '1000');
    if (orgId) q.set('orgId', orgId);
    const data = await req('/devices?' + q.toString(), {
      priority: priority || 'high'
    });
    const items = data && data.items || [];
    return items.map(mapDevice);
  }

  // Re-fetch a single device (for live status refresh after an action). High priority.
  async function getDevice(id, priority) {
    const raw = await req('/devices/' + encodeURIComponent(id), {
      priority: priority || 'high'
    });
    return mapDevice(raw);
  }
  function building(name) {
    return (String(name || '').split(/\s*[-\u2013\u2014|\u00b7:]\s*/)[0] || '').trim() || name || '';
  }
  async function listWorkspaces(orgId) {
    const q = new URLSearchParams();
    q.set('max', '500');
    if (orgId) q.set('orgId', orgId);
    const data = await req('/workspaces?' + q.toString(), {
      priority: 'high'
    });
    return data && data.items || [];
  }
  async function listDevicesByWorkspace(workspaceId) {
    const data = await req('/devices?workspaceId=' + encodeURIComponent(workspaceId));
    return (data && data.items || []).map(mapDevice);
  }

  // Full connect flow: validate token, resolve org, fetch devices, join workspace names.
  async function connect() {
    const who = await me();
    // `orgId` on /devices & /workspaces is ONLY allowed for partner/cross-org tokens.
    // A normal org-admin token passing its own orgId gets a 400 — so only send it when
    // the user explicitly typed one, and fall back to no-orgId on a 400.
    const explicitOrg = (creds.orgId || '').trim();
    const displayOrgId = explicitOrg || who.orgId || '';
    const devicesP = listDevices(explicitOrg).catch(e => {
      if (e && e.status === 400 && explicitOrg) return listDevices('');
      throw e;
    });
    const workspacesP = listWorkspaces(explicitOrg).catch(e => e && e.status === 400 && explicitOrg ? listWorkspaces('') : []).catch(() => []);
    const [org, devices, workspaces] = await Promise.all([orgInfo(displayOrgId), devicesP, workspacesP]);
    const wsMap = {};
    workspaces.forEach(w => {
      wsMap[w.id] = w;
    });
    devices.forEach(d => {
      const w = d.workspaceId && wsMap[d.workspaceId];
      if (w && w.displayName) {
        d.workspaceName = w.displayName;
        d.room = w.displayName;
        d.site = building(w.displayName);
      }
    });
    return {
      me: who,
      org,
      devices,
      workspaces
    };
  }

  // cloud xAPI status — names like 'SystemUnit.Uptime'
  async function xStatus(deviceId, names, priority) {
    const q = new URLSearchParams();
    q.set('deviceId', deviceId);
    (Array.isArray(names) ? names : [names]).forEach(n => q.append('name', n));
    return req('/xapi/status?' + q.toString(), {
      priority: priority || 'normal'
    });
  }

  // cloud xAPI command — name like 'SystemUnit.Boot'
  async function xCommand(deviceId, name, args) {
    return req('/xapi/command/' + name, {
      method: 'POST',
      priority: 'high',
      body: JSON.stringify({
        deviceId: deviceId,
        arguments: args || {}
      })
    });
  }
  function reboot(deviceId) {
    return xCommand(deviceId, 'SystemUnit.Boot', {
      Action: 'Restart'
    });
  }

  // ---- branding & configuration (deployment) ----
  // Upload a branding image. type e.g. 'HalfwakeBackground' | 'Background'. base64 = raw base64 (no data: prefix).
  function uploadBranding(deviceId, type, base64) {
    return req('/xapi/command/UserInterface.Branding.Upload', {
      method: 'POST',
      priority: 'high',
      body: JSON.stringify({
        deviceId: deviceId,
        arguments: {
          Type: type
        },
        body: base64
      })
    });
  }

  // Remove a previously-uploaded branding image of the given type.
  function deleteBranding(deviceId, type) {
    return req('/xapi/command/UserInterface.Branding.Delete', {
      method: 'POST',
      priority: 'high',
      body: JSON.stringify({
        deviceId: deviceId,
        arguments: {
          Type: type
        }
      })
    });
  }

  // PATCH device configurations with an array of JSON-patch ops.
  function patchConfig(deviceId, ops) {
    return req('/deviceConfigurations?deviceId=' + encodeURIComponent(deviceId), {
      method: 'PATCH',
      priority: 'high',
      headers: {
        'Content-Type': 'application/json-patch+json'
      },
      // Webex requires this exact type
      body: JSON.stringify(ops)
    });
  }
  function setCustomMessage(deviceId, msg) {
    return patchConfig(deviceId, [{
      op: 'replace',
      path: 'UserInterface.CustomMessage/sources/configured/value',
      value: msg
    }]);
  }
  // key: JoinWebex | JoinMicrosoftTeamsDirectGuestJoin | JoinGoogleMeet | JoinZoom ; value: 'Auto' | 'Hidden'
  function setCallFeature(deviceId, key, value) {
    return patchConfig(deviceId, [{
      op: 'replace',
      path: 'UserInterface.Features.Call.' + key + '/sources/configured/value',
      value: value
    }]);
  }

  // Generic UI config value setter, e.g. configPath 'UserInterface.HomeScreen.Dashboard', value 'On'|'Off'.
  function setConfigValue(deviceId, configPath, value) {
    return patchConfig(deviceId, [{
      op: 'replace',
      path: configPath + '/sources/configured/value',
      value: value
    }]);
  }
  const CALL_FEATURE_KEYS = ['JoinWebex', 'JoinMicrosoftTeamsDirectGuestJoin', 'JoinGoogleMeet', 'JoinZoom'];

  // Read the CURRENT applied configuration of a device (not what we'd push).
  // GET /v1/deviceConfigurations?deviceId= returns { items: { 'Key': { value, source, ... } } }.
  async function getConfig(deviceId, priority) {
    const data = await req('/deviceConfigurations?deviceId=' + encodeURIComponent(deviceId), {
      priority: priority || 'normal'
    });
    const items = data && data.items || {};
    const val = key => {
      const it = items[key];
      if (!it) return undefined;
      return it.value !== undefined ? it.value : it.source && it.source.value;
    };
    const call = {};
    CALL_FEATURE_KEYS.forEach(k => {
      const v = val('UserInterface.Features.Call.' + k);
      if (v !== undefined) call[k] = v;
    });
    return {
      customMessage: val('UserInterface.CustomMessage'),
      call,
      wallpaperOverlay: val('UserInterface.CustomWallpaperOverlay'),
      dashboard: val('UserInterface.HomeScreen.Dashboard'),
      raw: items
    };
  }

  // Pull a few live status values for the detail drawer.
  async function deviceDetail(deviceId, priority) {
    const r = await xStatus(deviceId, ['SystemUnit.Uptime', 'SystemUnit.State.NumberOfActiveCalls', 'Peripherals.ConnectedDevice'], priority || 'normal');
    const result = r && r.result || {};
    const su = result.SystemUnit || {};
    const uptime = su.Uptime != null ? Number(su.Uptime) : null;
    const activeCalls = su.State && su.State.NumberOfActiveCalls != null ? Number(su.State.NumberOfActiveCalls) : null;
    let peripherals = result.Peripherals && result.Peripherals.ConnectedDevice || [];
    if (!Array.isArray(peripherals)) peripherals = [peripherals];
    return {
      uptime,
      activeCalls,
      peripherals,
      raw: result
    };
  }

  // Lightweight per-device status for the background fleet poll (low priority).
  // Returns { activeCalls, version, uptime }.
  async function liveStatus(deviceId, priority) {
    const r = await xStatus(deviceId, ['SystemUnit.State.NumberOfActiveCalls', 'SystemUnit.Software.Version', 'SystemUnit.Uptime'], priority || 'low');
    const result = r && r.result || {};
    const su = result.SystemUnit || {};
    return {
      activeCalls: su.State && su.State.NumberOfActiveCalls != null ? Number(su.State.NumberOfActiveCalls) : null,
      version: su.Software && su.Software.Version ? String(su.Software.Version) : null,
      uptime: su.Uptime != null ? Number(su.Uptime) : null
    };
  }
  window.WRF_WEBEX = {
    DEFAULT_BASE,
    MODELS,
    setCreds,
    clearCreds,
    hasCreds,
    getCreds,
    connect,
    me,
    orgInfo,
    listDevices,
    getDevice,
    listDevicesByWorkspace,
    listWorkspaces,
    mapDevice,
    building,
    isEligible,
    eligible,
    xStatus,
    xCommand,
    reboot,
    deviceDetail,
    liveStatus,
    uploadBranding,
    deleteBranding,
    patchConfig,
    setCustomMessage,
    setCallFeature,
    setConfigValue,
    getConfig,
    CALL_FEATURE_KEYS
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/webex.js", error: String((e && e.message) || e) }); }

// ui_kits/console/workspaces.view.jsx
try { (() => {
/* WeRoFleet Console — Workspaces: select workspaces, apply a config preset */
(function () {
  const {
    useState,
    useMemo
  } = React;
  const {
    Card,
    Button,
    Input,
    Select,
    Checkbox,
    Badge,
    Banner,
    StatusBadge,
    Avatar,
    IconButton
  } = window.HelmRoomKitFleetDS_91f16f;
  const {
    I
  } = window.WRF_SHELL;
  const DATA = window.WRF_DATA;
  const PR = window.WRF_PRESETS;
  const WX = window.WRF_WEBEX;
  const PageHead = window.WRF_PageHead;
  function notify(msg, tone) {
    if (window.WRF_notify) window.WRF_notify(msg, tone);
  }
  function StateDots({
    devices
  }) {
    const c = {};
    devices.forEach(d => {
      c[d.state] = (c[d.state] || 0) + 1;
    });
    const order = ['critical', 'offline', 'degraded', 'incall', 'online'];
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-ws-dots"
    }, order.filter(k => c[k]).map(k => /*#__PURE__*/React.createElement("span", {
      key: k,
      className: "wrf-ws-dot",
      style: {
        background: DATA.STATE_VAR[k]
      },
      title: `${c[k]} ${k}`
    })));
  }
  function Workspaces({
    onOpenDevice
  }) {
    const store = DATA.useStore();
    PR.useStore();
    const live = store.mode === 'live';
    const [q, setQ] = useState('');
    const [bld, setBld] = useState('');
    const [sel, setSel] = useState(() => new Set());
    const [presetId, setPresetId] = useState(PR.all()[0] ? PR.all()[0].id : '');
    const [run, setRun] = useState(null); // { preset, total, log, done }
    const applied = PR.loadApplied();
    const buildings = useMemo(() => {
      const s = new Set();
      store.workspaces.forEach(w => w.building && s.add(w.building));
      return Array.from(s).sort();
    }, [store.workspaces]);
    let rows = store.workspaces;
    if (bld) rows = rows.filter(w => w.building === bld);
    if (q) rows = rows.filter(w => (w.name + ' ' + w.building).toLowerCase().includes(q.toLowerCase()));
    const selWs = store.workspaces.filter(w => sel.has(w.id));
    const selDevicesAll = selWs.reduce((acc, w) => acc.concat(w.devices), []);
    const selDevices = WX.eligible(selDevicesAll);
    const allChecked = rows.length > 0 && rows.every(w => sel.has(w.id));
    const someChecked = rows.some(w => sel.has(w.id)) && !allChecked;
    const toggle = id => {
      const n = new Set(sel);
      n.has(id) ? n.delete(id) : n.add(id);
      setSel(n);
    };
    const toggleAll = () => {
      if (allChecked) setSel(new Set());else setSel(new Set(rows.map(w => w.id)));
    };
    async function applyPreset() {
      const preset = PR.get(presetId);
      if (!preset) {
        notify('Pick a preset first', 'warning');
        return;
      }
      if (!selDevices.length) {
        notify('No eligible devices (matching target models) in the selected workspaces', 'warning');
        return;
      }
      if (live && !window.confirm(`Apply “${preset.name}” to ${selDevices.length} eligible device(s) across ${selWs.length} workspace(s)?`)) return;
      const runState = {
        preset,
        total: selDevices.length,
        log: [],
        done: false,
        ok: 0,
        err: 0
      };
      setRun({
        ...runState
      });
      const onLog = e => {
        if (e.update) {
          const i = runState.log.findIndex(x => x.uid === e.uid);
          if (i >= 0) runState.log[i] = {
            ...runState.log[i],
            status: e.status,
            detail: e.detail
          };
          if (e.status === 'ok') runState.ok++;
          if (e.status === 'err') runState.err++;
        } else {
          runState.log.push(e);
        }
        setRun({
          ...runState,
          log: [...runState.log]
        });
      };
      await PR.apply(preset, selDevices, {
        live,
        onLog
      });
      selWs.forEach(w => {
        if (WX.eligible(w.devices).length) PR.recordApplied(w.id, preset.name);
      });
      runState.done = true;
      setRun({
        ...runState,
        log: [...runState.log]
      });
      notify(`Applied “${preset.name}” · ${runState.ok} ok${runState.err ? ` · ${runState.err} failed` : ''}`, runState.err ? 'warning' : 'success');
    }
    const presetOpts = PR.all().map(p => ({
      value: p.id,
      label: p.name
    }));
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(PageHead, {
      title: "Workspaces",
      sub: `${store.workspaces.length} workspaces${live ? '' : ' · demo'}`,
      actions: /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        leadingIcon: I('sliders-horizontal'),
        onClick: () => window.WRF_notify && window.WRF_notify('Open the Presets tab to edit configs', 'neutral')
      }, "Manage presets")
    }), !live && /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      title: "Demo workspaces"
    }, "Connect Webex to load your real workspaces. Selecting workspaces and applying a preset works the same \u2014 in demo the config calls are simulated."), /*#__PURE__*/React.createElement("div", {
      className: "wrf-toolbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-toolbar-right",
      style: {
        marginLeft: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 240
      }
    }, /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      leadingIcon: I('search'),
      placeholder: "Search workspaces\u2026",
      value: q,
      onChange: e => setQ(e.target.value)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        width: 180
      }
    }, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      value: bld,
      onChange: e => setBld(e.target.value),
      options: ['', ...buildings].map(b => ({
        value: b,
        label: b || 'All buildings'
      }))
    })))), sel.size > 0 && /*#__PURE__*/React.createElement("div", {
      className: "wrf-bulkbar"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-bulk-count"
    }, sel.size, " workspace", sel.size > 1 ? 's' : '', " \xB7 ", selDevices.length, " eligible device", selDevices.length === 1 ? '' : 's'), /*#__PURE__*/React.createElement("div", {
      className: "wrf-bulk-actions",
      style: {
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 220
      }
    }, /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      value: presetId,
      onChange: e => setPresetId(e.target.value),
      options: presetOpts,
      placeholder: "Choose preset\u2026"
    })), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "primary",
      leadingIcon: I('rocket'),
      onClick: applyPreset
    }, "Apply preset")), /*#__PURE__*/React.createElement("button", {
      className: "wrf-bulk-clear",
      onClick: () => setSel(new Set())
    }, "Clear")), /*#__PURE__*/React.createElement("div", {
      className: "wrf-table-wrap"
    }, /*#__PURE__*/React.createElement("table", {
      className: "wrf-table"
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: "wrf-th-check"
    }, /*#__PURE__*/React.createElement(Checkbox, {
      indeterminate: someChecked,
      checked: allChecked,
      onChange: toggleAll,
      "aria-label": "Select all"
    })), /*#__PURE__*/React.createElement("th", null, "Workspace"), /*#__PURE__*/React.createElement("th", null, "Building"), /*#__PURE__*/React.createElement("th", null, "Devices"), /*#__PURE__*/React.createElement("th", null, "State"), /*#__PURE__*/React.createElement("th", null, "Last applied"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(w => {
      const ap = applied[w.id];
      return /*#__PURE__*/React.createElement("tr", {
        key: w.id,
        className: "wrf-trow",
        onClick: () => toggle(w.id)
      }, /*#__PURE__*/React.createElement("td", {
        className: "wrf-td-check",
        onClick: e => e.stopPropagation()
      }, /*#__PURE__*/React.createElement(Checkbox, {
        checked: sel.has(w.id),
        onChange: () => toggle(w.id),
        "aria-label": `Select ${w.name}`
      })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
        className: "wrf-cell-device"
      }, /*#__PURE__*/React.createElement(Avatar, {
        kind: "device",
        name: w.name,
        size: "sm",
        icon: I('door-open')
      }), /*#__PURE__*/React.createElement("div", {
        className: "wrf-cell-device-main"
      }, /*#__PURE__*/React.createElement("span", {
        className: "wrf-cell-device-name"
      }, w.name)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
        className: "wrf-cell-model"
      }, w.building)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
        className: "wrf-ws-devcell"
      }, /*#__PURE__*/React.createElement("span", {
        className: "wrf-ws-count"
      }, w.devices.length), /*#__PURE__*/React.createElement("span", {
        className: "wrf-ws-models"
      }, WX.eligible(w.devices).length ? `${WX.eligible(w.devices).length} eligible` : 'no target models'))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(StateDots, {
        devices: w.devices
      })), /*#__PURE__*/React.createElement("td", null, ap ? /*#__PURE__*/React.createElement("span", {
        className: "wrf-ws-applied"
      }, I('check-circle-2'), ap.name) : /*#__PURE__*/React.createElement("span", {
        className: "wrf-cell-sub"
      }, "\u2014")));
    })))), run && /*#__PURE__*/React.createElement(RunModal, {
      run: run,
      onClose: () => setRun(null)
    }));
  }
  function RunModal({
    run,
    onClose
  }) {
    const okN = run.log.filter(x => x.status === 'ok').length;
    const errN = run.log.filter(x => x.status === 'err').length;
    const actTotal = run.log.filter(x => x.kind === 'act').length;
    const pct = actTotal ? Math.round((okN + errN) / actTotal * 100) : 0;
    return /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-scrim",
      onClick: run.done ? onClose : undefined
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal wrf-runmodal",
      onClick: e => e.stopPropagation()
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-head"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-connect-brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-connect-ic",
      style: {
        background: 'color-mix(in srgb, ' + (run.preset.accent || 'var(--accent)') + ' 16%, transparent)',
        color: run.preset.accent || 'var(--accent)'
      }
    }, I('rocket')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
      className: "wrf-modal-title"
    }, run.done ? 'Deployment complete' : 'Applying preset…'), /*#__PURE__*/React.createElement("p", {
      className: "wrf-modal-sub"
    }, run.preset.name, " \xB7 ", run.total, " device(s)"))), run.done && /*#__PURE__*/React.createElement("button", {
      className: "wrf-modal-x",
      onClick: onClose,
      "aria-label": "Close"
    }, I('x'))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-runbar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "wrf-runbar-fill",
      style: {
        width: pct + '%',
        background: errN ? 'var(--status-degraded)' : 'var(--status-online)'
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-body wrf-runlog"
    }, run.log.map(x => x.kind === 'head' ? /*#__PURE__*/React.createElement("div", {
      key: x.uid,
      className: "wrf-log-head"
    }, I('monitor'), /*#__PURE__*/React.createElement("b", null, x.name), /*#__PURE__*/React.createElement("span", null, x.model)) : /*#__PURE__*/React.createElement("div", {
      key: x.uid,
      className: "wrf-log-line",
      "data-status": x.status
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-log-ic"
    }, x.status === 'ok' ? I('check') : x.status === 'err' ? I('x') : I('loader-2', {
      className: 'wrf-spin'
    })), /*#__PURE__*/React.createElement("span", {
      className: "wrf-log-label"
    }, x.label), x.detail && /*#__PURE__*/React.createElement("span", {
      className: "wrf-log-detail"
    }, x.detail)))), /*#__PURE__*/React.createElement("div", {
      className: "wrf-modal-foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "wrf-run-summary"
    }, okN, " ok", errN ? ` · ${errN} failed` : ''), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }), /*#__PURE__*/React.createElement(Button, {
      variant: run.done ? 'primary' : 'ghost',
      disabled: !run.done,
      onClick: onClose
    }, run.done ? 'Done' : 'Running…'))));
  }
  window.WRF_Workspaces = Workspaces;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/console/workspaces.view.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.MetricStat = __ds_scope.MetricStat;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
