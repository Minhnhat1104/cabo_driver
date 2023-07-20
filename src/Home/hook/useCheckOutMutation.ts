// import axios from '@base/components/axios';

import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {convertDateTimeSeverToClient} from '@base/utils/Date';

import {useMutation} from 'react-query';

export const useCheckOutMutation = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post('/api/v1/driver/check-out', data);
      return res?.data;
    },
    onSuccess(data, variables, context) {
      const checkOutAt = variables?.checkOutAt;
      mSuccess(
        `Check out successfully at ${convertDateTimeSeverToClient(checkOutAt)}`,
      );
    },
    onError(data, variables, context) {
      mError(`Check out Fail!`);
    },
  });

  return mutation;
};
