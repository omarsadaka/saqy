import { 
    get_company_details_loading, 
    get_company_details_success, 
    get_company_details_fail,
    get_company_products_loading,
    get_company_products_success,
    get_company_products_fail,
    get_company_rates_loading,
    get_company_rates_success,
    get_company_rates_fail,
    get_tanks_products_loading,
    get_tanks_products_success,
    get_tanks_products_fail, 
    reset_tanks_products_data,
} from './ActionTypes';
import { getCompanyInfoAPI, getCompanyProductsAPI, getCompanyRatesAPI, getTanksProductsAPI } from '../../api/CompanyDetailsAPI';
import FlashMessage, { showMessage } from 'react-native-flash-message';


export const getCompanyInfoAction = (companyId) => {
    return async dispatch => {
        try {
            dispatch({ type: get_company_details_loading })
            const result = await getCompanyInfoAPI(companyId);
            console.log("get all product result data: ", result.data);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: get_company_details_fail, error: result.error })
            }
            if (result.status) {
                dispatch({ type: get_company_details_success, payload: result.data })
                return
            }
        } catch (error) {
            dispatch({ type: get_company_details_fail, error: error.message })
        }
    }
}

export const getCompanyProductsAction = (companyId) => {
    return async dispatch => {
        try {
            dispatch({ type: get_company_products_loading })
            const result = await getCompanyProductsAPI(companyId);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: get_company_products_fail, error: result.error })
            }
            if (result.data) {
                //console.log('datttaaaaa: ', result.data)
                dispatch({ type: get_company_products_success, payload: result.data })
                return
            }
            // if (result.code !== 200) {
            //     dispatch({ type: get_company_products_fail, error: result.message })
            //     showMessage({ message: result.message, backgroundColor: '#FF6F61' })
            //     return
            // }
        } catch (error) {
            dispatch({ type: get_company_products_fail, error: error.message })
        }
    }
}

export const getCompanyRatesAction = (companyId) => {
    return async dispatch => {
        try {
            dispatch({ type: get_company_rates_loading })
            const result = await getCompanyRatesAPI(companyId);
            if (result.error) {
                // showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: get_company_rates_fail, error: result.error })
            }
            if (result.data) {
                dispatch({ type: get_company_rates_success, payload: result })
                return
            }
           
        } catch (error) {
            dispatch({ type: get_company_rates_fail, error: error.message })
        }
    }
}

export const getTanksProductsAction = (companyId, guest) => {
    return async dispatch => {
        try {
            dispatch({ type: get_tanks_products_loading })
            const result = await getTanksProductsAPI(companyId, guest);
            if (result.error) {
                showMessage({ message: result.error, backgroundColor: '#FF6F61' })
                return dispatch({ type: get_tanks_products_fail, error: result.error })
            }
            if (result.data) {
                //console.log('datttaaaaa: ', result.data)
                dispatch({ type: get_tanks_products_success, payload: result.data })
                return
            }
            // if (result.code !== 200) {
            //     dispatch({ type: get_tanks_products_fail, error: result.message })
            //     showMessage({ message: result.message, backgroundColor: '#FF6F61' })
            //     return
            // }
        } catch (error) {
            dispatch({ type: get_tanks_products_fail, error: error.message })
        }
    }
}

export const ResetTanksProductsData = () => {
    return async dispatch => {
        dispatch({ type: reset_tanks_products_data })
    }
}