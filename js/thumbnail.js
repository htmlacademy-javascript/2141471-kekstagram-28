import { showPicture } from './show-photo.js';
import { getRandomArrayElement, debounce } from './utils.js';

const MAX_RANDOM = 10;

const imgFiltersElement = document.querySelector('.img-filters');
const photoListElement = document.querySelector('.pictures');
const buttonElements = imgFiltersElement.querySelectorAll('.img-filters__button');
const [defaultFilterElement, randomFilterElement, discussedFilterElement] = buttonElements;

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

const handleSorting = (currentButtonElement, photos) => {
  buttonElements.forEach((buttonElement) => {
    buttonElement.classList.remove('img-filters__button--active');
  });
  currentButtonElement.classList.add('img-filters__button--active');

  photoListElement
    .querySelectorAll('.picture')
    .forEach((element) => element.remove());

  createPhotos(photos);
};

const getRandomPhotos = (photos) => {
  const randomPhotos = [];
  while (randomPhotos.length < MAX_RANDOM) {
    const photo = getRandomArrayElement(photos);
    if (randomPhotos.indexOf(photo) === -1) {
      randomPhotos.push(photo);
    }
  }
  return randomPhotos;
};

const sortByComments = (a, b) => b.comments.length - a.comments.length;

const initFilter = (photos) => {
  defaultFilterElement.addEventListener('click', debounce((evt) => {
    handleSorting(evt.target, photos);
  }));

  randomFilterElement.addEventListener('click', debounce((evt) => {
    handleSorting(evt.target, getRandomPhotos(photos));
  }));

  discussedFilterElement.addEventListener('click', debounce((evt) => {
    handleSorting(evt.target, photos.slice().sort(sortByComments));
  }));

  imgFiltersElement.classList.remove('img-filters--inactive');
};

export { createPhotos, initFilter };
