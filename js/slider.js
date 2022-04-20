const sliderElement = document.querySelector('.ad-form__slider');
const priceInputElement = document.querySelector('#price');
const SLIDER_START = 0;
const SLIDER_STEP = 1;
const SLIDER_RANGE_MIN = 0;
const SLIDER_RANGE_MAX = 100000;

// Отрисовка слайдера

noUiSlider.create(sliderElement, {
  range: {
    min: SLIDER_RANGE_MIN,
    max: SLIDER_RANGE_MAX,
  },
  start: SLIDER_START,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) => parseFloat(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceInputElement.value = sliderElement.noUiSlider.get();
});

priceInputElement.addEventListener('input', (evt) => {
  if (evt.target.value === '') {
    sliderElement.noUiSlider.set(SLIDER_START);
  }
  sliderElement.noUiSlider.set(evt.target.value);
});

export {sliderElement, SLIDER_START};
