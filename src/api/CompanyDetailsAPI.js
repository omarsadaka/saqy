import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function getCompanyInfoAPI(companyId) {
  try {
    const result = await axios.get(`${baseURL}api/provider/${companyId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 20000,
    });
    console.log('category service result: ', result.data);
    if (result.status) {
      return result.data;
    }
  } catch (error) {
    console.log('error', error);
    return {error: error.response.data.message};
  }
}

export async function getCompanyProductsAPI(companyId) {
  try {
    const result = await axios.get(
      `${baseURL}api/products/by_provider/${companyId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Accept-Language': 'ar_EG',
        },
        timeout: 20000,
      },
    );
    console.log('category products result: ', result.data);
    if (result.data) {
      //console.log("company products data: ", result.data);
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function getCompanyRatesAPI(companyId) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(
      `${baseURL}api/provider/reviews/${companyId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // "Accept-Language": "ar_EG",
          Authorization: 'Bearer ' + token,
        },
        timeout: 20000,
      },
    );
    console.log('provider rates result: ', result.data);

    if (result.data) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function getTanksProductsAPI(companyId, guest) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const url = `${baseURL}api/products/by_provider/${companyId}`;
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': 'ar_EG',
        // "mobile-user-token": guest ? "" : token
      },
      timeout: 20000,
    });
    //console.log('category products result: ', result);
    // if (result.status !== 200) {
    //     return { error: result.data.message }
    // }
    if (result.data) {
      //console.log("company products data: ", result.data);
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}
