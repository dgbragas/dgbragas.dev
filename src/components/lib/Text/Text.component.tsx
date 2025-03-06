import './Text.styles.scss';

type Headings = 'h1' | 'h2' | 'h3' | 'h4';
type Bodies = 'span' | 'small' | 'p';
type Variants =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'reviews'
  | 'intro'
  | 'intro-highlight'
  | 'blog'
  | 'extended-large'
  | 'extended-medium'
  | 'extended-small'
  | 'body'
  | 'label'
  | 'small'
  | 'caption';

type TextProps = {
  className?: string;
  children: React.ReactNode;
  element?: Headings | Bodies;
  variant?: Variants;
};

const Text = ({
  className,
  children,
  element = 'span',
  variant = 'body',
}: TextProps) => {
  const DOMElement = element;
  return (
    <DOMElement className={`text text--${variant} ${className ?? ''}`.trim()}>
      {children}
    </DOMElement>
  );
};

export { Text };
