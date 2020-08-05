import {generateComment} from './comment.js';
import {getRandomInteger, getRandomDouble, genRandomDate} from '../utils.js';

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
    `Cartoon`,
    `Film - Noir`,
    `Mystery`
  ];

  const randomGenres = genreTypes.slice(0, getRandomInteger(1, genreTypes.length - 1));
  return randomGenres;
};

const generateDuration = () => {
  const hour = getRandomInteger(0, 1);
  const minute = getRandomInteger(0, 60);
  let randomDuration = ``;

  randomDuration += hour ? `${hour}h ` : ``;
  randomDuration += minute ? `${minute}m` : ``;

  return randomDuration;
};

const generateStatus = () => {
  return {
    favorite: Boolean(getRandomInteger(0, 1)),
    watched: Boolean(getRandomInteger(0, 1)),
    watchlist: Boolean(getRandomInteger(0, 1)),
  };
};

export const generateFilm = () => {
  return {
    image: generateImage(),
    title: titles[getRandomInteger(0, titles.length - 1)],
    rating: getRandomDouble(1, 9),
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: genRandomDate(),
    duration: generateDuration(),
    country: `USA`,
    genres: generateGenre(),
    description: generateDesciption(),
    comments: new Array(getRandomInteger(0, 5)).fill().map(generateComment),
    ageRating: `18+`,
    status: generateStatus(),
  };
};
