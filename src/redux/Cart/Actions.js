import {
  add_to_cart_loading,
  add_to_cart_success,
  add_to_cart_fail,
  get_cart_data_loading,
  get_cart_data_success,
  get_cart_data_fail,
  remove_item_loading,
  remove_item_success,
  remove_item_fail,
  reset_deleted_item,
  update_item_quantity_loading,
  update_item_quantity_success,
  update_item_quantity_fail,
  get_receipt_data_loading,
  get_receipt_data_success,
  get_receipt_data_fail,
  create_order_loading,
  create_order_success,
  create_order_fail,
  reset_cart_data,
  add_tanks_to_cart_loading,
  add_tanks_to_cart_success,
  add_tanks_to_cart_fail,
  get_tanks_receipt_data_loading,
  get_tanks_receipt_data_success,
  get_tanks_receipt_data_fail,
  finish_order_loading,
  finish_order_success,
  finish_order_fail,
  order_request_finish_order_loading,
  order_request_finish_order_success,
  order_request_finish_order_fail,
  get_cart_total_fail,
  get_cart_total_success,
  get_cart_total_loading,
} from './ActionTypes';
import {
  addToCartAPI,
  getCartDataAPI,
  deleteItemFromCartAPI,
  updateCartItemQuantityAPI,
  cartReceiptAPI,
  createOrderAPI,
  addTanksToCartAPI,
  tankCartReceiptAPI,
  finishOrderAPI,
  createOrderRequestAPI,
  createOrderRequestPaymentAPI,
  createOrderRequestPaymentAPI2,
  getCartTotalAPI,
} from '../../api/CartAPI';
import FlashMessage, {showMessage} from 'react-native-flash-message';

export const getCartDataAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_cart_data_loading});
      const result = await getCartDataAPI();
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_cart_data_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_cart_data_success, payload: result});
        console.log('cart data: ', result.data);
        return;
      }
    } catch (error) {
      dispatch({type: get_cart_data_fail, error: error.message});
    }
  };
};

export const getCartDataAfterDeleteAction = () => {
  return async dispatch => {
    try {
      const result = await getCartDataAPI();
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_cart_data_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_cart_data_success, payload: result});
        console.log('cart data: ', result.data);
        return;
      }
    } catch (error) {
      dispatch({type: get_cart_data_fail, error: error.message});
    }
  };
};

export const addToCartAction = (product_id, qty) => {
  return async dispatch => {
    try {
      dispatch({type: add_to_cart_loading});
      const result = await addToCartAPI(product_id, qty);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: add_to_cart_fail, error: result.error});
      }
      if (result.status) {
        showMessage({
          message: 'تم إضافة المنتج للسلة بنجاح',
          backgroundColor: 'green',
        });
        dispatch(getCartDataAction());
        dispatch({type: add_to_cart_success, payload: result});
        return;
      }
    } catch (error) {
      dispatch({type: add_to_cart_fail, error: error.message});
    }
  };
};

export const deleteItemFromCartAction = productId => {
  return async dispatch => {
    try {
      dispatch({type: remove_item_loading});
      const result = await deleteItemFromCartAPI(productId);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: remove_item_fail, error: result.error});
      }
      if (result.status) {
        showMessage({
          message: 'تم ازالة المنتج من السلة بنجاح',
          backgroundColor: 'green',
        });
        dispatch({type: remove_item_success, payload: result});
        dispatch(getCartDataAfterDeleteAction());
        return;
      }
    } catch (error) {
      dispatch({type: remove_item_fail, error: error.message});
    }
  };
};

export const updateCartItemQuantityAction = (
  updateData,
  tanksOrder,
  navigation,
) => {
  return async dispatch => {
    try {
      dispatch({type: update_item_quantity_loading});
      const result = await updateCartItemQuantityAPI(updateData);
      console.log('cart ready to checkout data: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: update_item_quantity_fail, error: result.error});
      }
      if (result.status) {
        showMessage({message: result.message, backgroundColor: 'green'});
        dispatch({type: update_item_quantity_success, payload: result});
        tanksOrder
          ? navigation.navigate('TanksOrderSummery')
          : navigation.navigate('OrderSummery');
        return;
      }
    } catch (error) {
      dispatch({type: update_item_quantity_fail, error: error.message});
    }
  };
};

export const cartReceiptAction = id => {
  return async dispatch => {
    try {
      dispatch({type: get_receipt_data_loading});
      const result = await cartReceiptAPI(id);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_receipt_data_fail, error: result.error});
      }
      if (result.status) {
        dispatch({type: get_receipt_data_success, payload: result});
        return;
      }
      if (result.code !== 200) {
        dispatch({type: get_receipt_data_fail, error: result.message});
        showMessage({message: result.message, backgroundColor: '#FF6F61'});
        return;
      }
    } catch (error) {
      dispatch({type: get_receipt_data_fail, error: error.message});
    }
  };
};

export const ResetCartData = () => {
  return async dispatch => {
    dispatch({type: reset_cart_data});
  };
};

export const createOrderAction = (p_method_id, address_id, navigation) => {
  return async dispatch => {
    try {
      dispatch({type: create_order_loading});
      const result = await createOrderAPI(p_method_id, address_id);
      console.log(' payment result 2: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: create_order_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: create_order_success, payload: result});
        console.log('DATA,', result);
        dispatch(ResetCartData());
        navigation.navigate('PayWebView', {
          Link: result.data.paymentLink,
        });
      } else if (result.message) {
        showMessage({message: result.message, backgroundColor: 'green'});
        dispatch({type: create_order_success, payload: result});
        dispatch(ResetCartData());
        navigation.navigate('OrderCompleted');
        return;
      } else {
        showMessage({
          message: 'حصل خطأ ما ',
          backgroundColor: '#FF6F61',
        });
        return dispatch({type: create_order_fail, error: 'حصل خطأ ما'});
      }
    } catch (error) {
      dispatch({type: create_order_fail, error: error.message});
    }
  };
};
export const addTanksToCartAction = (product_id, qty, enable_installation) => {
  return async dispatch => {
    try {
      dispatch({type: add_tanks_to_cart_loading});
      const result = await addTanksToCartAPI(
        product_id,
        qty,
        enable_installation,
      );
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: add_tanks_to_cart_fail, error: result.error});
      }
      if (result.status) {
        showMessage({
          message: 'تم إضافة المنتج للسلة بنجاح',
          backgroundColor: 'green',
        });
        dispatch(getCartDataAction());
        dispatch({type: add_tanks_to_cart_success, payload: result});
        return;
      }
      // if (result.code !== 200) {
      //     dispatch({ type: add_to_cart_fail, error: result.message })
      //     showMessage({ message: result.message, backgroundColor: '#FF6F61' })
      //     return
      // }
    } catch (error) {
      dispatch({type: add_tanks_to_cart_fail, error: error.message});
    }
  };
};

export const tanksCartReceiptAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_tanks_receipt_data_loading});
      const result = await tankCartReceiptAPI();
      console.log('tanks receipt result: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({
          type: get_tanks_receipt_data_fail,
          error: result.error,
        });
      }
      if (result.code == 200) {
        //showMessage({ message: 'تم إنشاء طلبك بنجاح', backgroundColor: 'green' })
        dispatch({type: get_tanks_receipt_data_success, payload: result});
        return;
      }
      if (result.code !== 200) {
        dispatch({type: get_tanks_receipt_data_fail, error: result.message});
        showMessage({message: result.message, backgroundColor: '#FF6F61'});
        return;
      }
    } catch (error) {
      dispatch({type: get_tanks_receipt_data_fail, error: error.message});
    }
  };
};

export const finishOrderAction = (method_id, navigation) => {
  return async dispatch => {
    try {
      dispatch({type: finish_order_loading});
      const result = await finishOrderAPI(method_id);
      console.log(' payment result 2: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: finish_order_fail, error: result.error});
      }
      if (result.status) {
        dispatch({type: finish_order_success, payload: result});
        dispatch(ResetCartData());
        navigation.navigate('PayWebView', {
          Link: result.data.paymentLink,
        });
        return;
      }
    } catch (error) {
      dispatch({type: finish_order_fail, error: error.message});
    }
  };
};

export const createOrderRequestAction = (
  address_id,
  provider_service_id,
  delivery_date,
  delivery_time,
  navigation,
  unit,
) => {
  return async dispatch => {
    try {
      dispatch({type: create_order_loading});
      const result = await createOrderRequestAPI(
        address_id,
        provider_service_id,
        delivery_date,
        delivery_time,
      );
      console.log(' payment result 2: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: create_order_fail, error: result.error});
      }
      if (result.status) {
        // showMessage({ message: result.message, backgroundColor: 'green' })
        dispatch({type: create_order_success, payload: result});
        dispatch(ResetCartData());
        navigation.navigate('ServiceRequestSummery', {
          order_cache_id: result.data.order_cache_id,
          capacity: result.data.capacity.name,
          total: result.data.total,
          unit: unit,
        });
        return;
      }
      // else{
      //     dispatch({ type: create_order_success, payload: result })
      //     console.log('DATA,', result)
      //     navigation.replace("OnlineCartType",{
      //         Data: result
      //     })
      // }
    } catch (error) {
      dispatch({type: create_order_fail, error: error.message});
    }
  };
};
export const createOrderRequestPaymentAction = (
  p_method_id,
  requestID,
  navigation,
  total,
) => {
  return async dispatch => {
    try {
      dispatch({type: create_order_loading});
      const result = await createOrderRequestPaymentAPI(p_method_id, requestID);
      console.log(' payment result 2: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: create_order_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: create_order_success, payload: result});
        console.log('DATA,', result);
        dispatch(ResetCartData());
        navigation.navigate('PayWebView', {
          Link: result.data.paymentLink,
        });
        // showMessage({ message: result.message, backgroundColor: 'green' })
        // dispatch({ type: create_order_success, payload: result })
        // dispatch(ResetCartData())
        // navigation.navigate("OrderCompleted")
        // return
      } else {
        showMessage({message: result.message, backgroundColor: 'green'});
        dispatch({type: create_order_success, payload: result});
        dispatch(ResetCartData());
        navigation.navigate('OrderCompleted');
        return;
        // dispatch({ type: create_order_success, payload: result })
        // console.log('DATA,', result)
        // navigation.navigate("OrderRequestOnlineCartType",{
        //     Data: result,
        //     Total: total,
        //     type:'service'
        // })
      }
    } catch (error) {
      dispatch({type: create_order_fail, error: error.message});
    }
  };
};
export const orderRequestFinishOrderAction = (
  total,
  paymentMethodId,
  navigation,
) => {
  return async dispatch => {
    try {
      dispatch({type: order_request_finish_order_loading});
      const result = await createOrderRequestPaymentAPI2(
        total,
        paymentMethodId,
      );
      console.log(' orderRequestFinishOrderAction: ', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: finish_order_fail, error: result.error});
      }
      if (result.status) {
        dispatch({type: order_request_finish_order_success, payload: result});
        dispatch(ResetCartData());
        navigation.navigate('PayWebView', {
          Link: result.data.paymentLink,
        });
        return;
      }
    } catch (error) {
      dispatch({type: order_request_finish_order_fail, error: error.message});
    }
  };
};

export const getCartTotalAction = () => {
  return async dispatch => {
    try {
      dispatch({type: get_cart_total_loading});
      const result = await getCartTotalAPI();
      console.log('aaaaaaaaaa', result);
      if (result.error) {
        showMessage({message: result.error, backgroundColor: '#FF6F61'});
        return dispatch({type: get_cart_total_fail, error: result.error});
      }
      if (result.data) {
        dispatch({type: get_cart_total_success, payload: result.data});
        return;
      }
    } catch (error) {
      dispatch({type: get_cart_data_fail, error: error.message});
    }
  };
};

export const ResetDeletedItems = () => {
  return async dispatch => {
    dispatch({type: reset_deleted_item});
  };
};
