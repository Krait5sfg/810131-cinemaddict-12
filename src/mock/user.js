export const generateUser = (countFilmsStatus) => {
  const {watched} = countFilmsStatus;
  let userRating = ``;
  switch (true) {
    case watched >= 1 && watched <= 10:
      userRating = `Novice`;
      break;
    case watched >= 11 && watched <= 20:
      userRating = `Fan`;
      break;
    case watched > 20:
      userRating = `Movie Buff`;
  }

  return {
    profileRating: userRating,
    image: `images/bitmap@2x.png`
  };
};
