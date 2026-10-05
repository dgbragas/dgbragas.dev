import { useEffect, useState } from 'react';

import { Icon } from '@dgbragas/yalatus';

import { applyTheme, LIGHT_HOURS, onThemeChange, readTheme, type Theme } from '@/lib/theme';

import './ThemeDial.styles.scss';

export type ThemeDialProps = {
  /** Accessible name of the switch. */
  label: string;
  /** Accessible prefix of the current hour, read before the number. */
  hourLabel: string;
};

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

/**
 * Twenty-four hour rule under the footer: dark at the ends, light in the middle, with a knob on the current hour that switches the theme.
 */
export function ThemeDial({ hourLabel, label }: ThemeDialProps) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [hour, setHour] = useState(12);

  useEffect(() => {
    setTheme(readTheme());
    setHour(new Date().getHours());
    return onThemeChange(setTheme);
  }, []);

  return (
    <div className="site-theme-dial">
      <button
        aria-checked={theme === 'dark'}
        aria-label={label}
        className="site-theme-dial__knob"
        onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
        role="switch"
        style={{ '--site-dial-hour': hour } as React.CSSProperties}
        type="button"
      >
        <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
      </button>
      <span className="yl-sr-only">
        {hourLabel}: {hour}h
      </span>
      <ol aria-hidden className="site-theme-dial__ticks">
        {HOURS.map(tick => (
          <li
            className={`site-theme-dial__tick${tick >= LIGHT_HOURS.start && tick < LIGHT_HOURS.end ? ' site-theme-dial__tick--light' : ''}${tick === hour ? ' site-theme-dial__tick--current' : ''}`}
            key={tick}
          />
        ))}
      </ol>
    </div>
  );
}
