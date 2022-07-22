import {picturePreviewElement, inputScaleElement} from './form.js';

const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const decreasePictureScale = () => {
  const inputScaleNumber = inputScaleElement.value.split('%');
  if(inputScaleNumber[0] - STEP <= MIN_SCALE) {
    inputScaleElement.value = `${MIN_SCALE  }%`;
    inputScaleNumber[0] = MIN_SCALE;
  } else {
    inputScaleElement.value = `${inputScaleNumber[0] - STEP  }%`;
    inputScaleNumber[0] = inputScaleNumber[0] - STEP;
  }
  picturePreviewElement.style.transform = `scale(${inputScaleNumber[0]  }%)`;
};
const increasePictureScale = () => {
  const inputScaleArray = inputScaleElement.value.split('%');
  let inputScaleNumber = Number(inputScaleArray[0]);
  if(inputScaleNumber + STEP >= MAX_SCALE) {
    inputScaleElement.value = `${MAX_SCALE  }%`;
    inputScaleNumber = MAX_SCALE;
  } else {
    inputScaleElement.value = `${inputScaleNumber + STEP  }%`;
    inputScaleNumber = inputScaleNumber + STEP;
  }
  picturePreviewElement.style.transform = `scale(${inputScaleNumber  }%)`;
};

export {decreasePictureScale, increasePictureScale};
