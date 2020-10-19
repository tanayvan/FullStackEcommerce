import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getCartData } from "../actions/cartActions";
import Base from "./Base";
import CartProduct from "./CartProduct";

export default function CartPage() {
  const [isOrdered, setIsOrdered] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getCartData());
  }, [dispatch]);
  const cartDetails = useSelector((state) => state.cartDetails);
  const { error, loading, cartData } = cartDetails;

  if (isOrdered) {
    return <Redirect to="/checkout" />;
  }
  if (cartData.length == 0) {
    return (
      <Base>
        <div class="container" style={{ textAlign: "center" }}>
          <div class="m-5">
            <div className="text-center ">Your Cart is Empty</div>
            <Link to="/" className="text-muted ml-1">
              Add Some
            </Link>
          </div>
        </div>
      </Base>
    );
  }
  return (
    <Base>
      <div class="container mt-5">
        <div class="display-4 text-center my-5">Your Cart</div>
        <div class="row">
          <div
            class="col-lg-7 col-12 "
            style={{ borderRight: "1px solid #eaeaec" }}
          >
            {cartData.map((item) => (
              <CartProduct data={item.product} id={item._id} />
            ))}
          </div>
          <div class="col-md-5 col-12 my-3 ">
            <div
              class=""
              style={{ border: "1px solid #eaeaec", width: "100%" }}
            >
              <div class="text-center">Price Details (1 Item)</div>
              <div style={{ borderBottom: "1px solid #eaeaec" }}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="m-2"
                >
                  <div class="">Total Mrp :</div>
                  <div>₹4999</div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="m-2"
                >
                  <div class="">GST</div>
                  <div>₹100</div>
                </div>
              </div>

              <div
                style={{ display: "flex", justifyContent: "space-between" }}
                className="m-2"
              >
                <div class="" style={{ fontWeight: "700" }}>
                  Total Amount
                </div>
                <div style={{ fontWeight: "700" }}>₹5099</div>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-dark btn-lg btn-block my-4"
              onClick={() => {
                setIsOrdered(true);
                console.log(cartData);
              }}
            >
              CheckOut
            </button>
          </div>
        </div>
      </div>
    </Base>
  );
}
