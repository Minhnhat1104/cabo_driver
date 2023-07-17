// import axios from '@base/components/axios';

import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {convertDateTimeSeverToClient, dateFormat} from '@base/utils/Date';
import {useMutation} from 'react-query';

export const useCheckInMutation = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post('/api/v1/driver/check-in', data);
      return res?.data;
    },
    onSuccess(data, variables, context) {
      const checkInAt = variables?.checkInAt;
      mSuccess(
        `Check in successfully at ${convertDateTimeSeverToClient(checkInAt)})}`,
      );
    },
    onError(data, variables, context) {
      mError(`Check in Fail!`);
    },
  });

  return mutation;
};
