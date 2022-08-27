const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: Number,
    length: 10,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  role: {
    type: String,
    enum: ["User", "Admin", "SalesExecutive", "HubManager"],
    default: "User",
  },
  city: {
    type: String,
  },
  pincode: {
    type: String,
  },
  zone: {
    type: String,
  },
  area: {
    type: String,
  },
  latitude: {
    type: String,
  },
  longitude: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", userSchema);
