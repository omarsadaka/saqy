import { register_loading, register_success, register_fail } from './ActionTypes';

const initialState = {
    RegisterLoading: false, RegisteredUser: {}, RegisterFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case register_loading:
            return { ...state, RegisterLoading: true };

        case register_success:
            return { ...state, RegisteredUser: action.payload, RegisterLoading: false };

        case register_fail:
            return { ...state, RegisterFail: action.error, RegisterLoading: false };

        default:
            return state
    }
};
