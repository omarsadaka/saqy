import {GET_ADDRESS, ADDRESS_LOADING, SET_DEFAULT_ADDRESS} from './ActionTypes';

const initialState = {
  addresses: [],
  defaultAddress: '',
  addressLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return {...state, addresses: action.payload};
    case SET_DEFAULT_ADDRESS:
      return {...state, defaultAddress: action.payload};
    case ADDRESS_LOADING:
      return {...state, addressLoading: action.payload};
    default:
      return state;
  }
};
