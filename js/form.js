import { isEscape, buttonActive } from './util.js';
import {hashTagCountValidate, hashTagTextValidate, hashTagRepeatValidate, commentValidate} from './ValidationFunctions.js';
import {minusPictureScale, plusPictureScale} from './publicationScaling.js';
import {changeEffect} from './publicationEffects.js';
import {sendForm} from './api.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const publicationEditor = form.querySelector('.img-upload__overlay');
const fileUploader = form.querySelector('#upload-file');
const picturePreview = form.querySelector('.img-upload__preview').querySelector('img');
const buttonCansel = form.querySelector('#upload-cancel');
const effectsPreview = form.querySelectorAll('.effects__preview');
const hashTagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const formSubmitButton = form.querySelector('.img-upload__submit');
const inputContainers = form.querySelectorAll('.img-upload__field-wrapper');
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
const effectInput = form.querySelector('.effect-level__value');
const effectSliderContainer = form.querySelector('.img-upload__effect-level');
const effectSlider = effectSliderContainer.querySelector('.effect-level__slider');
const effectRadios = form.querySelector('.effects__list');
const effectRadioNone = form.querySelector('#effect-none');
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
  hashTagInput.value = '';
  picturePreview.classList = '';
  picturePreview.style = '';
  effectRadioNone.checked = true;
  effectSlider.noUiSlider.reset();
  inputContainers.forEach((container) => {
    container.classList.remove('img-upload__field-wrapper--error');
  });
  buttonActive(formSubmitButton, 'Опубликовать');
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
  effectSlider.noUiSlider.on('update', () => {
    effectInput.value = effectSlider.noUiSlider.get();
  });

  effectRadios.addEventListener('change', changeEffect);


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
    if(pristine.validate()) {
      const formData = new FormData(evt.target);
      sendForm(formData);
    }
  });
});

export {effectSlider, picturePreview, effectSliderContainer, inputScale, closeModalWindow, formSubmitButton};
