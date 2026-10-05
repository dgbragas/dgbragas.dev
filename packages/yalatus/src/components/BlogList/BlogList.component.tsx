import { createElement, forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import './BlogList.styles.scss';

import type { BlogListElement, BlogListProps } from './BlogList.types';

function BlogListBase(
  { className, items, ordered = false, ...rest }: BlogListProps,
  ref: ForwardedRef<BlogListElement>
) {
  const styles = clsx('yl-blog-list', ordered && 'yl-blog-list--ordered', className);

  return createElement(
    ordered ? 'ol' : 'ul',
    { ...rest, className: styles, ref, role: 'list' },
    items.map((item, index) => (
      <li className="yl-blog-list__item" key={index}>
        {item}
      </li>
    ))
  );
}

/**
 * List used inside long-form content, marking each entry with the brand rule outside the text column.
 * @example
 * <BlogList items={['Entrevistas com engenharia', 'Entrevistas com People & Culture']} />
 * @example
 * <BlogList ordered items={steps} />
 */
export const BlogList = forwardRef<BlogListElement, BlogListProps>(BlogListBase);
