export const BEFOREEND = `beforeend`;

// export const renderTemplate = (container, template, place) => container.insertAdjacentHTML(place, template);

export const render = (container, element, place) => {
  if (place === BEFOREEND) {
    container.append(element);
  } else {
    throw new Error(`Передано некорректное place в функцию render`);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
