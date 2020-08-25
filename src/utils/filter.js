import {FilterType} from '../const.js';

export const filter = {
  [FilterType.ALL_MOVIES]: (values) => values.slice(),
  [FilterType.WATCHLIST]: (values) => values.filter((element) => element.status.watchlist),
  [FilterType.HISTORY]: (values) => values.filter((element) => element.status.watched),
  [FilterType.FAVORITES]: (values) => values.filter((element) => element.status.favorite),
};
