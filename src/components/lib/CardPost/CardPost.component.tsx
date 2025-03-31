import { breakpoints } from '@/constants';
import { Tag, Text } from '@/components/lib';
import { useBreakpoint } from '@/hooks';

import './CardPost.styles.scss';

type CardPostProps = {
  description: string;
  image: {
    alt: string;
    src: string;
  };
  labels: string[];
  publishedAt: string;
  readTime: number;
  title: string;
  url: {
    href: string;
    target: '_blank' | '_self';
  };
  variant?: 'boxed' | 'extended';
};

const CardPost = ({
  description,
  image,
  labels,
  publishedAt,
  readTime,
  title,
  url,
  variant: inheritedVariant = 'boxed',
}: CardPostProps) => {
  const currentBreakpoint = useBreakpoint({ initialWidth: breakpoints.medium });
  const variant =
    currentBreakpoint === 'medium' || currentBreakpoint === 'small'
      ? 'boxed'
      : inheritedVariant;

  return (
    <a
      className={`card-post card-post--${variant}`}
      href={url.href}
      target={url.target}
    >
      <img alt={image.alt} src={image.src} />
      <article className='card-post__article'>
        <div className='card-post__content'>
          <div className='card-post__labels'>
            {labels.map(label => (
              <Tag label={label} />
            ))}
          </div>

          <header>
            <Text element='h3' variant='heading-4'>
              {title}
            </Text>
          </header>

          <Text element='p' variant='extended-medium'>
            {description}
          </Text>
        </div>

        <footer className='card-post__footer'>
          <Text element='span' variant='label'>
            {publishedAt}
          </Text>
          <Text element='span' variant='label'>
            {readTime} min de leitura
          </Text>
        </footer>
      </article>
    </a>
  );
};

export { CardPost };
