import { getcompaniesTankBySubCat_loading3, getcompaniesTankBySubCat_success3, getcompaniesTankBySubCat_fail3, reset_companiesTank3 } from './ActionTypes';

const initialState = {
    companiesTankBySubCatLoading3: false, companiesTankBySubCat3: [], companiesTankBySubCatFail3: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case getcompaniesTankBySubCat_loading3:
            return { ...state, companiesTankBySubCatLoading3: true };

        case getcompaniesTankBySubCat_success3:
            return { ...state, companiesTankBySubCat3: action.payload, companiesTankBySubCatLoading3: false };

        case getcompaniesTankBySubCat_fail3:
            return { ...state, companiesTankBySubCatFail3: action.error, companiesTankBySubCatLoading3: false };

        case reset_companiesTank3:
            return { ...state, companiesTankBySubCat3: [] };

        default:
            return state
    }
};