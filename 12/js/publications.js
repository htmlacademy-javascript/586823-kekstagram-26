const pictureBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const publicationsFragment = document.createDocumentFragment();

let i = 0;
const generetePublicationsArray = (publicationsArray) => {
  publicationsArray.forEach(({url, likes, comments}) => {
    const publicationElement = pictureTemplate.cloneNode(true);
    publicationElement.querySelector('.picture__img').src = url;
    publicationElement.querySelector('.picture__comments').textContent = comments.length;
    publicationElement.querySelector('.picture__likes').textContent = likes;
    publicationElement.dataset.id = i;
    publicationsFragment.appendChild(publicationElement);
    i++;
  });

  pictureBlock.appendChild(publicationsFragment);
};

export {generetePublicationsArray};
