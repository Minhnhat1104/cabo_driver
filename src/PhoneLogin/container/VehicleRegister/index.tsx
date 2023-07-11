import DropdownSelect from '@base/components/DropdownSelect';
import {VEHICLE_TYPE_OPTION} from '@base/config/constants';
import {LabelValue} from '@base/types';
import {useTheme, Text, Button, Input} from '@rneui/themed';
import React, {useState} from 'react';
import {View} from 'react-native';

interface VehicleRegisterProps {
  value: any;
  onChange: any;
}

const VehicleRegister = (props: VehicleRegisterProps) => {
  const {value, onChange} = props;

  const {theme} = useTheme();

  const handleOnChange = (
    nVal: any,
    field: 'slot' | 'type' | 'regNo' | 'brand',
  ) => {
    switch (field) {
      case 'slot':
        const numericValue = nVal === '' ? nVal : Number(nVal);
        if (!isNaN(numericValue) || nVal === '') {
          if (nVal == '' && numericValue >= 1 && numericValue <= 8) {
          }
          const newUser = {
            ...value,
            [field]: numericValue,
          };

          onChange && onChange(newUser);
        }
        break;
      default: {
        const newUser = {
          ...value,
          [field]: nVal,
        };

        onChange && onChange(newUser);
      }
    }
  };
  return (
    <>
      <View style={{height: 'auto', width: '90%'}}>
        <View style={{marginBottom: 0, width: 'auto'}}>
          <Text
            h1
            style={{
              color: theme.colors.white,
              textAlign: 'center',
            }}>
            Register Vehicle
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
          <Text style={{color: theme.colors.white}}>Slot</Text>
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
            placeholder="Enter slot"
            value={value?.slot?.toString()}
            onChangeText={(nVal: any) => handleOnChange(nVal, 'slot')}
            keyboardType="numeric"
            maxLength={1}
          />
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
          <Text style={{color: theme.colors.white}}>Type</Text>

          <DropdownSelect
            value={VEHICLE_TYPE_OPTION.find(
              (_option: LabelValue) => _option.value === value?.type,
            )}
            onChange={(nVal: LabelValue) => handleOnChange(nVal?.value, 'type')}
            options={VEHICLE_TYPE_OPTION}
          />
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
          <Text style={{color: theme.colors.white}}>License plate</Text>
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
            placeholder="Enter regNo..."
            value={value?.regNo}
            onChangeText={(nVal: string) =>
              handleOnChange(nVal.toUpperCase(), 'regNo')
            }
            autoCapitalize={'characters'}
            maxLength={10}
          />
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
          <Text style={{color: theme.colors.white}}>Brand</Text>
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
            placeholder="Enter brand"
            value={value?.brand}
            onChangeText={(nVal: any) => handleOnChange(nVal, 'brand')}
          />
        </View>
      </View>
    </>
  );
};

export default VehicleRegister;
