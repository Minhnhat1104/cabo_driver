// import axios from '@base/components/axios';

import axios from '@base/components/axios';
import Snackbar from 'react-native-snackbar';
import {useMutation} from 'react-query';

export const useVehicleRegister = () => {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const driverId = data?.id;
      const params = {
        brand: data?.brand,
        regNo: data?.regNo,
        slot: data?.slot,
        type: data?.type,
      };
      const res = await axios.post(
        `/api/v1/driver/${driverId}/vehicle/register`,
        params,
      );
      return res?.data;
    },
    onSuccess: () => {
      Snackbar.show({
        text: 'Register vehicle successfully!',
        duration: Snackbar.LENGTH_SHORT,
      });
    },
  });

  return mutation;
};
