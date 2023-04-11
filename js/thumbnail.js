import { showPicture } from './show-photo.js';
import { getRandomArrayElement, debounce } from './utils.js';

const imgFilterElement = document.querySelector('.img-filters');
const photoListElement = document.querySelector('.pictures');

const photoTeplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPhotos = (photos) => {
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
};

const clearListPhoto = () => {
  photoListElement
    .querySelectorAll('.picture')
    .forEach((element) => element.remove());
};

const setFilter = (a, b) => b.comments.length - a.comments.length;

const initFilter = (filteredPhotos) => {
  const defaultFilterElement = document.querySelector('#filter-default');
  const randomFilterElement = document.querySelector('#filter-random');
  const discussedFilterElement = document.querySelector('#filter-discussed');

  const getDefaultPhoto = () => {
    clearListPhoto();
    createPhotos(filteredPhotos);
  };

  const getRandomPhoto = () => {
    const randomPhoto = [];
    while (randomPhoto.length < 10) {
      const photo = getRandomArrayElement(filteredPhotos);
      if(randomPhoto.indexOf(photo) === -1) {
        randomPhoto.push(photo);
      }
    }
    clearListPhoto();
    createPhotos(randomPhoto);
  };

  const getDiscussedPhoto = () => {
    clearListPhoto();
    createPhotos(filteredPhotos.slice().sort(setFilter));
  };

  defaultFilterElement.addEventListener('click', debounce(getDefaultPhoto));

  randomFilterElement.addEventListener('click', debounce(getRandomPhoto));

  discussedFilterElement.addEventListener('click', debounce(getDiscussedPhoto));

  imgFilterElement.classList.remove('img-filters--inactive');
};

export { createPhotos, initFilter };
