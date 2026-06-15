import * as React from 'react';

/**
 * On/off toggle for instant-apply settings — auto-update, do-not-disturb,
 * presence broadcast. For values that commit on form submit, use Checkbox.
 */
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: React.ReactNode;
  /** @default "md" */
  size?: 'sm' | 'md';
}

export function Switch(props: SwitchProps): JSX.Element;
