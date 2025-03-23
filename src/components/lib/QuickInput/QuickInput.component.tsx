import { Button } from '@/components/lib';

import './QuickInput.styles.scss';

type QuickInputProps = {
  error?: boolean;
  id: string;
  label: string;
  searchText: string;
  onSearch: VoidFunction;
};

const QuickInput = ({
  id,
  label,
  onSearch,
  searchText,
  error = false,
}: QuickInputProps) => (
  <div className='quick-input'>
    <input
      aria-invalid={error}
      aria-labelledby={label}
      id={id}
      placeholder={label}
      type='text'
    />
    <Button onClick={onSearch}>{searchText}</Button>
  </div>
);

export { QuickInput };
