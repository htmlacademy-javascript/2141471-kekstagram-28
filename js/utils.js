const TIMEOUT = 500;

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const checkStringLength = (str, maxLength) => str.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';
const isFieldFocused = () => ['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase());
const createSplitString = (string, splitter = ' ') => string.split(splitter);

const openModal = (modalElement, onKeyDown, scrollHiddenElement = document.body) => {
  document.addEventListener('keydown', onKeyDown);
  modalElement.classList.remove('hidden');
  scrollHiddenElement.classList.add('modal-open');
};

const closeModal = (modalElement, onKeyDown, scrollHiddenElement = document.body) => {
  document.removeEventListener('keydown', onKeyDown);
  modalElement.classList.add('hidden');
  scrollHiddenElement.classList.remove('modal-open');
};

const debounce = (callback, timeoutDelay = TIMEOUT) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  checkStringLength,
  debounce,
  getRandomArrayElement,
  isEscapeKey,
  openModal,
  closeModal,
  isFieldFocused,
  createSplitString
};
