import {RenderPosition} from './const.js';

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomDouble = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return (lower + Math.random() * (upper - lower + 1)).toFixed(1);
};

export const getRandomDate = () => {
  const start = new Date(1940, 10, 30);
  const end = new Date();
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  return randomDate.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const getHumanizeViewFromDuration = ({hours, minutes}) => {
  let humanizeTimeString = ``;
  humanizeTimeString += hours ? `${hours}h ` : ``;
  humanizeTimeString += minutes ? `${minutes}m` : ``;

  return humanizeTimeString;
};

export const getRandomValueFromArray = (values) => values[getRandomInteger(0, values.length - 1)];

export const renderTemplate = (container, template, place) => container.insertAdjacentHTML(place, template);

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
