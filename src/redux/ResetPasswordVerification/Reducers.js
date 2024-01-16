import { reset_pass_verification_loading, reset_pass_verification_success, reset_pass_verification_fail } from './ActionTypes';

const initialState = {
    VerificationLoading: false, Verified: false, VerificationFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case reset_pass_verification_loading:
            return { ...state, VerificationLoading: true };

        case reset_pass_verification_success:
            return { ...state, Verified: action.payload, VerificationLoading: false };

        case reset_pass_verification_fail:
            return { ...state, VerificationFail: action.error, VerificationLoading: false };

        default:
            return state
    }
};