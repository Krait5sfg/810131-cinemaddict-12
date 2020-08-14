import AbstractView from '../view/abstract.js';

export const BEFOREEND = `beforeend`;

export const renderTemplate = (container, template, place) => {
  if (container instanceof AbstractView) {
    container.getElement();
  }
  container.insertAdjacentHTML(place, template);
};

export const render = (container, child, place) => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }
  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  if (place === BEFOREEND) {
    container.append(child);
  } else {
    throw new Error(`Передано некорректное place в функцию render`);
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};