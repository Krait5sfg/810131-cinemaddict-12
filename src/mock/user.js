const WatchCount = {
  NOVICE_LOW_BOUND: 1,
  NOVICE_UPPER_BOUND: 10,
  FAN_LOW_BOUND: 11,
  FAN_UPPER_BOUND: 20,
};

export const generateUser = (countFilmsStatus) => {
  const {watched} = countFilmsStatus;
  const {NOVICE_LOW_BOUND, NOVICE_UPPER_BOUND, FAN_LOW_BOUND, FAN_UPPER_BOUND} = WatchCount;

  let userRating = ``;
  switch (true) {
    case watched >= NOVICE_LOW_BOUND && watched <= NOVICE_UPPER_BOUND:
      userRating = `Novice`;
      break;
    case watched >= FAN_LOW_BOUND && watched <= FAN_UPPER_BOUND:
      userRating = `Fan`;
      break;
    case watched > FAN_UPPER_BOUND:
      userRating = `Movie Buff`;
  }

  return {
    profileRating: userRating,
    image: `images/bitmap@2x.png`
  };
};
