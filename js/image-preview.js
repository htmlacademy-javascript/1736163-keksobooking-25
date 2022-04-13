const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooser = document.querySelector('#avatar');
const offerImageChooser = document.querySelector('#images');
const previewField = document.querySelector('.ad-form-header__preview');
const imagePlaceholder = previewField.querySelector('img');
const offerImagePlaceholder = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePlaceholder.src = URL.createObjectURL(file);
  }
});

offerImageChooser.addEventListener('change', () => { //Загружается, но не отображается картинка
  const file = offerImageChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const newPhoto = document.createElement('img');
    newPhoto.src = URL.createObjectURL(file);
    newPhoto.setAttribute('height', 70);
    newPhoto.setAttribute('width', 70);
    newPhoto.setAttribute('alt', 'Ваша фотография');
    offerImagePlaceholder.append(newPhoto);
  }
});

export{imagePlaceholder, offerImagePlaceholder};
