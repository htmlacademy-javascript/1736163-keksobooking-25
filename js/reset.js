import {mainPinMarker, DEFAULT_MAP_ZOOM, map, coordinatesInput, MAIN_PIN_MARKER_LATTITUDE, MAIN_PIN_MARKER_LONGITUDE} from './map.js';
import {priceInput} from './form.js';
import {mapFilters} from './map.js';
import {sliderElement, SLIDER_START} from './slider.js';
import {imagePlaceholder, offerImagePlaceholder} from './image-preview.js';

const resetButton = document.querySelector('.ad-form__reset');
const mapSelectFilters = mapFilters.querySelectorAll('select');
const housingFeaturesField = document.querySelector('#housing-features');
const mapCheckboxes = housingFeaturesField.querySelectorAll('.map__checkbox');
const DEFAULT_RESET_AWAIT = 1;

// Кнопка сброса

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
    lat: MAIN_PIN_MARKER_LATTITUDE,
    lng: MAIN_PIN_MARKER_LONGITUDE,
  });
  map.setView({
    lat: MAIN_PIN_MARKER_LATTITUDE,
    lng: MAIN_PIN_MARKER_LONGITUDE,
  }, DEFAULT_MAP_ZOOM);
  map.closePopup();
  setTimeout (setCoords, DEFAULT_RESET_AWAIT);

  sliderElement.noUiSlider.set(SLIDER_START);
});

function setCoords() {
  coordinatesInput.value = `${MAIN_PIN_MARKER_LATTITUDE} ${MAIN_PIN_MARKER_LONGITUDE}`;
}

function resetForm() {
  resetButton.click();
}

export{resetForm};
