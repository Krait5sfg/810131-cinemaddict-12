import SortView, {SortType} from '../view/sort.js';
import FilmContainerView from '../view/films-container.js';
import FilmListView from '../view/films-list.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmListTopRatedView from '../view/films-list-top-rated.js';
import FilmListMostCommentedView from '../view/films-list-most-commented.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmView from '../view/no-film.js';
import {render, BEFOREEND, remove} from '../utils/render.js';
import {sortByDate, sortByRating} from '../utils/film.js';
import FilmPresenter from './film.js';
import {updateItem} from '../utils/common.js';

const CountType = {
  COMMON_FILMS: 20,
  EXTRA_FILMS: 2,
  RENDER_FOR_STEP: 5,
};

export default class MovieList {
  constructor(mainElement, bodyElement) {
    this._bodyElement = bodyElement; // body страницы
    this._mainElement = mainElement; // родитель для всех элементов ниже
    this._sortElement = new SortView();
    this._filmsContainerElement = new FilmContainerView(); // главный контейнер для фильмов
    this._filmsListElement = new FilmListView(); // первый внут. контейнер для всех фильмов
    this._filmsListContainerElement = new FilmsListContainerView(); // второй внут. контейнер для фильмов, в нем распорожены фильмы
    this._filmListTopRatedElement = new FilmListTopRatedView();
    this._filmListMostCommentedElement = new FilmListMostCommentedView();
    this._showMoreButtonElement = new ShowMoreButtonView();
    this._noFilmElement = new NoFilmView();
    this._renderFilmCount = CountType.RENDER_FOR_STEP;
    this._handleShomMoreButtonElementClick = this._handleShomMoreButtonElementClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._currenSortType = SortType.DEFAULT;
    this._filmPresenter = {};
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._renderSort();
    render(this._mainElement, this._filmsContainerElement, BEFOREEND);
    render(this._filmsContainerElement, this._filmsListElement, BEFOREEND);
    if (!films.length) {
      this._renderNoFilmElement();
      return;
    }
    this._sourceFilms = films.slice(); // сохраняем исходный массив для сортировки
    this._films = films.slice();
    this._topRatedFilms = films.slice().sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating);
    this._mostCommentedFilms = films.slice().sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);

    render(this._filmsListElement, this._filmsListContainerElement, BEFOREEND);
    this._renderFilmsList();

    // отрисовка Top rated и Most commented компонентов с фильмами
    this._renderExtraBoard(this._filmListTopRatedElement, this._topRatedFilms.slice(0, CountType.EXTRA_FILMS));
    this._renderExtraBoard(this._filmListMostCommentedElement, this._mostCommentedFilms.slice(0, CountType.EXTRA_FILMS));
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
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmsList();
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortByDate);
        break;
      case SortType.RATING:
        this._films.sort(sortByRating);
        break;
      default:
        this._films = this._sourceFilms.slice();
    }
    this._currenSortType = sortType;
  }
  // -----конец сортировки

  // удаляет каждый фильм
  _clearFilmList() {
    Object.values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenter = {};
    this._renderFilmCount = CountType.RENDER_FOR_STEP;
  }

  _renderExtraBoard(extraBoardContainer, films) {
    const filmListContainerElement = new FilmsListContainerView();
    render(this._filmsContainerElement, extraBoardContainer, BEFOREEND);
    render(extraBoardContainer, filmListContainerElement, BEFOREEND);
    films.forEach((film) => this._renderFilm(filmListContainerElement, film));
  }

  _renderFilmsList() {
    this._renderFilms(0, Math.min(this._films.length, CountType.RENDER_FOR_STEP));
    if (this._films.length > CountType.RENDER_FOR_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(this._filmsListContainerElement, film));
  }

  // отрисовка карточки с фильмом и добавление событий
  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._bodyElement);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderNoFilmElement() {
    render(this._filmsListElement, this._noFilmElement, BEFOREEND);
  }

  _renderShowMoreButton() {
    render(this._filmsListElement, this._showMoreButtonElement, BEFOREEND);
    this._showMoreButtonElement.setClickHandler(this._handleShomMoreButtonElementClick);
  }

  _handleShomMoreButtonElementClick() {
    this._renderFilms(this._renderFilmCount, this._renderFilmCount + CountType.RENDER_FOR_STEP);
    this._renderFilmCount += CountType.RENDER_FOR_STEP;
    if (this._renderFilmCount >= this._films.length) {
      remove(this._showMoreButtonElement);
    }
  }

  // обработчик изменения данных
  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourceFilms = updateItem(this._sourceFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm); // инициализация фильма с изм. данными
  }
}
