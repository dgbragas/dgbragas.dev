import * as React from 'react';
import './Container.styles.scss';
import { useBreakpoint } from '@/hooks';

type ContainerProps = {
  children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  const breakpoint = useBreakpoint();

  return <div className={`container container--${breakpoint}`}>{children}</div>;
};

export { Container };
