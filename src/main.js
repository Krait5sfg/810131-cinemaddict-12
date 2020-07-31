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

const COMMON_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(headerElement, createUserProfileTemplate(), `beforeend`);
render(mainElement, createMenuTemplate(), `beforeend`);
render(mainElement, createSortingTemplate(), `beforeend`);
render(mainElement, createFilmsContainerTemplate(), `beforeend`);

const filmsElement = mainElement.querySelector(`.films`);
render(filmsElement, createFilmsListTemplate(), `beforeend`);
render(filmsElement, createFilmsListTopRatedTemplate(), `beforeend`);
render(filmsElement, createFilmsListMostCommentedTemplate(), `beforeend`);

const filmsListContainerElement = filmsElement.querySelector(`.films-list__container`);
for (let x = 0; x < COMMON_FILMS_COUNT; x++) {
  render(filmsListContainerElement, createFilmCardTemplate(), `beforeend`);
}

const filmsListExtraElements = filmsElement.querySelectorAll(`.films-list--extra`);
filmsListExtraElements.forEach((element) => {
  let filmsListExtraContainerElement = element.querySelector(`.films-list__container`);
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(filmsListExtraContainerElement, createFilmCardTemplate(), `beforeend`);
  }
});

render(footerStatisticsElement, createStatisticsTemplate(), `beforeend`);
// render(bodyElement, createFilmDetailsTemplate(), `beforeend`);
