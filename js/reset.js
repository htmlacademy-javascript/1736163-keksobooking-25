import { mainPinMarker, map, coordinatesInput, MAIN_PIN_MARKER_LATTITUDE, MAIN_PIN_MARKER_LONGITUDE} from './map.js';

const resetButton = document.querySelector('.ad-form__reset');

const mapFilters = document.querySelector('.map__filters-container');
const mapSelectFilters = mapFilters.querySelectorAll('select');
const housingFeaturesBlock = document.querySelector('#housing-features');
const mapCheckboxes = housingFeaturesBlock.querySelectorAll('.map__checkbox');
const popupElement = document.querySelector('.popup');

resetButton.addEventListener('click', () => {

  mapSelectFilters.forEach((select) => {
    select.value = 'any';
  });

  mapCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });

  console.log('reseting')

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
});

function setCoords() {
  coordinatesInput.value = `${MAIN_PIN_MARKER_LATTITUDE} ${MAIN_PIN_MARKER_LONGITUDE}`;
}

function resetForm() {
  resetButton.click();
}

export{resetForm};
