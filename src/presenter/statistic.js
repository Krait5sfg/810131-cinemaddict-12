import StatisticView from '../view/statistic.js';
import {render, RenderPosition, remove} from '../utils/render.js';

const StatisticFilter = {
  ALL_TIME: `all time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};

export default class Statistic {
  constructor(container, moviesModel) {
    this._container = container;
    this._statisticElement = null;
    this._moviesModel = moviesModel;
    this._statisticFilter = StatisticFilter.ALL_TIME;
  }

  init() {
    this._films = this._moviesModel.getFilms();
    this._statisticElement = new StatisticView(this._getStatisticDataFromFilms(this._films, this._statisticFilter));
    render(this._container, this._statisticElement, RenderPosition.BEFOREEND);
    this._statisticElement.setStatisticInputHandler(this._statisticInputHandler);
  }

  removeStatisticElement() {
    remove(this._statisticElement);
  }

  _statisticInputHandler(value) {
    console.log(value);
  }

  _getStatisticDataFromFilms(films, statisticFilter) {
    const data = {
      watchedCount: null,
      totalDuration: null,
      allGenres: [],
      topGenre: null,
    };

    let watchedFilms = null;

    switch (statisticFilter) {
      case StatisticFilter.ALL_TIME:
        watchedFilms = films.filter((film) => film.status.watched);
        data.watchedCount = watchedFilms.length;
    }

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
