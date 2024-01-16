import { register_loading, register_success, register_fail } from './ActionTypes';
import { RegisterByPhoneNumberAPI } from '../../api/RegisterAPI';
import FlashMessage, { showMessage } from 'react-native-flash-message';


export const RegisterByPhoneNumberAction = (mobileNumber, navigation) => {
    return async dispatch => {
        try {
            dispatch({ type: register_loading })
            const result = await RegisterByPhoneNumberAPI(mobileNumber)
            console.log('resut register 1',result)
            if (result.status) {
                dispatch({ type: register_success, payload: result })
                showMessage({ message: result.message , backgroundColor: 'green' });
                navigation.navigate("Verification", {number: result.data.mobile, type: 'Rigister' });
                return
            }
            if (result.error) {
                dispatch({ type: register_fail, error: result.error})
                showMessage({ message: result.error, backgroundColor: 'red' });
                return
            }
        } catch (error) {
            dispatch({ type: register_fail, error: error.message })
            showMessage({ message: error, backgroundColor: 'red' });
        }
    }
}