import { isEscapeKey } from './utils.js';
import { onKeyDown } from './form.js';

const TIMEOUT = 5000;

const pageElement = document.body;
const messageErrorElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const messageSuccessElement = document.querySelector('#success')
  .content
  .querySelector('.success');

const closeMessage = (messageElement) => {
  messageElement.remove();
  document.addEventListener('keydown', onKeyDown);
};

const createMessageError = () => {
  const messageError = messageErrorElement.cloneNode(true);
  messageError.querySelector('.error');
  messageError.querySelector('.error__inner');
  messageError.querySelector('.error__title');
  messageError.querySelector('.error__button');

  pageElement.append(messageError);

  const errorElement = document.querySelector('.error');

  document.removeEventListener('keydown', onKeyDown);

  document.querySelector('.error__button').addEventListener('click', () => {
    closeMessage(errorElement);
  });

  errorElement.addEventListener('click', () => {
    closeMessage(errorElement);
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage(errorElement);
    }
  });
};

const createMessageSuccess = () => {
  const messageSuccess = messageSuccessElement.cloneNode(true);
  messageSuccess.querySelector('.success');
  messageSuccess.querySelector('.success__inner');
  messageSuccess.querySelector('.success__title');
  messageSuccess.querySelector('.success__button');

  pageElement.append(messageSuccess);

  const successElement = document.querySelector('.success');

  document.removeEventListener('keydown', onKeyDown);

  document.querySelector('.success__button').addEventListener('click', () => {
    closeMessage(successElement);
  });

  successElement.addEventListener('click', () => {
    closeMessage(successElement);
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage(successElement);
    }
  });
};

const showError = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('error-message');
  messageContainer.style.position = 'absolute';
  messageContainer.style.top = '10px';
  messageContainer.style.left = 0;
  messageContainer.style.right = 0;
  messageContainer.style.color = 'red';
  messageContainer.textContent = message;

  pageElement.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, TIMEOUT);
};

export {
  createMessageError,
  createMessageSuccess,
  showError
};
