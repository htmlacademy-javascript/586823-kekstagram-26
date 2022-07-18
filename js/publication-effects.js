import {effectSlider, picturePreview, effectSliderContainer, inputScale} from './form.js';

const changeInputStyleValue = (effectStyle) => {
  switch(effectStyle) {
    case 'grayscale':
    case 'sepia':
    case 'brightness':
      effectSlider.noUiSlider.on('update', () => {
        picturePreview.style.filter = `${effectStyle}(${  effectSlider.noUiSlider.get()})`;
      });
      break;
    case 'invert':
      effectSlider.noUiSlider.on('update', () => {
        picturePreview.style.filter = `${effectStyle}(${  effectSlider.noUiSlider.get()}%)`;
      });
      break;
    case 'blur':
      effectSlider.noUiSlider.on('update', () => {
        picturePreview.style.filter = `${effectStyle}(${  effectSlider.noUiSlider.get()}px)`;
      });
      break;
  }
};

const changeEffect = (evt) => {
  // reset
  picturePreview.classList = '';
  picturePreview.style = '';
  picturePreview.style.transform = `scale(${  inputScale.value})`;
  const effectName = evt.target.id.split('-');
  picturePreview.classList.add(`effects__preview--${  effectName[1]}`);

  // range slider
  if (picturePreview.classList.contains('effects__preview--none')) {
    effectSliderContainer.classList.add('hidden');
  } else {
    effectSliderContainer.classList.remove('hidden');
    switch(effectName[1]) {
      case 'chrome':
        effectSlider.noUiSlider.updateOptions({
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
        effectSlider.noUiSlider.updateOptions({
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
        effectSlider.noUiSlider.updateOptions({
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
        effectSlider.noUiSlider.updateOptions({
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
        effectSlider.noUiSlider.updateOptions({
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
  picturePreview.style.transform = inputScale.value;
};

export {changeEffect};
