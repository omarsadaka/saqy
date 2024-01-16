import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function getNotificationAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(`${baseURL}api/notifications`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      timeout: 20000,
    });
    console.log('getNotificationAPI', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}
export async function geUnReadtNotificationAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(`${baseURL}api/notifications/unread`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      timeout: 20000,
    });
    console.log('geUnReadtNotificationAPI', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}
export async function updateNotificationToReadAPI(id) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(
      `${baseURL}api/notification/update_read/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
        timeout: 20000,
      },
    );
    console.log('updateNotificationToReadAPI', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function getHomeSectionsApi() {
  try {
    const result = await axios.get(`${baseURL}api/sections`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 20000,
    });
    console.log('getHomeSections', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function getHomeAdsApi() {
  try {
    const result = await axios.get(`${baseURL}api/ads`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 20000,
    });
    console.log('getHomeAdsApi', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function getHomeUserAddressesApi() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(`${baseURL}api/shipping_address`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      timeout: 20000,
    });
    console.log('getHomeUserAddressesApi', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}
