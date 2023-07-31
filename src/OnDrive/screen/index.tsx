import {Button, Icon, Text, makeStyles} from '@rneui/themed';
import React from 'react';
import {View} from 'react-native';
import OnComingCustomer from './OnComingCustomer';

interface OnDriveScreenProps {
  navigation: any;
}

const OnDriveScreen = (props: OnDriveScreenProps) => {
  const styles = useStyles();
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <OnComingCustomer />
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    // alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 24,
  },
  buttonContainer: {
    display: 'flex',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonItem: {
    flex: 0.25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  borderRight: {
    borderRightColor: theme.colors.divider,
    borderRightWidth: 1,
  },
}));

export default OnDriveScreen;
