import * as React from 'react';

import './FeaturedIcon.styles.scss';

type FeaturedIconProps = {
  ariaLabel: string;
  href: string;
  icon: string;
  openInNewTab?: boolean;
  variant?: 'on-dark' | 'on-light';
};

const FeaturedIcon = ({
  ariaLabel,
  href,
  icon,
  openInNewTab = false,
  variant = 'on-light',
}: FeaturedIconProps) => (
  <a
    aria-label={ariaLabel}
    className={`featured-icon featured-icon--${variant}`}
    href={href}
    rel={openInNewTab ? 'noopener noreferrer' : undefined}
    target={openInNewTab ? '_blank' : undefined}
  >
    <span aria-hidden dangerouslySetInnerHTML={{ __html: icon }} />
  </a>
);

export { FeaturedIcon };
