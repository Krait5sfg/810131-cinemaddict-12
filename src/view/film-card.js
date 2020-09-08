import {getConvertingDate, getHumaniseDuration, TypeTemplate} from '../utils/common.js';
import AbstractView from './abstract.js';

const LetterLimit = {
  CUSTOM: 140,
  MIN: 0,
  MAX: 139,
};

const createFilmCardTemplate = (film) => {

  const {title, rating, releaseDate, duration, genres, image, description, comments, status} = film;
  const {favorite, watched, watchlist} = status;
  const genre = genres[0];
  const year = getConvertingDate(releaseDate, TypeTemplate.FILM_CARD);
  const humanizeDuration = getHumaniseDuration(duration);
  return `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${humanizeDuration}</span>
        <span class="film-card__genre">${genre ? genre : ``}</span>
      </p>
      <img src="${image}" alt="" class="film-card__poster">
      <p class="film-card__description">${description.length > LetterLimit.CUSTOM ? description.slice(LetterLimit.MIN, LetterLimit.MAX).concat(`...`) : description}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
      </form>
    </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._handleClick = this._handleClick.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _handleClick() {
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement()
      .querySelectorAll(`.film-card__poster, .film-card__comments, .film-card__title`)
      .forEach((element) => {
        element.addEventListener(`click`, this._handleClick);
      });
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._handleWatchListClick);
  }

  _handleWatchListClick(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._handleWatchedClick);
  }

  _handleWatchedClick(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._handleFavoriteClick);
  }

  _handleFavoriteClick(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
