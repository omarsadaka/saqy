import { reset_password_loading, reset_password_success, reset_password_fail } from './ActionTypes';

const initialState = {
    ResetPasswordLoading: false, PasswordConfirmed: {}, ResetPasswordFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case reset_password_loading:
            return { ...state, ResetPasswordLoading: true };

        case reset_password_success:
            return { ...state, PasswordConfirmed: action.payload, ResetPasswordLoading: false };

        case reset_password_fail:
            return { ...state, ResetPasswordFail: action.error, ResetPasswordLoading: false };

        default:
            return state
    }
};