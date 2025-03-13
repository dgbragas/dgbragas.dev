import StarIcon from '@/assets/icons/star.svg?raw';
import { Text } from '@/components/lib';

import './CardWorkflow.styles.scss';

type CardWorkflowProps = {
  count?: number;
  description: string;
  icon: string;
  variant?: 'default' | 'featured';
  title: string;
};

const CardWorkflow = ({
  count,
  description,
  icon,
  title,
  variant = 'default',
}: CardWorkflowProps) => (
  <div className={`card-workflow card-workflow--${variant}`}>
    <div className='card-workflow__count'>
      {count && <Text className='card-workflow__count__counter'>{count}</Text>}
      {!count && (
        <span
          aria-hidden
          className='card-workflow__count__counter'
          dangerouslySetInnerHTML={{ __html: StarIcon }}
        />
      )}
    </div>

    <span aria-hidden dangerouslySetInnerHTML={{ __html: icon }} />
    <div className='card-workflow__content'>
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

export { CardWorkflow };
