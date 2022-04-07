import {form} from './form.js';
import {createPointsArray} from './map.js';/*nameItLater*/
import {} from './slider.js';
import {} from './map.js';

const SIMILAR_OFFER_COUNT = 10;

const getData = (onSucsess, onError) =>  {
  fetch('https://25.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        console.log(response.ok);//убрать позже
        console.log(response.status);//убрать позже
        return response.json();
      }
      console.log(response.ok);
      console.log(response.status);
      throw new Error (`${response.status} ${response.statusText}`); //пока не работает, цепляет консоль лог но остальное хз
    })
    .then((data) => {
      onSucsess(data);
    })
    .catch((err) => {
      onError(err);
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
        console.log('SUBMIT SENT');
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};
