const express = require("express");
const { signup, signin, signout, isSignedIn } = require("../controllers/Auth");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/signup",
  [
    check("name", "Name must be at least 3 chars long:name").isLength({
      min: 3,
    }),
    check("email", "Enter valid email:email").isEmail(),
    check(
      "password",
      "password must be at least 5 chars long:password"
    ).isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "Enter valid email:email").isEmail(),
    check("password", "password is required:password").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get("/signout", signout);

// router.put("/test", (req, res) => {
//   res.json({ messaage: "yup" });
// });

module.exports = router;
