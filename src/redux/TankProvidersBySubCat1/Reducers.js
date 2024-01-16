import { getcompaniesTankBySubCat_loading1, getcompaniesTankBySubCat_success1, getcompaniesTankBySubCat_fail1, reset_companiesTank1 } from './ActionTypes';

const initialState = {
    companiesTankBySubCatLoading1: false, companiesTankBySubCat1: [], companiesTankBySubCatFail1: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case getcompaniesTankBySubCat_loading1:
            return { ...state, companiesTankBySubCatLoading1: true };

        case getcompaniesTankBySubCat_success1:
            return { ...state, companiesTankBySubCat1: action.payload, companiesTankBySubCatLoading1: false };

        case getcompaniesTankBySubCat_fail1:
            return { ...state, companiesTankBySubCatFail1: action.error, companiesTankBySubCatLoading1: false };

        case reset_companiesTank1:
            return { ...state, companiesTankBySubCat1: [] };

        default:
            return state
    }
};