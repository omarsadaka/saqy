import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function ChangePasswordAPI(password, password2, mobileNumber) {
  let Body = new FormData();
  Body.append('password', password);
  Body.append('password_confirmation', password2);
  Body.append('mobile', mobileNumber);
  try {
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${baseURL}api/client/change_password`,
      data: Body,
      timeout: 50000,
    });
    console.log('data: ', result);
    if (result.status) {
      console.log('password data: ', result.data);
      return result.data;
    }
  } catch (error) {
    console.log('login error: ', error.response.data);
    if (error.response.data.message.password) {
      return {error: error.response.data.message.password[0]};
    } else {
      return {error: error.response.data.message.mobile[0]};
    }
  }
}

export async function ChangePasswordAPI2(
  password_old,
  new_password,
  password_confirmation,
) {
  let Body = new FormData();
  Body.append('password_old', password_old);
  Body.append('new_password', new_password);
  Body.append('password_confirmation', password_confirmation);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/password/change/old`,
      data: Body,
      timeout: 50000,
    });
    console.log('ChangePasswordAPI2: ', result.data);
    if (result.status) {
      return result.data;
    }
  } catch (error) {
    console.log('ChangePasswordAPI2 error: ', error.response.data);
    if (error.response.data.message) {
      return {error: error.response.data.message[0]};
    } else if (error.response.data.message.new_password) {
      return {error: error.response.data.message.new_password[0]};
    } else {
      return {error: error.response.data.message.password_confirmation[0]};
    }
  }
}
