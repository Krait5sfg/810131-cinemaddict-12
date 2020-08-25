// const countMapMenu = {
//   favorite: (values) => values.filter((element) => element.favorite).length,
//   watched: (values) => values.filter((element) => element.watched).length,
//   watchlist: (values) => values.filter((element) => element.watchlist).length,
// };

// export const generateFilmsMenu = (films) => {
//   const statuses = films.map((element) => element.status);
//   const result = {};

//   Object.entries(countMapMenu).forEach(([countMapMenuName, countFilm]) => {
//     result[countMapMenuName] = countFilm(statuses);
//   });
//   return result;
// };
