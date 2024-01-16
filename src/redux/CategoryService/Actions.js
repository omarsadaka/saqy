import {
    get_cartons_data_loading,
    get_cartons_data_success,
    get_cartons_data_fail,
    get_desalination_data_loading,
    get_desalination_data_success,
    get_desalination_data_fail
} from './ActionTypes';
import { getCategoryService } from '../../api/CategoryServiceAPI';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';


export const getAllCompaniesAction = (categoryServiceId, guest, cityId) => {
    return async dispatch => {
        try {
            categoryServiceId == 1 ? dispatch({ type: get_cartons_data_loading }) : dispatch({ type: get_desalination_data_loading })
            const result = await getCategoryService(categoryServiceId, guest, cityId);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return categoryServiceId == 1 ? dispatch({ type: get_cartons_data_fail, error: result.error }) : dispatch({ type: get_desalination_data_fail, error: result.error })
            }
            if (result.code == 200) {
                categoryServiceId == 1 ? dispatch({ type: get_cartons_data_success, payload: result }) : dispatch({ type: get_desalination_data_success, payload: result })
                return
            }
            if (result.code !== 200) {
                categoryServiceId == 1 ? dispatch({ type: get_cartons_data_fail, error: result.error }) : dispatch({ type: get_desalination_data_fail, error: result.error })
                showMessage({ message: result.message, backgroundColor: '#FF6F61' })
                return
            }
        } catch (error) {
            categoryServiceId == 1 ? dispatch({ type: get_cartons_data_fail, error: result.error }) : dispatch({ type: get_desalination_data_fail, error: result.error })
        }
    }
}