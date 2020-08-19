import {getRandomValueFromArray} from '../utils/common.js';

const EMOJIS = [
  `./images/emoji/smile.png`,
  `./images/emoji/sleeping.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
];
const COMMENTS_TEXT = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`
];
const AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Ivan Ivanov`,
  `Petr Petrov`
];

const generateRandomDateForComment = () => {
  const start = new Date(2019, 10, 30);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return `${randomDate.getFullYear()}/${randomDate.getMonth()}/${randomDate.getDate()} ${randomDate.getHours()}:${randomDate.getMinutes()}`;
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateComment = () => ({
  id: generateId(),
  emoji: getRandomValueFromArray(EMOJIS),
  text: getRandomValueFromArray(COMMENTS_TEXT),
  author: getRandomValueFromArray(AUTHORS),
  time: generateRandomDateForComment(),
});
