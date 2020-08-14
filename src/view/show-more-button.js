import AbstractView from './abstract.js';

export default class ShowMoreButton extends AbstractView {
  getTemplate() {
    return `<button class="films-list__show-more">Show more</button>`;
  }
}
