import {sendData} from './api.js';
import {renderSubmitErrorMessage} from './util.js';
import {resetForm} from './reset.js';

const submitForm = document.querySelector('.ad-form');
const typeField = submitForm.querySelector('#type');
const submitButton = submitForm.querySelector('.ad-form__submit');
const priceInput = submitForm.querySelector('#price');
const roomNumberSelector = submitForm.querySelector('[name = "rooms"]');
const capacitySelector = submitForm.querySelector('[name = "capacity"]');
const timeinSelector = submitForm.querySelector('#timein');
const timeoutSelector = submitForm.querySelector('#timeout');
const ALLOWED_MAX_PRICE = 100000;
let minPrice = 0;
const CapacityOption = {
  '1':['1'],
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100':['0']
};
const pristine = new Pristine(submitForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextTag: 'span'
});

resetForm();

// Валидация формы (Pristine)

const minPriceThreshold = (evt) => {
  switch (evt.target.value) {
    case 'bungalow':
      minPrice = 0;
      break;
    case 'flat':
      minPrice = 1000;
      break;
    case 'hotel':
      minPrice = 3000;
      break;
    case 'house':
      minPrice = 5000;
      break;
    case 'palace':
      minPrice = 10000;
      break;
  }
  priceInput.setAttribute('placeholder', `${minPrice}`) ;
};

typeField.addEventListener('change', minPriceThreshold);

const validatePrice = (value) => value >= minPrice;
const validateMaxPrice = (value) => value < ALLOWED_MAX_PRICE;

const validateCapacity = () => CapacityOption[roomNumberSelector.value].includes(capacitySelector.value);

const getRoomNumberFieldErrorMessage = () => `Слишком много гостей для ${roomNumberSelector.value}
    ${roomNumberSelector.value === '1' ? 'комнаты' : 'комнат'}`;

pristine.addValidator(priceInput, validateMaxPrice, 'Цена не выше 100000');
pristine.addValidator(priceInput, validatePrice, 'Цена ниже минимального значения');
pristine.addValidator(roomNumberSelector,validateCapacity, getRoomNumberFieldErrorMessage);
pristine.addValidator(capacitySelector,validateCapacity);

submitForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

// Синхронизация выбора заезда и выезда

timeinSelector.addEventListener('change', (evt) => {
  timeoutSelector.value = evt.target.value;
});

timeoutSelector.addEventListener('change', (evt) => {
  timeinSelector.value = evt.target.value;
});

// Блокировка кнопок при отправке

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю данные...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

// Отправка формы

const setUserFormSubmit = (onSuccess) => {
  submitForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          renderSubmitErrorMessage();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};


export{submitForm, setUserFormSubmit, priceInput};

