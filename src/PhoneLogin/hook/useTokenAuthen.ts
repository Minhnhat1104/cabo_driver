// import axios from '@base/components/axios';

import axios from '@base/components/axios';
import {useMutation} from 'react-query';

export const useTokenAuthen = () => {
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post('/api/v1/driver/auth/register', data);
      return res?.data;
    },
  });

  return mutation;
};
