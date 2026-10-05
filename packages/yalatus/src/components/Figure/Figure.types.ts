import type { HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type FigureElement = HTMLElement;

type YalatusFigure = Omit<BaseComponentProps, 'children'> & {
  /** Image source; ignored when `children` supplies the image. */
  src?: string;
  /** Alternative text of the image; empty when decorative. */
  alt: string;
  /** Image element supplied by the consumer, such as an optimised picture. */
  children?: ReactNode;
  /** Description shown under the image. */
  caption?: ReactNode;
  /**
   * Hashtag that opens the caption, a Brazilian convention for image descriptions.
   * @default '#PraCegoVer'
   */
  captionLabel?: string;
  /**
   * Browser loading strategy of the image.
   * @default 'lazy'
   */
  loading?: 'lazy' | 'eager';
  /** Intrinsic width of the image in pixels, used to reserve space before it loads. */
  width?: number;
  /** Intrinsic height of the image in pixels, used to reserve space before it loads. */
  height?: number;
};

type FigureProps = MergeProps<YalatusFigure, HTMLAttributes<FigureElement>>;

export type { FigureElement, FigureProps };
