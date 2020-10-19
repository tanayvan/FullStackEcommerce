const express = require("express");
const {
  createProduct,
  getTshirts,
  findTshirtWithId,
} = require("../controllers/Product");

const router = express.Router();

router.post("/create/product", createProduct);

router.get("/products", getTshirts);
router.get("/products/:id", findTshirtWithId);

module.exports = router;
