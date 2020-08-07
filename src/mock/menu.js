const countMapMenu = {
  favorite: (values) => values.filter((element) => element.favorite).length,
  watched: (values) => values.filter((element) => element.watched).length,
  watchlist: (values) => values.filter((element) => element.watchlist).length,
};

export const generateFilmsMenu = (films) => {
  const statuses = films.map((element) => element.status);

  const filmsMenuCount = Object.entries(countMapMenu).map(([countMapMenuName, countFilm]) => ({
    title: countMapMenuName,
    count: countFilm(statuses),
  }));
  const result = {};
  filmsMenuCount.forEach(({title, count}) => {
    result[title] = count;
  });
  return result;
};

