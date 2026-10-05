import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import './Tag.styles.scss';

import type { TagElement, TagProps } from './Tag.types';

function TagBase(
  { children, className, appearance = 'brand', kind = 'outline', ...rest }: TagProps,
  ref: ForwardedRef<TagElement>
) {
  const styles = clsx('yl-tag', `yl-tag--${appearance}`, `yl-tag--${kind}`, className);

  return (
    <span {...rest} className={styles} ref={ref}>
      {children}
    </span>
  );
}

/**
 * Short label that classifies content, such as a post tag or a status.
 * @example
 * <Tag>Design System</Tag>
 * @example
 * <Tag appearance="success" kind="filled">Publicado</Tag>
 */
export const Tag = forwardRef<TagElement, TagProps>(TagBase);
