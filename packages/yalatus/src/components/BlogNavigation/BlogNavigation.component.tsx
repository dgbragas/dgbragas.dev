import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Stack, Text } from '..';

import './BlogNavigation.styles.scss';

import type { BlogNavigationElement, BlogNavigationProps } from './BlogNavigation.types';

function BlogNavigationBase(
  {
    className,
    date,
    dateTime,
    href,
    title,
    direction = 'next',
    nextLabel = 'Próximo',
    previousLabel = 'Anterior',
    ...rest
  }: BlogNavigationProps,
  ref: ForwardedRef<BlogNavigationElement>
) {
  const styles = clsx('yl-blog-navigation', `yl-blog-navigation--${direction}`, className);

  return (
    <Stack
      {...rest}
      as="a"
      className={styles}
      gap="space-4"
      href={href}
      px="space-32"
      py="space-24"
      ref={ref}
    >
      <span className="yl-sr-only">{direction === 'next' ? nextLabel : previousLabel}:</span>{' '}
      <Text
        className="yl-blog-navigation__date"
        element="time"
        kind="label-uppercase"
        color="fg-subtle"
        dateTime={dateTime}
      >
        {date}
      </Text>{' '}
      <Text className="yl-blog-navigation__title" element="span">
        {title}
      </Text>
    </Stack>
  );
}

/**
 * Link to the previous or next post at the end of an article, with its date and title.
 * @example
 * <BlogNavigation direction="previous" href="/blog/parte-1" date="18 set 2019" dateTime="2019-09-18" title="React Native: nunca vi, nem comi" />
 */
export const BlogNavigation = forwardRef<BlogNavigationElement, BlogNavigationProps>(
  BlogNavigationBase
);
