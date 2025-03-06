import { Text } from '@/components/lib';

import './MediaObject.styles.scss';

type MediaObjectTypes = {
  children?: React.ReactNode;
  contentAlign?: 'center' | 'left';
  heading?: {
    content: React.ReactNode;
    element?: 'h1' | 'h2' | 'h3' | 'h4';
    variant?: 'heading-1' | 'heading-2' | 'heading-3' | 'heading-4';
  };
  text: {
    content: React.ReactNode;
    element?: 'p' | 'span';
    variant?: 'extended-small' | 'extended-medium' | 'extended-large';
  };
};

const MediaObject = ({
  children,
  contentAlign,
  heading,
  text,
}: MediaObjectTypes) => {
  const { content: headingContent, ...headingProps } = {
    element: 'h1',
    variant: 'heading-1',
    ...heading,
  } as Required<NonNullable<MediaObjectTypes['heading']>>;

  const { content: textContent, ...textProps } = {
    element: 'p',
    variant: 'extended-medium',
    ...text,
  } as Required<MediaObjectTypes['text']>;

  return (
    <div className='media-object' style={{ justifyContent: contentAlign }}>
      {children && <span aria-hidden>{children}</span>}

      {headingContent && <Text {...headingProps}>{headingContent}</Text>}

      <Text {...textProps}>{textContent}</Text>
    </div>
  );
};

export { MediaObject };
