import SortView, {SortType} from '../view/sort.js';
import FilmContainerView from '../view/films-container.js';
import FilmListView from '../view/films-list.js';
import FilmsListContainerView from '../view/films-list-container.js';
import FilmListTopRatedView from '../view/films-list-top-rated.js';
import FilmListMostCommentedView from '../view/films-list-most-commented.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import NoFilmView from '../view/no-film.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailView from '../view/film-details.js';
import {render, BEFOREEND, remove} from '../utils/render.js';
import {sortByDate, sortByRating} from '../utils/film.js';

const CountType = {
  COMMON_FILMS: 20,
  EXTRA_FILMS: 2,
  RENDER_FOR_STEP: 5,
};

const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export default class MovieList {
  constructor(mainElement) {
    this._mainElement = mainElement; // родитель для всех элементов
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

    this._renderExtraBoard(this._filmListTopRatedElement, this._topRatedFilms);
    this._renderExtraBoard(this._filmListMostCommentedElement, this._mostCommentedFilms);
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

  _clearFilmList() {
    this._filmsListContainerElement.getElement().innerHTML = ``;
    this._renderFilmCount = CountType.RENDER_FOR_STEP;
  }
  // -----конец сортировки

  _renderExtraBoard(extraBoardContainer, films) {
    const filmListContainerElement = new FilmsListContainerView();
    render(this._filmsContainerElement, extraBoardContainer, BEFOREEND);
    render(extraBoardContainer, filmListContainerElement, BEFOREEND);
    films.slice(0, CountType.EXTRA_FILMS).forEach((film) => this._renderFilm(filmListContainerElement, film));
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

  _renderFilm(container, film) {
    const filmCardElement = new FilmCardView(film);
    const filmDetailElement = new FilmDetailView(film);
    const bodyElement = document.querySelector(`body`);

    const hideFilmDetail = () => {
      bodyElement.removeChild(filmDetailElement.getElement());
      bodyElement.classList.remove(`hide-overflow`);
    };

    const showFilmDetail = () => {
      bodyElement.appendChild(filmDetailElement.getElement());
      bodyElement.classList.add(`hide-overflow`);
      document.addEventListener(`keydown`, onEscKeyDown);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
        evt.preventDefault();
        hideFilmDetail();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    filmCardElement.setClickHandler(showFilmDetail);

    filmDetailElement.setClickHandler(() => {
      hideFilmDetail();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(container, filmCardElement, BEFOREEND);
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
}
