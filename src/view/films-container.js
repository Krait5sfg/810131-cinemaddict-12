import AbstractView from './abstract.js';

export default class FilmContainer extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
