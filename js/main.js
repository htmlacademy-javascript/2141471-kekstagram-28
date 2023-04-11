import { createPhotos, initFilter } from './thumbnail.js';
import { closeForm, setUserFormSubmit } from './form.js';
import { getData } from './load.js';
import './photo.js';

getData((photos) => {
  createPhotos(photos);
  initFilter(photos);
});

setUserFormSubmit(closeForm);
