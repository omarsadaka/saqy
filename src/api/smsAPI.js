import { baseURL } from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export async function generateCodeAPI(token) {
    try {
        //const token = await AsyncStorage.getItem('user_token')
        console.log('generate code api token: ', token);
        const result = await axios.get(`${baseURL}api/verificationCode/create`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Accept-Language": "ar_EG",
                "mobile-user-token": token
            },
            timeout: 20000,
        })
        console.log('generate code api result: ', result);
        if (result.status !== 200) {
            return { error: result.data.message }
        }
        if (result.data) {
            return result.data
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}

export async function generateSMSAPI(number, code) {
    try {
        //const token = await AsyncStorage.getItem('user_token')
        const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Accept-Language": "ar_EG",
            },
            url: `https://www.msegat.com/gw/sendsms.php`,
            data: {
                "userName": "saqie",
                "numbers": `${number}`,
                "userSender": "OTP",
                "apiKey": "b528cea2db4bdec76235182194f10c00",
                "msg": `Pin Code is: ${code}`
            },
            timeout: 20000,
        })
        if (result.status !== 200) {
            return { error: result.data.message }
        }
        if (result.data) {
            return result.data
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}

export async function saveAttemptsAPI(response, token) {
    try {
        //const token = await AsyncStorage.getItem('user_token')
        const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Accept-Language": "ar_EG",
                "mobile-user-token": token
            },
            url: `${baseURL}api/attempt/create`,
            data: response,
            timeout: 20000,
        })
        if (result.status !== 200) {
            return { error: result.data.message }
        }
        if (result.data) {
            return result.data
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}