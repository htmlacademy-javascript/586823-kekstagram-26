import {isEscape} from './util.js';
import { onKeydown } from './form.js';

const bodyElement = document.querySelector('body');
const succesfulMessageTemplateElement = bodyElement.querySelector('#success').content.querySelector('.success');
const errorMessageTemplateElement = bodyElement.querySelector('#error').content.querySelector('.error');

const addSuccesfulMessage = () => {
  const messageElement = succesfulMessageTemplateElement.cloneNode(true);
  const successButton = messageElement.querySelector('.success__button');

  function deleteMessage() {
    bodyElement.querySelector('.success').remove();
    successButton.removeEventListener('click', deleteMessageButton);
    window.removeEventListener('keydown', deleteMessageEsc);
    window.removeEventListener('click', deleteMessageClick);
  }

  function deleteMessageButton () {
    deleteMessage();
  }
  function deleteMessageEsc (evt) {
    if(isEscape(evt)) {
      deleteMessage();
    }
  }
  function deleteMessageClick (evt) {
    if(evt.target.classList.contains('success')) {
      deleteMessage();
    }
  }

  bodyElement.append(messageElement);
  successButton.addEventListener('click', deleteMessageButton);
  window.addEventListener('keydown', deleteMessageEsc);
  window.addEventListener('click', deleteMessageClick);
};

const addErrorMessage = () => {
  const messageElement = errorMessageTemplateElement.cloneNode(true);
  const errorButton = messageElement.querySelector('.error__button');
  messageElement.style = 'z-index: 2';

  function deleteMessage() {
    bodyElement.querySelector('.error').remove();
    errorButton.removeEventListener('click', deleteMessageButton);
    window.removeEventListener('keydown', deleteMessageEsc);
    window.removeEventListener('click', deleteMessageClick);
    window.addEventListener('keydown', onKeydown);
  }

  function deleteMessageButton () {
    deleteMessage();
  }
  function deleteMessageEsc (evt) {
    if(isEscape(evt)) {
      deleteMessage();
    }
  }
  function deleteMessageClick (evt) {
    if(evt.target.classList.contains('error')) {
      deleteMessage();
    }
  }

  bodyElement.append(messageElement);
  errorButton.addEventListener('click', deleteMessageButton);
  window.addEventListener('keydown', deleteMessageEsc);
  window.addEventListener('click', deleteMessageClick);
  window.removeEventListener('keydown', onKeydown);
};

export {addSuccesfulMessage, addErrorMessage};
