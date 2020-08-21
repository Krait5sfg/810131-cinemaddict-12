export const getRandomDate = () => {
  const start = new Date(1940, 10, 30);
  const end = new Date();
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const sortByDate = (firstFilm, secondFilm) => secondFilm.releaseDate.getTime() - firstFilm.releaseDate.getTime();

export const sortByRating = (firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating;
