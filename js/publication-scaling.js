import {picturePreview, inputScale} from './form.js';

const stepScale = 25;

const minusPictureScale = () => {
  const inputScaleNumber = inputScale.value.split('%');
  if(inputScaleNumber[0] - stepScale <= stepScale) {
    inputScale.value = `${stepScale  }%`;
    inputScaleNumber[0] = stepScale;
  } else {
    inputScale.value = `${inputScaleNumber[0] - stepScale  }%`;
    inputScaleNumber[0] = inputScaleNumber[0] - stepScale;
  }
  picturePreview.style.transform = `scale(${inputScaleNumber[0]  }%)`;
};
const plusPictureScale = () => {
  const inputScaleArray = inputScale.value.split('%');
  let inputScaleNumber = Number(inputScaleArray[0]);
  if(inputScaleNumber + stepScale >= 100) {
    inputScale.value = '100%';
    inputScaleNumber = 100;
  } else {
    inputScale.value = `${inputScaleNumber + stepScale  }%`;
    inputScaleNumber = inputScaleNumber + stepScale;
  }
  picturePreview.style.transform = `scale(${inputScaleNumber  }%)`;
};

export {minusPictureScale, plusPictureScale};
