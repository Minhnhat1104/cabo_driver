import {usePickUpMutation} from '@OnDrive/hook/usePickUpMutation';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_TRIP_ID,
} from '@base/config/asyncStorageKey';
import {POSITION_HCMUS} from '@base/config/positions';
import {getKeyData} from '@base/utils/Helper';
import Geolocation from '@react-native-community/geolocation';
import {Button, Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const OnComingCustomer = () => {
  const [region, setRegion] = useState<any>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [position, setPosition] = useState<any>(null);
  console.log('Current position:', position);
  const {theme} = useTheme();

  //hook
  const mPickUp = usePickUpMutation();

  useEffect(() => {
    // Get GPS data
    Geolocation.getCurrentPosition(
      position => {
        console.log('Response position:', position);
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );

    // Clean up to avoid memory leaks
    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  const styles = useStyles();

  const handleRegionChange = (nVal: any) => {
    console.log('Region change:', nVal);
    setRegion(nVal);
  };

  const handlePickUp = async () => {
    const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
    const tripId = await getKeyData(STORE_KEY_TRIP_ID);

    Geolocation.getCurrentPosition(
      position => {
        const params = {
          driverId,
          tripId,
          currentLocation: {
            latitude: 0,
            longitude: 0,
          },
        };
        mPickUp.mutate(params);

        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={mapStyles.map}
          region={{
            latitude: POSITION_HCMUS.latitude,
            longitude: POSITION_HCMUS.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          // region={region}
          onRegionChange={handleRegionChange}></MapView>
      </View>
      <View>
        <Text h4>Customer name 2</Text>
        <Text style={{textAlign: 'justify'}}>
          Test Address: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </Text>
        <View style={styles.buttonContainer}>
          <View style={[styles.buttonItem, styles.borderRight]}>
            <Icon type="ionicon" name="chatbox-outline" />
            <Text>Chat</Text>
          </View>
          <View style={[styles.buttonItem, styles.borderRight]}>
            <Icon type="ionicon" name="call-outline" />
            <Text>Call</Text>
          </View>
          <View style={[styles.buttonItem, styles.borderRight]}>
            <Icon type="ionicon" name="help-outline" />
            <Text>Help Center</Text>
          </View>
          <View style={[styles.buttonItem]}>
            <Icon type="ionicon" name="ellipsis-horizontal-outline" />
            <Text>More Action</Text>
          </View>
        </View>
        <View style={{marginTop: 8}}>
          <Button loading={mPickUp.isLoading} onPress={handlePickUp}>
            Pick Up
          </Button>
        </View>
      </View>
    </View>
  );
};

const mapStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const useStyles = makeStyles((theme, props: any) => ({
  container: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  mapContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.grey4,
    width: '100%',
    flex: 1,
    mb: 8,
  },
  buttonContainer: {
    display: 'flex',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonItem: {
    flex: 0.25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  borderRight: {
    borderRightColor: theme.colors.divider,
    borderRightWidth: 1,
  },
}));

export default OnComingCustomer;
