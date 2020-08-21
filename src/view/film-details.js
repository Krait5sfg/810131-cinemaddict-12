import {getHumanizeViewFromDuration} from '../utils/film.js';
import SmartView from './smart.js';
const EmojiImage = {
  SMILE: `<img src="images/emoji/smile.png" width="55" height="55" alt="emoji">`,
  SLEEPING: `<img src="images/emoji/sleeping.png" width="55" height="55" alt="emoji">`,
  PUKE: `<img src="images/emoji/puke.png" width="55" height="55" alt="emoji"></img>`,
  ANGRY: `<img src="images/emoji/angry.png" width="55" height="55" alt="emoji"></img>`
};

const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`
};

const generateGenres = (genres) => {
  let result = ``;
  for (let i = 0; i < genres.length; i++) {
    result += `<span class="film-details__genre">${genres[i]}</span>`;
  }
  return result;
};

const generateComments = (comments) => {
  return comments.map((element) => `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${element.emoji}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${element.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${element.author}</span>
      <span class="film-details__comment-day">${convertDateToString(element.time)}</span>
      <button class="film-details__comment-delete" data-comment-id ="${element.id}">Delete</button>
    </p>
  </div>
</li>`).join(``);
};

const generateControls = ({favorite, watched, watchlist}) => {
  return `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlist ? `checked` : ``}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${watched ? `checked` : ``}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${favorite ? `checked` : ``}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>`;
};

const convertDateToString = (date) => `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

const createFilmDetailsTemplate = (film) => {

  const {image, title, rating, director, writers, actors, releaseDate, duration, country, genres, description, comments, ageRating, status, isSmile, isAngry, isSleeping, isPuke, message} = film;
  const genreFieldName = genres.length > 1 ? `Genres` : `Genre`;
  const commentsCount = comments.length;
  const humanizeDuration = getHumanizeViewFromDuration(duration);

  return `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
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
                  <p class="film-details__title-original">Original: ${title}</p>
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
                  <td class="film-details__cell">${releaseDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`})}</td>
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
            ${generateComments(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
              ${isSmile ? `${EmojiImage.SMILE}` : ``}
              ${isAngry ? `${EmojiImage.ANGRY}` : ``}
              ${isSleeping ? `${EmojiImage.SLEEPING}` : ``}
              ${isPuke ? `${EmojiImage.PUKE}` : ``}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${message ? message : ``}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isSmile ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" data-emoji-type="${EmojiType.SMILE}">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isSleeping ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" data-emoji-type="${EmojiType.SLEEPING}">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isPuke ? `checked` : ``}>
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" data-emoji-type="${EmojiType.PUKE}">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isAngry ? `checked` : ``}>
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
  constructor(film) {
    super();
    // this._film = film;
    this._data = FilmDetail.parseFilmToData(film);
    this._clickHandler = this._clickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._setInnerHandler();
  }

  _setInnerHandler() {
    // emoji
    this.getElement()
      .querySelectorAll(`.film-details__emoji-label`)
      .forEach((element) => element.addEventListener(`click`, this._emojiClickHandler));

    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, this._commentInputHandler);
  }

  restoreHandlers() {
    this._setInnerHandler();
    this.setWatchListClickHandler(this._callback.watchListClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setDeleteButtonClickHandler(this._callback.deleteButtonClick);
    this.setClickHandler(this._callback.click);
    this.setEnterKeyDown(this._callback.enterKeyDown);
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({message: evt.target.value}, true);
  }

  static parseFilmToData(film) {
    return Object.assign({}, film, {isSmile: false, isAngry: false, isPuke: false, isSleeping: false});
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setEnterKeyDown(callback) {
    this._callback.enterKeyDown = callback;
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._clickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._watchListClickHandler);
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._watchedClickHandler);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._favoriteClickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;
    this.getElement()
      .querySelectorAll(`.film-details__comment-delete`)
      .forEach((element) => element.addEventListener(`click`, this._deleteButtonClickHandler));
  }

  _deleteButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteButtonClick(evt.target.dataset.commentId);
  }

  _emojiClickHandler(evt) {
    this._updateEmoji(evt.target.dataset.emojiType);
  }

  _updateEmoji(emojiType) {
    switch (emojiType) {
      case EmojiType.SMILE:
        this.updateData({isSmile: true, isAngry: false, isPuke: false, isSleeping: false});
        break;
      case EmojiType.SLEEPING:
        this.updateData({isSmile: false, isAngry: false, isPuke: false, isSleeping: true});
        break;
      case EmojiType.ANGRY:
        this.updateData({isSmile: false, isAngry: true, isPuke: false, isSleeping: false});
        break;
      case EmojiType.PUKE:
        this.updateData({isSmile: false, isAngry: false, isPuke: true, isSleeping: false});
        break;
    }
  }

  returnSelectedEmojiType() {
    if (this._data.isAngry || this._data.isPuke || this._data.isSleeping || this._data.isSmile) {
      switch (true) {
        case this._data.isAngry:
          return EmojiType.ANGRY;
        case this._data.isPuke:
          return EmojiType.PUKE;
        case this._data.isSleeping:
          return EmojiType.SLEEPING;
        case this._data.isSmile:
          return EmojiType.SMILE;
      }
    }
    return false;
  }

  returnUserMessage() {
    return this._data.message;
  }
}
