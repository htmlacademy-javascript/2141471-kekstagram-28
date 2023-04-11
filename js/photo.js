const FILE_EXTERNSION = ['jpg', 'png', 'gif', 'jpeg'];

const fileChooser = document.querySelector('#upload-file');
const previewPhoto = document.querySelector('.img-upload__preview img');

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_EXTERNSION.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
  }
});
