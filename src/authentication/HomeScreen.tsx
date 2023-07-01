import React from 'react';
import {Tab, Text, TabView, useTheme} from '@rneui/themed';

function HomeScreen() {
  const {theme} = useTheme();
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{backgroundColor: 'white', width: '100%'}}>
          <Text h1>Home</Text>
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
            name: 'file',
            type: 'font-awesome-5',
            color: theme.colors.secondary,
          }}
        />
        <Tab.Item
          title="History"
          titleStyle={{fontSize: 12, color: theme.colors.secondary}}
          icon={{
            name: 'file',
            type: 'font-awesome-5',
            color: theme.colors.secondary,
          }}
        />
        <Tab.Item
          title="Wallet"
          titleStyle={{fontSize: 12, color: theme.colors.secondary}}
          icon={{name: 'heart', type: 'ionicon', color: theme.colors.secondary}}
        />
        <Tab.Item
          title="Account"
          titleStyle={{fontSize: 12, color: theme.colors.secondary}}
          icon={{name: 'cart', type: 'ionicon', color: theme.colors.secondary}}
        />
      </Tab>
    </>
  );
}

export default HomeScreen;
