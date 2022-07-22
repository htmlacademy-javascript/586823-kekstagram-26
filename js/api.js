import { buttonDisabled} from './util.js';
import {addSuccesfulMessage, addErrorMessage} from './form-message.js';
import {closeFormWindow, formSubmitButtonElement} from './form.js';
import { generetePublicationsArray } from './publications.js';

const DATA_SERVER = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER = 'https://26.javascript.pages.academy/kekstagram';

const publicationsArray = [];
const generetePublications = () => {
  fetch(DATA_SERVER)
    .then((response) => response.json())
    .then((publications) => {
      publications.forEach((publication, i) => {
        publicationsArray[i] = publication;
      });
      generetePublicationsArray(publicationsArray);
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
        buttonDisabled(formSubmitButtonElement, 'Публикуется...');
        closeFormWindow();
        addSuccesfulMessage();
      }
    });
};

export {publicationsArray, sendForm, generetePublications};
