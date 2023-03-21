import { createPhotos } from './photos.js';
import { showPicture } from './show-photo.js';

const photoListElement = document.querySelector('.pictures');
const photoTeplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photos = createPhotos();

const photoListFragment = document.createDocumentFragment();

photos.forEach(({ url, description, likes, comments }) => {
  const photoElement = photoTeplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__img').alt = description;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__likes').textContent = likes;

  photoElement.addEventListener('click', () => showPicture({ url, description, likes, comments }));

  photoListElement.append(photoElement);
});

photoListElement.append(photoListFragment);
