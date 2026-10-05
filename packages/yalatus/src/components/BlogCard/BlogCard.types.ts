import type { AnchorHTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps, MergeProps } from '@dgbragas/yalatus/helpers';

type BlogCardElement = HTMLAnchorElement;

type YalatusBlogCard = Omit<BaseComponentProps, 'children'> & {
  /** Destination of the post. */
  href: string;
  /** Title of the post. */
  title: string;
  /** Summary shown under the title. */
  description: string;
  /** Publication date as people read it, such as `27 jul 2026`. */
  date: string;
  /** Machine-readable date for the `time` element. */
  dateTime: string;
  /** Section or tag of the post, shown after the date. */
  category?: string;
  /**
   * Wide layout with the cover on the left, used for the highlighted post.
   * @default false
   */
  expanded?: boolean;
  /** Cover image, rendered only when expanded. */
  cover?: ReactNode;
};

type BlogCardProps = MergeProps<YalatusBlogCard, AnchorHTMLAttributes<BlogCardElement>>;

export type { BlogCardElement, BlogCardProps };
