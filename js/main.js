import { createPhotos, initFilter } from './thumbnail.js';
import { setUserFormSubmit } from './form.js';
import { getData } from './load.js';

getData((photos) => {
  createPhotos(photos);
  initFilter(photos);
});

setUserFormSubmit();
