const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  userLogin,
  userRegister,
  changePassword,
  getUsers,
  updateUser
} = require("../controller/user");

//USER REGISTER
router.post("/register", userRegister);

// USER LOGIN 
router.post("/login", userLogin);

// CHANGE PASSWORD
router.put('/changePassword',passport.authenticate('jwt', { session: false }), changePassword);

// CHANGE PASSWORD
router.put('/updateUser',passport.authenticate('jwt', { session: false }), updateUser);

// CHANGE PASSWORD
router.get('/',passport.authenticate('jwt', { session: false }), getUsers);

module.exports = router;
