//Взято по ссылке 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random'
function getRandomIntInclusive(min, max) {
  if (max < min) {
    return 'Неверные данные ввода';
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(2,5);

function getRandomNumberInclusive(min, max, decimal) {
  if (max < min) {
    return 'Неверные данные ввода';
  }
  return (Math.random() * (max - min) + min).toFixed(decimal);
}
getRandomNumberInclusive(1, 10, 2);
