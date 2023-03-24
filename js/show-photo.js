import { isEscapeKey } from './utils.js';
import { createTemplateComment } from './template-comment.js';

const COMMENT_PORTION = 5;
let currentComments = [];
let start;
let countComments;

const pageElement = document.querySelector('body');

const wrapperElement = document.querySelector('.big-picture');
const pictureElement = wrapperElement.querySelector('.big-picture__img img');
const likesElement = wrapperElement.querySelector('.likes-count');
const descriptionElement = wrapperElement.querySelector('.social__caption');
const commentCountElement = wrapperElement.querySelector('.comments-count');
const commentsElement = wrapperElement.querySelector('.social__comments');
const commentDisplayButton = wrapperElement.querySelector('.comments-loader');
const commentCurrentElement = wrapperElement.querySelector('.comments-current');

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    wrapperElement.classList.add('hidden');
    pageElement.classList.remove('modal-open');
  }
});

document.querySelector('#picture-cancel').addEventListener('click', () => {
  wrapperElement.classList.add('hidden');
  pageElement.classList.remove('modal-open');
});

const showComments = () => {
  const newComments = currentComments.slice(start,start + COMMENT_PORTION);

  for (const comment of newComments) {
    commentsElement.append(createTemplateComment(comment));
  }

  start += COMMENT_PORTION;
  countComments += newComments.length;
  commentCurrentElement.textContent = countComments;

  if (currentComments.length <= start) {
    commentDisplayButton.classList.add('hidden');
  }
};

commentDisplayButton.addEventListener('click', () => showComments());

const showPicture = ({ url, description, likes, comments }) => {
  start = 0;
  countComments = 0;
  wrapperElement.classList.remove('hidden');
  commentDisplayButton.classList.remove('hidden');
  pageElement.classList.add('modal-open');
  pictureElement.src = url;
  likesElement.textContent = likes;
  descriptionElement.textContent = description;
  commentCountElement.textContent = comments.length;

  commentsElement.innerHTML = '';
  currentComments = comments;

  showComments();
};

export { showPicture };
