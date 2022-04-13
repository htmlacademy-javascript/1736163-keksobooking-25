const submitForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapInteractiveModules = mapFilters.querySelectorAll('select');
const formInteractiveModules = submitForm.querySelectorAll('fieldset');
const sliderElement = submitForm.querySelector('.ad-form__slider');
const mapCheckboxField = mapFilters.querySelector('fieldset');

mapFilters.classList.add('map__filters--disabled');
mapCheckboxField.setAttribute('disabled', 'disabled');
mapInteractiveModules.forEach((module) => {
  module.setAttribute('disabled', 'disabled');
});

const disableSubmitForm = () => {
  submitForm.classList.add('ad-form--disabled');
  formInteractiveModules.forEach((module) => {
    module.setAttribute('disabled', 'disabled');
  });
  sliderElement.removeAttribute('disabled', 'disabled');
};

const enableMapForm = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapCheckboxField.removeAttribute('disabled', 'disabled');
  mapInteractiveModules.forEach((module) => {
    module.removeAttribute('disabled', 'disabled');
  });
};

const enableSubmitForm = () => {
  submitForm.classList.remove('ad-form--disabled');
  formInteractiveModules.forEach((module) => {
    module.removeAttribute('disabled', 'disabled');
  });
  sliderElement.removeAttribute('disabled', 'disabled');
};

export{enableMapForm, enableSubmitForm, disableSubmitForm};

