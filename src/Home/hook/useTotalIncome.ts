import axios from '@base/components/axios';
import {STORE_KEY_DRIVER_ID} from '@base/config/asyncStorageKey';
import {getKeyData} from '@base/utils/Helper';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

export const useTotalIncome = () => {
  const [driverId, setDriverId] = useState<any>('');

  useEffect(() => {
    const getDriverId = async function () {
      const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
      setDriverId(driverId);
    };

    getDriverId();
  }, []);

  const query = useQuery({
    queryKey: ['TotalIncome', driverId],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `/api/v1/trip/driver/${driverId}/total-income`,
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
