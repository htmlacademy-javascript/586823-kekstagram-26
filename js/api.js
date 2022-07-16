import { buttonDisabled} from './util.js';
import {addSuccesfulMessage, addErrorMessage} from './formMessage.js';
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
let isError = false;
const sendForm = (formData) => {
  fetch(SERVER,
    {
      method: 'POST',
      body: formData,
    }
  )
    .catch(() => {
      addErrorMessage();
      isError = true;
    }).then(() => {
      if(!isError) {
        buttonDisabled(formSubmitButton, 'Публикуется...');
        closeModalWindow();
        addSuccesfulMessage();
      }
    });
};

export {publicationArray, sendForm};
