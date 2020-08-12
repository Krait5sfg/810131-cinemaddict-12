import {createElement} from "../utils.js";

const createFilmsListMostCommentedTemplate = () => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>
  `;
};

export default class FilmListMostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListMostCommentedTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
