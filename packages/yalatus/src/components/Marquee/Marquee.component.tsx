import { forwardRef, type ForwardedRef } from 'react';

import { clsx } from 'clsx';

import { Icon, Stack, Text } from '..';

import './Marquee.styles.scss';

import type { MarqueeElement, MarqueeItem, MarqueeProps } from './Marquee.types';

function Track({ items, hidden }: { items: MarqueeItem[]; hidden?: boolean }) {
  return (
    <Stack
      aria-hidden={hidden}
      as="ul"
      className="yl-marquee__track"
      gap="space-64"
      orientation="horizontal"
      role="list"
    >
      {items.map(item => (
        <Stack
          alignItems="center"
          as="li"
          className="yl-marquee__item"
          gap="space-16"
          key={item.label}
          orientation="horizontal"
        >
          <Stack
            bg={item.color ?? 'surface-accent-subtle'}
            borderRadius="radius-4"
            center
            className="yl-marquee__plate"
          >
            <Icon name={item.icon} size="large" />
          </Stack>
          <Text className="yl-marquee__label" element="span" kind="heading-3" color="fg-subtle">
            {item.label}
          </Text>
        </Stack>
      ))}
    </Stack>
  );
}

function MarqueeBase(
  { className, items, label = 'Tecnologias e temas', ...rest }: MarqueeProps,
  ref: ForwardedRef<MarqueeElement>
) {
  const styles = clsx('yl-marquee', className);

  return (
    <Stack {...rest} aria-label={label} as="section" className={styles} gap="space-48" ref={ref}>
      <div className="yl-marquee__viewport">
        <Track items={items} />
        {/* The second copy fills the gap while the first scrolls out, so the band loops without a jump */}
        <Track items={items} hidden />
      </div>
    </Stack>
  );
}

/**
 * Band of icons and labels that scrolls sideways on a loop, pausing on hover and focus and standing still under reduced motion.
 *
 * Assistive technology reads the list once; the duplicate copy that keeps the loop seamless is hidden.
 * @example
 * <Marquee items={[{ icon: 'react', label: 'React' }, { icon: 'figma', label: 'Figma', color: 'surface-info' }]} />
 */
export const Marquee = forwardRef<MarqueeElement, MarqueeProps>(MarqueeBase);
