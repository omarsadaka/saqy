import { getcompaniesBySubCat_loading2, getcompaniesBySubCat_success2, getcompaniesBySubCat_fail2, reset_companies2 } from './ActionTypes';
import { getAllCompanies, getFilterCompaniesByCity2 } from '../../api/WaterProvidersBySubCat2';


export const getAllCompaniesAction = (sectionID) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesBySubCat_loading2 })
            const result = await getAllCompanies(sectionID);
            console.log("get all companies result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesBySubCat_fail2, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesBySubCat_success2, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesBySubCat_fail2, error: error.message })
        }
    }
}

export const getAllFilterCompaniesByCityAction2 = (city_id, sub_section_id) => {
    return async dispatch => {
        try {
            dispatch({ type: getcompaniesBySubCat_loading2 })
            const result = await getFilterCompaniesByCity2(city_id, sub_section_id);
            console.log("get all companies result data filter: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: getcompaniesBySubCat_fail2, error: result.error })
            }
            if (result.data) {
                dispatch({ type: getcompaniesBySubCat_success2, payload: result })
                return
            }
        } catch (error) {
            dispatch({ type: getcompaniesBySubCat_fail2, error: error.message })
        }
    }
}

export const resetCompaniesAction = () => {
    return async dispatch => {
        dispatch({ type: reset_companies2 })
    }
}