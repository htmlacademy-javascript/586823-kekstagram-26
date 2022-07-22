import { buttonDisabled} from './util.js';
import {addSuccesfulMessage, addErrorMessage} from './form-message.js';
import {closeModalWindow, formSubmitButton} from './form.js';
import { generetePublicationsArray } from './publications.js';

const DATA_SERVER = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER = 'https://26.javascript.pages.academy/kekstagram';

let publicationArray;
const generetePublications = () => {
  fetch(DATA_SERVER)
    .then((response) => response.json())
    .then((publications) => {
      publicationArray = publications;
      generetePublicationsArray(publicationArray);
    });
};

const sendForm = (formData) => {
  let isError = false;
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

export {publicationArray, sendForm, generetePublications};
