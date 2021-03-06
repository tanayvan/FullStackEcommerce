import React from "react";
import axios from "axios";

import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import { API } from "../constants/API";
import { useDispatch } from "react-redux";
import { getCartData } from "../actions/cartActions";
import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton, MenuItem, Select, Snackbar } from "@material-ui/core";

export default function CartProduct({ data, id, size }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const handleRemove = async () => {
    console.log(id);
    setLoading(true);
    const deletedProduct = await axios.delete(
      `${API}/api/removefromcart/${id}/${
        JSON.parse(localStorage.getItem("jwt"))._id
      }`,

      {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("jwt")).token
          }`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (deletedProduct) {
      setIsDeleted(true);
      console.log(data);
      setLoading(false);
      dispatch(getCartData());
    }
  };
  return (
    <div
      className="row m-3"
      style={{
        border: "1px solid #eaeaec",
      }}
    >
      <div class="col-md-3 col-6">
        <img
          src={data.productImages[0]}
          style={{ width: "100%", borderRadius: "15px" }}
          className="m-1"
        />
      </div>
      <div class="col-md-8 col-6">
        <div class="mt-2">{data.name}</div>
        <div class="mt-2">Rs. {data.price}</div>
        <div class="mt-2">
          <div style={{ display: "flex", alignItems: "center" }}>
            <Select value={size} onChange={() => {}}>
              <MenuItem value="small">S</MenuItem>
              <MenuItem value="medium">M</MenuItem>
              <MenuItem value="large">L</MenuItem>
            </Select>
          </div>

          {loading ? (
            <Button
              size="small"
              style={{
                border: "1px solid red",
                outline: "none",
                minWidth: "20px",
                color: "red",
              }}
              className="mt-2"
              disabled
            >
              Remove From Cart
            </Button>
          ) : (
            <Button
              size="small"
              style={{
                border: "1px solid red",
                outline: "none",
                minWidth: "20px",
                color: "red",
              }}
              className="mt-2"
              onClick={handleRemove}
            >
              Remove From Cart
            </Button>
          )}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={isDeleted}
        message={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="ml-2" style={{ color: "red" }}>
              Product Deleted from cart
            </span>
          </div>
        }
        autoHideDuration={2000}
        onClose={() => {
          setIsDeleted(false);
        }}
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => {
                setIsDeleted(false);
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
