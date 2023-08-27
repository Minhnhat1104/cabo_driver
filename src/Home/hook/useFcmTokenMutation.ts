import axios from '@base/components/axios';
import {useSnackbar} from '@base/hook/useSnackbar';
import {convertDateTimeSeverToClient, dateFormat} from '@base/utils/Date';
import {useMutation} from 'react-query';

export const useFcmTokenMutation = () => {
  const {mSuccess, mError} = useSnackbar();
  const mutation = useMutation({
    mutationFn: async (params: any) => {
      const res = await axios.get(
        `/api/v1/driver/notification/subscribe/${params?.fcmToken}?carType=${params?.carType}`,
      );
      return res?.data;
    },
    onSuccess(data, variables, context) {
      mSuccess(`Send FCM token successfully!`);
    },
    onError(error, variables, context) {
      mError(`Send FCM token Fail!`);
    },
  });

  return mutation;
};
