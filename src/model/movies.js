import Observer from '../utils/observer.js';

export default class Movies extends Observer {
  constructor() {
    super();
    this._films = [];

    this.getWatchedCount = this.getWatchedCount.bind(this);
  }

  setFilms(updateType, films) {
    this._films = films.slice();
    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  getWatchedCount() {
    return this._films.filter((film) => film.status.watched).length;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign({}, film, {
      image: film.film_info.poster,
      title: film.film_info.title,
      alternativeTitle: film.film_info.alternative_title,
      rating: film.film_info.total_rating,
      director: film.film_info.director,
      writers: film.film_info.writers,
      actors: film.film_info.actors,
      releaseDate: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
      duration: film.film_info.runtime,
      country: film.film_info.release.release_country,
      genres: film.film_info.genre,
      description: film.film_info.description,
      ageRating: film.film_info.age_rating,
      status: {
        favorite: film.user_details.favorite,
        watched: film.user_details.already_watched,
        watchlist: film.user_details.watchlist,
        watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
      }
    }
    );

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign({}, film, {
      "film_info": {
        "poster": film.image,
        "title": film.title,
        "alternative_title": film.alternativeTitle,
        "total_rating": film.rating,
        "director": film.director,
        "writers": film.writers,
        "actors": film.actors,
        "release": {
          "date": film.releaseDate instanceof Date ? film.releaseDate.toISOString() : null,
          "release_country": film.country,
        },
        "runtime": film.duration,
        "genre": film.genres,
        "description": film.description,
        "age_rating": film.ageRating,
      },
      "user_details": {
        "already_watched": film.status.watched,
        "watchlist": film.status.watchlist,
        "favorite": film.status.favorite,
        "watching_date": film.status.watchingDate instanceof Date ? film.status.watchingDate.toISOString() : null,
      }
    });
    return adaptedFilm;
  }

}
