import { baseURL } from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export async function getAllCompanies(sectionID) {
    try {
        console.log('end point', `${baseURL}api/providers/${sectionID}`)
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios.get(`${baseURL}api/providers/${sectionID}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + token,
            },
            timeout: 20000,
        })
        console.log("getAllCompanies data: ", result.data);
        if (result.data) {
            return result.data
        }
    } catch (error) {
        // console.log('result error1: ', result.data);
        console.log('all companies data error: ', error.response);
        return { error: error.response.data.message }
    }
}

export async function getAllProductProviders(catID) {
    try {
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios.get(`${baseURL}api/products/by_category/${catID}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + token,
            },
            timeout: 20000,
        })
        console.log("getAllCompanies data: ", result.data);
        if (result.data) {
            return result.data
        }
    } catch (error) {
        // console.log('result error1: ', result.data);
        console.log('all companies data error: ', error.response);
        return { error: error.response.data.message }
    }
}

export async function getFilterCompaniesByCity(city_id, section_id, sub_section_id) {
    let Body = new FormData();
      Body.append('city_id', city_id);
      Body.append('by_location', 1);
      Body.append('section_id', section_id);
      Body.append('sub_section_id', sub_section_id);
    try {
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + token,
            },
            url: `${baseURL}api/providers/filter`,
            data: Body,
            timeout: 50000,
        })
        console.log("filter data: ", result.data);
        if (result.data) {
            return result.data
        }
    } catch (error) {
        console.log('all companies data error: ', error.response.data);
        return { error: error.response.data.message }
    }
}

export async function getAllCategories() {
    try {
        const token = await AsyncStorage.getItem('user_token')
        var url =  `${baseURL}api/categories`
        const result = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                // Authorization: 'Bearer ' + token,
            },
            timeout: 20000,
        })
        console.log("category data: ", result.data);
        if (result.data) {
            return result.data
        }
    } catch (error) {
        console.log('all companies data error: ', error.response.data);
        return { error: error.response.data.message }
    }
}

export async function getAllWaterOfferProduct(catID) {
    try {
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios.get(`${baseURL}api/offers/sub_section/${catID}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + token,
            },
            timeout: 20000,
        })
        console.log("getAllWaterOfferProduct data: ", result.data);
        if (result.data) {
            return result.data
        }
    } catch (error) {
        console.log('getAllWaterOfferProduct error: ', error.response);
        return { error: error.response.data.message }
    }
}

export async function getAllTanksOfferProduct(catID) {
    try {
        const token = await AsyncStorage.getItem('user_token')
        const result = await axios.get(`${baseURL}api/offers/sub_section/${catID}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + token,
            },
            timeout: 20000,
        })
        console.log("getAllTanksOfferProduct data: ", result.data);
        if (result.data) {
            return result.data
        }
    } catch (error) {
        console.log('getAllTanksOfferProduct error: ', error.response);
        return { error: error.response.data.message }
    }
}