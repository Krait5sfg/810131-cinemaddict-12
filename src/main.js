import UserProfileView from './view/user-profile.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/statistics.js';
import {generateFilm} from './mock/film.js'; // функция создает мок для фильма
import {render, RenderPosition} from './utils/render.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';

const COMMON_FILMS_COUNT = 20;

// создание моков для фильма
const commonFilms = new Array(COMMON_FILMS_COUNT).fill(``).map(generateFilm);
const filmsCount = commonFilms.length;

// модель
const moviesModel = new MoviesModel();
moviesModel.setFilms(commonFilms);
const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const bodyElement = document.querySelector(`body`);

render(footerStatisticsElement, new StatisticsView(filmsCount), RenderPosition.BEFOREEND);
render(headerElement, new UserProfileView(moviesModel), RenderPosition.BEFOREEND);

// презентер
new MovieListPresenter(mainElement, bodyElement, moviesModel, filterModel).init();
new FilterPresenter(mainElement, filterModel, moviesModel).init();
