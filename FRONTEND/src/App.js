import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Homepage from "./Component/Homepage";
import ProductPage from "./Component/ProductPage";
import CartPage from "./Component/CartPage";
import CheckOut from "./Component/CheckOut";
import PaymentSuccessPage from "./Component/PaymentSuccessPage";
import Signup from "./Component/Signup";
import Login from "./Component/Login";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/checkout" component={CheckOut} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/paymentsuccessfull"
          component={PaymentSuccessPage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
