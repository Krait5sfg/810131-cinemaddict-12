import {generateComment} from './comment.js';
import {getRandomInteger, getRandomDouble, getRandomDate, getRandomValueFromArray} from '../utils.js';

const GENRE_TYPES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Film - Noir`,
  `Mystery`
];
const TITLES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `The Great Flamarion`
];
const IMAGES = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/popeye-meets-sinbad.png`,
];
const SENTENCES = [
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

const generateDesciption = (sentences) => sentences.slice(0, getRandomInteger(1, 5)).join(``);
const generateGenre = (genreTypes) => genreTypes.slice(0, getRandomInteger(1, genreTypes.length - 1));

const generateDuration = () => ({
  hours: getRandomInteger(0, 1),
  minutes: getRandomInteger(1, 60),
});

const getRandomBooleanValue = () => Boolean(getRandomInteger(0, 1));

const generateStatus = () => ({
  favorite: getRandomBooleanValue(),
  watched: getRandomBooleanValue(),
  watchlist: getRandomBooleanValue(),
});

export const generateFilm = () => {
  return {
    image: getRandomValueFromArray(IMAGES),
    title: getRandomValueFromArray(TITLES),
    rating: getRandomDouble(1, 9),
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: getRandomDate(),
    duration: generateDuration(),
    country: `USA`,
    genres: generateGenre(GENRE_TYPES),
    description: generateDesciption(SENTENCES),
    comments: new Array(getRandomInteger(0, 5)).fill(``).map(generateComment),
    ageRating: `18+`,
    status: generateStatus(),
  };
};
