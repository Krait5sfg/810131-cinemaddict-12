import AbstractView from './abstract.js';

export default class FilmsListContainer extends AbstractView {
  getTemplate() {
    return `<div class="films-list__container"></div>`;
  }
}
