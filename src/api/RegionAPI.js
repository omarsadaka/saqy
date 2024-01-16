import { baseURL } from '../utils/BaseURL';
import axios from 'axios';


export async function getCitiesAPI() {
    try {
        const result = await axios.get(`${baseURL}api/cities`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            timeout: 20000,
        })
        if (result.data) {
            return result.data
        }
    } catch (error) {
        return { error: error.response.data.message }
    }
}