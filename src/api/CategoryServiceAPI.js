import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function getCategoryService(categoryServiceId, guest, cityId) {
  //category service id could be any category service type
  // 1 cartoons, 2 desalination
  try {
    const token = await AsyncStorage.getItem('user_token');
    const url = guest
      ? `${baseURL}api/company/visitor/all/${categoryServiceId}/${
          cityId ? cityId : ''
        }`
      : `${baseURL}api/company/all/${categoryServiceId}/${
          cityId ? cityId : ''
        }`;
    const result = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'mobile-user-token': guest ? '' : token,
      },
      timeout: 20000,
    });
    //console.log('category service result: ', result);
    if (result.status !== 200) {
      return {error: result.data.message};
    }
    if (result.data) {
      //console.log("category service data: ", result.data);
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}
