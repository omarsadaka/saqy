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

const initialState = {
    companyInfoLoading: false, companyInfo: null, companyInfoFail: '',
    companyProductsLoading: false, companyProducts: [], companyProductsFail: '',
    companyRatesLoading: false, companyRates: {}, companyRatesFail: '',
    tanksProductsLoading: false, tanksProducts: [], tanksProductsFail: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case get_company_details_loading:
            return { ...state, companyInfoLoading: true };

        case get_company_details_success:
            return { ...state, companyInfo: action.payload, companyInfoLoading: false };

        case get_company_details_fail:
            return { ...state, companyInfoFail: action.error, companyInfoLoading: false };

        case get_company_products_loading:
            return { ...state, companyProductsLoading: true };

        case get_company_products_success:
            return { ...state, companyProducts: action.payload, companyProductsLoading: false };

        case get_company_products_fail:
            return { ...state, companyProductsFail: action.error, companyProductsLoading: false };

        case get_company_rates_loading:
            return { ...state, companyRatesLoading: true };

        case get_company_rates_success:
            return { ...state, companyRates: action.payload, companyRatesLoading: false };

        case get_company_rates_fail:
            return { ...state, companyRatesFail: action.error, companyRatesLoading: false };

        case get_tanks_products_loading:
            return { ...state, tanksProductsLoading: true };

        case get_tanks_products_success:
            return { ...state, tanksProducts: action.payload, tanksProductsLoading: false };

        case get_tanks_products_fail:
            return { ...state, tanksProductsFail: action.error, tanksProductsLoading: false };

        case reset_tanks_products_data:
            return { ...state, tanksProducts: [] }

        default:
            return state
    }
};