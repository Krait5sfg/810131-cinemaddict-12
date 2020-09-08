import {getHumaniseDuration, getConvertingDate, TypeTemplate} from '../utils/common.js';
import SmartView from './smart.js';
import he from 'he';

const EmojiImage = {
  SMILE: `smile.png`,
  SLEEPING: `sleeping.png`,
  PUKE: `puke.png`,
  ANGRY: `angry.png`
};

const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

const EmotionImage = {
  SMILE: `./images/emoji/smile.png`,
  SLEEPING: `./images/emoji/sleeping.png`,
  PUKE: `./images/emoji/puke.png`,
  ANGRY: `./images/emoji/angry.png`,
};

const getEmojiImageElement = (emoji) => {
  let image = null;
  switch (emoji) {
    case EmojiType.SMILE:
      image = EmojiImage.SMILE;
      break;
    case EmojiType.ANGRY:
      image = EmojiImage.ANGRY;
      break;
    case EmojiType.SLEEPING:
      image = EmojiImage.SLEEPING;
      break;
    case EmojiType.PUKE:
      image = EmojiImage.PUKE;
  }
  return `<img src="images/emoji/${image}" width="55" height="55" alt="emoji"></img>`;
};

const generateGenres = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join(``);

const generateComments = (comments) => {
  if (comments) {
    return comments.map(({id, emotion, comment, author, date}) => `<li class="film-details__comment" data-comment-id="${id}">
  <span class="film-details__comment-emoji">
    <img src="${EmotionImage[emotion.toUpperCase()]}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${he.encode(comment)}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${getConvertingDate(new Date(date), TypeTemplate.COMMENT)}</span>
      <button class="film-details__comment-delete" data-comment-id ="${id}">Delete</button>
    </p>
  </div>
</li>`).join(``);
  }

  return false;
};

const generateControls = ({favorite, watched, watchlist}) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watched ? `checked` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>`;
};

const createFilmDetailsTemplate = (film, emoji, message, filmsComments) => {

  const {id, image, alternativeTitle, title, rating, director, writers, actors, releaseDate, duration, country, genres, description, comments, ageRating, status} = film;
  const genreFieldName = genres.length > 1 ? `Genres` : `Genre`;
  const commentsCount = comments.length;
  const humanizeDuration = getHumaniseDuration(duration);
  const fullReleaseDateFilm = getConvertingDate(releaseDate, TypeTemplate.FILM_DETAIL);

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get" data-film-id="${id}">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${image}" alt="">
              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${fullReleaseDateFilm}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${humanizeDuration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genreFieldName}</td>
                  <td class="film-details__cell">
                  ${generateGenres(genres)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${generateControls(status)}
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
            ${generateComments(filmsComments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              ${emoji ? `${getEmojiImageElement(emoji)}` : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${message ? message : ``}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emoji === EmojiType.SMILE ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emoji-type="${EmojiType.SMILE}">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emoji === EmojiType.SLEEPING ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emoji-type="${EmojiType.SLEEPING}">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emoji === EmojiType.PUKE ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emoji-type="${EmojiType.PUKE}">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emoji === EmojiType.ANGRY ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" data-emoji-type="${EmojiType.ANGRY}">
                </label>
              </div>
            </div>
          </section>
        </div>
    </form>
    </section>`;
};

export default class FilmDetail extends SmartView {
  constructor(film, comments) {
    super();
    this._film = film;
    this._filmsComments = comments;
    this._emoji = null;
    this._message = null;
    this._handleClick = this._handleClick.bind(this);
    this._handleWatchListClickHandler = this._handleWatchListClickHandler.bind(this);
    this._handleWatchedClickHandler = this._handleWatchedClickHandler.bind(this);
    this._handleFavoriteClickHandler = this._handleFavoriteClickHandler.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleEmojiClick = this._handleEmojiClick.bind(this);
    this._handleCommentInput = this._handleCommentInput.bind(this);
    this.getSelectedEmojiType = this.getSelectedEmojiType.bind(this);
    this._setInnerHandler();
  }

  restoreHandlers() {
    this._setInnerHandler();
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteButtonClickHandler(this._callback.deleteButtonClick);
    this.setClickHandler(this._callback.click);
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._emoji, this._message, this._filmsComments);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._handleClick);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._handleWatchListClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._handleWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._handleFavoriteClickHandler);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;
    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((element) => element.addEventListener(`click`, this._handleDeleteButtonClick));
  }

  getSelectedEmojiType() {
    return this._emoji ? this._emoji : false;
  }

  getUserMessage() {
    return this._message ? this._message : false;
  }

  reset() {
    this._emoji = null;
    this._message = null;
  }

  setFilmComments(comments) {
    this._filmsComments = comments;
  }

  disableForm() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .disabled = true;
    this.getElement()
      .querySelectorAll(`.film-details__emoji-label`)
      .forEach((element) => element.removeEventListener(`click`, this._handleEmojiClick));
  }

  addShake() {
    this.getElement().querySelector(`.film-details__new-comment`).classList.add(`shake`);
  }

  removeShake() {
    this.getElement().querySelector(`.film-details__new-comment`).classList.remove(`shake`);
  }

  activeForm() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .disabled = false;

    this.getElement()
      .querySelectorAll(`.film-details__emoji-label`)
      .forEach((element) => element.addEventListener(`click`, this._handleEmojiClick));
  }

  _setInnerHandler() {
    // emoji
    this.getElement()
      .querySelectorAll(`.film-details__emoji-label`)
      .forEach((element) => element.addEventListener(`click`, this._handleEmojiClick));

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._handleCommentInput);
  }

  _handleDeleteButtonClick(evt) {
    const commentElement = evt.target.closest(`.film-details__comment`);
    evt.preventDefault();
    if (commentElement.classList.contains(`shake`)) {
      commentElement.classList.remove(`shake`);
    }
    evt.target.textContent = `Deleting`;
    evt.target.disabled = true;
    this._callback.deleteButtonClick(evt.target.dataset.commentId, () => {
      commentElement.classList.add(`shake`);
      evt.target.textContent = `Delete`;
      evt.target.disabled = false;
    });
  }

  _handleClick(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _handleWatchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  _handleFavoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _handleWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _handleCommentInput(evt) {
    evt.preventDefault();
    this._message = evt.target.value;
  }

  _handleEmojiClick(evt) {
    this._updateEmoji(evt.target.dataset.emojiType);
  }

  _updateEmoji(emojiType) {
    switch (emojiType) {
      case EmojiType.SMILE:
        this._emoji = EmojiType.SMILE;
        break;
      case EmojiType.SLEEPING:
        this._emoji = EmojiType.SLEEPING;
        break;
      case EmojiType.ANGRY:
        this._emoji = EmojiType.ANGRY;
        break;
      case EmojiType.PUKE:
        this._emoji = EmojiType.PUKE;
        break;
    }
    this.getElement().querySelector(`.film-details__add-emoji-label`).innerHTML = getEmojiImageElement(this._emoji);
  }
}
