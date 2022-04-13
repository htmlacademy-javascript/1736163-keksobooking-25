import {getOffer, popupFragment} from './offer-generation.js';
import {disableSubmitForm} from './form-state.js';

const SIMILAR_OFFER_COUNT = 10;
const MAIN_PIN_MARKER_LATTITUDE = 35.680111;
const MAIN_PIN_MARKER_LONGITUDE = 139.769152;

const coordinatesInput = document.querySelector('#address');
const points = [];
const serverArray = [];
const mapFilters = document.querySelector('.map__filters');
const housingTypeSelector = mapFilters.querySelector('#housing-type');
const housingPriceSelector = mapFilters.querySelector('#housing-price');
const housingRoomsSelector = mapFilters.querySelector('#housing-rooms');
const housingGuestsSelector = mapFilters.querySelector('#housing-guests');
let checkboxArray = [];

const map = L.map('map-canvas')
  .on('load', () => {
    coordinatesInput.value = '35.68011, 139.76915';
  })
  .setView({
    lat: 35.68011,
    lng: 139.76915,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
)
  .on('tileerror', () => {
    disableSubmitForm();
  })
  .addTo(map);

const markerGroup = L.layerGroup().addTo(map);
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: MAIN_PIN_MARKER_LATTITUDE,
    lng: MAIN_PIN_MARKER_LONGITUDE,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const pinMarkerCoordinates = (evt.target.getLatLng());
  coordinatesInput.value = `${pinMarkerCoordinates.lat.toFixed(5) }, ${pinMarkerCoordinates.lng.toFixed(5)}`;
});

const createCustomPopup = (point) => {
  getOffer(serverArray, points.indexOf(point));
  const popupElement = popupFragment.cloneNode(true);
  return popupElement.querySelector('.popup');
};

// Отрисовка пинов на карте

const createMarker = (point) => {
  const {lat, lng} = point;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      markerIcon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
  return marker;
};

//Создание массива пинов

const setTypeFilterClick = (cb) => {
  mapFilters.addEventListener('change', () => {
    cb();
  });
};

const mapFilterCheckboxes = mapFilters.querySelectorAll('[name="features"]');

//Фильтрация объявлений

const filterHousingType = (offerObject) => {
  if (housingTypeSelector.value === 'any') {
    return true;
  }
  else if (housingTypeSelector.value === offerObject.offer.type){
    return true;
  }
  else {
    return false;
  }
};

const filterHousingPrice = (offerObject) => {
  if (housingPriceSelector.value === 'low') {
    return (offerObject.offer.price <= 10000);
  }
  else if ( housingPriceSelector.value === 'middle' ) {
    return offerObject.offer.price <= 50000 && offerObject.offer.price >= 10000;
  }
  else if (housingPriceSelector.value === 'high' ) {
    return (offerObject.offer.price >= 50000);
  }
  else if (housingPriceSelector.value === 'any') {
    return true;
  }
};

const filterHousingRooms = (offerObject) => {
  if (housingRoomsSelector.value === 'any') {
    return true;
  }
  else if ( parseInt(housingRoomsSelector.value, 10) === offerObject.offer.rooms) {
    return true;
  }
  else {
    return false;
  }
};

const filterHousingGuests = (offerObject) => {
  if (housingGuestsSelector.value === 'any') {
    return true;
  }
  else if ( parseInt(housingGuestsSelector.value, 10) === offerObject.offer.guests) {
    return true;
  }
  else {
    return false;
  }
};

mapFilters.addEventListener('change', () => {
  checkboxArray = [];
  mapFilterCheckboxes.forEach((checkbox) => {
    if (checkbox.checked === true) {
      checkboxArray.push(checkbox.value);
    }
  });
});

const filterStuff = (offerObject) => {
  let sum = 0;
  checkboxArray.forEach((box) => {
    if (offerObject.offer.features === undefined &&  checkboxArray.length > 0) {
      sum --;
    }
    else if (offerObject.offer.features.includes(box)) {
      sum ++;
    }
    else if (!offerObject.offer.features.includes(box)) {
      sum -= 5;
    }
  });
  if (checkboxArray.length === 0) {
    sum ++;
  }
  if (sum > 0) {
    return true;
  }
  else {
    return false;
  }
};

//Прорисовка маркеров на карте

const renderPoints = (data) => {
  markerGroup.clearLayers();
  serverArray.splice(0, serverArray.length);
  points.splice(0, points.length);
  let housingOffers = data.slice();
  housingOffers = housingOffers.filter(filterHousingType);
  housingOffers = housingOffers.filter(filterHousingPrice);
  housingOffers = housingOffers.filter(filterHousingRooms);
  housingOffers = housingOffers.filter(filterHousingGuests);
  housingOffers = housingOffers.filter(filterStuff);
  housingOffers = housingOffers.slice(0, SIMILAR_OFFER_COUNT);
  housingOffers.forEach((offerObject) => {
    serverArray.push(offerObject);
    const point = {
      title: `${offerObject.offer.title}`,
      lat: offerObject.location.lat,
      lng: offerObject.location.lng
    };
    points.push(point);
  });
  points.forEach((point) => {
    createMarker(point);
  });
};

export{renderPoints, coordinatesInput, mainPinMarker, map, MAIN_PIN_MARKER_LATTITUDE, MAIN_PIN_MARKER_LONGITUDE, markerGroup, setTypeFilterClick, mapFilters};
