import { baseURL } from '../utils/BaseURL';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';


export async function getAllCompanies(subCatID) {
    //category id could be any service type
    // 1 water, 2 tanks, 3 sanitation, 4 maintenance
    try {
        const token = await AsyncStorage.getItem('user_token')
        var url =  `${baseURL}api/providers/by_sub_section/${subCatID}`
        console.log('companies urlllll: ', url)
        const result = await axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: 'Bearer ' + token,
            },
            timeout: 20000,
        })
        console.log("getAllCompanies data1: ", result.data);
        if (result.data) {
                return result.data
        }
    } catch (error) {
        console.log('all companies data error1: ', error.response);
        return { error: error.response.data.message }
    }
}

export async function getFilterCompaniesByCity1(city_id, section_id, sub_section_id) {
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