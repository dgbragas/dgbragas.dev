import * as React from 'react';
import type { UseEmblaCarouselType } from 'embla-carousel-react';

export type EmblaType = NonNullable<UseEmblaCarouselType[1]>;

const useSliderDot = (emblaAPI: EmblaType) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      if (!emblaAPI) return;
      emblaAPI.scrollTo(index);
    },
    [emblaAPI],
  );

  const onInit = React.useCallback((embla: EmblaType) => {
    setScrollSnaps(embla.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((embla: EmblaType) => {
    setCurrentIndex(embla.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!emblaAPI) return;

    onInit(emblaAPI);
    onSelect(emblaAPI);
    emblaAPI.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaAPI, onInit, onSelect]);

  return {
    currentIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export { useSliderDot };
