const pictureBlockElement = document.querySelector('.pictures');
const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

const publicationsFragment = document.createDocumentFragment();

const generatePublicationsArray = (publications, isFirst = true) => {
  if(isFirst) {
    let i = 0;
    publications.forEach(({url, likes, comments}) => {
      const publicationElement = pictureTemplateElement.cloneNode(true);
      publicationElement.querySelector('.picture__img').src = url;
      publicationElement.querySelector('.picture__comments').textContent = comments.length;
      publicationElement.querySelector('.picture__likes').textContent = likes;
      publicationElement.dataset.id = i;
      publicationsFragment.appendChild(publicationElement);
      i++;
    });
  } else {
    const publicationElements = pictureBlockElement.querySelectorAll('.picture');
    publications.forEach(({url, likes, comments, id}) => {
      const publicationElement = pictureTemplateElement.cloneNode(true);
      publicationElement.querySelector('.picture__img').src = url;
      publicationElement.querySelector('.picture__comments').textContent = comments.length;
      publicationElement.querySelector('.picture__likes').textContent = likes;
      publicationElement.dataset.id = id;
      publicationsFragment.appendChild(publicationElement);
    });
    publicationElements.forEach((publication) => {
      publication.remove();
    });
  }

  pictureBlockElement.appendChild(publicationsFragment);
};

export {generatePublicationsArray};
