import {addSuccesfulMessage, addErrorMessage} from './form-message.js';
import {closeFormWindow} from './form.js';
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
  fetch(SERVER,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => {
      if(response.ok) {
        closeFormWindow();
        addSuccesfulMessage();
      } else {
        addErrorMessage();
      }
    }).catch(() => {
      addErrorMessage();
    });
};

export {publications, sendForm, generatePublications};
