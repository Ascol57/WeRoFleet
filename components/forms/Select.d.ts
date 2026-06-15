import * as React from 'react';

/**
 * Native-backed dropdown select with the WeRoFleet chrome. Pass `options`
 * (strings or {value,label}) or raw <option> children.
 */
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: React.ReactNode;
  /** Option list — strings or {value,label} objects. */
  options?: Array<string | { value: string; label: React.ReactNode }>;
  /** Disabled first option shown when nothing is selected. */
  placeholder?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
}

export function Select(props: SelectProps): JSX.Element;
