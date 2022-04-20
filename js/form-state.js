const submitFormElement = document.querySelector('.ad-form');
const mapFiltersElement = document.querySelector('.map__filters');
const mapInteractiveModulesElements = mapFiltersElement.querySelectorAll('select');
const formInteractiveModulesElements = submitFormElement.querySelectorAll('fieldset');
const sliderElement = submitFormElement.querySelector('.ad-form__slider');
const mapCheckboxFieldElement = mapFiltersElement.querySelector('fieldset');

const disableMapForm = () => {
  mapFiltersElement.classList.add('map__filters--disabled');
  mapCheckboxFieldElement.setAttribute('disabled', 'disabled');
  mapInteractiveModulesElements.forEach((module) => {
    module.setAttribute('disabled', 'disabled');
  });
};

const disableSubmitForm = () => {
  submitFormElement.classList.add('ad-form--disabled');
  formInteractiveModulesElements.forEach((module) => {
    module.setAttribute('disabled', 'disabled');
  });
  sliderElement.removeAttribute('disabled');
};

const enableMapForm = () => {
  mapFiltersElement.classList.remove('map__filters--disabled');
  mapCheckboxFieldElement.removeAttribute('disabled');
  mapInteractiveModulesElements.forEach((module) => {
    module.removeAttribute('disabled');
  });
};

const enableSubmitForm = () => {
  submitFormElement.classList.remove('ad-form--disabled');
  formInteractiveModulesElements.forEach((module) => {
    module.removeAttribute('disabled');
  });
  sliderElement.removeAttribute('disabled');
};

export{enableMapForm, enableSubmitForm, disableSubmitForm, disableMapForm};

