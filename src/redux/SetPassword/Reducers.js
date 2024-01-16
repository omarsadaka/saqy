import { set_password_loading, set_password_success, set_password_fail } from './ActionTypes';

const initialState = {
    SetPasswordLoading: false, PasswordConfirmed: {}, SetPasswordFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case set_password_loading:
            return { ...state, SetPasswordLoading: true };

        case set_password_success:
            return { ...state, PasswordConfirmed: action.payload, SetPasswordLoading: false };

        case set_password_fail:
            return { ...state, SetPasswordFail: action.error, SetPasswordLoading: false };

        default:
            return state
    }
};