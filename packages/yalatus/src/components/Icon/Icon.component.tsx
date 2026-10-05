import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { resolveColor } from '../Box/Box.resolvers';

import { ICONS } from './Icon.registry';

import './Icon.styles.scss';

import type { IconElement, IconProps } from './Icon.types';

function IconBase(
  { className, label, name, style, color = 'inherit', size = 'medium', ...rest }: IconProps,
  ref: ForwardedRef<IconElement>
) {
  const styles = clsx('yl-icon', `yl-icon--${size}`, className);
  const inlineStyle = color === 'inherit' ? style : { color: resolveColor(color), ...style };

  const accessibilityProps = label ? { 'aria-label': label, role: 'img' } : { 'aria-hidden': true };

  return (
    <span
      {...rest}
      {...accessibilityProps}
      className={styles}
      dangerouslySetInnerHTML={{ __html: ICONS[name] }}
      ref={ref}
      style={inlineStyle}
    />
  );
}

/**
 * Inline SVG icon from the Yalatus set that takes the colour and size of its context.
 *
 * Without `label` the icon is hidden from assistive technology, which is right when it sits next to text or inside a control that already has a name.
 * @example
 * <Icon name="search" />
 * @example
 * <Icon name="rss" label="Feed RSS" size="small" color="fg-accent" />
 */
export const Icon = forwardRef<IconElement, IconProps>(IconBase);
