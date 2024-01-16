import axios from 'axios';
import {baseURL} from '../utils/BaseURL';

export const getFaqQuistionApi = async () => {
  try {
    const res = await axios.get(`${baseURL}api/faq`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 20000,
    });
    console.log({res});
    if (res.data) {
      return res.data.data;
    }
  } catch (error) {
    console.log('getFaqQuistionApi error: ', error.response.data);
    return {error: error.response.data.message};
  }
};
