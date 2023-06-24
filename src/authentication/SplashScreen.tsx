import React, {useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';

const SplashScreen = ({navigation}: any) => {
  // Điều hướng đến màn hình đăng nhập sau khi hiển thị Splash Screen
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('PhoneLogin');
    }, 3000);
  }, []);

  return (
    <ImageBackground
      source={require('@base/assets/img/start_up_screen.jpg')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.text}>
          A car booking app that eases your journey
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
  text: {
    fontSize: 24,
    color: 'white',
  },
});

export default SplashScreen;
