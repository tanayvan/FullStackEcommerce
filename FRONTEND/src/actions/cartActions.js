import Axios from "axios";
import { API } from "../constants/API";
import {
  CART_LIST_FAIL,
  CART_LIST_REQUEST,
  CART_LIST_SUCCESS,
} from "../constants/cartConstants";

const reqCart = (token) => {
  return fetch(
    `${API}/api/getcart/${JSON.parse(localStorage.getItem("jwt"))._id}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Contetnt-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getCartData = () => async (dispatch) => {
  try {
    dispatch({ type: CART_LIST_REQUEST });

    reqCart(JSON.parse(localStorage.getItem("jwt")).token).then((data) => {
      if (data.error) {
        dispatch({
          type: CART_LIST_FAIL,
          payload: data.error,
        });
      }
      dispatch({
        type: CART_LIST_SUCCESS,
        payload: data,
      });
    });
  } catch (error) {
    dispatch({
      type: CART_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
