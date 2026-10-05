import type { BoxProps } from '..';

type ContainerElement = HTMLElement;

type YalatusContainer = Omit<BoxProps, 'maxWidth' | 'mx' | 'px' | 'size'> & {
  /**
   * Width the content is allowed to take: `content` stops at the web grid, `full` only keeps the gutters.
   * @default 'content'
   */
  size?: 'content' | 'full';
};

type ContainerProps = YalatusContainer;

export type { ContainerElement, ContainerProps };
