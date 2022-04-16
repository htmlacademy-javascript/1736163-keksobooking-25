import {} from './form.js';
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

// Сообщение об ошибке

const  isEscapeKey = (evt) => evt.key === 'Escape';

const onErrorMessageEscKeydown = ((evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const errorMessage = document.querySelector('.error');
    errorMessage.remove();
    removeErrorMessageListeners();
  }
});

const onErrorMessageClick = ((evt) => {
  evt.preventDefault();
  const errorMessage = document.querySelector('.error');
  errorMessage.remove();
  removeErrorMessageListeners();
});

const removeErrorMessageListeners = () => {
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageClick);
};

const renderFetchFailMessage = () => {
  const fetchFailMessage = errorMessageTemplate.cloneNode(true);
  const failMessageText = fetchFailMessage.querySelector('.error__message');
  failMessageText.textContent = 'Ошибка загрузки данных с сервера, вы все еще можете разместить анкету!';
  document.body.appendChild(fetchFailMessage);
  const errorMessage = document.querySelector('.error');
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClick);
  const removeButton = errorMessage.querySelector('[type="button"]');
  removeButton.textContent = 'Заполнить анкету';
  removeButton.addEventListener('click', () => {
    errorMessage.remove();
    removeErrorMessageListeners();
  });
};

const renderInitFailMessage = () => {
  const fetchFailMessage = errorMessageTemplate.cloneNode(true);
  const failMessageText = fetchFailMessage.querySelector('.error__message');
  failMessageText.textContent = 'Ошибка загрузки карты, попробуйте зайти позже, либо попробуйте снова!';
  document.body.appendChild(fetchFailMessage);
  const errorMessage = document.querySelector('.error');
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClick);
  const removeButton = errorMessage.querySelector('[type="button"]');
  removeButton.textContent = 'Попробовать снова';
  removeButton.addEventListener('click', () => {
    errorMessage.remove();
    document.location.reload();
    removeErrorMessageListeners();
  });
};

const renderSubmitErrorMessage = () => {
  const errorSubmitMessage = errorMessageTemplate.cloneNode(true);
  document.body.appendChild(errorSubmitMessage);
  const errorMessage = document.querySelector('.error');
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClick);
  const removeButton = errorMessage.querySelector('[type="button"]');
  removeButton.addEventListener('click', () => {
    errorMessage.remove();
    removeErrorMessageListeners();
  });
};

// Сообщение об успешной отправке

const onSuccessMessageEscKeydown = ((evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const successMessage = document.querySelector('.success');
    successMessage.remove();
    removeSuccessMessageListeners();
  }
});

const onSuccessMessageClick = ((evt) => {// что с тобой не так?!
  evt.preventDefault();
  const successMessage = document.querySelector('.success');
  successMessage.remove();
  removeSuccessMessageListeners();
});

const removeSuccessMessageListeners = () => {
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessMessageClick);
};

const renderSubmitSuccessMessage = () => {
  const successMessage = successMessageTemplate.cloneNode(true);
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  setTimeout(() => {
    document.addEventListener('click', onSuccessMessageClick);
  },0);
  setTimeout(() => {
    const succesMessage = document.querySelector('.success');
    if (succesMessage) {
      succesMessage.remove();
    }
    removeSuccessMessageListeners();
  }, ALERT_SHOW_TIME);
};

export {renderInitFailMessage, renderSubmitSuccessMessage, renderSubmitErrorMessage, renderFetchFailMessage, debounce};
