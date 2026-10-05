import { useEffect, useRef, useState } from 'react';

import { Divider, Icon, IconButton, Logo } from '@dgbragas/yalatus';

import { sectionAtLine, sectionTheme } from '@/lib/sectionTheme';
import { applyTheme, onThemeChange, readTheme, type Theme } from '@/lib/theme';

import './Header.styles.scss';

export type HeaderProps = {
  /** Links of the main navigation in display order. */
  links: { href: string; label: string }[];
  /** Path of the home page for the mark. */
  homeHref: string;
  /** Path of the same page in the other locale. */
  languageHref: string;
  /** Pathname currently open, used to mark the active link. */
  currentPath: string;
  /** Accessible strings of the header. */
  labels: { home: string; main: string; yalatus: string; language: string; theme: string };
  /** Address of the design system the badge links to. */
  designSystemUrl: string;
};

/**
 * Floating glass navigation bar that follows the theme of the section under it and hosts the theme and language switches.
 */
export function Header({
  currentPath,
  designSystemUrl,
  homeHref,
  labels,
  languageHref,
  links,
}: HeaderProps) {
  const ref = useRef<HTMLElement>(null);
  const [theme, setTheme] = useState<Theme>('dark');
  const [surface, setSurface] = useState<Theme>('dark');

  useEffect(() => {
    setTheme(readTheme());
    return onThemeChange(setTheme);
  }, []);

  useEffect(() => {
    const update = () => {
      const line = (ref.current?.offsetTop ?? 0) + (ref.current?.offsetHeight ?? 0) / 2;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-theme-scope]'));
      const section = sectionAtLine(sections, line);
      setSurface(sectionTheme(theme, section?.dataset.themeScope));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    document.addEventListener('astro:page-load', update);
    return () => {
      window.removeEventListener('scroll', update);
      document.removeEventListener('astro:page-load', update);
    };
  }, [theme]);

  const inverse = surface !== theme;

  return (
    <header className={`site-header${inverse ? ' yl-theme-inverse' : ''}`} ref={ref}>
      <nav aria-label={labels.main} className="site-header__bar">
        <div className="site-header__brand">
          <a aria-label={labels.home} className="site-header__home" href={homeHref}>
            <Logo decorative className="site-header__logo" />
          </a>
          <Divider as="div" decorative orientation="vertical" />
          <a aria-label={labels.yalatus} className="site-header__badge" href={designSystemUrl}>
            <span aria-hidden>ツ</span>
          </a>
        </div>
        <div className="site-header__actions">
          <ul className="site-header__links">
            {links.map(link => (
              <li key={link.href}>
                <a
                  aria-current={currentPath === link.href ? 'page' : undefined}
                  className="site-header__link"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <Divider as="div" decorative orientation="vertical" />
          <div className="site-header__switches">
            <button
              aria-checked={theme === 'dark'}
              aria-label={labels.theme}
              className="site-header__switch"
              onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
              role="switch"
              type="button"
            >
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
            </button>
            <IconButton
              appearance="neutral"
              as="a"
              href={languageHref}
              icon="language"
              kind="ghost"
              label={labels.language}
            />
          </div>
        </div>
      </nav>
    </header>
  );
}
