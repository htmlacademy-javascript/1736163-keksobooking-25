import {removeErrorMessageListeners, removeSuccessMessageListeners} from './util.js';

const ALERT_SHOW_TIME = 3000;
const successMessageTemplateElement = document.querySelector('#success').content;
const errorMessageTemplateElement = document.querySelector('#error').content;

// Сообщение об ошибке

const  isEscapeKey = (evt) => evt.key === 'Escape';

const removeErrorMessage = (evt) => {
  evt.preventDefault();
  const successMessageElement = document.querySelector('.error');
  successMessageElement.remove();
  removeErrorMessageListeners();
};

const onErrorMessageEscKeydown = ((evt) => {
  if (isEscapeKey(evt)) {
    removeErrorMessage(evt);
  }
});

const onErrorMessageClick = ((evt) => {
  removeErrorMessage(evt);
});

const generateErrorMessage = (messageInput, buttonInput) => {
  const fetchFailMessage = errorMessageTemplateElement.cloneNode(true);
  const failMessageTextElement = fetchFailMessage.querySelector('.error__message');
  failMessageTextElement.textContent = messageInput;
  document.body.appendChild(fetchFailMessage);
  const errorMessageElement = document.querySelector('.error');
  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClick);
  const removeButtonElement = errorMessageElement.querySelector('[type="button"]');
  removeButtonElement.textContent = buttonInput;
  removeButtonElement.addEventListener('click', () => {
    errorMessageElement.remove();
    removeErrorMessageListeners();
  });
};

const renderFetchFailMessage = () => {
  generateErrorMessage('Ошибка загрузки данных с сервера, вы все еще можете разместить анкету!', 'Заполнить анкету');
};

const renderInitFailMessage = () => {
  generateErrorMessage('Ошибка загрузки карты, попробуйте зайти позже, либо попробуйте снова!', 'Попробовать снова');
};

const renderSubmitErrorMessage = () => {
  generateErrorMessage('Ошибка отправки формы, попробуйте зайти позже, либо попробуйте снова!', 'Попробовать снова');
};

// Сообщение об успешной отправке


const removeSuccessMessage = (evt) => {
  evt.preventDefault();
  const successMessageElement = document.querySelector('.success');
  successMessageElement.remove();
};

const onSuccessMessageEscKeydown = ((evt) => {
  if (isEscapeKey(evt)) {
    removeSuccessMessage(evt);
    removeSuccessMessageListeners();
  }
});

const onSuccessMessageClick = ((evt) => {
  removeSuccessMessage(evt);
  removeSuccessMessageListeners();
});

const renderSubmitSuccessMessage = () => {
  const successMessage = successMessageTemplateElement.cloneNode(true);
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);
  setTimeout(() => {
    document.addEventListener('click', onSuccessMessageClick);
  },0); //при нажатии кнопки submit обрабатывается клик по кнопке и на попап, по этому он тут
  setTimeout(() => {
    const succesMessageElement = document.querySelector('.success');
    if (succesMessageElement) {
      succesMessageElement.remove();
    }
    removeSuccessMessageListeners();
  }, ALERT_SHOW_TIME);
};

export {onSuccessMessageClick, onSuccessMessageEscKeydown, onErrorMessageEscKeydown, onErrorMessageClick, renderInitFailMessage, renderSubmitSuccessMessage, renderSubmitErrorMessage, renderFetchFailMessage, };
