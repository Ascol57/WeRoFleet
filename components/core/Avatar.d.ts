import * as React from 'react';

/**
 * Round avatar for a person (initials or photo) or a square glyph for a device.
 * Person initials are tinted deterministically from the name; an optional status
 * ring marks presence/device state.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Display name — used for initials and the deterministic tint. */
  name?: string;
  /** Photo URL; overrides initials when set. */
  src?: string;
  /** Custom glyph element; overrides initials. */
  icon?: React.ReactNode;
  /** "user" = round initials, "device" = square monitor glyph. @default "user" */
  kind?: 'user' | 'device';
  /** @default "md" */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** @default "circle" */
  shape?: 'circle' | 'square';
  /** Color of the small presence/status ring (omit for none). */
  statusColor?: string;
}

export function Avatar(props: AvatarProps): JSX.Element;
