import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function getProfileDataAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    console.log('tokennnnn', token);
    const result = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/client/info`,
      timeout: 20000,
    });
    console.log('profile data api result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('getProfileDataAPI error: ', error);
    return {error: error.response.data.message};
  }
}

export async function editProfileDataAPI(
  name,
  email,
  mobile,
  address,
  lat,
  lng,
  photo,
) {
  let Body = new FormData();
  Body.append('name', name);
  Body.append('email', email);
  Body.append('address', address);
  Body.append('lat', lat);
  Body.append('lng', lng);
  Body.append('mobile', mobile);
  Body.append('photo', {
    uri: photo,
    name: 'image.jpg',
    type: 'image/jpeg',
  });
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: Body,
      url: `${baseURL}api/client/profile`,
      timeout: 50000,
    });
    console.log('edit data result: ', result.data);
    if (result.data) {
      console.log('profile data: ', result.data);
      return result.data;
    }
  } catch (error) {
    console.log('edit data error: ', error.response.data);
    if (error.response.data.message.name) {
      return {error: error.response.data.message.name[0]};
    } else if (error.response.data.message.email) {
      return {error: error.response.data.message.email[0]};
    } else if (error.response.data.message.address) {
      return {error: error.response.data.message.address[0]};
    } else if (error.response.data.message.lat) {
      return {error: error.response.data.message.lat[0]};
    } else if (error.response.data.message.lng) {
      return {error: error.response.data.message.lng[0]};
    } else if (error.response.data.message.mobile) {
      return {error: error.response.data.message.mobile[0]};
    }
  }
}
