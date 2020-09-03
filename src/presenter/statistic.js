import StatisticView from '../view/statistic.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import moment from 'moment';
import {StatisticFilter} from '../const.js';

export default class Statistic {
  constructor(container, moviesModel) {
    this._container = container;
    this._statisticElement = null;
    this._moviesModel = moviesModel;
    this._statisticFilter = StatisticFilter.ALL_TIME;
    this._statisticInputHandler = this._statisticInputHandler.bind(this);
  }

  init() {
    this._films = this._moviesModel.getFilms();
    this._renderStatistic();
  }

  removeStatisticElement() {
    remove(this._statisticElement);
  }

  _statisticInputHandler(value) {
    console.log(value);
    remove(this._statisticElement);
    this._statisticFilter = value;
    this._renderStatistic();
  }

  _renderStatistic() {
    this._statisticElement = new StatisticView(this._getStatisticDataFromFilms(this._films, this._statisticFilter));
    render(this._container, this._statisticElement, RenderPosition.BEFOREEND);
    this._statisticElement.setStatisticInputHandler(this._statisticInputHandler);
  }

  _getStatisticDataFromFilms(films, statisticFilter) {
    let test1 = `2020-09-04`;
    let test2 = moment();
    console.log(moment().isSame(test1, `day`));
    // films.forEach((film) => console.log(film.status.watchingDate, film.title, film.alternativeTitle));

    const data = {
      watchedCount: null,
      totalDuration: null,
      allGenres: [],
      topGenre: null,
      filter: statisticFilter,
    };

    let watchedFilms = null;
    const currentDate = moment();
    const dateAWeekAgo = moment().subtract(7, `days`);
    switch (statisticFilter) {
      case StatisticFilter.ALL_TIME:
        watchedFilms = films.filter((film) => film.status.watched && film.status.watchingDate !== null);
        break;
      case StatisticFilter.TODAY:
        watchedFilms = films.filter((film) => {
          if (film.status.watched && moment(film.status.watchingDate).isSame(currentDate, `day`)) {
            return film;
          }
          return false;
        });
        break;
      case StatisticFilter.WEEK:
        watchedFilms = films.filter((film) => {
          // let test1 = `2020-09-05`;
          // let test = `2020-09-01`;
          // console.log(moment(`2020-09-04`).isBetween(test, test1));
          // console.log(moment(film.status.watchingDate).isBetween(dateAWeekAgo, currentDate));
          console.log(film.status.watchingDate);
          if (film.status.watched && moment(film.status.watchingDate).isBetween(dateAWeekAgo, currentDate)) {
            console.log(true);
            return film;
          }
          return false;
        });
        break;
    }
    console.log(currentDate);
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
      data.topGenre = data.allGenres.reduce((object, element) => {
        if (!object[element]) {
          object[element] = 0;
        }
        object[element]++;
        return object;
      }, {});

      data.topGenre = Object.keys(data.topGenre).reduce((currentElement, nextElement) => data.topGenre[currentElement] > data.topGenre[nextElement] ? currentElement : nextElement);
    }

    return data;
  }
}
