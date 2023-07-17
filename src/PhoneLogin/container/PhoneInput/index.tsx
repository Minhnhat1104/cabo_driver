import {useTheme, Text, Button, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';

interface PhoneInputProps {
  onContinue: any;
  value: any;
  onChange: any;
}

const PhoneInput = (props: PhoneInputProps) => {
  const {onContinue, value, onChange} = props;

  const {theme} = useTheme();

  const handleContinue = () => {
    onContinue && onContinue();
  };

  const handleOnChange = (nVal: any, field: 'phoneNumber' | 'fullName') => {
    const newUser = {
      ...value,
      [field]: nVal,
    };

    onChange && onChange(newUser);
  };
  return (
    <>
      <View style={{height: 'auto', width: '90%'}}>
        <View style={{marginBottom: 0, width: 'auto'}}>
          <Text h1 style={{color: theme.colors.white}}>
            Welcome!
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
            marginTop: 16,
            marginLeft: 0,
            marginBottom: 8,
            padding: 0,
          }}>
          <Text style={{color: theme.colors.white}}>Enter your full name</Text>
          <Input
            containerStyle={{
              padding: 0,
              margin: 0,
              width: '100%',
            }}
            inputContainerStyle={{
              margin: 0,
              padding: 0,
            }}
            inputStyle={{margin: 0, padding: 0}}
            placeholder="Press to enter full name"
            value={value?.fullName}
            onChangeText={(nVal: any) => handleOnChange(nVal, 'fullName')}
          />
        </View>

        <Text style={{color: theme.colors.white}}>Enter your phone number</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            marginTop: 0,
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
            <Text style={{color: theme.colors.white, fontSize: 16}}>+1</Text>
          </View>

          <Input
            containerStyle={{flex: 1, paddingLeft: 4}}
            placeholder="Press to enter phone number"
            value={value?.phoneNumber}
            onChangeText={(nVal: any) => handleOnChange(nVal, 'phoneNumber')}
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <Button
          // type="solid"
          containerStyle={{
            marginTop: 16,
          }}
          title="Continue"
          size="lg"
          onPress={handleContinue}
        />
      </View>
    </>
  );
};

export default PhoneInput;
