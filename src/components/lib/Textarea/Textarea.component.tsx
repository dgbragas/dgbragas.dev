import DetailIcon from '@/assets/icons/detail.svg?raw';

import './Textarea.styles.scss';
import { Text } from '@/components/lib';

type TextareaProps = {
  description?: string;
  error?: boolean;
  errorMessage?: string;
  id: string;
  label: string;
  required?: boolean;
};

const Textarea = ({
  description,
  errorMessage,
  id,
  label,
  error = false,
  required = false,
}: TextareaProps) => (
  <div className='textarea__group'>
    <label className='textarea__label' htmlFor={id} id={id}>
      {label}
    </label>

    <textarea
      aria-invalid={error}
      aria-labelledby={id}
      className='textarea'
      id={id}
      placeholder={label}
      required={required}
    />

    {!error && description && (
      <div className='textarea__description'>
        <span dangerouslySetInnerHTML={{ __html: DetailIcon }} />
        <small>Hello World</small>
      </div>
    )}

    {error && (
      <Text className='textarea__error' element='small' variant='small'>
        {errorMessage}
      </Text>
    )}
  </div>
);

export { Textarea };
