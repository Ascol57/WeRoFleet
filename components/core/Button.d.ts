import * as React from 'react';

/**
 * WeRoFleet primary action button. Solid teal for the one main action per view;
 * secondary/ghost for supporting actions; danger for destructive ops
 * (reboot, factory-reset, remove from fleet).
 *
 * @startingPoint section="Core" subtitle="Action button — primary, secondary, ghost, danger" viewport="700x120"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill container width. @default false */
  block?: boolean;
  /** Icon element rendered before the label (e.g. a Lucide <i> or <svg>). */
  leadingIcon?: React.ReactNode;
  /** Icon element rendered after the label. */
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
