import { createElement, forwardRef, type ForwardedRef } from 'react';

import { buildBox, splitBoxProps } from './Box.helpers';

import './Box.styles.scss';

import type { BoxElement, BoxProps } from './Box.types';

function BoxBase(
  { as = 'div', children, className, style, ...props }: BoxProps,
  ref: ForwardedRef<BoxElement>
) {
  const { styleProps, rest } = splitBoxProps(props);
  const built = buildBox(styleProps, className, style);

  return createElement(
    as,
    { ...rest, className: built.className, ref, style: built.style },
    children
  );
}

/**
 * Layout primitive that maps spacing, size, flex and colour tokens to inline styles, so components keep layout out of their SCSS.
 * @example
 * <Box p="space-16" bg="surface-default" borderRadius="radius-4">Card</Box>
 * @example
 * <Box as="section" px={{ base: 'space-16', web: 'space-112' }}>Responsive gutters</Box>
 */
export const Box = forwardRef<BoxElement, BoxProps>(BoxBase);
