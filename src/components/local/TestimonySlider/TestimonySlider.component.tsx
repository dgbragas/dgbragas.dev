import * as React from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import QuoteIcon from '@/assets/icons/quote.svg?raw';

import './TestimonySlider.styles.scss';
import { useSliderDot, type EmblaType } from './TestimonySlider.hook';

type TestimonySliderDot = {
  onClick: VoidFunction;
  selected: boolean;
};

const TestimonySliderDot = ({ onClick, selected }: TestimonySliderDot) => (
  <button
    className={
      selected
        ? `testimony-slider__navigation__dot--selected`
        : `testimony-slider__navigation__dot`
    }
    onClick={onClick}
    type='button'
  />
);

const TestimonySlider = () => {
  const [emblaRef, emblaAPI] = useEmblaCarousel();
  const { currentIndex, onDotButtonClick, scrollSnaps } = useSliderDot(
    emblaAPI as EmblaType,
  );

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

      <div className='testimony-slider__navigation'>
        {scrollSnaps.map((_, index) => (
          <TestimonySliderDot
            key={index}
            selected={currentIndex === index}
            onClick={() => onDotButtonClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export { TestimonySlider };
