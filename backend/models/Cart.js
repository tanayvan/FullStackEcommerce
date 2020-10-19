const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartSchema = new mongoose.Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    user: {
      type: "string",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);