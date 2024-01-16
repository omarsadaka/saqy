import { change_password_loading, change_password_success, change_password_fail } from './ActionTypes';
import { ChangePasswordAPI, ChangePasswordAPI2 } from '../../api/ChangePasswordAPI';
import FlashMessage, { showMessage } from 'react-native-flash-message';


export const ChangePasswordAction = (password, password2, mobileNumber, navigation) => {
    return async dispatch => {
        try {
            dispatch({ type: change_password_loading })
            const result = await ChangePasswordAPI(password, password2, mobileNumber)
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: change_password_fail, error: result.error })
            }
            if (result.status) {
                dispatch({ type: change_password_success, payload: result })
                showMessage({ message: result.message, backgroundColor: 'green' })
                navigation.replace("Login");
                return
            }
        } catch (error) {
            dispatch({ type: change_password_fail, error: error.message })
        }
    }
}

export const ChangePasswordAction2 = (password_old, new_password, password_confirmation, navigation) => {
    return async dispatch => {
        try {
            dispatch({ type: change_password_loading })
            const result = await ChangePasswordAPI2(password_old, new_password, password_confirmation)
            console.log('aaaaaaaaa', result)
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: change_password_fail, error: result.error })
            }
            if (result.status) {
                dispatch({ type: change_password_success, payload: result })
                showMessage({ message: 'تم تغيير كلمة المرور بنجاح', backgroundColor: 'green' })
                navigation.navigate("Home");
                return
            }
        } catch (error) {
            dispatch({ type: change_password_fail, error: error.message })
        }
    }
}