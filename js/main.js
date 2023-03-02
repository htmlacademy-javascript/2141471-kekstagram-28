const COUNT_OBJ = 25;

const names = [
  'Андрей', 'Анна', 'Борис', 'Варя', 'Дмитрий', 'Никита', 'Олеся', 'Ольга', 'Сергей', 'Светлана', 'Роман',
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const photoDescription = [
  'Фото пляжа местного отеля',
  'Фото указателя на пляж',
  'Фото пустынного пляжа',
  'Девушка фотограф',
  'Фото блюда азиатской кухни',
  'Фото спортивного автомобиля',
  'Порезанная ягода клубники на тарелке',
  'Фото стаканов компота из смородины',
  'Фото захода моторного самолета над пляжем',
  'Фото дизайнерской обувницы',
  'Фото песчаной тропинки к пляжу',
  'Фото белого спортивного автомобиля',
  'Фото свежего салата из рыбы и овощей',
  'Фото суши из кота',
  'Фото оригинальной обуви',
  'Фото летящего самолета над горами',
  'Фото хорового пения',
  'Фото ретро авто в помещении',
  'Фото тапочек с фонариками',
  'Фото пальм на территории отеля',
  'Фото блюда азиатской кухни',
  'Фото заката над морем',
  'Фото краба',
  'Фото концерта',
  'Фото бегемотов и автомобиля',
];

let currentId = 1;

const creatingId = () => currentId++;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const creatingObject = () => {
  const currentNumber = creatingId();

  return {
    id: currentNumber,
    url: `photos/${ currentNumber }.jpg`,
    description: photoDescription[currentNumber - 1],
    likes: getRandomNumber(15, 200),
    comments: {
      id: currentNumber,
      avatar: `img/avatar-${ getRandomNumber(1, 6) }.svg`,
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names),
    },
  };
};

const dataArray = Array.from({length: COUNT_OBJ}, creatingObject);

function longArray () {
  return dataArray;
}

longArray();
