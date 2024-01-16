import { getcompaniesTankBySubCat_loading3, getcompaniesTankBySubCat_success3, getcompaniesTankBySubCat_fail3, reset_companiesTank3 } from './ActionTypes';
import { getAllCompanies, getFilterCompaniesByCity3 } from '../../api/TankProvidersBySubCat3';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-community/async-storage';


export const getAllCompaniesAction = (sectionID) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesTankBySubCat_loading3 })
            const result = await getAllCompanies(sectionID);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesTankBySubCat_fail3, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesTankBySubCat_success3, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesTankBySubCat_fail3, error: error.message })
        }
    }
}

export const getAllFilterCompaniesByCityAction3 = (city_id, sub_section_id) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesTankBySubCat_loading3 })
            const result = await getFilterCompaniesByCity3(city_id, sub_section_id);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesTankBySubCat_fail1, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesTankBySubCat_success3, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesTankBySubCat_fail3, error: error.message })
        }
    }
}

export const resetCompaniesAction = () => {
    return async dispatch => {
        dispatch({ type: reset_companiesTank3 })
    }
}