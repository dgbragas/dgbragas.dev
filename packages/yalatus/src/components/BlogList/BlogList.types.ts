import type { HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type BlogListElement = HTMLUListElement | HTMLOListElement;

type YalatusBlogList = Omit<BaseComponentProps, 'children'> & {
  /** Entries of the list in reading order. */
  items: ReactNode[];
  /**
   * Numbers the entries instead of marking them with the brand rule.
   * @default false
   */
  ordered?: boolean;
};

type BlogListProps = MergeProps<YalatusBlogList, HTMLAttributes<BlogListElement>>;

export type { BlogListElement, BlogListProps };
