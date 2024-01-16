import {
     verification_loading, verification_success, verification_fail,
     resend_code_loading, resend_code_success, resend_code_fail
 } from './ActionTypes';

const initialState = {
    VerificationLoading: false, Verified: false, VerificationFail: '',
    ResendCodeLoading: false,ResendCode:{}, ResendCodeFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case verification_loading:
            return { ...state, VerificationLoading: true };

        case verification_success:
            return { ...state, Verified: action.payload, VerificationLoading: false };

        case verification_fail:
            return { ...state, VerificationFail: action.error, VerificationLoading: false };

        case resend_code_loading:
            return { ...state, ResendCodeLoading: true };

        case resend_code_success:
            return { ...state, ResendCode: action.payload, ResendCodeLoading: false };

        case resend_code_fail:
            return { ...state, ResendCodeFail: action.error, ResendCodeLoading: false };

        default:
            return state
    }
};