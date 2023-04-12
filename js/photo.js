import { showError } from './template-message.js';

const FILE_EXTENSIONS = ['jpg', 'png', 'gif', 'jpeg'];
const ERROR_MESSAGE = `Только форматы ${FILE_EXTENSIONS.join(', ')}`;

const previewPhoto = document.querySelector('.img-upload__preview img');

const choosePhoto = (fileChooser) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_EXTENSIONS.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
    return true;
  }

  showError(ERROR_MESSAGE);
  return false;
};

export { choosePhoto };
