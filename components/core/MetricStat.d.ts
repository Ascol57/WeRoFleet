import * as React from 'react';

/**
 * KPI tile — a labelled headline number with optional unit, trend delta, and
 * footnote. The building block of the fleet dashboard's metric strip.
 *
 * @startingPoint section="Data" subtitle="Dashboard KPI tile with trend delta" viewport="700x160"
 */
export interface MetricStatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Uppercase eyebrow label above the number. */
  label: React.ReactNode;
  /** The headline figure (string or number). */
  value: React.ReactNode;
  /** Trailing unit, e.g. "%", "devices", "ms". */
  unit?: React.ReactNode;
  /** Leading label icon (Lucide <i>). */
  icon?: React.ReactNode;
  /** Delta text shown with a trend arrow, e.g. "+4" or "2.1%". */
  delta?: React.ReactNode;
  /** Direction + color of the delta. @default "flat" */
  trend?: 'up' | 'down' | 'flat';
  /** Muted context line below the value. */
  footnote?: React.ReactNode;
  /** @default "md" */
  size?: 'sm' | 'md';
}

export function MetricStat(props: MetricStatProps): JSX.Element;
