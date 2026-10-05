import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Stack, Text } from '..';

import './Figure.styles.scss';

import type { FigureElement, FigureProps } from './Figure.types';

function FigureBase(
  {
    alt,
    caption,
    children,
    className,
    height,
    src,
    width,
    captionLabel = '#PraCegoVer',
    loading = 'lazy',
    ...rest
  }: FigureProps,
  ref: ForwardedRef<FigureElement>
) {
  const styles = clsx('yl-figure', className);

  return (
    <Stack {...rest} as="figure" className={styles} gap="space-8" ref={ref}>
      {children ?? (
        <img
          alt={alt}
          className="yl-figure__image"
          height={height}
          loading={loading}
          src={src}
          width={width}
        />
      )}
      {caption && (
        <Text className="yl-figure__caption" element="figcaption" color="fg-subtle">
          <strong className="yl-figure__caption-label">{captionLabel}</strong> - {caption}
        </Text>
      )}
    </Stack>
  );
}

/**
 * Image with an optional caption that opens with the #PraCegoVer convention.
 * @example
 * <Figure src="/cover.png" alt="Diagrama do fluxo" caption="Diagrama com as três etapas do processo." />
 * @example
 * <Figure alt="" caption="Foto do evento"><Image src={photo} alt="" /></Figure>
 */
export const Figure = forwardRef<FigureElement, FigureProps>(FigureBase);
