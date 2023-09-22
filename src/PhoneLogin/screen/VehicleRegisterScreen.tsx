import VehicleRegister from '@PhoneLogin/container/VehicleRegister';
import {useDriverRegister} from '@PhoneLogin/hook/useDriverRegister';
import {useVehicleRegister} from '@PhoneLogin/hook/useVehicleRegister';
import DropdownSelect from '@base/components/DropdownSelect';
import {
  STORE_KEY_CAR_TYPE,
  STORE_KEY_DRIVER_ID,
  STORE_KEY_VEHICLE,
} from '@base/config/asyncStorageKey';
import {screens} from '@base/config/screen';
import {getKeyData, storeKeyData} from '@base/utils/Helper';
import {useRoute} from '@react-navigation/native';
import {Button, useTheme} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

const VehicleRegisterScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const route = useRoute();
  const driverRegisterParams: any = route.params;

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

  const mDriverRegister = useDriverRegister();
  const mRegister = useVehicleRegister();
  const handleRegisterVehicle = async () => {
    // register driver
    console.log('Driver register params:', driverRegisterParams);
    await mDriverRegister.mutate(driverRegisterParams, {
      onSuccess: async (data, variables, context) => {
        if (data?.driverId) {
          await storeKeyData(STORE_KEY_DRIVER_ID, data?.driverId);
        }
      },
    });

    // register vehicle
    const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
    const params = {
      id: driverId,
      slot: vehicle.slot || 0,
      type: vehicle.type,
      regNo: vehicle.regNo,
      brand: vehicle.brand,
    };
    mRegister.mutate(params, {
      onSuccess: async (data, variables, context) => {
        await storeKeyData(STORE_KEY_VEHICLE, data?.vehicleId);
        await storeKeyData(STORE_KEY_CAR_TYPE, vehicle.type);
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
        loading={mRegister.isLoading}
        onPress={handleRegisterVehicle}
      />
    </View>
  );
};

export default VehicleRegisterScreen;
