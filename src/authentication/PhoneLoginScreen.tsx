import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';

const PhoneLoginScreen = ({navigation}: any) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleLogin = () => {
    // Xử lý logic đăng nhập ở đây

    // Chuyển đến màn hình xác thực OTP
    navigation.navigate('OTPVerification');
  };

  return (
    <View>
      <TextInput
        placeholder="Số điện thoại"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <Button title="Đăng nhập" onPress={handleLogin} />
    </View>
  );
};

export default PhoneLoginScreen;
