import { 
    login_loading, login_success, login_fail, reset_user_data,
 } from './ActionTypes';

const initialState = {
    LoginLoading: false, LoggedUser: {}, LoginFail: '',
}

export default (state = initialState, action) => {
    switch (action.type) {

        case login_loading:
            return { ...state, LoginLoading: true };

        case login_success:
            return { ...state, LoggedUser: action.payload, LoginLoading: false };

        case login_fail:
            return { ...state, LoginFail: action.error, LoginLoading: false };


        case reset_user_data:
            return { ...state, LoggedUser: {}, LoginFail: '', LoginLoading: false };

        default:
            return state
    }
};