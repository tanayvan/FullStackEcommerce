import { TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Base from "./Base";

export default function CheckOut() {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  if (isOrderPlaced) {
    return <Redirect to="/paymentsuccessfull" />;
  }
  return (
    <Base>
      <div class="text-center display-4 mt-5">Shipping Address</div>
      <div class="container my-5">
        <div class="row">
          <div class="col-6">
            <TextField
              label=" First Name"
              required
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
          </div>
          <div class="col-6">
            <TextField
              label=" Last Name"
              required
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
          </div>
          <div class="col-12">
            <TextField
              label=" Address"
              required
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
          </div>

          <div class="col-6">
            <TextField
              label=" City"
              required
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
          </div>
          <div class="col-6">
            <TextField
              label=" State"
              required
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
          </div>
          <div class="col-6">
            <TextField
              label=" Pincode"
              required
              variant="outlined"
              margin="normal"
              size="small"
              fullWidth
            />
          </div>
          <div class="col-12 ">
            <button
              type="button"
              class="btn btn-dark btn-lg btn-block my-4"
              onClick={() => {
                setIsOrderPlaced(true);
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </Base>
  );
}
