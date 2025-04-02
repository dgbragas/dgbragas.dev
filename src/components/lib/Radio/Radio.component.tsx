import { RadioGroup } from 'radix-ui';
import './Radio.styles.scss';

type RadioProps = {
  ariaLabel: string;
  defaultValue: string;
  values: Array<{
    id: string;
    label: string;
    value: string;
  }>;
};

const Radio = ({ ariaLabel, defaultValue, values }: RadioProps) => (
  <RadioGroup.Root
    aria-label={ariaLabel}
    className='radio'
    defaultValue={defaultValue}
  >
    {values.map(({ id, label, value }) => (
      <div className='radio__group' key={id}>
        <RadioGroup.Item className='radio__group__item' id={id} value={value}>
          <RadioGroup.Indicator className='radio__indicator' />
        </RadioGroup.Item>

        <label className='radio__group__label' htmlFor={id}>
          {label}
        </label>
      </div>
    ))}
  </RadioGroup.Root>
);

export { Radio };
