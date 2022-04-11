import {getOffer, popupFragment} from './offer-generation.js';
import {} from './form-state.js';
import {} from './form.js';
import {} from './map-form.js';
import {} from './reset.js';

const SIMILAR_OFFER_COUNT = 10;
const MAIN_PIN_MARKER_LATTITUDE = 35.680111;
const MAIN_PIN_MARKER_LONGITUDE = 139.769152;
const coordinatesInput = document.querySelector('#address');
const points = [];
const serverArray = [];
const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const map = L.map('map-canvas')
  .on('load', () => {
    coordinatesInput.value = `${MAIN_PIN_MARKER_LATTITUDE} ${MAIN_PIN_MARKER_LONGITUDE}`;
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
).addTo(map);
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

//Фильтрация объявлений

const filterHousingType = (offerObject) => {
  if (housingType.value === 'any') {
    return true;
  }
  else if (housingType.value === offerObject.offer.type){
    return true;
  }
  else {
    return false;
  }
};

const filterHousingPrice = (offerObject) => {
  if (housingPrice.value === 'low') {
    return (offerObject.offer.price <= 10000);
  }
  else if ( housingPrice.value === 'middle' ) {
    return offerObject.offer.price <= 50000 && offerObject.offer.price >= 10000;
  }
  else if (housingPrice.value === 'high' ) {
    return (offerObject.offer.price >= 50000);
  }
  else if (housingPrice.value === 'any') {
    return true;
  }
};

const filterHousingRooms = (offerObject) => {
  if (housingRooms.value === 'any') {
    return true;
  }
  else if ( parseInt(housingRooms.value, 10) === offerObject.offer.rooms) {
    return true;
  }
  else {
    return false;
  }
};

const filterHousingGuests = (offerObject) => {
  if (housingGuests.value === 'any') {
    return true;
  }
  else if ( parseInt(housingGuests.value, 10) === offerObject.offer.guests) {
    return true;
  }
  else {
    return false;
  }
};
//console.log(data[1].offer.features[0]);

//Прорисовка маркеров на карте

const renderPoints = (data) => {
  markerGroup.clearLayers();
  serverArray.splice(0, serverArray.length);
  points.splice(0, points.length);
  let filteredArray = data.slice();
  filteredArray = filteredArray.filter(filterHousingType);
  filteredArray = filteredArray.filter(filterHousingPrice);
  filteredArray = filteredArray.filter(filterHousingRooms);
  filteredArray = filteredArray.filter(filterHousingGuests);
  filteredArray = filteredArray.slice(0, SIMILAR_OFFER_COUNT);
  filteredArray.forEach((offerObject) => {
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

