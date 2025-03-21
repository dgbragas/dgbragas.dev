import * as React from 'react';

import BeIcon from '@/assets/icons/behance.svg?raw';
import DribbbleIcon from '@/assets/icons/dribbble.svg?raw';
import IgIcon from '@/assets/icons/instagram.svg?raw';
import InIcon from '@/assets/icons/linkedin.svg?raw';
import MailIcon from '@/assets/icons/mail.svg?raw';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg?raw';
import TwitterIcon from '@/assets/icons/twitter.svg?raw';
import BrazilFlag from '@/assets/illustrations/brazil-flag.svg?raw';
import { Container, FeaturedIcon, Link, Text } from '@/components/lib';
import { mailTo } from '@/constants';
import { getCurrentYear } from '@/utils';

type MenuOverlayProps = {
  open: boolean;
  onToggle: VoidFunction;
};

const socials = [
  {
    href: 'https://www.instagram.com/dgbragas.dev',
    icon: IgIcon,
    label: 'Acessar o Instagram de @dgbragas',
  },
  {
    href: 'https://www.linkedin/in/dgbragas',
    icon: InIcon,
    label: 'Acessar o LinkedIn de @dgbragas',
  },
  {
    href: 'https://www.dribbble.com/dgbragas',
    icon: DribbbleIcon,
    label: 'Visualizar portfólio de @dgbragas no Dribbble',
  },
  {
    href: 'https://www.behance.net/dgbragas',
    icon: BeIcon,
    label: 'Visualizar portfólio de @dgbragas no Behance ',
  },
  {
    href: 'http://www.twitter.com/dgbragas',
    icon: TwitterIcon,
    label: 'Acessar o X de @dgbragas',
  },
  {
    href: 'https://wa.me/5511973447533',
    icon: WhatsAppIcon,
    label: 'Enviar mensagem WhatsApp para +5511973447533',
  },
  {
    href: mailTo,
    icon: MailIcon,
    label: 'Enviar e-mail para work@dgbragas.com',
  },
];

const MenuOverlay = ({ onToggle, open }: MenuOverlayProps) => {
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const toggleButtonRef = React.useRef<HTMLButtonElement>(null);

  const year = getCurrentYear();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!overlayRef.current) return;

    if (event.key === 'Escape') {
      onToggle();
    }

    const focusableElements = overlayRef.current.querySelectorAll('a, button');
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    if (event.key === 'Tab') {
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  };

  React.useEffect(() => {
    if (open && toggleButtonRef.current) {
      toggleButtonRef.current.focus();
    }
  }, [open]);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      aria-labelledby='Menu secundário'
      className='top-menu__overlay'
      id='top-menu__overlay'
      ref={overlayRef}
      role='dialog'
    >
      <button
        aria-expanded={open}
        aria-label='Fechar menu'
        className='top-menu__overlay__close'
        onClick={onToggle}
        ref={toggleButtonRef}
      >
        <Text variant='heading-3'>&#88;</Text>
      </button>

      <Text className='sr-only'>Menu secundário</Text>

      <Container>
        <button
          aria-hidden
          className='top-menu__overlay__language'
          tabIndex={-1}
        >
          <span dangerouslySetInnerHTML={{ __html: BrazilFlag }} />
          pt-BR
        </button>

        <nav className='top-menu__overlay__nav'>
          <Link href='/blog'>Blog</Link>
          <Link href='/about'>Sobre mim</Link>
          <Link href='/portfolio'>Portfólio</Link>

          <div className='top-menu__overlay__nav__additional'>
            <Link href='/daily-ui'>DailyUI</Link>
            <Link href={mailTo}>Contate-me</Link>
            <Link href='https://dgbragas.dev#what'>O que eu faço</Link>
          </div>
        </nav>

        <footer className='top-menu__overlay__footer'>
          <div className='top-menu__overlay__footer__socials'>
            {socials.map(social => (
              <FeaturedIcon
                key={social.label}
                ariaLabel={social.label}
                href={social.href}
                icon={social.icon}
                openInNewTab
                variant='on-dark'
              />
            ))}
          </div>

          <Text variant='small'>
            © Copyright {year}. Todos os direitos reservados a dgbragas
          </Text>
        </footer>
      </Container>
    </div>
  );
};

export { MenuOverlay };
