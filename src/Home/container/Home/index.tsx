import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Button, Icon, Image, makeStyles, useTheme} from '@rneui/themed';
import {Text} from 'react-native-elements';
import Header from './Header';
import ClockButtons from './ClockButtons';
import RecentDrive from './RecentDrive';

interface HomeProps {
  navigation: any;
}

const Home = (props: HomeProps) => {
  const {navigation} = props;
  const styles = useStyles();
  const {theme} = useTheme();

  return (
    <View style={styles.container}>
      <View style={{width: '100%'}}>
        <Header style={{marginBottom: 8}} />
        <ClockButtons style={{marginBottom: 8}} />
      </View>
      {/* <View style={{flex: 1, width: '100%', justifyContent: 'center'}}> */}
      <RecentDrive style={{margin: 'auto', alignSelf: 'flex-end'}} />
      {/* </View> */}
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
}));

export default Home;
