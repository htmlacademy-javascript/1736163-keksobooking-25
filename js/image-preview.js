const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooser = document.querySelector('#avatar');
const offerImageChooser = document.querySelector('#images');
const previewField = document.querySelector('.ad-form-header__preview');
const imagePlaceholder = previewField.querySelector('img');
const offerImagePlaceholder = document.querySelector('.ad-form__photo');
const PHOTO_WIDTH = 70;
const PHOTO_HEIGHT = 70;
// Форма фотографии аватара

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePlaceholder.src = URL.createObjectURL(file);
  }
});

// Форма фотографии объекта

offerImageChooser.addEventListener('change', () => {
  const file = offerImageChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const newPhoto = document.createElement('img');
    newPhoto.src = URL.createObjectURL(file);
    newPhoto.setAttribute('height', PHOTO_HEIGHT);
    newPhoto.setAttribute('width', PHOTO_WIDTH);
    newPhoto.setAttribute('alt', 'Ваша фотография');
    offerImagePlaceholder.append(newPhoto);
  }
});

export{imagePlaceholder, offerImagePlaceholder};
