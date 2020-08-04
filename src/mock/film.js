import {generateComment} from './comment.js';

const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomDouble = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return (lower + Math.random() * (upper - lower + 1)).toFixed(1);
};

const titles = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `The Great Flamarion`
];

const generateImage = () => {

  const images = [
    `./images/posters/made-for-each-other.png`,
    `./images/posters/the-man-with-the-golden-arm.jpg`,
    `./images/posters/the-great-flamarion.jpg`,
    `./images/posters/the-dance-of-life.jpg`,
    `./images/posters/santa-claus-conquers-the-martians.jpg`,
    `./images/posters/sagebrush-trail.jpg`,
    `./images/posters/popeye-meets-sinbad.png`,
  ];
  const randomImage = images[getRandomInteger(0, images.length - 1)];
  return randomImage;
};

const generateDesciption = () => {

  const sentences = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`];

  const randomSentence = sentences.slice(0, getRandomInteger(1, 5)).join(``);

  return randomSentence;
};

const generateGenre = () => {

  const genreTypes = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`
  ];

  const randomGenre = genreTypes[getRandomInteger(0, genreTypes.length - 1)];
  return randomGenre;
};

const generateDuration = () => {
  const hour = getRandomInteger(0, 1);
  const minute = getRandomInteger(0, 60);
  let randomDuration = ``;

  randomDuration += hour ? `${hour}h ` : ``;
  randomDuration += minute ? `${minute}m` : ``;

  return randomDuration;
};

export const generateFilm = () => {
  return {
    image: generateImage(),
    title: titles[getRandomInteger(0, titles.length - 1)],
    rating: getRandomDouble(1, 9),
    year: getRandomInteger(1920, 2020),
    duration: generateDuration(),
    genre: generateGenre(),
    description: generateDesciption(),
    comments: new Array(getRandomInteger(0, 5)).fill(generateComment()),
  };
};
