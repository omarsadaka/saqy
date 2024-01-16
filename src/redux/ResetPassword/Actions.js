import { reset_password_loading, reset_password_success, reset_password_fail } from './ActionTypes';
import { ResetPasswordAPI } from '../../api/ResetPasswordAPI';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';


export const ResetPasswordAction = (mobile, navigation) => {
    return async dispatch => {
        try {
            dispatch({ type: reset_password_loading })
            const result = await ResetPasswordAPI(mobile)
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: reset_password_fail, error: result.error })
            }
            if (result.status) {
                dispatch({ type: reset_password_success, payload: result })
                showMessage({ message: result.message, backgroundColor: 'green' });
                navigation.replace("VerificationResetPassword",{number: result.data.mobile});
                return
            }
        } catch (error) {
            dispatch({ type: reset_password_fail, error: error.message })
        }
    }
}