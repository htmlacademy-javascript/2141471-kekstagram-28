import { createPhotos, innitFilter } from './thumbnail.js';
import { closeForm, setUserFormSubmit } from './form.js';
import { getData } from './load.js';

getData((photos) => {
  createPhotos(photos);
  innitFilter(photos);
});

setUserFormSubmit(closeForm);
