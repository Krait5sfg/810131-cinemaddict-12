import {createElement} from "../utils.js";

export default class Statistics {
  constructor(count) {
    this._count = count;
    this._element = null;
  }

  getTemplate() {
    return `<p>${this._count} movies inside</p>`;
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
