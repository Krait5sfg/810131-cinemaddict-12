import moment from 'moment';

export const getRandomInteger = (min = 0, max = 1) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomValueFromArray = (values) => values[getRandomInteger(0, values.length - 1)];

export const getRandomDouble = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return (lower + Math.random() * (upper - lower + 1)).toFixed(1);
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// методы преобразуют даты с помощью moment
export const getYearFromDate = (date) => moment(date).year();

export const getDayMonthYearFromDate = (date) => moment(date).format(`DD MMMM YYYY`);
