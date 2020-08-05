const createUserProfileTemplate = (user) => {
  const {profileRating, image} = user;
  return (`
    <section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="${image}" alt="Avatar" width="35" height="35">
    </section>
    `);
};

export {createUserProfileTemplate};
