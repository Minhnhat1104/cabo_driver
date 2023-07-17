import dayjs from 'dayjs';

export const convertDateTimeSeverToClient = (utcSeconds: number) => {
  var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(utcSeconds);
  const date = dayjs(d);

  // Format the date in "dd-mm-yyyy" format
  const formattedDate = date.format('hh:mm | DD-MM-YYYY');
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
