import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const COUNT_LIMIT = 5;

const createMenuItemTemplate = ({type, name, count}, currentFilter) => {
  return `<a href="#watchlist" class="main-navigation__item ${type === currentFilter ? `main-navigation__item--active` : ``}" data-filter-type="${type}">${name} ${count > COUNT_LIMIT ? `` : `<span class="main-navigation__item-count">${count}</span>`}</a>`;
};

const createMenuTemplate = (filterItems, currentFilter) => {
  const menuItemsTemplate = filterItems
    .map((filter) => createMenuItemTemplate(filter, currentFilter)).join(``);
  return `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item ${currentFilter === FilterType.ALL_MOVIES ? `main-navigation__item--active` : ``}" data-filter-type="${FilterType.ALL_MOVIES}">All movies</a>
        ${menuItemsTemplate}
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
    this._statsElementClickHandler = this._statsElementClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._filter, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .querySelectorAll(`.main-navigation__item`)
      .forEach((element) => element.addEventListener(`click`, this._filterTypeChangeHandler));
  }

  _statsElementClickHandler(evt) {
    evt.preventDefault();
    this._callback.statsElementClick();
  }

  setStatsElementClickHandler(callback) {
    this._callback.statsElementClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._statsElementClickHandler);
  }

  removeActiveFromStatsElement() {
    this.getElement()
      .querySelector(`.main-navigation__additional`)
      .classList.remove(`main-navigation__item--active`);
  }

  addActiveInStatsElement() {
    this.getElement()
      .querySelector(`.main-navigation__additional`)
      .classList.add(`main-navigation__item--active`);
  }

  removeActiveFromCurrentFilterElement(currentFilter) {
    this.getElement()
      .querySelector(`.main-navigation__item[data-filter-type="${currentFilter}"]`)
      .classList.remove(`main-navigation__item--active`);
  }

  addActiveInCurrentFilterElement(currentFilter) {
    this.getElement()
      .querySelector(`.main-navigation__item[data-filter-type="${currentFilter}"]`)
      .classList.add(`main-navigation__item--active`);
  }
}
