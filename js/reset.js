import {mainPinMarker, DEFAULT_MAP_ZOOM, map, coordinatesInputElement, MAIN_PIN_MARKER_LATTITUDE, MAIN_PIN_MARKER_LONGITUDE} from './map.js';
import {priceInputElement} from './form.js';
import {mapFiltersElement} from './map.js';
import {sliderElement, SLIDER_START} from './slider.js';
import {imagePlaceholder, offerImagePlaceholder} from './image-preview.js';

const resetButtonElement = document.querySelector('.ad-form__reset');
const mapSelectFilterElements = mapFiltersElement.querySelectorAll('select');
const housingFeaturesFieldElement = document.querySelector('#housing-features');
const mapCheckboxElements = housingFeaturesFieldElement.querySelectorAll('.map__checkbox');
const DEFAULT_RESET_AWAIT = 1;

// Кнопка сброса

resetButtonElement.addEventListener('click', () => {

  mapSelectFilterElements.forEach((select) => {
    select.value = 'any';
  });

  imagePlaceholder.src = 'img/muffin-grey.svg';
  while (offerImagePlaceholder.firstChild) {
    offerImagePlaceholder.removeChild(offerImagePlaceholder.firstChild);
  }

  mapCheckboxElements.forEach((checkbox) => {
    checkbox.checked = false;
  });
  priceInputElement.setAttribute('placeholder', '0') ;

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
  coordinatesInputElement.value = `${MAIN_PIN_MARKER_LATTITUDE} ${MAIN_PIN_MARKER_LONGITUDE}`;
}

function resetForm() {
  resetButtonElement.click();
}

export{resetForm};
