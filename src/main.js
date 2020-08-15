import UserProfileView from './view/user-profile.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/statistics.js';
import {generateFilm} from './mock/film.js'; // функция создает мок для фильма
import {generateUser} from './mock/user.js'; // мок для пользователя
import {generateFilmsMenu} from './mock/menu.js'; // счет фильмов для меню
import {render, BEFOREEND} from './utils/render.js';

const COMMON_FILMS_COUNT = 20;

// создание моков для фильма
const commonFilms = new Array(COMMON_FILMS_COUNT).fill(``).map(generateFilm);
const filmsCount = commonFilms.length;
// счет фильмов для меню, для статуса пользователя
const filmsStatusCount = generateFilmsMenu(commonFilms);
// мок для пользователя
const user = generateUser(filmsStatusCount);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(headerElement, new UserProfileView(user), BEFOREEND);
render(mainElement, new MenuView(filmsStatusCount), BEFOREEND);
render(mainElement, new SortView(), BEFOREEND);
render(footerStatisticsElement, new StatisticsView(filmsCount), BEFOREEND);

// презентер
const moviePresenter = new MovieListPresenter(mainElement);
moviePresenter.init(commonFilms);
