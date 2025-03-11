import { Tag, Text } from '@/components/lib';

import './CardPortfolio.styles.scss';

type CardPortfolioProps = {
  description: string;
  image: {
    alt: string;
    src: string;
  };
  labels: string[];
  variant?: 'extended' | 'overlay';
  title: string;
  url: {
    href: string;
    target: '_blank' | '_self';
  };
};

const CardPortfolio = ({
  description,
  image,
  labels,
  title,
  url,
  variant = 'overlay',
}: CardPortfolioProps) => (
  <a
    className={`card-portfolio card-portfolio--${variant}`}
    href={url.href}
    target={url.target}
  >
    <img src={image.src} alt={image.alt} />
    <article className='card-portfolio__container'>
      <div className='card-portfolio__labels'>
        {labels.map(label => (
          <Tag label={label} />
        ))}
      </div>
      <header className='card-portfolio__header'>
        <Text
          element='h3'
          variant={variant === 'extended' ? 'heading-4' : 'intro-highlight'}
        >
          {title}
        </Text>
      </header>
      <Text
        element='p'
        variant={variant === 'extended' ? 'extended-medium' : 'body'}
      >
        {description}
      </Text>
    </article>

    {variant === 'overlay' && <div className='card-portfolio__overlay' />}
  </a>
);

export { CardPortfolio };
