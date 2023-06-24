import React, {useState, useRef} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface OTPinputProps {
  value: any;
  onChange: any;
  autoFocus: boolean;
}

const OTPinput = (props: OTPinputProps) => {
  const {value, onChange, autoFocus = false} = props;

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
    <TextInput
      ref={inputRef}
      style={styles.otpInput}
      value={value}
      onChangeText={text => handleOnChange(text)}
      keyboardType="numeric"
      maxLength={1}
    />
  );
};

const styles = StyleSheet.create({
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

export default OTPinput;
