import {simillarOffers} from './data.js';

const templateElement = document.querySelector('#card').content; // весь список
const mapElement = document.querySelector('#map-canvas'); // Карта, куда добавлять темплатку



const getOffer = function (index) {

  const templateElementClone = templateElement.cloneNode(true); // создали клон

  const templateAuthor = templateElementClone.querySelector('.popup__avatar'); // Картинка
  templateAuthor.src = simillarOffers[index].author.avatar;

  const offerTitle = templateElementClone.querySelector('.popup__title');//титул
  offerTitle.textContent = simillarOffers[index].offer.title;
  if (offerTitle.textContent === '') {
    offerTitle.classList.add('hidden');
  }

  const offerAddress = templateElementClone.querySelector('.popup__text--address');//адресс
  offerAddress.textContent = `${simillarOffers[index].offer.adress.lat  } ${  simillarOffers[index].offer.adress.lng}`;
  if (offerAddress.textContent === '') {
    offerAddress.classList.add('hidden');
  }

  const offerPrice = templateElementClone.querySelector('.popup__text--price');//цена
  offerPrice.textContent = `${simillarOffers[index].offer.price  } ₽/ночь`;
  if (offerPrice.textContent === '') {
    offerPrice.classList.add('hidden');
  }

  const offerType = templateElementClone.querySelector('.popup__type');//тип жилья
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


  const offerSpecification = templateElementClone.querySelector('.popup__text--capacity');//спецификация
  offerSpecification.textContent = `${simillarOffers[index].offer.rooms } комнаты для ${simillarOffers[index].offer.guests} гостей`;
  if (offerSpecification.textContent === ''){
    offerSpecification.classList.add('hidden');
  }

  const offerTime = templateElementClone.querySelector('.popup__text--time');//время заезда-выезда
  offerTime.textContent = `Заезд после ${simillarOffers[index].offer.checkin}, выезд до ${simillarOffers[index].offer.checkout}`;
  if (offerTime.textContent === '') {
    offerTime.classList.add('hidden');
  }

  const offerFeaturesList = templateElementClone.querySelector('.popup__features');//дополнительные удобства
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

  const offerDescription = templateElementClone.querySelector('.popup__description');//описание
  offerDescription.textContent = simillarOffers[index].offer.description;
  if (offerDescription.textContent === '') {
    offerDescription.classList.add('hidden');
  }

  const offerPhotosList = templateElementClone.querySelector('.popup__photos');//фотокарточки
  const templateDefaultPhoto = offerPhotosList.querySelector('img');
  offerPhotosList.removeChild(templateDefaultPhoto);// Возможно не потребуется если выполнить следущий шаг.
  const offerPhotoList = simillarOffers[index].offer.photos;
  offerPhotoList.forEach((value) => {
    const templatePhoto = templateDefaultPhoto.cloneNode(true);
    offerPhotosList.append(templatePhoto);
    templatePhoto.src = value;
  });


  mapElement.appendChild(templateElementClone); //вроде как получается сюда все тыкать последняя строка
};
export{getOffer};
