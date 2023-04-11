const TIMEOUT = 500;

const getIdCreator = (startNumber = 1) => {
  let id = startNumber;

  return () => id++;
};

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) => elements[Math.floor(Math.random() * elements.length)];

const isPalindrome = (str) => {
  const reverseStr = str.split('').reverse().join('');

  return str === reverseStr;
};

const formingStringChar = (str, num, addStr) => {
  const start = str.length;
  const finish = addStr.length;
  const count = num - start;
  let newStr = '';
  let secStr = '';

  if (str.length >= num) {
    return str;
  }

  if (finish === 1) {
    return addStr.repeat(count) + str;
  }

  if (finish > count) {
    for (let i = 0; i < count; i++) {
      newStr += addStr[i];
    }

    return newStr + str;
  }

  for (const char of addStr) {
    newStr += char;
  }
  for (let i = 0; i < count - finish; i++) {
    secStr += addStr[i];
  }

  return secStr + newStr + str;
};

const checkStringLength = (str, maxLength) => str.length <= maxLength;

const extractNumbers = (str) => {
  let numberStr = '';

  for (let i = 0; i <= str.length; i++) {
    const letter = parseInt(str[i], 10);
    if (!isNaN(letter)) {
      numberStr += letter;
    }
  }

  if (numberStr.length) {
    return parseInt(numberStr, 10);
  }

  return NaN;
};

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
  formingStringChar,
  extractNumbers,
  getIdCreator,
  getRandomNumber,
  getRandomArrayElement,
  isEscapeKey,
  isPalindrome,
  openModal,
  closeModal,
  isFieldFocused,
  createSplitString
};
