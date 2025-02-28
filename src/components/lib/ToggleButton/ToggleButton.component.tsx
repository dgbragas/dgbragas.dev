import { Toggle } from 'radix-ui';

import './ToggleButton.styles.scss';

type ToggleButtonProps = {
  ariaLabel: string;
  children: React.ReactNode;
  variant?: 'expanded' | 'compact';
};

const ToggleButton = ({
  ariaLabel,
  children,
  variant = 'compact',
}: ToggleButtonProps) => (
  <Toggle.Root
    aria-label={ariaLabel}
    className={`toggle-button toggle-button--${variant}`}
  >
    {children}
  </Toggle.Root>
);

export { ToggleButton };
