import AbstractView from './abstract.js';

const LINK_NODE_NAME = `A`;

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};

const createSortTemplate = (currentSortType) => {
  return `<ul class="sort">
      <li><a href="#" data-sort-type="${SortType.DEFAULT}" class="sort__button ${currentSortType === SortType.DEFAULT ? `sort__button--active` : ``}">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SortType.DATE}" class="sort__button ${currentSortType === SortType.DATE ? `sort__button--active` : ``}">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SortType.RATING}" class="sort__button ${currentSortType === SortType.RATING ? `sort__button--active` : ``}">Sort by rating</a></li>
    </ul>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType) {
    super();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currentSortType = currentSortType;
  }

  getTemplate() {
    return createSortTemplate(this._currentSortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._handleSortTypeChange);
  }

  _handleSortTypeChange(evt) {
    if (evt.target.nodeName !== LINK_NODE_NAME) {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
    const sortButtonsElements = this.getElement().querySelectorAll(`.sort__button`);
    sortButtonsElements.forEach((element) => element.classList.remove(`sort__button--active`));
    evt.target.classList.add(`sort__button--active`);
  }
}

export {SortType};
