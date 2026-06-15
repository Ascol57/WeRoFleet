import * as React from 'react';

/**
 * Single-line text input with optional label, lead/trail affixes, hint, and
 * validation. Use `mono` for serials, MAC addresses, and IPs.
 *
 * @startingPoint section="Forms" subtitle="Text input with label, icon & validation" viewport="700x130"
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Field label rendered above the control. */
  label?: React.ReactNode;
  /** Muted helper text below the field. */
  hint?: React.ReactNode;
  /** Error message; turns the field red and replaces the hint. */
  error?: React.ReactNode;
  /** Leading icon inside the field (Lucide <i>). */
  leadingIcon?: React.ReactNode;
  /** Trailing icon inside the field. */
  trailingIcon?: React.ReactNode;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Monospace input text — for serials, MACs, IPs. @default false */
  mono?: boolean;
}

export function Input(props: InputProps): JSX.Element;
