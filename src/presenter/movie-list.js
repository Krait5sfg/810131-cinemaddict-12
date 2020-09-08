import SortView, {SortType} from '../view/sort.js';
import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import FilmsListContainerView from '../view/films-list-container.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmView from '../view/no-film.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortByDate, sortByRating} from '../utils/film.js';
import FilmPresenter from './film.js';
import {UserAction, UpdateType} from '../const.js';
import {filter} from '../utils/filter.js';
import LoadingView from '../view/loading.js';

const RENDER_FOR_STEP = 5;

export default class MovieList {
  constructor(mainElement, bodyElement, moviesModel, filterModel, api) {
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._filmsComments = null;
    this._api = api;

    this._bodyElement = bodyElement; // body страницы
    this._mainElement = mainElement; // родитель для всех элементов ниже
    this._sortElement = null;
    this._filmsContainerElement = new FilmsContainerView(); // главный контейнер для фильмов
    this._filmsListElement = new FilmsListView(); // первый внут. контейнер для всех фильмов
    this._filmsListContainerElement = new FilmsListContainerView(); // второй внут. контейнер для фильмов, в нем распорожены фильмы
    this._loadingElement = new LoadingView();
    this._showMoreButtonElement = null;
    this._noFilmElement = new NoFilmView();
    this._renderFilmCount = RENDER_FOR_STEP;
    this._isLoading = true;

    this._handleShowMoreButtonElementClick = this._handleShowMoreButtonElementClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderBoard();
  }

  hiddenFilmsContainer() {
    this._filmsContainerElement.getElement().classList.add(`visually-hidden`);
    this._sortElement.getElement().classList.add(`visually-hidden`);
  }

  showFilmsContainer() {
    this._filmsContainerElement.getElement().classList.remove(`visually-hidden`);
    this._sortElement.getElement().classList.remove(`visually-hidden`);
    this._handleSortTypeChange(SortType.DEFAULT);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._moviesModel.getFilms();
    const filteredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortByDate);
      case SortType.RATING:
        return filteredFilms.sort(sortByRating);
    }

    return filteredFilms;
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // -------сортировка
  _renderSort() {
    if (this._sortElement !== null) {
      this._sortElement = null;
    }
    this._sortElement = new SortView(this._currentSortType);
    this._sortElement.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._mainElement, this._sortElement, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }
  // -----конец сортировки

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }
    const films = this._getFilms();
    const filmCount = films.length;

    if (filmCount === 0) {
      this._renderNoFilmElement();
      return;
    }

    this._renderSort();
    render(this._mainElement, this._filmsContainerElement, RenderPosition.BEFOREEND);
    render(this._filmsContainerElement, this._filmsListElement, RenderPosition.BEFOREEND);
    render(this._filmsListElement, this._filmsListContainerElement, RenderPosition.BEFOREEND);

    this._renderFilms(films.slice(0, Math.min(filmCount, this._renderFilmCount)));

    if (filmCount > this._renderFilmCount) {
      this._renderShowMoreButton();
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmsListContainerElement, film));
  }

  // отрисовка карточки с фильмом и добавление событий
  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._bodyElement, this._handleViewAction, this._handleModeChange, this._api);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilmElement() {
    render(this._filmsListElement, this._noFilmElement, RenderPosition.BEFOREEND);
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonElement !== null) {
      this._showMoreButtonElement = null;
    }
    this._showMoreButtonElement = new ShowMoreButtonView();
    this._showMoreButtonElement.setClickHandler(this._handleShowMoreButtonElementClick);
    render(this._filmsListElement, this._showMoreButtonElement, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._mainElement, this._loadingElement, RenderPosition.BEFOREEND);
  }

  _handleShowMoreButtonElementClick() {
    const filmCount = this._getFilms().length;
    const newRenderFilmCount = Math.min(filmCount, this._renderFilmCount + RENDER_FOR_STEP);
    const films = this._getFilms().slice(this._renderFilmCount, newRenderFilmCount);
    this._renderFilms(films);
    this._renderFilmCount = newRenderFilmCount;

    if (this._renderFilmCount >= filmCount) {
      remove(this._showMoreButtonElement);
    }
  }

  _handleViewAction(actionType, updateType, update, handleRequestError) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update).then((response) => {
          this._moviesModel.updateFilm(updateType, response);
        });
        break;
      case UserAction.DELETE_COMMENT:
        this._api.deleteComment(update.deletedIdComment)
          .then(() => {
            this._moviesModel.updateFilm(updateType, update);
          })
          .catch(() => {
            // при ошибке удаляемый коментарий трясется
            handleRequestError();
          });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update)
          .then((response) => {
            this._moviesModel.updateFilm(updateType, response);
          })
          .catch(() => {
            // при ошибке форма с полем ввода комментария трясется
            handleRequestError();
          });
    }
  }

  _handleModelEvent(updateType, updatedValue) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._filmPresenter[updatedValue.id].init(updatedValue);
        break;
      case UpdateType.MAJOR:
        this._clearBoard({resetRenderedFilmCount: true, resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingElement);
        this._renderBoard();
        break;
    }
  }

  _clearBoard({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};

    remove(this._sortElement);
    remove(this._noFilmElement);
    remove(this._loadingElement);
    remove(this._showMoreButtonElement);

    if (resetRenderedFilmCount) {
      this._renderFilmCount = RENDER_FOR_STEP;
    } else {
      this._renderFilmCount = Math.min(filmCount, this._renderFilmCount);
    }
    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  resetBoard() {
    this._clearBoard({resetRenderedFilmCount: true});
    this._renderBoard();
  }
}
