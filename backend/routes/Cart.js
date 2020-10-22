const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/Cart");
const { isAuthenticated,isSignedIn } = require("../controllers/Auth")
const {getUserByUserID} = require("../controllers/user")

const router = express.Router();

router.param("userId",getUserByUserID)

router.post("/addtocart/:id/:userId",isSignedIn,isAuthenticated, addToCart);
router.delete("/removefromcart/:id/:userId",isSignedIn,isAuthenticated, removeFromCart);
router.get("/getcart/:userId",isSignedIn,isAuthenticated, getCart);

module.exports = router;
