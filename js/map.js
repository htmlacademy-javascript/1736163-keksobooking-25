import {getOffer, popupFragment} from './offer-generation.js';
import {} from './data.js';

const MAIN_PIN_MARKER_LATTITUDE = 35.680111;
const MAIN_PIN_MARKER_LONGITUDE = 139.769152;
const coordinatesInput = document.querySelector('#address');

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

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const pinMarkerCoordinates = (evt.target.getLatLng());
  coordinatesInput.value = `${pinMarkerCoordinates.lat.toFixed(5) }, ${pinMarkerCoordinates.lng.toFixed(5)}`;
});

const markerIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const points = [];
const serverArray = [];

const createCustomPopup = (point) => {
  getOffer(serverArray, points.indexOf(point));
  const popupElement = popupFragment.cloneNode(true);
  return popupElement.querySelector('.popup');
};

const markerGroup = L.layerGroup().addTo(map);

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

const createPointsArray = (data/*console.error()*/) => { // либо так либо хз вообще!
  data.forEach((offerObject) => {
    serverArray.push(offerObject);
    const point = {
      title: `${offerObject.offer.title}`,
      lat: offerObject.location.lat,
      lng: offerObject.location.lng
    };
    points.push(point);
  });
  points.forEach((point) => { // запихнул эту часть внутрь, так работает возможно тут потребуется промис
    createMarker(point);
  });
};


//markerGroup.clearLayers(); очистка маркеров


export{createPointsArray, coordinatesInput, mainPinMarker, map, MAIN_PIN_MARKER_LATTITUDE, MAIN_PIN_MARKER_LONGITUDE};

