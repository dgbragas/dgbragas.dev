import { Tag, Text } from '@/components/lib';

import './CardUI.styles.scss';

type CardUIProps = {
  description: string;
  image: {
    alt: string;
    src: string;
  };
  labels: string[];
  title: string;
  url: string;
};

const CardUI = ({ description, image, labels, title, url }: CardUIProps) => (
  <a className='card-ui' href={url} target='_blank'>
    <article className='card-ui__article'>
      <img alt={image.alt} src={image.src} />

      <div className='card-ui__content'>
        <div className='card-ui__content__labels'>
          {labels.map(label => (
            <Tag label={label} />
          ))}
        </div>

        <div className='card-ui__content__presentation'>
          <header>
            <Text element='h2' variant='intro-highlight'>
              {title}
            </Text>
          </header>

          <Text element='p'>{description}</Text>
        </div>
      </div>
    </article>
  </a>
);

export { CardUI };
