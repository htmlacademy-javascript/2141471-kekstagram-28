import { checkStringLength, isEscapeKey, openModal, closeModal, isFieldFocused, createSplitString } from './utils.js';
import { initEffects } from './effects.js';
import { createMessageError, createMessageSuccess } from './template-message.js';
import { sendData } from './load.js';

const REGXP = /^#[a-z0-9а-яё]{1,19}$/i;
const COMMENT_MAX_LENGTH = 140;

const formElement = document.querySelector('#upload-select-image');
const uploadFileElement = formElement.querySelector('#upload-file');
const wrapperElement = formElement.querySelector('.img-upload__overlay');
const hashtagElement = wrapperElement.querySelector('.text__hashtags');
const commentElement = wrapperElement.querySelector('.text__description');
const buttonSubmitElement = wrapperElement.querySelector('.img-upload__submit');

const blockSubmitButton = () => {
  buttonSubmitElement.setAttribute('disabled', true);
  buttonSubmitElement.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  buttonSubmitElement.disabled = false;
  buttonSubmitElement.textContent = 'Опубликовать';
};

const validateCountHashtags = (value) => {
  const countHashtags = createSplitString(value);

  return countHashtags.length <= 5;
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

const validateComment = (value) => checkStringLength(value, COMMENT_MAX_LENGTH);

const pristine = new Pristine(
  formElement,
  {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'error-message'
  },
  false
);

const effectsComponenet = initEffects(formElement);

const closeForm = () => {
  formElement.reset();
  closeModal(wrapperElement, onKeyDown);
};

pristine.addValidator(hashtagElement, validateCountHashtags, 'Не более 5 хэштэгов');
pristine.addValidator(
  hashtagElement,
  validateCorrectHashtags,
  'Начало хэштэга с "#", буквы и цифры, не более 20 символов'
);
pristine.addValidator(hashtagElement, validateRepeateHashtags, 'Хэштэг не должен повторятся');
pristine.addValidator(commentElement, validateComment,'не длинее 140 символов');

const setUserFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          createMessageSuccess();
          unblockSubmitButton();
        },
        () => {
          createMessageError();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

formElement.addEventListener('reset', () => {
  pristine.reset();
  effectsComponenet.reset();
});

function onKeyDown(evt) {
  if (isEscapeKey(evt) && !isFieldFocused(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

uploadFileElement.addEventListener('change', () => {
  openModal(wrapperElement, onKeyDown);
  formElement.querySelector('input').blur();
});

document.querySelector('#upload-cancel').addEventListener('click', () => {
  closeForm();
});

export { setUserFormSubmit, closeForm, onKeyDown };
