const templateElement = document.querySelector('#card').content;
const popupFragment = document.createDocumentFragment('span');

// Генерация контента балуна

const getOffer = (array, index) => {

  const templateElementClone = templateElement.cloneNode(true);
  const templateAuthor = templateElementClone.querySelector('.popup__avatar');
  const authorPicture = array[index].author.avatar;
  const offerTitle = templateElementClone.querySelector('.popup__title');
  const offerAddress = templateElementClone.querySelector('.popup__text--address');
  const offerPrice = templateElementClone.querySelector('.popup__text--price');
  const offerType = templateElementClone.querySelector('.popup__type');
  const offerSpecification = templateElementClone.querySelector('.popup__text--capacity');
  const offerTime = templateElementClone.querySelector('.popup__text--time');
  const offerFeaturesList = templateElementClone.querySelector('.popup__features');
  const offerFeatureList = offerFeaturesList.querySelectorAll('.popup__feature');
  const offersList = array[index].offer.features;
  const offerDescription = templateElementClone.querySelector('.popup__description');
  const offerPhotosList = templateElementClone.querySelector('.popup__photos');
  const templateDefaultPhoto = offerPhotosList.querySelector('img');
  let roomDeclension = 'комнаты';
  let guestDeclension = 'гостей';

  templateAuthor.src = authorPicture;
  if (authorPicture.length < 1) {
    templateAuthor.classList.add('hidden');
  }

  offerTitle.textContent = array[index].offer.title;
  if (offerTitle.textContent === '') {
    offerTitle.classList.add('hidden');
  }

  offerAddress.textContent = `${array[index].offer.address}`;
  if (offerAddress.textContent === '') {
    offerAddress.classList.add('hidden');
  }

  offerPrice.textContent = `${array[index].offer.price  } ₽/ночь`;
  if (offerPrice.textContent === '') {
    offerPrice.classList.add('hidden');
  }

  let habitatType = array[index].offer.type;
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

  if (Number(array[index].offer.rooms) === 1) {
    roomDeclension = 'комната';
  }
  if (Number(array[index].offer.guests) === 1) {
    guestDeclension = 'гостя';
  }
  offerSpecification.textContent = `${array[index].offer.rooms } ${roomDeclension} для ${array[index].offer.guests} ${guestDeclension}`;
  if (offerSpecification.textContent === ''){
    offerSpecification.classList.add('hidden');
  }

  offerTime.textContent = `Заезд после ${array[index].offer.checkin}, выезд до ${array[index].offer.checkout}`;
  if (offerTime.textContent === '') {
    offerTime.classList.add('hidden');
  }

  if (offersList === undefined) {
    offerFeaturesList.classList.add('hidden');
  }
  else {
    const modifiers = offersList.map((feature) =>
      `popup__feature--${  feature}`);
    offerFeatureList.forEach((featureListItem) => {
      const modifier = featureListItem.classList[1];
      if (!modifiers.includes(modifier)) {
        featureListItem.remove();
      }
    });
  }

  offerDescription.textContent = array[index].offer.description;
  if (offerDescription.textContent === '') {
    offerDescription.classList.add('hidden');
  }

  offerPhotosList.removeChild(templateDefaultPhoto);
  const offerPhotoList = array[index].offer.photos;
  if (offerPhotoList === undefined) {
    offerPhotosList.classList.add('hidden');
  }
  else {
    offerPhotoList.forEach((value) => {
      const templatePhoto = templateDefaultPhoto.cloneNode(true);
      offerPhotosList.append(templatePhoto);
      templatePhoto.src = value;
    });
  }
  popupFragment.replaceChildren(templateElementClone);
};

export{getOffer, popupFragment};
