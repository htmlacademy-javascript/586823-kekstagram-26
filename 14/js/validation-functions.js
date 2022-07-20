import {getIsStringSizeAvailable} from './util.js';

// Checking for max 5 hashTags
const hashTagCountValidate = (value) => {
  const hashTags = value.split(' ');
  if(hashTags.length > 5) {
    return false;
  }
  return true;
};

// Checking for regular expression
const hashTagTextValidate = (value) => {
  const hashTagTerms = /^#[A-Za-zA-Яа-яЁё0-9]{1,20}$/;
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

// Checking for hashTags repetiton
const hashTagRepeatValidate = (value) => {
  const hashTags = value.split(' ');
  const hahTagsSet = new Set (hashTags);
  if (hahTagsSet.size !== hashTags.length) {
    return false;
  }

  return true;
};

// Function for validation comments
const commentValidate = (value) => getIsStringSizeAvailable(value, 140);

export {hashTagCountValidate, hashTagTextValidate, hashTagRepeatValidate, commentValidate};
