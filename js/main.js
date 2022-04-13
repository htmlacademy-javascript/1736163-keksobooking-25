import {setUserFormSubmit} from './form.js';
import {resetForm} from './reset.js';
import {debounce} from './util.js';
import {getData} from './API.js';
import {renderPoints} from './map.js';
import {setTypeFilterClick} from './map.js';
import {} from './image-preview.js';
import {disableMapForm} from './form-state.js';
const RERENDER_DELAY = 500;

// window.onload = () => {
//   disableMapForm();
// };

setUserFormSubmit(resetForm);

getData((data) => {
  renderPoints(data);
  setTypeFilterClick(debounce(() => renderPoints(data), RERENDER_DELAY));
});

