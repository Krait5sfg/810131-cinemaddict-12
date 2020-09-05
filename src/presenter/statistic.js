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
    this._statisticElement = new StatisticView(this._getStatisticDataFromFilms(this._moviesModel.getFilms(), this._statisticFilter), this._moviesModel);
    render(this._container, this._statisticElement, RenderPosition.BEFOREEND);
    this._statisticElement.setStatisticInputHandler(this._statisticInputHandler);
  }

  _getStatisticDataFromFilms(films, statisticFilter) {
    const data = {
      watchedCount: null,
      totalDuration: null,
      allGenres: [],
      countGenre: null,
      topGenre: null,
      filter: statisticFilter,
    };

    let watchedFilms = null;
    const currentDate = moment();
    const dateAWeekAgo = moment().subtract(7, MomentSetting.DAYS);
    const dateAMonthAgo = moment().subtract(1, MomentSetting.MONTH);
    const dateAYearAgo = moment().subtract(1, MomentSetting.YEAR);
    switch (statisticFilter) {
      case StatisticFilter.ALL_TIME:
        watchedFilms = films.filter((film) => film.status.watched && film.status.watchingDate !== null);
        break;
      case StatisticFilter.TODAY:
        watchedFilms = films.filter((film) => {
          if (film.status.watched && moment(film.status.watchingDate).isSame(currentDate, MomentSetting.DAY)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticFilter.WEEK:
        watchedFilms = films.filter((film) => {
          if (film.status.watched && moment(film.status.watchingDate).isBetween(dateAWeekAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticFilter.MONTH:
        watchedFilms = films.filter((film) => {
          if (film.status.watched && moment(film.status.watchingDate).isBetween(dateAMonthAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticFilter.YEAR:
        watchedFilms = films.filter((film) => {
          if (film.status.watched && moment(film.status.watchingDate).isBetween(dateAYearAgo, currentDate)) {
            return film;
          }
          return false;
        });
        break;
    }

    data.watchedCount = watchedFilms.length;

    data.totalDuration = watchedFilms.reduce((count, film) => {
      return count + film.duration;
    }, 0);

    watchedFilms.forEach((film) => {
      if (film.genres.length > 0) {
        film.genres.forEach((genre) => data.allGenres.push(genre));
      }
    });

    if (data.allGenres.length > 0) {
      data.countGenre = data.allGenres.reduce((object, element) => {
        if (!object[element]) {
          object[element] = 0;
        }
        object[element]++;
        return object;
      }, {});

      data.topGenre = Object.keys(data.countGenre).reduce((currentElement, nextElement) => data.countGenre[currentElement] > data.countGenre[nextElement] ? currentElement : nextElement);
    }

    return data;
  }
}
