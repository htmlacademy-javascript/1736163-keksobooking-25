import { mainPinMarker, map, coordinatesInput, MAIN_PIN_MARKER_LATTITUDE, MAIN_PIN_MARKER_LONGITUDE} from './map.js';
import { priceInput } from './form.js';
import {mapFilters} from './map.js';
import {sliderElement} from './slider.js';
import {imagePlaceholder, offerImagePlaceholder} from './image-preview.js';

const resetButton = document.querySelector('.ad-form__reset');
const mapSelectFilters = mapFilters.querySelectorAll('select');
const housingFeaturesBlock = document.querySelector('#housing-features');
const mapCheckboxes = housingFeaturesBlock.querySelectorAll('.map__checkbox');

resetButton.addEventListener('click', () => {

  mapSelectFilters.forEach((select) => {
    select.value = 'any';
  });

  imagePlaceholder.src = 'img/muffin-grey.svg';
  while (offerImagePlaceholder.firstChild) {
    offerImagePlaceholder.removeChild(offerImagePlaceholder.firstChild);
  }

  mapCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  priceInput.setAttribute('placeholder', '0') ;

  mainPinMarker.setLatLng({
    lat: 35.68011,
    lng: 139.76915,
  });
  map.setView({
    lat: 35.68011,
    lng: 139.76915,
  }, 10);
  map.closePopup();
  setTimeout (setCoords, 1);

  sliderElement.noUiSlider.set(0);
});

function setCoords() {
  coordinatesInput.value = `${MAIN_PIN_MARKER_LATTITUDE} ${MAIN_PIN_MARKER_LONGITUDE}`;
}

function resetForm() {
  resetButton.click();
}

export{resetForm, mapFilters};
