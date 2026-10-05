import { forwardRef, useRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { useCountUp, useInView, useReducedMotion } from '@dgbragas/yalatus/hooks';

import { Stack, Text } from '..';

import { COUNT_UP_DURATION } from './BigNumber.constants';
import { formatNumber } from './BigNumber.helpers';

import './BigNumber.styles.scss';

import type { BigNumberElement, BigNumberProps } from './BigNumber.types';

function BigNumberBase(
  {
    className,
    label,
    prefix,
    suffix,
    value,
    decimals = 0,
    locale = 'pt-BR',
    ...rest
  }: BigNumberProps,
  ref: ForwardedRef<BigNumberElement>
) {
  const figureRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(figureRef);
  const reducedMotion = useReducedMotion();
  const current = useCountUp({
    to: value,
    duration: reducedMotion ? 0 : COUNT_UP_DURATION,
    enabled: inView,
  });

  const styles = clsx('yl-big-number', className);
  const finalText = `${prefix ?? ''}${formatNumber(value, decimals, locale)}${suffix ?? ''}`;
  const currentText = `${prefix ?? ''}${formatNumber(current, decimals, locale)}${suffix ?? ''}`;

  return (
    <Stack {...rest} className={styles} gap="space-8" ref={ref}>
      <Text className="yl-big-number__figure" element="span" kind="numeral-lg" ref={figureRef}>
        <span aria-hidden className="yl-big-number__current">
          {currentText}
        </span>
        {/* The final value keeps the width reserved so the counter never shifts the layout, and it is what assistive technology reads */}
        <span className="yl-big-number__final">{finalText}</span>
      </Text>
      <Text className="yl-big-number__label" color="fg-subtle">
        {label}
      </Text>
    </Stack>
  );
}

/**
 * Headline statistic whose number counts up from zero when it scrolls into view.
 *
 * Assistive technology reads the final value only; with reduced motion the number appears already complete.
 * @example
 * <BigNumber value={92} suffix="%" label="de adoção média do design system" />
 * @example
 * <BigNumber value={4} prefix="+" suffix="M" label="usuários impactados" />
 */
export const BigNumber = forwardRef<BigNumberElement, BigNumberProps>(BigNumberBase);
