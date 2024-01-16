import {
  set_password_loading,
  set_password_success,
  set_password_fail,
} from './ActionTypes';
import {SetPasswordAPI} from '../../api/SetPasswordAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';
import RNRestart from 'react-native-restart';

export const SetPasswordAction = (
  password,
  password2,
  mobileNumber,
  navigation,
) => {
  return async dispatch => {
    try {
      dispatch({type: set_password_loading});
      const result = await SetPasswordAPI(password, password2, mobileNumber);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: set_password_fail, error: result.error});
      }
      if (result.status) {
        dispatch({type: set_password_success, payload: result});
        showMessage({message: 'تم إنشاء الحساب', backgroundColor: 'green'});
        navigation.replace('Login');
        // await AsyncStorage.setItem('user_token', result.access_token).then(
        //   value => {
        //     AsyncStorage.getItem('user_token').then(val => {
        //       if (val) {
        //         navigation.replace('BottomNavigator', {guest: false});
        //       }
        //     });
        //   },
        // );

        return;
      }
    } catch (error) {
      dispatch({type: set_password_fail, error: error.message});
    }
  };
};
