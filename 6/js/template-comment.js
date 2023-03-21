// Подстановка комментариев по шаблону.

const commentItem = document.querySelector('.social__comment');

const createTemplateComment = ({ avatar, name, message }) => {
  const currentElement = commentItem.cloneNode(true);
  currentElement.querySelector('.social__picture').src = avatar;
  currentElement.querySelector('.social__picture').alt = name;
  currentElement.querySelector('.social__text').textContent = message;

  return currentElement;
};

export { createTemplateComment };
