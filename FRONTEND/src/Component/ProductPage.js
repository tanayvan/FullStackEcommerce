import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  Snackbar,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Base from "./Base";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import Lottie from "react-lottie";
import animationData from "../icons/25973-loading-dots.json";
import animationData1 from "../icons/lf30_editor_fnbpw0yn.json";

import { listProductDetails } from "../actions/productActions";
import { getCartData, addtocart } from "../actions/cartActions";
// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import { Link, Redirect } from "react-router-dom";
import Axios from "axios";
import { API } from "../constants/API";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export default function ProductPage({ match }) {
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const productDetails = useSelector((state) => state.productDetails);
  const cartDetails = useSelector((state) => state.cartDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listProductDetails(match.params.id));
    dispatch(getCartData());
  }, [dispatch, match]);
  const { loading, product } = productDetails;
  const { cartData } = cartDetails;

  const addToCart = (userId, token, pid, size) => {
    return fetch(`${API}/api/addtocart/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cart: {
          product: pid,
          size: size,
        },
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  const handleClick = async () => {
    const user = JSON.parse(localStorage.getItem("jwt"));
    if (!user) {
      setRedirect(true);
    }
    if (size == "") {
      setError("Please select Size");
    }
    if (user) {
      setIsAdded(true);

      addToCart(user._id, user.token, product._id, size).then((data) => {
        console.log(data);
        if (!data.error) {
          setIsSuccess(true);
          setIsAdded(false);
          dispatch(getCartData());
        }
      });
    }
  };
  if (redirect) {
    return <Redirect to="/login" />;
  }
  if (loading) {
    return (
      <Base>
        <div class="container">
          <Lottie
            options={{
              autoplay: true,
              animationData: animationData,
            }}
            height={300}
            isStopped={!loading}
          />
        </div>
      </Base>
    );
  }
  return (
    <div>
      <Base>
        <div class="container mt-3">
          <div class="row">
            <motion.div
              class="col-md-6 col-12 mt-5 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.2,
              }}
            >
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log("slide change")}
                loop="true"
              >
                {product.productImages.map((url) => {
                  return (
                    <SwiperSlide>
                      <motion.img src={url} style={{ width: "80%" }} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </motion.div>
            <motion.div
              class="col-md-6 col-12 mt-5"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div class="display-4">{product.name}</div>
              <div
                class="mt-3"
                style={{ fontSize: "2rem" }}
              >{`Rs ${product.price}`}</div>

              {/* Size Start */}
              <div className="mt-3">
                {error && (
                  <Alert severity="error">Please Select One size</Alert>
                )}

                <div class="" style={{ fontSize: "1.8rem" }}>
                  Size :
                </div>
                <div class="" style={{ fontSize: "2rem" }}>
                  <button
                    type="button"
                    class={`btn ${
                      size == "small" ? "btn-dark" : "btn-outline-dark"
                    } btn`}
                    style={{ borderRadius: 25 }}
                    onClick={() => {
                      setSize("small");
                    }}
                  >
                    S
                  </button>
                  <button
                    type="button"
                    class={`btn ${
                      size == "medium" ? "btn-dark" : "btn-outline-dark"
                    } btn mx-2`}
                    style={{ borderRadius: 25 }}
                    onClick={() => {
                      setSize("medium");
                    }}
                  >
                    M
                  </button>
                  <button
                    type="button"
                    class={`btn ${
                      size == "large" ? "btn-dark" : "btn-outline-dark"
                    } btn mx-2`}
                    style={{ borderRadius: 25 }}
                    onClick={() => {
                      setSize("large");
                    }}
                  >
                    L
                  </button>
                </div>
              </div>
              {/* size end */}
              {isAdded ? (
                <Button class="btn btn-dark btn-lg btn-block mt-3 " disabled>
                  Loading...
                </Button>
              ) : cartData &&
                cartData.find((obj) => obj.product._id == product._id) ? (
                <Link to="/cart" class="btn btn-dark btn-lg btn-block mt-3">
                  Already In Cart
                </Link>
              ) : (
                <Button
                  class="btn btn-dark btn-lg btn-block mt-3"
                  onClick={handleClick}
                >
                  Add To Cart
                </Button>
              )}
              <div class="mt-4">
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    Description
                  </AccordionSummary>
                  <AccordionDetails>{product.description}</AccordionDetails>
                </Accordion>
                <Accordion className="mt-2">
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    Shipping and Return
                  </AccordionSummary>
                  <AccordionDetails>
                    Returns are offered within 30 days after product delivery on
                    items that are unworn, unaltered and in new condition with
                    all tags attached. With the exception of items marked FINAL
                    SALE such as sale items and brown bag items. All sale items
                    are marked as final sale. We can accommodate size exchanges
                    on these items, but we are not able to process any refunds.
                  </AccordionDetails>
                </Accordion>
              </div>
            </motion.div>
          </div>
        </div>
      </Base>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isSuccess}
        message={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <DoneIcon fontSize="default" style={{ color: "lightgreen" }} />
            <span className="ml-2" style={{ color: "lightgreen" }}>
              Product Added To cart
            </span>
          </div>
        }
        autoHideDuration={2000}
        onClose={() => {
          setIsSuccess(false);
        }}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setIsSuccess(false);
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </div>
  );
}
