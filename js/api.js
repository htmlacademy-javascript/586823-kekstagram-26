import { buttonDisabled} from './util.js';
import {addSuccesfulMessage, addErrorMessage} from './form-message.js';
import {closeFormWindow, formSubmitButtonElement} from './form.js';
import { generatePublicationsArray } from './publications.js';

const DATA_SERVER = 'https://26.javascript.pages.academy/kekstagram/data';
const SERVER = 'https://26.javascript.pages.academy/kekstagram';

const publications = [];
const generatePublications = () => {
  fetch(DATA_SERVER)
    .then((response) => response.json())
    .then((loadedPublications) => {
      loadedPublications.forEach((publication, i) => {
        publications[i] = publication;
      });
      generatePublicationsArray(publications);
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

export {publications, sendForm, generatePublications};
