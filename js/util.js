function getRandomNumberInclusive(min, max, decimal) {

  return (Math.random() * (max - min) + min).toFixed(decimal);
}

function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomNumber(from, to) {
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

export{getRandomNumberInclusive, getRandomPositiveInteger,getRandomNumber, getRandomArrayElement};
