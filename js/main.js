const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
const NAMES = ['Ann', 'Greg', 'Linda', 'Omar', 'Ira', 'Kostya', 'Theo', 'Marko'];

const getRandomNumber = (from, to) => {
  if(from <= 0 || to < 0) {return null;}
  if(from === to) {return from;}
  if(from > to) {return null;}

  return Math.round(Math.random() * (to - from) + from);
};

const getIsStringSizeAvailable = (string, availableLength) => {
  if(string.length <= availableLength) {return true;}

  return false;
};
getIsStringSizeAvailable('hi', 5);

const getRandomLikes = () => {
  const likes = getRandomNumber(15, 200);
  return likes;
};

const getRandomElementOfArray = (array) => {
  const element = array[getRandomNumber(1, array.length) - 1];
  return element;
};

const getCommentsArray = (messagesArray, namesArray) => {
  const commnetsArray = [];
  const usedIds = [];
  const countComments = getRandomNumber(2, 10);


  for(let i = 0; i < countComments; i++) {
    const comment = {
      id: getRandomNumber(1, 200),
      avatar: `img/avatar-${  getRandomNumber(1, 6)  }.svg`,
      message: getRandomElementOfArray(messagesArray),
      name: getRandomElementOfArray(namesArray),
    };
    // Create random uniq id
    for(const usedId of usedIds) {
      if(comment.id === usedId) {
        while(comment.id === usedId) {
          comment.id = getRandomNumber(1, 200);
        }
        for(const usedId2 of usedIds) {
          while(comment.id === usedId2) {
            comment.id = getRandomNumber(1, 200);
          }
        }
      }
    }

    usedIds[i] = comment.id;
    commnetsArray[i] = comment;
  }
  return commnetsArray;
};

const publicationArray = [];
const getPublicationsArray = () => {
  let idNumber = 1;
  for(let i = 0; i < 25; i++, idNumber++) {
    const publication = {
      id: idNumber,
      url: `photos/${  idNumber  }.jpg`,
      description: 'it\'s very beautiful photo',
      likes: getRandomLikes(),
      comments: getCommentsArray(MESSAGES, NAMES),
    };
    publicationArray[i] = publication;
  }
};
getPublicationsArray();
