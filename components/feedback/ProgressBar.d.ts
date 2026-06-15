import * as React from 'react';

/**
 * Thin progress bar — firmware rollout coverage, file transfer, storage usage.
 * Determinate by default; set `indeterminate` for unknown-duration work.
 */
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value. @default 0 */
  value?: number;
  /** Scale max. @default 100 */
  max?: number;
  label?: React.ReactNode;
  /** Show the right-aligned percentage / value. @default false */
  showValue?: boolean;
  /** Override the displayed value text (e.g. "842 / 1,240"). */
  valueText?: React.ReactNode;
  /** Fill color by sentiment. @default "accent" */
  tone?: 'accent' | 'online' | 'degraded' | 'critical';
  /** @default "md" */
  size?: 'md' | 'lg';
  /** Looping indeterminate animation. @default false */
  indeterminate?: boolean;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
