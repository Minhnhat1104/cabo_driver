import DialogCustom from '@base/components/DialogCustom';
import {getKeyData, moneyFormat, storeKeyData} from '@base/utils/Helper';
import {Button, Divider, Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import CustomerInfo from './CustomerInfo';
import {useAcceptMutation} from '@Home/hook/useAcceptMutation';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_TRIP_ID,
} from '@base/config/asyncStorageKey';
import Geolocation from '@react-native-community/geolocation';
import {screens} from '@base/config/screen';

interface IcomingDriveDialogProps {
  visible: boolean;
  bookingInfo?: any;
  onBackdropPress: () => void;
  navigation: any;
}

const IcomingDriveDialog = (props: IcomingDriveDialogProps) => {
  const {visible, bookingInfo, onBackdropPress, navigation} = props;
  const {
    customerOrderLocation: customerOrderLocationJson,
    toLocation: toLocationJson,
    distance,
    profit,
    tripId,
    customerInfo: customerInfoJson,
  } = bookingInfo || {};

  let customerOrderLocation;
  let toLocation;
  let customerInfo;
  try {
    customerOrderLocation = JSON.parse(customerOrderLocationJson);
    toLocation = JSON.parse(toLocationJson);
    customerInfo = JSON.parse(customerInfoJson);
  } catch (error) {
    console.log('Error:', error);
  }

  const styles = useStyles();
  const {theme} = useTheme();
  const mAccept = useAcceptMutation();

  const handleAccept = async () => {
    const driverId = await getKeyData(STORE_KEY_DRIVER_ID);

    Geolocation.getCurrentPosition(
      position => {
        const params = {
          driverId: driverId,
          tripId: tripId,
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };
        console.log('Params:', params);
        mAccept.mutate(params, {
          onSuccess: async () => {
            await storeKeyData(STORE_KEY_TRIP_ID, tripId);
            navigation.navigate(screens.KEY_SCREEN_ON_DRIVE);
          },
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const Footer = (
    <Button
      containerStyle={{borderRadius: 0}}
      buttonStyle={{borderRadius: 0}}
      size="lg"
      onPress={handleAccept}
      loading={mAccept.isLoading}>
      Accept
    </Button>
  );

  return (
    <DialogCustom
      //   title="Icoming Drive"
      visible={visible}
      onBackdropPress={onBackdropPress}
      Footer={Footer}
      disablePadding>
      <CustomerInfo customerInfo={customerInfo} />

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>{distance || '0.0km'}</Text>
        </View>
        <Divider orientation="vertical" style={{backgroundColor: '#ccc'}} />
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>{profit || moneyFormat(0)}</Text>
        </View>
      </View>
      {/* Body */}
      <View style={styles.bodyContainer}>
        <View style={styles.bodyItem}>
          {/* <Text style={styles.bodyTextTitle}>130 Đất thánh</Text> */}
          <Text style={styles.bodyTextDetail}>
            {customerOrderLocation?.address}
          </Text>
        </View>

        {/* Divider */}
        <View style={{position: 'relative', width: '100%', zIndex: 1}}>
          <Divider />
          <View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: [{translateX: -20}, {translateY: -20}],
              //   width: 50,
              //   height: 50,
              backgroundColor: theme.colors.primary,
              borderRadius: 99,
              padding: 4,
            }}>
            <Icon
              name="caret-down-outline"
              type="ionicon"
              color={theme.colors.white}
              style={{
                position: 'relative',
                top: 1,
              }}
              size={30}
            />
          </View>
        </View>

        <View style={[styles.bodyItem, styles.bodyItem2]}>
          {/* <Text style={styles.bodyTextTitle}>Big C miền đông</Text> */}
          <Text style={styles.bodyTextDetail}>{toLocation?.address}</Text>
        </View>
      </View>
    </DialogCustom>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  headerContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  headerItem: {
    flex: 0.5,
    backgroundColor: theme.colors.grey5,
    textAlign: 'center',
  },
  headerText: {
    textAlign: 'center',
    padding: 20,
    fontSize: 16,
  },
  bodyContainer: {
    width: '100%',
    display: 'flex',
    // flexDirection: 'row',
  },
  bodyItem: {
    width: '100%',
    padding: 24,
  },
  bodyItem2: {
    backgroundColor: theme.colors.grey5,
  },
  bodyTextTitle: {
    fontSize: 24,
    textAlign: 'center',
  },
  bodyTextDetail: {
    fontSize: 14,
    textAlign: 'center',
  },
}));

export default IcomingDriveDialog;
