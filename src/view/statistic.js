import SmartView from './smart.js';
import moment from 'moment';
import {StatisticFilter} from '../const.js';
import {getUserStatus} from '../utils/user-profile.js';

// методы преобразуют даты с помощью moment
const getDurationForStatistic = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const format = minutes > 60 ? `H[<span class="statistic__item-description">h</span>] mm[<span class="statistic__item-description">m</span>]` : `mm[m]`;
  return moment.utc(duration.as(`milliseconds`)).format(format).toString();
};

const createStatisticTemplate = ({filter, watchedCount, totalDuration, topGenre}, userStatus) => {

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userStatus}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${filter === StatisticFilter.ALL_TIME ? `checked` : ``}>
    <label for="statistic-all-time" class="statistic__filters-label">All time</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${filter === StatisticFilter.TODAY ? `checked` : ``}>
    <label for="statistic-today" class="statistic__filters-label">Today</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${filter === StatisticFilter.WEEK ? `checked` : ``}>
    <label for="statistic-week" class="statistic__filters-label">Week</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${filter === StatisticFilter.MONTH ? `checked` : ``}>
    <label for="statistic-month" class="statistic__filters-label">Month</label>

    <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${filter === StatisticFilter.YEAR ? `checked` : ``}>
    <label for="statistic-year" class="statistic__filters-label">Year</label>
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${watchedCount ? watchedCount : `0`}<span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${getDurationForStatistic(totalDuration)}</p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${topGenre ? topGenre : ``}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

  </section>`;
};

export default class Statistic extends SmartView {
  constructor(statisticData, moviesModel) {
    super();
    this._statisticData = statisticData;
    this._moviesModel = moviesModel;
    this._statisticInputHandler = this._statisticInputHandler.bind(this);
  }

  getTemplate() {
    return createStatisticTemplate(this._statisticData, getUserStatus(this._moviesModel.getWatchedCount()));
  }

  setStatisticInputHandler(callback) {
    this._callback.statisticInput = callback;
    this.getElement()
      .querySelectorAll(`.statistic__filters-input`)
      .forEach((element) => element.addEventListener(`input`, this._statisticInputHandler));
  }

  _statisticInputHandler(evt) {
    evt.preventDefault();
    this._callback.statisticInput(evt.target.value);
  }
}
