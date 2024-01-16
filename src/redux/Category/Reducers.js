import { 
    get_all_companies_loading, get_all_companies_success, get_all_companies_fail, reset_companies,
    get_all_categories_loading, get_all_categories_success, get_all_categories_fail,
    get_all_product_providers_loading,get_all_product_providers_success, get_all_product_providers_fail,
    get_all_product_tank_loading, get_all_product_tank_success, get_all_product_tank_fail,
    get_all_product_water_loading, get_all_product_water_success, get_all_product_water_fail

 } from './ActionTypes';

const initialState = {
    allCompaniesLoading: false, allCompanies: [], allCompaniesFail: '',
    allCategoriesLoading: false, allCategories: [], allCategoriesFail: '',
    allProductCompaniesLoading: false, allProductCompanies: [], allProductCompaniesFail: '',
    allOfferWaterProductLoading: false, allOfferWaterProduct: [], allOfferWaterProductFail: '',
    allOfferTankProductLoading: false, allOfferTankProduct: [], allOfferTankProductFail: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case get_all_companies_loading:
            return { ...state, allCompaniesLoading: true };

        case get_all_companies_success:
            return { ...state, allCompanies: action.payload, allCompaniesLoading: false };

        case get_all_companies_fail:
            return { ...state, allCompaniesFail: action.error, allCompaniesLoading: false };

        case get_all_product_providers_loading:
            return { ...state, allProductCompaniesLoading: true };

        case get_all_product_providers_success:
            return { ...state, allProductCompanies: action.payload, allProductCompaniesLoading: false };

        case get_all_product_providers_fail:
            return { ...state, allProductCompaniesFail: action.error, allProductCompaniesLoading: false };

        case get_all_categories_loading:
            return { ...state, allCategoriesLoading: true };

        case get_all_categories_success:
            return { ...state, allCategories: action.payload, allCategoriesLoading: false };

        case get_all_categories_fail:
            return { ...state, allCategoriesFail: action.error, allCategoriesLoading: false };

        case get_all_product_water_loading:
            return { ...state, allOfferWaterProductLoading: true };

        case get_all_product_water_success:
            return { ...state, allOfferWaterProduct: action.payload, allOfferWaterProductLoading: false };

        case get_all_product_water_fail:
            return { ...state, allOfferWaterProductFail: action.error, allOfferWaterProductLoading: false };

        case get_all_product_tank_loading:
            return { ...state, allOfferTankProductLoading: true };

        case get_all_product_tank_success:
            return { ...state, allOfferTankProduct: action.payload, allOfferTankProductLoading: false };

        case get_all_product_tank_fail:
            return { ...state, allOfferTankProductFail: action.error, allOfferTankProductLoading: false };

        case reset_companies:
            return { ...state, allCompanies: [] };

        default:
            return state
    }
};