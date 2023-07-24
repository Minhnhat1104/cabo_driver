import {Image} from '@rneui/themed';
import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {useTheme, Icon, makeStyles} from 'react-native-elements';

interface HeaderProps {
  style: StyleProp<ViewStyle>;
}

const Header = (props: HeaderProps) => {
  const {style} = props;
  const styles = useStyles();
  const {theme} = useTheme();
  return (
    <View style={[styles.container, style]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
          }}
          containerStyle={styles.ava}
          PlaceholderContent={<ActivityIndicator />}
        />
        <Text style={{fontStyle: 'italic', fontSize: 20}}>Le Minh Nhat</Text>
      </View>
      <Icon name="notifications-outline" type="ionicon" size={30} />
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    // backgroundColor: 'red',
  },
  container: {
    width: '100%',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  ava: {
    aspectRatio: 1,
    width: 20,
    height: 20,
    borderRadius: 9999,
    flex: 0.4,
    marginRight: 8,
    // overflow: 'hidden',
  },
}));

export default Header;
