import React from "react";
import { Link } from "react-router-dom";

export default function Card({ title, price, url, id }) {
  return (
    <Link to={`/product/${id}`}>
      <div className="m-3 product-card">
        <div class="card-container">
          <div class="image-container">
            <img src={url} alt="" style={{ width: "100%" }} />
          </div>
          <div
            class="text-center mt-1"
            style={{
              fontSize: "1.3rem",
            }}
          >
            {title}
          </div>
          <div
            class="text-center mt-1"
            style={{
              fontSize: "1.2rem",
            }}
          >
            {`Rs. ${price}`}
          </div>
        </div>
      </div>
    </Link>
  );
}
