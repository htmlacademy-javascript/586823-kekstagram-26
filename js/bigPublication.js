import {publicationsArray} from './publications.js';
import {isEscape} from './util.js';

const pictures = document.querySelector('.pictures');
const bigPublication = document.querySelector('.big-picture');
const body = document.querySelector('body');
const shownCommentsCounter = bigPublication.querySelector('.comments-count-shown');
const commentsCounter = bigPublication.querySelector('.comments-count');
const loaderMoreComments = document.querySelector('.comments-loader');
const buttonCansel = document.querySelector('.big-picture__cancel');
const commentBlock = document.querySelector('.social__comments');
const commentTemplate = commentBlock.querySelector('.social__comment');


// Function for close button
const onCloseButton = () => {
  bigPublication.classList.add('hidden');
  body.classList.remove('modal-open');
  buttonCansel.removeEventListener('click', onCloseButton);
};
const onCloseEscape = (evt) => {
  if(isEscape(evt)) {
    bigPublication.classList.add('hidden');
    body.classList.remove('modal-open');
    window.removeEventListener('keydown', onCloseEscape);
  }
};

// loading more comments
const loadMoreComments = () => {
  const commentsCounterNumber = Number(commentsCounter.textContent);
  const shownCommentsNumber = Number(shownCommentsCounter.textContent);
  const allComments = commentBlock.querySelectorAll('.social__comment');
  const countPlusComments = 5;

  if(Number(shownCommentsCounter.textContent) + countPlusComments >= commentsCounterNumber) {
    shownCommentsCounter.textContent = commentsCounter.textContent;
  } else {
    shownCommentsCounter.textContent = Number(shownCommentsCounter.textContent) + countPlusComments;
  }

  for(let i = shownCommentsNumber; i < Number(shownCommentsCounter.textContent); i++) {
    allComments[i].classList.remove('hidden');
  }

  if(commentsCounterNumber === Number(shownCommentsCounter.textContent)) {
    loaderMoreComments.classList.add('hidden');
  }
};

const openBigPublication = (evt) => {
  const picture = evt.target.parentNode;

  if(picture.className !== 'picture') {
    return;
  }

  evt.preventDefault();

  // Cansel button
  buttonCansel.addEventListener('click', onCloseButton);
  window.addEventListener('keydown', onCloseEscape);

  // Drawing of bigPublication
  bigPublication.classList.remove('hidden');
  body.classList.add('modal-open');
  commentBlock.innerHTML = '';


  bigPublication.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPublication.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
  commentsCounter.textContent = picture.querySelector('.picture__comments').textContent;
  bigPublication.querySelector('.social__caption').textContent = picture.querySelector('.picture__comments').textContent;
  if(commentsCounter.textContent <= 5) {
    shownCommentsCounter.textContent = commentsCounter.textContent;
    loaderMoreComments.classList.add('hidden');
  } else {
    shownCommentsCounter.textContent = 5;
    loaderMoreComments.classList.remove('hidden');
  }

  // Drawing comments
  const id = picture.dataset.id;
  const commentsFragment = document.createDocumentFragment();
  let i = 0;
  for(const comment of publicationsArray[id].comments) {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    if(i >= 5) {
      commentElement.classList.add('hidden');
    }

    commentsFragment.appendChild(commentElement);
    i++;
  }

  commentBlock.appendChild(commentsFragment);

  loaderMoreComments.addEventListener('click', loadMoreComments);
};

pictures.addEventListener('click', openBigPublication);
