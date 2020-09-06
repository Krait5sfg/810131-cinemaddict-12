import AbstractView from './abstract.js';

export default class FilmsContainer extends AbstractView {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
