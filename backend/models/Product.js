const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  stock_s: {
    type: Number,
    default: 0,
  },
  stock_m: {
    type: Number,
    default: 0,
  },
  stock_l: {
    type: Number,
    default: 0,
  },
  productImages: {
    type: Array,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
