import {getOffer, popupFragment} from './offer-generation.js';
import {enableSubmitForm} from './form-state.js';
import {initializeMarkers} from './main.js';
import {renderInitFailMessage} from './messages.js';

const SIMILAR_OFFER_COUNT = 10;
const MAIN_PIN_MARKER_LATTITUDE = 35.680111;
const MAIN_PIN_MARKER_LONGITUDE = 139.769152;
const DEFAULT_MAP_ZOOM = 10;
const MIN_PRICE_CATEGORY_LOW = 0;
const MAX_PRICE_CATEGORY_LOW = 9999;
const LEAFLET_TILELAYER_PATH = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const LEAFLET_TILELAYER_ATTRIBUTION = 'https://www.openstreetmap.org/copyright';
const MIN_PRICE_CATEGORY_MIDDLE = 10000;
const MAX_PRICE_CATEGORY_MIDDLE = 49999;
const MAIN_PIN_WIDTH = 52;
const MAIN_PIN_HEIGHT = 52;
const PIN_WIDTH = 40;
const PIN_HEIGHT = 40;
const PIN_CENTERPOINT = 20;
const MAIN_PIN_CENTERPOINT = 26;
const MIN_PRICE_CATEGORY_HIGH = 50000;
const COORDINATES_FIXED_DECIMAL_VALUE = 5;
const NUMERAL_SYSTEM = 10;
const FEATURES_MISMATCH_PENALTY = 5;
const POINTS_ARRAY_SPLICE_START_VALUE = 0;
const DATA_ARRAY_SPLICE_START_VALUE = 0;
const CHECKBOX_ARRAY_EMPTY = 0;

const PropertyCategoryPrice = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
  ANY: 'any'
};

const coordinatesInputElement = document.querySelector('#address');
const points = [];
const serverArray = [];
const mapFiltersElement = document.querySelector('.map__filters');
const housingTypeSelectorElement = mapFiltersElement.querySelector('#housing-type');
const housingPriceSelectorElement = mapFiltersElement.querySelector('#housing-price');
const housingRoomsSelectorElement = mapFiltersElement.querySelector('#housing-rooms');
const housingGuestsSelectorElement = mapFiltersElement.querySelector('#housing-guests');
let checkboxArray = [];
const map = L.map('map-canvas');

// Инициализация карты

window.addEventListener('load', () => {

  const mapInitialization = new Promise((resolve, reject) => {
    map.on('load', () => {
      coordinatesInputElement.value = `'${MAIN_PIN_MARKER_LATTITUDE}, ${MAIN_PIN_MARKER_LONGITUDE}'`;
    })
      .setView({
        lat: MAIN_PIN_MARKER_LATTITUDE,
        lng: MAIN_PIN_MARKER_LONGITUDE,
      }, DEFAULT_MAP_ZOOM);

    L.tileLayer(
      LEAFLET_TILELAYER_PATH,
      {
        attribution: `'&copy; <a href=${LEAFLET_TILELAYER_ATTRIBUTION}>OpenStreetMap</a> contributors'`,
      },
    )
      .on('load', () => {
        resolve();
      })
      .on('tileerror', () => {
        reject();
      })
      .addTo(map);
  });
  mapInitialization.then(() => {
    initializeMarkers();
    enableSubmitForm();
  });
  mapInitialization.catch(() =>{
    renderInitFailMessage();
  });
});

// Маркеры

const markerGroup = L.layerGroup().addTo(map);
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN_WIDTH, MAIN_PIN_HEIGHT],
  iconAnchor: [MAIN_PIN_CENTERPOINT, MAIN_PIN_HEIGHT],
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
  iconSize: [PIN_WIDTH, PIN_HEIGHT],
  iconAnchor: [PIN_CENTERPOINT, PIN_HEIGHT]
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const pinMarkerCoordinates = (evt.target.getLatLng());
  coordinatesInputElement.value = `${pinMarkerCoordinates.lat.toFixed(COORDINATES_FIXED_DECIMAL_VALUE) }, ${pinMarkerCoordinates.lng.toFixed(COORDINATES_FIXED_DECIMAL_VALUE)}`;
});

// Создание контента балуна

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
  mapFiltersElement.addEventListener('change', () => {
    cb();
  });
};

const mapFilterCheckboxes = mapFiltersElement.querySelectorAll('[name="features"]');

//Фильтрация объявлений

const filterHousingPrice = (offerObject) => {
  const { offer: { price } } = offerObject;
  const { value } = housingPriceSelectorElement;

  switch (value) {
    case PropertyCategoryPrice.LOW:
      return price >= MIN_PRICE_CATEGORY_LOW && price <= MAX_PRICE_CATEGORY_LOW;
    case PropertyCategoryPrice.MIDDLE:
      return price >= MIN_PRICE_CATEGORY_MIDDLE && price <= MAX_PRICE_CATEGORY_MIDDLE;
    case PropertyCategoryPrice.HIGH:
      return price >= MIN_PRICE_CATEGORY_HIGH;
    default:
      return true;
  }
};

const filterHousingType = (offerObject) =>
  housingTypeSelectorElement.value === 'any' || housingTypeSelectorElement.value === offerObject.offer.type;

const filterHousingRooms = (offerObject) =>
  housingRoomsSelectorElement.value === 'any' || parseInt(housingRoomsSelectorElement.value, NUMERAL_SYSTEM) === offerObject.offer.rooms;

const filterHousingGuests = (offerObject) =>
  housingGuestsSelectorElement.value === 'any' || parseInt(housingGuestsSelectorElement.value, NUMERAL_SYSTEM) === offerObject.offer.guests;

const filterFeatures = (offerObject) => {
  let sum = 0;
  checkboxArray.forEach((box) => {
    if (offerObject.offer.features === undefined &&  checkboxArray.length > CHECKBOX_ARRAY_EMPTY) {
      sum --;
    }
    else if (offerObject.offer.features.includes(box)) {
      sum ++;
    }
    else if (!offerObject.offer.features.includes(box)) {
      sum -= FEATURES_MISMATCH_PENALTY;
    }
  });
  if (checkboxArray.length === CHECKBOX_ARRAY_EMPTY) {
    sum ++;
  }
  return sum > 0;
};

mapFiltersElement.addEventListener('change', () => {
  checkboxArray = [];
  mapFilterCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkboxArray.push(checkbox.value);
    }
  });
});

//Прорисовка маркеров на карте

const renderPoints = (data) => {
  markerGroup.clearLayers();
  serverArray.splice(DATA_ARRAY_SPLICE_START_VALUE, serverArray.length);
  points.splice(POINTS_ARRAY_SPLICE_START_VALUE, points.length);
  let housingOffers = data.slice();
  housingOffers = housingOffers.filter(filterHousingType).filter(filterHousingPrice).filter(filterHousingRooms).filter(filterHousingGuests).filter(filterFeatures);
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

export{renderPoints, DEFAULT_MAP_ZOOM, coordinatesInputElement, mainPinMarker, map, MAIN_PIN_MARKER_LATTITUDE, MAIN_PIN_MARKER_LONGITUDE, markerGroup, setTypeFilterClick, mapFiltersElement};
