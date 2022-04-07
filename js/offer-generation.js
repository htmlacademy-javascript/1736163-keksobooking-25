import {} from './data.js';
//import {} from './server-operation.js';


const templateElement = document.querySelector('#card').content;
const popupFragment = document.createDocumentFragment('span'); //коробочка


const getOffer = function (array, index) { //первым аргументом воткнуть наш полученный массив

  const templateElementClone = templateElement.cloneNode(true);

  const templateAuthor = templateElementClone.querySelector('.popup__avatar');

  const authorPicture = array[index].author.avatar;
  templateAuthor.src = authorPicture;
  if (authorPicture.length < 1) {
    templateAuthor.classList.add('hidden');
  }

  const offerTitle = templateElementClone.querySelector('.popup__title');
  offerTitle.textContent = array[index].offer.title;
  if (offerTitle.textContent === '') {
    offerTitle.classList.add('hidden');
  }

  const offerAddress = templateElementClone.querySelector('.popup__text--address');
  offerAddress.textContent = `${array[index].offer.address}`;
  if (offerAddress.textContent === '') {
    offerAddress.classList.add('hidden');
  }

  const offerPrice = templateElementClone.querySelector('.popup__text--price');
  offerPrice.textContent = `${array[index].offer.price  } ₽/ночь`;
  if (offerPrice.textContent === '') {
    offerPrice.classList.add('hidden');
  }

  const offerType = templateElementClone.querySelector('.popup__type');
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


  const offerSpecification = templateElementClone.querySelector('.popup__text--capacity');
  offerSpecification.textContent = `${array[index].offer.rooms } комнаты для ${array[index].offer.guests} гостей`;
  if (offerSpecification.textContent === ''){
    offerSpecification.classList.add('hidden');
  }

  const offerTime = templateElementClone.querySelector('.popup__text--time');
  offerTime.textContent = `Заезд после ${array[index].offer.checkin}, выезд до ${array[index].offer.checkout}`;
  if (offerTime.textContent === '') {
    offerTime.classList.add('hidden');
  }

  const offerFeaturesList = templateElementClone.querySelector('.popup__features');
  const offerFeatureList = offerFeaturesList.querySelectorAll('.popup__feature');
  const offersList = array[index].offer.features;
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

  const offerDescription = templateElementClone.querySelector('.popup__description');
  offerDescription.textContent = array[index].offer.description;
  if (offerDescription.textContent === '') {
    offerDescription.classList.add('hidden');
  }

  const offerPhotosList = templateElementClone.querySelector('.popup__photos');
  const templateDefaultPhoto = offerPhotosList.querySelector('img');
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
