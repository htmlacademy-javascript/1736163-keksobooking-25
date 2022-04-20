import {} from './form.js';
import {onErrorMessageEscKeydown, onErrorMessageClick, onSuccessMessageEscKeydown, onSuccessMessageClick} from './messages.js';

// Дебаунс

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const removeErrorMessageListeners = () => {
  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageClick);
};

const removeSuccessMessageListeners = () => {
  document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  document.removeEventListener('click', onSuccessMessageClick);
};

export {removeSuccessMessageListeners, removeErrorMessageListeners, debounce};
