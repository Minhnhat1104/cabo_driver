import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import OTPinput from './components/OTPinput';

interface OTP {
  value: number | null;
  focus: boolean;
}

const OTPScreen: React.FC = () => {
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default OTPScreen;
