import AbstractView from './abstract.js';

const createFilmsListMostCommentedTemplate = () => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>
  `;
};

export default class FilmListMostCommented extends AbstractView {
  getTemplate() {
    return createFilmsListMostCommentedTemplate();
  }
}
