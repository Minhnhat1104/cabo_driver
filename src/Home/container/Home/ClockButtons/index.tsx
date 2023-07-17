import {useCheckInMutation} from '@Home/hook/useCheckInMutation';
import {useCheckOutMutation} from '@Home/hook/useCheckOutMutation';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_TIME_CHECK_IN,
} from '@base/config/asyncStorageKey';
import {dateFormat} from '@base/utils/Date';
import {getKeyData, storeKeyData} from '@base/utils/Helper';
import {Button, makeStyles, useTheme} from '@rneui/themed';
import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';
import Snackbar from 'react-native-snackbar';

interface ClockButtonsProps {
  [x: string]: any;
  style?: StyleProp<ViewStyle>;
}

const ClockButtons = (props: ClockButtonsProps) => {
  const {style} = props;
  const styles = useStyles();
  const {theme} = useTheme();

  // hooks
  const mCheckIn = useCheckInMutation();
  const mCheckOut = useCheckOutMutation();
  // handle
  const handleCheckIn = async () => {
    const curTime = new Date();
    const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
    const params = {
      checkInAt: curTime.getTime(),
      checkOutAt: null,
      driverId: driverId,
    };

    mCheckIn.mutate(params, {
      onSuccess: (data, variables, context) => {
        storeKeyData(STORE_KEY_TIME_CHECK_IN, curTime.getTime().toString());
      },
    });

    storeKeyData(STORE_KEY_TIME_CHECK_IN, curTime.getTime().toString());
  };

  const handleCheckOut = () => {
    const curTime = new Date();
    Snackbar.show({
      text: `Check in successfully at ${dateFormat({
        date: curTime,
        format: 'mm:hh',
      })}`,
      duration: Snackbar.LENGTH_SHORT,
      rtl: true,
      backgroundColor: theme.colors.success,
    });

    storeKeyData(STORE_KEY_TIME_CHECK_IN, curTime.getTime().toString());
  };

  return (
    <View style={[styles.container, style]}>
      <Button
        size="lg"
        containerStyle={[
          styles.button,
          {
            marginRight: 16,
          },
        ]}
        onPress={handleCheckIn}>
        Check in
      </Button>
      <Button
        size="lg"
        containerStyle={[styles.button]}
        buttonStyle={{
          backgroundColor: '#ccc',
        }}>
        Check out
      </Button>
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: theme.colors.secondary,
    borderRadius: 8,
    width: '100%',
  },
  button: {
    flex: 0.5,
  },
}));

export default ClockButtons;
