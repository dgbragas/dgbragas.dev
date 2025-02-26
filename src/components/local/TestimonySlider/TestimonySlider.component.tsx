import * as React from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import QuoteIcon from '@/assets/icons/quote.svg?raw';

import './TestimonySlider.styles.scss';

const TestimonySlider = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className='testimony-slider' ref={emblaRef}>
      <div className='testimony-slider__container'>
        <div className='testimony-slider__slide'>
          <span aria-hidden dangerouslySetInnerHTML={{ __html: QuoteIcon }} />
          <div className='testimony-slider__slide__content'>
            <h3>
              Gostei muito do novo portfólio, de verdade. Achei incrível o
              trabalho, gostei muito. Recomendo muito, ficou monstro!
            </h3>
            <span>Danilo</span>
            <small>Avaliação pós-entrega</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TestimonySlider };
