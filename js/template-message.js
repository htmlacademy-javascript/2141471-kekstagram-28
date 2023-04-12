import { isEscapeKey } from './utils.js';
import { onKeyDown as onFormKeyDown } from './form.js';

const TIMEOUT = 5000;

const messageErrorElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const messageSuccessElement = document.querySelector('#success')
  .content
  .querySelector('.success');


const createMessage = (messageTemplate, blockName) => {
  const messageElement = messageTemplate.cloneNode(true);

  const closeMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onKeyDown);

    if (blockName === 'error') {
      document.addEventListener('keydown', onFormKeyDown);
    }
  };

  function onKeyDown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  if (blockName === 'error') {
    document.removeEventListener('keydown', onFormKeyDown);
  }

  messageElement.addEventListener('click', (evt) => {
    if (evt.target === messageElement || evt.target.closest(`.${blockName}__button`)) {
      closeMessage();
    }
  });

  document.addEventListener('keydown', onKeyDown);

  document.body.append(messageElement);
};

const createMessageError = () => createMessage(messageErrorElement, 'error');
const createMessageSuccess = () => createMessage(messageSuccessElement, 'success');

const showError = (message) => {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('error-message');
  messageContainer.style.position = 'absolute';
  messageContainer.style.top = '10px';
  messageContainer.style.left = 0;
  messageContainer.style.right = 0;
  messageContainer.style.color = 'red';
  messageContainer.textContent = message;

  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, TIMEOUT);
};

export {
  createMessageError,
  createMessageSuccess,
  showError
};
