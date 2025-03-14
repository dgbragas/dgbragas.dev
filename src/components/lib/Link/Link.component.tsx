import { Text } from '@/components/lib';

import './Link.styles.scss';

type LinkProps = Omit<
  React.HTMLAttributes<HTMLAnchorElement>,
  'aria-disabled'
> & {
  children: React.ReactNode;
  disabled?: boolean;
  href: string;
  icon?: string;
  target?: '_blank' | '_self';
  variant?: 'dribbble' | 'instagram' | 'linkedin' | 'whatt-if' | 'whatsapp';
};

const Link = ({
  children,
  disabled,
  href,
  icon,
  variant,
  target = '_blank',
}: LinkProps) => (
  <a
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : 0}
    className={`link ${variant ? `link--${variant}` : ''}`}
    href={href}
    target={target}
  >
    {icon && <span aria-hidden dangerouslySetInnerHTML={{ __html: icon }} />}
    <Text variant='label'>{children}</Text>
  </a>
);

export { Link };
