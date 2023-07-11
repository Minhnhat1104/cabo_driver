import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useTheme, Text, Button, Input} from '@rneui/themed';

interface OTPinputProps {
  value: any;
  onChange: any;
  autoFocus: boolean;
}

const OTPinput = (props: OTPinputProps) => {
  const {value, onChange, autoFocus = false} = props;

  const {theme} = useTheme();
  const inputRef = useRef<any>(null);
  if (autoFocus) {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }

  const handleOnChange = (nVal: any) => {
    onChange && onChange(nVal);
  };

  return (
    <Input
      ref={inputRef}
      containerStyle={styles.otpInput}
      inputContainerStyle={{
        borderWidth: 0,
      }}
      inputStyle={{paddingLeft: 8, color: 'black'}}
      value={value}
      onChangeText={text => handleOnChange(text)}
      keyboardType="numeric"
      maxLength={1}
      placeholder=""
    />
  );
};

const styles = StyleSheet.create({
  otpInput: {
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: 5,

    marginHorizontal: 5,
    backgroundColor: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default OTPinput;
