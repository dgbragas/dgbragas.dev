import * as React from 'react';
import './AnnouncementBar.styles.scss';
import { Container } from '../Container/Container.component';

type AnnouncementBarProps = {
  children?: React.ReactNode;
};

const AnnouncementBar = ({ children }: AnnouncementBarProps) => {
  const [open, setOpen] = React.useState(true);

  if (!open) return <></>;

  const handleClick = () => setOpen(false);

  return (
    <div
      className='announcement-bar'
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
