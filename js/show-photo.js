import { isEscapeKey } from './utils.js';
import { createTemplateComment } from './template-comment.js';

const pageElement = document.querySelector('body');

const wrapperElement = document.querySelector('.big-picture');
const pictureElement = wrapperElement.querySelector('.big-picture__img img');
const likesElement = wrapperElement.querySelector('.likes-count');
const descriptionElement = wrapperElement.querySelector('.social__caption');
const commentCountElement = wrapperElement.querySelector('.comments-count');
const commentsElement = wrapperElement.querySelector('.social__comments');

wrapperElement.querySelector('.social__comment-count').classList.add('hidden');
wrapperElement.querySelector('.comments-loader').classList.add('hidden');

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    wrapperElement.classList.add('hidden');
  }
});

document.querySelector('#picture-cancel').addEventListener('click', () => {
  wrapperElement.classList.add('hidden');
});

const showPicture = ({ url, description, likes, comments }) => {
  wrapperElement.classList.remove('hidden');
  pageElement.classList.add('modal-open');
  pictureElement.src = url;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;
  commentCountElement.textContent = comments;

  commentsElement.innerHTML = '';
  for (const comment of comments) {
    commentsElement.append(createTemplateComment(comment));
  }
};

export { showPicture };
