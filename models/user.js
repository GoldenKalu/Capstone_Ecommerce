const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { productSchema } = require("./product");

// const express = require("express");



const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 5, maxlength: 100 },
  lastName: { type: String, required: true, minlength: 5, maxlength: 100 },
  username: { type: String, required: true, minlength: 5, maxlength: 50 },
  email: { type: String, unique: true, required: true, minlength: 5, maxlength: 50 },
  password: { type: String, required: true, minlength: 5, maxlength: 1000 },
  isGoldMember: { type: Boolean, default: false },
  shoppingCart: { type: [productSchema], default: [] },
  profileImage: {type: String, required: true,default: 'no Photo' },
  isAdmin: { type: Boolean, default: false},


});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({_id: this._id, username: this.username, isAdmin: this.isAdmin}, config.get("jwtSecret"));
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const Schema = Joi.object({
    firstName: Joi.string().min(5).max(100).required(),
    lastName: Joi.string().min(5).max(100).required(),
    username: Joi.string().min(5).max(100).required(),
    email: Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(1000).required(),
  });
  return Schema.validate(user);
}

exports.validateUser = validateUser;
exports.User = User;
exports.userSchema = userSchema;

// module.exports = {
//   User: User,
//   validateUser: validateUser,
  
// };