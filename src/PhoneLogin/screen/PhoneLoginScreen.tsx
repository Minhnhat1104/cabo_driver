import {useTheme} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import PhoneInput from '@PhoneLogin/container/PhoneInput';
import OTPInput from '@PhoneLogin/container/OTPInput';
import {useTokenAuthen} from '@PhoneLogin/hook/useTokenAuthen';
import {storeKeyData} from '@base/utils/Helper';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_TOKEN,
} from '@base/config/asyncStorageKey';
import {screens} from '@base/config/screen';

const PhoneLoginScreen = ({navigation}: any) => {
  const {theme} = useTheme();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null);
  const [user, setUser] = useState({phoneNumber: '', fullName: ''});

  const mPostToken = useTokenAuthen();

  const handleLogin = async () => {
    // Xử lý logic đăng nhập ở đây
    const confirmation = await auth().signInWithPhoneNumber(
      '+1' + user?.phoneNumber,
    );
    setConfirm(confirmation);
  };

  async function confirmCode(code: string) {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  // OTP success

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  async function onAuthStateChanged(newUser: any) {
    if (newUser) {
      const newIdToken = await newUser?.getIdToken();

      if (newIdToken) {
        storeKeyData(STORE_KEY_TOKEN, newIdToken);
        // console.log(
        //   '🚀 ~ file: PhoneLoginScreen.tsx:54 ~ newIdToken:',
        //   newIdToken,
        // );

        // const params = {
        //   fullName: user?.fullName,
        //   phoneNumber: user?.phoneNumber,
        // };
        // mPostToken.mutate(params, {
        //   onSuccess: (data, variables, context) => {
        //     storeKeyData(STORE_KEY_DRIVER_ID, data?.driverId);

        //     navigation.navigate(screens.KEY_SCREEN_VEHICLE_REGISTER);
        //   },
        // });
      }

      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
      }}>
      {!confirm ? (
        <PhoneInput
          value={user}
          onChange={(nVal: any) => setUser(nVal)}
          onContinue={handleLogin}
        />
      ) : (
        <OTPInput navigation={navigation} onContinue={confirmCode} />
      )}
    </View>
  );
};

export default PhoneLoginScreen;
