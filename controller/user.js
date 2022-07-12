const url = require('url');
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
      const {
        name,
        email,
        password,
        phoneNumber,
        gender,
        city,
        pincode,
        zone,
        area,
        latitude,
        longitude
      } = req.body;

      const user = await User.findOne({ email });
      if (user) {
        errors.email = "Email already exist";
        return res.status(400).json(errors);
      }

      let hashedPassword;
      hashedPassword = await bcrypt.hash(password, 8);

      const newUser = await new User({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        gender,
        city,
        pincode,
        zone,
        area,
        latitude,
        longitude
      });
      await newUser.save();

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
        id: user._id
      };
      jwt.sign(payload, keys.secretKey, { expiresIn: 7200 }, (err, token) => {
        res.json({
          message: "user loggedIn successfully",
          success: true,
          token: token,
          userInfo: user,
        });
      });
    } catch (err) {
      return res.status(400).json({ message: `Error in login ${err.message}` });
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const {id} = req.user
      const { password } = req.body;
      if(!password){
        errors.password = "Password is required";
        return res.status(400).json(errors);
      }
      const user = await User.findById(ObjectId(id));
      if (!user) {
        errors.id = "User not Found";
        return res.status(400).json(errors);
      
      }
      const hashedPassword = await bcrypt.hash(password, 8);
      user.password = hashedPassword;
      await user.save();
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        response: user,
      });
    } catch (err) {
      return res.status(400).json({ message: `Error in login ${err.message}` });
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const queryObject = url.parse(req.url, true).query;
      const user = await User.find(queryObject, {password:0, otp:0});
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found", response: {} });
      }
      return res
        .status(200)
        .json({ success: true, message: "User List", response: user });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { 
        name,
        phoneNumber,
        gender,
        city,
        pincode,
        zone,
        area,
        latitude,
        longitude
      } = req.body;
      const user = await User.findById(ObjectId(id));
      
      if (name) {
        user.name = name;
      }
      if (phoneNumber) {
        user.phoneNumber = phoneNumber;
      }
      if (gender) {
        user.gender = gender;
      }
      if (city) {
        user.city = city;
      }
      if (pincode) {
        user.pincode = pincode;
      }
      if (zone) {
        user.zone = zone;
      }
      if (area) {
        user.area = area;
      }
      if (latitude) {
        user.latitude = latitude;
      }
      if (longitude) {
        user.longitude = longitude;
      }

      await user.save();
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        response: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
};
