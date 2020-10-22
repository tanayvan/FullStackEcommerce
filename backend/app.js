const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//middlewares
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());

//my routes

const productRoutes = require("./routes/Product");
const CartRoutes = require("./routes/Cart");
const AuthRoutes = require("./routes/Auth")
const UserRoutes = require("./routes/user")

const dbURL =
  "mongodb+srv://bogg:rock1999@cluster0.g89xp.mongodb.net/<bogg>?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Db Connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api", productRoutes);
app.use("/api", CartRoutes);
app.use("/api", AuthRoutes);
app.use("/api", UserRoutes);


const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server Started on ${port}`);
});
