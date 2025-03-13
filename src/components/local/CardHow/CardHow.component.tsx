import StarIcon from '@/assets/icons/star.svg?raw';
import { Text } from '@/components/lib';

import './CardHow.styles.scss';

type CardHowProps = {
  count?: number;
  description: string;
  icon: string;
  variant?: 'default' | 'featured';
  title: string;
};

const CardHow = ({
  count,
  description,
  icon,
  title,
  variant = 'default',
}: CardHowProps) => (
  <div className={`card-how card-how--${variant}`}>
    <div className='card-how__count'>
      {count && <Text className='card-how__count__counter'>{count}</Text>}
      {!count && (
        <span
          aria-hidden
          className='card-how__count__counter'
          dangerouslySetInnerHTML={{ __html: StarIcon }}
        />
      )}
    </div>

    <span aria-hidden dangerouslySetInnerHTML={{ __html: icon }} />
    <div className='card-how__content'>
      <header>
        <Text element='h4' variant='heading-4'>
          {title}
        </Text>
      </header>

      <Text element='p' variant='extended-small'>
        {description}
      </Text>
    </div>
  </div>
);

export { CardHow };
