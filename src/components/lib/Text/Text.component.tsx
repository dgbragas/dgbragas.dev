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
  children: React.ReactNode;
  element: Headings | Bodies;
  variant: Variants;
};

const Text = ({ children, element = 'span', variant = 'body' }: TextProps) => {
  const DOMElement = element;
  return (
    <DOMElement className={`text text--${variant}`}>{children}</DOMElement>
  );
};

export { Text };
