import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Divider, Stack, Text } from '..';

import './CompanyCard.styles.scss';

import type { CompanyCardElement, CompanyCardProps } from './CompanyCard.types';

function CompanyCardBase(
  {
    className,
    logo,
    name,
    period,
    position,
    color = 'surface-accent-subtle',
    ...rest
  }: CompanyCardProps,
  ref: ForwardedRef<CompanyCardElement>
) {
  const styles = clsx('yl-company-card', className);

  return (
    <Stack {...rest} as="li" className={styles} gap="space-32" ref={ref}>
      <Stack gap="space-32" orientation="horizontal">
        <Stack bg={color} borderRadius="radius-2" center className="yl-company-card__plate">
          {logo}
        </Stack>
        <Stack gap="space-4">
          <Text element="h3" kind="heading-5">
            {name}
          </Text>
          <Text kind="body-lg" color="fg-subtle">
            {position}
          </Text>
          <Text color="fg-subtle">{period}</Text>
        </Stack>
      </Stack>
      <Divider decorative />
    </Stack>
  );
}

/**
 * Entry of the experience list: the company plate, the position and the period, closed by a rule.
 * @example
 * <ul role="list"><CompanyCard name="Caju Benefícios" position="Senior Front-end Developer" period="Agosto 2025 → Atualmente" color="#e80837" logo={<CajuLogo />} /></ul>
 */
export const CompanyCard = forwardRef<CompanyCardElement, CompanyCardProps>(CompanyCardBase);
