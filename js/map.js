import {getOffer, popupFragment} from './offer-generation.js';
import {simillarOffers} from './data.js';

const coordinatesInput = document.querySelector('#address');
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
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.680111,
    lng: 139.769152,
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

simillarOffers.forEach((offerObject) => {
  const point = {
    title: `${offerObject.offer.title}`,
    lat: offerObject.location.lat,
    lng: offerObject.location.lng
  };
  points.push(point);
});

const markerGroup = L.layerGroup().addTo(map);

const createCustomPopup = (point) => {
  getOffer(points.indexOf(point));
  const popupElement = popupFragment.cloneNode(true);
  return popupElement.querySelector('.popup');
};

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

points.forEach((point) => {
  createMarker(point);
});

//markerGroup.clearLayers(); очистка маркеров

const resetButton = document.querySelector('.ad-form__reset'); //пока вроде не нужно
resetButton.addEventListener('click', () => {
  coordinatesInput.value = '35.68011';
  mainPinMarker.setLatLng({
    lat: 35.68011,
    lng: 139.76915,
  });
  map.setView({
    lat: 35.68011,
    lng: 139.76915,
  }, 10);
});

export{};
