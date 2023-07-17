import VehicleRegister from '@PhoneLogin/container/VehicleRegister';
import {useVehicleRegister} from '@PhoneLogin/hook/useVehicleRegister';
import DropdownSelect from '@base/components/DropdownSelect';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_VEHICLE,
} from '@base/config/asyncStorageKey';
import {screens} from '@base/config/screen';
import {getKeyData, storeKeyData} from '@base/utils/Helper';
import {Button, useTheme} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

const VehicleRegisterScreen = ({navigation}: any) => {
  const {theme} = useTheme();

  // If null, no SMS has been sent
  const [vehicle, setVehicle] = useState({
    slot: 0,
    type: '',
    regNo: '',
    brand: '',
  });

  useEffect(() => {
    const getKeyData2 = async () => {
      const driverId = await getKeyData(STORE_KEY_VEHICLE);

      if (driverId) {
        navigation.navigate(screens.KEY_SCREEN_HOME);
      }
    };

    getKeyData2();
  }, []);

  const mRegister = useVehicleRegister();
  const handleRegisterVehicle = async () => {
    const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
    const params = {
      id: driverId,
      slot: vehicle.slot || 0,
      type: vehicle.type,
      regNo: vehicle.regNo,
      brand: vehicle.brand,
    };
    mRegister.mutate(params, {
      onSuccess(data, variables, context) {
        storeKeyData(STORE_KEY_VEHICLE, data?.vehicleId);
        navigation.navigate(screens.KEY_SCREEN_HOME);
      },
    });
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.secondary,
      }}>
      <VehicleRegister
        value={vehicle}
        onChange={(nVal: any) => setVehicle(nVal)}
      />
      <Button
        // type="solid"
        containerStyle={{
          marginTop: 16,
        }}
        title="Continue"
        size="lg"
        onPress={handleRegisterVehicle}
      />
    </View>
  );
};

export default VehicleRegisterScreen;
