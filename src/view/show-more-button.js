import AbstractView from './abstract.js';

export default class ShowMoreButton extends AbstractView {
  constructor() {
    super();
    this._handleClickButton = this._handleClickButton.bind(this);
  }

  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._handleClickButton);
  }

  _handleClickButton(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
