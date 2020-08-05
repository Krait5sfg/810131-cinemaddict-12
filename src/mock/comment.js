import {generateRandomDateForComment} from '../utils.js';

export const generateComment = () => {
  return {
    emoji: `./images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    time: generateRandomDateForComment(),
  };
};
