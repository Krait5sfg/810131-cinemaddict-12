import AbstractView from './abstract.js';

const WatchCount = {
  NONE: 0,
  NOVICE_LOW_BOUND: 1,
  NOVICE_UPPER_BOUND: 10,
  FAN_LOW_BOUND: 11,
  FAN_UPPER_BOUND: 20,
};

const createUserProfileTemplate = (profileRating) => {

  return `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class UserProfile extends AbstractView {
  constructor(userRaiting) {
    super();
    this._userRaiting = userRaiting;
  }

  getTemplate() {
    return createUserProfileTemplate(this._getUserStatus());
  }

  setUserRaiting() {
    document.querySelector(`.profile__rating`).textContent = this._getUserStatus();
  }

  _getUserStatus() {
    const watchedCount = this._userRaiting();
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
  }
}
