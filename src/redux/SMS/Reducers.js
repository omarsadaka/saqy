import {
    send_sms_loading,
    send_sms_success,
    send_sms_fail,
    generate_code_loading,
    generate_code_success,
    generate_code_fail,
    save_attempts_success,
    save_attempts_fail,
    code_attempts
} from './ActionTypes';

const initialState = {
    codeGenerateLoading: false, codeGenerate: {}, codeGenerateFail: '',
    codeSentLoading: false, codeSent: {}, codeSentFail: '',
    savedAttempt: {}, saveAttemptFail: '', attempts: -1
}

export default (state = initialState, action) => {
    switch (action.type) {

        case generate_code_loading:
            return { ...state, codeGenerateLoading: true };

        case generate_code_success:
            return { ...state, codeGenerate: action.payload.data, codeGenerateLoading: false };

        case generate_code_fail:
            return { ...state, codeGenerateFail: action.error, codeGenerateLoading: false };

        case send_sms_loading:
            return { ...state, codeSentLoading: false };

        case send_sms_success:
            return { ...state, codeSent: action.payload, codeSentLoading: false };

        case send_sms_fail:
            return { ...state, codeSentFail: action.error, codeSentLoading: false };

        case save_attempts_success:
            return { ...state, saveAttemptFail: action.payload };

        case save_attempts_fail:
            return { ...state, saveAttemptFail: action.error };

        case code_attempts:
            return { ...state, attempts: state.attempts + 1 };

        default:
            return state
    }
};