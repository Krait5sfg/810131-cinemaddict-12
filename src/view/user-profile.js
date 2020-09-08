import AbstractView from './abstract.js';
import {getUserStatus} from '../utils/user-profile.js';

const createUserProfileTemplate = (profileRating) => {

  return `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class UserProfile extends AbstractView {
  constructor(moviesModel) {
    super();
    this._moviesModel = moviesModel;
    this.setUserRating = this.setUserRating.bind(this);
    this._moviesModel.addObserver(this.setUserRating);
  }

  getTemplate() {
    return createUserProfileTemplate(getUserStatus(this._moviesModel.getWatchedCount()));
  }

  setUserRating() {
    this.getElement().querySelector(`.profile__rating`).textContent = getUserStatus(this._moviesModel.getWatchedCount());
  }
}
