const Cart = require("../models/Cart");

exports.addToCart = (req, res) => {
  req.body.cart.user = req.profile;
  const cart = new Cart(req.body.cart);
  

  cart.save((err, cart) => {
    if (err) {
      return res.status(400).json({
        error: "error saving Product In Cart " + err,
      });
    }

    res.json(cart);
  });
};
exports.removeFromCart = (req, res) => {
  const id = req.params.id;
  Cart.findByIdAndDelete({ _id: id }).exec((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Product Not Found" + err,
      });
    }
    res.json(product);
  });
};

exports.getCart = (req, res) => {
  const id = req.profile._id;
  Cart.find({ user: id })
    .populate("product")
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({
          error: "Your Cart is Empty" + err,
        });
      }
      res.json(cart);
    });
};
