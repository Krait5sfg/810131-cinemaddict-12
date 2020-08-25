import moment from 'moment';

export const Key = {
  FILM_CARD: `film card`,
  FILM_DETAIL: `film detail`,
  COMMENT: `comment`
};

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

// export const updateItem = (items, update) => {
//   const index = items.findIndex((item) => item.id === update.id);

//   if (index === -1) {
//     return items;
//   }

//   return [
//     ...items.slice(0, index),
//     update,
//     ...items.slice(index + 1)
//   ];
// };

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// методы преобразуют даты с помощью moment
export const getHumaniseDuration = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const format = minutes > 60 ? `H[h] mm[m]` : `mm[m]`;
  return moment.utc(duration.as(`milliseconds`)).format(format).toString();
};

export const getConvertingDate = (date, key) => {
  if (date instanceof Date && key) {
    switch (key) {
      case Key.FILM_CARD:
        return moment(date).year();
      case Key.FILM_DETAIL:
        return moment(date).format(`DD MMMM YYYY`);
      case Key.COMMENT:
        return moment(date).format(`YYYY/MM/DD HH:mm`);
    }
  }
  throw new Error(`Некорректные данные в методе getConvertingDate`);
};
