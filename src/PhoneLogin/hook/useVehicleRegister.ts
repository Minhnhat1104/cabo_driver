// import axios from '@base/components/axios';

import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import Snackbar from 'react-native-snackbar';
import {useMutation} from 'react-query';

export const useVehicleRegister = () => {
  const {mSuccess, mError} = useSnackbar();

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
      mSuccess('Register vehicle successfully!');
    },
    onError: () => {
      mError('Register vehicle fail!');
    },
  });

  return mutation;
};
