import { baseURL } from '../utils/BaseURL';
import axios from 'axios';


export async function LoginAPI(mobileNumber, password, device_key) {
    let Body = new FormData();
    Body.append('mobile', mobileNumber);
    Body.append('password', password);
    Body.append('device_key', device_key);
    try {
        const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            url: `${baseURL}api/client/login`,
            data: Body,
            timeout: 50000,
        })
        console.log("login api result: ", result.data);
        if (result.status !== 200) {
            return { error: result.data.message }
        }
        if (result.data) {
            return result.data
        }
    } catch (error) {
        console.log("login error: ", error.response.data);
        if(error.response.data.message.mobile){
            return { error: error.response.data.message.mobile[0]}
        }else if(error.response.data.message.password){
            return { error: error.response.data.message.password[0]}
        }
        else{
            return { error: error.response.data.message}
        }
    }
}

