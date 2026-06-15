import * as React from 'react';

/**
 * Live device-state pill with a status dot — the canonical indicator for a Room
 * Kit's operational state across tables, cards, and the device inspector.
 * `incall` and `critical` pulse by default to draw the eye to live conditions.
 *
 * @startingPoint section="Status" subtitle="Device-state pill — online, in call, degraded, critical, offline" viewport="700x120"
 */
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Operational state. @default "online" */
  state?: 'online' | 'incall' | 'degraded' | 'critical' | 'offline';
  /** Override the default label text for the state. */
  label?: React.ReactNode;
  /** Force the live ping on/off (defaults on for incall & critical). */
  live?: boolean;
  /** Dot + label only, no filled pill background. @default false */
  plain?: boolean;
}

export function StatusBadge(props: StatusBadgeProps): JSX.Element;
