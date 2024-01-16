import { 
    getcompaniesBySubCat_loading,
    getcompaniesBySubCat_success,
    getcompaniesBySubCat_fail,
    reset_companies
     } from './ActionTypes';

const initialState = {
    companiesBySubCatLoading: false, companiesBySubCat: [], companiesBySubCatFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case getcompaniesBySubCat_loading:
            return { ...state, companiesBySubCatLoading: true };

        case getcompaniesBySubCat_success:
            return { ...state, companiesBySubCat: action.payload, companiesBySubCatLoading: false };

        case getcompaniesBySubCat_fail:
            return { ...state, companiesBySubCatFail: action.error, companiesBySubCatLoading: false };

        case reset_companies:
            return { ...state, companiesBySubCat: [] };

        default:
            return state
    }
};