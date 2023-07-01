import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import OTPinput from './components/OTPinput';
import {Button, makeStyles, useTheme} from '@rneui/themed';
import {SCREEN_HOME} from '@base/config/constants';

interface OTP {
  value: number | null;
  focus: boolean;
}

interface OTPScreenProps {
  navigation: any;
}

const OTPScreen = (props: OTPScreenProps) => {
  const {navigation} = props;
  const styles = useStyles();
  const {theme} = useTheme();
  const [otps, setOtps] = useState<OTP[]>([
    {value: null, focus: false},
    {value: null, focus: false},
    {value: null, focus: false},
    {value: null, focus: false},
    {value: null, focus: false},
    {value: null, focus: false},
  ]);

  const handleOnChange = (nVal: number, index: number) => {
    const newOtps = otps?.map((otp: OTP, i: number) => {
      if (i === index) {
        return {
          ...otp,
          value: nVal,
          focus: false,
        };
      } else if (i === index + 1) {
        return {
          ...otp,
          focus: true,
        };
      } else {
        return {
          ...otp,
          focus: false,
        };
      }
    });

    setOtps(newOtps);
  };

  const handleContinue = () => {
    // handle send OTP here

    navigation.navigate(SCREEN_HOME);
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otps?.map((otp: OTP, i: number) => {
          return (
            <OTPinput
              key={i}
              value={otp?.value}
              onChange={(nVal: any) => handleOnChange(nVal, i)}
              autoFocus={otp?.focus}
            />
          );
        })}
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
        onPress={handleContinue}
      />
    </View>
  );
};

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.secondary,
  },
  otpContainer: {
    flexDirection: 'row',
  },
  otpInput: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
  },
}));

export default OTPScreen;
