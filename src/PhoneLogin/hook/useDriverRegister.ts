// import axios from '@base/components/axios';

import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {dateFormat} from '@base/utils/Date';
import {useMutation} from 'react-query';

export const useDriverRegister = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post('/api/v1/driver/auth/register', data);
      return res?.data;
    },
    onSuccess(data, variables, context) {
      mSuccess(`Register driver successfully!`);
    },
    onError(data, variables, context) {
      // mError(`Register driver Fail!`);
    },
  });

  return mutation;
};
