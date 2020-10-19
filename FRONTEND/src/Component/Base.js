import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartData } from "../actions/cartActions";
import Navbar from "./Navbar";

export default function Base({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartData());
  }, [dispatch]);
  const cartDetails = useSelector((state) => state.cartDetails);
  const { cartData } = cartDetails;
  return (
    <div>
      <Navbar count={cartData.length} />
      {children}
      <div
        class="footer mt-5"
        style={{
          backgroundColor: "#f9f9f9",
          height: "15rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div class="container-fluid">
          <div class="text-center" style={{ fontSize: "1.3rem" }}>
            © 2020 TV Clothing | Mahavir Society, Navsari, 396445
          </div>
        </div>
      </div>
    </div>
  );
}
