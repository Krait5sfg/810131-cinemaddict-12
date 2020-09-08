import moment from 'moment';

export const TypeTemplate = {
  FILM_CARD: `film card`,
  FILM_DETAIL: `film detail`,
  COMMENT: `comment`
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// методы преобразуют даты с помощью moment
export const getHumaniseDuration = (minutes) => {
  const duration = moment.duration(minutes, `minutes`);
  const format = minutes > 60 ? `H[h] mm[m]` : `mm[m]`;
  return moment.utc(duration.as(`milliseconds`)).format(format).toString();
};

export const getConvertingDate = (date, type) => {
  if (date instanceof Date && type) {
    switch (type) {
      case TypeTemplate.FILM_CARD:
        return moment(date).year();
      case TypeTemplate.FILM_DETAIL:
        return moment(date).format(`DD MMMM YYYY`);
      case TypeTemplate.COMMENT:
        return moment(date).format(`YYYY/MM/DD HH:mm`);
    }
  }
  throw new Error(`Некорректные данные в методе getConvertingDate`);
};
