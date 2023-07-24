import {useCheckInMutation} from '@Home/hook/useCheckInMutation';
import {useCheckOutMutation} from '@Home/hook/useCheckOutMutation';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_TIME_CHECK_IN,
  STORE_KEY_TIME_CHECK_OUT,
} from '@base/config/asyncStorageKey';
import {
  convertDateTimeSeverToClient,
  dateFormat,
  isNewDate,
} from '@base/utils/Date';
import {deleteKeyData, getKeyData, storeKeyData} from '@base/utils/Helper';
import {Button, Dialog, makeStyles, useTheme} from '@rneui/themed';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
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
  const [checkIn, setCheckIn] = useState<string>('');
  const [checkOut, setCheckOut] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const resetNewday = () => {
      deleteKeyData(STORE_KEY_TIME_CHECK_IN);
      deleteKeyData(STORE_KEY_TIME_CHECK_OUT);
      setCheckIn('');
      setCheckOut('');
    };

    // resetNewday();

    const checkIsCheckInBefore = async () => {
      setIsLoading(true);
      const checkInTime = await getKeyData(STORE_KEY_TIME_CHECK_IN);
      const checkOutTime = await getKeyData(STORE_KEY_TIME_CHECK_OUT);

      if (checkOutTime && checkInTime) {
        if (!isNewDate(Number(checkOutTime))) {
          setCheckIn(
            convertDateTimeSeverToClient(Number(checkInTime), 'h:mm A'),
          );
          setCheckOut(
            convertDateTimeSeverToClient(Number(checkOutTime), 'h:mm A'),
          );
        } else {
          // reset checkin time if tomorrow
          // console.log('Reset 1');
          resetNewday();
        }
      } else if (checkInTime) {
        // still on working in that day
        if (!isNewDate(Number(checkInTime))) {
          setCheckIn(
            convertDateTimeSeverToClient(Number(checkInTime), 'h:mm A'),
          );
        } else {
          // forget checkout -> reset time
          // console.log('Reset 2');
          resetNewday();
        }
      } else {
        // no time -> reset time
        // console.log('Reset 3');
        resetNewday();
      }

      setIsLoading(false);
    };

    checkIsCheckInBefore();
  }, []);

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
        const checkInAt = variables?.checkInAt;
        storeKeyData(STORE_KEY_TIME_CHECK_IN, checkInAt.toString());
        setCheckIn(convertDateTimeSeverToClient(Number(checkInAt), 'h:mm A'));
        setCheckOut('');
      },
    });
  };

  const handleCheckOut = async () => {
    const curTime = new Date();
    const checkInTime = await getKeyData(STORE_KEY_TIME_CHECK_IN);
    const driverId = await getKeyData(STORE_KEY_DRIVER_ID);

    const params = {
      checkInAt: checkInTime,
      // checkInAt: checkInTime,
      checkOutAt: curTime.getTime(),
      driverId: driverId,
    };

    mCheckOut.mutate(params, {
      onSuccess: (data, variables, context) => {
        const checkOutAt = variables?.checkOutAt;
        storeKeyData(STORE_KEY_TIME_CHECK_OUT, checkOutAt.toString());
        setCheckOut(convertDateTimeSeverToClient(Number(checkOutAt), 'h:mm A'));
      },
    });

    storeKeyData(STORE_KEY_TIME_CHECK_IN, curTime.getTime().toString());
  };

  if (isLoading) {
    return (
      <Dialog isVisible={isLoading}>
        <Dialog.Loading />
      </Dialog>
    );
  }

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
        loading={mCheckIn.isLoading}
        disabled={!!checkIn}
        onPress={handleCheckIn}>
        {checkIn || 'Check in'}
      </Button>
      <Button
        size="lg"
        containerStyle={[styles.button]}
        loading={mCheckOut.isLoading}
        disabled={!!checkOut || !checkIn}
        onPress={handleCheckOut}>
        {checkOut || 'Check out'}
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
