import axios from '@base/components/axios';
import {STORE_KEY_DRIVER_ID} from '@base/config/asyncStorageKey';
import {getKeyData} from '@base/utils/Helper';
import {useEffect, useState} from 'react';
import {useQuery} from 'react-query';

export const useDriverSummary = () => {
  const [driverId, setDriverId] = useState<any>('');

  useEffect(() => {
    const getDriverId = async function () {
      const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
      setDriverId(driverId);
    };

    getDriverId();
  }, []);

  const query = useQuery({
    queryKey: [driverId],
    queryFn: async () => {
      //   const data = await axios.get(`/api/v1/driver/${driverId}/overview`);
      const res = await axios.get(`/api/v1/driver/${driverId}/overview`);

      return res?.data;
    },
    enabled: driverId !== '',
  });

  return query;
};
