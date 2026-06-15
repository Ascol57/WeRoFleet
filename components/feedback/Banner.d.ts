import * as React from 'react';

/**
 * Inline alert / system message — incident notices, maintenance windows, and
 * contextual warnings inside panels. For transient confirmations use a toast.
 *
 * @startingPoint section="Feedback" subtitle="Inline alert — info, success, warning, critical" viewport="700x150"
 */
export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** @default "info" */
  tone?: 'info' | 'success' | 'warning' | 'critical' | 'neutral';
  /** Bold first line. */
  title?: React.ReactNode;
  /** Override the default tone icon. */
  icon?: React.ReactNode;
  /** Square corners + bottom border only — for full-width page headers. @default false */
  flush?: boolean;
  /** Show a dismiss button; called when clicked. */
  onClose?: () => void;
  /** Action row (Buttons / links) under the message. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
}

export function Banner(props: BannerProps): JSX.Element;
