const ALERT_SHOW_TIME = 3000;

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

const submitForm = document.querySelector('.ad-form__element--submit');
const showSubmitAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'static';
  alertContainer.style.left = 0;
  alertContainer.style.top = 100;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'black';
  alertContainer.style.borderRadius = '100';
  alertContainer.style.color = '#ffaa99';
  alertContainer.style.flex = '1';
  alertContainer.textContent = message;

  submitForm.after(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const showLoadAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'black';
  alertContainer.style.borderRadius = '100';
  alertContainer.style.color = '#ffaa99';
  alertContainer.style.flex = '1';
  alertContainer.textContent = message;

  submitForm.after(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export{/*getRandomNumberInclusive, getRandomPositiveInteger,getRandomNumber, getRandomArrayElement*/showSubmitAlert, showLoadAlert, debounce};
