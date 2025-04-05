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
  variant?:
    | 'daily-ui'
    | 'dribbble'
    | 'instagram'
    | 'linkedIn'
    | 'whatt-if'
    | 'whatsApp';
};

const Link = ({
  children,
  className,
  disabled,
  href,
  icon,
  variant,
  target = '_blank',
  ...rest
}: LinkProps) => (
  <a
    {...rest}
    aria-disabled={disabled}
    tabIndex={disabled ? -1 : 0}
    className={`link ${className ?? ''} ${variant ? `link--${variant}` : ''}`}
    href={href}
    target={target}
  >
    {icon && (
      <span
        aria-hidden
        className='link__icon'
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    )}
    <Text variant='label'>{children}</Text>
  </a>
);

export { Link, type LinkProps };
