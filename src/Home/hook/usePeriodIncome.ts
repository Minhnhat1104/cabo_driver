import axios from '@base/components/axios';
import {STORE_KEY_DRIVER_ID} from '@base/config/asyncStorageKey';
import {getKeyData} from '@base/utils/Helper';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

interface usePeriodIncomeProps {
  startDate: number;
  endDate: number;
}

export const usePeriodIncome = (props: usePeriodIncomeProps) => {
  const {startDate, endDate} = props;
  const [driverId, setDriverId] = useState<any>('');

  useEffect(() => {
    const getDriverId = async function () {
      const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
      setDriverId(driverId);
    };

    getDriverId();
  }, []);

  const query = useQuery({
    queryKey: ['History', driverId, startDate, endDate],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://tops-endless-imp.ngrok-free.app/api/v1/trip/driver/${driverId}/period-income?startDate=${startDate}&endDate=${endDate}`,
        );

        return res?.data;
      } catch (err) {
        console.log('Err:', err);
      }
    },
    enabled: driverId !== '',
  });

  return query;
};
