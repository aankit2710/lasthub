const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

//Models
const User = require("../model/user");

//Config
const keys = require("../config/keys");

module.exports = {
  userRegister: async (req, res, next) => {
    try {
      let errors = {};
      const { name, email, password, phoneNumber } = req.body;
      // const { name, email, password, phoneNumber } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors);
      }
      // console.log("1");

      let hashedPassword;
      hashedPassword = await bcrypt.hash(password, 8);
      // console.log("1");
      // let { sequence } = await User.findOne()
      //   .sort({ createdAt: -1 })
      //   .select("sequence");
      // sequence = sequence + 1;
      //GENERATE OTP
      const OTP = Math.floor(100000 + Math.random() * 900000);
      // console.log("2");

      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
        // isThirdPartyUser,
        phoneNumber,
        // sequence,
        otp: OTP,
        isEmailVerified: false,
      });
      await newUser.save();
      console.log(newUser);

      res.status(200).json({
        message: "User registerd successfully,",
        success: true,
        email: newUser.email,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  userLogin: async (req, res, next) => {
    try {
      let errors = {};
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        errors.email = "Email doesnt not exist";
        return res.status(400).json(errors);
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        errors.password = "Invalid Credentials";
        return res.status(404).json(errors);
      }
      const payload = {
        email,
        _id: user._id
      };
      jwt.sign(payload, keys.secretKey, { expiresIn: 7200 }, (err, token) => {
        res.json({
          message: "Otp verified",
          success: true,
          // token: "Bearer " + token,
          token: token,
          userInfo: user,
        });
      });
    } catch (err) {
      return res.status(400).json({ message: `Error in login ${err.message}` });
    }
  },
};
