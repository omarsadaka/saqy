import { baseURL } from '../utils/BaseURL';
import axios from 'axios';


export async function ResetPasswordAPI(mobile) {
    let Body = new FormData();
      Body.append('mobile', mobile);
    try {
        const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            url: `${baseURL}api/client/forget_password`,
            data: Body,
            timeout: 50000,
        })
        console.log("data: ", result);
        if (result.status) {
            console.log("ResetPasswordAPI: ", result.data);
            return result.data
        }
    } catch (error) {
        console.log("login error: ", error.response.data);
          if(error.response.data.message.mobile){
            return { error: error.response.data.message.mobile[0]}
          }else{
            return { error: error.response.data.message}
          }
    }
}