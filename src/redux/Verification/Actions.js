import {
  verification_loading,
  verification_success,
  verification_fail,
  resend_code_loading,
  resend_code_success,
  resend_code_fail,
} from './ActionTypes';
import {
  VerificationAPI,
  ResendCodeAPI,
  VerificationEditMobileAPI,
} from '../../api/VerificationAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';

export const VerificationAction = (
  verificationCode,
  mobileNumber,
  navigation,
  type,
) => {
  return async dispatch => {
    try {
      dispatch({type: verification_loading});
      const result = await VerificationAPI(verificationCode, mobileNumber);
      console.log('code verification result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: verification_fail, error: result.error});
      }
      if (result.status) {
        dispatch({type: verification_success, payload: result});
        showMessage({message: result.message, backgroundColor: 'green'});
        if (type == 'Edit') {
          AsyncStorage.removeItem('user_token');
          navigation.replace('Login');
        } else {
          navigation.replace('SetPassword', {number: result.data.mobile});
        }
        console.log('verifyyyy code data: ', result.data);
        return;
      }
    } catch (error) {
      dispatch({type: verification_fail, error: error.message});
    }
  };
};

export const VerificationEditMobileAction = (
  otp,
  mobile,
  navigation,
  //   type,
) => {
  return async dispatch => {
    try {
      dispatch({type: verification_loading});
      const result = await VerificationEditMobileAPI(otp, mobile);
      console.log('code verification result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: verification_fail, error: result.error});
      }
      if (result.status) {
        dispatch({type: verification_success, payload: result});
        showMessage({message: result.message, backgroundColor: 'green'});
        // if (type == 'Edit') {
        AsyncStorage.removeItem('user_token');
        navigation.replace('Login');
        // }
        // else {
        //   navigation.replace('SetPassword', {number: result.data.mobile});
        // }
        console.log('verifyyyy code data: ', result.data);
        return;
      }
    } catch (error) {
      dispatch({type: verification_fail, error: error.message});
    }
  };
};

export const ResendCodeAction = mobile => {
  return async dispatch => {
    try {
      dispatch({type: resend_code_loading});
      const result = await ResendCodeAPI(mobile);
      console.log('ResendCodeAction result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: resend_code_fail, error: result.error});
      }
      if (result.status) {
        dispatch({type: resend_code_success, payload: result});
        showMessage({message: result.message, backgroundColor: 'green'});
        return;
      }
    } catch (error) {
      dispatch({type: resend_code_fail, error: error.message});
    }
  };
};
