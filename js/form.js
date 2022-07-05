import { isEscape } from './util.js';
import {changeEffect} from './publicationEffects.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const publicationEditor = form.querySelector('.img-upload__overlay');
const fileUploader = form.querySelector('#upload-file');
const picturePreview = form.querySelector('.img-upload__preview').querySelector('img');
const buttonCansel = form.querySelector('#upload-cancel');
const effectsPreview = form.querySelectorAll('.effects__preview');
const hashTagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-error-text'
});
// variables for scale picture
const buttonMinusScale = form.querySelector('.scale__control--smaller');
const buttonPlusScale = form.querySelector('.scale__control--bigger');
const inputScale = form.querySelector('.scale__control--value');
const stepScale = 25;
const effectInput = form.querySelector('.effect-level__value');
const effectSliderContainer = form.querySelector('.img-upload__effect-level');
const effectSlider = effectSliderContainer.querySelector('.effect-level__slider');
const effectRadios = form.querySelectorAll('.effects__radio');

// Function for scaleing picture
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

const closeModalWindow = () => {
  publicationEditor.classList.add('hidden');
  body.classList.remove('modal-open');
  fileUploader.value = '';
  hashTagInput.removeEventListener('focusout', addEscListenerOnHashTag);
  commentInput.removeEventListener('focusout', addEscListenerOnComment);
  hashTagInput.removeEventListener('focus', removeEscListenerOnHashTag);
  commentInput.removeEventListener('focus', removeEscListenerOnComment);
  buttonCansel.removeEventListener('click', onCloseButton);
  buttonCansel.removeEventListener('click', onCloseEscape);
  buttonMinusScale.removeEventListener('click', minusPictureScale);
  buttonMinusScale.removeEventListener('click', plusPictureScale);
  inputScale.value = '100%';
  picturePreview.style = '';
  picturePreview.classList = '';
  effectSlider.noUiSlider.destroy();
};

// function for close button
function onCloseButton() {
  closeModalWindow();
}
function onCloseEscape (evt) {
  if(isEscape(evt)) {
    closeModalWindow();
  }
}

// Function for remove and return Event listener on ESC in modal window
function removeEscListenerOnHashTag () {
  window.removeEventListener('keydown', onCloseEscape);
}
function addEscListenerOnHashTag () {
  window.addEventListener('keydown', onCloseEscape);
}
function removeEscListenerOnComment () {
  window.removeEventListener('keydown', onCloseEscape);
}
function addEscListenerOnComment () {
  window.addEventListener('keydown', onCloseEscape);
}

/*----------------FUNCTIONS FOR VALIDATION HASH-TAGS----------------*/
// Checking for max 5 hashTags
const hashTagCountValidate = (value) => {
  const hashTags = value.split(' ');
  if(hashTags.length > 5) {
    return false;
  }
  return true;
};

// Checking for regular expression
const hashTagTextValidate = (value) => {
  const hashTagTerms = /^#[A-Za-zA-Яа-яЁё0-9]{1,20}$/;
  const hashTags = value.split(' ');

  if (hashTags[0] !== '') {
    let notValidCounter = 0;
    hashTags.forEach((hashTag) => {
      if(!hashTagTerms.test(hashTag)) {
        notValidCounter++;
      }
    });
    if(notValidCounter > 0) {
      return false;
    }
  }
  return true;
};

// Checking for hashTags repetiton
const hashTagRepeatValidate = (value) => {
  const hashTags = value.split(' ');
  const hahTagsSet = new Set (hashTags);
  if (hahTagsSet.size !== hashTags.length) {
    return false;
  }

  return true;
};

// Function for validation comments
const commentValidate = (value) => {
  if(value.length > 140) {
    return false;
  }

  return true;
};


fileUploader.addEventListener('change', () => {
  // Show publication editor
  publicationEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  // Show uploaded picture
  const fileReader = new FileReader();
  fileReader.onload = (evt) => {
    picturePreview.src = evt.target.result;

    effectsPreview.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${picturePreview.src})`;
    });
  };
  fileReader.readAsDataURL(fileUploader.files[0]);
  picturePreview.style = '';

  // Cansel button
  buttonCansel.addEventListener('click', onCloseButton);
  window.addEventListener('keydown', onCloseEscape);


  /*----------------PICTURE SCALE----------------*/
  // Event listeners on + and - buttons
  inputScale.value = '100%';
  picturePreview.style.transform = 'scale(100%)';
  buttonMinusScale.addEventListener('click', minusPictureScale);
  buttonPlusScale.addEventListener('click', plusPictureScale);

  /*----------------EFFECTS----------------*/
  picturePreview.classList.add('effects__preview--none');
  effectSliderContainer.classList.add('hidden');
  noUiSlider.create(effectSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
  effectSlider.noUiSlider.on('update', () => {
    effectInput.value = effectSlider.noUiSlider.get();
  });
  effectRadios.forEach((effectRadio) => {
    effectRadio.addEventListener('change', changeEffect);
  });


  /*----------------INPUT VALIDATION----------------*/
  // Event listeners for use esc in focus in modal window
  hashTagInput.addEventListener('focus', removeEscListenerOnHashTag);
  commentInput.addEventListener('focus', removeEscListenerOnComment);
  hashTagInput.addEventListener('focusout', addEscListenerOnHashTag);
  commentInput.addEventListener('focusout', addEscListenerOnComment);

  // Pristine Validators
  pristine.addValidator(hashTagInput, hashTagCountValidate, 'Максимальное количество хэш-тегов 5');
  pristine.addValidator(hashTagInput, hashTagRepeatValidate, 'Хэш-теги не должны повторяться');
  pristine.addValidator(hashTagInput, hashTagTextValidate, 'Хэш-тег должен начинаться с # и содержать только буквы и символы');
  pristine.addValidator(commentInput, commentValidate, 'Максимальное количество символов 140');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
});

export {effectSlider, picturePreview, effectSliderContainer, inputScale};
