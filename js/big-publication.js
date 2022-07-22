import {publicationArray} from './api.js';
import {isEscape} from './util.js';

const COMMENTS_PORTION = 5;

const pictures = document.querySelector('.pictures');
const bigPublication = document.querySelector('.big-picture');
const body = document.querySelector('body');
const shownCommentsCounter = bigPublication.querySelector('.comments-count-shown');
const commentsCounter = bigPublication.querySelector('.comments-count');
const loaderMoreComments = document.querySelector('.comments-loader');
const buttonCancel = document.querySelector('.big-picture__cancel');
const commentBlock = document.querySelector('.social__comments');
const commentTemplate = commentBlock.querySelector('.social__comment');

// loading more comments
const loadMoreComments = () => {
  const commentsCounterNumber = Number(commentsCounter.textContent);
  const shownCommentsNumber = Number(shownCommentsCounter.textContent);
  const allComments = commentBlock.querySelectorAll('.social__comment');


  if(Number(shownCommentsCounter.textContent) + COMMENTS_PORTION >= commentsCounterNumber) {
    shownCommentsCounter.textContent = commentsCounter.textContent;
  } else {
    shownCommentsCounter.textContent = Number(shownCommentsCounter.textContent) + COMMENTS_PORTION;
  }

  for(let i = shownCommentsNumber; i < Number(shownCommentsCounter.textContent); i++) {
    allComments[i].classList.remove('hidden');
  }

  if(commentsCounterNumber === Number(shownCommentsCounter.textContent)) {
    loaderMoreComments.classList.add('hidden');
  }
};

const closeModalWindow = () => {
  bigPublication.classList.add('hidden');
  body.classList.remove('modal-open');
  buttonCancel.removeEventListener('click', onButtonClose);
  window.removeEventListener('keydown', onEscapeClose);
  loaderMoreComments.removeEventListener('click', loadMoreComments);
};

// Function for close button
function onButtonClose() {
  closeModalWindow();
}
function onEscapeClose(evt) {
  if(isEscape(evt)) {
    closeModalWindow();
  }
}

const onPublicationOpen = (evt) => {
  const picture = evt.target.parentNode;

  if(picture.className !== 'picture') {
    return;
  }

  evt.preventDefault();

  // Cansel button
  buttonCancel.addEventListener('click', onButtonClose);
  window.addEventListener('keydown', onEscapeClose);

  // Drawing of bigPublication
  bigPublication.classList.remove('hidden');
  body.classList.add('modal-open');
  commentBlock.innerHTML = '';


  bigPublication.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPublication.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
  commentsCounter.textContent = picture.querySelector('.picture__comments').textContent;
  bigPublication.querySelector('.social__caption').textContent = picture.querySelector('.picture__comments').textContent;
  if(commentsCounter.textContent <= COMMENTS_PORTION) {
    shownCommentsCounter.textContent = commentsCounter.textContent;
    loaderMoreComments.classList.add('hidden');
  } else {
    shownCommentsCounter.textContent = COMMENTS_PORTION;
    loaderMoreComments.classList.remove('hidden');
  }

  // Drawing comments
  const id = picture.dataset.id;
  const commentsFragment = document.createDocumentFragment();

  let i = 0;
  publicationArray[id].comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    if(i >= COMMENTS_PORTION) {
      commentElement.classList.add('hidden');
    }

    commentsFragment.appendChild(commentElement);
    i++;
  });

  commentBlock.appendChild(commentsFragment);

  loaderMoreComments.addEventListener('click', loadMoreComments);
};

const openPublication = () => {
  pictures.addEventListener('click', onPublicationOpen);
};

export {openPublication};
