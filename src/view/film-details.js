import {getHumaniseDuration, getConvertingDate} from '../utils/common.js';
import SmartView from './smart.js';

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
  return comments.map((element) => `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="${element.emoji}" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${element.text}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${element.author}</span>
      <span class="film-details__comment-day">${getConvertingDate(element.time, `comment`)}</span>
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

const createFilmDetailsTemplate = (film, emoji, message) => {

  const {image, title, rating, director, writers, actors, releaseDate, duration, country, genres, description, comments, ageRating, status} = film;
  const genreFieldName = genres.length > 1 ? `Genres` : `Genre`;
  const commentsCount = comments.length;
  const humanizeDuration = getHumaniseDuration(duration);
  const fullReleaseDateFilm = getConvertingDate(releaseDate, `film detail`);

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
            ${generateComments(comments)}
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
  constructor(film) {
    super();
    this._film = film;
    this._emoji = null;
    this._message = null;
    this._clickHandler = this._clickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this.returnSelectedEmojiType = this.returnSelectedEmojiType.bind(this);
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
    this._message = evt.target.value;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film, this._emoji, this._message);
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
    this.updateElement();
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
  }

  returnSelectedEmojiType() {
    return this._emoji ? this._emoji : false;
  }

  returnUserMessage() {
    return this._message ? this._message : false;
  }

  reset() {
    this._emoji = null;
    this._message = null;
  }
}
