const countMapMenu = {
  favorite: (values) => values.filter((element) => element.favorite).length,
  watched: (values) => values.filter((element) => element.watched).length,
  watchlist: (values) => values.filter((element) => element.watchlist).length,
};

export const generateFilmMenuCount = (films) => {
  const statuses = films.map((element) => element.status);

  return Object.entries(countMapMenu).map(([countMapMenuName, countFilm]) => ({
    title: countMapMenuName,
    count: countFilm(statuses),
  }));
};
