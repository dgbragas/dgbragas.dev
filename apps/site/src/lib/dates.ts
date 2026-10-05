import type { Locale } from './i18n';

/**
 * Formats a date the way the cards show it: day, short month and year, such as `27 jul 2026`.
 * @param date - Date to format
 * @param locale - Locale that defines the month names
 * @returns The formatted date without punctuation
 * @example
 * formatDate(new Date('2026-07-27'), 'pt-BR') // '27 jul 2026'
 */
export function formatDate(date: Date, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
    .format(date)
    .replace(/\./g, '')
    .replace(/ de /g, ' ');
}
