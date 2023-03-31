// Отображение сообщений по шаблону.

const pageElement = document.body;
const messageErrorElement = document.querySelector('#error')
  .content
  .querySelector('.error');

const messageSuccessElement = document.querySelector('#success');

const createMessageError = () => {
  const messageError = messageErrorElement.cloneNode(true);
  messageError.querySelector('.error');
  messageError.querySelector('.error__inner');
  messageError.querySelector('.error__title');
  messageError.querySelector('.error__button');

  pageElement.append(messageError);
};

const createMessageSuccess = () => {
  const messageSuccess = messageSuccessElement.cloneNode(true);
  messageSuccess.querySelector('.success');
  messageSuccess.querySelector('.success__inner');
  messageSuccess.querySelector('.success__title');
  messageSuccess.querySelector('.success__button');

  pageElement.append(messageSuccess);
};

export { createMessageError, createMessageSuccess };
