import * as React from 'react';

import { Container } from '@/components/lib';

import './AnnouncementBar.styles.scss';

type AnnouncementBarProps = {
  children?: React.ReactNode;
  unfixed?: boolean;
};

const AnnouncementBar = ({
  children,
  unfixed = false,
}: AnnouncementBarProps) => {
  const [open, setOpen] = React.useState(true);

  if (!open) return <></>;

  const handleClick = () => setOpen(false);

  return (
    <div
      className={`announcement-bar ${!unfixed ? 'announcement-bar--fixed' : ''}`.trim()}
      aria-label='Anúncio'
      aria-live='polite'
      role='region'
    >
      <Container>
        <div className='announcement-bar__content'>
          <p>{children}</p>
          <button aria-label='Fechar anúncio' onClick={handleClick}>
            &times;
          </button>
        </div>
      </Container>
    </div>
  );
};

export { AnnouncementBar };
