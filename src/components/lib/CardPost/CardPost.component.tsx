import { Tag, Text } from '@/components/lib';

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
};

const CardPost = ({
  description,
  image,
  labels,
  publishedAt,
  readTime,
  title,
  url,
}: CardPostProps) => (
  <a className='card-post' href={url.href} target={url.target}>
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
          {readTime}min de leitura
        </Text>
      </footer>
    </article>
  </a>
);

export { CardPost };
