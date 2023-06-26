import {SCREEN_OTP_VERIFICATION} from '@base/config/constants';
import {Button, Input, Text, useTheme} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';
import CaboLabel from '@base/components/CaboLabel';
const PhoneLoginScreen = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const {theme} = useTheme();

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây

    // Chuyển đến màn hình xác thực OTP
    navigation.navigate(SCREEN_OTP_VERIFICATION);
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
      }}>
      <View style={{height: 'auto', width: '90%'}}>
        <View style={{marginBottom: 0, width: 'auto'}}>
          <Text h1 style={{color: theme.colors.white}}>
            Welcome!
          </Text>
          <Text style={{color: theme.colors.white}}>
            Enter your phone number to continue!
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 16,
            marginLeft: 0,
          }}>
          <View
            style={{
              height: 'auto',
              borderWidth: 1,
              padding: 12,
              borderColor: theme.colors.grey3,
              borderRadius: 4,
            }}>
            <Text style={{color: theme.colors.white}}>+84</Text>
          </View>

          <Input
            containerStyle={{padding: 0, margin: 0, flex: 1}}
            placeholder="Enter your phone number..."
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>
        <Button
          type="clear"
          containerStyle={{
            marginTop: 16,
            width: 'auto',
          }}
          buttonStyle={{width: 'auto'}}
          color={theme.colors.white}
          title="Continue"
          titleStyle={{
            color: theme.colors.white,
            fontSize: 20,
          }}
          onPress={handleLogin}
        />
      </View>
    </View>
  );
};

export default PhoneLoginScreen;
