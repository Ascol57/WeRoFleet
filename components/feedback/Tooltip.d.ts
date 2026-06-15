import * as React from 'react';

/**
 * Lightweight CSS hover/focus tooltip that wraps a single interactive child.
 * Best for icon buttons and truncated values; not for rich content.
 */
export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tooltip text. */
  label: React.ReactNode;
  /** Placement relative to the child. @default "top" */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Optional keyboard-shortcut hint shown muted on the right. */
  kbd?: React.ReactNode;
  /** The trigger element (single child). */
  children: React.ReactNode;
}

export function Tooltip(props: TooltipProps): JSX.Element;
