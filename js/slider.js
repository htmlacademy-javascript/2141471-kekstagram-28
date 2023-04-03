const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const imgPreviewElement = document.querySelector('.img-upload__preview');
const imageElement = document.querySelector('.img-upload__preview img');
const rangeElement = document.querySelector('.img-upload__effect-level');

const scaleControlElement = document.querySelector('.scale__control--value');
const buttonSmallElement = document.querySelector('.scale__control--smaller');
const buttonBigElement = document.querySelector('.scale__control--bigger');

const effectNoneElement = document.querySelector('#effect-none');
const effectChromeElement = document.querySelector('#effect-chrome');
const effectSepiaElement = document.querySelector('#effect-sepia');
const effectMarvinElement = document.querySelector('#effect-marvin');
const effectPhobosElement = document.querySelector('#effect-phobos');
const effectHeatElement = document.querySelector('#effect-heat');

let defaultSize = 100;
scaleControlElement.value = `${defaultSize}%`;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
});

const currentValue = (effect, measure) => {
  imageElement.removeAttribute('class');
  rangeElement.classList.remove('hidden');
  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    imageElement.style.filter = `${effect}(${valueElement.value}${measure})`;
  });
};

effectNoneElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    rangeElement.classList.add('hidden');
    imageElement.removeAttribute('style');
  }
});

effectChromeElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imageElement.classList.add('effects__preview--chrome');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    currentValue('grayscale', '');
  }
});

effectSepiaElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imageElement.classList.add('effects__preview--sepia');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    currentValue('sepia', '');
  }
});

effectMarvinElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imageElement.classList.add('effects__preview--marvin');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    currentValue('invert', '%');
  }
});

effectPhobosElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imageElement.classList.add('effects__preview--phobos');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    currentValue('blur', 'px');
  }
});

effectHeatElement.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    imageElement.classList.add('effects__preview--heat');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    currentValue('brightness', '');
  }
});

buttonBigElement.addEventListener('click', () => {
  if (scaleControlElement !== `${100}%`) {
    defaultSize += 25;
    scaleControlElement.value = `${defaultSize}%`;
    imgPreviewElement.style.transform = `scale(${defaultSize / 100})`;
  }
});

buttonSmallElement.addEventListener('click', () => {
  if (scaleControlElement !== `${25}%`) {
    defaultSize -= 25;
    scaleControlElement.value = `${defaultSize}%`;
    imgPreviewElement.style.transform = `scale(${defaultSize / 100})`;
  }
});
