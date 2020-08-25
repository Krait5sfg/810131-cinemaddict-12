import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const createMenuTemplate = (filter, currentFilter) => {
  console.log(filter);
  const {watchlist, watched, favorite} = filter;

  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${currentFilter === FilterType.ALL_MOVIES ? `main-navigation__item--active` : ``}">All movies</a>
        <a href="#watchlist" class="main-navigation__item ${currentFilter === FilterType.WATCHLIST ? `main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${watchlist}</span></a>
        <a href="#history" class="main-navigation__item ${currentFilter === FilterType.HISTORY ? `main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${watched}</span></a>
        <a href="#favorites" class="main-navigation__item ${currentFilter === FilterType.FAVORITES ? `main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
};

export default class Menu extends AbstractView {
  constructor(filter, currentFilterType) {
    super();
    this._filter = filter;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
