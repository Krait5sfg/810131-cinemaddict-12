import UserProfileView from './view/user-profile.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/statistics.js';
import {render, RenderPosition} from './utils/render.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import Api from './api.js';
import {UpdateType} from './const.js';

const AUTHORIZATION = `Basic qwertyuaq`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

// модель
const moviesModel = new MoviesModel();
const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const bodyElement = document.querySelector(`body`);

render(headerElement, new UserProfileView(moviesModel), RenderPosition.BEFOREEND);

// презентер
new MovieListPresenter(mainElement, bodyElement, moviesModel, filterModel, api).init();
new FilterPresenter(mainElement, filterModel, moviesModel).init();

let filmCount = null;
api.getFilms()
  .then((films) => {
    filmCount = films.length;
    moviesModel.setFilms(UpdateType.INIT, films);
    render(footerStatisticsElement, new StatisticsView(filmCount), RenderPosition.BEFOREEND);
  });
