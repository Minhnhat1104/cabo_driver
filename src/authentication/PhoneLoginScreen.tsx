// import {SCREEN_OTP_VERIFICATION} from '@base/config/constants';
// import {Button, Input, Text, useTheme} from '@rneui/themed';
// import React, {useEffect, useState} from 'react';
// import {View} from 'react-native';
// import CaboLabel from '@base/components/CaboLabel';

// const PhoneLoginScreen = ({navigation}: any) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const {theme} = useTheme();

//   const handleLogin = () => {
//     // Xử lý logic đăng nhập ở đây

//     // Chuyển đến màn hình xác thực OTP
//     navigation.navigate(SCREEN_OTP_VERIFICATION);
//   };

//   return (
//     <View
//       style={{
//         width: '100%',
//         height: '100%',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: theme.colors.secondary,
//       }}>
//       <View style={{height: 'auto', width: '90%'}}>
//         <View style={{marginBottom: 0, width: 'auto'}}>
//           <Text h1 style={{color: theme.colors.white}}>
//             Welcome!
//           </Text>
//           <Text style={{color: theme.colors.white}}>
//             Enter your phone number to continue!
//           </Text>
//         </View>

//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             justifyContent: 'center',
//             width: '100%',
//             marginTop: 16,
//             marginLeft: 0,
//           }}>
//           <View
//             style={{
//               height: 'auto',
//               borderWidth: 1,
//               padding: 12,
//               borderColor: theme.colors.grey3,
//               borderRadius: 4,
//             }}>
//             <Text style={{color: theme.colors.white}}>+84</Text>
//           </View>

//           <Input
//             containerStyle={{padding: 0, margin: 0, flex: 1}}
//             placeholder="Enter your phone number..."
//             value={phoneNumber}
//             onChangeText={setPhoneNumber}
//             keyboardType="numeric"
//             maxLength={10}
//           />
//         </View>
//         <Button
//           type="clear"
//           containerStyle={{
//             marginTop: 16,
//             width: 'auto',
//           }}
//           buttonStyle={{width: 'auto'}}
//           color={theme.colors.white}
//           title="Continue"
//           titleStyle={{
//             color: theme.colors.white,
//             fontSize: 20,
//           }}
//           onPress={handleLogin}
//         />
//       </View>
//     </View>
//   );
// };

// export default PhoneLoginScreen;
import React, {useState, useEffect} from 'react';
import {Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState<any>(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle login
  function onAuthStateChanged(user: any) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber: any) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}
