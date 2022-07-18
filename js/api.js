import { buttonDisabled} from './util.js';
import {addSuccesfulMessage, addErrorMessage} from './form-message.js';
import {closeModalWindow, formSubmitButton} from './form.js';
import { generetePublicationsArray } from './publications.js';

const DATA_SERVER = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER = 'https://26.javascript.pages.academy/kekstagram';

let publicationArray;
fetch(DATA_SERVER)
  .then((response) => response.json())
  .then((publications) => {
    publicationArray = publications;
    generetePublicationsArray(publicationArray);
  });
const sendForm = (formData) => {
  fetch(SERVER,
    {
      method: 'POST',
      body: formData,
    }
  )
    .catch(() => {
      addErrorMessage();
    }).then(() => {
      buttonDisabled(formSubmitButton, 'Публикуется...');
      closeModalWindow();
      addSuccesfulMessage();
    });
};

export {publicationArray, sendForm};
