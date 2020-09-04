const WatchCount = {
  NONE: 0,
  NOVICE_LOW_BOUND: 1,
  NOVICE_UPPER_BOUND: 10,
  FAN_LOW_BOUND: 11,
  FAN_UPPER_BOUND: 20,
};

export const getUserStatus = (watchedCount) => {
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
