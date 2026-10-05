import { createElement, forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { resolveColor } from '../Box/Box.resolvers';

import { TEXT_DEFAULT_ELEMENT } from './Text.constants';

import './Text.styles.scss';

import type { TextElement, TextProps } from './Text.types';

function TextBase(
  {
    align,
    children,
    className,
    element,
    style,
    color = 'inherit',
    kind = 'body',
    truncate = false,
    ...rest
  }: TextProps,
  ref: ForwardedRef<TextElement>
) {
  const tag = element ?? TEXT_DEFAULT_ELEMENT[kind];
  const styles = clsx(
    'yl-text',
    `yl-text--${kind}`,
    align && `yl-text--${align}`,
    truncate && 'yl-text--truncate',
    className
  );
  const inlineStyle = color === 'inherit' ? style : { color: resolveColor(color), ...style };

  return createElement(tag, { ...rest, className: styles, ref, style: inlineStyle }, children);
}

/**
 * Typography primitive that applies one style of the Yalatus type scale and the matching semantic element.
 * @example
 * <Text kind="heading-2">Section title</Text>
 * @example
 * <Text kind="caption" element="time" dateTime="2026-10-04" color="fg-subtle">4 out 2026</Text>
 */
export const Text = forwardRef<TextElement, TextProps>(TextBase);
