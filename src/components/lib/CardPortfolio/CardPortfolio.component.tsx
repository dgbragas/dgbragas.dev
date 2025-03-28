import { Tag, Text } from '@/components/lib';

import './CardPortfolio.styles.scss';

type CardPortfolioProps = React.HTMLAttributes<HTMLAnchorElement> & {
  className?: string;
  description: string;
  image: {
    alt: string;
    caption: string;
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
  className,
  description,
  image,
  labels,
  title,
  url,
  variant = 'overlay',
  ...rest
}: CardPortfolioProps) => (
  <a
    {...rest}
    className={`card-portfolio card-portfolio--${variant} ${className ?? ''}`.trim()}
    href={url.href}
    target={url.target}
    rel={url.target === '_blank' ? 'noopener noreferrer' : undefined}
  >
    <img alt={image.alt} aria-describedby='described-img' src={image.src} />
    <Text className='sr-only' element='p' id='described-img'>
      {image.caption}
    </Text>

    <article className='card-portfolio__container'>
      <div className='card-portfolio__labels'>
        {labels.map(label => (
          <Tag label={label} />
        ))}
      </div>

      <header className='card-portfolio__header'>
        <Text
          element='h2'
          variant={variant === 'extended' ? 'heading-4' : 'intro-highlight'}
        >
          {title}
        </Text>
      </header>

      <Text
        element='p'
        variant={variant === 'extended' ? 'extended-medium' : 'extended-small'}
      >
        {description}
      </Text>
    </article>

    {variant === 'overlay' && <div className='card-portfolio__overlay' />}
  </a>
);

export { CardPortfolio };
