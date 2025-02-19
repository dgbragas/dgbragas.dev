import './Button.styles.scss';

type ButtonProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  label?: string;
};

const Button = ({ children, icon, label }: ButtonProps) => {
  const ariaLabel = !children && label ? label : undefined;

  return (
    <button aria-label={ariaLabel} className='button' type='button'>
      {icon && (
        <span aria-hidden className='button__icon'>
          {icon}
        </span>
      )}
      {children && <span>{children}</span>}
    </button>
  );
};

export { Button };
