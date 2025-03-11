import * as React from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import QuoteIcon from '@/assets/icons/quote.svg?raw';

import { useSliderDot, type EmblaType } from './TestimonySlider.hook';
import { TestimonySliderDot } from './components';
import './TestimonySlider.styles.scss';

type TestimonySlider = {
  testimonies: Array<{
    content: string;
    author: string;
    description: string;
  }>;
};

const TestimonySlider = ({ testimonies }: TestimonySlider) => {
  const [emblaRef, emblaAPI] = useEmblaCarousel();
  const { currentIndex, onDotButtonClick, scrollSnaps } = useSliderDot(
    emblaAPI as EmblaType,
  );

  return (
    <div className='testimony-slider' ref={emblaRef}>
      <div className='testimony-slider__container'>
        {testimonies.map(({ author, content, description }) => (
          <div className='testimony-slider__slide'>
            <span aria-hidden dangerouslySetInnerHTML={{ __html: QuoteIcon }} />

            <div className='testimony-slider__slide__content'>
              <h3>{content}</h3>
              <span>{author}</span>
              <small>{description}</small>
            </div>
          </div>
        ))}
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
