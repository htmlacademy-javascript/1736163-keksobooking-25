const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooserElement = document.querySelector('#avatar');
const offerImageChooserElement = document.querySelector('#images');
const previewFieldElement = document.querySelector('.ad-form-header__preview');
const imagePlaceholderElement = previewFieldElement.querySelector('img');
const offerImagePlaceholderElement = document.querySelector('.ad-form__photo');
const PHOTO_WIDTH = 70;
const PHOTO_HEIGHT = 70;

// Форма фотографии аватара

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePlaceholderElement.src = URL.createObjectURL(file);
  }
});

// Форма фотографии объекта

offerImageChooserElement.addEventListener('change', () => {
  const file = offerImageChooserElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const newPhotoElement = document.createElement('img');
    newPhotoElement.src = URL.createObjectURL(file);
    newPhotoElement.setAttribute('height', PHOTO_HEIGHT);
    newPhotoElement.setAttribute('width', PHOTO_WIDTH);
    newPhotoElement.setAttribute('alt', 'Ваша фотография');
    offerImagePlaceholderElement.append(newPhotoElement);
  }
});

export{imagePlaceholderElement as imagePlaceholder, offerImagePlaceholderElement as offerImagePlaceholder};
