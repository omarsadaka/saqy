import { change_password_loading, change_password_success, change_password_fail } from './ActionTypes';

const initialState = {
    ChangePasswordLoading: false, PasswordConfirmed: {}, ChangePasswordFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case change_password_loading:
            return { ...state, ChangePasswordLoading: true };

        case change_password_success:
            return { ...state, PasswordConfirmed: action.payload, ChangePasswordLoading: false };

        case change_password_fail:
            return { ...state, ChangePasswordFail: action.error, ChangePasswordLoading: false };

        default:
            return state
    }
};