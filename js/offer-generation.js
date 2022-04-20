const templateElement = document.querySelector('#card').content;
const popupFragment = document.createDocumentFragment();

// Генерация контента балуна

const getOffer = (array, index) => {

  const templateElementClone = templateElement.cloneNode(true);
  const templateAuthorElement = templateElementClone.querySelector('.popup__avatar');
  const authorPicture = array[index].author.avatar;
  const offerTitleElement = templateElementClone.querySelector('.popup__title');
  const offerAddressElement = templateElementClone.querySelector('.popup__text--address');
  const offerPriceElement = templateElementClone.querySelector('.popup__text--price');
  const offerTypeElement = templateElementClone.querySelector('.popup__type');
  const offerSpecificationElement = templateElementClone.querySelector('.popup__text--capacity');
  const offerTimeElement = templateElementClone.querySelector('.popup__text--time');
  const offerFeaturesListElement = templateElementClone.querySelector('.popup__features');
  const offerFeatureListElements = offerFeaturesListElement.querySelectorAll('.popup__feature');
  const offersList = array[index].offer.features;
  const offerDescriptionElement = templateElementClone.querySelector('.popup__description');
  const offerPhotosListElement = templateElementClone.querySelector('.popup__photos');
  const templateDefaultPhotoElement = offerPhotosListElement.querySelector('img');
  let roomDeclension = 'комнаты';
  let guestDeclension = 'гостей';
  let habitatType = '';

  templateAuthorElement.src = authorPicture;
  if (authorPicture.length < 1) {
    templateAuthorElement.classList.add('hidden');
  }

  offerTitleElement.textContent = array[index].offer.title;
  if (offerTitleElement.textContent === '') {
    offerTitleElement.classList.add('hidden');
  }

  offerAddressElement.textContent = `${array[index].offer.address}`;
  if (offerAddressElement.textContent === '') {
    offerAddressElement.classList.add('hidden');
  }

  offerPriceElement.textContent = `${array[index].offer.price  } ₽/ночь`;
  if (offerPriceElement.textContent === '') {
    offerPriceElement.classList.add('hidden');
  }

  const homesteadType = () => {
    switch (array[index].offer.type) {
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
  };

  homesteadType(habitatType);
  offerTypeElement.textContent = habitatType;
  if (offerTypeElement.textContent === '') {
    offerTypeElement.classList.add('hidden');
  }

  if (Number(array[index].offer.rooms) === 1) {
    roomDeclension = 'комната';
  }
  if (Number(array[index].offer.guests) === 1) {
    guestDeclension = 'гостя';
  }
  offerSpecificationElement.textContent = `${array[index].offer.rooms } ${roomDeclension} для ${array[index].offer.guests} ${guestDeclension}`;
  if (offerSpecificationElement.textContent === ''){
    offerSpecificationElement.classList.add('hidden');
  }

  offerTimeElement.textContent = `Заезд после ${array[index].offer.checkin}, выезд до ${array[index].offer.checkout}`;
  if (offerTimeElement.textContent === '') {
    offerTimeElement.classList.add('hidden');
  }

  if (offersList === undefined) {
    offerFeaturesListElement.classList.add('hidden');
  }
  else {
    const modifiers = offersList.map((feature) =>
      `popup__feature--${  feature}`);
    offerFeatureListElements.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  }

  offerDescriptionElement.textContent = array[index].offer.description;
  if (offerDescriptionElement.textContent === '') {
    offerDescriptionElement.classList.add('hidden');
  }

  offerPhotosListElement.removeChild(templateDefaultPhotoElement);
  const offerPhotoList = array[index].offer.photos;
  if (offerPhotoList === undefined) {
    offerPhotosListElement.classList.add('hidden');
  }
  else {
    offerPhotoList.forEach((value) => {
      const templatePhoto = templateDefaultPhotoElement.cloneNode(true);
      offerPhotosListElement.append(templatePhoto);
      templatePhoto.src = value;
    });
  }
  popupFragment.replaceChildren(templateElementClone);
};

export{getOffer, popupFragment};
