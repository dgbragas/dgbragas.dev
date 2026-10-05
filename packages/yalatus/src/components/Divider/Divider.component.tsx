import { createElement, forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import './Divider.styles.scss';

import type { DividerElement, DividerProps } from './Divider.types';

function DividerBase(
  { className, as = 'hr', decorative = false, orientation = 'horizontal', ...rest }: DividerProps,
  ref: ForwardedRef<DividerElement>
) {
  const styles = clsx('yl-divider', `yl-divider--${orientation}`, className);

  const accessibilityProps = decorative
    ? { 'aria-hidden': true, role: 'none' }
    : {
        'aria-orientation': orientation === 'vertical' ? orientation : undefined,
        role: as === 'div' ? 'separator' : undefined,
      };

  return createElement(as, { ...rest, ...accessibilityProps, className: styles, ref });
}

/**
 * Thin line that separates groups of content on either axis.
 * @example
 * <Divider />
 * @example
 * <Divider as="div" orientation="vertical" decorative />
 */
export const Divider = forwardRef<DividerElement, DividerProps>(DividerBase);
