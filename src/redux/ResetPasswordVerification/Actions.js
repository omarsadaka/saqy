import { reset_pass_verification_loading, reset_pass_verification_success, reset_pass_verification_fail } from './ActionTypes';
import { ResetPassVerificationAPI } from '../../api/ResetPassVerificationAPI';
import FlashMessage, { showMessage } from 'react-native-flash-message';


export const ResetPassVerificationAction = (verificationCode, mobileNumber, navigation) => {
    return async dispatch => {
        try {
            dispatch({ type: reset_pass_verification_loading })
            const result = await ResetPassVerificationAPI(verificationCode, mobileNumber)
            console.log('code verification result: ', result);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: reset_pass_verification_fail, error: result.error })
            }
            if (result.status) {
                dispatch({ type: reset_pass_verification_success, payload: result })
                showMessage({ message: result.message, backgroundColor: 'green' })
                navigation.navigate("ResetPassword", { number: result.data.mobile });
                console.log('verifyyyy code data: ', result.data);
                return
            }
        } catch (error) {
            dispatch({ type: reset_pass_verification_fail, error: error.message })
        }
    }
}