import * as React from 'react';

/**
 * Square icon-only button — toolbars, table-row quick actions, panel chrome.
 * Always pass `label` for accessibility (also used as the tooltip).
 */
export interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Icon node (Lucide <i data-lucide> or inline <svg>). */
  icon: React.ReactNode;
  /** @default "ghost" */
  variant?: 'ghost' | 'outline' | 'solid' | 'danger';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible name + tooltip text. Required. */
  label: string;
}

export function IconButton(props: IconButtonProps): JSX.Element;
