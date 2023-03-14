import { createPhotos } from './photos.js';

const photoListElement = document.querySelector('.pictures');
const photoTeplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photos = createPhotos();

const photoListFragment = document.createDocumentFragment();

photos.forEach(({ url, likes, comments }) => {
  const photoElement = photoTeplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoListElement.append(photoElement);
});

photoListElement.append(photoListFragment);
