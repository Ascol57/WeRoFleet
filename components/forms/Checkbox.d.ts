import * as React from 'react';

/**
 * Checkbox (default) or radio (`shape="radio"`) with optional label and
 * description. Supports the indeterminate "select-all" header state used atop
 * device tables.
 */
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
  /** "check" = square checkbox, "radio" = round radio. @default "check" */
  shape?: 'check' | 'radio';
  /** Tri-state (mixed) — for select-all headers. @default false */
  indeterminate?: boolean;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
