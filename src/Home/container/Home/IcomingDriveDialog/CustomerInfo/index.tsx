import {Image} from '@rneui/themed';
import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {useTheme, makeStyles} from 'react-native-elements';

interface CustomerInfoProps {
  // style: StyleProp<ViewStyle>;
}

const CustomerInfo = (props: CustomerInfoProps) => {
  // const {style} = props;
  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <View style={[styles.container]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
          }}
          containerStyle={styles.ava}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.info}>
          <Text style={styles.nameText}>Le Minh Nhat</Text>
          <Text style={styles.phoneText}>0774122075</Text>
        </View>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 8,
  },
  ava: {
    aspectRatio: 1,
    width: 20,
    height: 20,
    borderRadius: 9999,
    flex: 0.5,
    marginRight: 8,
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  nameText: {
    fontStyle: 'italic',
    fontWeight: '500',
    fontSize: 16,
  },
  phoneText: {
    fontStyle: 'italic',
    fontSize: 14,
  },
}));

export default CustomerInfo;
