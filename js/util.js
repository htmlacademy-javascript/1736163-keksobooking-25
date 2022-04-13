import {form} from './form.js';
const ALERT_SHOW_TIME = 3000;
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

// function getRandomNumberInclusive(min, max, decimal) {

//   return (Math.random() * (max - min) + min).toFixed(decimal);
// }

// function getRandomPositiveInteger (a, b) {
//   const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
//   const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// }

// function getRandomNumber(from, to) {
//   return Math.floor(Math.random() * (to - from + 1)) + from;
// }

// function getRandomArrayElement (elements) {
//   return elements[getRandomPositiveInteger(0, elements.length - 1)];
// }

// Дебаунс

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Всплывающий месседж об ошибке получения и отправки данных

const renderFetchFailMessage = () => {
  const fetchFailMessage = successMessageTemplate.cloneNode(true);
  const messageTextField = fetchFailMessage.querySelector('.success__message');
  messageTextField.textContent = 'Ошибка загрузки, попробуйте снова позже!';
  form.appendChild(fetchFailMessage);
  setTimeout(() => {
    const loadedSuccsessMessage = document.querySelector('.success');
    loadedSuccsessMessage.remove();
  }, ALERT_SHOW_TIME);
};

const renderSubmitSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  form.appendChild(successMessage);
  setTimeout(() => {
    const loadedSuccsessMessage = document.querySelector('.success');
    loadedSuccsessMessage.remove();
  }, ALERT_SHOW_TIME);
};

const renderSubmitErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  form.appendChild(errorMessage);
  const loadedErrorMessage = document.querySelector('.error');
  const removeButton = loadedErrorMessage.querySelector('[type="button"]');
  removeButton.addEventListener('click', () => {
    loadedErrorMessage.remove();
  });
};

export{renderSubmitSuccessMessage, renderSubmitErrorMessage,renderFetchFailMessage, debounce};
