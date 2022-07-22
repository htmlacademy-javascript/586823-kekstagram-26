const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const publicationsFragment = document.createDocumentFragment();


const generetePublicationsArray = (publicationsArray, isFirst = true) => {
  if(isFirst) {
    let i = 0;
    publicationsArray.forEach(({url, likes, comments}) => {
      const publicationElement = pictureTemplate.cloneNode(true);
      publicationElement.querySelector('.picture__img').src = url;
      publicationElement.querySelector('.picture__comments').textContent = comments.length;
      publicationElement.querySelector('.picture__likes').textContent = likes;
      publicationElement.dataset.id = i;
      publicationsFragment.appendChild(publicationElement);
      i++;
    });
  } else {
    const publications = pictureBlock.querySelectorAll('.picture');
    publicationsArray.forEach(({url, likes, comments, id}) => {
      const publicationElement = pictureTemplate.cloneNode(true);
      publicationElement.querySelector('.picture__img').src = url;
      publicationElement.querySelector('.picture__comments').textContent = comments.length;
      publicationElement.querySelector('.picture__likes').textContent = likes;
      publicationElement.dataset.id = id;
      publicationsFragment.appendChild(publicationElement);
    });
    publications.forEach((publication) => {
      publication.remove();
    });
  }

  pictureBlock.appendChild(publicationsFragment);
};

export {generetePublicationsArray};
