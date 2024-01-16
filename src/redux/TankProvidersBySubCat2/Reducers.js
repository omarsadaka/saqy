import { getcompaniesTankBySubCat_loading2, getcompaniesTankBySubCat_success2, getcompaniesTankBySubCat_fail2, reset_companiesTank2 } from './ActionTypes';

const initialState = {
    companiesTankBySubCatLoading2: false, companiesTankBySubCat2: [], companiesTankBySubCatFail2: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case getcompaniesTankBySubCat_loading2:
            return { ...state, companiesTankBySubCatLoading2: true };

        case getcompaniesTankBySubCat_success2:
            return { ...state, companiesTankBySubCat2: action.payload, companiesTankBySubCatLoading2: false };

        case getcompaniesTankBySubCat_fail2:
            return { ...state, companiesTankBySubCatFail2: action.error, companiesTankBySubCatLoading2: false };

        case reset_companiesTank2:
            return { ...state, companiesTankBySubCat2: [] };

        default:
            return state
    }
};