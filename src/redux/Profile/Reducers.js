import { 
    get_profile_data_loading,
    get_profile_data_success,
    get_profile_data_fail,
    edit_profile_data_loading,
    edit_profile_data_success,
    edit_profile_data_fail,
     } from './ActionTypes';

const initialState = {
    profileDataLoading: false, editProfileDataLoading: false, profileData: {}, profileDataFail: '', editProfileDataFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case get_profile_data_loading:
            return { ...state, profileDataLoading: true };

        case get_profile_data_success:
            return { ...state, profileData: action.payload, profileDataLoading: false };

        case get_profile_data_fail:
            return { ...state, profileDataFail: action.error, profileDataLoading: false };

        case edit_profile_data_loading:
            return { ...state, editProfileDataLoading: true };
    
        case edit_profile_data_success:
            return { ...state, profileData: action.payload, editProfileDataLoading: false };
    
        case edit_profile_data_fail:
            return { ...state, editProfileDataFail: action.error, editProfileDataLoading: false };    

        default:
            return state
    }
};