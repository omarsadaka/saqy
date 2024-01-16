import { baseURL } from '../utils/BaseURL';
import axios from 'axios';



export async function RegisterByPhoneNumberAPI(mobileNumber) {
    let Body = new FormData();
      Body.append('mobile', mobileNumber);
    try {
           const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: Body,
            url: `${baseURL}api/client/register1`,
            timeout: 50000,
        })
        console.log("register result: ", result.data);
        if (result) {
            return result.data
        }
    }catch(error) {
        console.log("login error: ", error.response.data);
        if(error.response.data.message.mobile){
            return { error: error.response.data.message.mobile[0] }
        }else{
            return { error:  error.response.data.message}
        }
        
    }
}