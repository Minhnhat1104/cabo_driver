import React, {useEffect} from 'react';
import {Tab, Text, TabView, useTheme, Button} from '@rneui/themed';
import messaging from '@react-native-firebase/messaging';
import Home from '@Home/container/Home';
import {storeKeyData} from '@base/utils/Helper';
import {STORE_KEY_FCM_TOKEN} from '@base/config/asyncStorageKey';

function HomeScreen({navigation}: any) {
  const {theme} = useTheme();
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const getFCMtoken = async () => {
      const token = await messaging().getToken();
      console.log('FCM token:', token);
      storeKeyData(STORE_KEY_FCM_TOKEN, token);
    };

    getFCMtoken();
  }, []);

  return (
    <>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Home navigation={navigation} />
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Text h1>History</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Text h1>Wallet</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Text h1>Account</Text>
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: theme.colors.primary,
          height: 3,
        }}
        variant="default">
        <Tab.Item
          title="Home"
          titleStyle={{fontSize: 12, color: theme.colors.secondary}}
          icon={{
            name: 'home-outline',
            type: 'ionicon',
            color: theme.colors.secondary,
          }}
        />
        <Tab.Item
          title="History"
          titleStyle={{fontSize: 12, color: theme.colors.secondary}}
          icon={{
            name: 'time-outline',
            type: 'ionicon',
            color: theme.colors.secondary,
          }}
        />
        <Tab.Item
          title="Finance"
          titleStyle={{fontSize: 12, color: theme.colors.secondary}}
          icon={{
            name: 'cash-outline',
            type: 'ionicon',
            color: theme.colors.secondary,
          }}
        />
      </Tab>
    </>
  );
}

export default HomeScreen;
