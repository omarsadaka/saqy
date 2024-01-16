import {Platform, Alert, Linking} from 'react-native';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {useEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import {userLocationAction} from '../redux/Location/Actions';
// import LocationEnabler from 'react-native-location-enabler';

const useCurrentLocation = (guest, reFetch) => {
  const [state, setState] = useState({
    location: null,
    error: null,
    loading: true,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    if (reFetch) {
      getCurrentLocation();
    }
  }, [getCurrentLocation, reFetch]);
  // **** this for Android only **** /
  // const locationEnabler = () => {
  //   const {
  //     PRIORITIES: {HIGH_ACCURACY},
  //     useLocationSettings,
  //   } = LocationEnabler;
  // };
  // const [enabled, requestResolution] = useLocationSettings({
  //   priority: HIGH_ACCURACY, // optional: default BALANCED_POWER_ACCURACY
  //   alwaysShow: true, // optional: default false
  //   needBle: true, // optional: default false
  // });
  const getCurrentLocation = useCallback(async () => {
    if (!guest) {
      try {
        const result = await request(
          Platform.OS === 'ios'
            ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (result === RESULTS.GRANTED) {
          getPosition();
        } else {
          setTimeout(() => {
            Linking.openURL('app-settings:').catch(() =>
              Linking.openSettings(),
            );
          }, 500);
        }
      } catch (error) {
        setState(prev => ({
          ...prev,
          location: null,
          loading: false,
          error: error,
        }));
      }
    }
  }, []);

  const handleError = onPress => {
    Alert.alert(
      '',
      'enable Location',
      [
        {
          text: 'ok',
          onPress: () => onPress(),
        },
        {
          text: 'cancel',
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  const openLocationSetting = () => {
    if (Platform.OS === 'ios') {
      handleError(() =>
        Linking.openURL('app-settings:').catch(() => Linking.openSettings()),
      );
      return;
    } else {
      handleError(() =>
        Linking.openURL('app-settings:').catch(() => Linking.openSettings()),
      );
    }
  };
  const getPosition = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // dispatch(userLocationAction(position.coords));
        setState(prev => ({
          ...prev,
          location: {latitude, longitude},
          loading: false,
          error: false,
        }));
      },
      error => {
        setTimeout(() => {
          // requestResolution();
          openLocationSetting();
        }, 100);
        setState(prev => ({
          ...prev,
          location: null,
          loading: false,
          error: error,
        }));
      },
      {
        timeout: 40000,
        maximumAge: 10000,
      },
    );
  };

  return state;
};

export {useCurrentLocation};
