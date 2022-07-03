const getRandomNumber = (from, to) => {
  if(from <= 0 || to < 0) {return null;}
  if(from === to) {return from;}
  if(from > to) {return null;}

  return Math.round(Math.random() * (to - from) + from);
};

const getIsStringSizeAvailable = (string, availableLength) => {
  if(string.length <= availableLength) {return true;}

  return false;
};
getIsStringSizeAvailable('hi', 5);

const isEscape = (evt) => evt.key === 'Escape';

export {getRandomNumber, getIsStringSizeAvailable, isEscape};
