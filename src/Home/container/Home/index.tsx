import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, makeStyles, useTheme} from '@rneui/themed';
import Header from './Header';
import ClockButtons from './ClockButtons';
import messaging from '@react-native-firebase/messaging';
import IcomingDriveDialog from './IcomingDriveDialog';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {
  KEY_FCM_BOOKING_CLOSE,
  KEY_FCM_BOOKING_OPEN,
  KEY_FCM_GPS,
} from '@Home/config/constants';
import {useGPSMutation} from '@Home/hook/useGPSMutation';
import {getKeyData} from '@base/utils/Helper';
import {STORE_KEY_DRIVER_ID, STORE_KEY_UID} from '@base/config/asyncStorageKey';
import {useSnackbar} from '@base/hook/useSnackbar';

interface HomeProps {
  navigation: any;
}

const Home = (props: HomeProps) => {
  const {navigation} = props;
  const styles = useStyles();
  const [showDriveDialog, setShowDriveDialog] = useState<any>(null);
  console.log('ShowDriveDialog:', showDriveDialog);
  const [position, setPosition] = useState<any>(null);
  const {theme} = useTheme();
  const mGPS = useGPSMutation();
  const {mError} = useSnackbar();

  useEffect(() => {
    // Get GPS data
    Geolocation.getCurrentPosition(
      position => {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    // Clean up to avoid memory leaks
    // return () => {
    //   Geolocation.stopObserving();
    // };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('RemoteMessage FCM:', remoteMessage);
      const category = remoteMessage?.data?.category;
      if (category === KEY_FCM_GPS) {
        // handle post GPS

        const uId = await getKeyData(STORE_KEY_UID);

        Geolocation.getCurrentPosition(
          position => {
            const params = {
              uid: uId,
              currentLocation: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              },
            };
            mGPS.mutate(params);

            setPosition({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => console.log(error),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );
      } else if (category === KEY_FCM_BOOKING_OPEN) {
        try {
          const bookingInfo = remoteMessage?.data;
          setShowDriveDialog(bookingInfo);
        } catch (error) {
          mError('Invalid booking info!');
        }
      } else if (category === KEY_FCM_BOOKING_CLOSE) {
        setShowDriveDialog(null);
        mError('Drive is not available anymore!');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={{width: '100%', marginBottom: 20}}>
        <Header style={{marginBottom: 8}} />
        <ClockButtons style={{marginBottom: 8}} />
        <Button onPress={() => setShowDriveDialog(true)}>Show dialog</Button>
      </View>
      {/* ============= */}
      {/* <RecentDrive style={{margin: 'auto', alignSelf: 'flex-end'}} /> */}
      {!!showDriveDialog && (
        <IcomingDriveDialog
          visible={!!showDriveDialog}
          bookingInfo={showDriveDialog}
          onBackdropPress={() => setShowDriveDialog(null)}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
}));

export default Home;
