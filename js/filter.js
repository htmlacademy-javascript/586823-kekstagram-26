import {publications} from './api.js';
import { generatePublicationsArray } from './publications.js';
import {debounce} from './util.js';

const RANDOM_PUBLICATIONS_LIMIT = 10;

const filterElement = document.querySelector('.img-filters');
const buttonContainerElement = filterElement.querySelector('.img-filters__form');
const buttonsElements = buttonContainerElement.querySelectorAll('.img-filters__button');
filterElement.classList.remove('img-filters--inactive');

const showRandomPublications = (publicationCount, publications) => {
  const shuffledPublications = [];
  const notUsedIndexes = [];
  const randomUniqueIndexes = [];
  publications.forEach((element, i) => {
    notUsedIndexes[i] = i;
  });

  for (let i = 0; i < publicationCount; i++) {
    let randomIndex;
    do {
      randomIndex = Math.round(Math.random() * (notUsedIndexes.length - 1));
    } while (notUsedIndexes[randomIndex] === 'q');

    randomUniqueIndexes[i] = notUsedIndexes[randomIndex];
    notUsedIndexes[randomIndex] = 'q';
  }
  randomUniqueIndexes.forEach((randomIndex, i) => {
    shuffledPublications[i] = publications[randomIndex];
  });
  generatePublicationsArray(shuffledPublications, false);
};

const showAllPublications = () => {
  generatePublicationsArray(publications, false);
};

const showPopularPublication = () => {
  const copiedPublications = publications.slice(0);
  copiedPublications.sort((a, b) => {
    const aComments = a.comments.length;
    const bComments = b.comments.length;
    return bComments - aComments;
  });
  generatePublicationsArray(copiedPublications, false);
};

const changeFilter = (evt) => {
  // active button's styles
  const activeButton = evt.target;
  buttonsElements.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');

  if(activeButton.id === 'filter-random') {
    showRandomPublications(RANDOM_PUBLICATIONS_LIMIT, publications);
  } else if (activeButton.id === 'filter-default') {
    showAllPublications();
  } else if (activeButton.id === 'filter-discussed') {
    showPopularPublication();
  }
};

const addFilterListener = () => {
  buttonContainerElement.addEventListener('click', debounce(changeFilter));
};

export {addFilterListener};
