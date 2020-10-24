import { TextField } from "@material-ui/core";
import React from "react";
import Base from "./Base";
import login from "../icons/login.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  return (
    <Base>
      <div class="container">
        <div class="row">
          <div class="display-4 text-center col-12 mt-5">Login Here</div>
          <div class="col-lg-6 col-12 mt-5">
            <img src={login} style={{ width: "90%", height: "100%" }} />
          </div>
          <div class="col-lg-4 col-12 mt-5">
            <TextField
              id="standard-basic"
              label="Email"
              fullWidth
              className="mt-4"
              onChange={handleChange("email")}
              type="email"
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              fullWidth
              className="mt-4"
              onChange={handleChange("password")}
            />
            <div class="btn btn-dark mt-5 btn-block" onClick={() => {}}>
              Login
            </div>
            <div className="mt-3">
              Don't have an account ?{" "}
              <Link to="/signup" style={{ color: "#6c63fe" }}>
                Sign up here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
