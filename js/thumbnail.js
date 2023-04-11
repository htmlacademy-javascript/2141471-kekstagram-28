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
  imgFilterElement.classList.remove('img-filters--inactive');
};

const innitFilter = (photosFilter) => {
  const defaultFilterElement = document.querySelector('#filter-default');
  const randomFilterElement = document.querySelector('#filter-random');
  const discussedFilterElement = document.querySelector('#filter-discussed');

  const getUpdatePhoto = () => {
    photoListElement
      .querySelectorAll('.picture')
      .forEach((element) => element.remove());
  };

  const getDefaultPhoto = () => {
    getUpdatePhoto();
    createPhotos(photosFilter);
  };

  const getRandomPhoto = () => {
    const randomPhoto = [];
    while (randomPhoto.length < 10) {
      const photo = getRandomArrayElement(photosFilter);
      if(randomPhoto.indexOf(photo) === -1) {
        randomPhoto.push(photo);
      }
    }
    getUpdatePhoto();
    createPhotos(randomPhoto);
  };

  const getDiscussedPhoto = () => {
    const setFilter = (a, b) => b.comments.length - a.comments.length;
    const sortedphotosFilter = photosFilter.slice();
    sortedphotosFilter.sort(setFilter);
    getUpdatePhoto();
    createPhotos(sortedphotosFilter);
  };

  defaultFilterElement.addEventListener('click', debounce(getDefaultPhoto));

  randomFilterElement.addEventListener('click', debounce(getRandomPhoto));

  discussedFilterElement.addEventListener('click', debounce(getDiscussedPhoto));
};

export { createPhotos, innitFilter };
