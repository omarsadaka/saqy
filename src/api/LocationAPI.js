import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function LocationAPI(coords) {
  console.log('coords', coords);
  try {
    //console.log("coordssssssss: ", coords.latitude);
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Accept-Language': 'ar_EG',
        Authorization: token,
      },
      url: `${baseURL}api/mobile-user/add-location`,
      data: {
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      timeout: 20000,
    });
    console.log('location api result: ', result);
    if (result.status !== 200) {
      return {error: result.data.message};
    }
    if (result.data) {
      //console.log("add to cart data: ", result.data);
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function SendFcmTokenAPI(fcmToken) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    let Body = new FormData();
    Body.append('device_key', fcmToken);
    Body.append('token', token);
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      url: `${baseURL}api/device_key/store`,
      data: Body,
      timeout: 50000,
    });
    console.log('SendFcmTokenAPI result: ', result.data);
    if (result.status) {
      return result.data;
    }
  } catch (error) {
    console.log('SendFcmTokenAPI error: ', error.response.data);
  }
}

export async function checkActiveUser() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/logout_unactive`,
      timeout: 20000,
    });
    console.log('checkActiveUser result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('checkActiveUser error: ', error);
    return {error: error.response.data.message};
  }
}
