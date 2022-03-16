const TYPES_LIST = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];
const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const TIME_VALUES = [
  '12:00',
  '13:00',
  '14:00'
];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

let pictureCounter = 0;
let pictureNumber;
let locationKeys;


function getRandomNumberInclusive(min, max, decimal) {

  return (Math.random() * (max - min) + min).toFixed(decimal);
}

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomNumber(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function getFeaturesArray() {
  const maxLength = FEATURES_LIST.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = FEATURES_LIST[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
}

function getPhotosArray() {
  const maxLength = PHOTOS_LIST.length;
  const lengthOfArray = getRandomNumber(1, maxLength);
  const array = [];

  while (array.length < lengthOfArray) {
    const indexOfEl = getRandomNumber(0, maxLength - 1);
    const el = PHOTOS_LIST[indexOfEl];

    if (!array.includes(el)) {
      array.push(el);
    }
  }
  return array;
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function getCoordinatesValue () {
  return {
    lat: Number(getRandomNumberInclusive(35.65000, 35.70000, 5)),
    lng: Number(getRandomNumberInclusive(139.70000, 139.80000, 5))
  };
}

function createAuthorKeys ()  {
  pictureCounter +=1;
  pictureNumber = pictureCounter;
  if (pictureNumber < 10) {
    pictureNumber = `0${  pictureNumber}`;
  }
  return {
    avatar: `img/avatars/user${  pictureNumber  }.png`
  };
}

function createOfferKeys  ()  {
  locationKeys = getCoordinatesValue();
  return {
    title: 'Основные данные объекта',
    adress: locationKeys,
    price: getRandomPositiveInteger(1, 500000),
    type: getRandomArrayElement(TYPES_LIST),
    rooms: getRandomPositiveInteger(1, 500000),
    guests: getRandomPositiveInteger(1, 500000),
    checkin: getRandomArrayElement(TIME_VALUES),
    checkout: getRandomArrayElement(TIME_VALUES),
    features: getFeaturesArray(FEATURES_LIST),
    description: 'Жилье для души',
    photos: getPhotosArray(PHOTOS_LIST)
  };
}

function createMainBlock () {
  return {
    author: createAuthorKeys(),
    offer: createOfferKeys(),
    location: locationKeys
  };
}


const simillarOffers = Array.from({length: 10}, createMainBlock);

//- Added this comment to create new pullrequest


