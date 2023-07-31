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

interface HomeProps {
  navigation: any;
}

const Home = (props: HomeProps) => {
  const {navigation} = props;
  const styles = useStyles();
  const [showDriveDialog, setShowDriveDialog] = useState<boolean>(false);
  const [position, setPosition] = useState<any>(null);
  console.log('Current position:', position);
  const {theme} = useTheme();

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
    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('RemoteMessage FCM:', remoteMessage);
      const title = remoteMessage?.notification?.title;
      if (title === KEY_FCM_GPS) {
        // handle post GPS
      } else if (title === KEY_FCM_BOOKING_OPEN) {
        setShowDriveDialog(true);
      } else if (title === KEY_FCM_BOOKING_CLOSE) {
        setShowDriveDialog(false);
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
      {showDriveDialog && (
        <IcomingDriveDialog
          visible={showDriveDialog}
          onBackdropPress={() => setShowDriveDialog(false)}
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
