import { getcompaniesTankBySubCat_loading2, getcompaniesTankBySubCat_success2, getcompaniesTankBySubCat_fail2, reset_companiesTank2 } from './ActionTypes';
import { getAllCompanies, getFilterCompaniesByCity2 } from '../../api/TankProvidersBySubCat2';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';


export const getAllCompaniesAction = (sectionID) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesTankBySubCat_loading2 })
            const result = await getAllCompanies(sectionID);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesTankBySubCat_fail2, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesTankBySubCat_success2, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesTankBySubCat_fail2, error: error.message })
        }
    }
}

export const getAllFilterCompaniesByCityAction2 = (city_id, sub_section_id) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesTankBySubCat_loading2 })
            const result = await getFilterCompaniesByCity2(city_id, sub_section_id);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesTankBySubCat_fail1, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesTankBySubCat_success2, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesTankBySubCat_fail2, error: error.message })
        }
    }
}

export const resetCompaniesAction = () => {
    return async dispatch => {
        dispatch({ type: reset_companiesTank2 })
    }
}