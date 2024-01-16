import {baseURL} from '../utils/BaseURL';
import axios from 'axios';

export async function SetPasswordAPI(password, password2, mobileNumber) {
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
      url: `${baseURL}api/client/register3`,
      data: Body,
      timeout: 50000,
    });
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
