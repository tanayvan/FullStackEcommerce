const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/Cart");

const router = express.Router();

router.post("/addtocart/:id", addToCart);
router.delete("/removefromcart/:id", removeFromCart);
router.get("/getcart/:id", getCart);

module.exports = router;
