import type { AllHTMLAttributes, CSSProperties, JSX } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

import type { ColorValue, RadiusValue, Responsive, SpaceValue } from './Box.resolvers';

type BoxElement = HTMLElement;

type YalatusBox = BaseComponentProps & {
  /**
   * HTML element rendered as the root.
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;

  /** Margin on every side. */
  m?: Responsive<SpaceValue>;
  /** Margin on the block start side. */
  mt?: Responsive<SpaceValue>;
  /** Margin on the block end side. */
  mb?: Responsive<SpaceValue>;
  /** Margin on the inline start side. */
  ml?: Responsive<SpaceValue>;
  /** Margin on the inline end side. */
  mr?: Responsive<SpaceValue>;
  /** Margin on both inline sides. */
  mx?: Responsive<SpaceValue>;
  /** Margin on both block sides. */
  my?: Responsive<SpaceValue>;
  /** Padding on every side. */
  p?: Responsive<SpaceValue>;
  /** Padding on the block start side. */
  pt?: Responsive<SpaceValue>;
  /** Padding on the block end side. */
  pb?: Responsive<SpaceValue>;
  /** Padding on the inline start side. */
  pl?: Responsive<SpaceValue>;
  /** Padding on the inline end side. */
  pr?: Responsive<SpaceValue>;
  /** Padding on both inline sides. */
  px?: Responsive<SpaceValue>;
  /** Padding on both block sides. */
  py?: Responsive<SpaceValue>;
  /** Gap between flex or grid children. */
  gap?: Responsive<SpaceValue>;

  /** Width of the element. */
  width?: Responsive<SpaceValue>;
  /** Minimum width of the element. */
  minWidth?: Responsive<SpaceValue>;
  /** Maximum width of the element. */
  maxWidth?: Responsive<SpaceValue>;
  /** Height of the element. */
  height?: Responsive<SpaceValue>;
  /** Minimum height of the element. */
  minHeight?: Responsive<SpaceValue>;
  /** Maximum height of the element. */
  maxHeight?: Responsive<SpaceValue>;

  /** CSS display mode. */
  display?: Responsive<NonNullable<CSSProperties['display']>>;
  /** Direction of flex children. */
  flexDirection?: Responsive<'row' | 'column' | 'row-reverse' | 'column-reverse'>;
  /** Alignment of flex children on the cross axis. */
  alignItems?: Responsive<'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'>;
  /** Alignment of flex children on the main axis. */
  justifyContent?: Responsive<
    'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  >;
  /** Whether flex children wrap. */
  flexWrap?: Responsive<'nowrap' | 'wrap' | 'wrap-reverse'>;
  /** Flex shorthand of the element inside its parent. */
  flex?: string | number;
  /** Flex grow factor of the element inside its parent. */
  flexGrow?: number;
  /** Flex shrink factor of the element inside its parent. */
  flexShrink?: number;

  /** CSS position scheme. */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** Stacking order. */
  zIndex?: number;
  /** Overflow behaviour on both axes. */
  overflow?: 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto';
  /** Horizontal alignment of inline content. */
  textAlign?: Responsive<'start' | 'center' | 'end'>;

  /** Background colour token. */
  bg?: ColorValue;
  /** Text colour token. */
  color?: ColorValue;
  /** Corner radius token. */
  borderRadius?: RadiusValue;
};

type BoxProps = MergeProps<YalatusBox, AllHTMLAttributes<BoxElement>>;

export type { BoxElement, BoxProps };
