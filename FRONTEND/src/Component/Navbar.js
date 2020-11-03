import React, { useState } from "react";
import { Badge, Button, Drawer } from "@material-ui/core";
import { motion } from "framer-motion";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Bag from "../icons/shopping-bag.svg";
import User from "../icons/user.png";
import Menu from "../icons/menu.svg";
import PowerOff from "../icons/power.png";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { Link, withRouter } from "react-router-dom";

function Navbar({ count, history }) {
  const [isOpen, setIsOpen] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("jwt"));
  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    history.push("/login");
  };
  return (
    <motion.nav initial={{ y: -100 }} animate={{ y: 0 }}>
      <div class="nav-container">
        <div class="company">
          <Link to="/">TV</Link>
        </div>
        <div class="navbar-links">
          <ul>
            <li>
              <a href="">Men</a>
            </li>
            <li>
              <a href="">Women</a>
            </li>
          </ul>
        </div>
        <div class="icons-container">
          <Link
            to={userToken ? "/cart" : "/login"}
            style={{ margin: "0rem 1rem" }}
          >
            <Badge badgeContent={count} color="secondary">
              <img src={Bag} style={{ height: "1.6rem", width: "2rem" }} />
            </Badge>
          </Link>
          {userToken ? (
            <Link to="/dashboard" className="resp-icon">
              <img
                src={User}
                style={{ height: "1.6rem", width: "1.6rem" }}
                className="mx-2"
              />
              {userToken.name}
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ margin: "0rem 1rem" }}
              className="resp-icon"
            >
              <img
                src={User}
                style={{ height: "1.6rem", width: "1.6rem" }}
                className="mx-2"
              />
            </Link>
          )}

          {userToken ? (
            <button className="resp-icon btn btn-light" onClick={handleSignOut}>
              <img
                src={PowerOff}
                style={{ height: "1.6rem", width: "1.6rem" }}
                className="mx-2"
              />
            </button>
          ) : (
            ""
          )}
          <div
            className="menu"
            onClick={(event) => {
              if (
                event.type === "keydown" &&
                (event.key === "Tab" || event.key === "Shift")
              ) {
                return;
              }
              setIsOpen(true);
            }}
          >
            <img src={Menu} style={{ height: "1.6rem", width: "2rem" }} />
          </div>
        </div>
      </div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div
          style={{
            width: 200,
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          role="presentation"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          onKeyDown={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div className="company m-3">
              {" "}
              {userToken ? `${userToken.name}` : "GB"}
            </div>

            <List>
              {["Men", "Women"].map((text, index) => (
                <ListItem
                  button
                  key={text}
                  style={{ border: "1px solid #eaeaec" }}
                >
                  <ListItemText primary={text} />
                </ListItem>
              ))}
            </List>
          </div>
          <button
            className="btn btn-outline-danger btn-block my-2"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </Drawer>
    </motion.nav>
  );
}

export default withRouter(Navbar);
