import { baseURL } from '../utils/BaseURL';
import axios from 'axios';

export async function ResetPassVerificationAPI(verificationCode, mobileNumber) {
    let Body = new FormData();
      Body.append('otp', verificationCode);
      Body.append('mobile', mobileNumber);
    try {
        const result = await axios({
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                // "Accept": "*/*",
            },
            url: `${baseURL}api/client/confirm_otp`,
            data: Body,
            timeout: 50000,
        })
        if (result) {
            console.log("validate data: ", result.data);
            return result.data
        }
        return { error: 'Cannot verify your code' }
    } catch (error) {
        console.log("login error: ", error.response.data);
        if(error.response.data.message.mobile){
            return { error: error.response.data.message.mobile[0] }
        }else{
            return { error: error.response.data.message}
        }
    }
}