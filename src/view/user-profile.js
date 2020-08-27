import AbstractView from './abstract.js';

const WatchCount = {
  NONE: 0,
  NOVICE_LOW_BOUND: 1,
  NOVICE_UPPER_BOUND: 10,
  FAN_LOW_BOUND: 11,
  FAN_UPPER_BOUND: 20,
};

const getUserStatus = (watchedCount) => {
  let profileRating = null;
  switch (true) {
    case watchedCount >= WatchCount.NOVICE_LOW_BOUND && watchedCount <= WatchCount.NOVICE_UPPER_BOUND:
      profileRating = `Novice`;
      break;
    case watchedCount >= WatchCount.FAN_LOW_BOUND && watchedCount <= WatchCount.FAN_UPPER_BOUND:
      profileRating = `Fan`;
      break;
    case watchedCount > WatchCount.FAN_UPPER_BOUND:
      profileRating = `Movie Buff`;
      break;
    case watchedCount === WatchCount.NONE:
      profileRating = ``;
      break;
  }
  return profileRating;
};

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
    this.setUserRaiting = this.setUserRaiting.bind(this);
    this._moviesModel.addObserver(this.setUserRaiting);
  }

  getTemplate() {
    return createUserProfileTemplate(getUserStatus(this._moviesModel.getWatchedCount()));
  }

  setUserRaiting() {
    document.querySelector(`.profile__rating`).textContent = getUserStatus(this._moviesModel.getWatchedCount());
  }
}
