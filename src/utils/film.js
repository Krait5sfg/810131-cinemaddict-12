export const sortByDate = (firstFilm, secondFilm) => secondFilm.releaseDate.getTime() - firstFilm.releaseDate.getTime();

export const sortByRating = (firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating;
