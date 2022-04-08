import {showLoadAlert} from './util.js';
import {resetForm} from './reset.js';
import {setUserFormSubmit} from './form.js';
import {createPointsArray} from './map.js';

const SIMILAR_OFFER_COUNT = 10;

const getData = (onSucsess, onFail) =>  {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        // console.log(response.ok);
        // console.log(response.status);
        return response.json();
      }
      else {
        // console.log(response.ok);
        // console.log(response.status);
        onFail('Error');
      }
    })
    .then((data) => {
      onSucsess(data);
    })
    .catch((err) => {
      showLoadAlert(err);
    });
};


getData((data) => {
  createPointsArray(data.slice(0, SIMILAR_OFFER_COUNT));
});

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
        // console.log('SUBMIT SENT');
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      // console.log('but this other part of submit still triggers')
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
