import FilmCardView from '../view/film-card.js';
import FilmDetailView from '../view/film-details.js';
import {render, BEFOREEND} from '../utils/render.js';

const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

export default class Film {
  constructor(container, bodyElement) {
    this._container = container;
    this._bodyElement = bodyElement;

    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._showFilmDetail = this._showFilmDetail.bind(this);
  }

  init(film) {
    this._filmCardElement = new FilmCardView(film);
    this._filmDetailElement = new FilmDetailView(film);

    this._filmCardElement.setClickHandler(this._showFilmDetail);

    this._filmDetailElement.setClickHandler(() => {
      this._hideFilmDetail();
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
    });

    render(this._container, this._filmCardElement, BEFOREEND);
  }

  _handleEscKeyDown(evt) {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      this._hideFilmDetail();
      document.removeEventListener(`keydown`, this._handleEscKeyDown);
    }
  }

  _hideFilmDetail() {
    this._bodyElement.removeChild(this._filmDetailElement.getElement());
    this._bodyElement.classList.remove(`hide-overflow`);
  }

  _showFilmDetail() {
    this._bodyElement.appendChild(this._filmDetailElement.getElement());
    this._bodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, this._handleEscKeyDown);
  }
}
