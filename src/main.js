import UserProfileView from './view/user-profile.js';
import {createMenuTemplate} from './view/menu.js';
import {createSortingTemplate} from './view/sorting.js';
import {createFilmsContainerTemplate} from './view/films-container.js';
import {createFilmsListTemplate} from './view/films-list.js';
import {createFilmsListTopRatedTemplate} from './view/films-list-top-rated.js';
import {createFilmsListMostCommentedTemplate} from './view/films-list-most-commented.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createStatisticsTemplate} from './view/statistics.js';
// import {createFilmDetailsTemplate, bodyElement} from './view/film-details.js';
import {generateFilm} from './mock/film.js'; // функция создает мок для фильма
import {generateUser} from './mock/user.js'; // мок для пользователя
import {generateFilmsMenu} from './mock/menu.js'; // счет фильмов для меню
import {renderTemplate, renderElement} from './utils.js';
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

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

renderElement(headerElement, new UserProfileView(user).getElement(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createMenuTemplate(filmsStatusCount), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createSortingTemplate(), RenderPosition.BEFOREEND);
renderTemplate(mainElement, createFilmsContainerTemplate(), RenderPosition.BEFOREEND);

const filmsElement = mainElement.querySelector(`.films`);
renderTemplate(filmsElement, createFilmsListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filmsElement, createFilmsListTopRatedTemplate(), RenderPosition.BEFOREEND);
renderTemplate(filmsElement, createFilmsListMostCommentedTemplate(), RenderPosition.BEFOREEND);

const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
// render(bodyElement, createFilmDetailsTemplate(commonFilms[0]), `beforeend`); // попап карточки фильма
for (let x = 0; x < CountType.RENDER_FOR_STEP; x++) {
  renderTemplate(filmsListContainerElement, createFilmCardTemplate(commonFilms[x]), RenderPosition.BEFOREEND);
}

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);
filmsListExtraElements.forEach((element) => {
  const filmsListExtraContainerElement = element.querySelector(`.films-list__container`);
  const filmsListTitleElement = element.querySelector(`.films-list__title`);

  const filmsForRendering = filmsListTitleElement.textContent === `Top rated` ? topRatedFilms : topCommentedFilms;

  for (let i = 0; i < CountType.EXTRA_FILMS_COUNT; i++) {
    renderTemplate(filmsListExtraContainerElement, createFilmCardTemplate(filmsForRendering[i]), RenderPosition.BEFOREEND);
  }
});

renderTemplate(footerStatisticsElement, createStatisticsTemplate(filmsCount), RenderPosition.BEFOREEND);

// рендеринг фильмов при нажатии кнопки
if (commonFilms.length > CountType.RENDER_FOR_STEP) {
  let renderFilmCount = CountType.RENDER_FOR_STEP;
  const showMoreElement = document.querySelector(`.films-list__show-more`);

  showMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    commonFilms
      .slice(renderFilmCount, renderFilmCount + CountType.RENDER_FOR_STEP)
      .forEach((film) => renderTemplate(filmsListContainerElement, createFilmCardTemplate(film), RenderPosition.BEFOREEND));

    renderFilmCount += CountType.RENDER_FOR_STEP;
    if (renderFilmCount >= commonFilms.length) {
      showMoreElement.remove();
    }
  });
}

