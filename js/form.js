import {sendData} from './API.js';
import {showSubmitAlert} from './util.js';

const form = document.querySelector('.ad-form');
const typeField = form.querySelector('#type');
const submitButton = form.querySelector('.ad-form__submit');
const priceInput = form.querySelector('#price');
const roomNumberField = form.querySelector('[name = "rooms"]');
const capacityField = form.querySelector('[name = "capacity"]');
const capacityOption = {
  '1':['1'],
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100':['0']
};
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextTag: 'span'
});
const timeinSelector = form.querySelector('#timein');
const timeoutSelector = form.querySelector('#timeout');
let minPrice = 0;

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

const validateCapacity = () => capacityOption[roomNumberField.value].includes(capacityField.value);

const getRoomNumberFieldErrorMessage = () => `Слишком много гостей для ${roomNumberField.value}
    ${roomNumberField.value === '1' ? 'комнаты' : 'комнат'}`;

pristine.addValidator(priceInput, validatePrice, 'Цена ниже минимального значения');
pristine.addValidator(roomNumberField,validateCapacity, getRoomNumberFieldErrorMessage);
pristine.addValidator(capacityField,validateCapacity, /*getCapacityErrorMessage*/);

form.addEventListener('submit', (evt) => {
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
  form.addEventListener('submit', (evt) => {
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
          showSubmitAlert('Не удалось отправить форму. Попробуйте ещё раз');// в утиле доработать
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export{form, setUserFormSubmit, priceInput};

