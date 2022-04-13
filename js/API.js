import {renderSubmitSuccessMessage, renderFetchFailMessage} from './util.js';

const getData = (onSucsess, onFail) =>  {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        onFail();
      }
    })
    .then((data) => {
      onSucsess(data);
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
    })
    .catch((err) => {
      onFail(err);
    });
};

export {getData, sendData};
