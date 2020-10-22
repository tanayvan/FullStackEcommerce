const express = require("express");
const router = express.Router();
const {
  getUserByUserID,
  getUser,
  updateUser,
} = require("../controllers/user");
const { isAuthenticated, isSignedIn } = require("../controllers/Auth");


router.param("userId", getUserByUserID);

router.get("/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/:userId/update", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
