import MoviesModel from './model/movies.js';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  DELETE: `DELETE`,
  POST: `POST`
};

const Path = {
  MOVIE: `movies`,
  COMMENT: `comments`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: Path.MOVIE})
      .then(Api.toJSON)
      .then((films) => films.map(MoviesModel.adaptToClient));
  }

  getComments(filmId) {
    return this._load({url: `${Path.COMMENT}/${filmId}`})
      .then(Api.toJSON);
  }

  deleteComment(commentId) {
    return this._load({url: `${Path.COMMENT}/${commentId}`, method: Method.DELETE});
  }

  addComment(film) {
    return this._load({
      url: `${Path.COMMENT}/${film.id}`,
      method: Method.POST,
      body: JSON.stringify({
        comment: film.newComment.comment,
        date: film.newComment.date instanceof Date ? film.newComment.date.toISOString() : null,
        emotion: film.newComment.emotion,
      }),
      headers: new Headers({"Content-Type": `application/json`})
    }).then(Api.toJSON)
      .then((valueForFilm) => MoviesModel.adaptToClient(valueForFilm.movie));
  }

  updateFilm(film) {
    return this._load({
      url: `${Path.MOVIE}/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    }).then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(error) {
    throw error;
  }
}
