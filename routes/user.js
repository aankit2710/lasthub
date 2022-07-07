const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  userLogin,
  userRegister,
  verifyEmail,
  sendOTP,
  verifyOTP,
  deleteUser,
  updatePassword,
  updateProfilePicture,
  updateBackgroundPicture,
  fetchUserFromGoogle,
  getUser,
  updateUser,
  searchUserByName,
} = require("../controller/user");

//USER REGISTER
router.post("/register", userRegister);

// USER LOGIN
router.post("/login", userLogin);

module.exports = router;
