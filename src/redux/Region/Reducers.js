import {
    get_all_region_loading,
    get_all_region_success,
    get_all_region_fail,
    get_cities_by_region_id_loading,
    get_cities_by_region_id_success,
    get_cities_by_region_id_fail,
} from './ActionTypes';

const initialState = {
    regionsLoading: false, regions: [], regionsFail: '',
    citiesLoading: false, cities: [], citiesFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case get_all_region_loading:
            return { ...state, regionsLoading: true };

        case get_all_region_success:
            return { ...state, regions: action.payload.data, regionsLoading: false };

        case get_all_region_fail:
            return { ...state, regionsFail: action.error, regionsLoading: false };

        case get_cities_by_region_id_loading:
            return { ...state, citiesLoading: true };

        case get_cities_by_region_id_success:
            return { ...state, cities: action.payload.data, citiesLoading: false };

        case get_cities_by_region_id_fail:
            return { ...state, citiesFail: action.error, citiesLoading: false };

        default:
            return state
    }
};
