import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Stack, Tag, Text } from '..';

import './PortfolioCard.styles.scss';

import type { PortfolioCardElement, PortfolioCardProps } from './PortfolioCard.types';

function PortfolioCardBase(
  { className, cover, date, dateTime, description, href, tag, title, ...rest }: PortfolioCardProps,
  ref: ForwardedRef<PortfolioCardElement>
) {
  const styles = clsx('yl-portfolio-card', className);

  return (
    <Stack {...rest} as="a" className={styles} gap="space-24" href={href} ref={ref}>
      <div className="yl-portfolio-card__cover">{cover}</div>
      <Stack alignItems="flex-start" gap="space-12" px="space-4">
        <Tag appearance="neutral" className="yl-portfolio-card__tag">
          {tag}
        </Tag>
        <Stack gap="space-8">
          <Text className="yl-portfolio-card__title" element="h3" kind="heading-5">
            {title}
          </Text>
          <Text color="fg-subtle">{description}</Text>
        </Stack>
        {date && (
          <Text
            className="yl-portfolio-card__date"
            element="time"
            kind="label"
            color="fg-subtle"
            dateTime={dateTime}
          >
            {date}
          </Text>
        )}
      </Stack>
    </Stack>
  );
}

/**
 * Card that links to a portfolio project with its cover, category, title and description.
 * @example
 * <PortfolioCard href="/portfolio/casa1" cover={<img src={cover} alt="" />} tag="Landing" title="Casa1" description="Redesign para a Casa1." date="26 mar 2025" dateTime="2025-03-26" />
 */
export const PortfolioCard = forwardRef<PortfolioCardElement, PortfolioCardProps>(
  PortfolioCardBase
);
