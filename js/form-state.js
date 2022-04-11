import {/*form*/} from './form.js';
import {/*mapFilters*/} from './reset.js';

const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const mapInteractiveModules = mapFilters.querySelectorAll('select');
const formInteractiveModules = form.querySelectorAll('fieldset');
const slider = form.querySelector('.ad-form__slider');
const mapCheckboxField = mapFilters.querySelector('fieldset');

const disableMapForm = () => {
  mapFilters.classList.add('map__filters--disabled');
  mapCheckboxField.setAttribute('disabled', 'disabled');
  mapInteractiveModules.forEach((module) => {
    module.setAttribute('disabled', 'disabled');
  });
};

function enableMapForm () {
  mapFilters.classList.remove('map__filters--disabled');
  mapCheckboxField.removeAttribute('disabled', 'disabled');
  mapInteractiveModules.forEach((module) => {
    module.removeAttribute('disabled', 'disabled');
  });
}

function enableForm() {
  form.classList.remove('ad-form--disabled');
  formInteractiveModules.forEach((module) => {
    module.removeAttribute('disabled', 'disabled');
  });
  slider.removeAttribute('disabled', 'disabled');
}

export{/*enableForm, disableForm*/};
