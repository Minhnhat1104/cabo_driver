import {convertDateTimeClientToSever} from '@base/utils/Date';
import dayjs from 'dayjs';

interface DateRange {
  startDate: any;
  endDate: any;
}

export function getDateRange(
  index: number,
  activeTab: 'month' | 'week',
): DateRange {
  const currentDate = dayjs();
  let startDate: dayjs.Dayjs;
  let endDate: dayjs.Dayjs;

  if (activeTab === 'week') {
    startDate = currentDate.subtract((index + 1) * 7, 'day');
    endDate = currentDate;
  } else if (activeTab === 'month') {
    startDate = currentDate.subtract(index, 'month').startOf('month');
    endDate = currentDate;
  } else {
    throw new Error('Invalid activeTab');
  }

  console.log('4444startDate: ', startDate.format('DD/MM/YYYY'));
  console.log('4444endDate: ', endDate.format('DD/MM/YYYY'));
  return {
    startDate: startDate.unix(),
    endDate: endDate.unix(),
  };
}
