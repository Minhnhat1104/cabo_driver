import React, {useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {Button, makeStyles, useTheme} from '@rneui/themed';
import Header from './Header';
import ClockButtons from './ClockButtons';
import messaging from '@react-native-firebase/messaging';
import IcomingDriveDialog from './IcomingDriveDialog';

interface HomeProps {
  navigation: any;
}

const Home = (props: HomeProps) => {
  const {navigation} = props;
  const styles = useStyles();
  const [showDriveDialog, setShowDriveDialog] = useState<boolean>(false);
  const {theme} = useTheme();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('RemoteMessage FCM:', remoteMessage);
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
