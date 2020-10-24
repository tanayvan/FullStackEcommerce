import { TextField } from "@material-ui/core";
import React from "react";
import Base from "./Base";
import login from "../icons/login.svg";
import { useState } from "react";
import { API } from "../constants/API";
import { Link, Redirect } from "react-router-dom";
export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    success: false,
    error: { name: false, email: false, password: false },
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  const signup = (user) => {
    return fetch(`${API}/api/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.log(error));
  };
  const handleSubmit = async () => {
    signup({
      name: values.name,
      email: values.email,
      password: values.password,
    })
      .then((data) => {
        // console.log(data);

        if (!data.error) {
          setRedirect(true);
        }
        if (data.error) {
          console.log(data.error);
          var err = String(data.error);
          var er = err.split(":");

          setValues({ ...values, error: { [er[1]]: true } });
          setErrorMessage(er[0]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (redirect) {
    return <Redirect to="/" />;
  }
  return (
    <Base>
      <div class="container">
        <div class="row">
          <div class="display-4 text-center col-12 mt-5">Sign Up Here</div>
          <div class="col-lg-6 col-12 mt-5">
            <img src={login} style={{ width: "90%", height: "100%" }} />
          </div>
          <div class="col-lg-4 col-12 mt-5">
            <TextField
              id="standard-basic"
              label="Name"
              fullWidth
              className="mt-4"
              onChange={handleChange("name")}
              name="name"
              error={values.error.name}
              helperText={values.error.name && errorMessage}
            />
            <TextField
              id="standard-basic"
              label="Email"
              fullWidth
              className="mt-4"
              onChange={handleChange("email")}
              type="email"
              error={values.error.email}
              helperText={values.error.email && errorMessage}
            />
            <TextField
              id="standard-basic"
              label="Password"
              type="password"
              fullWidth
              className="mt-4"
              onChange={handleChange("password")}
              error={values.error.password}
              helperText={values.error.password && errorMessage}
            />
            <div class="btn btn-dark mt-5 btn-block" onClick={handleSubmit}>
              Sign up
            </div>
            <div className="mt-3">
              Already have an account ?{" "}
              <Link to="/login" style={{ color: "#6c63fe" }}>
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
}
