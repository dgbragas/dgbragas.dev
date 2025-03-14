import DribbleIcon from '@/assets/icons/dribbble.svg?raw';
import InstagramIcon from '@/assets/icons/instagram.svg?raw';
import LinkedInIcon from '@/assets/icons/linkedin.svg?raw';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg?raw';
import WhattIfIcon from '@/assets/icons/whatt-if.svg?raw';

import { Link, Text } from '@/components/lib';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer' aria-label='Rodapé' role='contentinfo'>
      <nav className='footer__nav' role='navigation'>
        <div className='footer__nav__block'>
          <Text element='h4' variant='label'>
            Acompanhe o meu trabalho
          </Text>
          <ul>
            <li>
              <Link
                href='http://dribbble.com/dgbragas'
                icon={DribbleIcon}
                variant='dribbble'
              >
                Dribbble
              </Link>
            </li>
            <li>
              <Link
                href='http://instagram.com/dgbragas.dev'
                icon={InstagramIcon}
                variant='instagram'
              >
                Instagram
              </Link>
            </li>
            <li>
              <Link
                href='https://www.linkedin.com/in/dgbragas/'
                icon={LinkedInIcon}
                variant='linkedin'
              >
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>

        <div className='footer__nav__block'>
          <Text element='h4' variant='label'>
            Próxima parada
          </Text>
          <ul>
            <li>
              <Link
                href='https://github.com/whatt-if'
                icon={WhattIfIcon}
                variant='whatt-if'
              >
                whatt-if
              </Link>
            </li>
            <li>
              <Link
                href='https://wa.me/5511973447533'
                icon={WhatsAppIcon}
                variant='whatsapp'
              >
                WhatsApp
              </Link>
            </li>
            <li>
              <Link disabled href='#'>
                DS Library
              </Link>
              <Text variant='small'>Em breve</Text>
            </li>
            <li>
              <Link href='/portfolio'>Portfólio</Link>
            </li>
            <li>
              <Link href='/about'>Sobre mim</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className='footer__copy'>
        <div className='footer__copy__content'>
          <Text>© {currentYear}. Todos os direitos reservados a dgbragas</Text>
          <div />
          <Text>
            Made from scratch by &#32;
            <a href='https://instagram.com/dgbragas.dev' target='_blank'>
              @dgbragas
            </a>
          </Text>
        </div>

        <div className='footer__copy__language'>
          <Text>
            Idioma: <span>Português</span>
          </Text>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
