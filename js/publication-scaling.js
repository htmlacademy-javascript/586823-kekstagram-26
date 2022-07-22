import {picturePreview, inputScale} from './form.js';

const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const decreasePictureScale = () => {
  const inputScaleNumber = inputScale.value.split('%');
  if(inputScaleNumber[0] - STEP <= MIN_SCALE) {
    inputScale.value = `${MIN_SCALE  }%`;
    inputScaleNumber[0] = MIN_SCALE;
  } else {
    inputScale.value = `${inputScaleNumber[0] - STEP  }%`;
    inputScaleNumber[0] = inputScaleNumber[0] - STEP;
  }
  picturePreview.style.transform = `scale(${inputScaleNumber[0]  }%)`;
};
const increasePictureScale = () => {
  const inputScaleArray = inputScale.value.split('%');
  let inputScaleNumber = Number(inputScaleArray[0]);
  if(inputScaleNumber + STEP >= MAX_SCALE) {
    inputScale.value = `${MAX_SCALE  }%`;
    inputScaleNumber = MAX_SCALE;
  } else {
    inputScale.value = `${inputScaleNumber + STEP  }%`;
    inputScaleNumber = inputScaleNumber + STEP;
  }
  picturePreview.style.transform = `scale(${inputScaleNumber  }%)`;
};

export {decreasePictureScale as minusPictureScale, increasePictureScale as plusPictureScale};
