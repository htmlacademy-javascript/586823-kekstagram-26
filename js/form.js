import { isEscape } from './util.js';

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

// Functions for validation hashTags
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
  if(hashTags.length >= 2) {
    for(let i = 0; i < hashTags.length - 1; i++) {
      for(let j = i + 1; j < hashTags.length; j++) {
        if (hashTags[i] === (hashTags[j]).toLowerCase()) {
          return false;
        }
      }
    }
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

  // Cansel button
  buttonCansel.addEventListener('click', onCloseButton);
  window.addEventListener('keydown', onCloseEscape);

  // Event listeners for use esc in focus in modal window
  hashTagInput.addEventListener('focus', removeEscListenerOnHashTag);
  commentInput.addEventListener('focus', removeEscListenerOnComment);
  hashTagInput.addEventListener('focusout', addEscListenerOnHashTag);
  commentInput.addEventListener('focusout', addEscListenerOnComment);

  pristine.addValidator(hashTagInput, hashTagCountValidate, 'Максимальное количество хэш-тегов 5');
  pristine.addValidator(hashTagInput, hashTagRepeatValidate, 'Хэш-теги не должны повторяться');
  pristine.addValidator(hashTagInput, hashTagTextValidate, 'Хэш-тег должен начинаться с # и содержать только буквы и символы');
  pristine.addValidator(commentInput, commentValidate, 'Максимальное количество символов 140');

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
});
