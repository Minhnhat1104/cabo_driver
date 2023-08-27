import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {convertDateTimeSeverToClient, dateFormat} from '@base/utils/Date';
import {useMutation} from 'react-query';

export const useAcceptMutation = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (params: any) => {
      const res = await axios.post(
        '/api/v1/trip/drive-booking/accept-drive',
        params,
      );
      return res?.data;
    },
    onSuccess(data, variables, context) {
      mSuccess(`Accept drive successfully!`);
    },
    onError(error, variables, context) {
      mError(`Accept drive Fail!`);
    },
  });

  return mutation;
};
