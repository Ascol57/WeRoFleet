import * as React from 'react';

/**
 * Surface container for panels, metric tiles, and grouped content.
 * Pass a `title`/`subtitle`/`headerActions` to get the standard header,
 * or just children + `pad` for a plain padded panel.
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right-aligned header controls (IconButtons, menus). */
  headerActions?: React.ReactNode;
  /** Leading header icon/avatar. */
  icon?: React.ReactNode;
  /** @default "default" */
  elevation?: 'flat' | 'default' | 'raised';
  /** Hover lift + pointer (clickable card). @default false */
  interactive?: boolean;
  /** Pad the surface directly (only applies when there is no header). @default false */
  pad?: boolean;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
