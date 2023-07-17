import {useTheme} from '@rneui/themed';
import Snackbar from 'react-native-snackbar';

export const useSnackbar = () => {
  const {theme} = useTheme();
  const mSuccess = (text: string) => {
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_SHORT,
      rtl: true,
      backgroundColor: theme.colors.success,
    });
  };

  const mError = (text: string) => {
    Snackbar.show({
      text: text,
      duration: Snackbar.LENGTH_SHORT,
      rtl: true,
      backgroundColor: theme.colors.error,
    });
  };

  return {mSuccess, mError};
};
