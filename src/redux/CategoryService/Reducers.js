import {
    get_cartons_data_loading,
    get_cartons_data_success,
    get_cartons_data_fail,
    get_desalination_data_loading,
    get_desalination_data_success,
    get_desalination_data_fail
} from './ActionTypes';

const initialState = {
    cartonsDataLoading: false, cartonsData: [], cartonsDataFail: '',
    desalinationDataLoading: false, desalinationData: [], desalinationDataFail: '',
}


export default (state = initialState, action) => {
    switch (action.type) {

        case get_cartons_data_loading:
            return { ...state, cartonsDataLoading: true };

        case get_cartons_data_success:
            return { ...state, cartonsData: action.payload, cartonsDataLoading: false };

        case get_cartons_data_fail:
            return { ...state, cartonsDataFail: action.error, cartonsDataLoading: false };

        case get_desalination_data_loading:
            return { ...state, desalinationDataLoading: true };

        case get_desalination_data_success:
            return { ...state, desalinationData: action.payload, desalinationDataLoading: false };

        case get_desalination_data_fail:
            return { ...state, desalinationDataFail: action.error, desalinationDataLoading: false };

        default:
            return state
    }
};