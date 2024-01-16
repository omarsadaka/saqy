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
  get_cart_total_loading,
  get_cart_total_success,
  get_cart_total_fail,
} from './ActionTypes';

const initialState = {
  addToCartLoading: false,
  addedToCart: null,
  addToCartFail: '',
  cartDataLoading: false,
  cartData: [],
  cartDataFail: '',
  cartCount: 0,
  removeItemLoading: false,
  removedItem: {},
  removeItemFail: '',
  updatedItemsLoading: false,
  updatedItems: {},
  updatedItemsFail: '',
  cartReceiptLoading: false,
  cartReceipt: {},
  cartReceiptFail: '',
  createOrderLoading: false,
  createdOrder: {},
  createOrderFail: '',
  addTanksToCartLoading: false,
  addedTanksToCart: null,
  addTanksToCartFail: '',
  tanksCartReceiptLoading: false,
  tanksCartReceipt: {},
  tanksCartReceiptFail: '',
  finishOrderLoading: false,
  finishdOrder: {},
  finishOrderFail: '',
  orderRequestFinishOrderLoading: false,
  orderRequestFinishdOrder: {},
  orderRequestFinishOrderFail: '',
  cartTotalLoading: false,
  cartTotal: {},
  cartTotalFail: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case add_to_cart_loading:
      return {...state, addToCartLoading: true};

    case add_to_cart_success:
      return {...state, addedToCart: action.payload, addToCartLoading: false};

    case add_to_cart_fail:
      return {...state, addToCartFail: action.error, addToCartLoading: false};

    case get_cart_data_loading:
      return {...state, cartDataLoading: true};

    case get_cart_data_success:
      //console.log("cart data reducer: ", action.payload.data.length)
      return {
        ...state,
        cartData: action.payload.data.length == 0 ? [] : action.payload.data,
        cartCount:
          action.payload.data.length == 0 ? 0 : action.payload.data.length,
        cartDataLoading: false,
      };

    case get_cart_data_fail:
      return {...state, cartDataFail: action.error, cartDataLoading: false};

    case remove_item_loading:
      return {...state, removeItemLoading: true};

    case remove_item_success:
      return {...state, removedItem: action.payload, removeItemLoading: false};

    case remove_item_fail:
      return {...state, removeItemFail: action.error, removeItemLoading: false};

    case reset_deleted_item:
      return {...state, removedItem: {}};

    case update_item_quantity_loading:
      return {...state, updatedItemsLoading: true};

    case update_item_quantity_success:
      return {
        ...state,
        updatedItems: action.payload,
        updatedItemsLoading: false,
      };

    case update_item_quantity_fail:
      return {
        ...state,
        updatedItemsFail: action.error,
        updatedItemsLoading: false,
      };

    case get_receipt_data_loading:
      return {...state, cartReceiptLoading: true};

    case get_receipt_data_success:
      return {...state, cartReceipt: action.payload, cartReceiptLoading: false};

    case get_receipt_data_fail:
      return {
        ...state,
        cartReceiptFail: action.error,
        cartReceiptLoading: false,
      };

    case create_order_loading:
      return {...state, createOrderLoading: true};

    case create_order_success:
      return {
        ...state,
        createdOrder: action.payload,
        createOrderLoading: false,
      };

    case create_order_fail:
      return {
        ...state,
        createOrderFail: action.error,
        createOrderLoading: false,
      };

    case reset_cart_data:
      return {...state, cartData: [], cartCount: 0};

    case add_tanks_to_cart_loading:
      return {...state, addTanksToCartLoading: true};

    case add_tanks_to_cart_success:
      return {
        ...state,
        addedTanksToCart: action.payload,
        addTanksToCartLoading: false,
      };

    case add_tanks_to_cart_fail:
      return {
        ...state,
        addTanksToCartFail: action.error,
        addTanksToCartLoading: false,
      };

    case get_tanks_receipt_data_loading:
      return {...state, tanksCartReceiptLoading: true};

    case get_tanks_receipt_data_success:
      return {
        ...state,
        tanksCartReceipt: action.payload,
        tanksCartReceiptLoading: false,
      };

    case get_tanks_receipt_data_fail:
      return {
        ...state,
        tanksCartReceiptFail: action.error,
        tanksCartReceiptLoading: false,
      };

    case finish_order_loading:
      return {...state, finishOrderLoading: true};

    case finish_order_success:
      return {
        ...state,
        finishdOrder: action.payload,
        finishOrderLoading: false,
      };

    case finish_order_fail:
      return {
        ...state,
        finishOrderFail: action.error,
        finishOrderLoading: false,
      };

    case order_request_finish_order_loading:
      return {...state, orderRequestFinishOrderLoading: true};

    case order_request_finish_order_success:
      return {
        ...state,
        orderRequestFinishdOrder: action.payload,
        orderRequestFinishOrderLoading: false,
      };

    case order_request_finish_order_fail:
      return {
        ...state,
        orderRequestFinishOrderFail: action.error,
        orderRequestFinishOrderLoading: false,
      };

    case get_cart_total_loading:
      return {...state, cartTotalLoading: true};

    case get_cart_total_success:
      return {...state, cartTotal: action.payload, cartTotalLoading: false};

    case get_cart_total_fail:
      return {...state, cartTotalFail: action.error, cartTotalLoading: false};

    default:
      return state;
  }
};
