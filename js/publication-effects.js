import {effectSliderElement, picturePreviewElement, effectSliderContainerElement, inputScaleElement} from './form.js';

const changeInputStyleValue = (effectStyle) => {
  switch(effectStyle) {
    case 'grayscale':
    case 'sepia':
    case 'brightness':
      effectSliderElement.noUiSlider.on('update', () => {
        picturePreviewElement.style.filter = `${effectStyle}(${  effectSliderElement.noUiSlider.get()})`;
      });
      break;
    case 'invert':
      effectSliderElement.noUiSlider.on('update', () => {
        picturePreviewElement.style.filter = `${effectStyle}(${  effectSliderElement.noUiSlider.get()}%)`;
      });
      break;
    case 'blur':
      effectSliderElement.noUiSlider.on('update', () => {
        picturePreviewElement.style.filter = `${effectStyle}(${  effectSliderElement.noUiSlider.get()}px)`;
      });
      break;
  }
};

const changeEffect = (evt) => {
  // reset
  picturePreviewElement.classList = '';
  picturePreviewElement.style = '';
  picturePreviewElement.style.transform = `scale(${  inputScaleElement.value})`;
  const effectName = evt.target.id.split('-');
  picturePreviewElement.classList.add(`effects__preview--${  effectName[1]}`);

  // range slider
  if (picturePreviewElement.classList.contains('effects__preview--none')) {
    effectSliderContainerElement.classList.add('hidden');
  } else {
    effectSliderContainerElement.classList.remove('hidden');
    switch(effectName[1]) {
      case 'chrome':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
          start: 1,
        });
        changeInputStyleValue('grayscale');
        break;
      case 'sepia':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          step: 0.1,
          start: 1,
        });
        changeInputStyleValue('sepia');
        break;
      case 'marvin':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          step: 1,
          start: 100,
        });
        changeInputStyleValue('invert');
        break;
      case 'phobos':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        changeInputStyleValue('blur');
        break;
      case 'heat':
        effectSliderElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          step: 0.1,
          start: 3,
        });
        changeInputStyleValue('brightness');
        break;
    }
  }
  picturePreviewElement.style.transform = inputScaleElement.value;
};

export {changeEffect};
