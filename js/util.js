import {submitForm} from './form.js';
const ALERT_SHOW_TIME = 3000;
const successMessageTemplate = document.querySelector('#success').content;
const errorMessageTemplate = document.querySelector('#error').content;

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
  submitForm.appendChild(fetchFailMessage);
  setTimeout(() => {
    const loadedSuccsessMessage = document.querySelector('.success');
    loadedSuccsessMessage.remove();
  }, ALERT_SHOW_TIME);
};

const renderSubmitSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  submitForm.appendChild(successMessage);
  setTimeout(() => {
    const loadedSuccsessMessage = document.querySelector('.success');
    loadedSuccsessMessage.remove();
  }, ALERT_SHOW_TIME);
};

const renderSubmitErrorMessage = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  submitForm.appendChild(errorMessage);
  const loadedErrorMessage = document.querySelector('.error');
  const removeButton = loadedErrorMessage.querySelector('[type="button"]');
  removeButton.addEventListener('click', () => {
    loadedErrorMessage.remove();
  });
};

export {renderSubmitSuccessMessage, renderSubmitErrorMessage, renderFetchFailMessage, debounce};
