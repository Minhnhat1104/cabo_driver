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
            uri: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/358595166_661076079387902_5219462560343882944_n.jpg?stp=dst-jpg_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=730e14&_nc_ohc=C3DSDpckkDYAX_dhE_l&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfC702i-7AeY3UMCm0dROYMJxxBHvJPK-3HRN1w8jVEP1Q&oe=64B39C49',
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
