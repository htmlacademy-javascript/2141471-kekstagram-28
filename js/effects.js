const PERCENT_MAX = 100;
const SCALE_DIFF = 25;
const DEFAULT_EFFECT = 'none';

const Effect = {
  [DEFAULT_EFFECT]: {
    max: PERCENT_MAX,
    step: 1,
    filter: 'none'
  },
  chrome: {
    filter: 'grayscale'
  },
  sepia: {
    filter: 'sepia'
  },
  marvin: {
    max: PERCENT_MAX,
    step: 1,
    filter: 'invert',
    measure: '%'
  },
  phobos: {
    max: 3,
    filter: 'blur',
    measure: 'px'
  },
  heat: {
    max: 3,
    filter: 'brightness'
  },
};

const initEffects = (formElement) => {
  const valueElement = formElement.querySelector('.effect-level__value');
  const imgPreviewElement = formElement.querySelector('.img-upload__preview');
  const imageElement = formElement.querySelector('.img-upload__preview img');
  const rangeElement = formElement.querySelector('.img-upload__effect-level');
  const sliderElement = rangeElement.querySelector('.effect-level__slider');

  const scaleControlElement = formElement.querySelector('.scale__control--value');
  const buttonSmallElement = formElement.querySelector('.scale__control--smaller');
  const buttonBigElement = formElement.querySelector('.scale__control--bigger');
  const effectElement = document.querySelector('.effects');

  let currentEffect = DEFAULT_EFFECT;
  let currentScale = PERCENT_MAX;

  const applayScale = () => {
    scaleControlElement.value = `${currentScale}`;
    imgPreviewElement.style.transform = `scale(${currentScale / 100})`;
  };

  const getEffect = () => {
    const { min = 0, max = 1, step = 0.1} = Effect[currentEffect];

    return {
      range: {
        min,
        max
      },
      start: max,
      step
    };
  };

  const resetEffect = () => {
    imageElement.style.filter = 'none';
    rangeElement.classList.add('hidden');
  };

  const slider = noUiSlider.create(sliderElement, getEffect());

  effectElement.addEventListener('change', (evt) => {
    if (evt.target.classList.contains('effects__radio')) {
      currentEffect = evt.target.value;
      imageElement.className = `effects__preview--${currentEffect}`;
      if (currentEffect === DEFAULT_EFFECT) {
        resetEffect();
      } else {
        slider.updateOptions(getEffect());
        rangeElement.classList.remove('hidden');
      }
    }
  });

  slider.on('update', () => {
    const value = slider.get();
    const { filter, measure = '' } = Effect[currentEffect];
    valueElement.value = value;
    imageElement.style.filter = `${filter}(${value}${measure})`;
  });

  buttonBigElement.addEventListener('click', () => {
    if (currentScale !== PERCENT_MAX) {
      currentScale += SCALE_DIFF;
      applayScale();
    }
  });

  buttonSmallElement.addEventListener('click', () => {
    if (currentScale !== SCALE_DIFF) {
      currentScale -= SCALE_DIFF;
      applayScale();
    }
  });

  return {
    reset: () => {
      resetEffect();
      currentScale = PERCENT_MAX;
      applayScale();
    }
  };
};

export { initEffects };
