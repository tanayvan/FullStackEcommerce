import {
  CART_LIST_REQUEST,
  CART_LIST_FAIL,
  CART_LIST_SUCCESS,
  ADD_TO_CART_FAIL,
  ADD_TO_CART_REQUEST,
  ADD_TO_CART_SUCCESS,
} from "../constants/cartConstants";

export const CartDetailsReducers = (state = { cartData: [] }, action) => {
  switch (action.type) {
    case CART_LIST_REQUEST:
      return { loading: true, ...state };
    case CART_LIST_SUCCESS:
      return { loading: false, cartData: action.payload };
    case CART_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AddToCartReducers = (state = { success: false }, action) => {
  switch (action.type) {
    case ADD_TO_CART_REQUEST:
      return { loading: true, ...state };
    case ADD_TO_CART_SUCCESS:
      return { loading: false, success: true };
    case ADD_TO_CART_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
