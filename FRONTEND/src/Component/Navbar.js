import React, { useState } from "react";
import { Badge, Drawer } from "@material-ui/core";
import { motion } from "framer-motion";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Bag from "../icons/shopping-bag.svg";
import Menu from "../icons/menu.svg";
import { Link } from "react-router-dom";

export default function Navbar({ count }) {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/cart" style={{ margin: "0rem 1rem" }}>
            <Badge badgeContent={count} color="secondary">
              <img src={Bag} style={{ height: "1.6rem", width: "2rem" }} />
            </Badge>
          </Link>
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
          style={{ width: 200 }}
          role="presentation"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          onKeyDown={() => {
            setIsOpen(!isOpen);
          }}
        >
          <div class="" style={{ textAlign: "center" }}>
            <div class="company">GB</div>
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
      </Drawer>
    </motion.nav>
  );
}
