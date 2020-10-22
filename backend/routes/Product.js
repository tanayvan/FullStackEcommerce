const express = require("express");
const {
  createProduct,
  getTshirts,
  findTshirtWithId,
} = require("../controllers/Product");
const {isAdmin,isAuthenticated,isSignedIn } = require("../controllers/Auth")
const { getUserByUserID} = require("../controllers/user")

const router = express.Router();

router.param("userId", getUserByUserID);

router.post("/create/product/:userId",isSignedIn, isAuthenticated,isAdmin,createProduct);

router.get("/products", getTshirts);
router.get("/products/:id", findTshirtWithId);

module.exports = router;
