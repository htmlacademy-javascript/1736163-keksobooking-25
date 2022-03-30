
window.onload = function () {
  const form = document.querySelector('.ad-form');
  const typeField = form.querySelector('#type');
  let minPrice = 0;


  const pristine = new Pristine(form, {
    classTo: 'ad-form__element',
    errorTextParent: 'ad-form__element',
    errorTextClass: 'error-text',
    errorClass: 'ad-form__element--invalid',
    successClass: 'ad-form__element--valid',
    errorTextTag: 'span'
  });


  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });

  typeField.addEventListener ('change', ()=> {
    const typeFieldOption = typeField.value;
    function minPriceThreshold (value) {
      switch (value) {
        case 'bungalow':
          minPrice = 0;
          break;
        case 'flat':
          minPrice = 1000;
          break;
        case 'hotel':
          minPrice = 3000;
          break;
        case 'house':
          minPrice = 5000;
          break;
        case 'palace':
          minPrice = 10000;
          break;
      }
    }
    minPriceThreshold(typeFieldOption);
  });

  function validatePrice (value) {
    return value >= minPrice;
  }

  pristine.addValidator(form.querySelector('#price'), validatePrice, 'Цена ниже минимального значения');

  const roomNumberField = form.querySelector('[name = "rooms"]');
  const capacityField = form.querySelector('[name = "capacity"]');
  const capacityOption = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100':['0']

  };
  function validateCapacity () {
    return capacityOption[roomNumberField.value].includes(capacityField.value);
  }


  function getRoomNumberFieldErrorMessage(){
    return `Слишком много гостей для ${roomNumberField.value}
    ${roomNumberField.value === '1' ? 'комнаты' : 'комнат'}`;
  }
  pristine.addValidator(roomNumberField,validateCapacity, getRoomNumberFieldErrorMessage);
  pristine.addValidator(capacityField,validateCapacity, /*getCapacityErrorMessage*/);
};


export{};
