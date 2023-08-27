import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {convertDateTimeSeverToClient, dateFormat} from '@base/utils/Date';
import {useMutation} from 'react-query';

export const usePickUpMutation = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (params: any) => {
      const res = await axios.post(
        '/api/v1/trip/confirm-pickup-location',
        params,
      );
      return res?.data;
    },
    onSuccess(data, variables, context) {
      mSuccess(`Pick up successfully!`);
    },
    onError(error, variables, context) {
      mError(`Pick up fail!`);
    },
  });

  return mutation;
};
