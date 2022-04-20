import {renderSubmitSuccessMessage, renderFetchFailMessage} from './messages.js';
import {enableMapForm} from './form-state.js';

const getData = (onSucsess, onFail) =>  {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        onFail();
        throw new Error();
      }
    })
    .then((data) => {
      onSucsess(data);
      enableMapForm();
    })
    .catch(() => {
      renderFetchFailMessage();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        renderSubmitSuccessMessage();
        onSuccess();
      }
      else {
        onFail();
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
