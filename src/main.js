import UserProfileView from './view/user-profile.js';
import MenuView from './view/menu.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/statistics.js';
import {generateFilm} from './mock/film.js'; // функция создает мок для фильма
import {generateUser} from './mock/user.js'; // мок для пользователя
// import {generateFilmsMenu} from './mock/menu.js'; // счет фильмов для меню
import {render, BEFOREEND} from './utils/render.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const COMMON_FILMS_COUNT = 20;

// создание моков для фильма
const commonFilms = new Array(COMMON_FILMS_COUNT).fill(``).map(generateFilm);
const filmsCount = commonFilms.length;
// счет фильмов для меню, для статуса пользователя
// const filmsStatusCount = generateFilmsMenu(commonFilms);

const filter = {watchlist: 10, watched: 10, favorite: 10};
// мок для пользователя
const user = generateUser(filter);

// модель
const moviesModel = new MoviesModel();
moviesModel.setFilms(commonFilms);
const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const bodyElement = document.querySelector(`body`);

render(headerElement, new UserProfileView(user), BEFOREEND);
// render(mainElement, new MenuView(filter, `all movies`), BEFOREEND);
render(footerStatisticsElement, new StatisticsView(filmsCount), BEFOREEND);

// презентер
const moviePresenter = new MovieListPresenter(mainElement, bodyElement, moviesModel);
moviePresenter.init();
const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);
filterPresenter.init();
