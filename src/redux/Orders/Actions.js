import {
  get_all_orders_loading,
  get_all_orders_success,
  get_all_orders_fail,
  get_all_service_loading,
  get_all_service_success,
  get_all_service_fail,
  get_order_details_loading,
  get_order_details_success,
  get_order_details_fail,
  get_all_status_loading,
  get_all_status_success,
  get_all_status_fail,
  cancel_order_loading,
  cancel_order_success,
  cancel_order_fail,
  confirm_order_loading,
  confirm_order_success,
  confirm_order_fail,
  reset_cancel_order_data,
} from './ActionTypes';
import {
  getAllOrdersAPI,
  getAllServicesAPI,
  getOrderDetailsAPI,
  getServiceDetailsAPI,
  CancelOrderAPI,
  getAllStatusAPI,
  getFilterOrdersAPI,
  getFilterServicesAPI,
  CancelServiceAPI,
  ConfirmOrderAPI,
  ConfirmServiceAPI,
} from '../../api/OrdersAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export const getAllOrdersAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_all_orders_loading});
      const result = await getAllOrdersAPI();
      console.log('order result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_orders_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_orders_success, payload: result});
        console.log('orders data: ', result.data);
        return;
      }
      if (result.data !== 200) {
        dispatch({type: get_all_orders_fail, error: result.message});
        showMessage({message: result.message, backgroundColor: '#FF6F61'});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const getAllServiceAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_all_service_loading});
      const result = await getAllServicesAPI();
      console.log('service result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_service_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_service_success, payload: result});
        console.log('service data: ', result.data);
        return;
      }
      if (result.data !== 200) {
        dispatch({type: get_all_service_fail, error: result.message});
        showMessage({message: result.message, backgroundColor: '#FF6F61'});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const getOrderDetailsAction = orderID => {
  return async dispatch => {
    try {
      dispatch({type: get_order_details_loading});
      const result = await getOrderDetailsAPI(orderID);
      console.log('order details result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_order_details_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_order_details_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const getServiceDetailsAction = serviceID => {
  return async dispatch => {
    try {
      dispatch({type: get_order_details_loading});
      const result = await getServiceDetailsAPI(serviceID);
      console.log('service details result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_order_details_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_order_details_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const CancelOrderAction = (orderID, reason) => {
  return async dispatch => {
    try {
      dispatch({type: cancel_order_loading});
      const result = await CancelOrderAPI(orderID, reason);
      console.log('getCancelOrderAction: ', result);
      if (result.error) {
        showMessage({
          message: result.error.reason[0],
          backgroundColor: '#FF6F61',
        });
        return dispatch({type: cancel_order_fail, error: result.error});
      }
      if (result.status) {
        showMessage({message: result.message, backgroundColor: 'green'});
        dispatch({type: cancel_order_success, payload: result});
        dispatch(ResetData());
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const getAllStatusAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_all_status_loading});
      const result = await getAllStatusAPI();
      console.log('status result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_status_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_status_success, payload: result.data});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_status_fail, error: error.message});
    }
  };
};

export const getFilterOrdersAction = status_id => {
  return async dispatch => {
    try {
      dispatch({type: get_all_orders_loading});
      const result = await getFilterOrdersAPI(status_id);
      console.log('filter order result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_orders_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_orders_success, payload: result});
        console.log('filter orders data: ', result.data);
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};
export const getFilterServiceAction = status_id => {
  return async dispatch => {
    try {
      dispatch({type: get_all_service_loading});
      const result = await getFilterServicesAPI(status_id);
      console.log('filter service result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_all_service_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_all_service_success, payload: result});
        console.log('filter service data: ', result.data);
        return;
      }
    } catch (error) {
      dispatch({type: get_all_service_fail, error: error.message});
    }
  };
};

export const CancelServiceAction = (serviceID, reason) => {
  return async dispatch => {
    try {
      dispatch({type: cancel_order_loading});
      const result = await CancelServiceAPI(serviceID, reason);
      console.log('getCancelServiceAction: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: cancel_order_fail, error: result.error});
      }
      if (result.status) {
        showMessage({message: result.message, backgroundColor: 'green'});
        dispatch({type: cancel_order_success, payload: result});
        dispatch(ResetData());
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const ConfirmOrderAction = (orderID, status) => {
  return async dispatch => {
    try {
      dispatch({type: confirm_order_loading});
      const result = await ConfirmOrderAPI(orderID, status);
      console.log('ConfirmOrderAction: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: confirm_order_fail, error: result.error});
      }
      if (result.status) {
        showMessage({message: result.message, backgroundColor: 'green'});
        dispatch({type: confirm_order_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const ConfirmServiceAction = (serviceID, status) => {
  return async dispatch => {
    try {
      dispatch({type: confirm_order_loading});
      const result = await ConfirmServiceAPI(serviceID, status);
      console.log('ConfirmServiceAction: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: confirm_order_fail, error: result.error});
      }
      if (result.status) {
        showMessage({message: result.message, backgroundColor: 'green'});
        dispatch({type: confirm_order_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: get_all_orders_fail, error: error.message});
    }
  };
};

export const ResetData = () => {
  return async dispatch => {
    dispatch({type: reset_cancel_order_data});
  };
};
