import { isEscapeKey, openModal, closeModal, isFieldFocused } from './utils.js';

const pageElement = document.body;

const editForm = document.querySelector('#upload-select-image');
const hashtagElement = editForm.querySelector('#hashtags');
const commentElement = editForm.querySelector('.text__description');

const wrapperElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');

const validateLengthHashtags = (value) => value.length >= 2 && value.length <= 104;

const validateCorrectHashtags = (value) => {
  const regxp = /^#[a-z0-9а-яё]{1,19}$/i;
  const string = value;

  const hashtags = string.split(' ', 5);

  for (const hashtag of hashtags) {
    const resultHashtag = regxp.test(hashtag);
    if (!resultHashtag) {
      return false;
    }
  }

  const uniqHashtag = new Set(hashtags);
  if (hashtags.length !== uniqHashtag.size) {
    return false;
  }

  return true;
};

const validateComment = (value) => value.length <= 140;

const pristine = new Pristine(editForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'error-message'
}, false);

pristine.addValidator(hashtagElement, validateLengthHashtags, 'от 2 до 104 символов');
pristine.addValidator(hashtagElement, validateCorrectHashtags, 'Не корректный Хэштэг!');
pristine.addValidator(commentElement, validateComment,'не длинее 140 символов');

editForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    editForm.submit();
    editForm.reset();
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

