const generateRandomDate = () => {
  const start = new Date(2019, 10, 30);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return `${randomDate.getFullYear()}/${randomDate.getMonth()}/${randomDate.getDate()} ${randomDate.getHours()}:${randomDate.getMinutes()}`;
};

export const generateComment = () => {
  return {
    emoji: `../../public/images/emoji/smile.png`,
    text: `Interesting setting and a good cast`,
    author: `Tim Macoveev`,
    time: generateRandomDate(),
  };
};
