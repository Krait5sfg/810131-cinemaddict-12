import FilmCardView from '../view/film-card.js';
import FilmDetailView from '../view/film-details.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';
import {generateId} from '../utils/common.js';
import {UserAction, UpdateType} from '../const.js';

const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
  ENTER: `Enter`,
};

const Mode = {
  DEFAULT: `DEFAULT`,
  OPEN: `OPEN`
};

const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

export default class Film {
  constructor(container, bodyElement, changeData, changeMode, api) {
    this._container = container;
    this._bodyElement = bodyElement;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmComments = null;
    this._api = api;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._showFilmDetail = this._showFilmDetail.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteButtonClick = this._handleDeleteButtonClick.bind(this);
    this._handleEnterKeyDown = this._handleEnterKeyDown.bind(this);

    this._filmCardElement = null;
    this._filmDetailElement = null;
    this._mode = Mode.DEFAULT;
  }

  init(film) {
    this._film = film;
    const prevFilmCardElement = this._filmCardElement;
    const prevFilmDetailElement = this._filmDetailElement;
    this._filmCardElement = new FilmCardView(film);
    this._filmCardElement.setWatchListClickHandler(this._handleWatchListClick);
    this._filmCardElement.setWatchedClickHandler(this._handleWatchedClick);
    this._filmCardElement.setFavoriteClickHandler(this._handleFavoriteClick);

    // выносим отрисовку карточки сюда. Тогда вне зависимости от запроса по комментариям,
    // всегда картока будет стоять на нужном месте
    if (prevFilmCardElement === null) {
      render(this._container, this._filmCardElement, RenderPosition.BEFOREEND);
    }

    this._api.getComments(film.id)
      .then((comments) => {
        this._filmComments = comments.slice();
        this._filmDetailElement = new FilmDetailView(film, this._filmComments);

        this._filmCardElement.setClickHandler(this._showFilmDetail); // убирает ошибку когда при клике на карточку комментарии не успели загрузиться
        this._filmDetailElement.setClickHandler(() => {
          this._hideFilmDetail();
          document.removeEventListener(`keydown`, this._handleEscKeyDown);
          document.removeEventListener(`keydown`, this._handleEnterKeyDown);
          this._filmDetailElement.reset();

          if (this._status) {
            this._updateFilmDataOnClose();
          }
        });

        this._filmDetailElement.setWatchListClickHandler(this._handleWatchListClick);
        this._filmDetailElement.setWatchedClickHandler(this._handleWatchedClick);
        this._filmDetailElement.setFavoriteClickHandler(this._handleFavoriteClick);
        this._filmDetailElement.setDeleteButtonClickHandler(this._handleDeleteButtonClick);

        if (prevFilmCardElement === null || prevFilmDetailElement === null) {
          return;
        }

        if (this._container.getElement().contains(prevFilmCardElement.getElement())) {
          replace(this._filmCardElement, prevFilmCardElement);
        }

        if (this._bodyElement.contains(prevFilmDetailElement.getElement())) {
          replace(this._filmDetailElement, prevFilmDetailElement);
        }

        remove(prevFilmCardElement);
        remove(prevFilmDetailElement);
      });
  }

  destroy() {
    remove(this._filmCardElement);

    // Это нужно для случая, если сразу после загрузки страницы нажать на любую сортировку, то попап может еще не создаться
    // (так как он создается в колбэке после получения комментариев). Соотвественно надо проверит что попап есть
    if (this._filmDetailElement !== null) {
      remove(this._filmDetailElement);
    }
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._hideFilmDetail();
      this._bodyElement.classList.add(`hide-overflow`);
    }
  }

  _handleEscKeyDown(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      this._hideFilmDetail();
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
      document.removeEventListener(`keydown`, this._handleEnterKeyDown);
      this._filmDetailElement.reset();

      if (this._status) {
        this._updateFilmDataOnClose();
      }
    }
  }

  _hideFilmDetail() {
    remove(this._filmDetailElement);
    this._bodyElement.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
  }

  _showFilmDetail() {
    this._filmDetailElement.setFilmComments(this._filmComments);
    this._changeMode();
    this._filmDetailElement.updateElement();
    this._bodyElement.appendChild(this._filmDetailElement.getElement());

    this._bodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._handleEscKeyDown);
    document.addEventListener(`keydown`, this._handleEnterKeyDown);

    this._mode = Mode.OPEN;
  }

  // изменения данных
  _handleWatchListClick() {
    this._status = Object.assign({}, this._film.status, {watchlist: !this._film.status.watchlist});
    this._updateFilmData();
  }

  _handleWatchedClick() {
    // если поле watched true - значит при клике будет false поэтому надо удалить дату когда фильм был просмотрен
    this._status = Object.assign({}, this._film.status, {watched: !this._film.status.watched, watchingDate: this._film.status.watched ? null : new Date()});
    this._updateFilmData();
  }

  _handleFavoriteClick() {
    this._status = Object.assign({}, this._film.status, {favorite: !this._film.status.favorite});
    this._updateFilmData();
  }

  _handleDeleteButtonClick(commentId, handleRequestError) {
    const newComments = this._film.comments.filter((comment) => comment !== commentId);
    this._filmComments = this._filmComments.filter((comment) => comment.id !== commentId);
    this._changeData(UserAction.DELETE_COMMENT, UpdateType.MINOR, Object.assign({}, this._film, {comments: newComments.slice()}, {deletedIdComment: commentId}), handleRequestError);
  }

  _handleEnterKeyDown(evt) {
    if ((evt.ctrlKey || evt.metaKey) && evt.key === Key.ENTER) {
      const userMessage = this._filmDetailElement.getUserMessage();
      const selectedEmojiType = this._filmDetailElement.getSelectedEmojiType();
      if (userMessage && selectedEmojiType) {
        this._filmDetailElement.disableForm();
        this._filmDetailElement.removeShake();
        const userComment = {
          id: generateId(),
          emotion: EmojiType[selectedEmojiType.toUpperCase()],
          comment: userMessage,
          date: new Date(),
        };
        this._changeData(UserAction.ADD_COMMENT, UpdateType.MINOR, Object.assign({}, this._film, {newComment: userComment}), () => {
          this._filmDetailElement.addShake();
          this._filmDetailElement.activeForm();
        });
      }
    }
  }

  _updateFilmData() {
    if (this._mode === Mode.DEFAULT) {
      this._changeData(UserAction.UPDATE_FILM, UpdateType.MEDIUM, Object.assign({}, this._film, {status: this._status}));
    } else {
      this._changeData(UserAction.UPDATE_FILM, UpdateType.MINOR, Object.assign({}, this._film, {status: this._status}));
    }
  }

  _updateFilmDataOnClose() {
    this._changeData(UserAction.UPDATE_FILM, UpdateType.MEDIUM, Object.assign({}, this._film, {status: this._status}));
    this._status = null;
  }
}
