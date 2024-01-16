import { 
    getcompaniesBySubCat_loading2,
    getcompaniesBySubCat_success2,
    getcompaniesBySubCat_fail2,
    reset_companies2 
    } from './ActionTypes';

const initialState = {
    companiesBySubCatLoading2: false, companiesBySubCat2: [], companiesBySubCatFail2: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case getcompaniesBySubCat_loading2:
            return { ...state, companiesBySubCatLoading2: true };

        case getcompaniesBySubCat_success2:
            return { ...state, companiesBySubCat2: action.payload, companiesBySubCatLoading2: false };

        case getcompaniesBySubCat_fail2:
            return { ...state, companiesBySubCatFail2: action.error, companiesBySubCatLoading2: false };

        case reset_companies2:
            return { ...state, companiesBySubCatFail2: [] };

        default:
            return state
    }
};