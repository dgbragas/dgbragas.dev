import { Toggle } from 'radix-ui';

import './ToggleButton.styles.scss';

type ToggleButtonProps = {
  variant?: 'expanded' | 'compact';
};

const ToggleButton = ({ variant = 'compact' }: ToggleButtonProps) => {
  return (
    <Toggle.Root
      aria-label='Toggle'
      className={`toggle-button toggle-button--${variant}`}
    >
      Hii
    </Toggle.Root>
  );
};

export { ToggleButton };
