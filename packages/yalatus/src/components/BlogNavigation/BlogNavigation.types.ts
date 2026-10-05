import type { AnchorHTMLAttributes } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type BlogNavigationElement = HTMLAnchorElement;

type YalatusBlogNavigation = Omit<BaseComponentProps, 'children'> & {
  /** Destination of the neighbouring post. */
  href: string;
  /** Title of the neighbouring post. */
  title: string;
  /** Publication date as people read it. */
  date: string;
  /** Machine-readable date for the `time` element. */
  dateTime: string;
  /**
   * Which neighbour the link leads to; announced to assistive technology before the title.
   * @default 'next'
   */
  direction?: 'previous' | 'next';
  /**
   * Word announced for the previous post.
   * @default 'Anterior'
   */
  previousLabel?: string;
  /**
   * Word announced for the next post.
   * @default 'Próximo'
   */
  nextLabel?: string;
};

type BlogNavigationProps = MergeProps<
  YalatusBlogNavigation,
  AnchorHTMLAttributes<BlogNavigationElement>
>;

export type { BlogNavigationElement, BlogNavigationProps };
