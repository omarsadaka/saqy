import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function getAllOrdersAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/orders/user`,
      timeout: 20000,
    });
    console.log('order api result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('getAllOrdersAPI error: ', error);
    return {error: error.response.data.message};
  }
}

export async function getAllServicesAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/orders/service/user`,
      timeout: 20000,
    });
    console.log('service api result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('v error: ', error);
    return {error: error.response.data.message};
  }
}

export async function getOrderDetailsAPI(orderID) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/order/${orderID}`,
      timeout: 20000,
    });
    console.log('order details api result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('getOrderDetailsAPI error: ', error);
    return {error: error.response.data.message};
  }
}

export async function getServiceDetailsAPI(serviceID) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/order/service/${serviceID}`,
      timeout: 20000,
    });
    console.log('service details api result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('getServiceDetailsAPI error: ', error);
    return {error: error.response.data.message};
  }
}

export async function CancelOrderAPI(orderID, reason) {
  let Body = new FormData();
  Body.append('reason', reason);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: Body,
      url: `${baseURL}api/order/cancel/${orderID}`,
      timeout: 20000,
    });
    console.log('CancelOrderAPI: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('CancelOrderAPI error: ', error);
    if (error.response.data.reason) {
      return {error: error.response.data.reason[0]};
    } else return {error: error.response.data.message};
  }
}

export async function getAllStatusAPI() {
  try {
    const result = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      url: `${baseURL}api/status/all`,
      timeout: 20000,
    });
    console.log('getAllStatusAPI result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('getAllStatusAPI: ', error);
    return {error: error.response.data.message};
  }
}

export async function getFilterOrdersAPI(status_id) {
  try {
    let Body = new FormData();
    Body.append('status_id', status_id);
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/orders/user/filter`,
      data: Body,
      timeout: 20000,
    });
    console.log('getFilterOrdersAPI result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('getFilterOrdersAPI error: ', error);
    return {error: error.response.data.message};
  }
}

export async function getFilterServicesAPI(serviceID) {
  // try {
  //   let Body = new FormData();
  //   Body.append('status_id', status_id);
  //   const token = await AsyncStorage.getItem('user_token');
  //   const result = await axios({
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: '*/*',
  //       Authorization: 'Bearer ' + token,
  //     },
  let Body = new FormData();

  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: Body,
      url: `${baseURL}api/order/service/cancel/${serviceID}`,
      timeout: 20000,
    });
    console.log('CancelServiceAPI: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('CancelServiceAPI error: ', error);
    return {error: error.response.data.message};
  }
}

export async function ConfirmOrderAPI(orderID, status) {
  let Body = new FormData();
  Body.append('status', status);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: Body,
      url: `${baseURL}api/order/confirm/${orderID}`,
      timeout: 20000,
    });
    console.log('CancelOrderAPI: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('CancelOrderAPI error: ', error);
    return {error: error.response.data.message};
  }
}

export async function ConfirmServiceAPI(service, status) {
  let Body = new FormData();
  Body.append('status', status);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      data: Body,
      url: `${baseURL}api/order/service/confirm/${service}`,
      timeout: 20000,
    });
    console.log('ConfirmServiceAPI: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('ConfirmServiceAPI error: ', error);
    return {error: error.response.data.message};
  }
}
