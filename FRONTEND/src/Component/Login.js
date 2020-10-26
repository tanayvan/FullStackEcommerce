import { TextField } from "@material-ui/core";
import React from "react";
import Base from "./Base";
import login from "../icons/login.svg";
import { useState } from "react";
import { Link , Redirect} from "react-router-dom";
import {API} from "../constants/API"

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error :{ email : false, password: false}
  });
  const [errorMessage, setErrorMessage] = useState('')
  const [redirect, setRedirect] = useState(false)
  
  const onLogin = (user) =>{
    return fetch(`${API}/api/signin`,{
      method:"POST",
      headers:{ 
        Accept : "application/json",
        "Content-Type":"application/json",
      },
      body:JSON.stringify(user)
    }).then(response =>{
      return response.json()
    }).catch(error=>{
      console.log(error);
    })
  }

  const handleSubmit = () =>{
    onLogin({
      email : values.email,
      password: values.password,
    }).then(data=>{
      if(!data.error){
        localStorage.setItem("Token",data.token)
        setRedirect(true)
      }else{
        let errorData = String(data.error).split(":");
        setValues({ ...values,error:{[errorData[1]]:true}})
        setErrorMessage(errorData[0]);
      }
    })
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };
  
  if(redirect){
    return <Redirect to="/"/>
  }

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
            <div class="btn btn-dark mt-5 btn-block" onClick={() => {handleSubmit()}}>
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
