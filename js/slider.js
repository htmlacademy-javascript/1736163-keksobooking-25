// <div class="ad-form__slider"></div>
/* global noUiSlider:readonly */
const sliderElement = document.querySelector('.ad-form__slider');
const valueElement = document.querySelector('#price');


noUiSlider.create(sliderElement, {
  range: {
    min: Number(valueElement.min),
    max: Number(valueElement.max),
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

//sliderElement.setAttribute('disabled', true);

sliderElement.noUiSlider.on('update', () => {
  valueElement.value = sliderElement.noUiSlider.get();
});

export {};
