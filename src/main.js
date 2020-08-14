import UserProfileView from './view/user-profile.js';
import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import FilmContainerView from './view/films-container.js';
import FilmListView from './view/films-list.js';
import NoFilmView from './view/no-film.js';
import FilmListTopRatedView from './view/films-list-top-rated.js';
import FilmListMostCommentedView from './view/films-list-most-commented.js';
import FilmsListContainerView from './view/films-list-container.js';
import ShowMoreButtonView from './view/show-more-button.js';
import FilmCardView from './view/film-card.js';
import StatisticsView from './view/statistics.js';
import FilmDetailView from './view/film-details.js';
import {generateFilm} from './mock/film.js'; // функция создает мок для фильма
import {generateUser} from './mock/user.js'; // мок для пользователя
import {generateFilmsMenu} from './mock/menu.js'; // счет фильмов для меню
import {render, BEFOREEND} from './utils/render.js';

const CountType = {
  COMMON_FILMS: 20,
  EXTRA_FILMS: 2,
  RENDER_FOR_STEP: 5,
};

const Key = {
  ESCAPE: `Escape`,
  ESC: `Esc`,
};

const renderFilm = (filmsListContainerElement, film) => {
  const filmCardElement = new FilmCardView(film);
  const filmDetailElement = new FilmDetailView(film);

  const hideFilmDetail = () => {
    bodyElement.removeChild(filmDetailElement.getElement());
    bodyElement.classList.remove(`hide-overflow`);
  };

  const showFilmDetail = () => {
    bodyElement.appendChild(filmDetailElement.getElement());
    bodyElement.classList.add(`hide-overflow`);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === Key.ESCAPE || evt.key === Key.ESC) {
      evt.preventDefault();
      hideFilmDetail();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  filmCardElement.setClickHandler(showFilmDetail);

  filmDetailElement.setClickHandler(() => {
    hideFilmDetail();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmsListContainerElement, filmCardElement, BEFOREEND);
};

// создание моков для фильма
const commonFilms = new Array(CountType.COMMON_FILMS).fill(``).map(generateFilm);
const topRatedFilms = commonFilms.slice().sort((firstFilm, secondFilm) => secondFilm.rating - firstFilm.rating);
const topCommentedFilms = commonFilms.slice().sort((firstFilm, secondFilm) => secondFilm.comments.length - firstFilm.comments.length);
const filmsCount = commonFilms.length;
// счет фильмов для меню, для статуса пользователя
const filmsStatusCount = generateFilmsMenu(commonFilms);
// мок для пользователя
const user = generateUser(filmsStatusCount);

const bodyElement = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerStatisticsElement = document.querySelector(`.footer__statistics`);

render(headerElement, new UserProfileView(user), BEFOREEND);
render(mainElement, new MenuView(filmsStatusCount), BEFOREEND);
render(mainElement, new SortView(), BEFOREEND);

const filmsContainerElement = new FilmContainerView();
render(mainElement, filmsContainerElement, BEFOREEND);

const filmsListElement = new FilmListView();
render(filmsContainerElement, filmsListElement, BEFOREEND);

if (!commonFilms.length) {
  render(filmsListElement, new NoFilmView(), BEFOREEND);
} else {
  const filmListTopRatedElement = new FilmListTopRatedView();
  const filmListMostCommented = new FilmListMostCommentedView();
  render(filmsContainerElement, filmListTopRatedElement, BEFOREEND);
  render(filmsContainerElement, filmListMostCommented, BEFOREEND);

  const filmsListContainerElement = new FilmsListContainerView();
  render(filmsListElement, filmsListContainerElement, BEFOREEND);

  for (let i = 0; i < CountType.RENDER_FOR_STEP; i++) {
    renderFilm(filmsListContainerElement, commonFilms[i]);
  }

  const filmsListExtraElements = [
    filmListTopRatedElement,
    filmListMostCommented
  ];
  filmsListExtraElements.forEach((element) => {
    const filmsListContainer = new FilmsListContainerView();
    render(element, filmsListContainer, BEFOREEND);
    const filmsListTitleElement = element.getElement().querySelector(`.films-list__title`);

    const filmsForRendering = filmsListTitleElement.textContent === `Top rated` ? topRatedFilms : topCommentedFilms;

    for (let i = 0; i < CountType.EXTRA_FILMS; i++) {
      renderFilm(filmsListContainer, filmsForRendering[i]);
    }
  });

  // рендеринг фильмов при нажатии кнопки
  if (commonFilms.length > CountType.RENDER_FOR_STEP) {
    let renderFilmCount = CountType.RENDER_FOR_STEP;
    const showMoreButtonElement = new ShowMoreButtonView();
    render(filmsListElement, showMoreButtonElement, BEFOREEND);

    showMoreButtonElement.setClickHandler(() => {
      commonFilms
        .slice(renderFilmCount, renderFilmCount + CountType.RENDER_FOR_STEP)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      renderFilmCount += CountType.RENDER_FOR_STEP;
      if (renderFilmCount >= commonFilms.length) {
        showMoreButtonElement.getElement().remove();
        showMoreButtonElement.removeElement();
      }
    });
  }
}

render(footerStatisticsElement, new StatisticsView(filmsCount), BEFOREEND);
