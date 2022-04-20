import {sendData} from './api.js';
import {renderSubmitErrorMessage} from './messages.js';
import {resetForm} from './reset.js';

const submitFormElement = document.querySelector('.ad-form');
const typeFieldElement = submitFormElement.querySelector('#type');
const submitButtonElement = submitFormElement.querySelector('.ad-form__submit');
const priceInputElement = submitFormElement.querySelector('#price');
const roomNumberSelectorElement = submitFormElement.querySelector('[name = "rooms"]');
const capacitySelectorElement = submitFormElement.querySelector('[name = "capacity"]');
const timeinSelectorElement = submitFormElement.querySelector('#timein');
const timeoutSelectorElement = submitFormElement.querySelector('#timeout');
const ALLOWED_MAX_PRICE = 100000;
let minPrice = 0;
const CapacityOption = {
  '1':['1'],
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100':['0']
};
const pristine = new Pristine(submitFormElement, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextTag: 'span'
});

resetForm();

// Валидация формы (Pristine)

const onMinPriceThreshold = (evt) => {
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
  priceInputElement.setAttribute('placeholder', `${minPrice}`) ;
};

typeFieldElement.addEventListener('change', onMinPriceThreshold);

const validatePrice = (value) => value >= minPrice;
const validateMaxPrice = (value) => value < ALLOWED_MAX_PRICE;

const validateCapacity = () => CapacityOption[roomNumberSelectorElement.value].includes(capacitySelectorElement.value);

const getRoomNumberFieldErrorMessage = () => `Слишком много гостей для ${roomNumberSelectorElement.value}
    ${roomNumberSelectorElement.value === '1' ? 'комнаты' : 'комнат'}`;

pristine.addValidator(priceInputElement, validateMaxPrice, 'Цена не выше 100000');
pristine.addValidator(priceInputElement, validatePrice, 'Цена ниже минимального значения');
pristine.addValidator(roomNumberSelectorElement,validateCapacity, getRoomNumberFieldErrorMessage);
pristine.addValidator(capacitySelectorElement,validateCapacity);

submitFormElement.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

// Синхронизация выбора заезда и выезда

timeinSelectorElement.addEventListener('change', (evt) => {
  timeoutSelectorElement.value = evt.target.value;
});

timeoutSelectorElement.addEventListener('change', (evt) => {
  timeinSelectorElement.value = evt.target.value;
});

// Блокировка кнопок при отправке

const blockSubmitButton = () => {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Отправляю данные...';
};

const unblockSubmitButton = () => {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
};

// Отправка формы

const setUserFormSubmit = (onSuccess) => {
  submitFormElement.addEventListener('submit', (evt) => {
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


export{submitFormElement, setUserFormSubmit, priceInputElement};

