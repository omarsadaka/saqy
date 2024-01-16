import {I18nManager} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {showMessage} from 'react-native-flash-message';
export class Network {
  constructor() {
    this.jwt = '';
  }
  static async fetch(url, init, addAuth) {
    const data = await AsyncStorage.getItem('user_token');
    if (data) {
      this.jwt = data;
    }
    const response = await fetch(url, {
      mode: 'cors',
      ...init,
      headers: Network.getHeaders(init.headers, addAuth),
    });
    let promise;
    if (
      response.status !== 200 &&
      response.status !== 201 &&
      response.status !== 401
    ) {
      promise = Network.handleErrorsBasedOnStatus(response);
    } else {
      promise = response.json();
    }
    return promise;
  }

  static getHeaders(originalHeaders, addAuth) {
    let headers = {
      'content-type': 'application/json',
      // 'content-type': 'multipart/form-data',
      accept: 'application/json',
    };

    if (addAuth) {
      headers['Authorization'] = `Bearer ${this.jwt}`;
    }

    headers = {
      ...headers,
      ...originalHeaders,
    };

    return headers;
  }

  static handleErrorsBasedOnStatus(response) {
    let promise;
    switch (response.status) {
      case 400:
        promise = response.json().then(data => {
          console.log('from Network', response.status, JSON.stringify(data));
          showError(data.error);
        });
        break;
      case 422:
        promise = response.json().then(data => {
          console.log('from Network', response.status, JSON.stringify(data));
          if (data.errors.email) {
            showMessage({
              message: data.errors.email[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.errors.mobile) {
            showMessage({
              message: data.errors.mobile[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.errors.password) {
            showMessage({
              message: data.errors.password[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.errors.name) {
            showMessage({
              message: data.errors.name[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.errors.subject) {
            showMessage({
              message: data.errors.subject[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.errors.message) {
            showMessage({
              message: data.errors.message[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.errors.type) {
            showMessage({
              message: data.errors.type[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.errors.address) {
            showMessage({
              message: data.errors.address[0],
              backgroundColor: '#FF6F61',
            });
          } else {
            showMessage({message: data.error, backgroundColor: '#FF6F61'});
          }
        });
        break;
      case 429:
        console.log('from Network', response.status, JSON.stringify(data));
        showMessage({message: data.error, backgroundColor: '#FF6F61'});
        break;
      case 401:
        promise = response.json().then(data => {
          console.log('from Network', response.status, JSON.stringify(data));
          if (data.message.email) {
            showMessage({
              message: data.message.email[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.message.mobile) {
            showMessage({
              message: data.message.mobile[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.message.password) {
            showMessage({
              message: data.message.password[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.message.name) {
            showMessage({
              message: data.message.name[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.message.subject) {
            showMessage({
              message: data.message.subject[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.message.message) {
            showMessage({
              message: data.message.message[0],
              backgroundColor: '#FF6F61',
            });
          } else if (data.message.type) {
            showMessage({
              message: data.message.type[0],
              backgroundColor: '#FF6F61',
            });
          } else {
            if (data.message != 'Item Deleted')
              showMessage({message: data.message, backgroundColor: '#FF6F61'});
          }
        });
        break;
      case 403:
        promise = response.json().then(data => {
          console.log('from Network', JSON.stringify(data));
          showMessage({message: data.message, backgroundColor: '#FF6F61'});
        });
        break;
      default:
        promise = response.json().then(data => {
          // return Promise.reject();
          console.log('from Network', JSON.stringify(data));
          showMessage({message: data.message, backgroundColor: '#FF6F61'});
        });
    }

    return promise.catch(error => {
      return Promise.reject(error);
    });
  }
}
