import { getcompaniesBySubCat_loading, getcompaniesBySubCat_success, getcompaniesBySubCat_fail, reset_companies } from './ActionTypes';
import { getAllCompanies, getFilterCompaniesByCity1 } from '../../api/WaterProvidersBySubCat1';


export const getAllCompaniesAction = (subCatID) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesBySubCat_loading })
            const result = await getAllCompanies(subCatID);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesBySubCat_fail, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesBySubCat_success, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesBySubCat_fail, error: error.message })
        }
    }
}

export const getAllFilterCompaniesByCityAction1 = (city_id, section_id, sub_section_id) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesBySubCat_loading })
            const result = await getFilterCompaniesByCity1(city_id, section_id, sub_section_id);
            console.log("get all companies result filter data1: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesBySubCat_fail, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesBySubCat_success, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesBySubCat_fail, error: error.message })
        }
    }
}

export const resetCompaniesAction = () => {
    return async dispatch => {
        dispatch({ type: reset_companies })
    }
}