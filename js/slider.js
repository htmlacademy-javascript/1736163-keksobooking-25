const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 1,
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
    sliderElement.noUiSlider.set(0);
  }
  sliderElement.noUiSlider.set(evt.target.value);
});

export {sliderElement};
