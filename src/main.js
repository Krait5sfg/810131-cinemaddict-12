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
import {RenderPosition} from './const.js';

const CountType = {
  COMMON_FILMS_COUNT: 20,
  EXTRA_FILMS_COUNT: 2,
  RENDER_FOR_STEP: 5,
};

// создание моков для фильма
const commonFilms = new Array(CountType.COMMON_FILMS_COUNT).fill(``).map(generateFilm);
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

render(headerElement, new UserProfileView(user).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new MenuView(filmsStatusCount).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortView().getElement(), RenderPosition.BEFOREEND);

const filmsContainerElement = new FilmContainerView();
render(mainElement, filmsContainerElement.getElement(), RenderPosition.BEFOREEND);

const filmsListElement = new FilmListView();
render(filmsContainerElement.getElement(), filmsListElement.getElement(), RenderPosition.BEFOREEND);

const filmListTopRatedElement = new FilmListTopRatedView();
const filmListMostCommented = new FilmListMostCommentedView();
render(filmsContainerElement.getElement(), filmListTopRatedElement.getElement(), RenderPosition.BEFOREEND);
render(filmsContainerElement.getElement(), filmListMostCommented.getElement(), RenderPosition.BEFOREEND);

const filmsListContainerElement = new FilmsListContainerView();
render(filmsListElement.getElement(), filmsListContainerElement.getElement(), RenderPosition.BEFOREEND);

render(bodyElement, new FilmDetailView(commonFilms[0], bodyElement).getElement(), RenderPosition.BEFOREEND); // попап карточки фильма
for (let x = 0; x < CountType.RENDER_FOR_STEP; x++) {
  render(filmsListContainerElement.getElement(), new FilmCardView(commonFilms[x]).getElement(), RenderPosition.BEFOREEND);
}

const filmsListExtraElements = [
  filmListTopRatedElement.getElement(),
  filmListMostCommented.getElement()
];
filmsListExtraElements.forEach((element) => {
  const filmsListContainer = new FilmsListContainerView();
  render(element, filmsListContainer.getElement(), RenderPosition.BEFOREEND);
  const filmsListTitleElement = element.querySelector(`.films-list__title`);

  const filmsForRendering = filmsListTitleElement.textContent === `Top rated` ? topRatedFilms : topCommentedFilms;

  for (let i = 0; i < CountType.EXTRA_FILMS_COUNT; i++) {
    render(filmsListContainer.getElement(), new FilmCardView(filmsForRendering[i]).getElement(), RenderPosition.BEFOREEND);
  }
});

render(footerStatisticsElement, new StatisticsView(filmsCount).getElement(), RenderPosition.BEFOREEND);

// рендеринг фильмов при нажатии кнопки
if (commonFilms.length > CountType.RENDER_FOR_STEP) {
  let renderFilmCount = CountType.RENDER_FOR_STEP;
  const showMoreButtonElement = new ShowMoreButtonView();
  render(filmsListElement.getElement(), showMoreButtonElement.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonElement.getElement().addEventListener(`click`, (evt) => {
    evt.preventDefault();
    commonFilms
      .slice(renderFilmCount, renderFilmCount + CountType.RENDER_FOR_STEP)
      .forEach((film) => render(filmsListContainerElement.getElement(), new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderFilmCount += CountType.RENDER_FOR_STEP;
    if (renderFilmCount >= commonFilms.length) {
      showMoreButtonElement.getElement().remove();
      showMoreButtonElement.removeElement();
    }
  });
}
