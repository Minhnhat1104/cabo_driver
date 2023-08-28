import {useGPSMutation} from '@Home/hook/useGPSMutation';
import {useGPSOnDriveMutation} from '@Home/hook/useGPSOnDriveMutation';
import {useFinishMutation} from '@OnDrive/hook/useFinishMutation';
import {usePickUpMutation} from '@OnDrive/hook/usePickUpMutation';
import {
  STORE_KEY_DRIVER_ID,
  STORE_KEY_TRIP_ID,
  STORE_KEY_UID,
} from '@base/config/asyncStorageKey';
import {POSITION_HCMUS} from '@base/config/positions';
import {screens} from '@base/config/screen';
import {getKeyData} from '@base/utils/Helper';
import Geolocation from '@react-native-community/geolocation';
import {useRoute} from '@react-navigation/native';
import {Button, Icon, Text, makeStyles, useTheme} from '@rneui/themed';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {LatLng, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

interface OnComingCustomerProps {
  navigation: any;
}

const OnComingCustomer = (props: OnComingCustomerProps) => {
  const {navigation} = props;
  const [region, setRegion] = useState<any>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const [position, setPosition] = useState<LatLng | null>(null);
  const positionRef = useRef<any>(null);
  const [pickUp, setPickUp] = useState<boolean>(false);
  console.log('Current position:', position);

  const route = useRoute();
  const bookingInfo: any = route.params;
  console.log('Booking Info:', bookingInfo);

  // Get Data from prev screen
  const {
    customerOrderLocation: customerOrderLocationJson,
    toLocation: toLocationJson,
    distance,
    profit,
    tripId,
    customerInfo: customerInfoJson,
  } = bookingInfo || {};

  let customerOrderLocation: any;
  let toLocation;
  let customerInfo: any;
  try {
    customerOrderLocation = JSON.parse(customerOrderLocationJson);
    toLocation = JSON.parse(toLocationJson);
    customerInfo = JSON.parse(customerInfoJson);
  } catch (error) {
    console.log('Error:', error);
  }

  console.log('customerOrderLocation: ', customerOrderLocation);
  console.log('toLocation: ', toLocation);
  console.log('customerInfo: ', customerInfo);

  //hook
  const {theme} = useTheme();
  const mPickUp = usePickUpMutation();
  const mFinish = useFinishMutation();
  const mGPS = useGPSOnDriveMutation();

  useEffect(() => {
    // Get GPS data
    const geoInterval = setInterval(() => {
      Geolocation.getCurrentPosition(
        async newPosition => {
          const currentLocation = positionRef.current;
          console.log('NewPosition:', newPosition.coords);
          console.log('CurrentLocation: ', currentLocation);
          if (
            currentLocation?.latitude !== newPosition.coords.latitude &&
            currentLocation?.longitude !== newPosition.coords.longitude
          ) {
            const uId = await getKeyData(STORE_KEY_UID);
            const params = {
              uid: uId,
              customerId: customerInfo?.customerId,
              currentLocation: {
                latitude: newPosition.coords.latitude,
                longitude: newPosition.coords.longitude,
              },
              customerOrderLocation: {
                latitude: customerOrderLocation?.location.latitude,
                longitude: customerOrderLocation?.location.longitude,
              },
            };
            mGPS.mutate(params);

            setPosition({
              latitude: newPosition.coords.latitude,
              longitude: newPosition.coords.longitude,
            });
            positionRef.current = {
              latitude: newPosition.coords.latitude,
              longitude: newPosition.coords.longitude,
            };
          }
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        },
      );
    }, 3000);

    return () => {
      clearInterval(geoInterval);
    };
    // Clean up to avoid memory leaks
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
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };
        mPickUp.mutate(params, {
          onSuccess(data, variables, context) {
            navigation.navigate(screens.KEY_SCREEN_HOME);
            setPickUp(true);
          },
        });

        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        positionRef.current = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      },
      error => console.log(error),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  const handleFinish = async () => {
    const driverId = await getKeyData(STORE_KEY_DRIVER_ID);
    const tripId = await getKeyData(STORE_KEY_TRIP_ID);

    Geolocation.getCurrentPosition(
      position => {
        const params = {
          driverId,
          tripId,
          currentLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        };
        mFinish.mutate(params, {
          onSuccess(data, variables, context) {
            setPickUp(true);
          },
        });

        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        positionRef.current = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
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
          onRegionChange={handleRegionChange}>
          {position && (
            <Marker
              key={'driver'}
              coordinate={position}
              title={'Current'}
              description={'Your current position'}
            />
          )}
          {customerOrderLocation?.location && (
            <Marker
              key={'pick_up_location'}
              coordinate={customerOrderLocation?.location}
              title={'Pick up'}
              description={'Pick up location'}
            />
          )}
          {toLocation?.location && (
            <Marker
              key={'destination'}
              coordinate={toLocation?.location}
              title={'Destination'}
              description={'Destination location'}
            />
          )}
        </MapView>
      </View>
      <View>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>Customer: </Text>
          <Text>{customerInfo?.fullName || '0.0km'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>Customer phone: </Text>
          <Text>{customerInfo?.phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>Distance: </Text>
          <Text>{distance || '0.0km'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>From: </Text>
          <Text>{customerOrderLocation?.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={{fontWeight: 'bold'}}>To: </Text>
          <Text>{toLocation?.address}</Text>
        </View>
        {/* <View style={styles.buttonContainer}>
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
        </View> */}
        <View style={{marginTop: 8}}>
          {!pickUp ? (
            <Button loading={mPickUp.isLoading} onPress={handlePickUp}>
              Pick Up
            </Button>
          ) : (
            <Button
              // loading={mPickUp.isLoading}
              onPress={handleFinish}>
              Finish
            </Button>
          )}
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
  row: {
    display: 'flex',
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  borderRight: {
    borderRightColor: theme.colors.divider,
    borderRightWidth: 1,
  },
}));

export default OnComingCustomer;
