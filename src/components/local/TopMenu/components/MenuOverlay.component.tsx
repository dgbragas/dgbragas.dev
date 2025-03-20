import BeIcon from '@/assets/icons/behance.svg?raw';
import DribbbleIcon from '@/assets/icons/dribbble.svg?raw';
import IgIcon from '@/assets/icons/instagram.svg?raw';
import InIcon from '@/assets/icons/linkedin.svg?raw';
import MailIcon from '@/assets/icons/mail.svg?raw';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg?raw';
import XIcon from '@/assets/icons/twitter.svg?raw';

import BrazilFlag from '@/assets/illustrations/brazil-flag.svg?raw';

import { Container, FeaturedIcon, Link, Text } from '@/components/lib';
import { mailTo } from '@/constants';
import { getCurrentYear } from '@/utils';

type MenuOverlayProps = {
  open: boolean;
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
    icon: XIcon,
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

const MenuOverlay = ({ open }: MenuOverlayProps) => {
  const year = getCurrentYear();

  return (
    <div aria-hidden={!open} className='top-menu__menu-overlay' role='dialog'>
      <Container>
        <button aria-hidden tabIndex={-1}>
          <span dangerouslySetInnerHTML={{ __html: BrazilFlag }} />
          pt-BR
        </button>

        <nav className='top-menu__menu-overlay__nav'>
          <Link href='/blog'>Blog</Link>
          <Link href='/about'>Sobre mim</Link>
          <Link href='/portfolio'>Portfólio</Link>

          <div className='top-menu__menu-overlay__nav__additional'>
            <Link href='/daily-ui'>DailyUI</Link>
            <Link href={mailTo}>Contate-me</Link>
            <Link href='https://dgbragas.dev#what'>O que eu faço</Link>
          </div>
        </nav>

        <footer className='top-menu__menu-overlay__footer'>
          <div className='top-menu__menu-overlay__footer__socials'>
            {socials.map(social => (
              <FeaturedIcon
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
