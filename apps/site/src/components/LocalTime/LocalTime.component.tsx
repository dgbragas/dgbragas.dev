import { useEffect, useState } from 'react';

import { Text } from '@dgbragas/yalatus';

import { formatLocalTime } from '@/lib/clock';
import type { Locale } from '@/lib/i18n';

export type LocalTimeProps = {
  /** Locale that spells the month. */
  locale: Locale;
};

/** MOTION: clock refresh, interval = 30000ms. */
const REFRESH_INTERVAL = 30_000;

/**
 * Kicker of the hero with the current date and time in São Paulo, refreshed while the page is open.
 */
export function LocalTime({ locale }: LocalTimeProps) {
  const [now, setNow] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), REFRESH_INTERVAL);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Text className="site-hero__kicker" color="fg-subtle" element="p">
      {now ? formatLocalTime(now, locale) : '[ São Paulo ]'}
    </Text>
  );
}
