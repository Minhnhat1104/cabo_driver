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
            uri: 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-1/314734138_3470157139974701_1196683337150141940_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=3vymVK8B1igAX-8l316&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDE3rrLb4Kn2JieMOCMV_1QnAuZmO4fYCpOjjp1VC0ymA&oe=64BA8EB9',
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
