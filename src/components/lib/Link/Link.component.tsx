import { Text } from '@/components/lib';

import './Link.styles.scss';

type LinkProps = React.HTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
  href: string;
  icon?: string;
  target?: '_blank' | '_self';
  variant?: 'dribbble' | 'instagram' | 'linkedin' | 'whatt-if' | 'whatsapp';
};

const Link = ({
  children,
  href,
  icon,
  variant,
  target = '_blank',
}: LinkProps) => (
  <a
    className={`link ${variant ? `link--${variant}` : ''}`}
    href={href}
    target={target}
  >
    {icon && <span aria-hidden dangerouslySetInnerHTML={{ __html: icon }} />}
    <Text variant='label'>{children}</Text>
  </a>
);

export { Link };
