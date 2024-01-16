import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function VerificationAPI(verificationCode, mobileNumber) {
  let Body = new FormData();
  Body.append('otp', verificationCode);
  Body.append('mobile', mobileNumber);
  try {
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "Accept": "*/*",
      },
      url: `${baseURL}api/client/register2`,
      data: Body,
      timeout: 50000,
    });
    if (result) {
      console.log('validate data: ', result.data);
      return result.data;
    }
    return {error: 'Cannot verify your code'};
  } catch (error) {
    console.log('login error: ', error.response.data);
    if (error.response.data.message.mobile) {
      return {error: error.response.data.message.mobile[0]};
    } else {
      return {error: error.response.data.message};
    }
  }
}

export async function VerificationEditMobileAPI(otp, mobile) {
  let Body = new FormData();
  Body.append('otp', otp);
  Body.append('mobile', mobile);
  try {
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept": "*/*",
      },
      url: `${baseURL}api/client/confirm_otp/update_mobile`,
      data: Body,
      timeout: 50000,
    });
    if (result) {
      console.log('VerificationEditMobileAPI: ', result.data);
      return result.data;
    }
    return {error: 'Cannot verify your code'};
  } catch (error) {
    console.log('VerificationEditMobileAPI error: ', error.response.data);
    if (error.response.data.message.mobile) {
      return {error: error.response.data.message.mobile[0]};
    } else {
      return {error: error.response.data.message};
    }
  }
}

export async function ResendCodeAPI(mobile) {
  let Body = new FormData();
  Body.append('mobile', mobile);
  try {
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept": "*/*",
      },
      url: `${baseURL}api/code/resend`,
      data: Body,
      timeout: 50000,
    });
    console.log('ResendCodeAPI: ', result.data);
    if (result) {
      return result.data;
    }
    return {error: 'Cannot verify your code'};
  } catch (error) {
    console.log('ResendCodeAPI error: ', error.response.data);
    if (error.response.data.message.mobile) {
      return {error: error.response.data.message.mobile[0]};
    } else {
      return {error: error.response.data.message};
    }
  }
}
