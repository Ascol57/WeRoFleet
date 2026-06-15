import * as React from 'react';

/**
 * Removable / selectable chip — saved filters, location & group tags,
 * assigned peripherals. Optional leading color dot and dismiss button.
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Hex/token color for the leading dot (e.g. a room or group color). */
  dotColor?: string;
  /** Selected (filter active) styling. @default false */
  selected?: boolean;
  /** Show a dismiss "×"; called when clicked. */
  onRemove?: (e: React.MouseEvent) => void;
  /** Leading icon element (Lucide <i> / <svg>). */
  leadingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
