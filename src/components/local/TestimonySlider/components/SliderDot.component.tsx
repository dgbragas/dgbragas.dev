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

export { TestimonySliderDot };
