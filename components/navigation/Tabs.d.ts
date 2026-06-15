import * as React from 'react';

export interface TabItem {
  value: string;
  label: React.ReactNode;
  /** Leading icon (Lucide <i>). */
  icon?: React.ReactNode;
  /** Optional count pill (e.g. devices in this view). */
  count?: number;
}

/**
 * Horizontal tab strip — `underline` for page sections, `pill` for a compact
 * segmented control. Controlled via `value` + `onChange`.
 *
 * @startingPoint section="Navigation" subtitle="Tab strip — underline & segmented variants" viewport="700x110"
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  tabs: TabItem[];
  /** Active tab value. */
  value: string;
  /** Called with the next tab value. */
  onChange?: (value: string) => void;
  /** @default "underline" */
  variant?: 'underline' | 'pill';
}

export function Tabs(props: TabsProps): JSX.Element;
