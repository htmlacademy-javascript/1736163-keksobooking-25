import {setUserFormSubmit} from './form.js';
import {resetForm} from './reset.js';
import {debounce} from './util.js';
import {getData} from './API.js';
import {setTypeFilterClick, renderPoints} from './map.js';
import {disableSubmitForm, disableMapForm} from './form-state.js';

const RERENDER_DELAY = 500;

// Блокировка формы

document.addEventListener('DOMContentLoaded', () => {
  disableMapForm();
  disableSubmitForm();
});

// Сброс при подгрузке страницы

setUserFormSubmit(resetForm);

// Инициализация маркеров на карте

const markersInitialize = () =>{
  getData((data) => {
    renderPoints(data);
    setTypeFilterClick(debounce(() => renderPoints(data), RERENDER_DELAY));
  });
};

export {markersInitialize};
