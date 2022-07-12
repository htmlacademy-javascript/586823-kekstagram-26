import {isEscape} from './util.js';

const body = document.querySelector('body');
const succesfulMessageTemplate = body.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = body.querySelector('#error').content.querySelector('.error');

const addSuccesfulMessage = () => {
  const messageElement = succesfulMessageTemplate.cloneNode(true);
  const successButton = messageElement.querySelector('.success__button');

  function deleteMessage() {
    messageElement.remove();
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

  body.append(messageElement);
  successButton.addEventListener('click', deleteMessageButton);
  window.addEventListener('keydown', deleteMessageEsc);
  window.addEventListener('click', deleteMessageClick);
};

const addErrorMessage = () => {
  const messageElement = errorMessageTemplate.cloneNode(true);
  const errorButton = messageElement.querySelector('.error__button');
  messageElement.style = 'z-index: 2';

  function deleteMessage() {
    messageElement.remove();
    errorButton.removeEventListener('click', deleteMessageButton);
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
    if(evt.target.classList.contains('error')) {
      deleteMessage();
    }
  }

  body.append(messageElement);
  errorButton.addEventListener('click', deleteMessageButton);
  window.addEventListener('keydown', deleteMessageEsc);
  window.addEventListener('click', deleteMessageClick);
};

export {addSuccesfulMessage, addErrorMessage};
