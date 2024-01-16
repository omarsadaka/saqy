import {
  set_user_location_success,
  set_user_location_fail,
  send_fcmToken_success,
  send_fcmToken_fail,
  check_activity_success,
  check_activity_fail,
} from './ActionTypes';
import {
  LocationAPI,
  SendFcmTokenAPI,
  checkActiveUser,
} from '../../api/LocationAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

export const userLocationAction = coords => {
  return async dispatch => {
    try {
      const result = await LocationAPI(coords);
      console.log('location result: ', result);
      if (result.error) {
        return dispatch({type: set_user_location_fail, error: result.error});
      }
      if (result.code == 200) {
        dispatch({type: set_user_location_success, payload: result});
        return;
      }
      if (result.code !== 200) {
        dispatch({type: set_user_location_fail, error: result.message});
        return;
      }
    } catch (error) {
      dispatch({type: set_user_location_fail, error: error.message});
    }
  };
};

export const SendFcmAction = fcmToken => {
  return async dispatch => {
    try {
      const result = await SendFcmTokenAPI(fcmToken);
      console.log('SendFcmAction', result);
      if (result.error) {
        console.log('SendFcmAction error', result.error);
        return dispatch({type: send_fcmToken_fail, error: result.error});
      }
      if (result.status) {
        console.log('SendFcmAction', result.status);
        dispatch({type: send_fcmToken_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: send_fcmToken_fail, error: error.message});
    }
  };
};
export const CheckActiveUserAction = navigation => {
  return async dispatch => {
    try {
      const result = await checkActiveUser();
      console.log('CheckActiveUser result: ', result);
      if (result) {
        dispatch({type: check_activity_success, payload: result});
        if (result.success != 1) {
          showMessage({
            message: 'لقد تم إلغاء تفعيل حسابك من الإدمن',
            backgroundColor: '#FF6F61',
          });
          await AsyncStorage.removeItem('user_token').then(value => {
            AsyncStorage.getItem('user_token').then(val => {
              if (!val) {
                AsyncStorage.clear();
                navigation.replace('Login');
              }
            });
          });
        }
        return;
      }
    } catch (error) {
      dispatch({type: check_activity_fail, error: error.message});
    }
  };
};
