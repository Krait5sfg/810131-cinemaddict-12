import MenuView from '../view/menu.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UpdateType, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';

const StatisticMode = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN`
};

export default class Filter {
  constructor(filterContainer, filterModel, filmsModel, statisticPresenter, movieListPresenter) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._filterElement = null;
    this._statisticPresenter = statisticPresenter;
    this._movieListPresenter = movieListPresenter;

    this._currentFilter = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._changeStatisticMode = this._changeStatisticMode.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._statisticMode = StatisticMode.DEFAULT;
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterElement = this._filterElement;

    this._filterElement = new MenuView(filters, this._currentFilter);
    this._filterElement.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterElement.setStatsElementClickHandler(this._changeStatisticMode);

    if (prevFilterElement === null) {
      render(this._filterContainer, this._filterElement, RenderPosition.AFTERBEGIN);
      return;
    }
    replace(this._filterElement, prevFilterElement);
    remove(prevFilterElement);
  }

  _changeStatisticMode() {
    if (this._movieListPresenter.getFilmContainerElement() && this._movieListPresenter.getSortElement()) {
      if (this._statisticMode === StatisticMode.DEFAULT) {
        this._statisticMode = StatisticMode.OPEN;
        this._statisticPresenter.init();
        this._movieListPresenter.hiddenFilmsContainer();

        this._filterElement.addActiveInStatsElement();
        this._filterElement.removeActiveFromCurrentFilterElement(this._currentFilter);
      } else {
        return;
      }
    } else {
      return;
    }
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._statisticMode === StatisticMode.OPEN) {
      this._statisticMode = StatisticMode.DEFAULT;
      this._statisticPresenter.removeStatisticElement();
      this._movieListPresenter.showFilmsContainer();
      this._filterElement.removeActiveFromStatsElement();
      this._movieListPresenter.resetBoard(); // сбрасывает показанные фильмы
    }

    // проверка убирает ошибку когда фильмы не загружены, но пользователь делает клик по пункту меню
    if (this._movieListPresenter.getFilmContainerElement() && this._movieListPresenter.getSortElement()) {
      this._filterModel.setFilter(UpdateType.MAJOR, filterType);
    } else {
      return;
    }
  }

  _getFilters() {
    const films = this._filmsModel.getFilms();

    return [
      {
        type: FilterType.WATCHLIST,
        name: `Watchlist`,
        count: filter[FilterType.WATCHLIST](films).length
      },
      {
        type: FilterType.HISTORY,
        name: `History`,
        count: filter[FilterType.HISTORY](films).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](films).length
      }
    ];
  }
}
