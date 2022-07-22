import {publicationsArray} from './api.js';
import { generetePublicationsArray } from './publications.js';
import {debounce} from './util.js';

const RANDOM_PUBLICATIONS_LIMIT = 10;

const filterElement = document.querySelector('.img-filters');
const buttonContainerElement = filterElement.querySelector('.img-filters__form');
const buttonsElements = buttonContainerElement.querySelectorAll('.img-filters__button');
filterElement.classList.remove('img-filters--inactive');

const showRandomPublications = (publicationCount, publicationsArr) => {
  const publicationsForRegenerate = [];
  const indexsNotUsed = [];
  const indexsRandomUniq = [];
  publicationsArr.forEach((element, i) => {
    indexsNotUsed[i] = i;
  });

  for (let i = 0; i < publicationCount; i++) {
    let randomIndex;
    do {
      randomIndex = Math.round(Math.random() * (indexsNotUsed.length - 1));
    } while (indexsNotUsed[randomIndex] === 'q');

    indexsRandomUniq[i] = indexsNotUsed[randomIndex];
    indexsNotUsed[randomIndex] = 'q';
  }
  indexsRandomUniq.forEach((randomIndex, i) => {
    publicationsForRegenerate[i] = publicationsArray[randomIndex];
  });
  generetePublicationsArray(publicationsForRegenerate, false);
};

const shownAllPublications = () => {
  generetePublicationsArray(publicationsArray, false);
};

const showPopularPublication = () => {
  const pupublicationsArrayCopy = publicationsArray.slice(0);
  pupublicationsArrayCopy.sort((a, b) => {
    const aComments = a.comments.length;
    const bComments = b.comments.length;
    return bComments - aComments;
  });
  generetePublicationsArray(pupublicationsArrayCopy, false);
};

const changeFilter = (evt) => {
  // active button's styles
  const activeButton = evt.target;
  buttonsElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');

  if(activeButton.id === 'filter-random') {
    showRandomPublications(RANDOM_PUBLICATIONS_LIMIT, publicationsArray);
  } else if (activeButton.id === 'filter-default') {
    shownAllPublications();
  } else if (activeButton.id === 'filter-discussed') {
    showPopularPublication();
  }
};

const addFilterListener = () => {
  buttonContainerElement.addEventListener('click', debounce(changeFilter));
};

export {addFilterListener};
