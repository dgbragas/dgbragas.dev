import * as React from 'react';

import DgLogoBase from '@/assets/icons/dg.svg?raw';
import DgLogoDark from '@/assets/icons/dg--dark.svg?raw';
import DgLogoLight from '@/assets/icons/dg--light.svg?raw';
import MenuLogo from '@/assets/icons/menu.svg?raw';
import { Container, Text } from '@/components/lib';
import { MenuOverlay } from './components';
import { useRealTimeClock } from '@/hooks';

import './TopMenu.styles.scss';

const Clock = () => {
  const currentTime = useRealTimeClock();
  return <Text className='top-menu__clock'>{currentTime} - SP, Brasil</Text>;
};

const TopMenu = () => {
  const menuRef = React.useRef<HTMLHeadElement>(null);

  const [menuStyle, setMenuStyle] = React.useState<'dark' | 'light'>('light');
  const [scrolled, setScrolled] = React.useState(false);

  const Logo = {
    dark: DgLogoDark,
    light: DgLogoLight,
    default: DgLogoBase,
  }[scrolled ? menuStyle : 'default'];

  const updateMenuColor = React.useCallback(() => {
    if (!menuRef.current) return;

    const sections = document.querySelectorAll('.styled-section');

    if (!sections.length) return;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const menuHeight = menuRef.current?.offsetHeight ?? 0;

      if (rect.top <= menuHeight && rect.bottom >= 0) {
        const theme = window
          .getComputedStyle(section)
          .getPropertyValue('--theme')
          .trim();

        if (theme === 'dark') {
          setMenuStyle('dark');
        } else {
          setMenuStyle('light');
        }
      }
    });
  }, []);

  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
    updateMenuColor();
  };

  React.useEffect(() => updateMenuColor(), []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`top-menu top-menu--${menuStyle} ${scrolled ? 'top-menu--scrolled' : ''}`}
      ref={menuRef}
    >
      <Container>
        <nav className='top-menu__nav'>
          <a aria-label='Retornar à página inicial' href='/'>
            <span dangerouslySetInnerHTML={{ __html: Logo }} />
          </a>

          {!scrolled && (
            <>
              <Clock />
              <span aria-hidden className='top-menu__nav__placeholder' />
            </>
          )}

          {scrolled && (
            <>
              <button className='top-menu__nav__cta'>
                <span aria-hidden />
                Disponível para novos projetos
              </button>

              <button aria-label='Abrir menu' className='top-menu__nav__toggle'>
                <span dangerouslySetInnerHTML={{ __html: MenuLogo }} />
              </button>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export { TopMenu };
