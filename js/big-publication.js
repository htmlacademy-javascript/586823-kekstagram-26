import {publicationsArray} from './api.js';
import {isEscape} from './util.js';

const COMMENTS_PORTION = 5;

const bodyElement = document.querySelector('body');
const picturesContainerElement = bodyElement.querySelector('.pictures');
const bigPublicationElement = bodyElement.querySelector('.big-picture');
const shownCommentsCounterElement = bigPublicationElement.querySelector('.comments-count-shown');
const commentsCounterElement = bigPublicationElement.querySelector('.comments-count');
const loaderMoreCommentsElement = bodyElement.querySelector('.comments-loader');
const buttonCancelElement = bodyElement.querySelector('.big-picture__cancel');
const commentBlockElement = bodyElement.querySelector('.social__comments');
const commentTemplateElement = commentBlockElement.querySelector('.social__comment');

// loading more comments
const loadMoreComments = () => {
  const commentsCounterNumber = Number(commentsCounterElement.textContent);
  const shownCommentsNumber = Number(shownCommentsCounterElement.textContent);
  const allComments = commentBlockElement.querySelectorAll('.social__comment');


  if(Number(shownCommentsCounterElement.textContent) + COMMENTS_PORTION >= commentsCounterNumber) {
    shownCommentsCounterElement.textContent = commentsCounterElement.textContent;
  } else {
    shownCommentsCounterElement.textContent = Number(shownCommentsCounterElement.textContent) + COMMENTS_PORTION;
  }

  for(let i = shownCommentsNumber; i < Number(shownCommentsCounterElement.textContent); i++) {
    allComments[i].classList.remove('hidden');
  }

  if(commentsCounterNumber === Number(shownCommentsCounterElement.textContent)) {
    loaderMoreCommentsElement.classList.add('hidden');
  }
};

const closePublicationWindow = () => {
  bigPublicationElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  buttonCancelElement.removeEventListener('click', onButtonClose);
  window.removeEventListener('keydown', onEscapeClose);
  loaderMoreCommentsElement.removeEventListener('click', loadMoreComments);
};

// Function for close button
function onButtonClose() {
  closePublicationWindow();
}
function onEscapeClose(evt) {
  if(isEscape(evt)) {
    closePublicationWindow();
  }
}

const onPublicationOpen = (evt) => {
  const picture = evt.target.parentNode;

  if(picture.className !== 'picture') {
    return;
  }

  evt.preventDefault();

  // Cansel button
  buttonCancelElement.addEventListener('click', onButtonClose);
  window.addEventListener('keydown', onEscapeClose);

  // Drawing of bigPublication
  bigPublicationElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentBlockElement.innerHTML = '';


  bigPublicationElement.querySelector('.big-picture__img').querySelector('img').src = picture.querySelector('.picture__img').src;
  bigPublicationElement.querySelector('.likes-count').textContent = picture.querySelector('.picture__likes').textContent;
  commentsCounterElement.textContent = picture.querySelector('.picture__comments').textContent;
  bigPublicationElement.querySelector('.social__caption').textContent = picture.querySelector('.picture__comments').textContent;
  if(commentsCounterElement.textContent <= COMMENTS_PORTION) {
    shownCommentsCounterElement.textContent = commentsCounterElement.textContent;
    loaderMoreCommentsElement.classList.add('hidden');
  } else {
    shownCommentsCounterElement.textContent = COMMENTS_PORTION;
    loaderMoreCommentsElement.classList.remove('hidden');
  }

  // Drawing comments
  const id = picture.dataset.id;
  const commentsFragment = document.createDocumentFragment();

  let i = 0;
  publicationsArray[id].comments.forEach((comment) => {
    const commentElement = commentTemplateElement.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    if(i >= COMMENTS_PORTION) {
      commentElement.classList.add('hidden');
    }

    commentsFragment.appendChild(commentElement);
    i++;
  });

  commentBlockElement.appendChild(commentsFragment);

  loaderMoreCommentsElement.addEventListener('click', loadMoreComments);
};

const openPublication = () => {
  picturesContainerElement.addEventListener('click', onPublicationOpen);
};

export {openPublication};
