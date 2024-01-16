import {
     get_all_orders_loading, get_all_orders_success, get_all_orders_fail,
     get_all_service_loading, get_all_service_success, get_all_service_fail,
     get_order_details_loading, get_order_details_success, get_order_details_fail,
     get_all_status_loading, get_all_status_success, get_all_status_fail,
     cancel_order_loading, cancel_order_success, cancel_order_fail,
     confirm_order_loading, confirm_order_success, confirm_order_fail,
     reset_cancel_order_data
    } from './ActionTypes';

const initialState = {
    allOrdersLoading: false, allOrders: [], allOrdersFail: '',
    allServicesLoading: false, allServices: [], allServicesFail: '',
    orderDetailsLoading: false, orderDetails: [], orderDetailsFail: '',
    cancelOrderLoading: false, cancelOrder: null, cancelOrderFail:'',
    confirmOrderLoading: false, confirmOrder: null, confirmOrderFail:'',
    allStatusLoading: false, allStatus: null, allStatusFail:''
}

export default (state = initialState, action) => {
    switch (action.type) {

        case get_all_orders_loading:
            return { ...state, allOrdersLoading: true };

        case get_all_orders_success:
            return { ...state, allOrders: action.payload, allOrdersLoading: false };

        case get_all_orders_fail:
            return { ...state, allOrdersFail: action.error, allOrdersLoading: false };

        case get_all_service_loading:
            return { ...state, allServicesLoading: true };

        case get_all_service_success:
            return { ...state, allServices: action.payload, allServicesLoading: false };

        case get_all_service_fail:
            return { ...state, allServicesFail: action.error, allServicesLoading: false };

        case get_order_details_loading:
            return { ...state, orderDetailsLoading: true };
    
        case get_order_details_success:
            return { ...state, orderDetails: action.payload, orderDetailsLoading: false };
    
        case get_order_details_fail:
            return { ...state, orderDetailsFail: action.error, orderDetailsLoading: false };

        case get_all_status_loading:
            return { ...state, allStatusLoading: true };
    
        case get_all_status_success:
            return { ...state, allStatus: action.payload, allStatusLoading: false };
    
        case get_all_status_fail:
            return { ...state, allStatusFail: action.error, allStatusLoading: false };
            
        case cancel_order_loading:
            return { ...state, cancelOrderLoading: true };
    
        case cancel_order_success:
            return { ...state, cancelOrder: action.payload, cancelOrderLoading: false };
    
        case cancel_order_fail:
            return { ...state, cancelOrderFail: action.error, cancelOrderLoading: false };

        case confirm_order_loading:
            return { ...state, confirmOrderLoading: true };
    
        case confirm_order_success:
            return { ...state, confirmOrder: action.payload, confirmOrderLoading: false };
    
        case confirm_order_fail:
            return { ...state, confirmOrderFail: action.error, confirmOrderLoading: false };
        
        case reset_cancel_order_data:
                return { ...state, cancelOrder: null, cancelOrderLoading: false };

        default:
            return state
    }
};