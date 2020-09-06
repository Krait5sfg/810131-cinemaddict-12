import UserProfileView from './view/user-profile.js';
import MovieListPresenter from './presenter/movie-list.js';
import MovieCounterView from './view/movie-counter.js';
import {render, RenderPosition} from './utils/render.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import Api from './api.js';
import {UpdateType} from './const.js';
import StatisticPresenter from './presenter/statistic.js';

const AUTHORIZATION = `Basic qwertuioy`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const bodyElement = document.querySelector(`body`);

// модель, api, презентеры
const moviesModel = new MoviesModel();
const api = new Api(END_POINT, AUTHORIZATION);
const filterModel = new FilterModel();
const statisticPresenter = new StatisticPresenter(mainElement, moviesModel);
const movieListPresenter = new MovieListPresenter(mainElement, bodyElement, moviesModel, filterModel, api);
const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel, statisticPresenter, movieListPresenter);

render(headerElement, new UserProfileView(moviesModel), RenderPosition.BEFOREEND);
movieListPresenter.init();
filterPresenter.init();
api.getFilms()
  .then((films) => {
    moviesModel.setFilms(UpdateType.INIT, films);
    render(footerStatisticsElement, new MovieCounterView(films.length), RenderPosition.BEFOREEND);
    filterPresenter.activateButtons();
  });
