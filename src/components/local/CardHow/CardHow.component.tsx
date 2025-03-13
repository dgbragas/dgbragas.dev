import { Text } from '@/components/lib';

import './CardHow.styles.scss';

type CardHowProps = {
  description: string;
  icon: string;
  title: string;
};

const CardHow = ({ description, icon, title }: CardHowProps) => (
  <div className='card-how'>
    <span dangerouslySetInnerHTML={{ __html: icon }} />
    <div className='card-how__content'>
      <header>
        <Text element='h3' variant='heading-4'>
          {title}
        </Text>
      </header>
      <Text element='p' variant='extended-medium'>
        {description}
      </Text>
    </div>
  </div>
);

export { CardHow };
