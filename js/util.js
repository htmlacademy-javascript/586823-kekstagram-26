const getRandomNumber = (from, to) => {
  if(from <= 0 || to < 0) {return null;}
  if(from === to) {return from;}
  if(from > to) {return null;}

  return Math.round(Math.random() * (to - from) + from);
};

const getIsStringSizeAvailable = (string, availableLength) => string.length <= availableLength;

const isEscape = (evt) => evt.key === 'Escape';

const buttonDisabled = (button, message = button.textContent) => {
  button.disabled = true;
  button.textContent = message;
};

const buttonActive = (button, message = button.textContent) => {
  button.disabled = false;
  button.textContent = message;
};

export {getRandomNumber, getIsStringSizeAvailable, isEscape, buttonDisabled, buttonActive};
