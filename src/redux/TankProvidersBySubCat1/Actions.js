import { getcompaniesTankBySubCat_loading1, getcompaniesTankBySubCat_success1, getcompaniesTankBySubCat_fail1, reset_companiesTank1 } from './ActionTypes';
import { getAllCompanies, getFilterCompaniesByCity1 } from '../../api/TankProvidersBySubCat1';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';


export const getAllCompaniesAction = (sectionID) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesTankBySubCat_loading1 })
            const result = await getAllCompanies(sectionID);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesTankBySubCat_fail1, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesTankBySubCat_success1, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesTankBySubCat_fail1, error: error.message })
        }
    }
}

export const getAllFilterCompaniesByCityAction1 = (city_id, section_id, sub_section_id) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesTankBySubCat_loading1 })
            const result = await getFilterCompaniesByCity1(city_id, section_id, sub_section_id);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesTankBySubCat_fail1, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesTankBySubCat_success1, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesTankBySubCat_fail1, error: error.message })
        }
    }
}

export const resetCompaniesAction = () => {
    return async dispatch => {
        dispatch({ type: reset_companiesTank1 })
    }
}