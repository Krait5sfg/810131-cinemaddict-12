import {createUserProfileTemplate} from './view/user-profile.js';
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
import {generateFilmMenuCount} from './mock/menu.js'; // счет фильмов для меню
import {createObjectCountFromArray} from './utils.js';

const CountType = {
  COMMON_FILMS_COUNT: 20,
  EXTRA_FILMS_COUNT: 2,
  RENDER_FOR_STEP: 5,
};

// создание моков для фильма
const commonFilms = new Array(CountType.COMMON_FILMS_COUNT).fill().map(generateFilm);
const topRatedFilms = commonFilms.slice().sort((firstFilm, secondFilm) => firstFilm.rating < secondFilm.rating ? 1 : -1);
const topCommentedFilms = commonFilms.slice().sort((firstFilm, secondFilm) => firstFilm.comments.length < secondFilm.comments.length ? 1 : -1
);
const filmsCount = commonFilms.length;
// счет фильмов для меню, для статуса пользователя
const filmsStatusCount = generateFilmMenuCount(commonFilms);
const countFilmsStatus = createObjectCountFromArray(filmsStatusCount);
// мок для пользователя
const user = generateUser(countFilmsStatus);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createUserProfileTemplate(user), `beforeend`);
render(mainElement, createMenuTemplate(countFilmsStatus), `beforeend`);
render(mainElement, createSortingTemplate(), `beforeend`);
render(mainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, createFilmsListTemplate(), `beforeend`);
render(filmsElement, createFilmsListTopRatedTemplate(), `beforeend`);
render(filmsElement, createFilmsListMostCommentedTemplate(), `beforeend`);

const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
// render(bodyElement, createFilmDetailsTemplate(commonFilms[0]), `beforeend`); // попап карточки фильма
for (let x = 0; x < CountType.RENDER_FOR_STEP; x++) {
  render(filmsListContainerElement, createFilmCardTemplate(commonFilms[x]), `beforeend`);
}

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);
filmsListExtraElements.forEach((element) => {
  const filmsListExtraContainerElement = element.querySelector(`.films-list__container`);
  const filmsListTitleElement = element.querySelector(`.films-list__title`);

  if (filmsListTitleElement.textContent === `Top rated`) {
    for (let i = 0; i < CountType.EXTRA_FILMS_COUNT; i++) {
      render(filmsListExtraContainerElement, createFilmCardTemplate(topRatedFilms[i]), `beforeend`);
    }
  } else {
    for (let i = 0; i < CountType.EXTRA_FILMS_COUNT; i++) {
      render(filmsListExtraContainerElement, createFilmCardTemplate(topCommentedFilms[i]), `beforeend`);
    }
  }
});

render(footerStatisticsElement, createStatisticsTemplate(filmsCount), `beforeend`);

// рендеринг фильмов при нажатии кнопки
if (commonFilms.length > CountType.RENDER_FOR_STEP) {
  let renderFilmCount = CountType.RENDER_FOR_STEP;
  const showMoreElement = document.querySelector(`.films-list__show-more`);

  showMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    commonFilms
      .slice(renderFilmCount, renderFilmCount + CountType.RENDER_FOR_STEP)
      .forEach((film) => render(filmsListContainerElement, createFilmCardTemplate(film), `beforeend`));

    renderFilmCount += CountType.RENDER_FOR_STEP;
    if (renderFilmCount >= commonFilms.length) {
      showMoreElement.remove();
    }
  });
}

