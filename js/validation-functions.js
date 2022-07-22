import {getIsStringSizeAvailable} from './util.js';

const HASHTAG_MAX_ITEMS = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;

// Checking for max count of hashTags
const validateHashTagCount = (value) => {
  const hashTags = value.split(' ');
  if(hashTags.length > HASHTAG_MAX_ITEMS) {
    return false;
  }
  return true;
};

// Checking for regular expression
const validateHashTagText = (value) => {
  const hashTagTerms = /^#[A-Za-zA-Яа-яЁё0-9]{1,}$/;
  const hashTags = value.split(' ');

  if (hashTags[0] !== '') {
    let notValidCounter = 0;
    hashTags.forEach((hashTag) => {
      if(!hashTagTerms.test(hashTag)) {
        notValidCounter++;
      }
    });
    if(notValidCounter > 0) {
      return false;
    }
  }
  return true;
};

// Checking size
const validateHashTagSize = (value) => {
  const hashTags = value.split(' ');

  if (hashTags[0] !== '') {
    let notValidCounter = 0;
    hashTags.forEach((hashTag) => {
      if(hashTag.length > HASHTAG_MAX_LENGTH) {
        notValidCounter++;
      }
    });
    if(notValidCounter > 0) {
      return false;
    }
  }
  return true;
};

// Checking for hashTags repetiton
const validateHashTagRepeat = (value) => {
  const hashTags = value.split(' ');
  hashTags.forEach((hashTag, i) => {
    hashTags[i] = hashTag.toLowerCase();
  });
  const hahTagsSet = new Set (hashTags);
  if (hahTagsSet.size !== hashTags.length) {
    return false;
  }

  return true;
};

// Function for validation comments
const validateComment = (value) => getIsStringSizeAvailable(value, COMMENT_MAX_LENGTH);

export {validateHashTagCount, validateHashTagText, validateHashTagRepeat, validateComment, validateHashTagSize};
