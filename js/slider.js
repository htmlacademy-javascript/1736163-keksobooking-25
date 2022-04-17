const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
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
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', () => {
  priceInput.value = sliderElement.noUiSlider.get();
});

priceInput.addEventListener('input', (evt) => {
  if (evt.target.value === '') {
    sliderElement.noUiSlider.set(SLIDER_START);
  }
  sliderElement.noUiSlider.set(evt.target.value);
});

export {sliderElement, SLIDER_START};
