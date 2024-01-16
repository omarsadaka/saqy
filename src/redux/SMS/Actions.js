import {
    send_sms_loading,
    send_sms_success,
    send_sms_fail,
    generate_code_loading,
    generate_code_success,
    generate_code_fail,
    save_attempts_success,
    save_attempts_fail,
    code_attempts,
} from './ActionTypes';
import { generateCodeAPI, generateSMSAPI, saveAttemptsAPI } from '../../api/smsAPI';
import FlashMessage, { showMessage } from 'react-native-flash-message';


export const saveAttemptsAction = (response, token) => {
    return async dispatch => {
        try {
            const result = await saveAttemptsAPI(response, token)
            console.log('save attempts result: ', result);
            if (result.error) {
                return dispatch({ type: save_attempts_fail, error: result.error })
            }
            if (result.code == 200) {
                dispatch({ type: send_sms_success, payload: result })
                console.log('save attempts data: ', result.data);
                return
            }
            if (result.code !== 200) {
                dispatch({ type: save_attempts_success, error: result.message })
                return
            }
        } catch (error) {
            dispatch({ type: save_attempts_fail, error: error.message })
        }
    }
}

export const generateSMSAction = (number, code, token) => {
    return async dispatch => {
        try {
            dispatch({ type: send_sms_loading })
            const result = await generateSMSAPI(number, code)
            console.log('sms sent result: ', result);
            dispatch(saveAttemptsAction(result, token));
            if (result.error) {
                //showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: send_sms_fail, error: result.error })
            }
            if (result.code == 200) {
                dispatch({ type: send_sms_success, payload: result })
                console.log('sms sent data: ', result.data);
                return
            }
            if (result.code !== 200) {
                dispatch({ type: send_sms_fail, error: result.message })
                //showMessage({ message: result.message, backgroundColor: '#FF6F61' })
                return
            }
        } catch (error) {
            dispatch({ type: send_sms_fail, error: error.message })
        }
    }
}

export const generateCodeAction = (token, number) => {
    return async dispatch => {
        try {
            dispatch({ type: generate_code_loading })
            const result = await generateCodeAPI(token)
            console.log('code generate result: ', result);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: generate_code_fail, error: result.error })
            }
            if (result.code == 200) {
                dispatch({ type: generate_code_success, payload: result })
                dispatch({ type: code_attempts })
                dispatch(generateSMSAction(number, result.data.code, token))
                console.log('code generate data: ', result.data);
                return
            }
            if (result.code !== 200) {
                dispatch({ type: generate_code_fail, error: result.message })
                showMessage({ message: result.message, backgroundColor: '#FF6F61' })
                return
            }
        } catch (error) {
            dispatch({ type: generate_code_fail, error: error.message })
        }
    }
}