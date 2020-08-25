import {FilterType} from '../const.js';

export const filter = {
  [FilterType.WATCHLIST]: (values) => values.filter((element) => element.watchlist).length,
  [FilterType.HISTORY]: (values) => values.filter((element) => element.watched).length,
  [FilterType.FAVORITES]: (values) => values.filter((element) => element.favorite).length,
}
