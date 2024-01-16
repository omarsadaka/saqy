import {baseURL} from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export async function addToCartAPI(product_id, qty) {
  let Body = new FormData();
  Body.append('product_id', product_id);
  Body.append('qty', qty);
  try {
    const token = await AsyncStorage.getItem('user_token');

    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/cart/add`,
      data: Body,
      timeout: 20000,
    });
    console.log('addToCartAPI result: ', result.data);
    if (result.status) {
      return result.data;
    }
  } catch (error) {
    console.log('addToCartAPI error: ', error.response.data);
    return {error: error.response.data.message};
  }
}

export async function getCartDataAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(`${baseURL}api/cart`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      timeout: 20000,
    });

    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('getCartDataAPI error: ', error.response.data);
    return {error: error.response.data.message};
  }
}

export async function deleteItemFromCartAPI(productId) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/cart/delete/${productId}`,
      timeout: 20000,
    });
    console.log('remove cart item: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('deleteItemFromCartAPI error: ', error.response.data);
    return {error: error.response.data.message};
  }
}

export async function updateCartItemQuantityAPI(updateData) {
  let Body = new FormData();
  for (var i = 0; i < updateData.length; i++) {
    Body.append(`id[${i}]`, updateData[i].id);
    Body.append(`qty[${i}]`, updateData[i].qty);
  }
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/cart/update`,
      data: Body,
      timeout: 20000,
    });
    console.log('update quantity: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('updateCartItemQuantityAPI error: ', error.response.data);
    return {error: error.response.data.message};
  }
}

export async function cartReceiptAPI(id) {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(`${baseURL}api/cart/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      timeout: 20000,
    });
    console.log('receipt data: ', result.data);
    if (result.status) {
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function createOrderAPI(p_method_id, address_id) {
  let Body = new FormData();
  Body.append('p_method_id', p_method_id);
  Body.append('address_id', address_id);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/order/create`,
      data: Body,
      timeout: 20000,
    });
    console.log(' payment result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('createOrderAPI error: ', error.response.data);
    if (error.response.data.message.address_id) {
      return {error: error.response.data.message.address_id[0]};
    } else if (error.response.data.message.p_method_id) {
      return {error: error.response.data.message.p_method_id[0]};
    }
  }
}

export async function addTanksToCartAPI(product_id, qty, enable_installation) {
  let Body = new FormData();
  Body.append('product_id', product_id);
  Body.append('qty', qty);
  Body.append('enable_installation', enable_installation);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/cart/add`,
      data: Body,
      timeout: 20000,
    });
    console.log('add tank to cart data: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('addTanksToCartAPI error: ', error.response.data);
    return {error: error.response.data.message};
  }
}

export async function tankCartReceiptAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(`${baseURL}api/cart/display-tank-Receipt`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Accept-Language': 'ar_EG',
        'mobile-user-token': token,
      },
      timeout: 20000,
    });
    if (result.status !== 200) {
      return {error: result.data.message};
    }
    if (result.data) {
      //console.log("receipt data: ", result.data);
      return result.data;
    }
  } catch (error) {
    return {error: error.response.data.message};
  }
}

export async function finishOrderAPI(method_id) {
  let Body = new FormData();
  // p_method_id
  Body.append('paymentMethodId', method_id);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/payment`,
      data: Body,
      timeout: 20000,
    });
    console.log(' payment result: ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('createOrderAPI error: ', error.response.data);
    return {error: error.response.data.message};
  }
}

export async function createOrderRequestAPI(
  address_id,
  provider_service_id,
  delivery_date,
  delivery_time,
) {
  let Body = new FormData();
  Body.append('address_id', address_id);
  Body.append('provider_service_id', provider_service_id);
  Body.append('delivery_date', delivery_date);
  Body.append('delivery_time', delivery_time);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/order/service/create`,
      data: Body,
      timeout: 20000,
    });
    console.log(' createOrderRequestAPI ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('createOrderRequestAPI error: ', error.response.data);
    if (error.response.data.message.address_id) {
      return {error: error.response.data.message.address_id[0]};
    } else if (error.response.data.message.delivery_date) {
      return {error: error.response.data.message.delivery_date[0]};
    } else if (error.response.data.message.delivery_time) {
      return {error: error.response.data.message.delivery_time[0]};
    }
  }
}
export async function createOrderRequestPaymentAPI(p_method_id, requestID) {
  let Body = new FormData();
  Body.append('p_method_id', p_method_id);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/order/service/method/${requestID}`,
      data: Body,
      timeout: 20000,
    });
    console.log(' createOrderRequestPaymentAPI ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('createOrderRequestPaymentAPI error: ', error.response.data);
    if (error.response.data.message) {
      return {error: error.response.data.message};
    }
  }
}

export async function createOrderRequestPaymentAPI2(total, paymentMethodId) {
  let Body = new FormData();
  Body.append('total', total);
  Body.append('paymentMethodId', paymentMethodId);
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      url: `${baseURL}api/order/service/pay`,
      data: Body,
      timeout: 20000,
    });
    console.log(' createOrderRequestPaymentAPI ', result.data);
    if (result.data) {
      return result.data;
    }
  } catch (error) {
    console.log('createOrderRequestPaymentAPI error: ', error.response.data);
    if (error.response.data.message) {
      return {error: error.response.data.message};
    }
  }
}

export async function getCartTotalAPI() {
  try {
    const token = await AsyncStorage.getItem('user_token');
    const result = await axios.get(`${baseURL}api/total`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // "Accept-Language": "ar_EG",
        Authorization: 'Bearer ' + token,
      },
      timeout: 20000,
    });
    console.log('getCartTotalAPI result: ', result.data);
    if (result.status) {
      return result.data;
    }
  } catch (error) {
    console.log('getCartTotalAPI error: ', error.response.data);
    return {error: error.response.data.message};
  }
}
