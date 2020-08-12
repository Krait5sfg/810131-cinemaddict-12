import UserProfileView from './view/user-profile.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmContainerView from './view/films-container.js';
import FilmListView from './view/films-list.js';
import FilmListTopRatedView from './view/films-list-top-rated.js';
import FilmListMostCommentedView from './view/films-list-most-commented.js';
import FilmsListContainerView from './view/films-list-container.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmCardView from './view/film-card.js';
import StatisticsView from './view/statistics.js';
import FilmDetailView from './view/film-details.js';
import {generateFilm} from './mock/film.js'; // функция создает мок для фильма
import {generateUser} from './mock/user.js'; // мок для пользователя
import {generateFilmsMenu} from './mock/menu.js'; // счет фильмов для меню
import {render} from './utils.js';
import {BEFOREEND} from './const.js';

const CountType = {
  COMMON_FILMS: 20,
  EXTRA_FILMS: 2,
  RENDER_FOR_STEP: 5,
};

const renderFilm = (filmsListContainerElement, film) => {
  const filmCardElement = new FilmCardView(film);
  const filmDetailElement = new FilmDetailView(film);

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
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      hideFilmDetail();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardElement.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => showFilmDetail());
  filmCardElement.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => showFilmDetail());
  filmCardElement.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => showFilmDetail());

  filmDetailElement.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    hideFilmDetail();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListContainerElement, filmCardElement.getElement(), BEFOREEND);
};

// создание моков для фильма
const commonFilms = new Array(CountType.COMMON_FILMS).fill(``).map(generateFilm);
const topRatedFilms = commonFilms.slice().sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating);
const topCommentedFilms = commonFilms.slice().sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);
const filmsCount = commonFilms.length;
// счет фильмов для меню, для статуса пользователя
const filmsStatusCount = generateFilmsMenu(commonFilms);
// мок для пользователя
const user = generateUser(filmsStatusCount);

const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(headerElement, new UserProfileView(user).getElement(), BEFOREEND);
render(mainElement, new MenuView(filmsStatusCount).getElement(), BEFOREEND);
render(mainElement, new SortView().getElement(), BEFOREEND);

const filmsContainerElement = new FilmContainerView();
render(mainElement, filmsContainerElement.getElement(), BEFOREEND);

const filmsListElement = new FilmListView();
render(filmsContainerElement.getElement(), filmsListElement.getElement(), BEFOREEND);

const filmListTopRatedElement = new FilmListTopRatedView();
const filmListMostCommented = new FilmListMostCommentedView();
render(filmsContainerElement.getElement(), filmListTopRatedElement.getElement(), BEFOREEND);
render(filmsContainerElement.getElement(), filmListMostCommented.getElement(), BEFOREEND);

const filmsListContainerElement = new FilmsListContainerView();
render(filmsListElement.getElement(), filmsListContainerElement.getElement(), BEFOREEND);

for (let i = 0; i < CountType.RENDER_FOR_STEP; i++) {
  renderFilm(filmsListContainerElement.getElement(), commonFilms[i]);
}

const filmsListExtraElements = [
  filmListTopRatedElement.getElement(),
  filmListMostCommented.getElement()
];
filmsListExtraElements.forEach((element) => {
  const filmsListContainer = new FilmsListContainerView();
  render(element, filmsListContainer.getElement(), BEFOREEND);
  const filmsListTitleElement = element.querySelector(`.films-list__title`);

  const filmsForRendering = filmsListTitleElement.textContent === `Top rated` ? topRatedFilms : topCommentedFilms;

  for (let i = 0; i < CountType.EXTRA_FILMS; i++) {
    renderFilm(filmsListContainer.getElement(), filmsForRendering[i]);
  }
});

render(footerStatisticsElement, new StatisticsView(filmsCount).getElement(), BEFOREEND);

// рендеринг фильмов при нажатии кнопки
if (commonFilms.length > CountType.RENDER_FOR_STEP) {
  let renderFilmCount = CountType.RENDER_FOR_STEP;
  const showMoreButtonElement = new ShowMoreButtonView();
  render(filmsListElement.getElement(), showMoreButtonElement.getElement(), BEFOREEND);

  showMoreButtonElement.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    commonFilms
      .slice(renderFilmCount, renderFilmCount + CountType.RENDER_FOR_STEP)
      .forEach((film) => renderFilm(filmsListContainerElement.getElement(), film));

    renderFilmCount += CountType.RENDER_FOR_STEP;
    if (renderFilmCount >= commonFilms.length) {
      showMoreButtonElement.getElement().remove();
      showMoreButtonElement.removeElement();
    }
  });
}
