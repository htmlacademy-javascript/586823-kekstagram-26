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

const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};

export {getRandomNumber, getIsStringSizeAvailable, isEscape, buttonDisabled, buttonActive, debounce};
