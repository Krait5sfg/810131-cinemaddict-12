import StatisticView from '../view/statistic.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import moment from 'moment';
import {StatisticFilter} from '../const.js';

const MomentSetting = {
  DAY: `day`,
  DAYS: `days`,
  MONTH: `month`,
  YEAR: `year`
};

export default class Statistic {
  constructor(container, moviesModel) {
    this._container = container;
    this._statisticElement = null;
    this._moviesModel = moviesModel;
    this._statisticFilter = StatisticFilter.ALL_TIME;
    this._statisticInputHandler = this._statisticInputHandler.bind(this);
    this._watchedFilms = null;
  }

  init() {
    this._renderStatistic();
  }

  removeStatisticElement() {
    remove(this._statisticElement);
  }

  _statisticInputHandler(statisticValue) {
    remove(this._statisticElement);
    this._statisticFilter = statisticValue;
    this._renderStatistic();

  }

  _renderStatistic() {
    this._setWatchedFilmsForStatistic(this._moviesModel.getFilms(), this._statisticFilter);
    this._statisticElement = new StatisticView(this._getStatisticDataFromWatchedFilms(this._watchedFilms, this._statisticFilter), this._moviesModel);
    render(this._container, this._statisticElement, RenderPosition.BEFOREEND);
    this._statisticElement.setStatisticInputHandler(this._statisticInputHandler);
  }

  _getStatisticDataFromWatchedFilms(watchedFilms, statisticFilter) {
    const statisticData = {
      watchedCount: null,
      totalDuration: null,
      countGenre: null,
      topGenre: null,
      filter: statisticFilter,
    };

    const allGenres = [];

    statisticData.watchedCount = watchedFilms.length;

    statisticData.totalDuration = watchedFilms.reduce((count, {duration}) => count + duration, 0);

    watchedFilms.forEach(({genres}) => {
      if (genres.length > 0) {
        allGenres.push(...genres);
      }
    });

    if (allGenres.length > 0) {
      statisticData.countGenre = allGenres.reduce((countGenre, element) => {
        if (!countGenre[element]) {
          countGenre[element] = 0;
        }
        countGenre[element]++;
        return countGenre;
      }, {});

      statisticData.topGenre = Object.keys(statisticData.countGenre).reduce((currentElement, nextElement) => statisticData.countGenre[currentElement] > statisticData.countGenre[nextElement] ? currentElement : nextElement);
    }

    return statisticData;
  }

  _setWatchedFilmsForStatistic(films, statisticFilter) {
    const currentDate = moment();
    const dateAWeekAgo = moment().subtract(7, MomentSetting.DAYS);
    const dateAMonthAgo = moment().subtract(1, MomentSetting.MONTH);
    const dateAYearAgo = moment().subtract(1, MomentSetting.YEAR);

    switch (statisticFilter) {
      case StatisticFilter.ALL_TIME:
        this._watchedFilms = films.filter(({status}) => status.watched && status.watchingDate !== null);
        break;
      case StatisticFilter.TODAY:
        this._watchedFilms = films.filter(({status}) => status.watched && moment(status.watchingDate).isSame(currentDate, MomentSetting.DAY));
        break;
      case StatisticFilter.WEEK:
        this._watchedFilms = films.filter(({status}) => status.watched && moment(status.watchingDate).isBetween(dateAWeekAgo, currentDate));
        break;
      case StatisticFilter.MONTH:
        this._watchedFilms = films.filter(({status}) => status.watched && moment(status.watchingDate).isBetween(dateAMonthAgo, currentDate));
        break;
      case StatisticFilter.YEAR:
        this._watchedFilms = films.filter(({status}) => status.watched && moment(status.watchingDate).isBetween(dateAYearAgo, currentDate));
        break;
      default:
        throw new Error(`Error statistic filter`);
    }
  }
}
