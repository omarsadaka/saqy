import { 
    set_user_location_success, set_user_location_fail,
    send_fcmToken_success, send_fcmToken_fail,
    check_activity_success, check_activity_fail
} from './ActionTypes';

const initialState = {
    userLocation: {}, userLocationFail: '',
    sendFcmToken: {}, sendFcmTokenFail: '',
    checkActivity: {}, checkActivityFail: ''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case set_user_location_success:
            return { ...state, userLocation: action.payload };

        case set_user_location_fail:
            return { ...state, userLocationFail: action.error };
    
        case send_fcmToken_success:
            return { ...state, sendFcmToken: action.payload };
    
        case send_fcmToken_fail:
            return { ...state, sendFcmTokenFail: action.error }; 
            
        case check_activity_success:
            return { ...state, checkActivity: action.payload };
        
        case check_activity_fail:
            return { ...state, checkActivityFail: action.error }; 

        default:
            return state
    }
};
