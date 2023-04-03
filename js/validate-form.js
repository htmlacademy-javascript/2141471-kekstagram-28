import { isEscapeKey, openModal, closeModal, isFieldFocused, createSplitString } from './utils.js';

const REGXP = /^#[a-z0-9а-яё]{1,19}$/i;
const pageElement = document.body;

const formElement = document.querySelector('#upload-select-image');
const hashtagElement = formElement.querySelector('.text__hashtags');
const commentElement = formElement.querySelector('.text__description');

const wrapperElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');

const validateCountHashtags = (value) => {
  const countHashtags = createSplitString(value);

  if (countHashtags.length > 5) {
    return false;
  }

  return true;
};

const validateCorrectHashtags = (value) => {
  const correctHashtags = createSplitString(value);

  for (const hashtag of correctHashtags) {
    const resultHashtag = REGXP.test(hashtag);
    if (hashtag && !resultHashtag) {
      return false;
    }
  }

  return true;
};

const validateRepeateHashtags = (value) => {
  const repeateHashtags = createSplitString(value).map((hashtag) => hashtag.toLowerCase());
  const uniqHashtags = new Set(repeateHashtags);

  return repeateHashtags.length === uniqHashtags.size;
};

const validateComment = (value) => value.length <= 140;

const pristine = new Pristine(formElement , {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'error-message'
}, false);

pristine.addValidator(hashtagElement, validateCountHashtags, 'Не более 5 хэштэгов');
pristine.addValidator(hashtagElement, validateCorrectHashtags, 'Начало хэштэга с "#", буквы и цифры, не более 20 символов');
pristine.addValidator(hashtagElement, validateRepeateHashtags, 'Хэштэг не должен повторятся');
pristine.addValidator(commentElement, validateComment,'не длинее 140 символов');

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    formElement.submit();
    formElement.reset();
  }
});

uploadFileElement.addEventListener('change', () => {
  openModal(wrapperElement, pageElement);
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt) && !isFieldFocused(evt)) {
    evt.preventDefault();
    closeModal(wrapperElement, pageElement);
  }
});

document.querySelector('#upload-cancel').addEventListener('click', () => {
  closeModal(wrapperElement, pageElement);
});

