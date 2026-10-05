import type { CSSProperties } from 'react';

import { clsx } from 'clsx';

import { BREAKPOINT_SUFFIX, STYLE_PROPS, type StylePropName } from './Box.constants';
import { isResponsive, type Breakpoint } from './Box.resolvers';

const STYLE_PROP_NAMES = Object.keys(STYLE_PROPS) as StylePropName[];

/** Splits Box props into the style props it owns and everything else to forward. */
export function splitBoxProps<T extends Record<string, unknown>>(
  props: T
): { styleProps: Partial<Record<StylePropName, unknown>>; rest: Omit<T, StylePropName> } {
  const styleProps: Partial<Record<StylePropName, unknown>> = {};
  const rest: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (STYLE_PROP_NAMES.includes(key as StylePropName)) styleProps[key as StylePropName] = value;
    else rest[key] = value;
  }
  return { styleProps, rest: rest as Omit<T, StylePropName> };
}

/** Builds the class list and inline style of a Box; responsive props become CSS variables read by the `yl-box--r-*` classes. */
export function buildBox(
  styleProps: Partial<Record<StylePropName, unknown>>,
  className?: string,
  inlineStyle?: CSSProperties
): { className: string; style: CSSProperties | undefined } {
  const style: Record<string, unknown> = {};
  const classes: string[] = [];

  for (const [name, value] of Object.entries(styleProps) as [StylePropName, unknown][]) {
    if (value === undefined) continue;
    const { css, resolve } = STYLE_PROPS[name];

    if (isResponsive(value)) {
      classes.push(`yl-box--r-${name}`);
      for (const [breakpoint, suffix] of Object.entries(BREAKPOINT_SUFFIX) as [
        Breakpoint,
        string,
      ][]) {
        const resolved = resolve((value as Record<Breakpoint, unknown>)[breakpoint]);
        if (resolved !== undefined) style[`--yl-r-${name}${suffix}`] = resolved;
      }
      continue;
    }

    for (const property of css) style[property] = resolve(value);
  }

  const merged = { ...style, ...inlineStyle };
  return {
    className: clsx('yl-box', classes, className),
    style: Object.keys(merged).length > 0 ? merged : undefined,
  };
}
