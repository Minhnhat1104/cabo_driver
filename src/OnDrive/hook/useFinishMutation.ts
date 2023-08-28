import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {convertDateTimeSeverToClient, dateFormat} from '@base/utils/Date';
import {useMutation} from 'react-query';

export const useFinishMutation = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (params: any) => {
      const res = await axios.post(
        '/api/v1/trip/confirm-completed-location',
        params,
      );
      return res?.data;
    },
    onSuccess(data, variables, context) {
      mSuccess(`Finished!`);
    },
    onError(error, variables, context) {
      mError(`Finish fail!`);
    },
  });

  return mutation;
};
