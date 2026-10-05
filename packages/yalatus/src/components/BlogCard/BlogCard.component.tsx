import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Stack, Text } from '..';

import './BlogCard.styles.scss';

import type { BlogCardElement, BlogCardProps } from './BlogCard.types';

function BlogCardBase(
  {
    category,
    className,
    cover,
    date,
    dateTime,
    description,
    href,
    title,
    expanded = false,
    ...rest
  }: BlogCardProps,
  ref: ForwardedRef<BlogCardElement>
) {
  const styles = clsx('yl-blog-card', expanded && 'yl-blog-card--expanded', className);

  return (
    <a {...rest} className={styles} href={href} ref={ref}>
      {expanded && <div className="yl-blog-card__cover">{cover}</div>}
      <Stack
        className="yl-blog-card__brief"
        justifyContent="space-between"
        gap="space-48"
        p={expanded ? 'space-32' : 'space-24'}
      >
        <Stack gap="space-8">
          <Text className="yl-blog-card__title" element="h3" kind="heading-5">
            {title}
          </Text>
          <Text color="fg-subtle">{description}</Text>
        </Stack>
        <Stack className="yl-blog-card__footer" gap="space-8" orientation="horizontal">
          <Text element="time" kind="label" color="fg-subtle" dateTime={dateTime}>
            {date}
          </Text>
          {category && (
            <Text className="yl-blog-card__category" kind="label" color="fg-subtle">
              {category}
            </Text>
          )}
        </Stack>
      </Stack>
    </a>
  );
}

/**
 * Card that links to a blog post with its title, summary, date and section.
 * @example
 * <BlogCard href="/blog/a11y" title="a11y - Parte 1" description="Introdução à acessibilidade." date="30 mar 2025" dateTime="2025-03-30" category="Acessibilidade" />
 * @example
 * <BlogCard expanded cover={<img src={cover} alt="" />} href="/blog/post" title="Último post" description="…" date="27 jul 2026" dateTime="2026-07-27" />
 */
export const BlogCard = forwardRef<BlogCardElement, BlogCardProps>(BlogCardBase);
