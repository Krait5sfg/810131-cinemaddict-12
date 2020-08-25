import SortView, { SortType } from '../view/sort.js';
import FilmContainerView from '../view/films-container.js';
import FilmListView from '../view/films-list.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmListTopRatedView from '../view/films-list-top-rated.js';
import FilmListMostCommentedView from '../view/films-list-most-commented.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmView from '../view/no-film.js';
import { render, BEFOREEND, remove } from '../utils/render.js';
import { sortByDate, sortByRating } from '../utils/film.js';
import FilmPresenter from './film.js';
// import { updateItem } from '../utils/common.js';
import { UserAction, UpdateType } from '../const.js';

const CountType = {
  COMMON_FILMS: 20,
  EXTRA_FILMS: 2,
  RENDER_FOR_STEP: 5,
};

export default class MovieList {
  constructor(mainElement, bodyElement, moviesModel) {
    this._moviesModel = moviesModel;

    this._bodyElement = bodyElement; // body страницы
    this._mainElement = mainElement; // родитель для всех элементов ниже
    this._sortElement = new SortView();
    this._filmsContainerElement = new FilmContainerView(); // главный контейнер для фильмов
    this._filmsListElement = new FilmListView(); // первый внут. контейнер для всех фильмов
    this._filmsListContainerElement = new FilmsListContainerView(); // второй внут. контейнер для фильмов, в нем распорожены фильмы
    // this._filmListTopRatedElement = new FilmListTopRatedView();
    // this._filmListMostCommentedElement = new FilmListMostCommentedView();
    this._showMoreButtonElement = new ShowMoreButtonView();
    this._noFilmElement = new NoFilmView();
    this._renderFilmCount = CountType.RENDER_FOR_STEP;

    this._handleShomMoreButtonElementClick = this._handleShomMoreButtonElementClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    // this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    // this._filmTopRatedPresenter = {};
    // this._filmMostCommentedPresenter = {};
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderSort();
    render(this._mainElement, this._filmsContainerElement, BEFOREEND);
    render(this._filmsContainerElement, this._filmsListElement, BEFOREEND);
    if (!this._getFilms().length) {
      this._renderNoFilmElement();
      return;
    }
    // this._sourceFilms = films.slice(); // сохраняем исходный массив для сортировки
    // this._films = films.slice();
    // this._topRatedFilms = films.slice().sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating);
    // this._mostCommentedFilms = films.slice().sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);

    render(this._filmsListElement, this._filmsListContainerElement, BEFOREEND);
    this._renderFilmsList();

    // отрисовка Top rated и Most commented компонентов с фильмами
    // this._renderTopRatedBoard(this._topRatedFilms.slice(0, CountType.EXTRA_FILMS));
    // this._renderMostCommentedBoard(this._mostCommentedFilms.slice(0, CountType.EXTRA_FILMS));
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return this._moviesModel.getFilms().slice().sort(sortByDate);
      case SortType.RATING:
        return this._moviesModel.getFilms().slice().sort(sortByRating);
    }

    return this._moviesModel.getFilms();
  }

  _handleModeChange() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  // -------сортировка
  _renderSort() {
    render(this._mainElement, this._sortElement, BEFOREEND);
    this._sortElement.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _handleSortTypeChange(sortType) {
    if (this._currenSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmsList();
  }
  // -----конец сортировки

  // удаляет каждый фильм
  _clearFilmList() {
    Object.values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderFilmCount = CountType.RENDER_FOR_STEP;
  }

  // _renderTopRatedBoard(films) {
  //   const filmListContainerElement = new FilmsListContainerView();
  //   render(this._filmsContainerElement, this._filmListTopRatedElement, BEFOREEND);
  //   render(this._filmListTopRatedElement, filmListContainerElement, BEFOREEND);
  //   films.forEach((film) => this._renderTopRatedFilm(filmListContainerElement, film));
  // }

  // _renderMostCommentedBoard(films) {
  //   const filmListContainerElement = new FilmsListContainerView();
  //   render(this._filmsContainerElement, this._filmListMostCommentedElement, BEFOREEND);
  //   render(this._filmListMostCommentedElement, filmListContainerElement, BEFOREEND);
  //   films.forEach((film) => this._renderMostCommenterFilm(filmListContainerElement, film));
  // }

  _renderFilmsList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, CountType.RENDER_FOR_STEP));
    this._renderFilms(films);

    if (filmCount > CountType.RENDER_FOR_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(this._filmsListContainerElement, film));
  }

  // отрисовка карточки с фильмом и добавление событий
  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._bodyElement, this._handleViewAction, this._handleModeChange);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  // _renderTopRatedFilm(container, film) {
  //   const filmPresenter = new FilmPresenter(container, this._bodyElement, this._handleFilmChange);
  //   filmPresenter.init(film);
  //   this._filmTopRatedPresenter[film.id] = filmPresenter;
  // }

  // _renderMostCommenterFilm(container, film) {
  //   const filmPresenter = new FilmPresenter(container, this._bodyElement, this._handleFilmChange);
  //   filmPresenter.init(film);
  //   this._filmMostCommentedPresenter[film.id] = filmPresenter;
  // }

  _renderNoFilmElement() {
    render(this._filmsListElement, this._noFilmElement, BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsListElement, this._showMoreButtonElement, BEFOREEND);
    this._showMoreButtonElement.setClickHandler(this._handleShomMoreButtonElementClick);
  }

  _handleShomMoreButtonElementClick() {
    const filmCount = this._getFilms().length;
    const newRenderFilmCount = Math.min(filmCount, this._renderFilmCount + CountType.RENDER_FOR_STEP);
    const films = this._getFilms().slice(this._renderFilmCount, newRenderFilmCount);
    this._renderFilms(films);
    this._renderFilmCount = newRenderFilmCount;

    if (this._renderFilmCount >= filmCount) {
      remove(this._showMoreButtonElement);
    }
  }

  // обработчик изменения данных - этот метод передается в presenter/film как changeData
  // _handleFilmChange(updatedFilm) {
  // Будем вызывать обновление модели
  //   this._filmPresenter[updatedFilm.id].init(updatedFilm); // инициализация фильма с изм. данными
  // }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._moviesModel.updateFilm(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._filmPresenter[data.id].init(data);
        break;
    }
  }
}
