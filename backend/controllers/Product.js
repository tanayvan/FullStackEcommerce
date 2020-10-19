const Product = require("../models/Product");

exports.createProduct = (req, res) => {
  console.log("Post Request for Creating Product");
  const { price, name, description, productImages } = req.body;
  if (!name || !description || !price || !productImages) {
    return res.status(400).json({
      error: " Please include all Fields",
    });
  }

  let product = new Product(req.body);

  product.save((err, product) => {
    if (err) {
      return res.status(400).json({
        error: "Saving Tshirt In Db Failed" + err,
      });
    }

    res.json(product);
  });
};

exports.getTshirts = (req, res) => {
  Product.find({}).exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "No Product Found" + err,
      });
    }

    res.json(items);
  });
};

exports.findTshirtWithId = (req, res) => {
  const id = req.params.id;
  Product.findById(id).exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "No Product Found" + err,
      });
    }
    res.json(items);
  });
};
