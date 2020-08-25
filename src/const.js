export const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
};

export const UpdateType = {
  MINOR: `MINOR`, // добавление - удаление фильма в различных категориях
  MAJOR: `MAJOR` // при сортировке фильтре перерисовываем весь список
};

export const FilterType = {
  ALL_MOVIES: `all movies`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};
