import * as React from 'react';

import { Text } from '@/components/lib';
import './Tag.styles.scss';

type TagTypes = {
  label: string;
  onRemove?: VoidFunction;
  variant?: 'filled' | 'outline';
  size?: 'small' | 'medium';
};

const Tag = ({
  label,
  onRemove,
  size = 'small',
  variant = 'outline',
}: TagTypes) => {
  const [visible, setVisible] = React.useState(true);

  const handleRemove = React.useCallback(() => {
    if (onRemove) {
      onRemove();
    }

    setVisible(false);
  }, [onRemove]);

  if (!visible) return <></>;

  return (
    <span
      aria-label={`Tag: ${label}`}
      className={`tag tag--${size} tag--${variant}`}
      role='group'
    >
      <Text className='tag__label' element='span' variant='small'>
        {label}
      </Text>
      {onRemove && (
        <button
          aria-label={`Remove: ${label} Tag`}
          className='tag__remove'
          onClick={handleRemove}
          type='button'
        >
          &times;
        </button>
      )}
    </span>
  );
};

export { Tag };
