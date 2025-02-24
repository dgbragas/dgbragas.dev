import './InputText.styles.scss';

type InputTextProps = {
  autoComplete?: React.HTMLInputAutoCompleteAttribute;
  id: string;
  type?: 'number' | 'text';
  required?: boolean;
};

const InputText = ({
  autoComplete,
  id,
  required = false,
  type = 'text',
}: InputTextProps) => (
  <div className='input-text__group'>
    <input
      aria-required={required}
      autoComplete={autoComplete}
      className='input-text'
      id={id}
      placeholder=''
      required={required}
      type={type}
    />
    <label className='input-text__label' htmlFor={id}>
      Label
    </label>
  </div>
);

export { InputText };
