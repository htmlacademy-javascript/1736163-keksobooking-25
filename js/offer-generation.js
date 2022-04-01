import {simillarOffers} from './data.js';

const templateElement = document.querySelector('#card').content;
const mapElement = document.querySelector('#map-canvas');

const getOffer = function (index) {

  const templateElementClone = templateElement.cloneNode(true);

  const templateAuthor = templateElementClone.querySelector('.popup__avatar');

  const authorPicture = simillarOffers[index].author.avatar;
  templateAuthor.src = authorPicture;
  if (authorPicture.length < 1) {
    templateAuthor.classList.add('hidden');
  }

  const offerTitle = templateElementClone.querySelector('.popup__title');
  offerTitle.textContent = simillarOffers[index].offer.title;
  if (offerTitle.textContent === '') {
    offerTitle.classList.add('hidden');
  }

  const offerAddress = templateElementClone.querySelector('.popup__text--address');
  offerAddress.textContent = `${simillarOffers[index].offer.adress.lat  } ${  simillarOffers[index].offer.adress.lng}`;
  if (offerAddress.textContent === '') {
    offerAddress.classList.add('hidden');
  }

  const offerPrice = templateElementClone.querySelector('.popup__text--price');
  offerPrice.textContent = `${simillarOffers[index].offer.price  } ₽/ночь`;
  if (offerPrice.textContent === '') {
    offerPrice.classList.add('hidden');
  }

  const offerType = templateElementClone.querySelector('.popup__type');
  let habitatType = simillarOffers[index].offer.type;
  toString(habitatType);
  function homesteadType (type) {
    switch (type) {
      case 'flat':
        habitatType = 'Квартира';
        break;
      case 'bungalow':
        habitatType = 'Бунгало';
        break;
      case 'house':
        habitatType = 'Дом';
        break;
      case 'palace':
        habitatType = 'Дворец';
        break;
      case 'hotel':
        habitatType = 'Отель';
        break;
      default:
        habitatType = '';
    }
    return habitatType;
  }
  homesteadType(habitatType);
  offerType.textContent = habitatType;
  if (offerType.textContent === '') {
    offerType.classList.add('hidden');
  }


  const offerSpecification = templateElementClone.querySelector('.popup__text--capacity');
  offerSpecification.textContent = `${simillarOffers[index].offer.rooms } комнаты для ${simillarOffers[index].offer.guests} гостей`;
  if (offerSpecification.textContent === ''){
    offerSpecification.classList.add('hidden');
  }

  const offerTime = templateElementClone.querySelector('.popup__text--time');
  offerTime.textContent = `Заезд после ${simillarOffers[index].offer.checkin}, выезд до ${simillarOffers[index].offer.checkout}`;
  if (offerTime.textContent === '') {
    offerTime.classList.add('hidden');
  }

  const offerFeaturesList = templateElementClone.querySelector('.popup__features');
  const offerFeatureList = offerFeaturesList.querySelectorAll('.popup__feature');
  const offersList = simillarOffers[index].offer.features;
  const modifiers = offersList.map((feature) =>
    `popup__feature--${  feature}`);
  offerFeatureList.forEach((featureListItem) => {
    const modifier = featureListItem.classList[1];
    if (!modifiers.includes(modifier)) {
      featureListItem.remove();
    }
  });
  if (offerFeatureList.length === 0){
    offerFeatureList.classList.add('hidden');
  }

  const offerDescription = templateElementClone.querySelector('.popup__description');
  offerDescription.textContent = simillarOffers[index].offer.description;
  if (offerDescription.textContent === '') {
    offerDescription.classList.add('hidden');
  }

  const offerPhotosList = templateElementClone.querySelector('.popup__photos');
  const templateDefaultPhoto = offerPhotosList.querySelector('img');
  offerPhotosList.removeChild(templateDefaultPhoto);
  const offerPhotoList = simillarOffers[index].offer.photos;
  offerPhotoList.forEach((value) => {
    const templatePhoto = templateDefaultPhoto.cloneNode(true);
    offerPhotosList.append(templatePhoto);
    templatePhoto.src = value;
  });


  mapElement.appendChild(templateElementClone);
};
export{getOffer};
