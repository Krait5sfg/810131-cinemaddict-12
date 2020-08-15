import AbstractView from './abstract.js';

const createFilmsListTopRatedTemplate = () => {
  return `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
    </section>
  `;
};

export default class FilmListTopRated extends AbstractView {
  getTemplate() {
    return createFilmsListTopRatedTemplate();
  }
}
