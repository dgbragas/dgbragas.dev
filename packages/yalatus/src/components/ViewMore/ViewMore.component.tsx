import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Icon, Stack } from '..';

import './ViewMore.styles.scss';

import type { ViewMoreElement, ViewMoreProps } from './ViewMore.types';

function ViewMoreBase(
  { children, className, href, type, as = 'button', disabled = false, ...rest }: ViewMoreProps,
  ref: ForwardedRef<ViewMoreElement>
) {
  const styles = clsx('yl-view-more', disabled && 'yl-view-more--disabled', className);

  // An anchor has no native disabled state, so it loses the href and announces the state through ARIA
  const conditionalProps =
    as === 'button'
      ? { disabled, type: type ?? 'button' }
      : { 'aria-disabled': disabled || undefined, href: disabled ? undefined : href };

  return (
    <Stack
      {...rest}
      {...conditionalProps}
      as={as}
      center
      className={styles}
      gap="space-8"
      orientation="horizontal"
      ref={ref}
    >
      <Icon name="plus" size="small" />
      <span className="yl-view-more__label">{children}</span>
    </Stack>
  );
}

/**
 * Wide dashed control at the end of a list that loads the next batch or leads to the full archive.
 * @example
 * <ViewMore onClick={loadMore}>Ver acervo completo</ViewMore>
 * @example
 * <ViewMore as="a" href="/blog">Ver todos os posts</ViewMore>
 */
export const ViewMore = forwardRef<ViewMoreElement, ViewMoreProps>(ViewMoreBase);
