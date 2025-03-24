import DribbleIcon from '@/assets/icons/dribbble.svg?raw';
import InstagramIcon from '@/assets/icons/instagram.svg?raw';
import LinkedInIcon from '@/assets/icons/linkedin.svg?raw';
import WhatsAppIcon from '@/assets/icons/whatsapp.svg?raw';
import WhattIfIcon from '@/assets/icons/whatt-if.svg?raw';

import { socials } from '@/constants';
import { Container, Link, Text } from '@/components/lib';
import { getCurrentYear } from '@/utils';

import './Footer.styles.scss';

const Footer = () => {
  const year = getCurrentYear();

  return (
    <footer className='footer' aria-label='Rodapé' role='contentinfo'>
      <Container>
        <nav className='footer__nav' role='navigation'>
          <div className='footer__nav__block'>
            <Text element='h4' variant='label'>
              Acompanhe o meu trabalho
            </Text>
            <ul>
              <li>
                <Link
                  href={socials.dribbble}
                  icon={DribbleIcon}
                  variant='dribbble'
                >
                  Dribbble
                </Link>
              </li>
              <li>
                <Link
                  href={socials.instagram}
                  icon={InstagramIcon}
                  variant='instagram'
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href={socials.linkedIn}
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
                  href={socials.whatsApp}
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
                {/* <Text variant='small'>Em breve</Text> */}
              </li>
              <li>
                <Link href='/portfolio' target='_self'>
                  Portfólio
                </Link>
              </li>
              <li>
                <Link href='/about' target='_self'>
                  Sobre mim
                </Link>
              </li>
              <li>
                <Link href='/blog' target='_self'>
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className='footer__copy'>
          <div className='footer__copy__content'>
            <Text>© {year}. Todos os direitos reservados a dgbragas</Text>
            <div />
            <Text>
              Made from scratch by &#32;
              <Link href={socials.instagram}>@dgbragas</Link>
            </Text>
          </div>

          <div className='footer__copy__language'>
            <Text>
              Idioma: <span>Português</span>
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export { Footer };
