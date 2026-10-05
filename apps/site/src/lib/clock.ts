import type { Locale } from './i18n';

const TIME_ZONE = 'America/Sao_Paulo';

/**
 * Writes the São Paulo date and time the way the hero kicker shows it, such as `[ 8 de agosto / 09:00 BRT / São Paulo ]`.
 * @param date - Instant to show
 * @param locale - Locale that spells the month
 * @returns The bracketed kicker text
 * @example
 * formatLocalTime(new Date('2026-08-08T12:00:00Z'), 'pt-BR') // '[ 8 de agosto / 09:00 BRT / São Paulo ]'
 */
export function formatLocalTime(date: Date, locale: Locale): string {
  const day = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    timeZone: TIME_ZONE,
  });
  const time = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: TIME_ZONE,
  });
  return `[ ${day.format(date)} / ${time.format(date)} BRT / São Paulo ]`;
}
