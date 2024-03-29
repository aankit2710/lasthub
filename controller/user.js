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
        longitude,
        role
      } = req.body;

      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({message: "Email already exist"});
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
        area: area || '',
        latitude,
        longitude,
        role
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
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({message:"Email doesnt not exist"})
      }
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        return res.status(400).json({message:"Invalid Credentials"})
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
        return res.status(400).json({message: `Password is required`});
      }
      const user = await User.findById(ObjectId(id));
      if (!user) {
        errors.id = "User not Found";
        return res.status(400).json({message: "User not Found"});
      
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
      let query = {};

      if (queryObject.name && !queryObject.key) {
        query = {
          ...query,
          name : { $regex: `${queryObject.name}.*`, $options: "i" }
        }
      }
      if (queryObject.email && !queryObject.key) {
        query = {
          ...query,
          email : { $regex: `${queryObject.email}.*`, $options: "i" }
        }
      }
      if (queryObject.pincode && !queryObject.key) {
        query = {
          ...query,
          pincode : { $regex: `${queryObject.pincode}.*`, $options: "i" }
        }
      }
      if (queryObject.area && !queryObject.key) {
        query = {
          ...query,
          area : { $regex: `${queryObject.area}.*`, $options: "i" }
        }
      }
      if(queryObject.key) {
        query = {
          $or:[
          {name : { $regex: `${queryObject.key}.*`, $options: "i" }},
          {email : { $regex: `${queryObject.key}.*`, $options: "i" }},
          {pincode : { $regex: `${queryObject.key}.*`, $options: "i" }},
          {area : { $regex: `${queryObject.key}.*`, $options: "i" }}
        ]}
      }

      const user = await User.find(query, {password:0}).sort({  createdAt: -1 }
    );
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
