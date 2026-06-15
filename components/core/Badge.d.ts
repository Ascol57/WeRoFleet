import * as React from 'react';

/**
 * Compact count / label badge — device counts, firmware versions, "NEW",
 * unread alert counts. For live device state use `StatusBadge`.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: 'neutral' | 'accent' | 'online' | 'incall' | 'degraded' | 'critical' | 'offline';
  /** @default "rounded" */
  shape?: 'rounded' | 'pill';
  /** Transparent fill with a current-color border. @default false */
  outline?: boolean;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
