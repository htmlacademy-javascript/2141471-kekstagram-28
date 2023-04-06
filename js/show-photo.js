import { isEscapeKey, openModal, closeModal } from './utils.js';
import { createTemplateComment } from './template-comment.js';

const COMMENT_PORTION = 5;
let currentComments = [];
let start = 0;
let countComments;

const wrapperElement = document.querySelector('.big-picture');
const pictureElement = wrapperElement.querySelector('.big-picture__img img');
const likesElement = wrapperElement.querySelector('.likes-count');
const descriptionElement = wrapperElement.querySelector('.social__caption');
const commentCountElement = wrapperElement.querySelector('.comments-count');
const commentsElement = wrapperElement.querySelector('.social__comments');
const moreButtonElement = wrapperElement.querySelector('.comments-loader');
const commentCurrentElement = wrapperElement.querySelector('.comments-current');

const showComments = () => {
  const newComments = currentComments.slice(start, start + COMMENT_PORTION);

  for (const comment of newComments) {
    commentsElement.append(createTemplateComment(comment));
  }

  start += COMMENT_PORTION;
  countComments += newComments.length;
  commentCurrentElement.textContent = countComments;

  if (currentComments.length <= start) {
    moreButtonElement.classList.add('hidden');
  }
};

const onKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal(wrapperElement, onKeyDown);
  }
};

const showPicture = ({ url, description, likes, comments }) => {
  start = 0;
  countComments = 0;
  moreButtonElement.classList.remove('hidden');
  pictureElement.src = url;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;
  commentCountElement.textContent = comments.length;

  commentsElement.innerHTML = '';
  currentComments = comments;

  openModal(wrapperElement, onKeyDown);
  showComments();
};

document.querySelector('#picture-cancel').addEventListener('click', () => {
  closeModal(wrapperElement, onKeyDown);
});

moreButtonElement.addEventListener('click', () => showComments());

export { showPicture };
