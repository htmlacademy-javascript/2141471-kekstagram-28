import { showError } from './template-message.js';

const getData = (onSuccess) => {
  fetch('https://28.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      showError(err.message);
    });
};

const sendData = (onSuccess, onOk, onFail, body) => {
  fetch(
    'https://28.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        onOk();
      }
    })
    .catch(() => onFail());
};

export { getData, sendData };
