import React, { useEffect } from "react";
import Base from "./Base";
import Lottie from "react-lottie";
import animationData from "../icons/16271-payment-successful.json";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

export default function PaymentSuccessPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <Base>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <Lottie
              options={{
                autoplay: true,
                animationData: animationData,
              }}
              height={400}
              width={"100%"}
              isStopped={false}
            />
            <div class="text-center">
              <span className="mr-2">Thank You For Shopping</span>
              <Link style={{ color: "blue" }} to="/">
                Shop More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
