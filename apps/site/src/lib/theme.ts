export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_EVENT = 'site:theme';
export const LIGHT_HOURS = { start: 6, end: 18 } as const;

/**
 * Tells which theme the hour of the day asks for: light between 6h and 18h, dark otherwise.
 * @param hour - Hour of the day from 0 to 23
 * @returns The theme for that hour
 * @example
 * themeForHour(9) // 'light'
 */
export function themeForHour(hour: number): Theme {
  return hour >= LIGHT_HOURS.start && hour < LIGHT_HOURS.end ? 'light' : 'dark';
}

/**
 * Picks the theme to apply: the stored choice when valid, otherwise the one the hour asks for.
 * @param stored - Value read from storage, possibly null or garbage
 * @param hour - Hour of the day from 0 to 23
 * @returns The theme to apply
 * @example
 * resolveTheme('dark', 9) // 'dark'
 * resolveTheme(null, 9) // 'light'
 */
export function resolveTheme(stored: string | null | undefined, hour: number): Theme {
  return stored === 'light' || stored === 'dark' ? stored : themeForHour(hour);
}

/**
 * Reads the theme currently applied to the document.
 * @returns The theme on the root element; `dark` when none is set
 */
export function readTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/**
 * Applies a theme to the document, remembers it and tells the islands that listen for changes.
 * @param theme - Theme to apply
 */
export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked by the browser; the theme still applies for this page
  }
  document.dispatchEvent(new CustomEvent<Theme>(THEME_EVENT, { detail: theme }));
}

/**
 * Subscribes to theme changes made through `applyTheme`.
 * @param listener - Called with the new theme
 * @returns A function that removes the subscription
 */
export function onThemeChange(listener: (theme: Theme) => void): () => void {
  const handler = (event: Event) => listener((event as CustomEvent<Theme>).detail);
  document.addEventListener(THEME_EVENT, handler);
  return () => document.removeEventListener(THEME_EVENT, handler);
}
