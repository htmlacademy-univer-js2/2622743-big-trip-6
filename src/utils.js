const getRandomNumber = (x = 0, y = 1) => {
  const lowerBorder = Math.ceil(Math.min(x, y));
  const upperBorder = Math.floor(Math.max(x, y));

  return Math.floor(lowerBorder + Math.random() * (upperBorder - lowerBorder + 1));
};

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

export { getRandomNumber, getRandomArrayElement };
