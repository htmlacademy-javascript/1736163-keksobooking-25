import {sendData} from './API.js';
import {showSubmitAlert} from './util.js';
const form = document.querySelector('.ad-form');   //window.onload = function () {} все было завернуто в онлоад
const typeField = form.querySelector('#type');
const avatarInput = form.querySelector('#avatar');
const imagesInput = form.querySelector('#images');
const preview = form.querySelector('.ad-form-header__preview');
const imagePlaceholder = preview.querySelector('img');
const submitButton = form.querySelector('.ad-form__submit');

let minPrice = 0;


avatarInput.addEventListener('change', (evt) => {//работает но размер фото...разобраться
  const [file] = evt.target.files;
  if (file) {
    imagePlaceholder.setAttribute('src', '');
    imagePlaceholder.src = URL.createObjectURL(file);
  }
});

imagesInput.addEventListener('change', (evt) => {
  const [file] = evt.target.files;
  if (file) {
    //вписать создание элемента img и аппенда его в форму
  }
});

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'error-text',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextTag: 'span'
});

typeField.addEventListener('change', minPriceThreshold);

function minPriceThreshold(evt) {
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
}

function validatePrice(value) {
  return value >= minPrice;
}

pristine.addValidator(form.querySelector('#price'), validatePrice, 'Цена ниже минимального значения');

const roomNumberField = form.querySelector('[name = "rooms"]');
const capacityField = form.querySelector('[name = "capacity"]');
const capacityOption = {
  '1':['1'],
  '2':['1', '2'],
  '3':['1', '2', '3'],
  '100':['0']
};

function validateCapacity() {
  return capacityOption[roomNumberField.value].includes(capacityField.value);
}

function getRoomNumberFieldErrorMessage(){
  return `Слишком много гостей для ${roomNumberField.value}
    ${roomNumberField.value === '1' ? 'комнаты' : 'комнат'}`;
}

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю данные...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();//пока убрал сеттинг начальной точки в инпуте
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


pristine.addValidator(roomNumberField,validateCapacity, getRoomNumberFieldErrorMessage);
pristine.addValidator(capacityField,validateCapacity, /*getCapacityErrorMessage*/);

export{form, setUserFormSubmit};

