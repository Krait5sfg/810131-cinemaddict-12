import UserProfileView from './view/user-profile.js';
import MovieListPresenter from './presenter/movie-list.js';
import StatisticsView from './view/statistics.js';
import {generateFilm} from './mock/film.js'; // функция создает мок для фильма
import {render, RenderPosition} from './utils/render.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import {generateComment} from './mock/comment.js';
import Api from './api.js';
import {UpdateType} from './const.js';

const COMMON_FILMS_COUNT = 20;
const AUTHORIZATION = `Basic qwerty`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict/`;

// const chunk = (input, size) => {
//   return input.reduce((arr, item, idx) => {
//     return idx % size === 0
//       ? [...arr, [item]]
//       : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
//   }, []);
// };

// создание моков
// const commonFilms = new Array(COMMON_FILMS_COUNT).fill(``).map(generateFilm);
// const filmsCount = commonFilms.length;
// const filmsComments = new Array(COMMON_FILMS_COUNT * 3).fill(``).map(generateComment);
// const filmsCommentsId = chunk(filmsComments.map((comment) => comment.id), 3);
// // связывает комментарии с фильмом
// for (let i = 0; i < commonFilms.length; i++) {
//   commonFilms[i].comments = filmsCommentsId[i].slice();
// }



// модель
const moviesModel = new MoviesModel();
// moviesModel.setFilms(commonFilms);
const api = new Api(END_POINT, AUTHORIZATION);

const filterModel = new FilterModel();

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);
const bodyElement = document.querySelector(`body`);

render(footerStatisticsElement, new StatisticsView(), RenderPosition.BEFOREEND);
render(headerElement, new UserProfileView(moviesModel), RenderPosition.BEFOREEND);

// презентер
new MovieListPresenter(mainElement, bodyElement, moviesModel, filterModel).init();
new FilterPresenter(mainElement, filterModel, moviesModel).init();

api.getFilms()
  .then((films) => {
    moviesModel.setFilms(UpdateType.INIT, films);
  });
  // .catch(() => {
  //   moviesModel.setFilms(UpdateType.INIT, []);
  // });
