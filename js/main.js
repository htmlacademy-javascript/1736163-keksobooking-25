import {setUserFormSubmit} from './form.js';
import {resetForm} from './reset.js';
import {debounce} from './util.js';
import {getData} from './api.js';
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

const renderPointsCallback = (data) => {
  renderPoints(data);
};

const renderPointsCallbackDebounced = debounce(renderPointsCallback, RERENDER_DELAY);

const initializeMarkers = () => {
  getData((data) => {
    renderPoints(data);
    setTypeFilterClick(() => renderPointsCallbackDebounced(data));
  });
};

export {initializeMarkers};

