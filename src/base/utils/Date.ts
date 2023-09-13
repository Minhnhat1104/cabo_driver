import dayjs, {Dayjs} from 'dayjs';

export const convertDateTimeSeverToClient = (
  utcSeconds: number,
  format?: string,
) => {
  const date = dayjs.unix(utcSeconds);
  // Format the date in "dd-mm-yyyy" format
  let formattedDate = '';
  if (format) {
    formattedDate = date.format(format);
  } else {
    formattedDate = date.format('h:mm A | DD/MM/YYYY');
  }
  return formattedDate;
};

export const convertDateTimeClientToSever = (date: Date) => {
  return new Date(date).getTime();
};

export const dateFormat = ({
  date,
  format = 'hh:mm | DD-MM-YYYY',
}: {
  date: Date;
  format: string;
}) => {
  return dayjs(date).format(format);
};

export const isNewDate = (epochTime: number) => {
  const date = dayjs(epochTime || 0);
  const curDate = dayjs();
  if (
    curDate.isSame(date, 'day') &&
    curDate.isSame(date, 'month') &&
    curDate.isSame(date, 'year')
  ) {
    return false;
  }
  return true;
};
