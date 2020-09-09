import MenuView from '../view/menu.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {UpdateType, FilterType} from '../const.js';
import {filter} from '../utils/filter.js';
import StatisticPresenter from './statistic.js';

const StatisticMode = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN`
};

export default class Filter {
  constructor(mainElement, filterModel, moviesModel, movieListPresenter) {
    this._filterContainer = mainElement;
    this._filterModel = filterModel;
    this._filmsModel = moviesModel;
    this._filterElement = null;
    this._statisticPresenter = new StatisticPresenter(mainElement, moviesModel);
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

    if (prevFilterElement === null) {
      render(this._filterContainer, this._filterElement, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterElement, prevFilterElement);
    remove(prevFilterElement);
  }

  activateButtons() {
    this._filterElement.setFilterTypeChangeHandler(this._handleFilterTypeChange);
    this._filterElement.setStatsElementClickHandler(this._changeStatisticMode);
  }

  _changeStatisticMode() {
    if (this._statisticMode === StatisticMode.DEFAULT) {
      this._statisticMode = StatisticMode.OPEN;
      this._statisticPresenter.init();
      this._movieListPresenter.hiddenFilmsContainer();

      this._filterElement.addActiveInStatsElement();
      this._filterElement.removeActiveFromCurrentFilterElement(this._currentFilter);
    }
  }

  _handleModelEvent() {
    this.init();
    this.activateButtons();
  }

  _handleFilterTypeChange(filterType) {
    if (document.querySelector(`.film-details`)) {
      return;
    }

    if (filterType) {
      if (this._statisticMode === StatisticMode.OPEN) {
        this._statisticMode = StatisticMode.DEFAULT;
        this._statisticPresenter.removeStatisticElement();
        this._movieListPresenter.showFilmsContainer();
        this._filterElement.removeActiveFromStatsElement();
        this._movieListPresenter.resetBoard(); // сбрасывает показанные фильмы
      }

      this._filterModel.setFilter(UpdateType.MAJOR, filterType);
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
