import {
  COLOR_KEYS,
  RADIUS_KEYS,
  SPACE_KEYS,
  type ColorKey,
  type RadiusKey,
  type SpaceKey,
} from '@dgbragas/yalatus/tokens/names';

/** Space token (`'space-16'`), number in px or any CSS length. */
export type SpaceValue = SpaceKey | number | (string & {});
/** Colour alias token (`'fg-default'`) or any CSS colour. */
export type ColorValue = ColorKey | (string & {});
/** Radius token (`'radius-4'`), number in px or any CSS length. */
export type RadiusValue = RadiusKey | number | (string & {});

export type Breakpoint = 'base' | 'tablet' | 'web';
/** Value per breakpoint; a missing breakpoint inherits the one below it. */
export type ResponsiveObject<T> = Partial<Record<Breakpoint, T>>;
/** Scalar value or value per breakpoint. */
export type Responsive<T> = T | ResponsiveObject<T>;

const SPACE = new Set<string>(SPACE_KEYS);
const COLOR = new Set<string>(COLOR_KEYS);
const RADIUS = new Set<string>(RADIUS_KEYS);

/** Tells a per-breakpoint object apart from a scalar value. */
export function isResponsive<T>(value: Responsive<T>): value is ResponsiveObject<T> {
  return typeof value === 'object' && value !== null;
}

/** Converts a space value to CSS; `undefined` stays `undefined`. */
export function resolveSpace(value: SpaceValue | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return SPACE.has(value) ? `var(--yl-${value})` : value;
}

/** Converts a colour value to CSS; `undefined` stays `undefined`. */
export function resolveColor(value: ColorValue | undefined): string | undefined {
  if (value === undefined) return undefined;
  return COLOR.has(value) ? `var(--yl-color-${value})` : value;
}

/** Converts a radius value to CSS; `undefined` stays `undefined`. */
export function resolveRadius(value: RadiusValue | undefined): string | undefined {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return RADIUS.has(value) ? `var(--yl-${value})` : value;
}
