import {useTheme} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import auth from '@react-native-firebase/auth';
import PhoneInput from '@PhoneLogin/container/PhoneInput';
import OTPInput from '@PhoneLogin/container/OTPInput';
import {getKeyData, storeKeyData} from '@base/utils/Helper';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_TOKEN,
  STORE_KEY_UID,
} from '@base/config/asyncStorageKey';
import {screens} from '@base/config/screen';
import {useDriverRegister} from '@PhoneLogin/hook/useDriverRegister';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneLoginScreen = ({navigation}: any) => {
  const {theme} = useTheme();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null);
  const [user, setUser] = useState({phoneNumber: '', fullName: ''});

  useEffect(() => {
    const checkLoginBefore = async () => {
      const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
      console.log('Currenct driverId', driverId);
      if (driverId) {
        navigation.navigate(screens.KEY_SCREEN_HOME);
      }
    };

    checkLoginBefore();
  }, []);

  const mDriverRegister = useDriverRegister();

  const handleLogin = async () => {
    // Xử lý logic đăng nhập ở đây
    try {
      console.log('User:', user);

      const confirmation = await auth().signInWithPhoneNumber(
        '+1' + user?.phoneNumber,
      );
      console.log('Confirmation after:', confirmation);
      setConfirm(confirmation);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  async function confirmCode(code: string) {
    try {
      await confirm.confirm(code);

      // register driver
      const params = {
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
      };
      console.log('Driver register params:', params);
      await mDriverRegister.mutate(params, {
        onSuccess: async (data, variables, context) => {
          if (data?.driverId) {
            await storeKeyData(STORE_KEY_DRIVER_ID, data?.driverId);
            navigation.navigate(screens.KEY_SCREEN_VEHICLE_REGISTER);
          }
        },
      });
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
        await storeKeyData(STORE_KEY_TOKEN, newIdToken);
      }

      const newUID = await newUser?.uid;
      if (newUID) {
        await storeKeyData(STORE_KEY_UID, newUID);
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
