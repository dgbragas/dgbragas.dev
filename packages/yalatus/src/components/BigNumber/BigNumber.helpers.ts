/**
 * Formats a number for display with a fixed number of decimals in the given locale.
 * @param value - Number to format
 * @param decimals - Decimal places kept, applied as both minimum and maximum
 * @param locale - BCP 47 locale that defines separators
 * @returns The formatted string
 * @example
 * formatNumber(1234.5, 1, 'pt-BR') // '1.234,5'
 */
export function formatNumber(value: number, decimals: number, locale: string): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}
