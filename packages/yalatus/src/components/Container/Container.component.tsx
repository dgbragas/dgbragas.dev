import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Box } from '..';

import './Container.styles.scss';

import type { ContainerElement, ContainerProps } from './Container.types';

function ContainerBase(
  { className, size = 'content', ...rest }: ContainerProps,
  ref: ForwardedRef<ContainerElement>
) {
  const styles = clsx('yl-container', `yl-container--${size}`, className);

  return <Box {...rest} className={styles} ref={ref} />;
}

/**
 * Centred column with the gutters of the Figma grids, capped at the 1216px web content width.
 * @example
 * <Container as="section">…</Container>
 * @example
 * <Container size="full">Edge-to-edge band with gutters</Container>
 */
export const Container = forwardRef<ContainerElement, ContainerProps>(ContainerBase);
