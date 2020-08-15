import {generateComment} from './comment.js';
import {getRandomInteger, getRandomDouble, getRandomValueFromArray} from '../utils/common.js';
import {getRandomDate} from '../utils/film.js';

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

const MIN_GENRE_BOUND = 1;

const DescriptionSentences = {
  MIN: 1,
  MAX: 5,
};

const HourDuration = {
  MIN: 0,
  MAX: 1
};

const MinutesDuration = {
  MIN: 1,
  MAX: 60
};

const BooleanValue = {
  FALSE: 0,
  TRUE: 1
};

const RatingBound = {
  MIN: 1,
  MAX: 9
};

const CommentBound = {
  MIN: 0,
  MAX: 5
};

const generateDescription = (sentences) => sentences.slice(0, getRandomInteger(DescriptionSentences.MIN, DescriptionSentences.MAX)).join(``);
const generateGenre = (genreTypes) => genreTypes.slice(0, getRandomInteger(MIN_GENRE_BOUND, genreTypes.length - 1));

const generateDuration = () => ({
  hours: getRandomInteger(HourDuration.MIN, HourDuration.MAX),
  minutes: getRandomInteger(MinutesDuration.MIN, MinutesDuration.MAX),
});

const getRandomBooleanValue = () => Boolean(getRandomInteger(BooleanValue.FALSE, BooleanValue.TRUE));

const generateStatus = () => ({
  favorite: getRandomBooleanValue(),
  watched: getRandomBooleanValue(),
  watchlist: getRandomBooleanValue(),
});

export const generateFilm = () => {
  return {
    image: getRandomValueFromArray(IMAGES),
    title: getRandomValueFromArray(TITLES),
    rating: getRandomDouble(RatingBound.MIN, RatingBound.MAX),
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    releaseDate: getRandomDate(),
    duration: generateDuration(),
    country: `USA`,
    genres: generateGenre(GENRE_TYPES),
    description: generateDescription(SENTENCES),
    comments: new Array(getRandomInteger(CommentBound.MIN, CommentBound.MAX)).fill(``).map(generateComment),
    ageRating: `18+`,
    status: generateStatus(),
  };
};
