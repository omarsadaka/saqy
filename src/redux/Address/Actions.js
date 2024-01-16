import {GET_ADDRESS, ADDRESS_LOADING, SET_DEFAULT_ADDRESS} from './ActionTypes';

import {showMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import {baseURL} from '../../utils/BaseURL';

export const getAllAddresses = () => {
  return async dispatch => {
    dispatch({type: ADDRESS_LOADING, payload: true});
    const token = await AsyncStorage.getItem('user_token');
    const res = await axios.get(`${baseURL}api/shipping_address`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      timeout: 20000,
    });
    console.log('addressAction=====', res.data.data);
    if (res.data) {
      const data = [];
      var arr = res.data.data;
      for (let index = 0; index < arr.length; index++) {
        const obj = {
          id: arr[index].id,
          name: arr[index].address,
        };
        data.push(obj);
      }
      data.push({id: 0, name: 'أضف عنوان أخر'});
      dispatch({type: GET_ADDRESS, payload: data});
      dispatch({type: ADDRESS_LOADING, payload: false});
    }
  };
};

export const getDefaultAddressAction = () => {
  return async dispatch => {
    try {
      dispatch({type: ADDRESS_LOADING, payload: true});
      const token = await AsyncStorage.getItem('user_token');
      const res = await axios.get(
        `${baseURL}api/shipping_address/show/default`,
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
      if (res.error) {
        showMessage({message: res.error, backgroundColor: '#FF6F61'});
        dispatch({type: ADDRESS_LOADING, payload: false});
      }
      if (res.data) {
        dispatch({type: SET_DEFAULT_ADDRESS, payload: res.data.data});
        console.log('address data: ', res.data);
        dispatch({type: ADDRESS_LOADING, payload: false});
        return;
      }
    } catch (error) {
      console.log({error});
      dispatch({type: ADDRESS_LOADING, payload: false});
    }
  };
};
