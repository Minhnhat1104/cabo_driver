import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {useMutation} from 'react-query';

export const useGPSOnDriveMutation = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(
        // '/api/v1/driver/drive-booking/current-gps',
        '/api/v1/booking/current-gps',
        data,
      );
      return res?.data;
    },
    onSuccess(data, variables, context) {
      mSuccess(`Send GPS successflly!`);
    },
    onError(error, variables, context) {
      mError(`Send GPS fail!!`);
    },
  });

  return mutation;
};
