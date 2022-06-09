const getRandomNumber = function(from, to) {
  if(!(from >= 0) && !(to > 0)) {return null;}
  if(from === to) {return from;}
  if(from > to) {return null;}

  return Math.random() * (to - from) + from;
};
getRandomNumber(0,1);

const isStringSizeAvailable = function(string, availableLength) {
  if(string.length <= availableLength) {return true;}

  return false;
};

isStringSizeAvailable('hi', 5);
