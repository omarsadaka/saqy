import {
  login_loading,
  login_success,
  login_fail,
  reset_user_data,
} from './ActionTypes';
import {LoginAPI, SendFcmTokenAPI} from '../../api/LoginAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import {register_fail} from '../Register/ActionTypes';

export const LoginAction = (mobileNumber, password, device_key, navigation) => {
  return async dispatch => {
    try {
      dispatch({type: login_loading});
      const result = await LoginAPI(mobileNumber, password, device_key);
      console.log('login result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        if (result.error && result.data.mobile) {
          navigation.navigate('Verification', {
            number: result.data.mobile,
            type: 'Login',
          });
        }
        return dispatch({type: register_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: login_success, payload: result});
        // await AsyncStorage.setItem("user_token", result.access_token)
        await AsyncStorage.setItem('user_token', result.access_token).then(
          value => {
            AsyncStorage.getItem('user_token').then(val => {
              if (val) {
                navigation.replace('BottomNavigator', {guest: false});
              }
            });
          },
        );
        return;
      }
    } catch (error) {
      dispatch({type: login_fail, error: error.message});
    }
  };
};

export const ResetUserData = () => {
  return async dispatch => {
    dispatch({type: reset_user_data});
  };
};
