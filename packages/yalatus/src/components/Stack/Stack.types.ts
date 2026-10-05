import type { BoxProps } from '..';

type StackElement = HTMLElement;

type YalatusStack = Omit<BoxProps, 'display' | 'flexDirection'> & {
  /**
   * Axis the children are laid along.
   * @default 'vertical'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Centres children on both axes.
   * @default false
   */
  center?: boolean;
};

type StackProps = YalatusStack;

export type { StackElement, StackProps };
