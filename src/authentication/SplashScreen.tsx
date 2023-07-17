import CaboLabel from '@base/components/CaboLabel';
import {screens} from '@base/config/screen';
import {makeStyles} from '@rneui/themed';
import React, {useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}: any) => {
  const styles = useStyles();
  // Điều hướng đến màn hình đăng nhập sau khi hiển thị Splash Screen
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(screens.KEY_SCREEN_PHONE_LOGIN);
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require('../base/assets/image/start_up_screen.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <CaboLabel />
        <Text style={styles.text}>
          A car booking app that eases your journey
        </Text>
      </View>
    </ImageBackground>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    color: theme.colors.primary,
    textAlign: 'center',
  },
  text: {
    fontSize: 24,
    color: theme.colors.white,
    textAlign: 'center',
  },
}));

export default SplashScreen;
