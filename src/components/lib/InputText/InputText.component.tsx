import { Text } from '@/components/lib';
import './InputText.styles.scss';

type InputTextProps = {
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  error?: boolean;
  errorMessage?: string;
  id: string;
  label: string;
  required?: boolean;
  type?: 'number' | 'text';
};

const InputText = ({
  autoComplete,
  errorMessage,
  id,
  label,
  error = false,
  required = false,
  type = 'text',
}: InputTextProps) => (
  <div className='input-text__group'>
    <input
      autoComplete={autoComplete}
      aria-invalid={error}
      aria-labelledby={id}
      aria-required={required}
      className='input-text'
      id={id}
      placeholder=''
      required={required}
      type={type}
    />

    <label className='input-text__label' htmlFor={id} id={id}>
      {label}
    </label>

    {error && (
      <Text className='input-text__error' element='small' variant='small'>
        {errorMessage}
      </Text>
    )}
  </div>
);

export { InputText };
