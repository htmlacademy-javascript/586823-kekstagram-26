import {generetePublicationsArray} from './publications.js';

let publicationArray;
fetch('https://26.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((publications) => {
    publicationArray = publications;
    generetePublicationsArray(publications);
  });

export {publicationArray};
