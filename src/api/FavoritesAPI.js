import { baseURL } from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export async function addItemToFavoritesAPI(provider_id) {
    let Body = new FormData();
    Body.append('provider_id', provider_id);
    try {
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + token
            },
            url: `${baseURL}api/fav/add`,
            data: Body,
            timeout: 20000,
        })
        console.log('add to favroites result: ', result.data);
        if (result.status) {
            return result.data
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}

export async function removeItemToFavoritesAPI(id) {
    try {
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios({
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                Authorization: 'Bearer ' + token
            },
            url: `${baseURL}api/fav/${id}`,
            timeout: 20000,
        })
        console.log('remove to favroites result: ', result.data);
        if (result.status) {
            return result.data
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}

export async function getAllFavroitesAPI() {
    try {
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios.get(`${baseURL}api/fav`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // "Accept-Language": "ar_EG",
                Authorization: 'Bearer ' + token
            },
            timeout: 20000,
        })
        console.log('favroites result: ', result.data);
        if (result.data) {
            return result.data
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}