import {form} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooser = form.querySelector('#avatar');
const imagesInput = form.querySelector('#images');
const preview = form.querySelector('.ad-form-header__preview');
const imagePlaceholder = preview.querySelector('img');
const offerImagePlaceholder = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imagePlaceholder.src = URL.createObjectURL(file);
  }
});

imagesInput.addEventListener('change', () => { //Загружается, но не отображается картинка
  const file = imagesInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const newPhoto = document.createElement('img');
    newPhoto.src = URL.createObjectURL(new Blob);
    newPhoto.setAttribute('height', 70);
    newPhoto.setAttribute('width', 70);
    newPhoto.setAttribute('style', 'margin-left: 10px');
    newPhoto.setAttribute('alt', 'Ваша фотография');
    offerImagePlaceholder.replaceWith(newPhoto);
  }
});

export{};
